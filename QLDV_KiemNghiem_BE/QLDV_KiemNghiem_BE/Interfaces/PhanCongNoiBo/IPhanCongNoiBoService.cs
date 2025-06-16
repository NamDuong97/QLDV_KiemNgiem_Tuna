using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

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
