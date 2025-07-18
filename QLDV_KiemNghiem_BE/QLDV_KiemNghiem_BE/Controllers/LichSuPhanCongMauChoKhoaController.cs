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

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichSuPhanCongMauChoKhoaController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<LichSuPhanCongMauChoKhoaController> _logger;
        private readonly IMapper _mapper;
        public LichSuPhanCongMauChoKhoaController(IServiceManager serviceManager, ILogger<LichSuPhanCongMauChoKhoaController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getLichSuPhanCongMauChoKhoaAll")]
        public async Task<ActionResult> getLichSuPhanCongMauChoKhoaAll([FromQuery] LichSuPhanCongMauChoKhoaParam param)
        {
            var result = await _service.LichSuPhanCongMauChoKhoa.GetLichSuPhanCongMauChoKhoasAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo lich su phan cong mau cho khoa");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getLichSuPhanCongMauChoKhoaByID")]
        public async Task<ActionResult> getLichSuPhanCongMauChoKhoaByID(string maLichSuPhanCongMauChoKhoa)
        {
            var result = await _service.LichSuPhanCongMauChoKhoa.FindLichSuPhanCongMauChoKhoaAsync(maLichSuPhanCongMauChoKhoa);
            _logger.LogDebug("lay lich su phan cong mau cho khoa can tim: " + maLichSuPhanCongMauChoKhoa);
            return Ok(result);
        }

        [HttpGet]
        [Route("getLichSuPhanCongMauChoKhoaByMauMauVaMaKhoa")]
        public async Task<ActionResult> getLichSuPhanCongMauChoKhoaByMauMauVaMaKhoa(string maMau, string maKhoa)
        {
            var result = await _service.LichSuPhanCongMauChoKhoa.FindLichSuPhanCongMauChoKhoaByMaMauVaMaKhoaAsync(maMau, maKhoa);
            _logger.LogDebug("lay lich su phan cong mau cho khoa can tim");
            return Ok(result);
        }

        [HttpPost]
        [Route("createLichSuPhanCongMauChoKhoa")]
        public async Task<ActionResult> createLichSuPhanCongMauChoKhoa(LichSuPhanCongMauChoKhoaRequestCreateDto lichSuPhanCongMauChoKhoaDto)
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
            ResponseModel1<LichSuPhanCongMauChoKhoaDto> create = await _service.LichSuPhanCongMauChoKhoa.CreateLichSuPhanCongMauChoKhoaAsync(lichSuPhanCongMauChoKhoaDto, user, userId);
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
        [Route("updateLichSuPhanCongMauChoKhoa")]
        public async Task<ActionResult> updateLichSuPhanCongMauChoKhoa(LichSuPhanCongMauChoKhoaRequestUpdateDto lichSuPhanCongMauChoKhoaDto)
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
            ResponseModel1<LichSuPhanCongMauChoKhoaDto> update = await _service.LichSuPhanCongMauChoKhoa.UpdateLichSuPhanCongMauChoKhoaAsync(lichSuPhanCongMauChoKhoaDto, user, userId);
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
        [Route("deleteLichSuPhanCongMauChoKhoa")]
        public async Task<ActionResult> deleteLichSuPhanCongMauChoKhoa(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa)
        {
            var checkExists = await _service.LichSuPhanCongMauChoKhoa.FindLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.LichSuPhanCongMauChoKhoa.DeleteLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat lich su phan cong mau cho khoa thanh cong ");
                    return Ok(LichSuPhanCongMauChoKhoa);
                }
                else
                {
                    _logger.LogDebug("Cap nhat lich su phan cong mau cho khoa that bai");
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

