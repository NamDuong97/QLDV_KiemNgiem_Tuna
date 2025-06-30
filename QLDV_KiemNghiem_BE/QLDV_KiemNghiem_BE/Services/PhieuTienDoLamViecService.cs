using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuTienDoLamViecService : IPhieuTienDoLamViecService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuTienDoLamViecService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<PhieuTienDoLamViecProcedureDto> datas, Pagination pagi)> GetPhieuTienDoLamViecAllAsync(PhieuTienDoLamViecParam param)
        {
            var phieuTienDoDomains = await _repositoryManager.PhieuTienDoLamViec.GetPhieuTienDoLamViecAllAsync(param);
            var phieuTienDoDtos = _mapper.Map<List<PhieuTienDoLamViecProcedureDto>>(phieuTienDoDomains);
            return (datas: phieuTienDoDtos, pagi: phieuTienDoDomains.Pagination);
        }
        public async Task<PhieuTienDoLamViecProcedureDto?> FindPhieuTienDoLamViecShowAsync(string maPhieuTienDoLamViec)
        {
            if (maPhieuTienDoLamViec == null || maPhieuTienDoLamViec == "") return null;
            var PhieuTienDoLamViecDomain = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecShowAsync(maPhieuTienDoLamViec);
            var result = _mapper.Map<PhieuTienDoLamViecProcedureDto>(PhieuTienDoLamViecDomain);
            return null;
        }
        public async Task<PhieuTienDoLamViecDto?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec)
        {
            if (maPhieuTienDoLamViec == null || maPhieuTienDoLamViec == "") return null;
            var PhieuTienDoLamViecDomain = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(maPhieuTienDoLamViec);
            var result = _mapper.Map<PhieuTienDoLamViecDto>(PhieuTienDoLamViecDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuTienDoLamViecDto>> CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDto PhieuTienDoLamViecDto)
        {
            if (PhieuTienDoLamViecDto == null) return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(PhieuTienDoLamViecDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuTienDoLamViecDomain = _mapper.Map<PhieuTienDoLamViec>(PhieuTienDoLamViecDto);
            PhieuTienDoLamViecDomain.MaId = Guid.NewGuid().ToString();
            PhieuTienDoLamViecDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhieuTienDoLamViec.CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuTienDoLamViecReturnDto = _mapper.Map<PhieuTienDoLamViecDto>(PhieuTienDoLamViecDomain);

            return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuTienDoLamViecReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuTienDoLamViecDto>> UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDto PhieuTienDoLamViecDto)
        {
            if (PhieuTienDoLamViecDto == null || PhieuTienDoLamViecDto.MaId == null || PhieuTienDoLamViecDto.MaId == "") return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuTienDoLamViecCheck = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(PhieuTienDoLamViecDto.MaId);
            if (PhieuTienDoLamViecCheck == null)
            {
                return new ResponseModel1<PhieuTienDoLamViecDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var PhieuTienDoLamViecDomain = _mapper.Map<PhieuTienDoLamViec>(PhieuTienDoLamViecDto);
            PhieuTienDoLamViecDomain.NgaySua = DateTime.Now;
            PhieuTienDoLamViecDomain.NguoiSua = "admin";
            _repositoryManager.PhieuTienDoLamViec.UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuTienDoLamViecReturnDto = _mapper.Map<PhieuTienDoLamViecDto>(PhieuTienDoLamViecDomain);
            return new ResponseModel1<PhieuTienDoLamViecDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuTienDoLamViecReturnDto
            };
        }
        public async Task<bool> DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            if (PhieuTienDoLamViec == null) return false;
            else
            {
                var PhieuTienDoLamViecDomain = await _repositoryManager.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(PhieuTienDoLamViec.MaId);
                if (PhieuTienDoLamViecDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuTienDoLamViec.DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViecDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
