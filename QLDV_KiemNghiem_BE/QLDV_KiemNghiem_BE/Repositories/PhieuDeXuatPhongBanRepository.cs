using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDeXuatPhongBanRepository : IPhieuDeXuatPhongBanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDeXuatPhongBanRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDeXuatPhongBan>> GetPhieuDeXuatPhongBansAllAsync()
        {
            return await _context.PhieuDeXuatPhongBans.ToListAsync();
        }
        public async Task<PhieuDeXuatPhongBan?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan, bool tracking)
        {
            if(tracking)
            {
                return await _context.PhieuDeXuatPhongBans.FindAsync(maPhieuDeXuatPhongBan);
            }
            else
            {
                return await _context.PhieuDeXuatPhongBans.AsNoTracking().SingleOrDefaultAsync(item => item.MaId == maPhieuDeXuatPhongBan);
            }
        }
        
        public void CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            _context.PhieuDeXuatPhongBans.Add(PhieuDeXuatPhongBan);
        }
        public void UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            _context.PhieuDeXuatPhongBans.Update(PhieuDeXuatPhongBan);
        }
        public void DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            _context.PhieuDeXuatPhongBans.Remove(PhieuDeXuatPhongBan);
        }
    }
}
