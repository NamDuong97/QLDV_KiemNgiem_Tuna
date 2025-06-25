using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.RequestFeatures;
using StackExchange.Redis;
using Microsoft.Extensions.Logging;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuDangKyPhuLieuHoaChatController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDangKyPhuLieuHoaChatController> _logger;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        private readonly IConnectionMultiplexer _redis;
        public PhieuDangKyPhuLieuHoaChatController(IServiceManager serviceManager, ILogger<PhieuDangKyPhuLieuHoaChatController> logger, IMapper mapper, IDistributedCache cache, IConnectionMultiplexer redis)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
            _redis = redis;
        }

        [HttpGet]
        [Route("getPhieuDangKyPhuLieuHoaChatAll")]
        public async Task<ActionResult> getPhieuDangKyPhuLieuHoaChatAll([FromQuery] PhieuDangKyPhuLieuHoaChatParam param)
        {
            var result = await _service.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get all phu lieu hoa chat");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getPhieuDangKyPhuLieuHoaChat")]
        public async Task<ActionResult> getPhieuDangKyPhuLieuHoaChat(string maPLHC)
        {
            var result = await _service.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatAsync(maPLHC);
            _logger.LogDebug($"get phu lieu hoa chat theo ma {maPLHC}");
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuDangKyPhuLieuHoaChat")]
        public async Task<ActionResult> createPhieuDangKyPhuLieuHoaChat(PhieuDangKyPhuLieuHoaChatDto plhcDto)
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
            ResponseModel1<PhieuDangKyPhuLieuHoaChatDto> create = await _service.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(plhcDto, user);
            if (create.KetQua)
            {
                _logger.LogDebug(create.Message);
                return Ok(create);
            }
            else
            {
                _logger.LogDebug(create.Message);
                return BadRequest(create);
            }
        }

        [HttpPut]
        [Route("updatePhieuDangKyPhuLieuHoaChat")]
        public async Task<ActionResult> updatePhieuDangKyPhuLieuHoaChat(PhieuDangKyPhuLieuHoaChatDto MauDto)
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
            ResponseModel1<PhieuDangKyPhuLieuHoaChatDto> update = await _service.PhieuDangKyPhuLieuHoaChat.UpdatePhieuDangKyPhuLieuHoaChatAsync(MauDto, user);
            if (update.KetQua)
            {
                _logger.LogDebug(update.Message);
                return Ok(update);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update);
            }
        }

        [HttpDelete]
        [Route("deletePhieuDangKyPhuLieuHoaChat")]
        public async Task<ActionResult> deletePhieuDangKyPhuLieuHoaChat(string maPLHC)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            bool delete = await _service.PhieuDangKyPhuLieuHoaChat.DeletePhieuDangKyPhuLieuHoaChatAsync(maPLHC, user);
            if (delete)
            {
                _logger.LogDebug("Xoa phu lieu hoa chat thanh cong");
                return Ok();
            }
            else
            {
                _logger.LogDebug("Xoa phu lieu hoa chat that bai");
                return BadRequest();
            }
        }

    }
}

