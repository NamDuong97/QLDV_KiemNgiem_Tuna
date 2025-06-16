using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class TieuChuanService : ITieuChuanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public TieuChuanService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<TieuChuanDto>> GetTieuChuansAllAsync()
        {
            var tieuChuanDomains = await _repositoryManager.TieuChuan.GetTieuChuansAllAsync();
            var result = _mapper.Map<IEnumerable<TieuChuanDto>>(tieuChuanDomains);
            return result;
        }
        public async Task<TieuChuanDto?> FindTieuChuanAsync(string maTieuChuan)
        {
            if (maTieuChuan == null || maTieuChuan == "") return null;
            var tieuChuanDomain = await _repositoryManager.TieuChuan.FindTieuChuanAsync(maTieuChuan);
            var result = _mapper.Map<TieuChuanDto>(tieuChuanDomain);
            return result;
        }
        public async Task<ResponseModel1<TieuChuanDto>> CreateTieuChuanAsync(TieuChuanDto tieuChuanDto)
        {
            if (tieuChuanDto == null ||  tieuChuanDto.MaId == null || tieuChuanDto.MaId == "" ||
                tieuChuanDto.TenTieuChuan == null || tieuChuanDto.TenTieuChuan == "") 
            return new ResponseModel1<TieuChuanDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.TieuChuan.FindTieuChuanAsync(tieuChuanDto.MaId);
            if(checkExistsByID != null) return new ResponseModel1<TieuChuanDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai!",
                Data = null
            };

            var nameTieuChuan = PublicFunction.processString(tieuChuanDto.TenTieuChuan);
            var checkExistsByName = await _repositoryManager.TieuChuan.FindTieuChuanByNameAsync(nameTieuChuan);
            if ((checkExistsByName?.Count() ?? 0) > 0) return new ResponseModel1<TieuChuanDto>
            {
                KetQua = false,
                Message = "Ten tieu chuan them vo da ton tai, vui long thu lai voi ten khac!",
                Data = null
            };

            var tieuChuanDomain = _mapper.Map<TieuChuan>(tieuChuanDto);
            tieuChuanDomain.MaId = Guid.NewGuid().ToString();
            tieuChuanDomain.NgayTao = DateTime.Now;

            _repositoryManager.TieuChuan.CreateTieuChuanAsync(tieuChuanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var tieuChuanReturnDto = _mapper.Map<TieuChuanDto>(tieuChuanDomain);

            return  new ResponseModel1<TieuChuanDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = tieuChuanReturnDto
            };  
        }
        public async Task<ResponseModel1<TieuChuanDto>> UpdateTieuChuanAsync(TieuChuanDto tieuChuanDto)
        {
            if (tieuChuanDto == null || tieuChuanDto.MaId == null || tieuChuanDto.MaId == "") return new ResponseModel1<TieuChuanDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            }; 

            var tieuChuanCheck = await _repositoryManager.TieuChuan.FindTieuChuanAsync(tieuChuanDto.MaId);
            if (tieuChuanCheck == null)
            {
                return new ResponseModel1<TieuChuanDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var tieuChuanDomain = _mapper.Map<TieuChuan>(tieuChuanDto);
            tieuChuanDomain.NgaySua = DateTime.Now;
            tieuChuanDomain.NguoiSua = "admin";
            _repositoryManager.TieuChuan.UpdateTieuChuanAsync(tieuChuanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var resultReturn = _mapper.Map<TieuChuanDto>(tieuChuanDomain);
            return new ResponseModel1<TieuChuanDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = resultReturn
            };
        }
        public async Task<bool> DeleteTieuChuanAsync(TieuChuan tieuChuan)
        {
            if (tieuChuan == null) return false;
            else
            {
                var TieuChuanDomain = await _repositoryManager.TieuChuan.FindTieuChuanAsync(tieuChuan.MaId);
                if (TieuChuanDomain == null)
                {
                    return false;
                }
                _repositoryManager.TieuChuan.DeleteTieuChuanAsync(TieuChuanDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
