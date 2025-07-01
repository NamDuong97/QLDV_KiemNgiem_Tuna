using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonThuBoSungController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<HoaDonThuBoSungController> _logger;
        private readonly IMapper _mapper;
        public HoaDonThuBoSungController(IServiceManager serviceManager, ILogger<HoaDonThuBoSungController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getHoaDonThuBoSungAll")]
        public async Task<ActionResult> getHoaDonThuBoSungAll([FromQuery] HoaDonThuBoSungParam param)
        {
            var result = await _service.HoaDonThuBoSung.GetHoaDonThuBoSungAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo phieu tien do lam viec");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getHoaDonThuBoSungByID")]
        public async Task<ActionResult> getHoaDonThuBoSungByID(string maHoaDonThuBoSung)
        {
            var result = await _service.HoaDonThuBoSung.FindHoaDonThuBoSungShowAsync(maHoaDonThuBoSung);
            _logger.LogDebug("lay phieu tien do lam viec can tim: " + maHoaDonThuBoSung);
            return Ok(result);
        }

        [HttpPost]
        [Route("createHoaDonThuBoSung")]
        public async Task<ActionResult> createHoaDonThuBoSung(HoaDonThuBoSungRequestCreateDto HoaDonThuBoSungDto)
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
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<HoaDonThuBoSungDto> create = await _service.HoaDonThuBoSung.CreateHoaDonBoSungAsync(HoaDonThuBoSungDto, user, userId);
            if (create.KetQua)
            {
                _logger.LogDebug(create.Message);
                return Ok(create.Data);
            }
            else
            {
                _logger.LogDebug(create.Message);
                return BadRequest(create.Message);
            }
        }

        [HttpPut]
        [Route("updateHoaDonThuBoSung")]
        public async Task<ActionResult> updateHoaDonThuBoSung(HoaDonThuBoSungRequestUpdateDto HoaDonThuBoSungDto)
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
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<HoaDonThuBoSungDto> update = await _service.HoaDonThuBoSung.UpdateHoaDonThuBoSungAsync(HoaDonThuBoSungDto, user, userId);
            if (update.KetQua)
            {
                _logger.LogDebug(update.Message);
                return Ok(update.Data);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update.Message);
            }
        }

        [HttpDelete]
        [Route("deleteHoaDonThuBoSung")]
        public async Task<ActionResult> deleteHoaDonThuBoSung(string maHoaDonThuBoSung)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<HoaDonThuBoSungDto> delete = await _service.HoaDonThuBoSung.DeleteHoaDonThuBoSungAsync(maHoaDonThuBoSung, user, userId);
            if (delete.KetQua)
            {
                _logger.LogDebug(delete.Message);
                return Ok(delete.Data);
            }
            else
            {
                _logger.LogDebug(delete.Message);
                return BadRequest(delete.Message);
            }
        }
    }
}
