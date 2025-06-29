using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuPhanTichKetQuaService : IPhieuPhanTichKetQuaService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuPhanTichKetQuaDto>> GetPhieuPhanTichKetQuasAllAsync()
        {
            var PhieuPhanTichKetQuaDomains = await _repositoryManager.PhieuPhanTichKetQua.GetPhieuPhanTichKetQuasAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuPhanTichKetQuaDto>>(PhieuPhanTichKetQuaDomains);
            return result;
        }
        public async Task<PhieuPhanTichKetQuaDto?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua)
        {
            if (maPhieuPhanTichKetQua == null || maPhieuPhanTichKetQua == "") return null;
            var PhieuPhanTichKetQuaDomain = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua);
            var result = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestCreateDto PhieuPhanTichKetQuaDto, string user, string userId)
        {
            List<PhieuPhanTichKetQuaChiTiet> datas = new List<PhieuPhanTichKetQuaChiTiet>();
            if (PhieuPhanTichKetQuaDto == null) return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };
            var phieuDangKyMau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(PhieuPhanTichKetQuaDto.MaPdkMau);
            if (phieuDangKyMau == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Mau dang lam phan tich ket qua khong ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }
            PhieuPhanTichKetQua phieuPhanTichKetQua = new PhieuPhanTichKetQua()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPhieuKetQua = "PPTKQ_" + PublicFunction.processString(PhieuPhanTichKetQuaDto.TenMau),
                MaPdkMau = PhieuPhanTichKetQuaDto.MaPdkMau,
                TenMau = PhieuPhanTichKetQuaDto.TenMau,
                ManvLap = userId ?? "NV009",
                NgayNhanMau = PhieuPhanTichKetQuaDto.NgayNhanMau,
                NgayKiemThu = PhieuPhanTichKetQuaDto.NgayKiemThu,
                NgayTraKetQua = phieuDangKyMau.NgayTraKetQua,
                LuuMau= phieuDangKyMau.LuuMau,
                YeuCauKiemNghiem = phieuDangKyMau.YeuCauKiemNghiem,
                MaKhoa = PhieuPhanTichKetQuaDto.MaKhoa,
                GhiChu = PhieuPhanTichKetQuaDto.GhiChu, 
                NgayTao = DateTime.Now,
                NguoiTao = user,
                TrangThai = "doi truong phong duyet"
            };
           
            if(PhieuPhanTichKetQuaDto.ChiTietPhanTichKetQuas.Count() > 0)
            {
                foreach (var item in PhieuPhanTichKetQuaDto.ChiTietPhanTichKetQuas)
                {
                    PhieuPhanTichKetQuaChiTiet phieuPhanTichKetQuaChiTiet = new PhieuPhanTichKetQuaChiTiet()
                    {
                        MaId = Guid.NewGuid().ToString(),
                        MaPhieuKetQua = phieuPhanTichKetQua.MaId,
                        MaChiTieu = item.MaChiTieu,
                        TenChiTieu = item.TenChiTieu,
                        KetQua = item.KetQua,
                        DonVi = item.DonVi,
                        GhiChu = item.GhiChu,
                        MucChatLuong = item.MucChatLuong,
                        TrangThai = "active"
                    };
                    _repositoryManager.PhieuPhanTichKetQuaChiTiet.CreatePhieuPhanTichKetQuaChiTietAsync(phieuPhanTichKetQuaChiTiet);
                    datas.Add(phieuPhanTichKetQuaChiTiet);
                } 
            }

            _repositoryManager.PhieuPhanTichKetQua.CreatePhieuPhanTichKetQuaAsync(phieuPhanTichKetQua);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(phieuPhanTichKetQua);
            PhieuPhanTichKetQuaReturnDto.phieuPhanTichKetQuaChiTietDtos = _mapper.Map<List<PhieuPhanTichKetQuaChiTietDto>>(datas);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Them phieu phan tich ket qua thanh cong!" : "Them phieu phan tich ket qua that bai, vui long thu lai!",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestUpdateDto PhieuPhanTichKetQuaDto, string user, string userId)
        {
            if (PhieuPhanTichKetQuaDto == null || PhieuPhanTichKetQuaDto.MaId == null || PhieuPhanTichKetQuaDto.MaId == "") return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuPhanTichKetQuaCheck = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto.MaId);
            if (PhieuPhanTichKetQuaCheck == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
          

            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaCheck);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByLDP(string maPhieuPhanTichKetQua, string user, string userId)
        {
            if (maPhieuPhanTichKetQua == "") return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuPhanTichKetQuaCheck = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua);
            if (PhieuPhanTichKetQuaCheck == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuPhanTichKetQuaCheck.NgaySua = DateTime.Now;
            PhieuPhanTichKetQuaCheck.NguoiSua = "admin";
            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaCheck);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByBLD(string maPhieuPhanTichKetQua, string user, string userId)
        {
            if (maPhieuPhanTichKetQua == "") return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuPhanTichKetQuaCheck = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua);
            if (PhieuPhanTichKetQuaCheck == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuPhanTichKetQuaCheck.NgaySua = DateTime.Now;
            PhieuPhanTichKetQuaCheck.NguoiSua = "admin";
            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaCheck);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> DeletePhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua, string user, bool isDel)
        {  
            var PhieuPhanTichKetQuaDomain = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua);
            if (PhieuPhanTichKetQuaDomain == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            _repositoryManager.PhieuPhanTichKetQua.DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                Data = null
            };
        }
    }
}
