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
