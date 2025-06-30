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
    public class PhieuTienDoLamViecRepository : IPhieuTienDoLamViecRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuTienDoLamViecRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<PhieuTienDoLamViecProcedure>> GetPhieuTienDoLamViecAllAsync(PhieuTienDoLamViecParam param)
        {
            var result = await _context.PhieuTienDoLamViecProcedures
                .FromSqlRaw("EXEC sp_getAllPhieuTienDoLamViecByBoLoc {0}, {1}, {2}, {3}, {4}, {5}, {6}",
                    param.MaKhoa ?? string.Empty,
                    param.ManvXuLy ?? string.Empty,
                    param.TenGiaiDoanThucHien ?? string.Empty,
                    param.ManvKiemTra ?? string.Empty,
                    param.NgayTraKetQuaFrom ?? string.Empty,
                    param.NgayTraKetQuaTo ?? string.Empty,
                    param.TrangThai.HasValue ? param.TrangThai.Value : true
                ).ToListAsync();

            return PagedList<PhieuTienDoLamViecProcedure>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<PhieuTienDoLamViecProcedure?> FindPhieuTienDoLamViecShowAsync(string maPhieuTienDo)
        {
            var resultList = await _context.PhieuTienDoLamViecProcedures
                .FromSqlRaw("EXEC sp_getAllPhieuTienDoLamViecByBoLoc {0}", maPhieuTienDo)
                .ToListAsync();
            var result = resultList.FirstOrDefault();
            return result;
        }
        public async Task<PhieuTienDoLamViec?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec)
        {
            return await _context.PhieuTienDoLamViecs.FindAsync(maPhieuTienDoLamViec);
        }
        public void CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            _context.PhieuTienDoLamViecs.Add(PhieuTienDoLamViec);
        }
        public void UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            _context.PhieuTienDoLamViecs.Update(PhieuTienDoLamViec);
        }
        public void DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            _context.PhieuTienDoLamViecs.Remove(PhieuTienDoLamViec);
        }
    }
}
