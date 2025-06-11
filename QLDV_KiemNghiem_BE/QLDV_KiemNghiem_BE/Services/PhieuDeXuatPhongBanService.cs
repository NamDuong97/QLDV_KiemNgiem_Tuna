using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDeXuatPhongBanService : IPhieuDeXuatPhongBanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuDeXuatPhongBanService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDeXuatPhongBanDto>> GetPhieuDeXuatPhongBansAllAsync()
        {
            var PhieuDeXuatPhongBanDomains = await _repositoryManager.PhieuDeXuatPhongBan.GetPhieuDeXuatPhongBansAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuDeXuatPhongBanDto>>(PhieuDeXuatPhongBanDomains);
            return result;
        }
        public async Task<PhieuDeXuatPhongBanDto?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan)
        {
            if (maPhieuDeXuatPhongBan == null || maPhieuDeXuatPhongBan == "") return null;
            var PhieuDeXuatPhongBanDomain = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(maPhieuDeXuatPhongBan);
            var result = _mapper.Map<PhieuDeXuatPhongBanDto>(PhieuDeXuatPhongBanDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuDeXuatPhongBanDto>> CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto PhieuDeXuatPhongBanDto)
        {
            if (PhieuDeXuatPhongBanDto == null) return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuDeXuatPhongBanDomain = _mapper.Map<PhieuDeXuatPhongBan>(PhieuDeXuatPhongBanDto);
            PhieuDeXuatPhongBanDomain.MaId = Guid.NewGuid().ToString();
            PhieuDeXuatPhongBanDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhieuDeXuatPhongBan.CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDeXuatPhongBanReturnDto = _mapper.Map<PhieuDeXuatPhongBanDto>(PhieuDeXuatPhongBanDomain);

            return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDeXuatPhongBanDto>> UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto PhieuDeXuatPhongBanDto)
        {
            if (PhieuDeXuatPhongBanDto == null || PhieuDeXuatPhongBanDto.MaId == null || PhieuDeXuatPhongBanDto.MaId == "") return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuDeXuatPhongBanCheck = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto.MaId);
            if (PhieuDeXuatPhongBanCheck == null)
            {
                return new ResponseModel1<PhieuDeXuatPhongBanDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var PhieuDeXuatPhongBanDomain = _mapper.Map<PhieuDeXuatPhongBan>(PhieuDeXuatPhongBanDto);
            PhieuDeXuatPhongBanDomain.NgaySua = DateTime.Now;
            PhieuDeXuatPhongBanDomain.NguoiSua = "admin";
            _repositoryManager.PhieuDeXuatPhongBan.UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDeXuatPhongBanReturnDto = _mapper.Map<PhieuDeXuatPhongBanDto>(PhieuDeXuatPhongBanDomain);
            return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<bool> DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            if (PhieuDeXuatPhongBan == null) return false;
            else
            {
                var PhieuDeXuatPhongBanDomain = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan.MaId);
                if (PhieuDeXuatPhongBanDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuDeXuatPhongBan.DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
