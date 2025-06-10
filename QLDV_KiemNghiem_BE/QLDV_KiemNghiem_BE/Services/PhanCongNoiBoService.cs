using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;

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
        public async Task<IEnumerable<PhanCongNoiBoDto>> GetPhanCongNoiBosAllAsync()
        {
            var PhanCongNoiBoDomains = await _repositoryManager.PhanCongNoiBo.GetPhanCongNoiBosAllAsync();
            var result = _mapper.Map<IEnumerable<PhanCongNoiBoDto>>(PhanCongNoiBoDomains);
            return result;
        }
        public async Task<PhanCongNoiBoDto?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo)
        {
            if (maPhanCongNoiBo == null || maPhanCongNoiBo == "") return null;
            var PhanCongNoiBoDomain = await _repositoryManager.PhanCongNoiBo.FindPhanCongNoiBoAsync(maPhanCongNoiBo);
            var result = _mapper.Map<PhanCongNoiBoDto>(PhanCongNoiBoDomain);
            return result;
        }
        public async Task<ResponseModel1<PhanCongNoiBoDto>> CreatePhanCongNoiBoAsync(PhanCongNoiBoDto PhanCongNoiBoDto)
        {
            if (PhanCongNoiBoDto == null) return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhanCongNoiBo.FindPhanCongNoiBoAsync(PhanCongNoiBoDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhanCongNoiBoDomain = _mapper.Map<PhanCongNoiBo>(PhanCongNoiBoDto);
            PhanCongNoiBoDomain.MaId = Guid.NewGuid().ToString();
            PhanCongNoiBoDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhanCongNoiBo.CreatePhanCongNoiBoAsync(PhanCongNoiBoDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhanCongNoiBoReturnDto = _mapper.Map<PhanCongNoiBoDto>(PhanCongNoiBoDomain);

            return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhanCongNoiBoReturnDto
            };
        }
        public async Task<ResponseModel1<PhanCongNoiBoDto>> UpdatePhanCongNoiBoAsync(PhanCongNoiBoDto PhanCongNoiBoDto)
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
            var PhanCongNoiBoDomain = _mapper.Map<PhanCongNoiBo>(PhanCongNoiBoDto);
            PhanCongNoiBoDomain.NgaySua = DateTime.Now;
            PhanCongNoiBoDomain.NguoiSua = "admin";
            _repositoryManager.PhanCongNoiBo.UpdatePhanCongNoiBoAsync(PhanCongNoiBoDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhanCongNoiBoReturnDto = _mapper.Map<PhanCongNoiBoDto>(PhanCongNoiBoDomain);
            return new ResponseModel1<PhanCongNoiBoDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhanCongNoiBoReturnDto
            };
        }
        public async Task<bool> DeletePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo)
        {
            if (PhanCongNoiBo == null) return false;
            else
            {
                var PhanCongNoiBoDomain = await _repositoryManager.PhanCongNoiBo.FindPhanCongNoiBoAsync(PhanCongNoiBo.MaId);
                if (PhanCongNoiBoDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhanCongNoiBo.DeletePhanCongNoiBoAsync(PhanCongNoiBoDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
