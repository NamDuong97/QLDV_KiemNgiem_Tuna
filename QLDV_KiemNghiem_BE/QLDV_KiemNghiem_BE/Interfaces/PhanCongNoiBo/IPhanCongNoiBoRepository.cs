
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhanCongNoiBoRepository
    {
        Task<PagedList<PhanCongNoiBo>> GetPhanCongNoiBosAllAsync(PhanCongNoiBoParam param);
        Task<PhanCongNoiBo?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo);
        void CreatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo);
        void UpdatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo);
        void DeletePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo);
    }
}
