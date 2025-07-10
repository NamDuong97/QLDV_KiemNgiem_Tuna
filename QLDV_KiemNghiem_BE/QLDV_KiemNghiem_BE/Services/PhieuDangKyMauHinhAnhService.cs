using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyMauHinhAnhService : IPhieuDangKyMauHinhAnhService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuDangKyMauHinhAnhService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDangKyMauHinhAnhDto>> GetPhieuDangKyMauHinhAnhsAllAsync()
        {
            var PhieuDangKyMauHinhAnhDomains = await _repositoryManager.PhieuDangKyMauHinhAnh.GetPhieuDangKyMauHinhAnhsAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuDangKyMauHinhAnhDto>>(PhieuDangKyMauHinhAnhDomains);
            return result;
        }
        public async Task<PhieuDangKyMauHinhAnhDto?> FindPhieuDangKyMauHinhAnhAsync(string maPhieuDangKyMauHinhAnh)
        {
            if (maPhieuDangKyMauHinhAnh == null || maPhieuDangKyMauHinhAnh == "") return null;
            var PhieuDangKyMauHinhAnhDomain = await _repositoryManager.PhieuDangKyMauHinhAnh.FindPhieuDangKyMauHinhAnhAsync(maPhieuDangKyMauHinhAnh);
            var result = _mapper.Map<PhieuDangKyMauHinhAnhDto>(PhieuDangKyMauHinhAnhDomain);
            return result;
        }
        public async Task<bool> CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnhDto PhieuDangKyMauHinhAnh)
        {
            var PhieuDangKyMauHinhAnhDomain = _mapper.Map<PhieuDangKyMauHinhAnh>(PhieuDangKyMauHinhAnh);
            await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnhDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnhDto PhieuDangKyMauHinhAnh)
        {
            var PhieuDangKyMauHinhAnhDomain = await _repositoryManager.PhieuDangKyMauHinhAnh.FindPhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh.MaId);
            if (PhieuDangKyMauHinhAnhDomain == null)
            {
                return false;
            }
            var phieuDangKyPhieuDangKyMauHinhAnhDomain = _mapper.Map<PhieuDangKyMauHinhAnhDto>(PhieuDangKyMauHinhAnh);
            _repositoryManager.PhieuDangKyMauHinhAnh.UpdatePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnhDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeletePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh)
        {
            var PhieuDangKyMauHinhAnhDomain = await _repositoryManager.PhieuDangKyMauHinhAnh.FindPhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh.MaId);
            if (PhieuDangKyMauHinhAnhDomain == null)
            {
                return false;
            }
            _repositoryManager.PhieuDangKyMauHinhAnh.DeletePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnh);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
