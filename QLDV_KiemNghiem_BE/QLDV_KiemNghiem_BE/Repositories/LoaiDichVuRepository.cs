using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class LoaiDichVuRepository : ILoaiDichVuRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LoaiDichVuRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<LoaiDichVu>> GetLoaiDichVusAllAsync()
        {
            return await _context.LoaiDichVus.ToListAsync();
        }
        public async Task<LoaiDichVu?> FindLoaiDichVuAsync(string maLoaiDichVu)
        {
            return await _context.LoaiDichVus.FindAsync(maLoaiDichVu);
        }
        public void CreateLoaiDichVuAsync(LoaiDichVu LoaiDichVu)
        {
            _context.LoaiDichVus.Add(LoaiDichVu);
        }
        public void UpdateLoaiDichVuAsync(LoaiDichVu LoaiDichVu)
        {
            _context.LoaiDichVus.Update(LoaiDichVu);
        }
        public void DeleteLoaiDichVuAsync(LoaiDichVu LoaiDichVu)
        {
            _context.LoaiDichVus.Remove(LoaiDichVu);
        }
    }
}
