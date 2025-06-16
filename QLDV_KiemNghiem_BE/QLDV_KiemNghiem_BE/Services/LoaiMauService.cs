
using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class LoaiMauService : ILoaiMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public LoaiMauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LoaiMauDto>> GetLoaiMausAllAsync()
        {
            var LoaiMauDomains = await _repositoryManager.LoaiMau.GetLoaiMausAllAsync();
            var result = _mapper.Map<IEnumerable<LoaiMauDto>>(LoaiMauDomains);
            return result;
        }
        public async Task<LoaiMauDto?> FindLoaiMauAsync(string maLoaiMau)
        {
            if (maLoaiMau == null || maLoaiMau == "") return null;
            var LoaiMauDomain = await _repositoryManager.LoaiMau.FindLoaiMauAsync(maLoaiMau);
            var result = _mapper.Map<LoaiMauDto>(LoaiMauDomain);
            return result;
        }
        public async Task<ResponseModel1<LoaiMauDto>> CreateLoaiMauAsync(LoaiMauRequestCreateDto LoaiMauDto, string user)
        {
            if (LoaiMauDto == null || LoaiMauDto.TenLoaiMau == null || LoaiMauDto.TenLoaiMau == "")
            {
                return new ResponseModel1<LoaiMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao vui long kiem tra"
                };
            }
            var checkExist = await _repositoryManager.LoaiMau.FindLoaiMauByNameAsync(LoaiMauDto.TenLoaiMau.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<LoaiMauDto>
                {
                    KetQua = false,
                    Message = "Ten loai mau da ton tai, vui long kiem tra lai!"
                };
            }
            LoaiMau LoaiMau = new LoaiMau()
            {
                MaId = Guid.NewGuid().ToString(),
                MaLoaiMau = "LM_" + PublicFunction.processString(LoaiMauDto.TenLoaiMau),
                TrangThai = true,
                Mota = LoaiMauDto.MoTa,
                TenLoaiMau = LoaiMauDto.TenLoaiMau,
                NgayTao = DateTime.Now,
                NguoiTao = user ?? "unknow"
            };

            _repositoryManager.LoaiMau.CreateLoaiMauAsync(LoaiMau);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<LoaiMauDto>(LoaiMau);
            return new ResponseModel1<LoaiMauDto>
            {
                KetQua = check,
                Message = check ? "Create thanh cong!" : "Create that bai!",
                Data = check ? dataReturn : null
            };
        }

        public async Task<ResponseModel1<LoaiMauDto>> UpdateLoaiMauAsync(LoaiMauRequestUpdateDto LoaiMauDto, string user)
        {
            var LoaiMauDomain = await _repositoryManager.LoaiMau.FindLoaiMauAsync(LoaiMauDto.MaId);
            if (LoaiMauDomain == null)
            {
                return new ResponseModel1<LoaiMauDto>
                {
                    KetQua = true,
                    Message = "loai mau khong ton tai, vui long kiem tra lai!"
                };
            }
            var checkExist = await _repositoryManager.LoaiMau.FindLoaiMauByNameAsync(LoaiMauDto.TenLoaiMau.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<LoaiMauDto>
                {
                    KetQua = false,
                    Message = "Ten loai mau da ton tai, vui long kiem tra lai!"
                };
            }
            LoaiMauDomain.NguoiSua = user ?? "unknow";
            LoaiMauDomain.NgaySua = DateTime.Now;
            LoaiMauDomain.MaLoaiMau = "LM_" + PublicFunction.processString(LoaiMauDto.TenLoaiMau);
            LoaiMauDomain.TenLoaiMau = LoaiMauDto.TenLoaiMau;
           

            _repositoryManager.LoaiMau.UpdateLoaiMauAsync(LoaiMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<LoaiMauDto>(LoaiMauDomain);

            return new ResponseModel1<LoaiMauDto>
            {
                KetQua = check,
                Message = check ? "Update thanh cong!" : "Update that bai!",
                Data = check ? dataReturn : null
            };
        }
        public async Task<bool> DeleteLoaiMauAsync(string maLoaiMau)
        {
            var LoaiMauDomain = await _repositoryManager.LoaiMau.FindLoaiMauAsync(maLoaiMau);
            if (LoaiMauDomain == null)
            {
                return false;
            }
            _repositoryManager.LoaiMau.DeleteLoaiMauAsync(LoaiMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
