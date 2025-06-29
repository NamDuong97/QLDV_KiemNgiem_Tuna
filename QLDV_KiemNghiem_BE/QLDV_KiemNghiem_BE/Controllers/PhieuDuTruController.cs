using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuDuTruController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDuTruController> _logger;
        private readonly IMapper _mapper;
        public PhieuDuTruController(IServiceManager serviceManager, ILogger<PhieuDuTruController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuDuTruAll")]
        public async Task<ActionResult> getPhieuDuTruAll()
        {
            var result = await _service.PhieuDuTru.GetPhieuDuTrusAllAsync();
            _logger.LogDebug("get toan bo phieu du tru");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuDuTruByID")]
        public async Task<ActionResult> getPhieuDuTruByID(string maPhieuDuTru)
        {
            var result = await _service.PhieuDuTru.FindPhieuDuTruAsync(maPhieuDuTru);
            _logger.LogDebug("lay phieu du tru can tim: " + maPhieuDuTru);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuDuTru")]
        public async Task<ActionResult> createPhieuDuTru(PhieuDuTruRequestCreateDto PhieuDuTruDto)
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
            ResponseModel1<PhieuDuTruDto> create = await _service.PhieuDuTru.CreatePhieuDuTruAsync(PhieuDuTruDto, user, userId);
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
        [Route("updatePhieuDuTru")]
        public async Task<ActionResult> updatePhieuDuTru([FromBody] PhieuDuTruRequestUpdateDto PhieuDuTruDto)
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
            ResponseModel1<PhieuDuTruDto> update = await _service.PhieuDuTru.UpdatePhieuDuTruAsync(PhieuDuTruDto, user, userId);
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
        [Route("deletePhieuDuTru")]
        public async Task<ActionResult> deletePhieuDuTru(string PhieuDuTru)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "know";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<PhieuDuTruDto> delete = await _service.PhieuDuTru.DeletePhieuDuTruAsync(PhieuDuTru, user, userId);
            if (delete.KetQua)
            {
                _logger.LogDebug(delete.Message);
                return Ok(delete);
            }
            else
            {
                _logger.LogDebug(delete.Message);
                return BadRequest(delete);
            }
        }
    }
}
