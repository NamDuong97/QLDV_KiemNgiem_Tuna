using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

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
            var BoPhanDomain = await _repositoryManager.BoPhan.FindBoPhanAsync(maBoPhan);
            var result = _mapper.Map<BoPhanDto>(BoPhanDomain);
            return result;
        }
        public async Task<bool> CreateBoPhanAsync(BoPhanDto BoPhan)
        {
            var boPhanDomain = _mapper.Map<BoPhan>(BoPhan);
            _repositoryManager.BoPhan.CreateBoPhanAsync(boPhanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateBoPhanAsync(BoPhanDto BoPhan)
        {
            var BoPhanDomain = await _repositoryManager.BoPhan.FindBoPhanAsync(BoPhan.MaId);
            if (BoPhanDomain == null)
            {
                return false;
            }
            var boPhanDomain = _mapper.Map<BoPhan>(BoPhan);
            _repositoryManager.BoPhan.UpdateBoPhanAsync(boPhanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteBoPhanAsync(BoPhan BoPhan)
        {
            var BoPhanDomain = await _repositoryManager.BoPhan.FindBoPhanAsync(BoPhan.MaId);
            if (BoPhanDomain == null)
            {
                return false;
            }
            _repositoryManager.BoPhan.DeleteBoPhanAsync(BoPhan);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
