using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class DuocDienRepository : IDuocDienRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DuocDienRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DuocDien>> GetDuocDiensAllAsync()
        {
            return await _context.DuocDiens.ToListAsync();
        }
        public async Task<DuocDien?> FindDuocDienAsync(string maDuocDien)
        {
            return await _context.DuocDiens.FindAsync(maDuocDien);
        }
        public void CreateDuocDienAsync(DuocDien DuocDien)
        {
            _context.DuocDiens.Add(DuocDien);
        }
        public void UpdateDuocDienAsync(DuocDien DuocDien)
        {
            _context.DuocDiens.Update(DuocDien);
        }
        public void DeleteDuocDienAsync(DuocDien DuocDien)
        {
            _context.DuocDiens.Remove(DuocDien);
        }
    }
}
