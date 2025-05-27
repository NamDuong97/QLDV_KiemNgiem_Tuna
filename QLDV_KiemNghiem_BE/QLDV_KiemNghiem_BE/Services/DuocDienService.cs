using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class DuocDienService
    {

        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public DuocDienService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DuocDienDto>> GetDuocDiensAllAsync()
        {

            var DuocDienDomains = await _repositoryManager.DuocDien.GetDuocDiensAllAsync();
            var result = _mapper.Map<IEnumerable<DuocDienDto>>(DuocDienDomains);
            return result;
        }
        public async Task<DuocDienDto?> FindDuocDienAsync(string maDuocDien)
        {
            var DuocDienDomain = await _repositoryManager.DuocDien.FindDuocDienAsync(maDuocDien);
            var result = _mapper.Map<DuocDienDto>(DuocDienDomain);
            return result;
        }
        public async Task<bool> CreateDuocDienAsync(DuocDien DuocDien)
        {
            _repositoryManager.DuocDien.CreateDuocDienAsync(DuocDien);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateDuocDienAsync(DuocDien DuocDien)
        {
            var DuocDienDomain = await _repositoryManager.DuocDien.FindDuocDienAsync(DuocDien.MaId);
            if(DuocDienDomain == null)
            {
                return false;
            }
            _repositoryManager.DuocDien.UpdateDuocDienAsync(DuocDien);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteDuocDienAsync(DuocDien DuocDien)
        {
            var DuocDienDomain = await _repositoryManager.DuocDien.FindDuocDienAsync(DuocDien.MaId);
            if (DuocDienDomain == null)
            {
                return false;
            }
            _repositoryManager.DuocDien.DeleteDuocDienAsync(DuocDien);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
