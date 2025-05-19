using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using System.Linq;


namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDangKyRepository : IPhieuDangKyRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDangKyRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync()
        {
            return await _context.PhieuDangKies.ToListAsync();
        }
        public async Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAsync(string maKH)
        {
            return await _context.PhieuDangKies.ToListAsync();
        }
        public void CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            _context.PhieuDangKies.Add(phieuDangKy);
        }
    }
}
