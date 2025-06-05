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
    public class HoaDonThuController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<HoaDonThuController> _logger;
        private readonly IMapper _mapper;
        public HoaDonThuController(IServiceManager serviceManager, ILogger<HoaDonThuController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getHoaDonThuAll")]
        public async Task<ActionResult> getHoaDonThuAll()
        {
            var result = await _service.HoaDonThu.GetHoaDonThusAllAsync();
            _logger.LogDebug("lay toan bo hoa don thu");
            return Ok(result);
        }

        // action này dùng để hiển thị phiếu đăng ký cho khách hàng cụ thể
        [HttpGet]
        [Route("getHoaDonThuOfCustomer")]
        public async Task<ActionResult> getPhieuDangKiesOfCustomer(string maKH)
        {
            var hoaDonThus = await _service.HoaDonThu.GetPhieuDangKiesOfCustomer(maKH);
            _logger.LogDebug("lay toan bo hoa don thu cua khach hang: " + maKH);
            return Ok(hoaDonThus);
        }

        [HttpGet]
        [Route("getHoaDonThuByID")]
        public async Task<ActionResult> getHoaDonThuByID(string maHoaDonThu)
        {
            var result = await _service.HoaDonThu.FindHoaDonThuAsync(maHoaDonThu);
            _logger.LogDebug("lay hoa don thu can tim: " + maHoaDonThu);
            return Ok(result);
        }

        [HttpPost]
        [Route("createHoaDonThu")]
        public async Task<ActionResult> createHoaDonThu(HoaDonThuDto HoaDonThuDto)
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
            bool create = await _service.HoaDonThu.CreateHoaDonThuAsync(HoaDonThuDto);
            if (create)
            {
                _logger.LogDebug("Tao hoa don thu thanh cong");
                return Ok(HoaDonThuDto);
            }
            else
            {
                _logger.LogDebug("Tao hoa don thu that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateHoaDonThu")]
        public async Task<ActionResult> updateHoaDonThu(HoaDonThuDto HoaDonThuDto)
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
            bool update = await _service.HoaDonThu.UpdateHoaDonThuAsync(HoaDonThuDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat hoa don thu thanh cong");
                return Ok(HoaDonThuDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat hoa don thu that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteHoaDonThu")]
        public async Task<ActionResult> deleteHoaDonThu(HoaDonThu HoaDonThu)
        {
            var checkExists = await _service.HoaDonThu.FindHoaDonThuAsync(HoaDonThu.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.HoaDonThu.DeleteHoaDonThuAsync(HoaDonThu);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat hoa don thu thanh cong");
                    return Ok(HoaDonThu);
                }
                else
                {
                    _logger.LogDebug("Cap nhat hoa don thu that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("hoa don thu khong ton tai");
                return BadRequest();
            }
        }
    }
}

