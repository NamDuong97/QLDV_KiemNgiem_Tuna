using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using System.Linq;


namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDangKyRepository : IPhieuDangKyRepository
    {
        private readonly DataContext _context;
        public PhieuDangKyRepository( DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync()
        {
            return await _context.PhieuDangKies.Include(item => item.Maus).ThenInclude(item => item.MauPlhcCungCaps).ToListAsync();
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAsync(PhieuDangKy phieuDangKy)
        {
            return await _context.PhieuDangKies.Where(item => item.MaKh == phieuDangKy.MaKh).Include(item => item.Maus).ThenInclude(item => item.MauPlhcCungCaps).ToListAsync();
        }
        public void CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
           _context.PhieuDangKies.Add(phieuDangKy);
        }
    }
}
