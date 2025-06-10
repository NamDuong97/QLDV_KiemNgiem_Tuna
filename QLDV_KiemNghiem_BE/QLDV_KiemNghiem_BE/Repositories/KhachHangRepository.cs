using AutoMapper;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class KhachHangRepository : IKhachHangRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public KhachHangRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<KhachHang>> GetKhachHangsAllAsync()
        {
            return await _context.KhachHangs.ToListAsync();
        }
        public async Task<KhachHang?> GetKhacHangByEmailAsync(string email, bool tracking)
        {
            if (tracking)
            {
                return await _context.KhachHangs.FirstOrDefaultAsync(iem => iem.Email == email);
            }
            else
            {
                return await _context.KhachHangs.AsNoTracking().
                    FirstOrDefaultAsync(iem => iem.Email == email);
            }
        }
        public async Task<KhachHang?> FindKhachHangAsync(string maKhachHang)
        {
            return await _context.KhachHangs.FindAsync(maKhachHang);
        }
        public async Task<KhachHang?> CheckExistsEmailAsync(string email, bool tracking)
        {
            if(tracking)
            {
                return await _context.KhachHangs.FirstOrDefaultAsync(iem => iem.Email.ToLower() == email.Trim().ToLower());
            }
            else
            {
                return await _context.KhachHangs.AsNoTracking().
                    FirstOrDefaultAsync(iem => iem.Email.ToLower() == email.Trim().ToLower());
            }
        }
        // Hàm để xác minh người dùng bằng token, với token mà người dùng đẩy lên thì có tồn tại user này trong CSDL không
        public async Task<KhachHang?> GetKhachHangByTokenAsync(string token)
        {
            return await _context.KhachHangs.FirstOrDefaultAsync(item => item.TockenXacMinh == token) ??  null;
        }
        public void CreateKhachHangAsync(KhachHang KhachHang)
        {
            _context.KhachHangs.Add(KhachHang);
        }
        public void UpdateKhachHangAsync(KhachHang KhachHang)
        {
            _context.KhachHangs.Update(KhachHang);
        }
        public void DeleteKhachHangAsync(KhachHang KhachHang)
        {
            _context.KhachHangs.Remove(KhachHang);
        }
    }
}
