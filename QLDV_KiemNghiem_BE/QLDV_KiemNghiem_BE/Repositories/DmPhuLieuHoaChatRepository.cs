using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Repositories
{
    public class DmPhuLieuHoaChatRepository : IDmPhuLieuHoaChatRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;   
        public DmPhuLieuHoaChatRepository(DataContext dataContext, IMapper mapper)
        {
            _context = dataContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DmPhuLieuHoaChat>> GetDmPhuLieuHoaChatAllAsync()
        {
           return await _context.DmPhuLieuHoaChats.ToListAsync();
        }
        public async Task<DmPhuLieuHoaChat?> FindDmPhuLieuHoaChatAsync(string id)
        {
            return await _context.DmPhuLieuHoaChats.FindAsync(id);
        }

        public void CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _context.DmPhuLieuHoaChats.Add(plhc);
        }
        public void UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _context.DmPhuLieuHoaChats.Update(plhc);
        }
        public void DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _context.DmPhuLieuHoaChats.Remove(plhc);
        }
    }
}
