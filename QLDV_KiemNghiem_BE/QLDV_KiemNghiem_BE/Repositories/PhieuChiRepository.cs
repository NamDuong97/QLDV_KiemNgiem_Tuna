using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuChiRepository : IPhieuChiRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuChiRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuChi>> GetPhieuChisAllAsync()
        {
            return await _context.PhieuChis.ToListAsync();
        }
        public async Task<PhieuChi?> FindPhieuChiAsync(string maPhieuChi)
        {
            return await _context.PhieuChis.FindAsync(maPhieuChi);
        }

        public void CreatePhieuChiAsync(PhieuChi PhieuChi)
        {
            _context.PhieuChis.Add(PhieuChi);
        }
        public void UpdatePhieuChiAsync(PhieuChi PhieuChi)
        {
            _context.PhieuChis.Update(PhieuChi);
        }
        public void DeletePhieuChiAsync(PhieuChi PhieuChi)
        {
            _context.PhieuChis.Remove(PhieuChi);
        }
    }
}
