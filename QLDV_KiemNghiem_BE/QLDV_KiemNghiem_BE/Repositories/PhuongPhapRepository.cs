using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhuongPhapRepository : IPhuongPhapRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhuongPhapRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhuongPhap>> GetPhuongPhapsAllAsync()
        {
            return await _context.PhuongPhaps.ToListAsync();
        }
        public async Task<PhuongPhap?> FindPhuongPhapAsync(string maPhuongPhap)
        {
            return await _context.PhuongPhaps.FindAsync(maPhuongPhap);
        }
        public async  Task<PhuongPhap?> FindPhuongPhapByNameAsync(string tenPhuongPhap)
        {
            return await _context.PhuongPhaps.AsNoTracking().SingleOrDefaultAsync(item => item.TenPp.ToLower().Trim() == tenPhuongPhap);
        }

        public  void CreatePhuongPhapAsync(PhuongPhap phuongPhap)
        {
            _context.PhuongPhaps.Add(phuongPhap);
        }
        public  void UpdatePhuongPhapAsync(PhuongPhap phuongPhap)
        {
            _context.PhuongPhaps.Update(phuongPhap);
        }
        public  void DeletePhuongPhapAsync(PhuongPhap phuongPhap)
        {
            _context.PhuongPhaps.Remove(phuongPhap);
        }
    }
}
