using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface INhanVienService
    {
        Task<IEnumerable<NhanVienDto>> GetNhanViensAllAsync();
        Task<NhanVienDto?> FindNhanVienAsync(string maNhanVien);
        Task<ResponseModel1<NhanVienDto>> CreateNhanVienAsync(NhanVienDto NhanVienDto);
        Task<ResponseModel1<NhanVienDto>> UpdateNhanVienAsync(NhanVienDto NhanVienDto);
        Task<bool> DeleteNhanVienAsync(NhanVien NhanVien);
    }
}
