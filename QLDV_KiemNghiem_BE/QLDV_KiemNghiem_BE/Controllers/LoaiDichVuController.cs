using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiDichVuController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<LoaiDichVuController> _logger;
        private readonly IMapper _mapper;
        public LoaiDichVuController(IServiceManager serviceManager, ILogger<LoaiDichVuController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getLoaiDichVuAll")]
        public async Task<ActionResult> getLoaiDichVuAll()
        {
            var result = await _service.LoaiDichVu.GetLoaiDichVusAllAsync();
            _logger.LogDebug("get toan bo loai dich vu");
            return Ok(result);
        }

        [HttpGet]
        [Route("getLoaiDichVu")]
        public async Task<ActionResult> getLoaiDichVu(string maLoaiDichVu)
        {
            var result = await _service.LoaiDichVu.FindLoaiDichVuAsync(maLoaiDichVu);
            _logger.LogDebug("lay loai dich vu can tim: " + maLoaiDichVu);
            return Ok(result);
        }

        [HttpPost]
        [Route("createLoaiDichVu")]
        public async Task<ActionResult> createLoaiDichVu(LoaiDichVuDto LoaiDichVuDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            bool create = await _service.LoaiDichVu.CreateLoaiDichVuAsync(LoaiDichVuDto);
            if (create)
            {
                _logger.LogDebug("Tao loai dich vu thanh cong");
                return Ok(LoaiDichVuDto);
            }
            else
            {
                _logger.LogDebug("Tao loai dich vu that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateLoaiDichVu")]
        public async Task<ActionResult> updateLoaiDichVu(LoaiDichVuDto LoaiDichVuDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            bool update = await _service.LoaiDichVu.UpdateLoaiDichVuAsync(LoaiDichVuDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat loai dich vu thanh cong");
                return Ok(LoaiDichVuDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat loai dich vu that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteLoaiDichVu")]
        public async Task<ActionResult> deleteLoaiDichVu(LoaiDichVu LoaiDichVu)
        {
            var checkExists = await _service.LoaiDichVu.FindLoaiDichVuAsync(LoaiDichVu.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.LoaiDichVu.DeleteLoaiDichVuAsync(LoaiDichVu);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat loai dich vu thanh cong");
                    return Ok(LoaiDichVu);
                }
                else
                {
                    _logger.LogDebug("Cap nhat loai dich vu that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("loai dich vu khong ton tai");
                return BadRequest();
            }
        }
    }
}
