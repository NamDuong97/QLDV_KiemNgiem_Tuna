using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class ChiTietHoaDonThuBoSungRepository : IChiTietHoaDonThuBoSungRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChiTietHoaDonThuBoSungRepository (DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietHoaDonThuBoSung>> GetChiTietHoaDonThuBoSungsAllAsync()
        {
            return await _context.ChiTietHoaDonThuBoSungs.ToListAsync();
        }
        public async Task<ChiTietHoaDonThuBoSung?> FindChiTietHoaDonThuBoSungAsync(string maChiTietHoaDonThuBoSung, bool track)
        {
            if (track)
            {
                return await _context.ChiTietHoaDonThuBoSungs.FirstOrDefaultAsync(it => it.MaId == maChiTietHoaDonThuBoSung);
            }
            else
            {
                return await _context.ChiTietHoaDonThuBoSungs.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maChiTietHoaDonThuBoSung);
            }
        }

        public async Task<ChiTietHoaDonThuBoSung?> FindChiTietHoaDonThuBoSungByHDBSAsync(string maHoaDonThuBoSung, string maid, bool track)
        {
            if(track)
            {
                return await _context.ChiTietHoaDonThuBoSungs.Where(it => it.MaHdbs == maHoaDonThuBoSung && it.MaId == maid).FirstOrDefaultAsync();
            }
            else
            {
                return await _context.ChiTietHoaDonThuBoSungs.AsNoTracking().Where(it => it.MaHdbs == maHoaDonThuBoSung && it.MaId == maid).FirstOrDefaultAsync();
            }
        }

        public async Task<List<ChiTietHoaDonThuBoSung>?> FindChiTietHoaDonThuBoSungByHDBSsAsync(string maHoaDonThuBoSung, bool track)
        {
            if (track)
            {
                return await _context.ChiTietHoaDonThuBoSungs.Where(it => it.MaHdbs == maHoaDonThuBoSung).ToListAsync();

            }
            else
            {
                return await _context.ChiTietHoaDonThuBoSungs.AsNoTracking().Where(it => it.MaHdbs == maHoaDonThuBoSung).ToListAsync();

            }
        }

        public void CreateChiTietHoaDonThuBoSung(ChiTietHoaDonThuBoSung ChiTietHoaDonThuBoSung)
        {
             _context.ChiTietHoaDonThuBoSungs.Add(ChiTietHoaDonThuBoSung);
        }
        public void UpdateChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSung ChiTietHoaDonThuBoSung)
        {
             _context.ChiTietHoaDonThuBoSungs.Update(ChiTietHoaDonThuBoSung);
        }
        public void DeleteChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSung ChiTietHoaDonThuBoSung)
        {
            _context.ChiTietHoaDonThuBoSungs.Remove(ChiTietHoaDonThuBoSung);
        }
    }
}
