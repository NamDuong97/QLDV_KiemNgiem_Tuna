using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class DmMauService : IDmMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public DmMauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DmMauDto>> GetDmMausAllAsync()
        {
            var DmMauDomains = await _repositoryManager.DmMau.GetDmMausAllAsync();
            var result = _mapper.Map<IEnumerable<DmMauDto>>(DmMauDomains);
            return result;
        }
        public async Task<DmMauDto?> FindDmMauAsync(string maDmMau)
        {
            if (maDmMau == null || maDmMau == "") return null;
            var DmMauDomain = await _repositoryManager.DmMau.FindDmMauAsync(maDmMau);
            var result = _mapper.Map<DmMauDto>(DmMauDomain);
            return result;
        }

        public async Task<ResponseModel1<DmMauDto>> CreateDmMauAsync(DmMauRequestCreateDto DmMauDto, string user)
        {
            if (DmMauDto == null || DmMauDto.TenMau == null || DmMauDto.TenMau == "")
            {
                return new ResponseModel1<DmMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao vui long kiem tra"
                };
            }
            var checkExist = await _repositoryManager.DmMau.FindDmMauByNameAsync(DmMauDto.TenMau.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<DmMauDto>
                {
                    KetQua = false,
                    Message = "Ten dm mau da ton tai, vui long kiem tra lai!"
                };
            }
            DmMau DmMau = new DmMau()
            {
                MaId = Guid.NewGuid().ToString(),
                MaLoaiMau = DmMauDto.MaLoaiMau,
                TrangThai = true,
                GhiChu = DmMauDto.GhiChu,
                TenMau = DmMauDto.TenMau,
                NgayTao = DateTime.Now,
                NguoiTao = user ?? "unknow"
            };

            _repositoryManager.DmMau.CreateDmMauAsync(DmMau);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<DmMauDto>(DmMau);
            return new ResponseModel1<DmMauDto>
            {
                KetQua = check,
                Message = check ? "Create thanh cong!" : "Create that bai!",
                Data = check ? dataReturn : null
            };
        }

        public async Task<ResponseModel1<DmMauDto>> UpdateDmMauAsync(DmMauRequestUpdateDto DmMauDto, string user)
        {
            var DmMauDomain = await _repositoryManager.DmMau.FindDmMauAsync(DmMauDto.MaId);
            if (DmMauDomain == null)
            {
                return new ResponseModel1<DmMauDto>
                {
                    KetQua = true,
                    Message = "dm mau khong ton tai, vui long kiem tra lai!"
                };
            }
            var checkExist = await _repositoryManager.DmMau.FindDmMauByNameAsync(DmMauDto.TenMau.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<DmMauDto>
                {
                    KetQua = false,
                    Message = "Ten dm mau da ton tai, vui long kiem tra lai!"
                };
            }
            DmMauDomain.NguoiSua = user ?? "unknow";
            DmMauDomain.NgaySua = DateTime.Now;
            DmMauDomain.MaLoaiMau = DmMauDto.MaLoaiMau;
            DmMauDomain.GhiChu = DmMauDto.GhiChu;
            DmMauDomain.TenMau = DmMauDto.TenMau;

            _repositoryManager.DmMau.UpdateDmMauAsync(DmMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<DmMauDto>(DmMauDomain);

            return new ResponseModel1<DmMauDto>
            {
                KetQua = check,
                Message = check ? "Update thanh cong!" : "Update that bai!",
                Data = check ? dataReturn : null
            };
        }
        public async Task<bool> DeleteDmMauAsync(string maDmMau)
        {
            var DmMauDomain = await _repositoryManager.DmMau.FindDmMauAsync(maDmMau);
            if (DmMauDomain == null)
            {
                return false;
            }
            _repositoryManager.DmMau.DeleteDmMauAsync(DmMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
