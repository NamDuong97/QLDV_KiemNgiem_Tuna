using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
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

        // action này dùng cho nhân viên phòng kế hoạch đầu tư sử dụng để xem
        [HttpGet]
        [Route("getPhieuDangKyAll")]
        public async Task<ActionResult> getPhieuDangKyAll(PhieuDangKyParam phieuDangKyParam)
        {
            if(phieuDangKyParam == null)
            {
                _logger.LogError("Thieu tham so truyen vao");
                return BadRequest("Thieu tham so truyen vao");
            }
            var phieuDangKys = await _service.PhieuDangKy.GetPhieuDangKiesAllAsync(phieuDangKyParam);
            _logger.LogDebug("lay toan bo phieu dang ky");
            return Ok(phieuDangKys);
        }

        // action này dùng để hiển thị phiếu đăng ký cho khách hàng cụ thể
        [HttpGet]
        [Route("getPhieuDangKiesOfCustomer")]
        public async Task<ActionResult> getPhieuDangKiesOfCustomer(string maKH, string maTrangThaiPhieuDangKy)
        {
            var phieuDangKy = await _service.PhieuDangKy.GetPhieuDangKiesOfCustomerAsync(maKH, maTrangThaiPhieuDangKy);
            _logger.LogDebug("lay toan bo phieu dang ky cua khach hang: " + maKH);
            return Ok(phieuDangKy);
        }

        [HttpGet]
        [Route("findPhieuDangKy")]
        public async Task<ActionResult> findPhieuDangKy(string maPhieuDangKy)
        {
            var phieuDangKy = await _service.PhieuDangKy.FindPhieuDangKyAsync(maPhieuDangKy);
            _logger.LogDebug("lay phieu dang ky co ma phieu: " + maPhieuDangKy);
            return Ok(phieuDangKy);
        }

        [HttpPost]
        [Route("createPhieuDangKy")]
        public async Task<ActionResult> createPhieuDangKy(PhieuDangKyDto phieuDangKyDto)
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
            if(phieuDangKyDto?.Maus?.Count() == 0 || phieuDangKyDto?.PhieuDangKyPhuLieuHoaChats?.Count() == 0)
            {
                _logger.LogDebug("Phiếu đăng ký cung cấp thiếu mẫu hoặc phụ liệu hoá chất");
                return BadRequest("Phiếu đăng ký không thể thiếu mẫu và phụ liệu hoá chất, vui lòng cung cấp đầy đủ");
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

        [HttpPut]
        [Route("updatePhieuDangKy")]
        public async Task<ActionResult> updatePhieuDangKy(PhieuDangKyDto phieuDangKyDto)
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
            
            bool update = await _service.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKyDto);
            if (update)
            {
                _logger.LogInformation("Cap nhat phieu dang ky thanh cong");
                return Ok(phieuDangKyDto);
            }
            else
            {
                _logger.LogInformation("Cap nhat phieu dang ky that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deletePhieuDangKy")]
        public async Task<ActionResult> deletePhieuDangKy(string maPhieuDangKy)
        {
            var checkExists = await _service.PhieuDangKy.CheckExistPhieuDangKyAsync(maPhieuDangKy, false);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuDangKy.DeletePhieuDangKyAsync(checkExists);
                if (delete)
                {
                    _logger.LogDebug("Huy phieu dang ky thanh cong");
                    return Ok(new {message = "Huy phieu dang ky thanh cong" });
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu dang ky that bai");
                    return BadRequest(new { message = "Huy phieu dang ky that bai, vui long thu lai" });
                }
            }
            else
            {
                _logger.LogDebug("Phieu dang ky khong ton tai");
                return BadRequest(new { message = "Phieu dang ky khong ton tai" });
            }
        }

        [HttpGet]
        [Route("duTinhThoiGianKiemNghiem")]
        public async Task<ActionResult> duTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan)
        {
            int time = await _service.PhieuDangKy.DuTinhThoiGianKiemNghiem(maDmMau, maTieuChuan);
            if (time != 0)
            {
                _logger.LogDebug("Tra ket qua thoi gian du tinh kiem nghiem thanh cong");
                return Ok(new {data = time, message = "Lấy dữ liệu thời gian tiêu chuẩn thành công"});
            }
            else 
            {
                _logger.LogDebug("Ma tieu chuan chua ton tai trong CSDL");
                return BadRequest(new { data = time, message = "Lấy dữ liệu không thành công" });
            }
        }
    }
}
