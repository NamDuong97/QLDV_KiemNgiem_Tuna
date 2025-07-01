using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHoaDonBoSungController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<ChiTietHoaDonBoSungController> _logger;

        public ChiTietHoaDonBoSungController(IServiceManager service, ILogger<ChiTietHoaDonBoSungController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        [Route("getAllChiTietHoaDonThuBoSung")]
        public async Task<ActionResult> getAllChiTietHoaDonThuBoSung()
        {
            var result = await _service.ChiTietHoaDonThuBoSung.GetChiTietHoaDonThuBoSungsAllAsync();
            _logger.LogDebug("Lấy danh sách tất cả chi tiết hóa đơn bổ sung");
            return Ok(result);
        }

        [HttpGet]
        [Route("findChiTietHoaDonThuBoSungById")]
        public async Task<ActionResult> findChiTietHoaDonThuBoSungById(string maChiTietHoaDonThuBoSung)
        {
            var result = await _service.ChiTietHoaDonThuBoSung.FindChiTietHoaDonThuBoSungAsync(maChiTietHoaDonThuBoSung);
            _logger.LogDebug("Tìm chi tiết hóa đơn bổ sung theo mã: " + maChiTietHoaDonThuBoSung);
            return Ok(result);
        }

        [HttpPost]
        [Route("createChiTietHoaDonThuBoSung")]
        public async Task<ActionResult> createChiTietHoaDonThuBoSung([FromBody] ChiTietHoaDonThuBoSungRequestCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                _logger.LogError("Lỗi validate tham số đầu vào");
                return BadRequest(new { Errors = errors });
            }

            var result = await _service.ChiTietHoaDonThuBoSung.CreateChiTietHoaDonThuBoSungAsync(dto);
            _logger.LogDebug(result.Message);
            return result.KetQua ? Ok(result.Data) : BadRequest(result.Message);
        }

        [HttpPut]
        [Route("updateChiTietHoaDonThuBoSung")]
        public async Task<ActionResult> updateChiTietHoaDonThuBoSung([FromBody] ChiTietHoaDonThuBoSungRequestUpdateDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                _logger.LogError("Lỗi validate tham số đầu vào");
                return BadRequest(new { Errors = errors });
            }

            var result = await _service.ChiTietHoaDonThuBoSung.UpdateChiTietHoaDonThuBoSungAsync(dto);
            _logger.LogDebug(result.Message);
            return result.KetQua ? Ok(result.Data) : BadRequest(result.Message);
        }

        [HttpDelete]
        [Route("deleteChiTietHoaDonThuBoSung")]
        public async Task<ActionResult> deleteChiTietHoaDonThuBoSung(string maChiTietHoaDonThuBoSung)
        {
            var result = await _service.ChiTietHoaDonThuBoSung.DeleteChiTietHoaDonThuBoSungAsync(maChiTietHoaDonThuBoSung);
            _logger.LogDebug(result.Message);
            return result.KetQua ? Ok(result.Data) : BadRequest(result.Message);
        }
    }
}
