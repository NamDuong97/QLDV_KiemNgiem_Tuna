using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuPhanTichKetQuaRepository : IPhieuPhanTichKetQuaRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuPhanTichKetQua>> GetPhieuPhanTichKetQuasAllAsync()
        {
            return await _context.PhieuPhanTichKetQuas.ToListAsync();
        }
        public async Task<PhieuPhanTichKetQua?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua)
        {
            return await _context.PhieuPhanTichKetQuas.FindAsync(maPhieuPhanTichKetQua);
        }

        public void CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            _context.PhieuPhanTichKetQuas.Add(PhieuPhanTichKetQua);
        }
        public void UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            _context.PhieuPhanTichKetQuas.Update(PhieuPhanTichKetQua);
        }
        public void DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            _context.PhieuPhanTichKetQuas.Remove(PhieuPhanTichKetQua);
        }
    }
}
