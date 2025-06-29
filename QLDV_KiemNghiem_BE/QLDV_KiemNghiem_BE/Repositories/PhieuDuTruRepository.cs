using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDuTruRepository : IPhieuDuTruRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDuTruRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDuTru>> GetPhieuDuTrusAllAsync()
        {
            return await _context.PhieuDuTrus.Include(p => p.ChiTietPhieuDuTrus).ToListAsync();
        }
        public async Task<PhieuDuTru?> FindPhieuDuTrusAsync(string maPhieuDuTru, bool track)
        {
            if (track)
            {
                return await _context.PhieuDuTrus.Include(it => it.ChiTietPhieuDuTrus).FirstOrDefaultAsync(it => it.MaId == maPhieuDuTru);
            }
            else
            {
                return await _context.PhieuDuTrus.AsNoTracking().Include(it => it.ChiTietPhieuDuTrus).FirstOrDefaultAsync(it => it.MaId == maPhieuDuTru);
            }
        }
        public async Task<PhieuDuTru?> FindPhieuDuTruAsync(string maPhieuDuTru, bool track)
        {
            if (track)
            {
                return await _context.PhieuDuTrus.FirstOrDefaultAsync(it => it.MaId == maPhieuDuTru);
            }
            else
            {
                return await _context.PhieuDuTrus.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maPhieuDuTru);
            }
        }

        public void CreatePhieuDuTruAsync(PhieuDuTru PhieuDuTru)
        {
            _context.PhieuDuTrus.Add(PhieuDuTru);
        }
        public void UpdatePhieuDuTruAsync(PhieuDuTru PhieuDuTru)
        {
            _context.PhieuDuTrus.Update(PhieuDuTru);
        }
        public void DeletePhieuDuTruAsync(PhieuDuTru PhieuDuTru)
        {
            _context.PhieuDuTrus.Remove(PhieuDuTru);
        }
    }
}
