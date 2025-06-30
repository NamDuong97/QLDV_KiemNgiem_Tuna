using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuLuuMauService : IPhieuLuuMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuLuuMauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuLuuMauDto>> GetPhieuLuuMausAllAsync()
        {
            var PhieuLuuMauDomains = await _repositoryManager.PhieuLuuMau.GetPhieuLuuMausAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuLuuMauDto>>(PhieuLuuMauDomains);
            return result;
        }
        public async Task<PhieuLuuMauDto?> FindPhieuLuuMauAsync(string maPhieuLuuMau)
        {
            if (maPhieuLuuMau == null || maPhieuLuuMau == "") return null;
            var PhieuLuuMauDomain = await _repositoryManager.PhieuLuuMau.FindPhieuLuuMauAsync(maPhieuLuuMau);
            var result = _mapper.Map<PhieuLuuMauDto>(PhieuLuuMauDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuLuuMauDto>> CreatePhieuLuuMauAsync(PhieuLuuMauRequestCreateDto PhieuLuuMauDto, string user)
        {
            if (PhieuLuuMauDto == null) return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            PhieuLuuMau phieuLuuMau = new PhieuLuuMau()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPhieuLuu = "PLM_" + PublicFunction.processString(PhieuLuuMauDto.TenMau),
                MaPdkMau = PhieuLuuMauDto.MaPdkMau,
                DonViTinh = PhieuLuuMauDto.DonViTinh,
                SoLuong = PhieuLuuMauDto.SoLuong,
                LuuDenNgay = PhieuLuuMauDto.LuuDenNgay,
                ManvLuu = PhieuLuuMauDto.ManvLuu,
                TrangThai = "active",
                NgayTao = DateTime.Now,
                NguoiTao = user,
                HanSuDung = PhieuLuuMauDto.HanSuDung,
                TenMau = PhieuLuuMauDto.TenMau,
            };

            _repositoryManager.PhieuLuuMau.CreatePhieuLuuMauAsync(phieuLuuMau);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuLuuMauReturnDto = _mapper.Map<PhieuLuuMauDto>(phieuLuuMau);

            return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuLuuMauReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuLuuMauDto>> UpdatePhieuLuuMauAsync(PhieuLuuMauRequestUpdateDto PhieuLuuMauDto, string user)
        {
            if (PhieuLuuMauDto == null || PhieuLuuMauDto.MaId == null || PhieuLuuMauDto.MaId == "") return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuLuuMauCheck = await _repositoryManager.PhieuLuuMau.FindPhieuLuuMauAsync(PhieuLuuMauDto.MaId);
            if (PhieuLuuMauCheck == null)
            {
                return new ResponseModel1<PhieuLuuMauDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuLuuMauCheck.DonViTinh = string.IsNullOrEmpty(PhieuLuuMauDto.DonViTinh) ? PhieuLuuMauCheck.DonViTinh : PhieuLuuMauDto.DonViTinh;
            PhieuLuuMauCheck.SoLuong = PhieuLuuMauDto.SoLuong != 0 ? PhieuLuuMauDto.SoLuong : PhieuLuuMauCheck.SoLuong;
            PhieuLuuMauCheck.LuuDenNgay = PublicFunction.IsValidDateTime(PhieuLuuMauDto.LuuDenNgay) ? PhieuLuuMauDto.LuuDenNgay : PhieuLuuMauCheck.LuuDenNgay;
            PhieuLuuMauCheck.ManvLuu = string.IsNullOrEmpty(PhieuLuuMauDto.ManvLuu) ? PhieuLuuMauCheck.ManvLuu : PhieuLuuMauDto.ManvLuu;
            PhieuLuuMauCheck.HanSuDung = PublicFunction.IsValidDateTime(PhieuLuuMauDto.HanSuDung) ? PhieuLuuMauDto.HanSuDung : PhieuLuuMauCheck.HanSuDung;
            PhieuLuuMauCheck.NgaySua = DateTime.Now;
            PhieuLuuMauCheck.NguoiSua = user;

            _repositoryManager.PhieuLuuMau.UpdatePhieuLuuMauAsync(PhieuLuuMauCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuLuuMauReturnDto = _mapper.Map<PhieuLuuMauDto>(PhieuLuuMauCheck);
            return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuLuuMauReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuLuuMauDto>> DeletePhieuLuuMauAsync(string maPhieuLuuMau, string user, bool isDel)
        {
            var PhieuLuuMauDomain = await _repositoryManager.PhieuLuuMau.FindPhieuLuuMauAsync(maPhieuLuuMau);
            if (PhieuLuuMauDomain == null)
            {
                return new ResponseModel1<PhieuLuuMauDto>
                {
                    KetQua = false,
                    Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                    Data = null
                };
            }
            if(isDel)
            {
                _repositoryManager.PhieuLuuMau.DeletePhieuLuuMauAsync(PhieuLuuMauDomain);
            }
            else
            {
                PhieuLuuMauDomain.TrangThai = "no active";
                PhieuLuuMauDomain.NgaySua = DateTime.Now;
                PhieuLuuMauDomain.NguoiSua = user;
                _repositoryManager.PhieuLuuMau.UpdatePhieuLuuMauAsync(PhieuLuuMauDomain);
            }
            bool check = await _repositoryManager.SaveChangesAsync();
            return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = check,
                Message = check?  "Xoa thanh cong!": "Xoa that bai!",
            };
        }
    }
}
