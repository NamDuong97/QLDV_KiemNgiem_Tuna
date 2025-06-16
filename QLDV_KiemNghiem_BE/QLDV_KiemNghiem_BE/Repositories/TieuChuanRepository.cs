using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class TieuChuanRepository : ITieuChuanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TieuChuanRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<TieuChuan>> GetTieuChuansAllAsync()
        {
            return await _context.TieuChuans.ToListAsync();
        }
        public async Task<TieuChuan?> FindTieuChuanAsync(string maTieuChuan)
        {
            return await _context.TieuChuans.FindAsync(maTieuChuan);
        }

        public async Task<TieuChuan?> FindTieuChuanByNameAsync(string tenTieuChuan)
        {
            return await _context.TieuChuans.AsNoTracking()
            .SingleOrDefaultAsync(item => item.TenTieuChuan.ToLower().Trim() == tenTieuChuan);
        }

        public void CreateTieuChuanAsync(TieuChuan tieuChuan)
        {
            _context.TieuChuans.Add(tieuChuan);
        }
        public void UpdateTieuChuanAsync(TieuChuan tieuChuan)
        {
            _context.TieuChuans.Update(tieuChuan);
        }
        public void DeleteTieuChuanAsync(TieuChuan tieuChuan)
        {
            _context.TieuChuans.Remove(tieuChuan);
        }
    }
}
