using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class LichSuPhanCongRepository : ILichSuPhanCongRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LichSuPhanCongRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<LichSuPhanCong>> GetLichSuPhanCongsAllAsync(LichSuPhanCongParam param)
        {
            var result = await _context.LichSuPhanCongs.ToListAsync();   
            return PagedList<LichSuPhanCong>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }  
        public async Task<LichSuPhanCong?> FindLichSuPhanCongAsync(string maLichSuPhanCong)
        {
            return await _context.LichSuPhanCongs.FirstOrDefaultAsync(it => it.MaId == maLichSuPhanCong);
        }
        public async Task<LichSuPhanCong?> FindLichSuPhanCongByPCHienTaiAsync(string maPhanCong, string manvXuLy, bool track)
        {
            if(track)
            {
                return await _context.LichSuPhanCongs.Where(it => it.MaPhanCongNoiBo == maPhanCong && it.ManvMoi == manvXuLy).FirstOrDefaultAsync();

            }
            else
            {
                return await _context.LichSuPhanCongs.AsNoTracking().Where(it => it.MaPhanCongNoiBo == maPhanCong && it.ManvMoi == manvXuLy).FirstOrDefaultAsync();
            }
        }
        public async Task<List<LichSuPhanCong>?> FindLichSuPhanCongByPCNBAsync(string maPhanCong, bool track)
        {
            if (track)
            {
                return await _context.LichSuPhanCongs.Where(it => it.MaPhanCongNoiBo == maPhanCong).ToListAsync();

            }
            else
            {
                return await _context.LichSuPhanCongs.AsNoTracking().Where(it => it.MaPhanCongNoiBo == maPhanCong).ToListAsync();
            }
        }
        public void CreateLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong)
        {
            _context.LichSuPhanCongs.Add(LichSuPhanCong);
        }
        public void UpdateLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong)
        {
            _context.LichSuPhanCongs.Update(LichSuPhanCong);
        }
        public void DeleteLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong)
        {
            _context.LichSuPhanCongs.Remove(LichSuPhanCong);
        }
    }
}
