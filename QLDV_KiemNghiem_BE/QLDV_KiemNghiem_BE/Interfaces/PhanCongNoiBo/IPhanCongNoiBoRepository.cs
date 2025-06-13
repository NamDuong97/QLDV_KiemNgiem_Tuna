
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhanCongNoiBoRepository
    {
        Task<IEnumerable<PhanCongNoiBo>> GetPhanCongNoiBosAllAsync();
        Task<PhanCongNoiBo?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo);
        void CreatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo);
        void UpdatePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo);
        void DeletePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo);
    }
}
