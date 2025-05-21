using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class DmPhuLieuHoaChatService : IDmPhuLieuHoaChatService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
       
        public DmPhuLieuHoaChatService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DmPhuLieuHoaChat>> GetDmPhuLieuHoaChatAllAsync()
        {
            return await _repositoryManager.DmPhuLieuHoaChat.GetDmPhuLieuHoaChatAllAsync();
        }
        public async Task<bool> CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _repositoryManager.DmPhuLieuHoaChat.CreateDmPhuLieuHoaChatAsync(plhc);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<bool> UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _repositoryManager.DmPhuLieuHoaChat.UpdateDmPhuLieuHoaChatAsync(plhc);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            _repositoryManager.DmPhuLieuHoaChat.DeleteDmPhuLieuHoaChatAsync(plhc);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
