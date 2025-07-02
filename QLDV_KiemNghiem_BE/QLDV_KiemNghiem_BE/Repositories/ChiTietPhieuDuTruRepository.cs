using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class ChiTietPhieuDuTruRepository : IChiTietPhieuDuTruRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChiTietPhieuDuTruRepository (DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietPhieuDuTru>> GetChiTietPhieuDuTrusAllAsync()
        {
            return await _context.ChiTietPhieuDuTrus.ToListAsync();
        }
        public async Task<ChiTietPhieuDuTru?> FindChiTietPhieuDuTruAsync(string maChiTietPhieuDuTru)
        {
            return await _context.ChiTietPhieuDuTrus.FindAsync(maChiTietPhieuDuTru);
        }

        public async Task<ChiTietPhieuDuTru?> FindChiTietPhieuDuTruByPDTAsync(string maPhieuDuTru, string maid, bool track)
        {
            if(track)
            {
                return await _context.ChiTietPhieuDuTrus.Where(it => it.MaPhieuDuTru == maPhieuDuTru && it.MaId == maid).FirstOrDefaultAsync();
            }
            else
            {
                return await _context.ChiTietPhieuDuTrus.AsNoTracking().Where(it => it.MaPhieuDuTru == maPhieuDuTru && it.MaId == maid).FirstOrDefaultAsync();
            }
        }

        public async Task<ChiTietPhieuDuTru?> CheckExistPlhcAsync(string maPhieuDuTru, string maPLHC, string dvt, bool track)
        {
            if (track)
            {
                return await _context.ChiTietPhieuDuTrus.
                    FirstOrDefaultAsync(it => it.MaPhieuDuTru == maPhieuDuTru && it.MaDmPlhc == maPLHC && it.DonViTinh.ToLower().Trim().Equals(dvt));
            }
            else
            {
                return await _context.ChiTietPhieuDuTrus.AsNoTracking().
                   FirstOrDefaultAsync(it => it.MaPhieuDuTru == maPhieuDuTru && it.MaDmPlhc == maPLHC && it.DonViTinh.ToLower().Trim().Equals(dvt));
            }
        }

        public async Task<List<ChiTietPhieuDuTru>?> FindChiTietPhieuDuTruByPDTsAsync(string maPhieuDuTru)
        {
            return await _context.ChiTietPhieuDuTrus.Where(it => it.MaPhieuDuTru == maPhieuDuTru).ToListAsync();
        }

        public void CreateChiTietPhieuDuTru(ChiTietPhieuDuTru ChiTietPhieuDuTru)
        {
             _context.ChiTietPhieuDuTrus.Add(ChiTietPhieuDuTru);
        }
        public void UpdateChiTietPhieuDuTruAsync(ChiTietPhieuDuTru ChiTietPhieuDuTru)
        {
             _context.ChiTietPhieuDuTrus.Update(ChiTietPhieuDuTru);
        }
        public void DeleteChiTietPhieuDuTruAsync(ChiTietPhieuDuTru ChiTietPhieuDuTru)
        {
            _context.ChiTietPhieuDuTrus.Remove(ChiTietPhieuDuTru);
        }
    }
}
