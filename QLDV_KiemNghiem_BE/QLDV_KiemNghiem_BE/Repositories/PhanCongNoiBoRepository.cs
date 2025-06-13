using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhanCongNoiBoRepository : IPhanCongNoiBoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhanCongNoiBoRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhanCongNoiBo>> GetPhanCongNoiBosAllAsync()
        {
            return await _context.PhanCongNoiBos.ToListAsync();
        }
        public async Task<PhanCongNoiBo?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo)
        {
            return await _context.PhanCongNoiBos.FindAsync(maPhanCongNoiBo);
        }

        public void CreatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo)
        {
            _context.PhanCongNoiBos.Add(PhanCongNoiBo);
        }
        public void UpdatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo)
        {
            _context.PhanCongNoiBos.Update(PhanCongNoiBo);
        }
        public void DeletePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo)
        {
            _context.PhanCongNoiBos.Remove(PhanCongNoiBo);
        }
    }
}
