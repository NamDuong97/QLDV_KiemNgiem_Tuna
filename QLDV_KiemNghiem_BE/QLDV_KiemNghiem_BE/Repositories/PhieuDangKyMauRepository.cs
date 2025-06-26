using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

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

        public async Task<PagedList<PhieuDangKyMauProcedure>> GetPhieuDangKyMauAllAsync(PhieuDangKyMauParam param)
        {
            var result = await _context.PhieuDangKyMauProcedures.
                FromSqlRaw("exec sp_getAllPhieuDangKyMauByBoLoc @maLoaiMau={0}, @maKhoa = {1}, @manvThucHien = {2}, @trangThaiPhanCong = {3}," +
                "@ngayTraKetQuaFrom = {4}, @ngayTraKetQuaTo = {5}",
                param.MaLoaiMau ?? "", param.MaKhoa ?? "", param.ManvThucHien ?? "", param.TrangThaiPhanCong, param.NgayTraKetQuaFrom ?? "", param.NgayTraKetQuaTo ?? "").ToListAsync();

            foreach (var item in result)
            {
                item.PhieuDangKyMauHinhAnhs = await _context.PhieuDangKyMauHinhAnhs.Where(it => it.MaMau == item.MaId).ToListAsync();
            }

            return PagedList<PhieuDangKyMauProcedure>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }

        public async Task<PhieuDangKyMau?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau)
        {
            return await _context.PhieuDangKyMaus.Include(item => item.PhieuDangKyMauHinhAnhs).Where(item => item.MaId == maPhieuDangKyMau).SingleOrDefaultAsync();
        }

        public async Task<PhieuDangKyMau?> FindPhieuDangKyMauByPhieuDangKyAndMaDmMauAsync(string maPhieuDangKy, string maDmMau, bool tracking)
        {
            if(tracking)
            {
                return await _context.PhieuDangKyMaus.
                Where(item => item.MaPhieuDangKy == maPhieuDangKy && item.MaDmMau == maDmMau).SingleOrDefaultAsync();
            }
            else
            {
                return await _context.PhieuDangKyMaus.AsNoTracking().
               Where(item => item.MaPhieuDangKy == maPhieuDangKy && item.MaDmMau == maDmMau).SingleOrDefaultAsync();
            }
            
        }

        public async Task ProcessUpdateStatusObjecRelative (string maMau, int TypeCancel)
        {
            await _context.Database.ExecuteSqlRawAsync("exec sp_ProcessUpdateStatusObjecRelativeFromCancelMau @maMau = {0}, @typeCancel = {1}", maMau, TypeCancel);
        }
        public async Task<PhieuDangKyMau?> FindPhieuDangKyMauAsync(string maPhieuDangKyMau)
        {
            return await _context.PhieuDangKyMaus.FindAsync(maPhieuDangKyMau);
        }

        public async Task<int> CheckPhanCongAllMauInPDK(string maId, string maPhieuDangKy)
        {
            var result = await _context.CheckPhanCongAllMauInPDKs
          .FromSqlRaw("SELECT dbo.[fn_CheckPhanCongAllMauInPDK]({0}, {1}) AS CheckPhanCongAllMau", maId, maPhieuDangKy)
          .AsNoTracking()
          .FirstOrDefaultAsync();
            return result?.CheckPhanCongAllMau ?? 0;
        }

        public async Task CreatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau)
        {
            await _context.PhieuDangKyMaus.AddAsync(PhieuDangKyMau);
        }

        public void UpdatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau)
        {
            _context.PhieuDangKyMaus.Update(PhieuDangKyMau);
        }

        public void DeletePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau)
        {
            _context.PhieuDangKyMaus.Remove(PhieuDangKyMau);
        }

        public async Task<PhieuDangKyMau?> CheckExistPhieuDangKyMauAsync(string phieuDangKyMau, string phieuDangKy, bool checking)
        {
            var result = new PhieuDangKyMau();
            if(checking)
            {
                result = await _context.PhieuDangKyMaus
                    .Where(item => item.MaPhieuDangKy == phieuDangKy && item.MaId == phieuDangKyMau).SingleOrDefaultAsync();
            }
            else
            {
                result = await _context.PhieuDangKyMaus.AsNoTracking()
                   .Where(item => item.MaPhieuDangKy == phieuDangKy && item.MaId == phieuDangKyMau).SingleOrDefaultAsync();
            }
            return result;
        }
    }






























































































































}
