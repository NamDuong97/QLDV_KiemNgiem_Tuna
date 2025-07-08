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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuPhanTichKetQuaController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuPhanTichKetQuaController> _logger;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaController(IServiceManager serviceManager, ILogger<PhieuPhanTichKetQuaController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuPhanTichKetQuaAll")]
        public async Task<ActionResult> getPhieuPhanTichKetQuaAll( [FromQuery] PhieuPhanTichKetQuaParam param)
        {
            var result = await _service.PhieuPhanTichKetQua.GetPhieuPhanTichKetQuaAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get all phieu phan tich ket qua");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getPhieuPhanTichKetQuaByID")]
        public async Task<ActionResult> getPhieuPhanTichKetQuaByID(string maPhieuPhanTichKetQua)
        {
            var result = await _service.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua);
            _logger.LogDebug("lay phieu phan tich ket qua can tim: " + maPhieuPhanTichKetQua);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuPhanTichKetQua")]
        public async Task<ActionResult> createPhieuPhanTichKetQua(PhieuPhanTichKetQuaRequestCreateDto PhieuPhanTichKetQuaDto)
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
            ResponseModel1<PhieuPhanTichKetQuaDto> create = await _service.PhieuPhanTichKetQua.CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto, user, userId);
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
        [Route("updatePhieuPhanTichKetQua")]
        public async Task<ActionResult> updatePhieuPhanTichKetQua(PhieuPhanTichKetQuaRequestUpdateDto PhieuPhanTichKetQuaDto)
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
            ResponseModel1<PhieuPhanTichKetQuaDto> update = await _service.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto, user, userId);
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

        [HttpPut]
        [Route("reviewPhieuPhanTichKetQuaByLDP")]
        public async Task<ActionResult> reviewPhieuPhanTichKetQuaByLDP(RequestReviewPhieuPhanTichKetQua param)
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
            ResponseModel1<PhieuPhanTichKetQuaDto> update = await _service.PhieuPhanTichKetQua.ReviewPhieuPhanTichKetQuaByLDP(param, user, userId);
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

        [HttpPut]
        [Route("reviewPhieuPhanTichKetQuaByCustomer")]
        public async Task<ActionResult> reviewPhieuPhanTichKetQuaByCustomer(RequestReviewPhieuPhanTichKetQuaByCustomer param)
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
            ResponseModel1<PhieuPhanTichKetQuaDto> update = await _service.PhieuPhanTichKetQua.ReviewPhieuPhanTichKetQuaByCustomer(param, user, userId);
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

        [HttpPut]
        [Route("reviewPhieuPhanTichKetQuaByBLD")]
        public async Task<ActionResult> reviewPhieuPhanTichKetQuaByBLD(RequestReviewPhieuPhanTichKetQua param)
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
            ResponseModel1<PhieuPhanTichKetQuaDto> update = await _service.PhieuPhanTichKetQua.ReviewPhieuPhanTichKetQuaByBLD(param, user, userId);
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
        [Route("deletePhieuPhanTichKetQua")]
        public async Task<ActionResult> deletePhieuPhanTichKetQua(string maPhieuPhanTichKetQua)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "know";
            ResponseModel1<PhieuPhanTichKetQuaDto> delete = await _service.PhieuPhanTichKetQua.DeletePhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua, user);
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
