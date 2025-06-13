using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuThuRepository : IPhieuThuRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuThuRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuThu>> GetPhieuThusAllAsync()
        {
            return await _context.PhieuThus.ToListAsync();
        }
        public async Task<PhieuThu?> FindPhieuThuAsync(string maPhieuThu)
        {
            return await _context.PhieuThus.FindAsync(maPhieuThu);
        }

        public void CreatePhieuThuAsync(PhieuThu PhieuThu)
        {
            _context.PhieuThus.Add(PhieuThu);
        }
        public void UpdatePhieuThuAsync(PhieuThu PhieuThu)
        {
            _context.PhieuThus.Update(PhieuThu);
        }
        public void DeletePhieuThuAsync(PhieuThu PhieuThu)
        {
            _context.PhieuThus.Remove(PhieuThu);
        }
    }
}
