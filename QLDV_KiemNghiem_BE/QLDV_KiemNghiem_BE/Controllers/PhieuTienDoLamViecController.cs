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
    public class PhieuTienDoLamViecController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuTienDoLamViecController> _logger;
        private readonly IMapper _mapper;
        public PhieuTienDoLamViecController(IServiceManager serviceManager, ILogger<PhieuTienDoLamViecController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuTienDoLamViecAll")]
        public async Task<ActionResult> getPhieuTienDoLamViecAll([FromQuery] PhieuTienDoLamViecParam param)
        {
            var result = await _service.PhieuTienDoLamViec.GetPhieuTienDoLamViecAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo phieu tien do lam viec");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getPhieuTienDoLamViecByID")]
        public async Task<ActionResult> getPhieuTienDoLamViecByID(string maPhieuTienDoLamViec)
        {
            var result = await _service.PhieuTienDoLamViec.FindPhieuTienDoLamViecShowAsync(maPhieuTienDoLamViec);
            _logger.LogDebug("lay phieu tien do lam viec can tim: " + maPhieuTienDoLamViec);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuTienDoLamViec")]
        public async Task<ActionResult> createPhieuTienDoLamViec(PhieuTienDoLamViecRequestCreateDto PhieuTienDoLamViecDto)
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
            ResponseModel1<PhieuTienDoLamViecDto> create = await _service.PhieuTienDoLamViec.CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDto, user, userId);
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
        [Route("reviewPhieuTienDoLamViec")]
        public async Task<ActionResult> reviewPhieuTienDoLamViec(PhieuTienDoLamViecRequestReviewDto param)
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
            ResponseModel1<PhieuTienDoLamViecDto> update = await _service.PhieuTienDoLamViec.ReviewPhieuTienDoLamViec(param, user, userId);
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
        [Route("deletePhieuTienDoLamViec")]
        public async Task<ActionResult> deletePhieuTienDoLamViec(string maPhieuTienDoLamViec)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<PhieuTienDoLamViecDto> delete = await _service.PhieuTienDoLamViec.DeletePhieuTienDoLamViecAsync(maPhieuTienDoLamViec, user, userId);
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
