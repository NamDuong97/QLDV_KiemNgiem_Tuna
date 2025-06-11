using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.PublicFunc;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface INhanVienService
    {
        Task<(IEnumerable<NhanVienDto> employees, Pagination pagi)> GetNhanViensAllAsync(NhanVienParam nhanVienParam, bool tracking);
        Task<NhanVienDto?> FindNhanVienAsync(string maNhanVien);
        Task<ResponseModel1<NhanVienDto>> CreateNhanVienAsync(NhanVienDto NhanVienDto);
        Task<ResponseModel1<NhanVienDto>> UpdateNhanVienAsync(NhanVienDto NhanVienDto);
        Task<bool> DeleteNhanVienAsync(NhanVien NhanVien);
    }
}
