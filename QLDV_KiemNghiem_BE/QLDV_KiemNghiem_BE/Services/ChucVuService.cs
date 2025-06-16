using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChucVuService : IChucVuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChucVuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChucVuDto>> GetChucVusAllAsync()
        {
            var ChucVuDomains = await _repositoryManager.ChucVu.GetChucVusAllAsync();
            var result = _mapper.Map<IEnumerable<ChucVuDto>>(ChucVuDomains);
            return result;
        }
        public async Task<ChucVuDto?> FindChucVuAsync(string maChucVu)
        {
            if (maChucVu == null || maChucVu == "") return null;
            var ChucVuDomain = await _repositoryManager.ChucVu.FindChucVuAsync(maChucVu);
            var result = _mapper.Map<ChucVuDto>(ChucVuDomain);
            return result;
        }
        public async Task<bool> CreateChucVuAsync(ChucVu ChucVu)
        {

            _repositoryManager.ChucVu.CreateChucVuAsync(ChucVu);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateChucVuAsync(ChucVu ChucVu)
        {
            var ChucVuDomain = await _repositoryManager.ChucVu.FindChucVuAsync(ChucVu.MaId);
            if (ChucVuDomain == null)
            {
                return false;
            }
            _repositoryManager.ChucVu.UpdateChucVuAsync(ChucVu);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteChucVuAsync(ChucVu ChucVu)
        {
            var ChucVuDomain = await _repositoryManager.ChucVu.FindChucVuAsync(ChucVu.MaId);
            if (ChucVuDomain == null)
            {
                return false;
            }
            _repositoryManager.ChucVu.DeleteChucVuAsync(ChucVu);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
