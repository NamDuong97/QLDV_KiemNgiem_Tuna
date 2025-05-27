using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

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
        private readonly Lazy<ITieuChuanService> _tieuChuanService;
        private readonly Lazy<IChiTieuService> _chiTieuService;
        private readonly Lazy<IPhuongPhapService> _phuongPhapService;
        private readonly Lazy<IBoPhanService> _boPhanService;
        private readonly Lazy<IKhoaService> _khoaService;
        private readonly Lazy<IChucVuService> _chucVuService;


        public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _phieuDangKyService = new Lazy<IPhieuDangKyService>(() => new PhieuDangKyService(repositoryManager, mapper));
            _mauService = new Lazy<IMauService>(() => new MauService(repositoryManager));
            _dmPhuLieuHoaChatService = new Lazy<IDmPhuLieuHoaChatService>(() => new DmPhuLieuHoaChatService(repositoryManager, mapper));
            _phieuDangKyPhuLieuHoaChatService = new Lazy<IPhieuDangKyPhuLieuHoaChatService>(() => new PhieuDangKyPhuLieuHoaChatService(repositoryManager, mapper));
            _tieuChuanService = new Lazy<ITieuChuanService>(() => new TieuChuanService(repositoryManager, mapper));
            _chiTieuService = new Lazy<IChiTieuService>(() => new ChiTieuService(repositoryManager, mapper));
            _phuongPhapService = new Lazy<IPhuongPhapService>(() => new PhuongPhapService(repositoryManager, mapper));
            _boPhanService = new Lazy<IBoPhanService>(() => new BoPhanService(repositoryManager, mapper));
            _khoaService = new Lazy<IKhoaService>(() => new KhoaService(repositoryManager, mapper));
            _chucVuService = new Lazy<IChucVuService>(() => new ChucVuService(repositoryManager, mapper));
        }

        public IPhieuDangKyService PhieuDangKy => _phieuDangKyService.Value;
        public IMauService Mau => _mauService.Value;
        public IDmPhuLieuHoaChatService DmPhuLieuHoaChat => _dmPhuLieuHoaChatService.Value;
        public IPhieuDangKyPhuLieuHoaChatService PhieuDangKyPhuLieuHoaChat => _phieuDangKyPhuLieuHoaChatService.Value;
        public ITieuChuanService TieuChuan => _tieuChuanService.Value;
        public IChiTieuService ChiTieu => _chiTieuService.Value;
        public IPhuongPhapService PhuongPhap => _phuongPhapService.Value;
        public IBoPhanService BoPhan => _boPhanService.Value;
        public IKhoaService Khoa => _khoaService.Value;
        public IChucVuService ChucVu => _chucVuService.Value;

    }
}
