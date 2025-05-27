using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class KhoaRepository : IKhoaRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public KhoaRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Khoa>> GetKhoasAllAsync()
        {
            return await _context.Khoas.ToListAsync();
        }
        public async Task<Khoa?> FindKhoaAsync(string maKhoa)
        {
            return await _context.Khoas.FindAsync(maKhoa);
        }
        public void CreateKhoaAsync(Khoa Khoa)
        {
            _context.Khoas.Add(Khoa);
        }
        public void UpdateKhoaAsync(Khoa Khoa)
        {
            _context.Khoas.Update(Khoa);
        }
        public void DeleteKhoaAsync(Khoa Khoa)
        {
            _context.Khoas.Remove(Khoa);
        }
    }
}
