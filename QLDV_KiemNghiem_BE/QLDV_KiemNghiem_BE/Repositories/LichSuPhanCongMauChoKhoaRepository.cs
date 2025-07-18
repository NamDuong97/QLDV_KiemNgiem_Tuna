using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class LichSuPhanCongMauChoKhoaRepository : ILichSuPhanCongMauChoKhoaRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LichSuPhanCongMauChoKhoaRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<LichSuPhanCongMauChoKhoa>> GetLichSuPhanCongMauChoKhoasAllAsync(LichSuPhanCongMauChoKhoaParam param)
        {
            var result = await _context.LichSuPhanCongMauChoKhoas.ToListAsync();
            return PagedList<LichSuPhanCongMauChoKhoa>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<LichSuPhanCongMauChoKhoa?> FindLichSuPhanCongMauChoKhoaAsync(string maLichSuPhanCongMauChoKhoa, bool track)
        {
            if (track)
            {
                return await _context.LichSuPhanCongMauChoKhoas.FirstOrDefaultAsync(it => it.MaId == maLichSuPhanCongMauChoKhoa);
            }
            else
            {
                return await _context.LichSuPhanCongMauChoKhoas.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maLichSuPhanCongMauChoKhoa);
            }
        }

        public async Task<LichSuPhanCongMauChoKhoa?> FindLichSuPhanCongMauChoKhoaByMaMauAndKhoaAsync(string maMau, string maKhoa, bool track)
        {
            if (track)
            {
                return await _context.LichSuPhanCongMauChoKhoas.FirstOrDefaultAsync(it => it.MaMau == maMau && it.MaKhoa == maKhoa);
            }
            else
            {
                return await _context.LichSuPhanCongMauChoKhoas.AsNoTracking().FirstOrDefaultAsync(it => it.MaMau == maMau && it.MaKhoa == maKhoa);
            }
        }
        public void CreateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa)
        {
            _context.LichSuPhanCongMauChoKhoas.Add(LichSuPhanCongMauChoKhoa);
        }
        public void UpdateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa)
        {
            _context.LichSuPhanCongMauChoKhoas.Update(LichSuPhanCongMauChoKhoa);
        }
        public void DeleteLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa)
        {
            _context.LichSuPhanCongMauChoKhoas.Remove(LichSuPhanCongMauChoKhoa);
        }
    }
}

