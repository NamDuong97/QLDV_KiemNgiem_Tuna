using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class BoPhanService : IBoPhanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public BoPhanService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<BoPhanDto>> GetBoPhansAllAsync()
        {
            var BoPhanDomains = await _repositoryManager.BoPhan.GetBoPhansAllAsync();
            var result = _mapper.Map<IEnumerable<BoPhanDto>>(BoPhanDomains);
            return result;
        }
        public async Task<BoPhanDto?> FindBoPhanAsync(string maBoPhan)
        {
            if (maBoPhan == null || maBoPhan == "") return null;
            var BoPhanDomain = await _repositoryManager.BoPhan.FindBoPhanAsync(maBoPhan);
            var result = _mapper.Map<BoPhanDto>(BoPhanDomain);
            return result;
        }
        public async Task<ResponseModel1<BoPhanDto>> CreateBoPhanAsync(BoPhanRequestCreateDto BoPhan, string user)
        {
            if (BoPhan==null || BoPhan.TenBoPhan == null || BoPhan.TenBoPhan == "")
            {
                return new ResponseModel1<BoPhanDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao vui long kiem tra"
                };
            }
            var checkExist = await _repositoryManager.BoPhan.FindBoPhanByNameAsync(BoPhan.TenBoPhan.ToLower().Trim());
            if(checkExist!= null)
            {
                return new ResponseModel1<BoPhanDto> {
                    KetQua = false,
                    Message = "Ten bo phan da ton tai, vui long kiem tra lai!"
                };
            }
            BoPhan boPhan = new BoPhan()
            {
                MaId = Guid.NewGuid().ToString(),
                MaBoPhan = "BP_" + PublicFunction.processString(BoPhan.TenBoPhan),
                TenBoPhan = BoPhan.TenBoPhan,
                TrangThai = true,
                NgayTao = DateTime.Now,
                NguoiTao = user ?? "unknow"
            };
          
            _repositoryManager.BoPhan.CreateBoPhanAsync(boPhan);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<BoPhanDto>(boPhan);
            return new ResponseModel1<BoPhanDto> { 
                KetQua = check,
                Message = check ? "Create thanh cong!" : "Create that bai!",
                Data = check ? dataReturn : null
            };
        }
        public async Task<ResponseModel1<BoPhanDto>> UpdateBoPhanAsync(BoPhanRequestUpdateDto BoPhan, string user)
        {
            var boPhanDomain = await _repositoryManager.BoPhan.FindBoPhanAsync(BoPhan.MaId);
            if (boPhanDomain == null)
            {
                return new ResponseModel1<BoPhanDto>
                {
                    KetQua = true,
                    Message = "Ten bo phan da ton tai, vui long kiem tra lai!"
                };
            }
            var checkExist = await _repositoryManager.BoPhan.FindBoPhanByNameAsync(BoPhan.TenBoPhan.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<BoPhanDto>
                {
                    KetQua = false,
                    Message = "Ten bo phan da ton tai, vui long kiem tra lai!"
                };
            }
            boPhanDomain.NguoiSua = user ?? "unknow";
            boPhanDomain.NgaySua = DateTime.Now;
            boPhanDomain.MaBoPhan = "BP_" + PublicFunction.processString(BoPhan.TenBoPhan);
            boPhanDomain.TenBoPhan = BoPhan.TenBoPhan;

            _repositoryManager.BoPhan.UpdateBoPhanAsync(boPhanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<BoPhanDto>(boPhanDomain);

            return new ResponseModel1<BoPhanDto>
            {
                KetQua = check,
                Message = check ? "Update thanh cong!" : "Update that bai!",
                Data = check ? dataReturn : null
            };
        }
        public async Task<bool> DeleteBoPhanAsync(string maBoPhan)
        {
            var BoPhanDomain = await _repositoryManager.BoPhan.FindBoPhanAsync(maBoPhan);
            if (BoPhanDomain == null)
            {
                return false;
            }
            _repositoryManager.BoPhan.DeleteBoPhanAsync(BoPhanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
