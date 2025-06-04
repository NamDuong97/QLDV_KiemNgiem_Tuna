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
        public async Task<PhieuDangKyMauHinhAnh?> FindPhieuDangKyMauHinhAnhAsync(string maPhieuDangKyMauHinhAnh)
        {
            return await _context.PhieuDangKyMauHinhAnhs.FindAsync(maPhieuDangKyMauHinhAnh);
        }
        public void CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh)
        {
            _context.PhieuDangKyMauHinhAnhs.Add(PhieuDangKyMauHinhAnh);
        }
        public void UpdatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh)
        {
            _context.PhieuDangKyMauHinhAnhs.Update(PhieuDangKyMauHinhAnh);
        }
        public void DeletePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh)
        {
            _context.PhieuDangKyMauHinhAnhs.Remove(PhieuDangKyMauHinhAnh);
        }
        public async Task<PhieuDangKyMauHinhAnh?> CheckExistPhieuDangKyMauHinhAnhAsync(string id)
        {
            var result = await _context.PhieuDangKyMauHinhAnhs.FindAsync(id);
            return result;
        }
    }
}
