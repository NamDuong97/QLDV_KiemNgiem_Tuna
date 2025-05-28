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
    public class MauController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<MauController> _logger;
        private readonly IMapper _mapper;
        public MauController(IServiceManager serviceManager, ILogger<MauController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getMauAll")]
        public async Task<ActionResult> getMauAll()
        {
            var result = await _service.Mau.GetMauAllAsync();
            _logger.LogDebug("get toan bo phieu dang ky");
            return Ok(result);
        }

        [HttpGet]
        [Route("getMau")]
        public async Task<ActionResult> getMau(string maMau)
        {
            var result = await _service.Mau.GetMauAsync(maMau);
            _logger.LogDebug("lay tieu chuan can tim: " + maMau);
            return Ok(result);
        }

        [HttpPost]
        [Route("createMau")]
        public async Task<ActionResult> createMau(MauDto mauDto)
        {
            if (ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            if(mauDto == null)
            {
                _logger.LogDebug("Thieu du lieu dau vao");
                return BadRequest("Thieu du lieu dau vao");
            }
            bool create = await _service.Mau.CreateMauAsync(mauDto);
            if (create)
            {
                _logger.LogDebug("Them mau thanh cong");
                return Ok(mauDto);
            }
            else
            {
                _logger.LogDebug("Them mau that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateMau")]
        public async Task<ActionResult> updateMau(MauDto MauDto)
        {
            if (ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            bool update = await _service.Mau.UpdateMauAsync(MauDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                return Ok(MauDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat mau that bai, hoac mau chua ton tai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteMau")]
        public async Task<ActionResult> deleteMau(Mau Mau)
        {
            var checkExists = await _service.Mau.GetMauAsync(Mau.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.Mau.DeleteMauAsync(Mau.MaId);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                    return Ok(Mau);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu dang ky that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("Phieu dang ky khong ton tai");
                return BadRequest();
            }
        }
    
    }
}
