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

        private readonly Lazy<IMauRepository> _mau;
        private readonly Lazy<IPhieuDangKyPhuLieuHoaChatRepository> _phieuDangKyPhuLieuHoaChat;
        private readonly Lazy<IDmPhuLieuHoaChatRepository> _dmPhuLieuHoaChat;
        private readonly Lazy<ITieuChuanRepository> _tieuChuan;
        private readonly Lazy<IChiTieuRepositoty> _chiTieu;
        private readonly Lazy<IPhuongPhapRepository> _phuongPhap;
        private readonly Lazy<IDuocDienRepository> _duocDien;


        private readonly IMapper _mapper;

        public RepositoryManager(DataContext dataContext, IMapper mapper)
        {
            _context = dataContext;
            _phieuDangKy = new Lazy<IPhieuDangKyRepository>(() => new PhieuDangKyRepository(dataContext, mapper));

            _mau = new Lazy<IMauRepository>(() => new MauRepository(dataContext, mapper));
            _phieuDangKyPhuLieuHoaChat = new Lazy<IPhieuDangKyPhuLieuHoaChatRepository>(() => new PhieuDangKyPhuLieuHoaChatRepository(dataContext, mapper));
            _dmPhuLieuHoaChat = new Lazy<IDmPhuLieuHoaChatRepository>(() => new DmPhuLieuHoaChatRepository(dataContext, mapper));
            _tieuChuan = new Lazy<ITieuChuanRepository>(() => new TieuChuanRepository(dataContext, mapper));
            _chiTieu = new Lazy<IChiTieuRepositoty>(() => new ChiTieuRepository(dataContext, mapper));
            _phuongPhap = new Lazy<IPhuongPhapRepository>(() => new PhuongPhapRepository(dataContext, mapper));
            _duocDien = new Lazy<IDuocDienRepository>(() => new DuocDienRepository(dataContext, mapper));
        }

        public IPhieuDangKyRepository PhieuDangKy => _phieuDangKy.Value;
        public IMauRepository Mau => _mau.Value;
        public IPhieuDangKyPhuLieuHoaChatRepository PhieuDangKyPhuLieuHoaChat => _phieuDangKyPhuLieuHoaChat.Value;
        public IDmPhuLieuHoaChatRepository DmPhuLieuHoaChat => _dmPhuLieuHoaChat.Value;
        public ITieuChuanRepository TieuChuan => _tieuChuan.Value;
        public IChiTieuRepositoty ChiTieu => _chiTieu.Value;
        public IPhuongPhapRepository PhuongPhap => _phuongPhap.Value;
        public IDuocDienRepository DuocDien => _duocDien.Value;
        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}
