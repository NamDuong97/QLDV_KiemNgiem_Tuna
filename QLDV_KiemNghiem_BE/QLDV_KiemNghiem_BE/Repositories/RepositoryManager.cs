using AutoMapper;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly DataContext _context;
        private readonly Lazy<IPhieuDangKyRepository> _phieuDangKy;

        private readonly Lazy<IPhieuDangKyMauRepository> _phieuDangKyMau;
        private readonly Lazy<IPhieuDangKyPhuLieuHoaChatRepository> _phieuDangKyPhuLieuHoaChat;
        private readonly Lazy<IDmPhuLieuHoaChatRepository> _dmPhuLieuHoaChat;
        private readonly Lazy<ITieuChuanRepository> _tieuChuan;
        private readonly Lazy<IChiTieuRepositoty> _chiTieu;
        private readonly Lazy<IPhuongPhapRepository> _phuongPhap;
        private readonly Lazy<IBoPhanRepository> _boPhan;
        private readonly Lazy<IKhoaRepository> _khoa;
        private readonly Lazy<IChucVuRepository> _chucVu;
        private readonly Lazy<IPhieuDangKyMauHinhAnhRepository> _phieuDangKyMauHinhAnh;
        private readonly Lazy<ILoaiMauRepository> _loaiMau;
        private readonly Lazy<ILoaiDichVuRepository> _loaiDichVu;
        private readonly Lazy<IDmMauRepository> _dmMau;
        private readonly Lazy<ITrangThaiPhieuDkRepository> _trangThaiPhieuDk;
        private readonly Lazy<IHoaDonThuRepository> _hoaDonThu;
        private readonly Lazy<IChiTietHoaDonThuRepository> _chiTietHoaDonThu;

        public RepositoryManager(DataContext dataContext, IMapper mapper)
        {
            _context = dataContext;
            _phieuDangKy = new Lazy<IPhieuDangKyRepository>(() => new PhieuDangKyRepository(dataContext, mapper));

            _phieuDangKyMau = new Lazy<IPhieuDangKyMauRepository>(() => new PhieuDangKyMauRepository(dataContext, mapper));
            _phieuDangKyPhuLieuHoaChat = new Lazy<IPhieuDangKyPhuLieuHoaChatRepository>(() => new PhieuDangKyPhuLieuHoaChatRepository(dataContext, mapper));
            _dmPhuLieuHoaChat = new Lazy<IDmPhuLieuHoaChatRepository>(() => new DmPhuLieuHoaChatRepository(dataContext, mapper));
            _tieuChuan = new Lazy<ITieuChuanRepository>(() => new TieuChuanRepository(dataContext, mapper));
            _chiTieu = new Lazy<IChiTieuRepositoty>(() => new ChiTieuRepository(dataContext, mapper));
            _phuongPhap = new Lazy<IPhuongPhapRepository>(() => new PhuongPhapRepository(dataContext, mapper));
            _boPhan = new Lazy<IBoPhanRepository>(() => new BoPhanRepository(dataContext, mapper));
            _khoa = new Lazy<IKhoaRepository>(() => new KhoaRepository(dataContext, mapper));
            _chucVu = new Lazy<IChucVuRepository>(() => new ChucVuRepository(dataContext, mapper));
            _phieuDangKyMauHinhAnh = new Lazy<IPhieuDangKyMauHinhAnhRepository>(() => new PhieuDangKyMauHinhAnhRepository(dataContext, mapper));
            _loaiMau = new Lazy<ILoaiMauRepository>(() => new LoaiMauRepository(dataContext, mapper));
            _loaiDichVu = new Lazy<ILoaiDichVuRepository>(() => new LoaiDichVuRepository(dataContext, mapper));
            _dmMau = new Lazy<IDmMauRepository>(() => new DmMauRepository(dataContext, mapper));
            _trangThaiPhieuDk = new Lazy<ITrangThaiPhieuDkRepository>(() => new TrangThaiPhieuDkRepository(dataContext, mapper));
            _hoaDonThu = new Lazy<IHoaDonThuRepository>(() => new HoaDonThuRepository(dataContext, mapper));
            _chiTietHoaDonThu = new Lazy<IChiTietHoaDonThuRepository>(() => new ChiTietHoaDonThuRepository(dataContext, mapper));
        }

        public IPhieuDangKyRepository PhieuDangKy => _phieuDangKy.Value;
        public IPhieuDangKyMauRepository PhieuDangKyMau => _phieuDangKyMau.Value;
        public IPhieuDangKyPhuLieuHoaChatRepository PhieuDangKyPhuLieuHoaChat => _phieuDangKyPhuLieuHoaChat.Value;
        public IDmPhuLieuHoaChatRepository DmPhuLieuHoaChat => _dmPhuLieuHoaChat.Value;
        public ITieuChuanRepository TieuChuan => _tieuChuan.Value;
        public IChiTieuRepositoty ChiTieu => _chiTieu.Value;
        public IPhuongPhapRepository PhuongPhap => _phuongPhap.Value;
        public IBoPhanRepository BoPhan => _boPhan.Value;
        public IKhoaRepository Khoa => _khoa.Value;
        public IChucVuRepository ChucVu => _chucVu.Value;
        public IPhieuDangKyMauHinhAnhRepository PhieuDangKyMauHinhAnh => _phieuDangKyMauHinhAnh.Value;
        public ILoaiMauRepository LoaiMau => _loaiMau.Value;
        public ILoaiDichVuRepository LoaiDichVu => _loaiDichVu.Value;
        public IDmMauRepository DmMau => _dmMau.Value;
        public ITrangThaiPhieuDkRepository TrangThaiPhieuDk => _trangThaiPhieuDk.Value;
        public IHoaDonThuRepository HoaDonThu => _hoaDonThu.Value;
        public IChiTietHoaDonThuRepository ChiTietHoaDonThu => _chiTietHoaDonThu.Value;
        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}
