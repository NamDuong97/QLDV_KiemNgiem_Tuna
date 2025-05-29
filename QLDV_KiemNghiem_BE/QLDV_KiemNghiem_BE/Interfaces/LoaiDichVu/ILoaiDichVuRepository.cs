using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILoaiDichVuRepository
    {
        Task<IEnumerable<LoaiDichVu>> GetLoaiDichVusAllAsync();
        Task<LoaiDichVu?> FindLoaiDichVuAsync(string maLoaiDichVu);
        void CreateLoaiDichVuAsync(LoaiDichVu LoaiDichVu);
        void UpdateLoaiDichVuAsync(LoaiDichVu LoaiDichVu);
        void DeleteLoaiDichVuAsync(LoaiDichVu LoaiDichVu);
    }
}
