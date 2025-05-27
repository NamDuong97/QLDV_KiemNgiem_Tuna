using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class MauHinhAnhRepository : IMauHinhAnhRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MauHinhAnhRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<MauHinhAnh>> GetMauHinhAnhsAllAsync()
        {
            return await _context.MauHinhAnhs.ToListAsync();
        }
        public async Task<MauHinhAnh?> FindMauHinhAnhAsync(string maMauHinhAnh)
        {
            return await _context.MauHinhAnhs.FindAsync(maMauHinhAnh);
        }
        public void CreateMauHinhAnhAsync(MauHinhAnh MauHinhAnh)
        {
            _context.MauHinhAnhs.Add(MauHinhAnh);
        }
        public void UpdateMauHinhAnhAsync(MauHinhAnh MauHinhAnh)
        {
            _context.MauHinhAnhs.Update(MauHinhAnh);
        }
        public void DeleteMauHinhAnhAsync(MauHinhAnh MauHinhAnh)
        {
            _context.MauHinhAnhs.Remove(MauHinhAnh);
        }
    }
}
