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
    public class PhieuDangKyMauController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDangKyMauController> _logger;
        private readonly IMapper _mapper;
        public PhieuDangKyMauController(IServiceManager serviceManager, ILogger<PhieuDangKyMauController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuDangKyMauAll")]
        public async Task<ActionResult> getPhieuDangKyMauAll()
        {
            var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAllAsync();
            _logger.LogDebug("get toan bo phieu dang ky");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuDangKyMau")]
        public async Task<ActionResult> getPhieuDangKyMau(string maMau)
        {
            var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAsync(maMau);
            _logger.LogDebug("lay tieu chuan can tim: " + maMau);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuDangKyMau")]
        public async Task<ActionResult> createPhieuDangKyMau(PhieuDangKyMauDto mauDto)
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
            if(mauDto == null)
            {
                _logger.LogDebug("Thieu du lieu dau vao");
                return BadRequest("Thieu du lieu dau vao");
            }
            bool create = await _service.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDto);
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
        [Route("updatePhieuDangKyMau")]
        public async Task<ActionResult> updatePhieuDangKyMau(PhieuDangKyMauDto MauDto)
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
            bool update = await _service.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(MauDto);
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
        [Route("deletePhieuDangKyMau")]
        public async Task<ActionResult> deletePhieuDangKyMau(PhieuDangKyMau Mau)
        {
            var checkExists = await _service.PhieuDangKyMau.GetPhieuDangKyMauAsync(Mau.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuDangKyMau.DeletePhieuDangKyMauAsync(Mau.MaId);
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
