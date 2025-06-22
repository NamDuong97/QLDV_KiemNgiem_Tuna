using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class ChiTietPhieuDeXuatPhongBanRepository : IChiTietPhieuDeXuatPhongBanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChiTietPhieuDeXuatPhongBanRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietPhieuDeXuatPhongBan>> GetChiTietPhieuDeXuatPhongBansAllAsync()
        {
            return await _context.ChiTietPhieuDeXuatPhongBans.ToListAsync();
        }
        public async Task<ChiTietPhieuDeXuatPhongBan?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan, bool tracking)
        {
            if (tracking)
            {
                return await _context.ChiTietPhieuDeXuatPhongBans.FindAsync(maChiTietPhieuDeXuatPhongBan);
            }
            else
            {
                return await _context.ChiTietPhieuDeXuatPhongBans.AsNoTracking().SingleOrDefaultAsync(item => item.MaId == maChiTietPhieuDeXuatPhongBan);
            }
        }
        public async Task<int> CheckAllSamplesApproved_PDXPB (string maPDXPB, string maCTDXPB)
        {
            var result = await _context.CheckAllSamplesApproved_PDXPBs
            .FromSqlRaw("SELECT dbo.fn_CheckAllSamplesApproved_PDXPB({0}, {1}) AS CheckAllSamplesApproved", maPDXPB, maCTDXPB)
            .AsNoTracking()
            .FirstOrDefaultAsync();
            return result?.CheckAllSamplesApproved ?? 0;
        }
        public async Task<int> CheckAllSamplesCancel_PDXPB(string maPDXPB, string maCTDXPB)
        {
            var result = await _context.CheckAllSamplesCancel_PDXPBs
            .FromSqlRaw("SELECT dbo.fn_CheckAllSamplesCancel_PDXPB({0}, {1}) AS CheckAllSamplesApproved", maPDXPB, maCTDXPB)
            .AsNoTracking()
            .FirstOrDefaultAsync();
            return result?.CheckAllSamplesCancel ?? 0;
        }
        public async Task<List<ChiTietPhieuDeXuatPhongBan>?> CheckSampleAssignedToDepartment(CheckSampleAssignedToDepartmentModel checkSample)
        {
            var result = await _context.ChiTietPhieuDeXuatPhongBans.
           FromSqlRaw("exec CheckSampleAssignedToDepartment @maPDK = {0}, @maMau ={1}, @maKhoa = {2}",
           checkSample.MaPhieuDangKy, checkSample.MaMau, checkSample.MaKhoa).
           ToListAsync();
            
            return result;
        }
        public async Task<List<ChiTietPhieuDeXuatPhongBan>?> FindChiTietPhieuDeXuatPhongBanByMaMauAsync(string maMau, bool tracking)
        {
            if(tracking)
            {
                return await _context.ChiTietPhieuDeXuatPhongBans.Where(item => item.MaPdkMau == maMau).ToListAsync();
            }
            else
            {
                return await _context.ChiTietPhieuDeXuatPhongBans.AsNoTracking().Where(item => item.MaPdkMau == maMau).ToListAsync();
            } 
        }
        public void CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            _context.ChiTietPhieuDeXuatPhongBans.Add(ChiTietPhieuDeXuatPhongBan);
        }
        public void UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            _context.ChiTietPhieuDeXuatPhongBans.Update(ChiTietPhieuDeXuatPhongBan);
        }
        public void DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            _context.ChiTietPhieuDeXuatPhongBans.Remove(ChiTietPhieuDeXuatPhongBan);
        }
    }
}
