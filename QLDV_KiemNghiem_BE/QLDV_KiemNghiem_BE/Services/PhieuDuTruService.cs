using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDuTruService : IPhieuDuTruService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuDuTruService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDuTruDto>> GetPhieuDuTrusAllAsync()
        {
            var PhieuDuTruDomains = await _repositoryManager.PhieuDuTru.GetPhieuDuTrusAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuDuTruDto>>(PhieuDuTruDomains);
            return result;
        }
        public async Task<PhieuDuTruDto?> FindPhieuDuTruAsync(string maPhieuDuTru)
        {
            if (maPhieuDuTru == null || maPhieuDuTru == "") return null;
            var PhieuDuTruDomain = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(maPhieuDuTru);
            var result = _mapper.Map<PhieuDuTruDto>(PhieuDuTruDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuDuTruDto>> CreatePhieuDuTruAsync(PhieuDuTruDto PhieuDuTruDto)
        {
            if (PhieuDuTruDto == null) return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(PhieuDuTruDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuDuTruDomain = _mapper.Map<PhieuDuTru>(PhieuDuTruDto);
            PhieuDuTruDomain.MaId = Guid.NewGuid().ToString();
            PhieuDuTruDomain.NgayLap = DateTime.Now;

            _repositoryManager.PhieuDuTru.CreatePhieuDuTruAsync(PhieuDuTruDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDuTruReturnDto = _mapper.Map<PhieuDuTruDto>(PhieuDuTruDomain);

            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuDuTruReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDuTruDto>> UpdatePhieuDuTruAsync(PhieuDuTruDto PhieuDuTruDto)
        {
            if (PhieuDuTruDto == null || PhieuDuTruDto.MaId == null || PhieuDuTruDto.MaId == "") return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuDuTruCheck = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(PhieuDuTruDto.MaId);
            if (PhieuDuTruCheck == null)
            {
                return new ResponseModel1<PhieuDuTruDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var PhieuDuTruDomain = _mapper.Map<PhieuDuTru>(PhieuDuTruDto);
            PhieuDuTruDomain.NgaySua = DateTime.Now;
            PhieuDuTruDomain.NguoiSua = "admin";
            _repositoryManager.PhieuDuTru.UpdatePhieuDuTruAsync(PhieuDuTruDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDuTruReturnDto = _mapper.Map<PhieuDuTruDto>(PhieuDuTruDomain);
            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuDuTruReturnDto
            };
        }
        public async Task<bool> DeletePhieuDuTruAsync(PhieuDuTru PhieuDuTru)
        {
            if (PhieuDuTru == null) return false;
            else
            {
                var PhieuDuTruDomain = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(PhieuDuTru.MaId);
                if (PhieuDuTruDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuDuTru.DeletePhieuDuTruAsync(PhieuDuTruDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
