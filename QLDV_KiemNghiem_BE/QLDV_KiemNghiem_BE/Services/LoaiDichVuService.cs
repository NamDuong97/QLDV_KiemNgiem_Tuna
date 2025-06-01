using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class LoaiDichVuService : ILoaiDichVuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public LoaiDichVuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LoaiDichVuDto>> GetLoaiDichVusAllAsync()
        {
            var LoaiDichVuDomains = await _repositoryManager.LoaiDichVu.GetLoaiDichVusAllAsync();
            var result = _mapper.Map<IEnumerable<LoaiDichVuDto>>(LoaiDichVuDomains);
            return result;
        }
        public async Task<LoaiDichVuDto?> FindLoaiDichVuAsync(string maLoaiDichVu)
        {
            if (maLoaiDichVu == null || maLoaiDichVu == "") return null; 
            var LoaiDichVuDomain = await _repositoryManager.LoaiDichVu.FindLoaiDichVuAsync(maLoaiDichVu);
            var result = _mapper.Map<LoaiDichVuDto>(LoaiDichVuDomain);
            return result;
        }
        public async Task<bool> CreateLoaiDichVuAsync(LoaiDichVuDto LoaiDichVuDto)
        {
            var LoaiDichVuDomain = _mapper.Map<LoaiDichVu>(LoaiDichVuDto);
            LoaiDichVuDomain.MaId = Guid.NewGuid().ToString();
            LoaiDichVuDomain.NgayTao = DateTime.Now;
            LoaiDichVuDomain.NguoiTao = "admin";

            _repositoryManager.LoaiDichVu.CreateLoaiDichVuAsync(LoaiDichVuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateLoaiDichVuAsync(LoaiDichVuDto LoaiDichVuDto)
        {
            var LoaiDichVuDomain = _mapper.Map<LoaiDichVu>(LoaiDichVuDto);
            var LoaiDichVuCheck = await _repositoryManager.LoaiDichVu.FindLoaiDichVuAsync(LoaiDichVuDto.MaId);
            if (LoaiDichVuCheck == null)
            {
                return false;
            }
            _repositoryManager.LoaiDichVu.UpdateLoaiDichVuAsync(LoaiDichVuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteLoaiDichVuAsync(LoaiDichVu LoaiDichVu)
        {
            var LoaiDichVuDomain = await _repositoryManager.LoaiDichVu.FindLoaiDichVuAsync(LoaiDichVu.MaId);
            if (LoaiDichVuDomain == null)
            {
                return false;
            }
            _repositoryManager.LoaiDichVu.DeleteLoaiDichVuAsync(LoaiDichVu);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
