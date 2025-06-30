
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaRepository
    {
        Task<PagedList<PhieuPhanTichKetQuaProcedure>> GetPhieuPhanTichKetQuaAllAsync(PhieuPhanTichKetQuaParam param);
        Task<PhieuPhanTichKetQuaProcedure?> FindPhieuPhanTichKetQuaShowAsync(string maPhieuPhanTichKetQua);
        Task<PhieuPhanTichKetQua?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua, bool track);
        Task<int> ProcessReviewSuccessPhieuPhanTichKetQuaByBLD(string maMau, string user, string userId);
        void CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua);
        void UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua);
        void DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua);
    }
}
