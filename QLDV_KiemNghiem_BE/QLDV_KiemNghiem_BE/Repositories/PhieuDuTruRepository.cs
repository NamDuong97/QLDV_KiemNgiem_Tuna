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
    public class PhieuDuTruRepository : IPhieuDuTruRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDuTruRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<PhieuDuTruProcedure>> GetPhieuDuTruAllAsync(PhieuDuTruParam param)
        {
            var result = await _context.PhieuDuTruProcedures
                .FromSqlRaw("EXEC sp_getAllPhieuDuTruByBoLoc {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}",
                    param.MaId ?? string.Empty,
                    param.MaKhoa ?? string.Empty,
                    param.ManvLap ?? string.Empty,
                    param.ManvDuyet ?? string.Empty,
                    param.TrangThai ?? -1,
                    param.NgayLapFrom ?? string.Empty,
                    param.NgayLapTo ?? string.Empty,
                    param.NoiDungDuyet ?? string.Empty
                ).ToListAsync();

            // Nếu có chi tiết, lặp từng item và truy vấn chi tiết như sau:
            foreach (var item in result)
            {
                item.ChiTietPhieuDuTrus = await _context.ChiTietPhieuDuTrus
                    .Where(ct => ct.MaPhieuDuTru == item.MaID)
                    .ToListAsync();
            }

            return PagedList<PhieuDuTruProcedure>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<PhieuDuTruProcedure?> FindPhieuDuTruShowAsync(string maPhieuDuTru)
        {
            var resultList = await _context.PhieuDuTruProcedures
                .FromSqlRaw("EXEC sp_getAllPhieuDuTruByBoLoc {0}", maPhieuDuTru)
                .ToListAsync();

            var result = resultList.FirstOrDefault();

            if (result != null)
            {
                result.ChiTietPhieuDuTrus = await _context.ChiTietPhieuDuTrus
                    .Where(it => it.MaPhieuDuTru == result.MaID)
                    .ToListAsync();
            }

            return result;
        }
        public async Task<PhieuDuTru?> FindPhieuDuTruAsync(string maPhieuDuTru, bool track)
        {
            if (track)
            {
                return await _context.PhieuDuTrus.FirstOrDefaultAsync(it => it.MaId == maPhieuDuTru);
            }
            else
            {
                return await _context.PhieuDuTrus.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maPhieuDuTru);
            }
        }
        public void CreatePhieuDuTruAsync(PhieuDuTru PhieuDuTru)
        {
            _context.PhieuDuTrus.Add(PhieuDuTru);
        }
        public void UpdatePhieuDuTruAsync(PhieuDuTru PhieuDuTru)
        {
            _context.PhieuDuTrus.Update(PhieuDuTru);
        }
        public void DeletePhieuDuTruAsync(PhieuDuTru PhieuDuTru)
        {
            _context.PhieuDuTrus.Remove(PhieuDuTru);
        }
    }
}
