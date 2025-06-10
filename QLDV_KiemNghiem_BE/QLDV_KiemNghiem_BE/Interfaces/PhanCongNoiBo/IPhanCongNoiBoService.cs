using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhanCongNoiBoService
    {
        Task<IEnumerable<PhanCongNoiBoDto>> GetPhanCongNoiBosAllAsync();
        Task<PhanCongNoiBoDto?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo);
        Task<ResponseModel1<PhanCongNoiBoDto>> CreatePhanCongNoiBoAsync(PhanCongNoiBoDto PhanCongNoiBoDto);
        Task<ResponseModel1<PhanCongNoiBoDto>> UpdatePhanCongNoiBoAsync(PhanCongNoiBoDto PhanCongNoiBoDto);
        Task<bool> DeletePhanCongNoiBoAsync(PhanCongNoiBo PhanCongNoiBo);
    }
}
