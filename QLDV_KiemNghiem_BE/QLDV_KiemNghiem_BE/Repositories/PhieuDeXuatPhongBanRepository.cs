using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class PhieuDeXuatPhongBanRepository : IPhieuDeXuatPhongBanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhieuDeXuatPhongBanRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<PhieuDeXuatPhongBan>> GetPhieuDeXuatPhongBansAllAsync(PhieuDeXuatPhongBanParam param)
        {
            var result = await _context.PhieuDeXuatPhongBans.Include(it => it.ChiTietPhieuDeXuatPhongBans).ToListAsync();
            return PagedList<PhieuDeXuatPhongBan>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }
        public async Task<PhieuDeXuatPhongBan?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan, bool tracking)
        {
            if(tracking)
            {
                return await _context.PhieuDeXuatPhongBans.Include(it => it.ChiTietPhieuDeXuatPhongBans).FirstOrDefaultAsync(item => item.MaId == maPhieuDeXuatPhongBan);
            }
            else
            {
                return await _context.PhieuDeXuatPhongBans.Include(it => it.ChiTietPhieuDeXuatPhongBans).AsNoTracking().FirstOrDefaultAsync(item => item.MaId == maPhieuDeXuatPhongBan);
            }
        }
        public void CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            _context.PhieuDeXuatPhongBans.Add(PhieuDeXuatPhongBan);
        }
        public void UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            _context.PhieuDeXuatPhongBans.Update(PhieuDeXuatPhongBan);
        }
        public void DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            _context.PhieuDeXuatPhongBans.Remove(PhieuDeXuatPhongBan);
        }
    }
}
