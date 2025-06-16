using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class ChiTieuRepository : IChiTieuRepositoty
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChiTieuRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<ChiTieu>> GetChiTieusAllAsync()
        {
            return await _context.ChiTieus.ToListAsync();
        }
        public async Task<ChiTieu?> FindChiTieuAsync(string maChiTieu)
        {
            return await _context.ChiTieus.FindAsync(maChiTieu);
        }
        public async Task<ChiTieu?> FindChiTieuByNameAsync(string tenChiTieu)
        {
            return await _context.ChiTieus.AsNoTracking().SingleOrDefaultAsync(item => item.TenChiTieu.ToLower().Trim() == tenChiTieu);
        }
        public void CreateChiTieuAsync(ChiTieu chiTieu)
        {
            _context.ChiTieus.Add(chiTieu);
        }
        public  void UpdateChiTieuAsync(ChiTieu chiTieu)
        {
            _context.ChiTieus.Update(chiTieu);
        }
        public void DeleteChiTieuAsync(ChiTieu chiTieu)
        {
            _context.ChiTieus.Remove(chiTieu);
        }
    }
}
