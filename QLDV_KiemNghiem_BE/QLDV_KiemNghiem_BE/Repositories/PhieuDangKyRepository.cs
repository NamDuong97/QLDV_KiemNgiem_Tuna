using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using System;
using System.Linq;


namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDangKyRepository : IPhieuDangKyRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDangKyRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync()
        {
            return await _context.PhieuDangKies.Include(item => item.Maus).ThenInclude(item => item.MauHinhAnhs).ToListAsync();
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesOfCustomerAsync(string maKH)
        {
            return await _context.PhieuDangKies.Where(item => item.MaKh == maKH).Include(item => item.Maus).ThenInclude(item => item.MauHinhAnhs).ToListAsync();
        }
        public async Task<PhieuDangKy?> FindPhieuDangKyAsync(string maPhieuDangKy)
        {
            return await _context.PhieuDangKies.Include(p => p.Maus).Include(p => p.PhieuDangKyPhuLieuHoaChats) 
            .FirstOrDefaultAsync(p => p.MaId == maPhieuDangKy);
        }
        public void CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
           _context.PhieuDangKies.Add(phieuDangKy);
        }

        public void UpdatePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            _context.PhieuDangKies.Update(phieuDangKy);
        }

        public void DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            _context.PhieuDangKies.Remove(phieuDangKy);
        }

        public async Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id)
        {
            var result = await _context.PhieuDangKies.FindAsync(id);
            return result;
        }

        public async Task<int> DuTinhThoiGianKiemNghiem(string maTieuChuan)
        {
            var result = await _context.Database.ExecuteSqlRawAsync("exec ThoiGianDuTinhKiemNghiem @maTieuChuan = {0}", maTieuChuan);
            return result;
        }

    }
}
