using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
    public class PhanCongNoiBoController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhanCongNoiBoController> _logger;
        private readonly IMapper _mapper;
        public PhanCongNoiBoController(IServiceManager serviceManager, ILogger<PhanCongNoiBoController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhanCongNoiBoAll")]
        public async Task<ActionResult> getPhanCongNoiBoAll([FromQuery] PhanCongNoiBoParam param)
        {
            var result = await _service.PhanCongNoiBo.GetPhanCongNoiBosAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo phan cong noi bo");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getPhanCongNoiBoByID")]
        public async Task<ActionResult> getPhanCongNoiBoByID(string maPhanCongNoiBo)
        {
            var result = await _service.PhanCongNoiBo.FindPhanCongNoiBoAsync(maPhanCongNoiBo);
            _logger.LogDebug("lay phan cong noi bo can tim: " + maPhanCongNoiBo);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhanCongNoiBo")]
        public async Task<ActionResult> createPhanCongNoiBo(PhanCongNoiBoRequestCreateDto PhanCongNoiBoDto)
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
            ResponseModel1<PhanCongNoiBoDto> create = await _service.PhanCongNoiBo.CreatePhanCongNoiBoAsync(PhanCongNoiBoDto,user, userId);
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
        [Route("updatePhanCongNoiBo")]
        public async Task<ActionResult> updatePhanCongNoiBo(PhanCongNoiBoRequestUpdateDto PhanCongNoiBoDto)
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
            ResponseModel1<PhanCongNoiBoDto> update = await _service.PhanCongNoiBo.UpdatePhanCongNoiBoAsync(PhanCongNoiBoDto, user, userId);
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
        [Route("reassignPhanCongNoiBo")]
        public async Task<ActionResult> reassignPhanCongNoiBo(ReassignPhanCongNoiBoRequestUpdateDto PhanCongNoiBoDto)
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
            ResponseModel1<PhanCongNoiBoDto> update = await _service.PhanCongNoiBo.ReassignPhanCongNoiBo(PhanCongNoiBoDto, user, userId);
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
        [Route("deletePhanCongNoiBo")]
        public async Task<ActionResult> deletePhanCongNoiBo(string maPhanCongNoiBo)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "know";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<PhanCongNoiBoDto> delete = await _service.PhanCongNoiBo.DeletePhanCongNoiBoAsync(maPhanCongNoiBo, user, userId);
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
