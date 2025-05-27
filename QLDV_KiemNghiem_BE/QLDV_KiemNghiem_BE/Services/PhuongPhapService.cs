using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhuongPhapService : IPhuongPhapService
    {

        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhuongPhapService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhuongPhapDto>> GetPhuongPhapsAllAsync()
        {

            var phuongPhapDomains = await _repositoryManager.PhuongPhap.GetPhuongPhapsAllAsync();
            var result = _mapper.Map<IEnumerable<PhuongPhapDto>>(phuongPhapDomains);
            return result;
        }
        public async Task<PhuongPhapDto?> FindPhuongPhapAsync(string maPhuongPhap)
        {
            var phuongPhapDomain = await _repositoryManager.PhuongPhap.FindPhuongPhapAsync(maPhuongPhap);
            var result = _mapper.Map<PhuongPhapDto>(phuongPhapDomain);
            return result;
        }
        public async Task<bool> CreatePhuongPhapAsync(PhuongPhap phuongPhap)
        {
            _repositoryManager.PhuongPhap.CreatePhuongPhapAsync(phuongPhap);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdatePhuongPhapAsync(PhuongPhap phuongPhap)
        {
            var PhuongPhapDomain = await _repositoryManager.PhuongPhap.FindPhuongPhapAsync(phuongPhap.MaId);
            if (PhuongPhapDomain == null)
            {
                return false;
            }
            _repositoryManager.PhuongPhap.UpdatePhuongPhapAsync(phuongPhap);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeletePhuongPhapAsync(PhuongPhap phuongPhap)
        {
            var PhuongPhapDomain = await _repositoryManager.PhuongPhap.FindPhuongPhapAsync(phuongPhap.MaId);
            if (PhuongPhapDomain == null)
            {
                return false;
            }
            _repositoryManager.PhuongPhap.DeletePhuongPhapAsync(phuongPhap);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
