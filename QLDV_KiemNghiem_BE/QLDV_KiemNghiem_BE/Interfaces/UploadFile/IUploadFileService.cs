namespace QLDV_KiemNghiem_BE.Interfaces.UploadFile
{
    public interface IUploadFileService
    {
       Task <(string FileName, string Url)> UploadImageAsync(IFormFile image);
    }
}
