using AutoMapper;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.EmailService;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly Lazy<IPhieuDangKyService> _phieuDangKyService;
        private readonly Lazy<IPhieuDangKyMauService> _phieuDangKyMauService;
        private readonly Lazy<IDmPhuLieuHoaChatService> _dmPhuLieuHoaChatService;
        private readonly Lazy<IPhieuDangKyPhuLieuHoaChatService> _phieuDangKyPhuLieuHoaChatService;
        private readonly Lazy<ITieuChuanService> _tieuChuanService;
        private readonly Lazy<IChiTieuService> _chiTieuService;
        private readonly Lazy<IPhuongPhapService> _phuongPhapService;
        private readonly Lazy<IBoPhanService> _boPhanService;
        private readonly Lazy<IKhoaService> _khoaService;
        private readonly Lazy<IChucVuService> _chucVuService;
        private readonly Lazy<IPhieuDangKyMauHinhAnhService> _mauHinhAnhService;
        private readonly Lazy<ILoaiMauService> _loaiMauService;
        private readonly Lazy<ILoaiDichVuService> _loaiDichVuService;
        private readonly Lazy<IDmMauService> _dmMauService;
        private readonly Lazy<ITrangThaiPhieuDkService> _trangThaiPhieuDkService;
        private readonly Lazy<IHoaDonThuService> _hoaDonThuService;
        private readonly Lazy<IChiTietHoaDonThuService> _chiTietHoaDonThuService;
        private readonly Lazy<IPhieuDeXuatPhongBanService> _phieuDeXuatPhongBan;
        private readonly Lazy<IPhanCongNoiBoService> _phanCongNoiBoService;
        private readonly Lazy<IPhieuDuTruService> _phieuDuTruService;
        private readonly Lazy<IPhieuLuuMauService> _phieuLuuMauService;
        private readonly Lazy<IPhieuTienDoLamViecService> _phieuTienDoLamViecService;
        private readonly Lazy<IPhieuPhanTichKetQuaService> _phieuPhanTichKetQuaService;
        private readonly Lazy<IKhachHangService> _khachHangService;
        private readonly Lazy<INhanVienService> _nhanVienService;
        private readonly Lazy<IPhieuChiService> _phieuChiService;
        private readonly Lazy<IPhieuPhanTichKetQuaChiTietService> _phieuPhanTichKetQuaChiTietService;
        private readonly Lazy<IPhieuThuService> _phieuThuService;
        private readonly Lazy<IChiTietPhieuDeXuatPhongBanService> _chiTietPhieuDeXuatPhongBanService;

        public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper, DataContext dataContext, IEmailService emailService, IConfiguration configuration)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _phieuDangKyService = new Lazy<IPhieuDangKyService>(() => new PhieuDangKyService(repositoryManager, mapper, dataContext));
            _phieuDangKyMauService = new Lazy<IPhieuDangKyMauService>(() => new PhieuDangKyMauService(repositoryManager, mapper));
            _dmPhuLieuHoaChatService = new Lazy<IDmPhuLieuHoaChatService>(() => new DmPhuLieuHoaChatService(repositoryManager, mapper));
            _phieuDangKyPhuLieuHoaChatService = new Lazy<IPhieuDangKyPhuLieuHoaChatService>(() => new PhieuDangKyPhuLieuHoaChatService(repositoryManager, mapper));
            _tieuChuanService = new Lazy<ITieuChuanService>(() => new TieuChuanService(repositoryManager, mapper));
            _chiTieuService = new Lazy<IChiTieuService>(() => new ChiTieuService(repositoryManager, mapper));
            _phuongPhapService = new Lazy<IPhuongPhapService>(() => new PhuongPhapService(repositoryManager, mapper));
            _boPhanService = new Lazy<IBoPhanService>(() => new BoPhanService(repositoryManager, mapper));
            _khoaService = new Lazy<IKhoaService>(() => new KhoaService(repositoryManager, mapper));
            _chucVuService = new Lazy<IChucVuService>(() => new ChucVuService(repositoryManager, mapper));
            _mauHinhAnhService = new Lazy<IPhieuDangKyMauHinhAnhService>(() => new PhieuDangKyMauHinhAnhService(repositoryManager, mapper));
            _loaiMauService = new Lazy<ILoaiMauService>(() => new LoaiMauService(repositoryManager, mapper));
            _loaiDichVuService = new Lazy<ILoaiDichVuService>(() => new LoaiDichVuService(repositoryManager, mapper));
            _dmMauService = new Lazy<IDmMauService>(() => new DmMauService(repositoryManager, mapper));
            _trangThaiPhieuDkService = new Lazy<ITrangThaiPhieuDkService>(() => new TrangThaiPhieuDkService(repositoryManager, mapper));
            _hoaDonThuService = new Lazy<IHoaDonThuService>(() => new HoaDonThuService(repositoryManager, mapper));
            _chiTietHoaDonThuService = new Lazy<IChiTietHoaDonThuService>(() => new ChiTietHoaDonThuService(repositoryManager, mapper));
            _phieuDeXuatPhongBan = new Lazy<IPhieuDeXuatPhongBanService>(() => new PhieuDeXuatPhongBanService(repositoryManager, mapper));
            _phanCongNoiBoService = new Lazy<IPhanCongNoiBoService>(() => new PhanCongNoiBoService(repositoryManager, mapper));
            _phieuDuTruService = new Lazy<IPhieuDuTruService>(() => new PhieuDuTruService(repositoryManager, mapper));
            _phieuLuuMauService = new Lazy<IPhieuLuuMauService>(() => new PhieuLuuMauService(repositoryManager, mapper));
            _phieuTienDoLamViecService = new Lazy<IPhieuTienDoLamViecService>(() => new PhieuTienDoLamViecService(repositoryManager, mapper));
            _phieuPhanTichKetQuaService = new Lazy<IPhieuPhanTichKetQuaService>(() => new PhieuPhanTichKetQuaService(repositoryManager, mapper));
            _khachHangService = new Lazy<IKhachHangService>(() => new KhachHangService(repositoryManager, mapper, emailService, configuration));
            _nhanVienService = new Lazy<INhanVienService>(() => new NhanVienService(repositoryManager, mapper, emailService));
            _phieuChiService = new Lazy<IPhieuChiService>(() => new PhieuChiService(repositoryManager, mapper));
            _phieuPhanTichKetQuaChiTietService = new Lazy<IPhieuPhanTichKetQuaChiTietService>(() => new PhieuPhanTichKetQuaChiTietService(repositoryManager, mapper));
            _phieuThuService = new Lazy<IPhieuThuService>(() => new PhieuThuService(repositoryManager, mapper));
            _chiTietPhieuDeXuatPhongBanService = new Lazy<IChiTietPhieuDeXuatPhongBanService>(() => new ChiTietPhieuDeXuatPhongBanService(repositoryManager, mapper));
        }

        public IPhieuDangKyService PhieuDangKy => _phieuDangKyService.Value;
        public IPhieuDangKyMauService PhieuDangKyMau => _phieuDangKyMauService.Value;
        public IDmPhuLieuHoaChatService DmPhuLieuHoaChat => _dmPhuLieuHoaChatService.Value;
        public IPhieuDangKyPhuLieuHoaChatService PhieuDangKyPhuLieuHoaChat => _phieuDangKyPhuLieuHoaChatService.Value;
        public ITieuChuanService TieuChuan => _tieuChuanService.Value;
        public IChiTieuService ChiTieu => _chiTieuService.Value;
        public IPhuongPhapService PhuongPhap => _phuongPhapService.Value;
        public IBoPhanService BoPhan => _boPhanService.Value;
        public IKhoaService Khoa => _khoaService.Value;
        public IChucVuService ChucVu => _chucVuService.Value;
        public IPhieuDangKyMauHinhAnhService MauHinhAnh => _mauHinhAnhService.Value;
        public ILoaiMauService LoaiMau => _loaiMauService.Value;
        public ILoaiDichVuService LoaiDichVu => _loaiDichVuService.Value;
        public IDmMauService DmMau => _dmMauService.Value;
        public ITrangThaiPhieuDkService TrangThaiPhieuDk => _trangThaiPhieuDkService.Value;
        public IHoaDonThuService HoaDonThu => _hoaDonThuService.Value;
        public IChiTietHoaDonThuService ChiTietHoaDonThu => _chiTietHoaDonThuService.Value;
        public IPhieuDeXuatPhongBanService PhieuDeXuatPhongBan => _phieuDeXuatPhongBan.Value;
        public IPhanCongNoiBoService PhanCongNoiBo => _phanCongNoiBoService.Value;
        public IPhieuDuTruService PhieuDuTru => _phieuDuTruService.Value;
        public IPhieuLuuMauService PhieuLuuMau => _phieuLuuMauService.Value;
        public IPhieuTienDoLamViecService PhieuTienDoLamViec => _phieuTienDoLamViecService.Value;
        public IPhieuPhanTichKetQuaService PhieuPhanTichKetQua => _phieuPhanTichKetQuaService.Value;
        public IKhachHangService KhachHang => _khachHangService.Value;
        public INhanVienService NhanVien => _nhanVienService.Value;
        public IPhieuChiService PhieuChi => _phieuChiService.Value;
        public IPhieuPhanTichKetQuaChiTietService PhieuPhanTichKetQuaChiTiet => _phieuPhanTichKetQuaChiTietService.Value;
        public IPhieuThuService PhieuThu => _phieuThuService.Value;
        public IChiTietPhieuDeXuatPhongBanService ChiTietPhieuDeXuatPhongBan => _chiTietPhieuDeXuatPhongBanService.Value;
    }
}
