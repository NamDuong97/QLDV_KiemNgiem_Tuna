using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhanCongNoiBoService
    {
        Task<(IEnumerable<PhanCongNoiBoDto> datas, Pagination pagi)> GetPhanCongNoiBosAllAsync(PhanCongNoiBoParam param);
        Task<PhanCongNoiBoDto?> FindPhanCongNoiBoAsync(string maPhanCongNoiBo);
        Task<ResponseModel1<PhanCongNoiBoDto>> CreatePhanCongNoiBoAsync(PhanCongNoiBoRequestCreateDto PhanCongNoiBoDto, string user, string userId);
        Task<ResponseModel1<PhanCongNoiBoDto>> UpdatePhanCongNoiBoAsync(PhanCongNoiBoRequestUpdateDto PhanCongNoiBoDto, string user, string userId);
        Task<ResponseModel1<PhanCongNoiBoDto>> ReassignPhanCongNoiBo(ReassignPhanCongNoiBoRequestUpdateDto PhanCongNoiBoDto, string user, string userId);
        Task<ResponseModel1<PhanCongNoiBoDto>> DeletePhanCongNoiBoAsync(string maPhanCongNoiBo, string user, string userId);
    }
}
