using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuPhanTichKetQuaChiTietRepository : IPhieuPhanTichKetQuaChiTietRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaChiTietRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuPhanTichKetQuaChiTiet>> GetPhieuPhanTichKetQuaChiTietsAllAsync()
        {
            return await _context.PhieuPhanTichKetQuaChiTiets.ToListAsync();
        }
        public async Task<PhieuPhanTichKetQuaChiTiet?> FindPhieuPhanTichKetQuaChiTietAsync(string maPhieuPhanTichKetQuaChiTiet)
        {
            return await _context.PhieuPhanTichKetQuaChiTiets.FindAsync(maPhieuPhanTichKetQuaChiTiet);
        }
        public async Task<List<PhieuPhanTichKetQuaChiTiet>?> FindPhieuPhanTichKetQuaChiTietByMaPPTKQAsync(string maPPTKQ, bool track)
        {
            if (track)
            {
                return await _context.PhieuPhanTichKetQuaChiTiets.Where(it => it.MaPhieuKetQua == maPPTKQ).ToListAsync();
            }
            else
            {
                return await _context.PhieuPhanTichKetQuaChiTiets.AsNoTracking().Where(it => it.MaPhieuKetQua == maPPTKQ).ToListAsync();
            }
        }
        public void CreatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet)
        {
            _context.PhieuPhanTichKetQuaChiTiets.Add(PhieuPhanTichKetQuaChiTiet);
        }
        public void UpdatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet)
        {
            _context.PhieuPhanTichKetQuaChiTiets.Update(PhieuPhanTichKetQuaChiTiet);
        }
        public void DeletePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet)
        {
            _context.PhieuPhanTichKetQuaChiTiets.Remove(PhieuPhanTichKetQuaChiTiet);
        }
    }
}
