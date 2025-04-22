using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyService
    {
        private readonly IRepositoryManager _repositoryManager;
        public PhieuDangKyService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync()
        {
          return await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAllAsync();
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAsync(PhieuDangKy phieuDangKy)
        {
            return await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAsync(phieuDangKy);
        }
        public async Task<bool> CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            _repositoryManager.PhieuDangKy.CreatePhieuDangKyAsync(phieuDangKy);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
