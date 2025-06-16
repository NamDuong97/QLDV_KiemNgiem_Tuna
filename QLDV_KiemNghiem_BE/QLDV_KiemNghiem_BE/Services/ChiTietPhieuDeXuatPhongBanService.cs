using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChiTietPhieuDeXuatPhongBanService : IChiTietPhieuDeXuatPhongBanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChiTietPhieuDeXuatPhongBanService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietPhieuDeXuatPhongBanDto>> GetChiTietPhieuDeXuatPhongBansAllAsync()
        {
            var ChiTietPhieuDeXuatPhongBanDomains = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.GetChiTietPhieuDeXuatPhongBansAllAsync();
            var result = _mapper.Map<IEnumerable<ChiTietPhieuDeXuatPhongBanDto>>(ChiTietPhieuDeXuatPhongBanDomains);
            return result;
        }
        public async Task<ChiTietPhieuDeXuatPhongBanDto?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan)
        {
            if (maChiTietPhieuDeXuatPhongBan == null || maChiTietPhieuDeXuatPhongBan == "") return null;
            var ChiTietPhieuDeXuatPhongBanDomain = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(maChiTietPhieuDeXuatPhongBan);
            var result = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(ChiTietPhieuDeXuatPhongBanDomain);
            return result;
        }
        public async Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto)
        {
            if (ChiTietPhieuDeXuatPhongBanDto == null) return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var ChiTietPhieuDeXuatPhongBanDomain = _mapper.Map<ChiTietPhieuDeXuatPhongBan>(ChiTietPhieuDeXuatPhongBanDto);
            ChiTietPhieuDeXuatPhongBanDomain.MaId = Guid.NewGuid().ToString();
            ChiTietPhieuDeXuatPhongBanDomain.NgayTao = DateTime.Now;

            _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var ChiTietPhieuDeXuatPhongBanReturnDto = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(ChiTietPhieuDeXuatPhongBanDomain);

            return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Them chi tiet phieu de xuat phong ban thanh cong!" : "Them chi tiet phieu de xuat phong ban that bai, vui long thu lai!",
                Data = ChiTietPhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto)
        {
            if (ChiTietPhieuDeXuatPhongBanDto == null || ChiTietPhieuDeXuatPhongBanDto.MaId == null || ChiTietPhieuDeXuatPhongBanDto.MaId == "") return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var ChiTietPhieuDeXuatPhongBanCheck = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto.MaId);
            if (ChiTietPhieuDeXuatPhongBanCheck == null)
            {
                return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var ChiTietPhieuDeXuatPhongBanDomain = _mapper.Map<ChiTietPhieuDeXuatPhongBan>(ChiTietPhieuDeXuatPhongBanDto);
            ChiTietPhieuDeXuatPhongBanDomain.NgaySua = DateTime.Now;
            ChiTietPhieuDeXuatPhongBanDomain.NguoiSua = "admin";
            _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var ChiTietPhieuDeXuatPhongBanReturnDto = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(ChiTietPhieuDeXuatPhongBanDomain);
            return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = ChiTietPhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<bool> DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            if (ChiTietPhieuDeXuatPhongBan == null) return false;
            else
            {
                var ChiTietPhieuDeXuatPhongBanDomain = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan.MaId);
                if (ChiTietPhieuDeXuatPhongBanDomain == null)
                {
                    return false;
                }
                _repositoryManager.ChiTietPhieuDeXuatPhongBan.DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
