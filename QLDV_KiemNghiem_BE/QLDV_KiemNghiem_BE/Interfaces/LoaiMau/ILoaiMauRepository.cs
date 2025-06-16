using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILoaiMauRepository
    {
        Task<IEnumerable<LoaiMau>> GetLoaiMausAllAsync();
        Task<LoaiMau?> FindLoaiMauAsync(string maLoaiMau);
        Task<LoaiMau?> FindLoaiMauByNameAsync(string tenLoaiMau);
        void CreateLoaiMauAsync(LoaiMau LoaiMau);
        void UpdateLoaiMauAsync(LoaiMau LoaiMau);
        void DeleteLoaiMauAsync(LoaiMau LoaiMau);
    }
}
