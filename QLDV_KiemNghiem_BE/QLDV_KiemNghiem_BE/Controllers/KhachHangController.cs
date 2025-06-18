using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using Microsoft.AspNetCore.Authorization;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Text.Json;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using System.Security.Claims;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QLDV_KiemNghiem_BE.Interfaces.Redis;
using QLDV_KiemNghiem_BE.Services;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<KhachHangController> _logger;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        private readonly IRedisService _redisService;

        public KhachHangController(IServiceManager serviceManager, ILogger<KhachHangController> logger, IMapper mapper, IDistributedCache cache, IRedisService redisService)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
            _redisService = redisService;
        }

        //[Authorize(Roles = "BLD,KYT,KHTH")]
        [HttpGet]
        [Route("getKhachHangAll")]
        public async Task<ActionResult> getKhachHangAll(KhachHangParam param)
        {
            var version = await _cache.GetStringAsync("khachhang:all:version") ?? "v1";
            var cacheKey = $"khachhang:all:{version}:{JsonConvert.SerializeObject(param)}";
            var cached = await _cache.GetStringAsync(cacheKey);
            // Neu co cache
            if (!string.IsNullOrEmpty(cached))
            {
                var cachedResult = JsonConvert.DeserializeObject<CachedResponse<IEnumerable<KhachHangReturnDto>>>(cached);

                // Thêm lại header từ cache
                foreach (var header in cachedResult?.Headers)
                { 
                    Response.Headers[header.Key] = header.Value.ToString();
                }
                return Ok(cachedResult.Data);
            }

            // Nếu không có cache thì lấy dữ liệu từ BD
            var result = await _service.KhachHang.GetKhachHangsAllAsync(param, false);
            // Lưu lại cả header và body
            var headers = new Dictionary<string, string>
            {
                { "X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi) }
            };
            // Chuẩn bị dữ liệu để lưu vào redis
            var cacheObj = new CachedResponse<IEnumerable<KhachHangReturnDto>>
            {
                Data = result.datas,
                Headers = headers
            };
            // Lưu dữ liệu vào redis
            await _cache.SetStringAsync(cacheKey,JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
            {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });

            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get all khach hang");
            return Ok(result.datas);
        }

        //[Authorize(Roles = "BLD,KYT,KHTH")]
        [HttpGet]
        [Route("getKhachHangByID")]
        public async Task<ActionResult> getKhachHangByID(string maKhachHang)
        {
            // Kiểm tra xem trong cache co lưu chưa, nếu có thì trả về
            var cacheKey = $"khachhang:{maKhachHang}";
            var cacheData = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cacheData))
            {
                var cached = JsonConvert.DeserializeObject<CachedResponse<KhachHangDto>>(cacheData);
                 return Ok(cached.Data);
            }

            // Ngược lại nếu cache chưa có thì tiến hành lưu redis và trả về từ BD
            var result = await _service.KhachHang.FindKhachHangByNhanVienAsync(maKhachHang);
            var cacheObj = new CachedResponse<KhachHangDto>
            {
                Data = result
            };
            // Lưu dữ liệu vào redis
            await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });
            _logger.LogDebug("lay khach hang can tim: " + maKhachHang);
            return Ok(result);
        }

        [Authorize(Roles = "KH")]
        [HttpGet]
        [Route("getInfoKhachHang")]
        public async Task<ActionResult> getInfoKhachHang()
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //// Kiểm tra xem trong cache co lưu chưa, nếu có thì trả về
                //var cacheKey = $"khachhang:{userID}";
                //var cacheData = await _cache.GetStringAsync(cacheKey);
                //if (!string.IsNullOrEmpty(cacheData))
                //{
                //    // Trả về đối tượng CachedResponse
                //    var cached = JsonConvert.DeserializeObject<CachedResponse<ResponseModel1<KhachHangReturnClientDto>>>(cacheData);
                //    // Trả về đối tượng ResponseModel1<KhachHangReturnDto>
                //    return Ok(cached.Data);
                //}

                // Ngược lại nếu cache chưa có thì tiến hành lưu redis và trả về từ BD
                var khachhang = await _service.KhachHang.FindKhachHangBySeflAsync(userID);
                if (khachhang != null)
                {
                    //var cacheObj = new CachedResponse<ResponseModel1<KhachHangReturnClientDto>>
                    //{
                    //    Data = khachhang
                    //};
                    //// Lưu dữ liệu vào redis
                    //await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                    //{
                    //    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    //});
                    return Ok(khachhang);
                }
                else
                {
                    return BadRequest(khachhang);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      
        [HttpPost]
        [Route("getRefreshToken")]
        public async Task<ActionResult> getRefreshToken( TokenDto tokenDto)
        {
            try
            {
                ResponseModel1<TokenDto> token = await _service.KhachHang.GetRefreshTokenForKhachHang(tokenDto);
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

        // Action này để sau khi người dùng tạo tk thành công, hệ thống sẽ gửi email để khách hàng bấm vào đường link và xác thực => gọi action này
        [HttpGet]
        [Route("verify-email")]
        public async Task<ActionResult> verifyKhachHang(string token)
        {
            try
            {
                var result = await _service.KhachHang.VerifyKhachHangByTokenAsync(token);
                if(result!= null)
                {
                    return Ok("Xác minh email thành công!");
                }
                else
                {
                    return BadRequest("Xac minh khong thanh cong, vui long kiem tra lai");
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("forgetPassword")]
        public async Task<ActionResult> forgetPassword(string email)
        {
            try
            {
                ResponseModel1<string> result = await _service.KhachHang.ForgetPasswordAsync(email);
                if (result.KetQua)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("changePassword")]
        public async Task<ActionResult> changePassword(ResetPasswordRequestDto pass)
        {
            try
            {
                ResponseModel1<KhachHangDto> result = await _service.KhachHang.ChangePasswordAsync(pass);
                if (result.KetQua)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("createKhachHang")]
        public async Task<ActionResult> createKhachHang(KhachHangDto KhachHangDto)
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
            ResponseModel1<KhachHangDto> create = await _service.KhachHang.CreateKhachHangAsync(KhachHangDto);
            if (create.KetQua)
            {
                var cacheKey = $"khachhang:{create?.Data?.MaId}";
                var cacheObj = new CachedResponse<KhachHangDto>
                {
                    Data = create?.Data
                };
                // Lưu dữ liệu vào redis khachhang
                await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                // Cap nhat version moi cho cache redis khachhang:all
                await _cache.SetStringAsync("khachhang:all:version", $"v{DateTime.UtcNow.Ticks}");
                _logger.LogDebug(create.Message);
                return Ok(create.Data);
            }
            else
            {
                _logger.LogDebug(create.Message);
                return BadRequest(create.Message);
            }
        }

        [HttpPost]
        [Route("loginKhachHang")]
        public async Task<ActionResult> loginKhachHang(LoginDto login)
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
            LoginResponse checkLogin = await _service.KhachHang.LoginKhachHangAsync(login);
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

        //[Authorize(Roles = "BLD,KYT,KHTH")]
        [HttpPut]
        [Route("updateKhachHang")]
        public async Task<ActionResult> updateKhachHang(KhachHangRequestDto KhachHangDto)
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
            string nameUser = User.FindFirst(ClaimTypes.Email)?.Value.ToString();
            ResponseModel1<KhachHangDto> update = await _service.KhachHang.UpdateKhachHangAsync(KhachHangDto, nameUser);
            if (update.KetQua)
            {
                // Xoa cache cu da co tren redis, va cap nhat du lieu moi cho cache khachhang
                await _cache.RemoveAsync($"khachhang:{update?.Data.MaId}");
                await _cache.SetStringAsync($"khachhang:{update?.Data.MaId}", JsonConvert.SerializeObject(update.Data), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                // Cap nhat version moi cho cache redis khachhang:all
                await _cache.SetStringAsync("khachhang:all:version", $"v{DateTime.UtcNow.Ticks}");

                _logger.LogDebug(update.Message);
                return Ok(update.Data);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update.Message);
            }
        }

        //[Authorize(Roles = "BLD,KYT,KHTH")]
        [HttpDelete]
        [Route("deleteKhachHang")]
        public async Task<ActionResult> deleteKhachHang(string maKhachHang)
        {
            string nameUser = User.FindFirst(ClaimTypes.Email)?.Value.ToString();
            bool delete = await _service.KhachHang.DeleteKhachHangAsync(maKhachHang, nameUser);
            if (delete)
            {
                await _cache.RemoveAsync($"khachhang:{maKhachHang}");
                // Cap nhat version moi cho cache redis khachhang:all
                await _cache.SetStringAsync("khachhang:all:version", $"v{DateTime.UtcNow.Ticks}");

                _logger.LogDebug("Xoa khach hang thanh cong");
                return Ok("Xoa khach hang thanh cong");
            }
            else
            {
                _logger.LogDebug("Xoa khach hang that bai");
                return BadRequest("Xoa khach hang that bai");
            }
        }
    }
}
