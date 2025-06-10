using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;

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
        public async Task<ResponseModel1<PhieuLuuMauDto>> CreatePhieuLuuMauAsync(PhieuLuuMauDto PhieuLuuMauDto)
        {
            if (PhieuLuuMauDto == null) return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuLuuMau.FindPhieuLuuMauAsync(PhieuLuuMauDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuLuuMauDomain = _mapper.Map<PhieuLuuMau>(PhieuLuuMauDto);
            PhieuLuuMauDomain.MaId = Guid.NewGuid().ToString();
            PhieuLuuMauDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhieuLuuMau.CreatePhieuLuuMauAsync(PhieuLuuMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuLuuMauReturnDto = _mapper.Map<PhieuLuuMauDto>(PhieuLuuMauDomain);

            return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuLuuMauReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuLuuMauDto>> UpdatePhieuLuuMauAsync(PhieuLuuMauDto PhieuLuuMauDto)
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
            var PhieuLuuMauDomain = _mapper.Map<PhieuLuuMau>(PhieuLuuMauDto);
            PhieuLuuMauDomain.NgaySua = DateTime.Now;
            PhieuLuuMauDomain.NguoiSua = "admin";
            _repositoryManager.PhieuLuuMau.UpdatePhieuLuuMauAsync(PhieuLuuMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuLuuMauReturnDto = _mapper.Map<PhieuLuuMauDto>(PhieuLuuMauDomain);
            return new ResponseModel1<PhieuLuuMauDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuLuuMauReturnDto
            };
        }
        public async Task<bool> DeletePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau)
        {
            if (PhieuLuuMau == null) return false;
            else
            {
                var PhieuLuuMauDomain = await _repositoryManager.PhieuLuuMau.FindPhieuLuuMauAsync(PhieuLuuMau.MaId);
                if (PhieuLuuMauDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuLuuMau.DeletePhieuLuuMauAsync(PhieuLuuMauDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
