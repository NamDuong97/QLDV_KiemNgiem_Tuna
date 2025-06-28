using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichSuPhanCongController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<LichSuPhanCongController> _logger;
        private readonly IMapper _mapper;
        public LichSuPhanCongController(IServiceManager serviceManager, ILogger<LichSuPhanCongController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getLichSuPhanCongAll")]
        public async Task<ActionResult> getLichSuPhanCongAll([FromQuery] LichSuPhanCongParam param)
        {
            var result = await _service.LichSuPhanCong.GetLichSuPhanCongsAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo lich su phan cong");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getLichSuPhanCongByID")]
        public async Task<ActionResult> getLichSuPhanCongByID(string maLichSuPhanCong)
        {
            var result = await _service.LichSuPhanCong.FindLichSuPhanCongAsync(maLichSuPhanCong);
            _logger.LogDebug("lay lich su phan cong can tim: " + maLichSuPhanCong);
            return Ok(result);
        }

        [HttpPost]
        [Route("createLichSuPhanCong")]
        public async Task<ActionResult> createLichSuPhanCong(LichSuPhanCongRequestCreateDto LichSuPhanCongDto)
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
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "know";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<LichSuPhanCongDto> create = await _service.LichSuPhanCong.CreateLichSuPhanCongAsync(LichSuPhanCongDto,user, userId);
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
        [Route("updateLichSuPhanCong")]
        public async Task<ActionResult> updateLichSuPhanCong(LichSuPhanCongRequestUpdateDto LichSuPhanCongDto)
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
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "know";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<LichSuPhanCongDto> update = await _service.LichSuPhanCong.UpdateLichSuPhanCongAsync(LichSuPhanCongDto, user, userId);
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
        [Route("deleteLichSuPhanCong")]
        public async Task<ActionResult> deleteLichSuPhanCong(LichSuPhanCong LichSuPhanCong)
        {
            var checkExists = await _service.LichSuPhanCong.FindLichSuPhanCongAsync(LichSuPhanCong.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.LichSuPhanCong.DeleteLichSuPhanCongAsync(LichSuPhanCong);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat lich su phan cong thanh cong");
                    return Ok(LichSuPhanCong);
                }
                else
                {
                    _logger.LogDebug("Cap nhat lich su phan cong that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("lich su phan cong khong ton tai");
                return BadRequest();
            }
        }
    }
}
