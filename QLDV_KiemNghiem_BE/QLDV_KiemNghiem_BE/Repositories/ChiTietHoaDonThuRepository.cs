using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class ChiTietHoaDonThuRepository : IChiTietHoaDonThuRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChiTietHoaDonThuRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietHoaDonThu>> GetChiTietHoaDonThusAllAsync()
        {
            return await _context.ChiTietHoaDonThus.ToListAsync();
        }
        public async Task<ChiTietHoaDonThu?> FindChiTietHoaDonThuAsync(string maChiTietHoaDonThu)
        {
            return await _context.ChiTietHoaDonThus.FindAsync(maChiTietHoaDonThu);
        }

        public async Task CreateChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu)
        {
            await _context.ChiTietHoaDonThus.AddAsync(ChiTietHoaDonThu);
        }
        public void UpdateChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu)
        {
            _context.ChiTietHoaDonThus.Update(ChiTietHoaDonThu);
        }
        public void DeleteChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu)
        {
            _context.ChiTietHoaDonThus.Remove(ChiTietHoaDonThu);
        }
    }
}
