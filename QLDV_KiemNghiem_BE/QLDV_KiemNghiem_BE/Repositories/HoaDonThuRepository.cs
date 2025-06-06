using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class HoaDonThuRepository : IHoaDonThuRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public HoaDonThuRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<HoaDonThu>> GetHoaDonThusAllAsync()
        {
            return await _context.HoaDonThus.Include(item => item.ChiTietHoaDonThus).Include(item => item.HoaDonThuBoSungs).
                ThenInclude(item => item.ChiTietHoaDonThuBoSungs).ToListAsync();
        }
        public async Task<IEnumerable<HoaDonThu>> GetPhieuDangKiesOfCustomer(string maKH)
        {
            var hoaDonThus = await _context.HoaDonThus.FromSqlRaw("exec sp_GetAllHoaDonOfCustomer @maKh = {0}", maKH).ToListAsync();

            foreach (var item in hoaDonThus)
            {
                await _context.Entry(item).Collection(p => p.ChiTietHoaDonThus).Query().LoadAsync();
                await _context.Entry(item).Collection(p => p.HoaDonThuBoSungs).Query().Include(item => item.ChiTietHoaDonThuBoSungs).LoadAsync();
            }
            return hoaDonThus;
        }

        public async Task<decimal> GetToTalMoneyOfMau(string dmMau, string maTieuChuan, string maLoaiDichVu)
        {
            var result = await _context
            .Set<ThanhTienTungMau>()  // Không cần DbSet thực trong DbContext
            .FromSqlRaw("SELECT dbo.fn_ThanhTienTungMauKiemNghiem({0}, {1}, {2}) AS ThanhTien", dmMau, maTieuChuan, maLoaiDichVu)
            .AsNoTracking()
            .FirstOrDefaultAsync();
            return result?.ThanhTien ?? 0;
        }

        public async Task<HoaDonThu?> FindHoaDonThuAsync(string maHoaDonThu)
        {
            return await _context.HoaDonThus.FindAsync(maHoaDonThu);
        }

        public async Task CreateHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            await _context.HoaDonThus.AddAsync(HoaDonThu);
        }
        public void UpdateHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            _context.HoaDonThus.Update(HoaDonThu);
        }
        public void DeleteHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            _context.HoaDonThus.Remove(HoaDonThu);
        }
    }
}
