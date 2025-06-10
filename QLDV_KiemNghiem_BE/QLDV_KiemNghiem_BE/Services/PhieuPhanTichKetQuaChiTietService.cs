using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuPhanTichKetQuaChiTietService : IPhieuPhanTichKetQuaChiTietService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaChiTietService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuPhanTichKetQuaChiTietDto>> GetPhieuPhanTichKetQuaChiTietsAllAsync()
        {
            var PhieuPhanTichKetQuaChiTietDomains = await _repositoryManager.PhieuPhanTichKetQuaChiTiet.GetPhieuPhanTichKetQuaChiTietsAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuPhanTichKetQuaChiTietDto>>(PhieuPhanTichKetQuaChiTietDomains);
            return result;
        }
        public async Task<PhieuPhanTichKetQuaChiTietDto?> FindPhieuPhanTichKetQuaChiTietAsync(string maPhieuPhanTichKetQuaChiTiet)
        {
            if (maPhieuPhanTichKetQuaChiTiet == null || maPhieuPhanTichKetQuaChiTiet == "") return null;
            var PhieuPhanTichKetQuaChiTietDomain = await _repositoryManager.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietAsync(maPhieuPhanTichKetQuaChiTiet);
            var result = _mapper.Map<PhieuPhanTichKetQuaChiTietDto>(PhieuPhanTichKetQuaChiTietDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaChiTietDto>> CreatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto PhieuPhanTichKetQuaChiTietDto)
        {
            if (PhieuPhanTichKetQuaChiTietDto == null) return new ResponseModel1<PhieuPhanTichKetQuaChiTietDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<PhieuPhanTichKetQuaChiTietDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var PhieuPhanTichKetQuaChiTietDomain = _mapper.Map<PhieuPhanTichKetQuaChiTiet>(PhieuPhanTichKetQuaChiTietDto);
            PhieuPhanTichKetQuaChiTietDomain.MaId = Guid.NewGuid().ToString();
            PhieuPhanTichKetQuaChiTietDomain.NgayTao = DateTime.Now;

            _repositoryManager.PhieuPhanTichKetQuaChiTiet.CreatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaChiTietReturnDto = _mapper.Map<PhieuPhanTichKetQuaChiTietDto>(PhieuPhanTichKetQuaChiTietDomain);

            return new ResponseModel1<PhieuPhanTichKetQuaChiTietDto>
            {
                KetQua = check,
                Message = check ? "Them phieu phan tich ket qua chi tiet thanh cong!" : "Them phieu phan tich ket qua chi tiet that bai, vui long thu lai!",
                Data = PhieuPhanTichKetQuaChiTietReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaChiTietDto>> UpdatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto PhieuPhanTichKetQuaChiTietDto)
        {
            if (PhieuPhanTichKetQuaChiTietDto == null || PhieuPhanTichKetQuaChiTietDto.MaId == null || PhieuPhanTichKetQuaChiTietDto.MaId == "") return new ResponseModel1<PhieuPhanTichKetQuaChiTietDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuPhanTichKetQuaChiTietCheck = await _repositoryManager.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto.MaId);
            if (PhieuPhanTichKetQuaChiTietCheck == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaChiTietDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var PhieuPhanTichKetQuaChiTietDomain = _mapper.Map<PhieuPhanTichKetQuaChiTiet>(PhieuPhanTichKetQuaChiTietDto);
            PhieuPhanTichKetQuaChiTietDomain.NgaySua = DateTime.Now;
            PhieuPhanTichKetQuaChiTietDomain.NguoiSua = "admin";
            _repositoryManager.PhieuPhanTichKetQuaChiTiet.UpdatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaChiTietReturnDto = _mapper.Map<PhieuPhanTichKetQuaChiTietDto>(PhieuPhanTichKetQuaChiTietDomain);
            return new ResponseModel1<PhieuPhanTichKetQuaChiTietDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaChiTietReturnDto
            };
        }
        public async Task<bool> DeletePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet)
        {
            if (PhieuPhanTichKetQuaChiTiet == null) return false;
            else
            {
                var PhieuPhanTichKetQuaChiTietDomain = await _repositoryManager.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet.MaId);
                if (PhieuPhanTichKetQuaChiTietDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuPhanTichKetQuaChiTiet.DeletePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
