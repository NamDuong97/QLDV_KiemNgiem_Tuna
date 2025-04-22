using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly Lazy<IPhieuDangKyService> _phieuDangKyService;
        public ServiceManager(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
            _phieuDangKyService = new Lazy<IPhieuDangKyService>(() => new PhieuDangKyService(repositoryManager));
        }

        public IPhieuDangKyService PhieuDangKy => _phieuDangKyService.Value;
    }
}
