using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class ChucVuRepository : IChucVuRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChucVuRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<ChucVu>> GetChucVusAllAsync()
        {
            return await _context.ChucVus.ToListAsync();
        }
        public async Task<ChucVu?> FindChucVuAsync(string maChucVu)
        {
            return await _context.ChucVus.FindAsync(maChucVu);
        }

        public async Task<ChucVu?> FindChucVuByNameAsync(string tenChucVu)
        {
            return await _context.ChucVus.FirstOrDefaultAsync(it => it.TenChucVu.ToLower().Trim() == tenChucVu.ToLower().Trim());
        }

        public void CreateChucVuAsync(ChucVu ChucVu)
        {
            _context.ChucVus.Add(ChucVu);
        }
        public void UpdateChucVuAsync(ChucVu ChucVu)
        {
            _context.ChucVus.Update(ChucVu);
        }
        public void DeleteChucVuAsync(ChucVu ChucVu)
        {
            _context.ChucVus.Remove(ChucVu);
        }
    }
}
