using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class DmMauService : IDmMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public DmMauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DmMauDto>> GetDmMausAllAsync()
        {
            var DmMauDomains = await _repositoryManager.DmMau.GetDmMausAllAsync();
            var result = _mapper.Map<IEnumerable<DmMauDto>>(DmMauDomains);
            return result;
        }
        public async Task<DmMauDto?> FindDmMauAsync(string maDmMau)
        {
            var DmMauDomain = await _repositoryManager.DmMau.FindDmMauAsync(maDmMau);
            var result = _mapper.Map<DmMauDto>(DmMauDomain);
            return result;
        }
        //public async Task<DmMauDto?> FindDmMauByNameAsync(string tenDmMau)
        //{
        //    var DmMauDomain = await _repositoryManager.DmMau.FindDmMauByNameAsync(tenDmMau);
        //    var result = _mapper.Map<DmMauDto>(DmMauDomain);
        //    return result;
        //}
        public async Task<bool> CreateDmMauAsync(DmMauDto DmMauDto)
        {
            var DmMauDomain = _mapper.Map<DmMau>(DmMauDto);
            _repositoryManager.DmMau.CreateDmMauAsync(DmMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateDmMauAsync(DmMauDto DmMauDto)
        {
            var DmMauDomain = _mapper.Map<DmMau>(DmMauDto);
            var DmMauCheck = await _repositoryManager.DmMau.FindDmMauAsync(DmMauDto.MaId);
            if (DmMauCheck == null)
            {
                return false;
            }
            _repositoryManager.DmMau.UpdateDmMauAsync(DmMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteDmMauAsync(DmMau DmMau)
        {
            var DmMauDomain = await _repositoryManager.DmMau.FindDmMauAsync(DmMau.MaId);
            if (DmMauDomain == null)
            {
                return false;
            }
            _repositoryManager.DmMau.DeleteDmMauAsync(DmMau);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
