using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDangKyMauRepository : IPhieuDangKyMauRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDangKyMauRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDangKyMau>> GetPhieuDangKyMauAllAsync()
        {
            return await _context.PhieuDangKyMaus.Include(item => item.PhieuDangKyMauHinhAnhs).ToListAsync();
        }
        public async Task<PhieuDangKyMau?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau)
        {
            return await _context.PhieuDangKyMaus.Include(item => item.PhieuDangKyMauHinhAnhs).Where(item => item.MaId == maPhieuDangKyMau).SingleOrDefaultAsync();
        }
        public void CreatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau)
        {
            _context.PhieuDangKyMaus.Add(PhieuDangKyMau);
        }
        public void UpdatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau)
        {
            _context.PhieuDangKyMaus.Update(PhieuDangKyMau);
        }

        public void DeletePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau)
        {
            _context.PhieuDangKyMaus.Remove(PhieuDangKyMau);
        }

    }






























































































































}
