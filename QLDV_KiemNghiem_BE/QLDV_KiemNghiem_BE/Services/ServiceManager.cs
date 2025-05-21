using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly Lazy<IPhieuDangKyService> _phieuDangKyService;
        private readonly Lazy<IMauService> _mauService;
        private readonly Lazy<IDmPhuLieuHoaChatService> _dmPhuLieuHoaChatService;
        private readonly Lazy<IPhieuDangKyPhuLieuHoaChatService> _phieuDangKyPhuLieuHoaChatService;


        public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _phieuDangKyService = new Lazy<IPhieuDangKyService>(() => new PhieuDangKyService(repositoryManager));
            _mauService = new Lazy<IMauService>(() => new MauService(repositoryManager));
            _dmPhuLieuHoaChatService = new Lazy<IDmPhuLieuHoaChatService>(() => new DmPhuLieuHoaChatService(repositoryManager, mapper));
            _phieuDangKyPhuLieuHoaChatService = new Lazy<IPhieuDangKyPhuLieuHoaChatService>(() => new PhieuDangKyPhuLieuHoaChatService(repositoryManager, mapper));
        }

        public IPhieuDangKyService PhieuDangKy => _phieuDangKyService.Value;
        public IMauService Mau => _mauService.Value;
        public IDmPhuLieuHoaChatService DmPhuLieuHoaChat => _dmPhuLieuHoaChatService.Value;
        public IPhieuDangKyPhuLieuHoaChatService PhieuDangKyPhuLieuHoaChat => _phieuDangKyPhuLieuHoaChatService.Value;

    }
}
