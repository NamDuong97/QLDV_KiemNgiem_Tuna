using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.PublicFunc;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

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
        public async Task<PagedList<NhanVien>> GetNhanViensAllAsync(NhanVienParam nhanVienParam, bool tracking)
        {
            if(tracking)
            {
                var result = await _context.NhanViens.ToListAsync();
                return PagedList<NhanVien>.ToPagedList(result, nhanVienParam.PageNumber, nhanVienParam.PageSize);
            }
            else
            {
                var result = await _context.NhanViens.AsNoTracking().ToListAsync();
                return PagedList<NhanVien>.ToPagedList(result, nhanVienParam.PageNumber, nhanVienParam.PageSize);
            }
        }
        public async Task<NhanVien?> FindNhanVienAsync(string maNhanVien)
        {
            return await _context.NhanViens.FindAsync(maNhanVien);
        }
        public async Task<NhanVien?> GetNhanVienByEmailAsync(string email, bool tracking)
        {
            if (tracking)
            {
                return await _context.NhanViens.FirstOrDefaultAsync(iem => iem.EmailCaNhan == email);
            }
            else
            {
                return await _context.NhanViens.AsNoTracking().
                    FirstOrDefaultAsync(iem => iem.EmailCaNhan == email);
            }
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
