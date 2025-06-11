
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
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
                await _context.Entry(item).Collection(p => p.PhieuDangKyMaus).Query().Include(m => m.PhieuDangKyMauHinhAnhs).LoadAsync();
            }
            return result;
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy)
        {
            return await _context.PhieuDangKies.Where(item => item.MaKh == maKH && item.TrangThaiId == maTrangThaiPhieuDangKy).Include(item => item.PhieuDangKyMaus).ThenInclude(item => item.PhieuDangKyMauHinhAnhs).ToListAsync();
        }
        public async Task<PhieuDangKy?> FindPhieuDangKyAsync(string maPhieuDangKy)
        {
            return await _context.PhieuDangKies.Include(p => p.PhieuDangKyMaus).ThenInclude(item => item.PhieuDangKyMauHinhAnhs)
            .FirstOrDefaultAsync(p => p.MaId == maPhieuDangKy);
        }
        public async Task CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
          await _context.PhieuDangKies.AddAsync(phieuDangKy);
        }
        public void UpdatePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            _context.PhieuDangKies.Update(phieuDangKy);
        }
        public void DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            _context.PhieuDangKies.Remove(phieuDangKy);
        }
        public async Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id, bool tracking)
        {
            var result = new PhieuDangKy();
            if (tracking)
            {
                result = await _context.PhieuDangKies.FirstOrDefaultAsync(x => x.MaId == id);
            }
            else
            {
                result = await _context.PhieuDangKies.AsNoTracking().
                    FirstOrDefaultAsync(x => x.MaId == id);
            }
            return result;
        }
        public async Task<int> DuTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan)
        {
            var result = await _context
            .Set<ThoiGianTieuChuan>()  // Không cần DbSet thực trong DbContext
            .FromSqlRaw("SELECT dbo.Fn_ThoiGianDuTinhKiemNghiem({0}, {1}) AS ThoiGianTC", maDmMau, maTieuChuan)
            .AsNoTracking()
            .FirstOrDefaultAsync();
            return result?.ThoiGianTC ?? 0;
        }

    }
}
