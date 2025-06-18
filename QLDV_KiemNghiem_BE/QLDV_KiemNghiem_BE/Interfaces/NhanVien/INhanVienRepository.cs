using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface INhanVienRepository
    {
        Task<PagedList<NhanVienProcedure>> GetNhanViensAllAsync(NhanVienParam nhanVienParam, bool tracking);
        Task<NhanVien?> FindNhanVienAsync(string maNhanVien);
        Task<NhanVien?> GetNhanVienByEmailAsync(string email, bool tracking);
        Task<NhanVien?> CheckExistsEmailAsync(string email, bool tracking);
        Task<List<string>> GetUserIdOfEmployeeCustom(ParamGetUserIdNhanVien nhanVienParam);
        void CreateNhanVienAsync(NhanVien NhanVien);
        void UpdateNhanVienAsync(NhanVien NhanVien);
        void DeleteNhanVienAsync(NhanVien NhanVien);
    }
}
