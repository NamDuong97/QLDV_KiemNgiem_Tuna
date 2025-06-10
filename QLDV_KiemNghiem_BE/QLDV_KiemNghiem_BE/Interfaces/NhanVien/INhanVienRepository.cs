using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface INhanVienRepository
    {
        Task<IEnumerable<NhanVien>> GetNhanViensAllAsync();
        Task<NhanVien?> FindNhanVienAsync(string maNhanVien);
        Task<NhanVien?> GetNhanVienByTokenAsync(string token);
        Task<NhanVien?> GetNhanVienByEmailAsync(string email, bool tracking);
        void CreateNhanVienAsync(NhanVien NhanVien);
        void UpdateNhanVienAsync(NhanVien NhanVien);
        void DeleteNhanVienAsync(NhanVien NhanVien);
    }
}
