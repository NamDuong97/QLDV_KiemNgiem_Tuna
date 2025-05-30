using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class TrangThaiPhieuDkService : ITrangThaiPhieuDkService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public TrangThaiPhieuDkService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TrangThaiPhieuDkDto>> GetTrangThaiPhieuDksAllAsync()
        {
            var TrangThaiPhieuDkDomains = await _repositoryManager.TrangThaiPhieuDk.GetTrangThaiPhieuDksAllAsync();
            var result = _mapper.Map<IEnumerable<TrangThaiPhieuDkDto>>(TrangThaiPhieuDkDomains);
            return result;
        }
        public async Task<TrangThaiPhieuDkDto?> FindTrangThaiPhieuDkAsync(string maTrangThaiPhieuDk)
        {
            var TrangThaiPhieuDkDomain = await _repositoryManager.TrangThaiPhieuDk.FindTrangThaiPhieuDkAsync(maTrangThaiPhieuDk);
            var result = _mapper.Map<TrangThaiPhieuDkDto>(TrangThaiPhieuDkDomain);
            return result;
        }
        //public async Task<TrangThaiPhieuDkDto?> FindTrangThaiPhieuDkByNameAsync(string tenTrangThaiPhieuDk)
        //{
        //    var TrangThaiPhieuDkDomain = await _repositoryManager.TrangThaiPhieuDk.FindTrangThaiPhieuDkByNameAsync(tenTrangThaiPhieuDk);
        //    var result = _mapper.Map<TrangThaiPhieuDkDto>(TrangThaiPhieuDkDomain);
        //    return result;
        //}
        public async Task<bool> CreateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDto TrangThaiPhieuDkDto)
        {
            var TrangThaiPhieuDkDomain = _mapper.Map<TrangThaiPhieuDk>(TrangThaiPhieuDkDto);
            _repositoryManager.TrangThaiPhieuDk.CreateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDto TrangThaiPhieuDkDto)
        {
            var TrangThaiPhieuDkDomain = _mapper.Map<TrangThaiPhieuDk>(TrangThaiPhieuDkDto);
            var TrangThaiPhieuDkCheck = await _repositoryManager.TrangThaiPhieuDk.FindTrangThaiPhieuDkAsync(TrangThaiPhieuDkDto.MaId);
            if (TrangThaiPhieuDkCheck == null)
            {
                return false;
            }
            _repositoryManager.TrangThaiPhieuDk.UpdateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk)
        {
            var TrangThaiPhieuDkDomain = await _repositoryManager.TrangThaiPhieuDk.FindTrangThaiPhieuDkAsync(TrangThaiPhieuDk.MaId);
            if (TrangThaiPhieuDkDomain == null)
            {
                return false;
            }
            _repositoryManager.TrangThaiPhieuDk.DeleteTrangThaiPhieuDkAsync(TrangThaiPhieuDk);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
