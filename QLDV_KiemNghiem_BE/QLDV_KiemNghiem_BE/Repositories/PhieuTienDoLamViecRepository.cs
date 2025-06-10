using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuTienDoLamViecRepository : IPhieuTienDoLamViecRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuTienDoLamViecRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuTienDoLamViec>> GetPhieuTienDoLamViecsAllAsync()
        {
            return await _context.PhieuTienDoLamViecs.ToListAsync();
        }
        public async Task<PhieuTienDoLamViec?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec)
        {
            return await _context.PhieuTienDoLamViecs.FindAsync(maPhieuTienDoLamViec);
        }

        public void CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            _context.PhieuTienDoLamViecs.Add(PhieuTienDoLamViec);
        }
        public void UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            _context.PhieuTienDoLamViecs.Update(PhieuTienDoLamViec);
        }
        public void DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            _context.PhieuTienDoLamViecs.Remove(PhieuTienDoLamViec);
        }
    }
}
