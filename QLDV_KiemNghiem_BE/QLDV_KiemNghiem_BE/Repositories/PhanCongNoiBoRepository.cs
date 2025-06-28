using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhanCongNoiBoRepository : IPhanCongNoiBoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhanCongNoiBoRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<PhanCongNoiBo>> GetPhanCongNoiBosAllAsync(PhanCongNoiBoParam param)
        {
            var result = await _context.PhanCongNoiBos.
                FromSqlRaw("exec sp_getAllPhanCongNoiBoByBoLoc @manvPhanCong={0}, @manvXyLy = {1}, @status = {2}," +
                "@ngayTraKetQuaFrom = {3}",
                param.ManvPhanCong ?? "", param.ManvXuLy ?? "", param.TrangThai ?? "", param.NgayTraKetQuaFrom ?? "").ToListAsync();

            foreach (var item in result)
            {
               await _context.Entry(item).Collection(p => p.LichSuPhanCongs).Query().LoadAsync();
            }

            return PagedList<PhanCongNoiBo>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<PhanCongNoiBo?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo)
        {
            return await _context.PhanCongNoiBos.Include(it => it.LichSuPhanCongs).FirstOrDefaultAsync(it => it.MaId == maPhanCongNoiBo);
        }
        public void CreatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo)
        {
            _context.PhanCongNoiBos.Add(PhanCongNoiBo);
        }
        public void UpdatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo)
        {
            _context.PhanCongNoiBos.Update(PhanCongNoiBo);
        }
        public void DeletePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo)
        {
            _context.PhanCongNoiBos.Remove(PhanCongNoiBo);
        }
    }
}
