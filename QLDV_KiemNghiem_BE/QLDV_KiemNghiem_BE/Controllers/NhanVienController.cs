using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using StackExchange.Redis;
using System.Security.Claims;
using System.Text.Json;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<NhanVienController> _logger;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        private readonly IConnectionMultiplexer _redis;
        public NhanVienController(IServiceManager serviceManager, ILogger<NhanVienController> logger, IMapper mapper, IDistributedCache cache,
           IConnectionMultiplexer redis)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
            _redis = redis;
        }

        [HttpPost]
        [Route("loginNhanVien")]
        public async Task<ActionResult> loginNhanVien(LoginDto login)
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
            LoginResponse checkLogin = await _service.NhanVien.LoginNhanVienAsync(login);
            if (checkLogin.KetQua)
            {
                _logger.LogDebug(checkLogin.Message);
                return Ok(checkLogin);
            }
            else
            {
                _logger.LogDebug(checkLogin.Message);
                return BadRequest(checkLogin);
            }
        }

        [HttpPost]
        [Route("getRefreshToken")]
        public async Task<ActionResult> getRefreshToken([FromBody] TokenDto tokenDto)
        {
            try
            {
                ResponseModel1<TokenDto> token = await _service.NhanVien.GetRefreshTokenForNhanVien(tokenDto);
                if (token.KetQua)
                {
                    return Ok(token);
                }
                else
                {
                    return BadRequest(token);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getNhanVienAll")]
        public async Task<ActionResult> getNhanVienAll( [FromQuery] NhanVienParam param)
        {
            if(_redis.IsConnected)
            {
                var version = await _cache.GetStringAsync("nhanvien:all:version") ?? "v1";
                var cacheKey = $"nhanvien:all:{version}:{JsonConvert.SerializeObject(param)}";
                var cached = await _cache.GetStringAsync(cacheKey);
                // Neu co cache
                if (!string.IsNullOrEmpty(cached))
                {
                    var cachedResult = JsonConvert.DeserializeObject<CachedResponse<IEnumerable<NhanVienDto>>>(cached);

                    // Thêm lại header từ cache
                    foreach (var header in cachedResult?.Headers)
                    {
                        Response.Headers[header.Key] = header.Value.ToString();
                    }
                    return Ok(cachedResult.Data);
                }
                else
                {
                    // Nếu không có cache thì lấy dữ liệu từ BD
                    var result = await _service.NhanVien.GetNhanViensAllAsync(param, false);
                    // Lưu lại cả header và body
                    var headers = new Dictionary<string, string>
                    {
                        { "X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi) }
                    };
                    // Chuẩn bị dữ liệu để lưu vào redis
                    var cacheObj = new CachedResponse<IEnumerable<NhanVienDto>>
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
            }
            else
            {
                var result = await _service.NhanVien.GetNhanViensAllAsync(param, false);
                Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
                _logger.LogDebug("get all nhan vien");
                return Ok(result.datas);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("getNhanVienByID")]
        public async Task<ActionResult> getNhanVienByID(string maNhanVien)
        {
            if (_redis.IsConnected)
            {
                // Kiểm tra xem trong cache co lưu chưa, nếu có thì trả về
                var cacheKey = $"nhanvien:{maNhanVien}";
                var cacheData = await _cache.GetStringAsync(cacheKey);
                if (!string.IsNullOrEmpty(cacheData))
                {
                    var cached = JsonConvert.DeserializeObject<CachedResponse<NhanVienDto>>(cacheData);
                    return Ok(cached.Data);
                }

                // Ngược lại nếu cache chưa có thì tiến hành lưu redis và trả về từ BD
                var result = await _service.NhanVien.FindNhanVienAsync(maNhanVien);
                var cacheObj = new CachedResponse<NhanVienDto>
                {
                    Data = result
                };
                // Lưu dữ liệu vào redis
                await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                _logger.LogDebug("lay nhan vien can tim: " + maNhanVien);
                return Ok(result);
            }
            else
            {
                var result = await _service.NhanVien.FindNhanVienAsync(maNhanVien);
                _logger.LogDebug("lay nhan vien can tim: " + maNhanVien);
                return Ok(result);
            }
        }

        [HttpPost]
        [Route("createNhanVien")]
        public async Task<ActionResult> createNhanVien(NhanVienDto NhanVienDto)
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
            ResponseModel1<NhanVienDto> create = await _service.NhanVien.CreateNhanVienAsync(NhanVienDto);
            if (create.KetQua)
            {
                if(_redis.IsConnected)
                {
                    // Neu co ket noi thi moi them vao redis
                    var cacheKey = $"nhanvien:{create?.Data?.MaId}";
                    var cacheObj = new CachedResponse<NhanVienDto>
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
        [Route("updateNhanVien")]
        public async Task<ActionResult> updateNhanVien(NhanVienDto NhanVienDto)
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
            ResponseModel1<NhanVienDto> update = await _service.NhanVien.UpdateNhanVienAsync(NhanVienDto);
            if (update.KetQua)
            {
                // Xoa cache cu da co tren redis, va cap nhat du lieu moi cho cache khachhang
                await _cache.RemoveAsync($"nhanvien:{update?.Data.MaId}");
                await _cache.SetStringAsync($"nhanvien:{update?.Data.MaId}", JsonConvert.SerializeObject(update.Data), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                // Cap nhat version moi cho cache redis nhanvien:all
                await _cache.SetStringAsync("nhanvien:all:version", $"v{DateTime.UtcNow.Ticks}");

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
        [Route("deleteNhanVien")]
        public async Task<ActionResult> deleteNhanVien(NhanVien NhanVien)
        {
            var checkExists = await _service.NhanVien.FindNhanVienAsync(NhanVien.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.NhanVien.DeleteNhanVienAsync(NhanVien);
                if (delete)
                {
                    await _cache.RemoveAsync($"nhanVien:{NhanVien.MaId}");
                    // Cap nhat version moi cho cache redis nhanVien:all
                    await _cache.SetStringAsync("nhanVien:all:version", $"v{DateTime.UtcNow.Ticks}");

                    _logger.LogDebug("Cap nhat nhan vien thanh cong");
                    return Ok(NhanVien);
                }
                else
                {
                    _logger.LogDebug("Cap nhat nhan vien that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("nhan vien khong ton tai");
                return BadRequest();
            }
        }
    }
}
