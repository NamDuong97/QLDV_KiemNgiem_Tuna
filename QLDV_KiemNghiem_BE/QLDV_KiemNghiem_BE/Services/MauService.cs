using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class MauService : IMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        public MauService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }
        public async Task<IEnumerable<Mau>> GetMauAllAsync()
        {
            return await _repositoryManager.Mau.GetMauAllAsync();
        }
        public async Task<Mau?> GetMauAsync(string maMau)
        {
            return await _repositoryManager.Mau.GetMauAsync(maMau);
        }
        public async Task<bool> CreateMauAsync(Mau mau)
        {
            _repositoryManager.Mau.CreateMauAsync(mau);
            bool check =  await _repositoryManager.SaveChangesAsync();    
            return check;
        }
        public async Task<bool> UpdateMauAsync(Mau mau)
        {
            var mauDomain = await _repositoryManager.Mau.GetMauAsync(mau.MaId);
            if (mauDomain == null)
            {
                return false;
            }
            _repositoryManager.Mau.UpdateMauAsync(mau);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteMauAsync(Mau mau)
        {
            var mauDomain = await _repositoryManager.Mau.GetMauAsync(mau.MaId);
            if (mauDomain == null)
            {
                return false;
            }
            _repositoryManager.Mau.DeleteMauAsync(mau);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
