using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhanCongNoiBoService : IPhanCongNoiBoService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhanCongNoiBoService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<PhanCongNoiBoDto> datas, Pagination pagi)> GetPhanCongNoiBosAllAsync(PhanCongNoiBoParam param)
        {
            var PhanCongNoiBoDomains = await _repositoryManager.PhanCongNoiBo.GetPhanCongNoiBosAllAsync(param);
            // Dòng này sẽ tự động mapping đối tượng con của PhanCongNoiBo là LichSuPhanCong sang LichSuPhanCongDto
            var dataReturn = _mapper.Map<List<PhanCongNoiBoDto>>(PhanCongNoiBoDomains);
            return (datas: dataReturn, pagi : PhanCongNoiBoDomains.Pagination);
        }
        public async Task<PhanCongNoiBoDto?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo)
        {
            if (maPhanCongNoiBo == null || maPhanCongNoiBo == "") return null;
            var PhanCongNoiBoDomain = await _repositoryManager.PhanCongNoiBo.FindPhanCongNoiBoAsync(maPhanCongNoiBo);
            // Dòng này sẽ tự động mapping đối tượng con của PhanCongNoiBo là LichSuPhanCong sang LichSuPhanCongDto
            var result = _mapper.Map<PhanCongNoiBoDto>(PhanCongNoiBoDomain);
            return result;
        }
        public async Task<ResponseModel1<PhanCongNoiBoDto>> CreatePhanCongNoiBoAsync(PhanCongNoiBoRequestCreateDto PhanCongNoiBoDto, string user, string userId)
        {
            if (PhanCongNoiBoDto == null) return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };
            var info = await _repositoryManager.NhanVien.FindNhanVienAsync(userId);

            var phanCongNoiBoDomain = _mapper.Map<PhanCongNoiBo>(PhanCongNoiBoDto);
            phanCongNoiBoDomain.MaId = Guid.NewGuid().ToString();
            phanCongNoiBoDomain.MaPhanCongNoiBo = "PCNB_" + info?.MaKhoa ?? "unknow" + PublicFunction.getTimeSystem();
            phanCongNoiBoDomain.TrangThai = true;
            phanCongNoiBoDomain.NgayTao = DateTime.Now;
            phanCongNoiBoDomain.NguoiTao = user;

            var lichSuPhanCong = new LichSuPhanCong()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPhanCongNoiBo = phanCongNoiBoDomain.MaId,
                ManvMoi = phanCongNoiBoDomain.ManvXyLy,
                TennvMoi = phanCongNoiBoDomain.TennvXuly,
                LamTu = phanCongNoiBoDomain.LamTu,
                ManvPhanCong = userId ?? "NV009",
                TennvPhanCong = phanCongNoiBoDomain.TennvPhanCong,
                NgayTao = DateTime.Now,
                NguoiTao = user,
            };

            // Cập nhật trạng thái mẫu này là đã phân công nội bộ
            var phieuDangKyMau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(PhanCongNoiBoDto.MaPdkMau);
            if(phieuDangKyMau== null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Mau dang phan cong chua ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }
            phieuDangKyMau.TrangThaiPhanCong = 7;

            // Cập nhật ngay sua, nguoi sua cho phieu dang ky
            var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(phieuDangKyMau?.MaPhieuDangKy ?? "");
            if (phieuDangKy == null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky cua mau dang phan cong chua ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }
            phieuDangKy.NgaySua = DateTime.Now;
            phieuDangKy.NguoiSua = user;

            _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(phieuDangKyMau);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKy);
            _repositoryManager.LichSuPhanCong.CreateLichSuPhanCongAsync(lichSuPhanCong);
            _repositoryManager.PhanCongNoiBo.CreatePhanCongNoiBoAsync(phanCongNoiBoDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhanCongNoiBoReturnDto = _mapper.Map<PhanCongNoiBoDto>(phanCongNoiBoDomain);

            return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = check,
                Message = check ? "Them phan cong noi bo thanh cong!" : "Them phan cong noi bo that bai, vui long thu lai!",
                Data = PhanCongNoiBoReturnDto
            };
        }
        public async Task<ResponseModel1<PhanCongNoiBoDto>> UpdatePhanCongNoiBoAsync(PhanCongNoiBoRequestUpdateDto PhanCongNoiBoDto,string user, string userId)
        {
            if (PhanCongNoiBoDto == null || PhanCongNoiBoDto.MaId == null || PhanCongNoiBoDto.MaId == "") return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhanCongNoiBoCheck = await _repositoryManager.PhanCongNoiBo.FindPhanCongNoiBoAsync(PhanCongNoiBoDto.MaId);
            if (PhanCongNoiBoCheck == null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }

            if (PhanCongNoiBoDto.LamTu != null)
            {
                var lichSuPhanCong = await _repositoryManager.LichSuPhanCong.FindLichSuPhanCongByPCHienTaiAsync(PhanCongNoiBoCheck.MaId, PhanCongNoiBoCheck.ManvXyLy, true);
                if(lichSuPhanCong!=null)
                {
                    lichSuPhanCong.LamTu = PhanCongNoiBoDto.LamTu;
                    lichSuPhanCong.NgaySua = DateTime.Now;
                    lichSuPhanCong.NguoiSua = user;
                    _repositoryManager.LichSuPhanCong.UpdateLichSuPhanCongAsync(lichSuPhanCong);
                }
            }

            _mapper.Map(PhanCongNoiBoDto, PhanCongNoiBoCheck);
            PhanCongNoiBoCheck.NgaySua = DateTime.Now;
            PhanCongNoiBoCheck.NguoiSua = user ?? "unknow";
            _repositoryManager.PhanCongNoiBo.UpdatePhanCongNoiBoAsync(PhanCongNoiBoCheck);

            bool check = await _repositoryManager.SaveChangesAsync();
            var PhanCongNoiBoReturnDto = _mapper.Map<PhanCongNoiBoDto>(PhanCongNoiBoCheck);
            return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhanCongNoiBoReturnDto
            };
        }
        public async Task<ResponseModel1<PhanCongNoiBoDto>> ReassignPhanCongNoiBo(ReassignPhanCongNoiBoRequestUpdateDto PhanCongNoiBoDto, string user, string userId)
        {
            if (PhanCongNoiBoDto == null || PhanCongNoiBoDto.MaId == null || PhanCongNoiBoDto.MaId == "") return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhanCongNoiBoCheck = await _repositoryManager.PhanCongNoiBo.FindPhanCongNoiBoAsync(PhanCongNoiBoDto.MaId);
            if (PhanCongNoiBoCheck == null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            // Kiểm tra cập nhật và thêm mới lịch sử phân công
            var lichSuPhanCongCheck = await _repositoryManager.LichSuPhanCong.FindLichSuPhanCongByPCHienTaiAsync(PhanCongNoiBoDto.MaId, PhanCongNoiBoCheck.ManvXyLy, true);
            if(lichSuPhanCongCheck!= null)
            {
                // Sửa lại lịch sử pc trước đó
                lichSuPhanCongCheck.LamToi = PhanCongNoiBoDto.NvCuLamToi;
                lichSuPhanCongCheck.NgaySua = DateTime.Now;
                lichSuPhanCongCheck.NguoiSua = user;
                _repositoryManager.LichSuPhanCong.UpdateLichSuPhanCongAsync(lichSuPhanCongCheck);
                // Thêm lịch sử phân công mới
                LichSuPhanCong lichSuPhanCong = new LichSuPhanCong()
                {
                    MaId = Guid.NewGuid().ToString(),
                    MaPhanCongNoiBo = PhanCongNoiBoCheck.MaId,
                    ManvCu = PhanCongNoiBoCheck.ManvXyLy,
                    TennvCu = PhanCongNoiBoCheck.TennvXuly,
                    ManvMoi = PhanCongNoiBoDto.ManvXyLy,
                    TennvMoi = PhanCongNoiBoDto.TennvXuLy,
                    ManvPhanCong = PhanCongNoiBoDto.ManvPhanCong,
                    TennvPhanCong = PhanCongNoiBoDto.TennvPhanCong,
                    LyDoPhanCongLai = PhanCongNoiBoDto.LyDoPhanCongLai,
                    LamTu = PhanCongNoiBoDto.NvMoiLamTu,
                    TrangThai = "active",
                    NgayTao = DateTime.Now,
                    NguoiTao = user
                };
                _repositoryManager.LichSuPhanCong.CreateLichSuPhanCongAsync(lichSuPhanCong);
            }
            else
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Khong tim thay lich su phan cong truoc do, vui long kiem tra lai",
                    Data = null
                };
            }
           
            _mapper.Map(PhanCongNoiBoDto, PhanCongNoiBoCheck);
            PhanCongNoiBoCheck.NgaySua = DateTime.Now;
            PhanCongNoiBoCheck.NguoiSua = user;
            PhanCongNoiBoCheck.ManvXyLy = PhanCongNoiBoDto.ManvXyLy;
            PhanCongNoiBoCheck.TennvXuly = PhanCongNoiBoDto.TennvXuLy;
            PhanCongNoiBoCheck.ManvPhanCong = PhanCongNoiBoDto.ManvPhanCong;
            PhanCongNoiBoCheck.TennvPhanCong = PhanCongNoiBoDto.TennvPhanCong;
            PhanCongNoiBoCheck.LamTu = PhanCongNoiBoDto.NvMoiLamTu;
            PhanCongNoiBoCheck.GhiChu = PhanCongNoiBoDto.GhiChu == "" ? PhanCongNoiBoCheck.GhiChu : PhanCongNoiBoDto.GhiChu;

            _repositoryManager.PhanCongNoiBo.UpdatePhanCongNoiBoAsync(PhanCongNoiBoCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhanCongNoiBoReturnDto = _mapper.Map<PhanCongNoiBoDto>(PhanCongNoiBoCheck);
            return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhanCongNoiBoReturnDto
            };
        }
        public async Task<ResponseModel1<PhanCongNoiBoDto>> DeletePhanCongNoiBoAsync(string maPhanCongNoiBo, string user, string userId)
        {
            if (maPhanCongNoiBo == null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                    Data = null
                };
            }
            // Cập nhật trạng thái pcnb = fasle
            var checkPhanCongNoiBo = await _repositoryManager.PhanCongNoiBo.FindPhanCongNoiBoAsync(maPhanCongNoiBo);
            if(checkPhanCongNoiBo == null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Phan cong noi bo khong ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }
            checkPhanCongNoiBo.TrangThai = false;
            checkPhanCongNoiBo.NguoiSua = user;
            checkPhanCongNoiBo.NgaySua = DateTime.Now;
            _repositoryManager.PhanCongNoiBo.UpdatePhanCongNoiBoAsync(checkPhanCongNoiBo);

            // Cập nhật trạng thái của lịch sử phân công
            var checkLichSuPhanCongs = await _repositoryManager.LichSuPhanCong.FindLichSuPhanCongByPCNBAsync(maPhanCongNoiBo, true);
            if (checkLichSuPhanCongs!= null && checkLichSuPhanCongs.Count > 0)
            {
                foreach(var item in checkLichSuPhanCongs)
                {
                    item.TrangThai = "no active";
                    item.NgaySua = DateTime.Now;
                    item.NguoiSua = user;
                    _repositoryManager.LichSuPhanCong.UpdateLichSuPhanCongAsync(item);
                }
            }

            // Cập nhật trang thái phân công của mẫu được phân công thành mẫu chờ phân công
            var checkPhieuDangKyMau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(checkPhanCongNoiBo?.MaPdkMau ?? "");
            if (checkPhieuDangKyMau == null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Mau dang phan cong khong ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }
            checkPhieuDangKyMau.TrangThaiPhanCong = 1;
            _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(checkPhieuDangKyMau);

            // Cập nhật phiếu đăng ký
            var checkPhieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(checkPhieuDangKyMau?.MaPhieuDangKy ?? "");
            if (checkPhieuDangKy == null)
            {
                return new ResponseModel1<PhanCongNoiBoDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky chua mau dang phan cong khong ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }
            checkPhieuDangKy.NguoiSua = user;
            checkPhieuDangKy.NgaySua = DateTime.Now;
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkPhieuDangKy);

            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhanCongNoiBoDto>(checkPhanCongNoiBo);
            return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = check,
                Message = check ? "Xoa men phan cong noi bo thanh cong!" : "Xoa men phan cong noi bo that bai",
                Data = dataReturn
            };
        }
    }
}
