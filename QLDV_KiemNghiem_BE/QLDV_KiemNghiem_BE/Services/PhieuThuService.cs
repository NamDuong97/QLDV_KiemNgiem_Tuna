using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuThuService : IPhieuThuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuThuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuThuDto>> GetPhieuThusAllAsync()
        {
            var PhieuThuDomains = await _repositoryManager.PhieuThu.GetPhieuThusAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuThuDto>>(PhieuThuDomains);
            return result;
        }
        public async Task<PhieuThuDto?> FindPhieuThuAsync(string maPhieuThu)
        {
            if (maPhieuThu == null || maPhieuThu == "") return null;
            var PhieuThuDomain = await _repositoryManager.PhieuThu.FindPhieuThuAsync(maPhieuThu);
            var result = _mapper.Map<PhieuThuDto>(PhieuThuDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuThuDto>> CreatePhieuThuAsync(PhieuThuDto PhieuThuDto)
        {
            if (PhieuThuDto == null) return new ResponseModel1<PhieuThuDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuThu.FindPhieuThuAsync(PhieuThuDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuThuDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuThuDomain = _mapper.Map<PhieuThu>(PhieuThuDto);
            PhieuThuDomain.MaId = Guid.NewGuid().ToString();
            PhieuThuDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhieuThu.CreatePhieuThuAsync(PhieuThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuThuReturnDto = _mapper.Map<PhieuThuDto>(PhieuThuDomain);

            return new ResponseModel1<PhieuThuDto>
            {
                KetQua = check,
                Message = check ? "Them phieu thu thanh cong!" : "Them phieu thu that bai, vui long thu lai!",
                Data = PhieuThuReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuThuDto>> UpdatePhieuThuAsync(PhieuThuDto PhieuThuDto)
        {
            if (PhieuThuDto == null || PhieuThuDto.MaId == null || PhieuThuDto.MaId == "") return new ResponseModel1<PhieuThuDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuThuCheck = await _repositoryManager.PhieuThu.FindPhieuThuAsync(PhieuThuDto.MaId);
            if (PhieuThuCheck == null)
            {
                return new ResponseModel1<PhieuThuDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var PhieuThuDomain = _mapper.Map<PhieuThu>(PhieuThuDto);
            PhieuThuDomain.NgaySua = DateTime.Now;
            PhieuThuDomain.NguoiSua = "admin";
            _repositoryManager.PhieuThu.UpdatePhieuThuAsync(PhieuThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuThuReturnDto = _mapper.Map<PhieuThuDto>(PhieuThuDomain);
            return new ResponseModel1<PhieuThuDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuThuReturnDto
            };
        }
        public async Task<bool> DeletePhieuThuAsync(PhieuThu PhieuThu)
        {
            if (PhieuThu == null) return false;
            else
            {
                var PhieuThuDomain = await _repositoryManager.PhieuThu.FindPhieuThuAsync(PhieuThu.MaId);
                if (PhieuThuDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuThu.DeletePhieuThuAsync(PhieuThuDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
