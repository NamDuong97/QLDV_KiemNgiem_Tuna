using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuLuuMauRepository : IPhieuLuuMauRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuLuuMauRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuLuuMau>> GetPhieuLuuMausAllAsync()
        {
            return await _context.PhieuLuuMaus.ToListAsync();
        }
        public async Task<PhieuLuuMau?> FindPhieuLuuMauAsync(string maPhieuLuuMau)
        {
            return await _context.PhieuLuuMaus.FindAsync(maPhieuLuuMau);
        }

        public void CreatePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau)
        {
            _context.PhieuLuuMaus.Add(PhieuLuuMau);
        }
        public void UpdatePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau)
        {
            _context.PhieuLuuMaus.Update(PhieuLuuMau);
        }
        public void DeletePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau)
        {
            _context.PhieuLuuMaus.Remove(PhieuLuuMau);
        }
    }
}
