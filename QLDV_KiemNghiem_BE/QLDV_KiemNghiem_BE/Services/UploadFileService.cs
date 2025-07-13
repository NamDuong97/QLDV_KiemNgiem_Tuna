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
                if (string.IsNullOrEmpty(item!.MaId))
                {
                    if (item.Image == null) continue;
                    var image = await PublicFunction.ProcessUpload(item!.Image, _env, request);
                    if (image.FileName == "0" || image.Url == "0") continue;
                    var mau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(item?.MaMau ?? "", false);
                    if (mau == null) continue;

                    PhieuDangKyMauHinhAnh phieuDangKyMauHinhAnh = new PhieuDangKyMauHinhAnh()
                    {
                        MaId = Guid.NewGuid().ToString(),
                        MaMau = item!.MaMau,
                        DinhDang = Path.GetExtension(image.FileName).TrimStart('.'),
                        Ten = Path.GetFileNameWithoutExtension(image.FileName),
                        PathImg = image.Url,
                        GhiChu = item.GhiChu,
                        TrangThai = true
                    };
                    await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(phieuDangKyMauHinhAnh);
                }
                else
                {
                    // Neu anh ton tai thi ms xoa cap nhat
                    var checkExistsHinhAnh = await _repositoryManager.PhieuDangKyMauHinhAnh.FindPhieuDangKyMauHinhAnhAsync(item.MaId);
                    if(checkExistsHinhAnh!= null)
                    {
                        if (item.IsDel)
                        {
                            _repositoryManager.PhieuDangKyMauHinhAnh.DeletePhieuDangKyMauHinhAnh(checkExistsHinhAnh);
                        }
                        else
                        {
                            checkExistsHinhAnh.GhiChu= string.IsNullOrEmpty(item.GhiChu) ? checkExistsHinhAnh.GhiChu : item.GhiChu;
                        }
                    }
                }  
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
