using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class NhanVienRepository : INhanVienRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NhanVienRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<NhanVien>> GetNhanViensAllAsync()
        {
            return await _context.NhanViens.ToListAsync();
        }
        public async Task<NhanVien?> FindNhanVienAsync(string maNhanVien)
        {
            return await _context.NhanViens.FindAsync(maNhanVien);
        }

        public void CreateNhanVienAsync(NhanVien NhanVien)
        {
            _context.NhanViens.Add(NhanVien);
        }
        public void UpdateNhanVienAsync(NhanVien NhanVien)
        {
            _context.NhanViens.Update(NhanVien);
        }
        public void DeleteNhanVienAsync(NhanVien NhanVien)
        {
            _context.NhanViens.Remove(NhanVien);
        }
    }
}
