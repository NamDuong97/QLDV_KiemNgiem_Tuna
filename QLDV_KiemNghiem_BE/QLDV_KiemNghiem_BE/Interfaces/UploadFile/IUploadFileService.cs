using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.Interfaces.UploadFile
{
    public interface IUploadFileService
    {
        Task<bool> UploadImageAsync(List<PhieuDangKyMauHinhAnhDto> images, HttpRequest request);
    }
}
