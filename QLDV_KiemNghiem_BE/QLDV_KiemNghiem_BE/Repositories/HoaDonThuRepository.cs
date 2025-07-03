using AutoMapper;
using Microsoft.AspNetCore.SignalR.Protocol;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using System;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class HoaDonThuRepository : IHoaDonThuRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public HoaDonThuRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<HoaDonThuProcedure>> GetAllHoaDonThuByBoLocAsync(HoaDonThuParam param)
        {
            var result = await _context.HoaDonThuProcedures
                .FromSqlRaw("EXEC sp_getAllHoaDonThuByBoLoc {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}",
                    param.MaID ?? string.Empty,
                    param.MaHD ?? string.Empty,
                    param.ManvXuLy ?? string.Empty,
                    param.TrangThai ?? string.Empty,
                    param.NgayLapFrom ?? string.Empty,
                    param.NgayLapTo ?? string.Empty,
                    param.TongTienFrom ?? string.Empty,
                    param.TongTienTo ?? string.Empty,
                    param.MaKH ?? string.Empty,
                    param.Active ?? string.Empty
                ).ToListAsync();

            if (param.IsChiTietHoaDon)
            {
                foreach (var hoaDon in result)
                {

                    hoaDon.DsChiTietHoaDonThu = await _context.ChiTietHoaDonThus
                        .Where(it => it.MaHd == hoaDon.MaID)
                        .ToListAsync();
                }
            }
            return PagedList<HoaDonThuProcedure>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<decimal> GetToTalMoneyOfMau(string dmMau, string maTieuChuan, string maLoaiDichVu)
        {
            var result = await _context.ThanhTienTungMaus
            .FromSqlRaw("SELECT dbo.fn_ThanhTienTungMauKiemNghiem({0}, {1}, {2}) AS ThanhTien", dmMau, maTieuChuan, maLoaiDichVu)
            .AsNoTracking()
            .FirstOrDefaultAsync();
            return result?.ThanhTien ?? 0;
        }
        public async Task<HoaDonThu?> FindHoaDonThuAsync(string maHoaDonThu, bool track)
        {
            return track ? await _context.HoaDonThus.FirstOrDefaultAsync(it => it.MaId == maHoaDonThu) :
                await _context.HoaDonThus.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maHoaDonThu);
        }
        public async Task<HoaDonThuProcedure?> FindHoaDonThuShowAsync(string maHoaDonThu)
        {

            var result = await _context.HoaDonThuProcedures
                .FromSqlRaw("EXEC sp_getAllHoaDonThuByBoLoc {0}", maHoaDonThu).ToListAsync();
            var qk = result.FirstOrDefault();

            if (qk != null)
            {
                qk.DsChiTietHoaDonThu = await _context.ChiTietHoaDonThus.Where(it => it.MaHd == qk.MaID).ToListAsync();
                return qk;
            }
            return null;            
        }
        public async Task<HoaDonThu?> CheckExistHoaDonThuByPhieuDangKyAsync(string maPhieuDangKy, bool tracking)
        {
            if (tracking)
            {
                var result = await _context.HoaDonThus.Where(item => item.MaPhieuDangKy == maPhieuDangKy).SingleOrDefaultAsync();
                return result;
            }
            else
            {
                var result = await _context.HoaDonThus.AsNoTracking().Where(item => item.MaPhieuDangKy == maPhieuDangKy).SingleOrDefaultAsync();
                return result;
            }
        }
        public async Task CreateHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            await _context.HoaDonThus.AddAsync(HoaDonThu);
        }
        public void UpdateHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            _context.HoaDonThus.Update(HoaDonThu);
        }
        public async Task<HoaDonThu> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy)
        {
            // 1. Gọi stored procedure và lấy ra 1 bản ghi cụ thể
            var hoaDonThu = await _context.HoaDonThus
                .FromSqlRaw("exec sp_UpdateHoaDonThuByMaPhieuDangKy @maphieu = {0}", maPhieuDangKy).FirstOrDefaultAsync();

            if (hoaDonThu == null)
                return new HoaDonThu();
            // 2. Attach vào context để load các navigation properties
            //_context.Attach(hoaDonThu);
            // 3. Load collection: ChiTietHoaDonThus vào hoaDonThu
            await _context.Entry(hoaDonThu).Collection(p => p.ChiTietHoaDonThus).LoadAsync();
            // 4. Load collection: HoaDonThuBoSungs vào hoaDonThu
            await _context.Entry(hoaDonThu).Collection(p => p.HoaDonThuBoSungs).Query().Include(t => t.ChiTietHoaDonThuBoSungs).LoadAsync();
            return hoaDonThu;
        }
        public void DeleteHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            _context.HoaDonThus.Remove(HoaDonThu);
        }
    }
}
