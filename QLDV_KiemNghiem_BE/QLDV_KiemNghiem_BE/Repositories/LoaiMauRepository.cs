using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class LoaiMauRepository : ILoaiMauRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LoaiMauRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<LoaiMau>> GetLoaiMausAllAsync()
        {
            return await _context.LoaiMaus.ToListAsync();
        }
        public async Task<LoaiMau?> FindLoaiMauAsync(string maLoaiMau)
        {
            return await _context.LoaiMaus.FindAsync(maLoaiMau);
        }
        public void CreateLoaiMauAsync(LoaiMau LoaiMau)
        {
            _context.LoaiMaus.Add(LoaiMau);
        }
        public void UpdateLoaiMauAsync(LoaiMau LoaiMau)
        {
            _context.LoaiMaus.Update(LoaiMau);
        }
        public void DeleteLoaiMauAsync(LoaiMau LoaiMau)
        {
            _context.LoaiMaus.Remove(LoaiMau);
        }
    }
}
