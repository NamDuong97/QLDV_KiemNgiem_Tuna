using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using System.Diagnostics.Eventing.Reader;

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
        public async Task<PagedList<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatAllAsync(PhieuDangKyPhuLieuHoaChatParam param)
        {
            var result = await _context.PhieuDangKyPhuLieuHoaChats.ToListAsync();
            return PagedList<PhieuDangKyPhuLieuHoaChat>.ToPagedList(result, param.PageNumber, param.PageSize, param.GetAll);
        }

        public async Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(string maPhieuDangKy)
        {
            return await _context.PhieuDangKyPhuLieuHoaChats.Where(item => item.MaPhieuDangKy == maPhieuDangKy).ToListAsync();
        }
        public async Task<PhieuDangKyPhuLieuHoaChat?> GetPhieuDangKyPhuLieuHoaChatAsync(string maPDKPLHC, bool tracking)
        {
            if(tracking)
            {
                return await _context.PhieuDangKyPhuLieuHoaChats.FirstOrDefaultAsync(it => it.MaId == maPDKPLHC);
            }
            else
            {
                return await _context.PhieuDangKyPhuLieuHoaChats.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maPDKPLHC);
            }
        }
        public async Task<PhieuDangKyPhuLieuHoaChat?> FindPhieuDangKyPhuLieuHoaChatAsync(string maPDKPLHC, bool tracking)
        {
            if (tracking)
            {
                return await _context.PhieuDangKyPhuLieuHoaChats.FirstOrDefaultAsync(it => it.MaId == maPDKPLHC);
            }
            else
            {
                return await _context.PhieuDangKyPhuLieuHoaChats.AsNoTracking().FirstOrDefaultAsync(it => it.MaId == maPDKPLHC);
            }
        }
        public async Task CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            await _context.PhieuDangKyPhuLieuHoaChats.AddAsync(phieuDangKyPhuLieuHoaChat);
        }
        public void UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _context.PhieuDangKyPhuLieuHoaChats.Update(phieuDangKyPhuLieuHoaChat);
        }
        public void DeletePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _context.PhieuDangKyPhuLieuHoaChats.Remove(phieuDangKyPhuLieuHoaChat);
        }
        public async Task<PhieuDangKyPhuLieuHoaChat?> CheckExistPhieuDangKyPhuLieuHoaChatAsync(string phieuDangKyPlhc, string phieuDangKy, bool tracking)
        {
            var result = new PhieuDangKyPhuLieuHoaChat();
            if(tracking)
            {
                // k theo dõi đối tượng result vì đối tượng này k phải đối tượng chính
                result = await _context.PhieuDangKyPhuLieuHoaChats.
                    Where(item => item.MaPhieuDangKy == phieuDangKy && item.MaId == phieuDangKyPlhc).SingleOrDefaultAsync();
            }
            else
            {
                result = await _context.PhieuDangKyPhuLieuHoaChats.AsNoTracking().
                    Where(item => item.MaPhieuDangKy == phieuDangKy && item.MaId == phieuDangKyPlhc).SingleOrDefaultAsync();
            }
            return result;
        }
    }
}
