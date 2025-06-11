using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;

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
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto PhieuPhanTichKetQuaDto)
        {
            if (PhieuPhanTichKetQuaDto == null) return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuPhanTichKetQuaDomain = _mapper.Map<PhieuPhanTichKetQua>(PhieuPhanTichKetQuaDto);
            PhieuPhanTichKetQuaDomain.MaId = Guid.NewGuid().ToString();
            PhieuPhanTichKetQuaDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhieuPhanTichKetQua.CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaDomain);

            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto PhieuPhanTichKetQuaDto)
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
            var PhieuPhanTichKetQuaDomain = _mapper.Map<PhieuPhanTichKetQua>(PhieuPhanTichKetQuaDto);
            PhieuPhanTichKetQuaDomain.NgaySua = DateTime.Now;
            PhieuPhanTichKetQuaDomain.NguoiSua = "admin";
            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaDomain);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<bool> DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            if (PhieuPhanTichKetQua == null) return false;
            else
            {
                var PhieuPhanTichKetQuaDomain = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua.MaId);
                if (PhieuPhanTichKetQuaDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuPhanTichKetQua.DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
