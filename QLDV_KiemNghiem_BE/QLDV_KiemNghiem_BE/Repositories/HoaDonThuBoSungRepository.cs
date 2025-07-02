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
    public class HoaDonThuBoSungRepository : IHoaDonThuBoSungRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public HoaDonThuBoSungRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<HoaDonThuBoSungProcedure>> GetHoaDonThuBoSungAllAsync(HoaDonThuBoSungParam param)
        {
            var result = await _context.HoaDonThuBoSungProcedures
                .FromSqlRaw("EXEC sp_getAllHoaDonThuBoSungByBoLoc {0}, {1}, {2}, {3}, {4}, {5}, {6}",
                    param.MaID ?? string.Empty,
                    param.MaHD ?? string.Empty,
                    param.ManvLap ?? string.Empty,
                    param.TrangThai ?? string.Empty,
                    param.NgayLapFrom ?? string.Empty,
                    param.NgayLapTo ?? string.Empty,
                    param.Active ?? (object)DBNull.Value // NULL nếu không truyền
                ).ToListAsync();

            foreach(var item in result)
            {
                item.ChiTietHoaDonThuBoSungs = await _context.ChiTietHoaDonThuBoSungs.Where(it => it.MaHdbs == item.MaID).ToListAsync();
            }

            return PagedList<HoaDonThuBoSungProcedure>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<HoaDonThuBoSungProcedure?> FindHoaDonThuBoSungShowAsync(string maPhieuTienDo)
        {
            var resultList = await _context.HoaDonThuBoSungProcedures
                .FromSqlRaw("EXEC sp_getAllHoaDonThuBoSungByBoLoc {0}", maPhieuTienDo)
                .ToListAsync();
            var result = resultList.FirstOrDefault();
            if (result != null)
            {
                result.ChiTietHoaDonThuBoSungs = await _context.ChiTietHoaDonThuBoSungs.Where(it => it.MaHdbs == result.MaID).ToListAsync();
                return result;
            }
            return null;
        }
        public async Task<List<HoaDonThuBoSungProcedure>?> FindHoaDonThuBoSungByMaHoaDonThuAsync(string maHoaDonThu)
        {
            var resultList = await _context.HoaDonThuBoSungProcedures
                .FromSqlRaw("EXEC sp_getAllHoaDonThuBoSungByBoLoc {0}, {1}", "", maHoaDonThu)
                .ToListAsync();
           
            if (resultList != null && resultList.Count() > 0)
            {
                foreach (var item in resultList) {

                    item.ChiTietHoaDonThuBoSungs = await _context.ChiTietHoaDonThuBoSungs.Where(it => it.MaHdbs == item.MaID).ToListAsync();
                }
            }
            return null;
        }
        public async Task<HoaDonThuBoSung?> FindHoaDonThuBoSungAsync(string maHoaDonThuBoSung, bool track)
        {
            if (track)
            {
                return await _context.HoaDonThuBoSungs.FirstOrDefaultAsync(it => it.MaId == maHoaDonThuBoSung);

            }
            else
            {
                return await _context.HoaDonThuBoSungs.AsNoTracking().FirstOrDefaultAsync(it => it.MaId ==maHoaDonThuBoSung);

            }
        }
        public void CreateHoaDonThuBoSungAsync(HoaDonThuBoSung HoaDonThuBoSung)
        {
            _context.HoaDonThuBoSungs.Add(HoaDonThuBoSung);
        }
        public void UpdateHoaDonThuBoSungAsync(HoaDonThuBoSung HoaDonThuBoSung)
        {
            _context.HoaDonThuBoSungs.Update(HoaDonThuBoSung);
        }
        public void DeleteHoaDonThuBoSungAsync(HoaDonThuBoSung HoaDonThuBoSung)
        {
            _context.HoaDonThuBoSungs.Remove(HoaDonThuBoSung);
        }
    }
}
