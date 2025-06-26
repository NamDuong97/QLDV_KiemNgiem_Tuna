using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Collections.Generic;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class NhanVienRepository : INhanVienRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NhanVienRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<NhanVienProcedure>> GetNhanViensAllAsync(NhanVienParam nhanVienParam, bool tracking)
        {
            if(tracking)
            {
                var result = await _context.NhanVienProcedures.
                FromSqlRaw("exec layNhanVienTheoBoLoc @hoTen = N{0}, @maKhoa ={1}, @maBoPhan = {2}, @maChucVu = {3}, @trangThai = {4}",
                nhanVienParam.HoTen, nhanVienParam.MaKhoa, nhanVienParam.MaBoPhan, nhanVienParam.MaChucVu, nhanVienParam.TrangThai).
                ToListAsync();
                _context.Attach(result);
                return PagedList<NhanVienProcedure>.ToPagedList(result, nhanVienParam.PageNumber, nhanVienParam.PageSize, nhanVienParam.GetAll);
            }
            else
            {
                var result = await _context.NhanVienProcedures.FromSqlRaw("exec layNhanVienTheoBoLoc @hoTen = N{0}, @maKhoa ={1}, @maBoPhan = {2}, @maChucVu = {3}, @trangThai = {4}",
                nhanVienParam.HoTen, nhanVienParam.MaKhoa, nhanVienParam.MaBoPhan, nhanVienParam.MaChucVu, nhanVienParam.TrangThai).
                ToListAsync();
              
                return PagedList<NhanVienProcedure>.ToPagedList(result, nhanVienParam.PageNumber, nhanVienParam.PageSize, nhanVienParam.GetAll);
            }
        }

        public async Task<List<string>> GetUserIdOfEmployeeCustom(ParamGetUserIdNhanVien nhanVienParam)
        {
            var result = await _context.UserIdNhanViens.
            FromSqlRaw("exec GetUserIDOfEmployee @maKhoa = {0}, @getLeader ={1}, @getEmployee = {2}, @getBLD = {3}",
            nhanVienParam.MaKhoa, nhanVienParam.GetLeader, nhanVienParam.GetEmployee, nhanVienParam.GetBld).
            ToListAsync();
            List<string> userId = new List<string>();
            foreach(var item in result)
            {
                if (item.MaID != null && item.MaID != "")
                userId.Add(item.MaID);
            }
            return userId;
        }

        public async Task<NhanVien?> CheckExistsEmailAsync(string email, bool tracking)
        {
            if (tracking)
            {
                return await _context.NhanViens.FirstOrDefaultAsync(iem => iem.EmailCaNhan.ToLower() == email.Trim().ToLower());
            }
            else
            {
                return await _context.NhanViens.AsNoTracking().
                    FirstOrDefaultAsync(iem => iem.EmailCaNhan.ToLower() == email.Trim().ToLower());
            }
        }
        public async Task<NhanVien?> FindNhanVienAsync(string maNhanVien)
        {
            return await _context.NhanViens.FindAsync(maNhanVien);
        }
        public async Task<NhanVien?> GetNhanVienByEmailAsync(string email, bool tracking)
        {
            if (tracking)
            {
                return await _context.NhanViens.FirstOrDefaultAsync(iem => iem.EmailCaNhan == email);
            }
            else
            {
                return await _context.NhanViens.AsNoTracking().
                    FirstOrDefaultAsync(iem => iem.EmailCaNhan == email);
            }
        }
        public void CreateNhanVienAsync(NhanVien NhanVien)
        {
            _context.NhanViens.Add(NhanVien);
        }
        public void UpdateNhanVienAsync(NhanVien NhanVien)
        {
            _context.NhanViens.Update(NhanVien);
        }
        public void DeleteNhanVienAsync(NhanVien NhanVien)
        {
            _context.NhanViens.Remove(NhanVien);
        }
    }
}
