using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class ChiTietPhieuDeXuatPhongBanRepository : IChiTietPhieuDeXuatPhongBanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChiTietPhieuDeXuatPhongBanRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietPhieuDeXuatPhongBan>> GetChiTietPhieuDeXuatPhongBansAllAsync()
        {
            return await _context.ChiTietPhieuDeXuatPhongBans.ToListAsync();
        }
        public async Task<ChiTietPhieuDeXuatPhongBan?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan, bool tracking)
        {
            if (tracking)
            {
                return await _context.ChiTietPhieuDeXuatPhongBans.FindAsync(maChiTietPhieuDeXuatPhongBan);
            }
            else
            {
                return await _context.ChiTietPhieuDeXuatPhongBans.AsNoTracking().SingleOrDefaultAsync(item => item.MaId == maChiTietPhieuDeXuatPhongBan);
            }
        }

        public void CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            _context.ChiTietPhieuDeXuatPhongBans.Add(ChiTietPhieuDeXuatPhongBan);
        }
        public void UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            _context.ChiTietPhieuDeXuatPhongBans.Update(ChiTietPhieuDeXuatPhongBan);
        }
        public void DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            _context.ChiTietPhieuDeXuatPhongBans.Remove(ChiTietPhieuDeXuatPhongBan);
        }
    }
}
