using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Security.Claims;

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
        public async Task<ActionResult> createLoaiMau(LoaiMauRequestCreateDto LoaiMauDto)
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
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<LoaiMauDto> create = await _service.LoaiMau.CreateLoaiMauAsync(LoaiMauDto, user);
            if (create.KetQua)
            {
                _logger.LogDebug(create.Message);
                return Ok(create);
            }
            else
            {
                _logger.LogDebug(create.Message);
                return BadRequest(create);
            }
        }

        [HttpPut]
        [Route("updateLoaiMau")]
        public async Task<ActionResult> updateLoaiMau(LoaiMauRequestUpdateDto LoaiMauDto)
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
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<LoaiMauDto> update = await _service.LoaiMau.UpdateLoaiMauAsync(LoaiMauDto, user);
            if (update.KetQua)
            {
                _logger.LogDebug(update.Message);
                return Ok(update);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update);
            }
        }

        [HttpDelete]
        [Route("deleteLoaiMau")]
        public async Task<ActionResult> deleteLoaiMau(string maLoaiMau)
        {
            bool delete = await _service.LoaiMau.DeleteLoaiMauAsync(maLoaiMau);
            if (delete)
            {
                _logger.LogDebug("Xoa loai mau thanh cong");
                return Ok("Xoa loai mau thanh cong");
            }
            else
            {
                _logger.LogDebug("Xoa loai mau that bai");
                return BadRequest("Xoa loai mau that bai");
            }
        }
    }
}

