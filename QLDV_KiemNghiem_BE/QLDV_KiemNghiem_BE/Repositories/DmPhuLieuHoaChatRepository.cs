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
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;   
        public DmPhuLieuHoaChatRepository(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DmPhuLieuHoaChat>> GetDmPhuLieuHoaChatAllAsync()
        {
           return await _dataContext.DmPhuLieuHoaChats.ToListAsync();
        }
        public void CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _dataContext.DmPhuLieuHoaChats.Add(plhc);
        }
        public void UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _dataContext.DmPhuLieuHoaChats.Update(plhc);
        }
        public void DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _dataContext.DmPhuLieuHoaChats.Remove(plhc);
        }
    }
}
