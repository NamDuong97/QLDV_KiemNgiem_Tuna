using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class TrangThaiPhieuDkRepository : ITrangThaiPhieuDkRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TrangThaiPhieuDkRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<TrangThaiPhieuDk>> GetTrangThaiPhieuDksAllAsync()
        {
            return await _context.TrangThaiPhieuDks.ToListAsync();
        }
        public async Task<TrangThaiPhieuDk?> FindTrangThaiPhieuDkAsync(string maTrangThaiPhieuDk)
        {
            return await _context.TrangThaiPhieuDks.FindAsync(maTrangThaiPhieuDk);
        }
        //public async Task<List<TrangThaiPhieuDk>?> FindTrangThaiPhieuDkByNamAsync(string tenTrangThaiPhieuDk)
        //{
        //    return await _context.TrangThaiPhieuDks.Where(item => item.TenTrangThaiPhieuDk.Split("-")[0].ToLower().Trim().Contains(tenTrangThaiPhieuDk)).ToListAsync();
        //}
        public void CreateTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk)
        {
            _context.TrangThaiPhieuDks.Add(TrangThaiPhieuDk);
        }
        public void UpdateTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk)
        {
            _context.TrangThaiPhieuDks.Update(TrangThaiPhieuDk);
        }
        public void DeleteTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk)
        {
            _context.TrangThaiPhieuDks.Remove(TrangThaiPhieuDk);
        }
    }
}
