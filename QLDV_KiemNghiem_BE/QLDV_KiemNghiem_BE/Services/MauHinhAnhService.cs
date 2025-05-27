using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class MauHinhAnhService : IMauHinhAnhService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public MauHinhAnhService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<MauHinhAnhDto>> GetMauHinhAnhsAllAsync()
        {
            var MauHinhAnhDomains = await _repositoryManager.MauHinhAnh.GetMauHinhAnhsAllAsync();
            var result = _mapper.Map<IEnumerable<MauHinhAnhDto>>(MauHinhAnhDomains);
            return result;
        }
        public async Task<MauHinhAnhDto?> FindMauHinhAnhAsync(string maMauHinhAnh)
        {
            var MauHinhAnhDomain = await _repositoryManager.MauHinhAnh.FindMauHinhAnhAsync(maMauHinhAnh);
            var result = _mapper.Map<MauHinhAnhDto>(MauHinhAnhDomain);
            return result;
        }
        public async Task<bool> CreateMauHinhAnhAsync(MauHinhAnh MauHinhAnh)
        {
            _repositoryManager.MauHinhAnh.CreateMauHinhAnhAsync(MauHinhAnh);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateMauHinhAnhAsync(MauHinhAnh MauHinhAnh)
        {
            var MauHinhAnhDomain = await _repositoryManager.MauHinhAnh.FindMauHinhAnhAsync(MauHinhAnh.MaId);
            if (MauHinhAnhDomain == null)
            {
                return false;
            }
            _repositoryManager.MauHinhAnh.UpdateMauHinhAnhAsync(MauHinhAnh);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteMauHinhAnhAsync(MauHinhAnh MauHinhAnh)
        {
            var MauHinhAnhDomain = await _repositoryManager.MauHinhAnh.FindMauHinhAnhAsync(MauHinhAnh.MaId);
            if (MauHinhAnhDomain == null)
            {
                return false;
            }
            _repositoryManager.MauHinhAnh.DeleteMauHinhAnhAsync(MauHinhAnh);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
