using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using StackExchange.Redis;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuDangKyMauController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDangKyMauController> _logger;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        private readonly IConnectionMultiplexer _redis;
        public PhieuDangKyMauController(IServiceManager serviceManager, ILogger<PhieuDangKyMauController> logger, IMapper mapper, IDistributedCache cache, IConnectionMultiplexer redis)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
            _redis = redis;
        }

        [Authorize(Policy = "KHTH_BLD_KN")]
        [HttpGet]
        [Route("getPhieuDangKyMauAll")]
        public async Task<ActionResult> getPhieuDangKyMauAll([FromQuery]PhieuDangKyMauParam param)
        {
            if (_redis.IsConnected)
            {
                var version = await _cache.GetStringAsync("phieudangkymau:all:version") ?? "v1";
                var cacheKey = $"phieudangkymau:all:{version}:{JsonConvert.SerializeObject(param)}";
                var cached = await _cache.GetStringAsync(cacheKey);
                // Neu co cache
                if (!string.IsNullOrEmpty(cached))
                {
                    var cachedResult = JsonConvert.DeserializeObject<CachedResponse<IEnumerable<PhieuDangKyMauProcedureDto>>>(cached);

                    // Thêm lại header từ cache
                    foreach (var header in cachedResult?.Headers)
                    {
                        Response.Headers[header.Key] = header.Value.ToString();
                    }
                    return Ok(cachedResult.Data);
                }
               
                // Nếu không có cache thì lấy dữ liệu từ BD
                var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAllAsync(param);
                // Lưu lại cả header và body
                var headers = new Dictionary<string, string>
                {
                    { "X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi) }
                };
                // Chuẩn bị dữ liệu để lưu vào redis
                var cacheObj = new CachedResponse<IEnumerable<PhieuDangKyMauProcedureDto>>
                {
                    Data = result.datas,
                    Headers = headers
                };
                // Lưu dữ liệu vào redis
                await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
                _logger.LogDebug("get all nhan vien");
                return Ok(result.datas);
            }
            else
            {
                var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAllAsync(param);
                Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
                _logger.LogDebug("get all nhan vien");
                return Ok(result.datas);
            }
        }

        [Authorize(Policy = "KHTH_BLD_KN")]
        [HttpGet]
        [Route("getPhieuDangKyMau")]
        public async Task<ActionResult> getPhieuDangKyMau(string maMau)
        {
            if (_redis.IsConnected)
            {
                var cacheKey = $"phieudangkymau:{maMau}";
                var cached = await _cache.GetStringAsync(cacheKey);
                // Neu co cache
                if (!string.IsNullOrEmpty(cached))
                {
                    var cachedResult = JsonConvert.DeserializeObject<CachedResponse<PhieuDangKyMauDto>>(cached);
                    return Ok(cachedResult.Data);
                }
                else
                {
                    // Nếu không có cache thì lấy dữ liệu từ BD
                    var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAsync(maMau);
                    // Chuẩn bị dữ liệu để lưu vào redis
                    var cacheObj = new CachedResponse<PhieuDangKyMauDto>
                    {
                        Data = result,
                    };
                    // Lưu dữ liệu vào redis
                    await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });

                    _logger.LogDebug($"get mau theo ma {maMau}");
                    return Ok(result);
                }
            }
            else
            {
                var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAsync(maMau);
                _logger.LogDebug($"get mau theo ma {maMau}");
                return Ok(result);
            }
        }

        [Authorize(Policy = "KHTH_BLD_KN")]
        [HttpGet]
        [Route("getPhieuDangKyMauThongKe")]
        public ActionResult getPhieuDangKyMauThongKe()
        {
            var result = _service.PhieuDangKyMau.GetPhieuDangKyMauThongKe();
            _logger.LogDebug($"get thong ke mau thanh cong");
            return Ok(result);
        }

        [Authorize(Policy = "KHTHOnly")]
        [HttpPost]
        [Route("createPhieuDangKyMau")]
        public async Task<ActionResult> createPhieuDangKyMau(PhieuDangKyMauDto mauDto)
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
            if(mauDto == null)
            {
                _logger.LogDebug("Thieu du lieu dau vao");
                return BadRequest("Thieu du lieu dau vao");
            }
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            ResponseModel1<PhieuDangKyMauDto> create = await _service.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDto, user);
            if (create.KetQua)
            {
                if (_redis.IsConnected)
                {
                    var cacheKey = $"phieudangkymau:{create?.Data?.MaId}";
                    var cacheObj = new CachedResponse<PhieuDangKyMauDto>
                    {
                        Data = create?.Data
                    };
                    // Lưu dữ liệu vào redis phieudangkymau
                    await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                    // Cap nhat version moi cho cache redis phieudangkymau:all
                    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                }
                _logger.LogDebug("Them mau thanh cong");
                return Ok(mauDto);
            }
            else
            {
                _logger.LogDebug("Them mau that bai");
                return BadRequest();
            }
        }

        [Authorize(Policy = "KHTHOnly")]
        [HttpPut]
        [Route("updatePhieuDangKyMau")]
        public async Task<ActionResult> updatePhieuDangKyMau(PhieuDangKyMauDto MauDto)
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
            ResponseModel1<PhieuDangKyMauDto> update = await _service.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(MauDto, user);
            if (update.KetQua)
            {
                if (_redis.IsConnected)
                {
                    // Xoa cache cu da co tren redis, va cap nhat du lieu moi cho cache phieudangkymau
                    await _cache.RemoveAsync($"phieudangkymau:{update?.Data?.MaId}");
                    await _cache.SetStringAsync($"phieudangkymau:{update?.Data?.MaId}", JsonConvert.SerializeObject(update?.Data), new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                    // Cap nhat version moi cho cache redis phieudangkymau:all
                    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                }
                _logger.LogDebug(update?.Message);
                return Ok(update);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update);
            }
        }

        //[Authorize(Policy = "KHTHOnly")]
        //[Authorize(Policy = "KHTHOnly")]
        [HttpPut]
        [Route("cancelPhieuDangKyMau")]
        public async Task<ActionResult> cancelPhieuDangKyMau(PhieuDangKyMauRequestCancelDto MauDto)
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
            ResponseModel1<PhieuDangKyMauDto> cancel = await _service.PhieuDangKyMau.CancelPhieuDangKyMau(MauDto, user);
            if (cancel.KetQua)
            {
                if (_redis.IsConnected)
                {
                    // Xoa cache cu da co tren redis, va cap nhat du lieu moi cho cache phieudangkymau
                    await _cache.RemoveAsync($"phieudangkymau:{cancel?.Data?.MaId}");
                    await _cache.SetStringAsync($"phieudangkymau:{cancel?.Data?.MaId}", JsonConvert.SerializeObject(cancel?.Data), new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                    // Cap nhat version moi cho cache redis phieudangkymau:all
                    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                }
                _logger.LogDebug(cancel?.Message);
                return Ok(cancel);
            }
            else
            {
                _logger.LogDebug(cancel.Message);
                return BadRequest();
            }
        }

        [Authorize(Policy = "KHTHOnly")]
        [HttpDelete]
        [Route("deletePhieuDangKyMau")]
        public async Task<ActionResult> deletePhieuDangKyMau(string  maMau)
        { 
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            bool delete = await _service.PhieuDangKyMau.DeletePhieuDangKyMauAsync(maMau, user);
            if (delete)
            {
                if (_redis.IsConnected)
                {
                    await _cache.RemoveAsync($"phieudangkymau:{maMau}");
                    // Cap nhat version moi cho cache redis phieudangkymau:all
                    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                }
                _logger.LogDebug("Xoa mau thanh cong");
                return Ok();
            }
            else
            {
                _logger.LogDebug("Xoa mau that bai");
                return BadRequest();
            }
        }
    }
}
