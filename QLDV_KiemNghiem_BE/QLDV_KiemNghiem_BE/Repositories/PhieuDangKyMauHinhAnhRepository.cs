using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDangKyMauHinhAnhRepository : IPhieuDangKyMauHinhAnhRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDangKyMauHinhAnhRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PhieuDangKyMauHinhAnh>> GetPhieuDangKyMauHinhAnhsAllAsync()
        {
            return await _context.PhieuDangKyMauHinhAnhs.ToListAsync();
        }
        public async Task<IEnumerable<PhieuDangKyMauHinhAnh>?> GetPhieuDangKyMauHinhAnhByMaMauAsync(string maMau, bool tracking)
        {
            if(tracking)
            {
                return await _context.PhieuDangKyMauHinhAnhs.AsNoTracking().Where(item => item.MaMau == maMau).ToListAsync();
            }
            else
            {
                return await _context.PhieuDangKyMauHinhAnhs.Where(item => item.MaMau == maMau).ToListAsync();
            }
        }
        public async Task<PhieuDangKyMauHinhAnh?> FindPhieuDangKyMauHinhAnhAsync(string maPhieuDangKyMauHinhAnh)
        {
            return await _context.PhieuDangKyMauHinhAnhs.FindAsync(maPhieuDangKyMauHinhAnh);
        }
        public async Task CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh)
        {
            await _context.PhieuDangKyMauHinhAnhs.AddAsync(PhieuDangKyMauHinhAnh);
        }
        public void UpdatePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh)
        {
            _context.PhieuDangKyMauHinhAnhs.Update(PhieuDangKyMauHinhAnh);
        }
        public void DeletePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh)
        {
             _context.PhieuDangKyMauHinhAnhs.Remove(PhieuDangKyMauHinhAnh);
        }

        public async Task<PhieuDangKyMauHinhAnh?> CheckExistPhieuDangKyMauHinhAnhAsync(string id, bool tracking)
        {
            var result = new PhieuDangKyMauHinhAnh();
            if(tracking)
            {
                result = await _context.PhieuDangKyMauHinhAnhs.AsNoTracking().SingleOrDefaultAsync(item => item.MaId == id);
            }
            else
            {
                result = await _context.PhieuDangKyMauHinhAnhs.SingleOrDefaultAsync(item => item.MaId == id);
            }
            return result;
        }
    }
}
