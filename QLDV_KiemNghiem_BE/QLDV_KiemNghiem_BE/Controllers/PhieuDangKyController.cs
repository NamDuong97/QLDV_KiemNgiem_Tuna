using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using System;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuDangKyController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDangKyController> _logger;
        private readonly IMapper _mapper;
        public PhieuDangKyController(IServiceManager serviceManager, ILogger<PhieuDangKyController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuDangKyAll")]
        public async Task<ActionResult> getPhieuDangKyAll()
        {
            var phieuDangKys = await _service.PhieuDangKy.GetPhieuDangKiesAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuDangKyDto>>(phieuDangKys);
            _logger.LogDebug("get toan bo phieu dang ky");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuDangKy")]
        public async Task<ActionResult> getPhieuDangKy(string maKH)
        {
            var phieuDangKy = await _service.PhieuDangKy.GetPhieuDangKiesAsync(maKH);
            _logger.LogDebug("get toan bo phieu dang ky cua khach hang: " + maKH);
            return Ok(phieuDangKy);
        }

        [HttpPost]
        [Route("createPhieuDangKy")]
        public async Task<ActionResult> createPhieuDangKy(PhieuDangKy phieuDangKy)
        {
            if (ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogDebug("Tao phieu dang ky that bai");
                return BadRequest(new { Errors = errors });
            }
            bool create = await _service.PhieuDangKy.CreatePhieuDangKyAsync(phieuDangKy);
            if (create)
            {
                _logger.LogDebug("Tao phieu dang ky thanh cong");
                return Ok(phieuDangKy);
            }
            else
            {
                _logger.LogDebug("Tao phieu dang ky that bai");
                return BadRequest();
            }
        }

    }
}
