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
        public async Task<bool> CreatePhuongPhapAsync(PhuongPhapDto phuongPhapDto)
        {
            var phuongPhapDomain = _mapper.Map<PhuongPhap>(phuongPhapDto);
            _repositoryManager.PhuongPhap.CreatePhuongPhapAsync(phuongPhapDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdatePhuongPhapAsync(PhuongPhapDto phuongPhapDto)
        {
            var PhuongPhapDomain = await _repositoryManager.PhuongPhap.FindPhuongPhapAsync(phuongPhapDto.MaId);
            if (PhuongPhapDomain == null)
            {
                return false;
            }
            var phuongPhapDomain = _mapper.Map<PhuongPhap>(phuongPhapDto);
            _repositoryManager.PhuongPhap.UpdatePhuongPhapAsync(phuongPhapDomain);
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
