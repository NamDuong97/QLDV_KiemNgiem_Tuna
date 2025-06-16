using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuChiService : IPhieuChiService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuChiService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuChiDto>> GetPhieuChisAllAsync()
        {
            var PhieuChiDomains = await _repositoryManager.PhieuChi.GetPhieuChisAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuChiDto>>(PhieuChiDomains);
            return result;
        }
        public async Task<PhieuChiDto?> FindPhieuChiAsync(string maPhieuChi)
        {
            if (maPhieuChi == null || maPhieuChi == "") return null;
            var PhieuChiDomain = await _repositoryManager.PhieuChi.FindPhieuChiAsync(maPhieuChi);
            var result = _mapper.Map<PhieuChiDto>(PhieuChiDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuChiDto>> CreatePhieuChiAsync(PhieuChiDto PhieuChiDto)
        {
            if (PhieuChiDto == null) return new ResponseModel1<PhieuChiDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuChi.FindPhieuChiAsync(PhieuChiDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuChiDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuChiDomain = _mapper.Map<PhieuChi>(PhieuChiDto);
            PhieuChiDomain.MaId = Guid.NewGuid().ToString();
            PhieuChiDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhieuChi.CreatePhieuChiAsync(PhieuChiDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuChiReturnDto = _mapper.Map<PhieuChiDto>(PhieuChiDomain);

            return new ResponseModel1<PhieuChiDto>
            {
                KetQua = check,
                Message = check ? "Them phieu chi thanh cong!" : "Them phieu chi that bai, vui long thu lai!",
                Data = PhieuChiReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuChiDto>> UpdatePhieuChiAsync(PhieuChiDto PhieuChiDto)
        {
            if (PhieuChiDto == null || PhieuChiDto.MaId == null || PhieuChiDto.MaId == "") return new ResponseModel1<PhieuChiDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuChiCheck = await _repositoryManager.PhieuChi.FindPhieuChiAsync(PhieuChiDto.MaId);
            if (PhieuChiCheck == null)
            {
                return new ResponseModel1<PhieuChiDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var PhieuChiDomain = _mapper.Map<PhieuChi>(PhieuChiDto);
            PhieuChiDomain.NgaySua = DateTime.Now;
            PhieuChiDomain.NguoiSua = "admin";
            _repositoryManager.PhieuChi.UpdatePhieuChiAsync(PhieuChiDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuChiReturnDto = _mapper.Map<PhieuChiDto>(PhieuChiDomain);
            return new ResponseModel1<PhieuChiDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuChiReturnDto
            };
        }
        public async Task<bool> DeletePhieuChiAsync(PhieuChi PhieuChi)
        {
            if (PhieuChi == null) return false;
            else
            {
                var PhieuChiDomain = await _repositoryManager.PhieuChi.FindPhieuChiAsync(PhieuChi.MaId);
                if (PhieuChiDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuChi.DeletePhieuChiAsync(PhieuChiDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
