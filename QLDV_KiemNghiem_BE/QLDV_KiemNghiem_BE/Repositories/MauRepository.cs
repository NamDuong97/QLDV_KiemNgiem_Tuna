using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class MauRepository : IMauRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MauRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<Mau>> GetMauAllAsync()
        {
            return await _context.Maus.ToListAsync();
        }
        public async Task<Mau?> GetMauAsync(string maMau)
        {
            return await _context.Maus.Where(item => item.MaId == maMau).SingleOrDefaultAsync();
        }
        public void CreateMauAsync(Mau mau)
        {
            _context.Maus.Add(mau);
        }
        public void UpdateMauAsync(Mau mau)
        {
            _context.Maus.Update(mau);
        }

        public void DeleteMauAsync(Mau mau)
        {
            _context.Maus.Remove(mau);
        }

    }






























































































































}
