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

        // action nay ca nguoi dung va quan tri vien deu su dung
        [HttpPost]
        [Route("createPhieuDangKy")]
        public async Task<ActionResult> createPhieuDangKy(PhieuDangKyDto phieuDangKyDto)
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
            bool create = await _service.PhieuDangKy.CreatePhieuDangKyAsync(phieuDangKyDto);
            if (create)
            {
                _logger.LogDebug("Tao phieu dang ky thanh cong");
                return Ok(phieuDangKyDto);
            }
            else
            {
                _logger.LogDebug("Tao phieu dang ky that bai");
                return BadRequest();
            }
        }

        // action nay ca nguoi dung va quan tri vien deu su dung
        [HttpPut]
        [Route("updatePhieuDangKy")]
        public async Task<ActionResult> updatePhieuDangKy(PhieuDangKyDto phieuDangKyDto)
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
            bool update = await _service.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKyDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                return Ok(phieuDangKyDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat phieu dang ky that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deletePhieuDangKy")]
        public async Task<ActionResult> deletePhieuDangKy(PhieuDangKy phieuDangKy)
        {
            var checkExists = await _service.PhieuDangKy.CheckExistPhieuDangKyAsync(phieuDangKy.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuDangKy.DeletePhieuDangKyAsync(phieuDangKy);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                    return Ok(phieuDangKy);
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

        [HttpGet]
        [Route("duTinhThoiGianKiemNghiem")]
        public async Task<ActionResult> duTinhThoiGianKiemNghiem(string maTieuChuan)
        {
            int time = await _service.PhieuDangKy.DuTinhThoiGianKiemNghiem(maTieuChuan);
            if (time != 0)
            {
                _logger.LogDebug("Tra ket qua thoi gian du tinh kiem nghiem thanh cong");
                return Ok(time);
            }
            else 
            {
                _logger.LogDebug("Ma tieu chuan chua ton tai trong CSDL");
                return BadRequest(time);
            }
        }
    }
}
