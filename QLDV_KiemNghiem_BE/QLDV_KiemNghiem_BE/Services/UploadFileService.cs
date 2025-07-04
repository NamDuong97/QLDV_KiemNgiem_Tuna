using QLDV_KiemNghiem_BE.Interfaces.UploadFile;

namespace QLDV_KiemNghiem_BE.Services
{
    public class UploadFileService : IUploadFileService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UploadFileService(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor) {
            _env = env;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<(string FileName, string Url)> UploadImageAsync(IFormFile image)
        {
            
            if (image == null || image.Length == 0)
                return (FileName: "0", Url: "0");

            var uploadsFolder = Path.Combine(_env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot"), "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            var imageUrl = $"{_httpContextAccessor.HttpContext?.Request?.Scheme}://{_httpContextAccessor.HttpContext?.Request?.Host}/uploads/{uniqueFileName}";

            return ( FileName : uniqueFileName, Url : imageUrl );
        }
    }
}
