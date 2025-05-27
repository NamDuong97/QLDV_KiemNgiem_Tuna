using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhoaRepository
    {
        Task<IEnumerable<Khoa>> GetKhoasAllAsync();
        Task<Khoa?> FindKhoaAsync(string maKhoa);
        void CreateKhoaAsync(Khoa Khoa);
        void UpdateKhoaAsync(Khoa Khoa);
        void DeleteKhoaAsync(Khoa Khoa);
    }
}
