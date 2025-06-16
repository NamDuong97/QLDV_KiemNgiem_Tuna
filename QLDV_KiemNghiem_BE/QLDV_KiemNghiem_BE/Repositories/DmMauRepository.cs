using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class DmMauRepository : IDmMauRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DmMauRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DmMau>> GetDmMausAllAsync()
        {
            return await _context.DmMaus.ToListAsync();
        }
        public async Task<DmMau?> FindDmMauAsync(string maDmMau)
        {
            return await _context.DmMaus.FindAsync(maDmMau);
        }
        public async Task<DmMau?> FindDmMauByNameAsync(string tenDmMau)
        {
            return await _context.DmMaus.AsNoTracking().SingleOrDefaultAsync(item => item.TenMau.ToLower().Trim() == tenDmMau);
        }
        public void CreateDmMauAsync(DmMau DmMau)
        {
            _context.DmMaus.Add(DmMau);
        }
        public void UpdateDmMauAsync(DmMau DmMau)
        {
            _context.DmMaus.Update(DmMau);
        }
        public void DeleteDmMauAsync(DmMau DmMau)
        {
            _context.DmMaus.Remove(DmMau);
        }
    }
}
