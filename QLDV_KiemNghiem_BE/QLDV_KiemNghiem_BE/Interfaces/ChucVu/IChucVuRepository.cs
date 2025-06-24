using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChucVuRepository
    {
        Task<IEnumerable<ChucVu>> GetChucVusAllAsync();
        Task<ChucVu?> FindChucVuAsync(string maChucVu);
        Task<ChucVu?> FindChucVuByNameAsync(string tenChucVu);
        void CreateChucVuAsync(ChucVu ChucVu);
        void UpdateChucVuAsync(ChucVu ChucVu);
        void DeleteChucVuAsync(ChucVu ChucVu);
    }
}
