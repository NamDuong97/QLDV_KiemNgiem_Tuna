using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Interfaces.UploadFile;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class UploadFileService : IUploadFileService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IRepositoryManager _repositoryManager;
        private IMapper _mapper;

        public UploadFileService(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor, IRepositoryManager repository, IMapper mapper) {
            _env = env;
            _httpContextAccessor = httpContextAccessor;
            _repositoryManager = repository;
            _mapper = mapper;
        }

        public async Task<bool> UploadImageAsync(List<PhieuDangKyMauHinhAnhDto> images, HttpRequest request)
        {
            foreach(var item in images)
            {
                if(item.Image == null) continue;
                var image = await PublicFunction.ProcessUpload(item?.Image, _env, request);
                if(image.FileName == "0" || image.Url == "0") continue;
                var mau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(item.MaMau);
                if(mau == null) continue;

                PhieuDangKyMauHinhAnh phieuDangKyMauHinhAnh = new PhieuDangKyMauHinhAnh()
                {
                    MaId = Guid.NewGuid().ToString(),
                    MaMau = item.MaMau,
                    DinhDang = image.FileName.Split('.')[1],
                    Ten = image.FileName.Split('.')[0],
                    PathImg = image.Url,
                    GhiChu = item.GhiChu,
                    TrangThai = true
                };
                await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(phieuDangKyMauHinhAnh);
            }

            bool check = await _repositoryManager.SaveChangesAsync();
            if (check)
            {
                return true;
            }
            return false;   
        }
    }
}
