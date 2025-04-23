using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly DataContext _context;
        private readonly Lazy<IPhieuDangKyRepository> _phieuDangKy;
        public RepositoryManager(DataContext dataContext) {
            _context = dataContext;
            _phieuDangKy = new Lazy<IPhieuDangKyRepository>(() => new PhieuDangKyRepository(dataContext));
        }

        public IPhieuDangKyRepository PhieuDangKy => _phieuDangKy.Value;
        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}
