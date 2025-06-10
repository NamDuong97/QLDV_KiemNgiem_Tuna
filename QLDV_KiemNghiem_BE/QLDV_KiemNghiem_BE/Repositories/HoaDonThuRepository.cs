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
        public async Task<IEnumerable<HoaDonThu>> GetHoaDonThuOfCustomer(string maKH)
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

        public async Task<HoaDonThu?> FindHoaDonThuAsync(string maHoaDonThu, bool tracking)
        {
            var result =  await _context.HoaDonThus.FindAsync(maHoaDonThu);
            if(result!= null && tracking)
            {
                _context.Attach(result);
            }
            return result;
        }
        public async Task<HoaDonThu?> CheckExistHoaDonThuByPhieuDangKyAsync(string maPhieuDangKy, bool tracking)
        {
            if (tracking)
            {
                var result = await _context.HoaDonThus.Where(item => item.MaPhieuDangKy == maPhieuDangKy).SingleOrDefaultAsync();
                return result;
            }
            else
            {
                var result = await _context.HoaDonThus.AsNoTracking().Where(item => item.MaPhieuDangKy == maPhieuDangKy).SingleOrDefaultAsync();
                return result;
            }
        }
        public async Task CreateHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            await _context.HoaDonThus.AddAsync(HoaDonThu);
        }
        public void UpdateHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            _context.HoaDonThus.Update(HoaDonThu);
        }
        public async Task<HoaDonThu> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy)
        {
            // 1. Gọi stored procedure và lấy ra 1 bản ghi cụ thể
            var hoaDonThu = await _context.HoaDonThus
                .FromSqlRaw("exec sp_UpdateHoaDonThuByMaPhieuDangKy @maphieu = {0}", maPhieuDangKy).FirstOrDefaultAsync();

            if (hoaDonThu == null)
                return new HoaDonThu();
            // 2. Attach vào context để load các navigation properties
            //_context.Attach(hoaDonThu);
            // 3. Load collection: ChiTietHoaDonThus vào hoaDonThu
            await _context.Entry(hoaDonThu).Collection(p => p.ChiTietHoaDonThus).LoadAsync();
            // 4. Load collection: HoaDonThuBoSungs vào hoaDonThu
            await _context.Entry(hoaDonThu).Collection(p => p.HoaDonThuBoSungs).Query().Include(t => t.ChiTietHoaDonThuBoSungs).LoadAsync();
            return hoaDonThu;
        }

        public void DeleteHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            _context.HoaDonThus.Remove(HoaDonThu);
        }
    }
}
