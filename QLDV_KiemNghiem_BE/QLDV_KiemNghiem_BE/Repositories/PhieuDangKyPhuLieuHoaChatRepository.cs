using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDangKyPhuLieuHoaChatRepository : IPhieuDangKyPhuLieuHoaChatRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;   
        public PhieuDangKyPhuLieuHoaChatRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;   
        }
        public async Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatAllAsync()
        {
            return await _context.PhieuDangKyPhuLieuHoaChats.ToListAsync(); 
        }

        public async Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(string maPhieuDangKy)
        {
            return await _context.PhieuDangKyPhuLieuHoaChats.Where(item => item.MaPhieuDangKy == maPhieuDangKy).ToListAsync();
        }
        public void CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _context.PhieuDangKyPhuLieuHoaChats.Add(phieuDangKyPhuLieuHoaChat);
        }
        public void UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _context.PhieuDangKyPhuLieuHoaChats.Update(phieuDangKyPhuLieuHoaChat);
        }
        public void DeletePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _context.PhieuDangKyPhuLieuHoaChats.Remove(phieuDangKyPhuLieuHoaChat);
        }

    }
}
