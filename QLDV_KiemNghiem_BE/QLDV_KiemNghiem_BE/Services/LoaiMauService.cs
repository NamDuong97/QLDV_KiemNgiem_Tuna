using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class LoaiMauService : ILoaiMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public LoaiMauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LoaiMauDto>> GetLoaiMausAllAsync()
        {
            var LoaiMauDomains = await _repositoryManager.LoaiMau.GetLoaiMausAllAsync();
            var result = _mapper.Map<IEnumerable<LoaiMauDto>>(LoaiMauDomains);
            return result;
        }
        public async Task<LoaiMauDto?> FindLoaiMauAsync(string maLoaiMau)
        {
            var LoaiMauDomain = await _repositoryManager.LoaiMau.FindLoaiMauAsync(maLoaiMau);
            var result = _mapper.Map<LoaiMauDto>(LoaiMauDomain);
            return result;
        }
        public async Task<bool> CreateLoaiMauAsync(LoaiMauDto LoaiMauDto)
        {
            var LoaiMauDomain = _mapper.Map<LoaiMau>(LoaiMauDto);
            _repositoryManager.LoaiMau.CreateLoaiMauAsync(LoaiMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateLoaiMauAsync(LoaiMauDto LoaiMauDto)
        {
            var LoaiMauDomain = _mapper.Map<LoaiMau>(LoaiMauDto);
            var LoaiMauCheck = await _repositoryManager.LoaiMau.FindLoaiMauAsync(LoaiMauDto.MaId);
            if (LoaiMauCheck == null)
            {
                return false;
            }
            _repositoryManager.LoaiMau.UpdateLoaiMauAsync(LoaiMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteLoaiMauAsync(LoaiMau LoaiMau)
        {
            var LoaiMauDomain = await _repositoryManager.LoaiMau.FindLoaiMauAsync(LoaiMau.MaId);
            if (LoaiMauDomain == null)
            {
                return false;
            }
            _repositoryManager.LoaiMau.DeleteLoaiMauAsync(LoaiMau);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
