using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChiTieuService : IChiTieuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public ChiTieuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTieuDto>> GetChiTieuAllAsync()
        {
            var ChiTieuDomains = await _repositoryManager.ChiTieu.GetChiTieusAllAsync();
            var ChiTieuDtos = _mapper.Map<List<ChiTieuDto>>(ChiTieuDomains);
            return ChiTieuDtos;
        }
        public async Task<ChiTieuDto?> FindChiTieuAsync(string maChiTieu)
        {
            if (maChiTieu == null || maChiTieu == "") return null;
            var chiTieuDomain = await _repositoryManager.ChiTieu.FindChiTieuAsync(maChiTieu);
            var chiTieuDto = _mapper.Map<ChiTieuDto>(chiTieuDomain);
            return chiTieuDto;
        }

        public async Task<ResponseModel1<ChiTieuDto>> CreateChiTieuAsync(ChiTieuRequestCreateDto chiTieuDto, string user)
        {
            if (chiTieuDto == null || chiTieuDto.TenChiTieu == null || chiTieuDto.TenChiTieu == "")
            {
                return new ResponseModel1<ChiTieuDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao vui long kiem tra"
                };
            }
            var checkExist = await _repositoryManager.ChiTieu.FindChiTieuByNameAsync(chiTieuDto.TenChiTieu.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<ChiTieuDto>
                {
                    KetQua = false,
                    Message = "Ten chi tieu da ton tai, vui long kiem tra lai!"
                };
            }
            ChiTieu chiTieu = new ChiTieu()
            {
                MaId = Guid.NewGuid().ToString(),
                MaChiTieu = "CT_" + PublicFunction.processString(chiTieuDto.TenChiTieu),
                TrangThai = true,
                GhiChu = chiTieuDto.GhiChu,
                TenChiTieu = chiTieuDto.TenChiTieu,
                NgayTao = DateTime.Now,
                NguoiTao = user ?? "unknow"
            };

            _repositoryManager.ChiTieu.CreateChiTieuAsync(chiTieu);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<ChiTieuDto>(chiTieu);
            return new ResponseModel1<ChiTieuDto>
            {
                KetQua = check,
                Message = check ? "Create thanh cong!" : "Create that bai!",
                Data = check ? dataReturn : null
            };
        }

        public async Task<ResponseModel1<ChiTieuDto>> UpdateChiTieuAsync(ChiTieuRequestUpdateDto chiTieuDto, string user)
        {
            var chiTieuDomain = await _repositoryManager.ChiTieu.FindChiTieuAsync(chiTieuDto.MaId);
            if (chiTieuDomain == null)
            {
                return new ResponseModel1<ChiTieuDto>
                {
                    KetQua = true,
                    Message = "Ten danh muc plhc da ton tai, vui long kiem tra lai!"
                };
            }
            var checkExist = await _repositoryManager.ChiTieu.FindChiTieuByNameAsync(chiTieuDto.TenChiTieu.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<ChiTieuDto>
                {
                    KetQua = false,
                    Message = "Ten chi tieu da ton tai, vui long kiem tra lai!"
                };
            }
            chiTieuDomain.NguoiSua = user ?? "unknow";
            chiTieuDomain.NgaySua = DateTime.Now;
            chiTieuDomain.MaChiTieu = "CT_" + PublicFunction.processString(chiTieuDto.TenChiTieu);
            chiTieuDomain.GhiChu = chiTieuDto.GhiChu;
            chiTieuDomain.TenChiTieu = chiTieuDto.TenChiTieu;

            _repositoryManager.ChiTieu.UpdateChiTieuAsync(chiTieuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<ChiTieuDto>(chiTieuDomain);

            return new ResponseModel1<ChiTieuDto>
            {
                KetQua = check,
                Message = check ? "Update thanh cong!" : "Update that bai!",
                Data = check ? dataReturn : null
            };
        }
        public async Task<bool> DeleteChiTieuAsync(string maChiTieu)
        {
            var ChiTieuDomain = await _repositoryManager.ChiTieu.FindChiTieuAsync(maChiTieu);
            if (ChiTieuDomain == null)
            {
                return false;
            }
            _repositoryManager.ChiTieu.DeleteChiTieuAsync(ChiTieuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
