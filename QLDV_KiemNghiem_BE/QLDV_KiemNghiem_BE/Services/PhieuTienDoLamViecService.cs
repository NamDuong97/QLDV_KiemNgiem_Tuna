using AutoMapper;
using Org.BouncyCastle.Bcpg.OpenPgp;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuTienDoLamViecService : IPhieuTienDoLamViecService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuTienDoLamViecService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<PhieuTienDoLamViecProcedureDto> datas, Pagination pagi)> GetPhieuTienDoLamViecAllAsync(PhieuTienDoLamViecParam param)
        {
            var phieuTienDoDomains = await _repositoryManager.PhieuTienDoLamViec.GetPhieuTienDoLamViecAllAsync(param);
            var phieuTienDoDtos = _mapper.Map<List<PhieuTienDoLamViecProcedureDto>>(phieuTienDoDomains);
            return (datas: phieuTienDoDtos, pagi: phieuTienDoDomains.Pagination);
        }
        public async Task<PhieuTienDoLamViecProcedureDto?> FindPhieuTienDoLamViecShowAsync(string maPhieuTienDoLamViec)
        {
            if (maPhieuTienDoLamViec == null || maPhieuTienDoLamViec == "") return null;
            var PhieuTienDoLamViecDomain = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecShowAsync(maPhieuTienDoLamViec);
            var result = _mapper.Map<PhieuTienDoLamViecProcedureDto>(PhieuTienDoLamViecDomain);
            return result;
        }
        public async Task<PhieuTienDoLamViecDto?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec)
        {
            if (maPhieuTienDoLamViec == null || maPhieuTienDoLamViec == "") return null;
            var PhieuTienDoLamViecDomain = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(maPhieuTienDoLamViec, false);
            var result = _mapper.Map<PhieuTienDoLamViecDto>(PhieuTienDoLamViecDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuTienDoLamViecDto>> CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViecRequestCreateDto PhieuTienDoLamViecDto, string user, string userId)
        {
            if (PhieuTienDoLamViecDto == null) return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            PhieuTienDoLamViec phieuTienDoLamViec = new PhieuTienDoLamViec()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPhieuTienDo = "PTDLV_" + PhieuTienDoLamViecDto.MaPDK_Mau,
                ManvXuLy = userId,
                TenGiaiDoanThucHien = PhieuTienDoLamViecDto.TenGiaiDoanThucHien,
                ThoiGianTu = PhieuTienDoLamViecDto.ThoiGianTu,
                ThoiGianDen = PhieuTienDoLamViecDto.ThoiGianDen,
                NoiDungBaoCao = PhieuTienDoLamViecDto.NoiDungBaoCao,
                GhiChu = PhieuTienDoLamViecDto.GhiChu,
                TrangThai = 1,
                MaPdkMau = PhieuTienDoLamViecDto.MaPDK_Mau,
                NguoiTao = user,
                NgayTao = DateTime.Now,
            };

            _repositoryManager.PhieuTienDoLamViec.CreatePhieuTienDoLamViecAsync(phieuTienDoLamViec);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuTienDoLamViecReturnDto = _mapper.Map<PhieuTienDoLamViecDto>(phieuTienDoLamViec);

            return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = check,
                Message = check ? "Them phieu tien do lam viec thanh cong!" : "Them phieu tien do lam viec that bai, vui long thu lai!",
                Data = PhieuTienDoLamViecReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuTienDoLamViecDto>> UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViecRequestUpdateDto PhieuTienDoLamViecDto, string user, string userId)
        {
            if (PhieuTienDoLamViecDto == null || PhieuTienDoLamViecDto.MaId == null || PhieuTienDoLamViecDto.MaId == "") return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuTienDoLamViecCheck = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(PhieuTienDoLamViecDto.MaId, true);
            if (PhieuTienDoLamViecCheck == null)
            {
                return new ResponseModel1<PhieuTienDoLamViecDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuTienDoLamViecCheck.TenGiaiDoanThucHien = string.IsNullOrEmpty(PhieuTienDoLamViecDto.TenGiaiDoanThucHien) ? PhieuTienDoLamViecCheck.TenGiaiDoanThucHien : PhieuTienDoLamViecDto.TenGiaiDoanThucHien;
            PhieuTienDoLamViecCheck.ThoiGianTu = PublicFunction.IsValidDateTime(PhieuTienDoLamViecDto.ThoiGianTu) ? PhieuTienDoLamViecDto.ThoiGianTu : PhieuTienDoLamViecCheck.ThoiGianTu;
            PhieuTienDoLamViecCheck.ThoiGianDen = PublicFunction.IsValidDateTime(PhieuTienDoLamViecDto.ThoiGianDen) ? PhieuTienDoLamViecDto.ThoiGianDen : PhieuTienDoLamViecCheck.ThoiGianDen;
            PhieuTienDoLamViecCheck.NoiDungBaoCao = string.IsNullOrEmpty(PhieuTienDoLamViecDto.NoiDungBaoCao) ? PhieuTienDoLamViecCheck.NoiDungBaoCao : PhieuTienDoLamViecDto.NoiDungBaoCao;
            PhieuTienDoLamViecCheck.NoiDungDanhGia = string.IsNullOrEmpty(PhieuTienDoLamViecDto.NoiDungDanhGia) ? PhieuTienDoLamViecCheck.NoiDungDanhGia : PhieuTienDoLamViecDto.NoiDungDanhGia;
            PhieuTienDoLamViecCheck.GhiChu = string.IsNullOrEmpty(PhieuTienDoLamViecDto.GhiChu) ? PhieuTienDoLamViecCheck.GhiChu : PhieuTienDoLamViecDto.GhiChu;
            PhieuTienDoLamViecCheck.NguoiSua = user;
            PhieuTienDoLamViecCheck.NgaySua = DateTime.Now;

            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuTienDoLamViecReturnDto = _mapper.Map<PhieuTienDoLamViecDto>(PhieuTienDoLamViecCheck);
            return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuTienDoLamViecReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuTienDoLamViecDto>> ReviewPhieuTienDoLamViec(PhieuTienDoLamViecRequestReviewDto PhieuTienDoLamViecDto, string user, string userId)
        {
            if (PhieuTienDoLamViecDto == null || PhieuTienDoLamViecDto.MaId == null || PhieuTienDoLamViecDto.MaId == "") return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuTienDoLamViecCheck = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(PhieuTienDoLamViecDto.MaId, true);
            if (PhieuTienDoLamViecCheck == null)
            {
                return new ResponseModel1<PhieuTienDoLamViecDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuTienDoLamViecCheck.NoiDungDanhGia = string.IsNullOrEmpty(PhieuTienDoLamViecDto.Message) ? PhieuTienDoLamViecCheck.NoiDungDanhGia : PhieuTienDoLamViecDto.Message;
            PhieuTienDoLamViecCheck.NguoiSua = user;
            PhieuTienDoLamViecCheck.NgaySua = DateTime.Now;
            PhieuTienDoLamViecCheck.ManvKiemTra = userId;

            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuTienDoLamViecReturnDto = _mapper.Map<PhieuTienDoLamViecDto>(PhieuTienDoLamViecCheck);
            return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = check,
                Message = check ? "Duyet thanh cong!" : "Duyet that bai",
                Data = PhieuTienDoLamViecReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuTienDoLamViecDto>> DeletePhieuTienDoLamViecAsync(string maPhieuTienDoLamViec, string user, string userId)
        {
            if (maPhieuTienDoLamViec == null) return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = "Thieu du lieu dau vao, vui long kiem tra!",
                Data = null
            };
            
            var PhieuTienDoLamViecDomain = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(maPhieuTienDoLamViec, true);
            if (PhieuTienDoLamViecDomain == null)
            {
                return new ResponseModel1<PhieuTienDoLamViecDto>
                {
                    KetQua = false,
                    Message = "Phieu can xoa khong ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }

            _repositoryManager.PhieuTienDoLamViec.DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViecDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
           
            return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = check ? "Xoa thanh cong!" : "Xoa that bai",
                Data = null
            };

        }
    }
}
