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
    public class LoaiMauController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<LoaiMauController> _logger;
        private readonly IMapper _mapper;
        public LoaiMauController(IServiceManager serviceManager, ILogger<LoaiMauController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getLoaiMauAll")]
        public async Task<ActionResult> getLoaiMauAll()
        {
            var result = await _service.LoaiMau.GetLoaiMausAllAsync();
            _logger.LogDebug("get toan bo loai mau");
            return Ok(result);
        }

        [HttpGet]
        [Route("getLoaiMau")]
        public async Task<ActionResult> getLoaiMau(string maLoaiMau)
        {
            var result = await _service.LoaiMau.FindLoaiMauAsync(maLoaiMau);
            _logger.LogDebug("lay loai mau can tim: " + maLoaiMau);
            return Ok(result);
        }

        [HttpPost]
        [Route("createLoaiMau")]
        public async Task<ActionResult> createLoaiMau(LoaiMauDto LoaiMauDto)
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
            bool create = await _service.LoaiMau.CreateLoaiMauAsync(LoaiMauDto);
            if (create)
            {
                _logger.LogDebug("Tao loai mau thanh cong");
                return Ok(LoaiMauDto);
            }
            else
            {
                _logger.LogDebug("Tao loai mau that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateLoaiMau")]
        public async Task<ActionResult> updateLoaiMau(LoaiMauDto LoaiMauDto)
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
            bool update = await _service.LoaiMau.UpdateLoaiMauAsync(LoaiMauDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat loai mau thanh cong");
                return Ok(LoaiMauDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat loai mau that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteLoaiMau")]
        public async Task<ActionResult> deleteLoaiMau(LoaiMau LoaiMau)
        {
            var checkExists = await _service.LoaiMau.FindLoaiMauAsync(LoaiMau.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.LoaiMau.DeleteLoaiMauAsync(LoaiMau);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat loai mau thanh cong");
                    return Ok(LoaiMau);
                }
                else
                {
                    _logger.LogDebug("Cap nhat loai mau that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("loai mau khong ton tai");
                return BadRequest();
            }
        }
    }
}

