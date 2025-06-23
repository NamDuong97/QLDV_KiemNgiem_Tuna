using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using StackExchange.Redis;
using System.Security.Claims;

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

        [HttpGet]
        [Route("getPhieuDangKyMau")]
        public async Task<ActionResult> getPhieuDangKyMau(string maMau)
        {
            if (_redis.IsConnected)
            {
                var version = await _cache.GetStringAsync("phieudangkymau:version") ?? "v1";
                var cacheKey = $"phieudangkymau:{version}:{JsonConvert.SerializeObject(maMau)}";
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
                _logger.LogDebug("get all nhan vien");
                return Ok(result);
            }
        }

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
                    // Lưu dữ liệu vào redis khachhang
                    await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                    // Cap nhat version moi cho cache redis nhanvien:all
                    await _cache.SetStringAsync("nhanvien:all:version", $"v{DateTime.UtcNow.Ticks}");
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
            bool update = await _service.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(MauDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                return Ok(MauDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat mau that bai, hoac mau chua ton tai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deletePhieuDangKyMau")]
        public async Task<ActionResult> deletePhieuDangKyMau(PhieuDangKyMau Mau)
        {
            var checkExists = await _service.PhieuDangKyMau.GetPhieuDangKyMauAsync(Mau.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuDangKyMau.DeletePhieuDangKyMauAsync(Mau.MaId);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                    return Ok(Mau);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu dang ky that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("Phieu dang ky khong ton tai");
                return BadRequest();
            }
        }
    
    }
}
