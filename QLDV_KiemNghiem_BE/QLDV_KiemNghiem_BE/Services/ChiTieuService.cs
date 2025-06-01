using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChiTieuService : IChiTieuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChiTieuService(IRepositoryManager repositoryManager, IMapper mapper) {
            _repositoryManager = repositoryManager;
            _mapper = mapper;   
        }
        public async Task<IEnumerable<ChiTieuDto>> GetChiTieusAllAsync()
        {
            var chiTieuDomains = await _repositoryManager.ChiTieu.GetChiTieusAllAsync();
            var result = _mapper.Map<IEnumerable<ChiTieuDto>>(chiTieuDomains);
            return result;
        }
        public async Task<ChiTieuDto?> FindChiTieuAsync(string maChiTieu)
        {
            if (maChiTieu == null || maChiTieu == "") return null;
            var chiTieuDomain = await _repositoryManager.ChiTieu.FindChiTieuAsync(maChiTieu);
            var result = _mapper.Map<ChiTieuDto>(chiTieuDomain);
            return result;
        }
        public async Task<bool> CreateChiTieuAsync(ChiTieu chiTieu)
        {
            _repositoryManager.ChiTieu.CreateChiTieuAsync(chiTieu);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateChiTieuAsync(ChiTieu chiTieu)
        {
            var ChiTieuDomain = await _repositoryManager.ChiTieu.FindChiTieuAsync(chiTieu.MaId);
            if (ChiTieuDomain == null)
            {
                return false;
            }
            _repositoryManager.ChiTieu.UpdateChiTieuAsync(chiTieu);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteChiTieuAsync(ChiTieu chiTieu)
        {
            var ChiTieuDomain = await _repositoryManager.ChiTieu.FindChiTieuAsync(chiTieu.MaId);
            if (ChiTieuDomain == null)
            {
                return false;
            }
            _repositoryManager.ChiTieu.DeleteChiTieuAsync(chiTieu);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
