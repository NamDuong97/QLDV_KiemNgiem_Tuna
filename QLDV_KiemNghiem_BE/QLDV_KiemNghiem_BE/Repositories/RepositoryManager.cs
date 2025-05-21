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
   
        public RepositoryManager(DataContext dataContext, IMapper mapper)
        {
            _context = dataContext;
            _phieuDangKy = new Lazy<IPhieuDangKyRepository>(() => new PhieuDangKyRepository(dataContext, mapper));
            _mau = new Lazy<IMauRepository>(() => new MauRepository(dataContext, mapper));
            _phieuDangKyPhuLieuHoaChat = new Lazy<IPhieuDangKyPhuLieuHoaChatRepository>(() => new PhieuDangKyPhuLieuHoaChatRepository(dataContext, mapper));
            _dmPhuLieuHoaChat = new Lazy<IDmPhuLieuHoaChatRepository>(() => new DmPhuLieuHoaChatRepository(dataContext, mapper));
        }

        public IPhieuDangKyRepository PhieuDangKy => _phieuDangKy.Value;
        public IMauRepository Mau => _mau.Value;
        public IPhieuDangKyPhuLieuHoaChatRepository PhieuDangKyPhuLieuHoaChat => _phieuDangKyPhuLieuHoaChat.Value;
        public IDmPhuLieuHoaChatRepository DmPhuLieuHoaChat => _dmPhuLieuHoaChat.Value;
        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}
