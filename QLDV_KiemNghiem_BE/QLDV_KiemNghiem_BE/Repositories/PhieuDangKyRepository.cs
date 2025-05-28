using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using System;
using System.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;


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
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync(string maKH = "", string trangThaiID = "", string from = "", string to = "")
        {
            var result = await _context.PhieuDangKies
                .FromSqlRaw("exec layPhieuDangKyTheoBoLoc @maKH = {0}, @trangThaiID = {1}, @timeFrom = {2}, @timeTo = {3}", maKH, trangThaiID, from, to)
                .ToListAsync();

            foreach (var item in result)
            {
                await _context.Entry(item).Collection(p => p.Maus).Query().Include(m => m.MauHinhAnhs).LoadAsync();
            }
            return result;
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy)
        {
            return await _context.PhieuDangKies.Where(item => item.MaKh == maKH && item.TrangThaiId == maTrangThaiPhieuDangKy).Include(item => item.Maus).ThenInclude(item => item.MauHinhAnhs).ToListAsync();
        }
        public async Task<PhieuDangKy?> FindPhieuDangKyAsync(string maPhieuDangKy)
        {
            return await _context.PhieuDangKies.Include(p => p.Maus)
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
