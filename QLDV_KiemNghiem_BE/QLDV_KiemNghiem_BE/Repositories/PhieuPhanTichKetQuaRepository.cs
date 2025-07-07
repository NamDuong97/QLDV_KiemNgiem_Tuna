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
    public class PhieuPhanTichKetQuaRepository : IPhieuPhanTichKetQuaRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<PhieuPhanTichKetQuaProcedure>> GetPhieuPhanTichKetQuaAllAsync(PhieuPhanTichKetQuaParam param)
        {
            var result = await _context.PhieuPhanTichKetQuaProcedures
                 .FromSqlRaw("EXEC sp_getAllPhieuPhanTichKetQuaByBoLoc {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}",
            param.MaId ?? string.Empty,
            param.MaKhoa ?? string.Empty,
            param.DonViSanXuat ?? string.Empty,
            param.ManvLap ?? string.Empty,
            param.ManvKiemTra ?? string.Empty,
            param.MabldDuyet ?? string.Empty,
            param.DonViGuiMau ?? string.Empty,
            param.NgayTraKetQuaFrom ?? string.Empty,
            param.NgayTraKetQuaTo ?? string.Empty,
            param.TrangThai ?? string.Empty,
            param.Active).ToListAsync();

            foreach (var item in result)
            {
                item.PhieuPhanTichKetQuaChiTiets = await _context.PhieuPhanTichKetQuaChiTiets.Where(it => it.MaPhieuKetQua == item.MaID).ToListAsync();
            }
            
            return PagedList<PhieuPhanTichKetQuaProcedure>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<PhieuPhanTichKetQuaProcedure?> FindPhieuPhanTichKetQuaShowAsync(string maPhieuPhanTichKetQua)
        {
            var resultList = await _context.PhieuPhanTichKetQuaProcedures
            .FromSqlRaw("EXEC sp_getAllPhieuPhanTichKetQuaByBoLoc {0}", maPhieuPhanTichKetQua)
            .ToListAsync(); // Chuyển sang danh sách thực
            var result = resultList.FirstOrDefault();
            if (result != null)
            {
                result.PhieuPhanTichKetQuaChiTiets = await _context.PhieuPhanTichKetQuaChiTiets
                    .Where(it => it.MaPhieuKetQua == result.MaID)
                    .ToListAsync();
            }
            return result;
        }
        public async Task<int> ProcessUpdatePTKQWhenCustomerReview(string maPhieuPTKQ, bool action, string message, string user)
        {
            var result = await _context.Database.ExecuteSqlRawAsync("exec sp_ProcessUpdatePTKQWhenCustomerReview {0}, {1}, {2}, {3}",
               maPhieuPTKQ, action, message, user);
            return result;
        }
        public async Task<PhieuPhanTichKetQua?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua, bool track)
        {
            if (track)
            {
                return await _context.PhieuPhanTichKetQuas.FirstOrDefaultAsync(it => it.MaId == maPhieuPhanTichKetQua);
            }
            else
            {
                return await _context.PhieuPhanTichKetQuas.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maPhieuPhanTichKetQua);
            }
        }
        public async Task<int> ProcessReviewSuccessPhieuPhanTichKetQuaByBLD(string maMau, string user, string userId)
        {
            int kq = await _context.Database.ExecuteSqlRawAsync("exec sp_ProcessReviewSuccessPhieuPhanTichKetQuaByBLD {0}, {1}, {2}", maMau, user, userId);
            return kq;
        }
        public void CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            _context.PhieuPhanTichKetQuas.Add(PhieuPhanTichKetQua);
        }
        public void UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            _context.PhieuPhanTichKetQuas.Update(PhieuPhanTichKetQua);
        }
        public void DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            _context.PhieuPhanTichKetQuas.Remove(PhieuPhanTichKetQua);
        }
    }
}
