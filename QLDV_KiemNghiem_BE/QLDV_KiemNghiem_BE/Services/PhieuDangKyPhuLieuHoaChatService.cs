using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyPhuLieuHoaChatService : IPhieuDangKyPhuLieuHoaChatService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public PhieuDangKyPhuLieuHoaChatService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatAllAsync()
        {
           return await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatAllAsync();
        }
        public async Task<bool> CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChat);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<bool> UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _repositoryManager.PhieuDangKyPhuLieuHoaChat.UpdatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChat);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeletePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChat)
        {
            _repositoryManager.PhieuDangKyPhuLieuHoaChat.DeletePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChat);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
