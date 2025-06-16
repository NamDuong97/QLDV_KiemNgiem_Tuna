using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class BoPhanRepository : IBoPhanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BoPhanRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<BoPhan>> GetBoPhansAllAsync()
        {
            return await _context.BoPhans.ToListAsync();
        }
        public async Task<BoPhan?> FindBoPhanAsync(string maBoPhan)
        {
            return await _context.BoPhans.FindAsync(maBoPhan);
        }
        public async Task<BoPhan?> FindBoPhanByNameAsync(string tenBoPhan)
        {
            return await _context.BoPhans.AsNoTracking().SingleOrDefaultAsync(item => item.TenBoPhan.ToLower().Trim() == tenBoPhan);
        }
        public void CreateBoPhanAsync(BoPhan BoPhan)
        {
            _context.BoPhans.Add(BoPhan);
        }
        public void UpdateBoPhanAsync(BoPhan BoPhan)
        {
            _context.BoPhans.Update(BoPhan);
        }
        public void DeleteBoPhanAsync(BoPhan BoPhan)
        {
            _context.BoPhans.Remove(BoPhan);
        }
    }
}
