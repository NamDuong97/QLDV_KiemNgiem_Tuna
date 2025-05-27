using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class KhoaService : IKhoaService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public KhoaService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<KhoaDto>> GetKhoasAllAsync()
        {
            var KhoaDomains = await _repositoryManager.Khoa.GetKhoasAllAsync();
            var result = _mapper.Map<IEnumerable<KhoaDto>>(KhoaDomains);
            return result;
        }
        public async Task<KhoaDto?> FindKhoaAsync(string maKhoa)
        {
            var KhoaDomain = await _repositoryManager.Khoa.FindKhoaAsync(maKhoa);
            var result = _mapper.Map<KhoaDto>(KhoaDomain);
            return result;
        }
        public async Task<bool> CreateKhoaAsync(Khoa Khoa)
        {
            _repositoryManager.Khoa.CreateKhoaAsync(Khoa);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateKhoaAsync(Khoa Khoa)
        {
            var KhoaDomain = await _repositoryManager.Khoa.FindKhoaAsync(Khoa.MaId);
            if (KhoaDomain == null)
            {
                return false;
            }
            _repositoryManager.Khoa.UpdateKhoaAsync(Khoa);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteKhoaAsync(Khoa Khoa)
        {
            var KhoaDomain = await _repositoryManager.Khoa.FindKhoaAsync(Khoa.MaId);
            if (KhoaDomain == null)
            {
                return false;
            }
            _repositoryManager.Khoa.DeleteKhoaAsync(Khoa);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
