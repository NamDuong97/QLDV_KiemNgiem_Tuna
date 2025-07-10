using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IServiceManager _service;
        public UploadController(IWebHostEnvironment env, IServiceManager service)
        {
            _env = env;
            _service = service;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("upload-image")]
        public async Task<ActionResult> UploadImageAsync([FromForm] List<PhieuDangKyMauHinhAnhDto> images)
        {
            if (images.Count() <= 0)
            {
                return BadRequest("Thieu tham so dau vao");
            }
            var mau = await _service.UploadFile.UploadImageAsync(images, Request);
            return Ok();
        }
    }
}
