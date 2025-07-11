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
                "@ngayTraKetQuaFrom = {4}, @ngayTraKetQuaTo = {5}, @luuMau = {6}",
                param.MaLoaiMau ?? "", param.MaKhoa ?? "", param.ManvThucHien ?? "", param.TrangThaiPhanCong, param.NgayTraKetQuaFrom ?? "", param.NgayTraKetQuaTo ?? "", param.LuuMau).ToListAsync();

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
        public PhieuDangKyMauThongKeDto? GetPhieuDangKyMauThongKe()
        {
            return _context.PhieuDangKyMauThongKeDtos.FromSqlRaw("exec sp_ThongKePhieuDangKyMau").AsEnumerable().FirstOrDefault();
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
        public async Task<int> ProcessUpdateStatusObjecRelative (string maMau, int typeCancel, string message, string user)
        {
            // Hàm này xử lý việc phòng KHTH muốn hủy mẫu do khách hủy hoặc k phòng ban nào làm
            int rowCount =  await _context.Database.ExecuteSqlRawAsync("exec sp_ProcessUpdateStatusObjecRelativeFromCancelMau @maMau = {0}, @typeCancel = {1}, @message ={2}, @user ={3}", maMau, typeCancel, message, user);
            return rowCount;    
        }
        public async Task<PhieuDangKyMauThongKeProcedure> GetThongKePhieuDangKyMauProcedure(string maMau)
        {
            var result = await _context.PhieuDangKyMauThongKeProcedures.
               FromSqlRaw("exec sp_CheckMauWithForm {0}", maMau).FirstOrDefaultAsync();
            return result!;
        }
        public async Task<int> ProcessUpdateStatusMauWhenBLDAction(string maPDK, string trangThaiId)
        {
            // Hàm này xử lý việc phòng KHTH muốn hủy mẫu do khách hủy hoặc k phòng ban nào làm
            int rowCount = await _context.Database.ExecuteSqlRawAsync("exec sp_ProcessUpdateStatusMauWhenBLDAction @maPDK = {0}, @trangThaiId ={1}", maPDK, trangThaiId);
            return rowCount;
        }
        public async Task<int> ProcessCancelMauByLDP(string maMau, string message, bool action, string user, string userId, string maKhoa)
        {
            // Hàm này xử lý việc phòng KHTH muốn hủy mẫu do khách hủy hoặc k phòng ban nào làm
            int rowCount = await _context.Database.ExecuteSqlRawAsync("exec sp_ProcessCancelMauByLDP {0},{1},{2},{3},{4},{5}", maMau, message, action, user, userId, maKhoa);
            return rowCount;
        }
        public async Task<PhieuDangKyMau?> FindPhieuDangKyMauAsync(string maPhieuDangKyMau, bool track)
        {
            if (track)
            {
                return await _context.PhieuDangKyMaus.FirstOrDefaultAsync(it=> it.MaId == maPhieuDangKyMau);
            }
            else
            {
                return await _context.PhieuDangKyMaus.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maPhieuDangKyMau);
            }
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
