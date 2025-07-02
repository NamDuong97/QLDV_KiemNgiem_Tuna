using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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
    //[Authorize(Roles = "BLD,KET,KHTH,KYT")]
    public class HoaDonThuController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<HoaDonThuController> _logger;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        public HoaDonThuController(IServiceManager serviceManager, ILogger<HoaDonThuController> logger, IMapper mapper, IDistributedCache cache)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
        }

        [HttpGet]
        [Route("getHoaDonThuAll")]
        public async Task<ActionResult> getHoaDonThuAll([FromQuery]HoaDonThuParam param)
        {
            var version = await _cache.GetStringAsync("hoadonthu:nhanvien:all:version") ?? "v1";
            var cacheKey = $"hoadonthu:nhanvien:all:{version}:{JsonConvert.SerializeObject(param)}";
            var cached = await _cache.GetStringAsync(cacheKey);
            // Neu co cache
            if (!string.IsNullOrEmpty(cached))
            {
                var cachedResult = JsonConvert.DeserializeObject<CachedResponse<IEnumerable<HoaDonThuDto>>>(cached);

                // Thêm lại header từ cache
                foreach (var header in cachedResult?.Headers)
                {
                    Response.Headers[header.Key] = header.Value.ToString();
                }
                return Ok(cachedResult.Data);
            }

            // Nếu không có cache thì lấy dữ liệu từ BD
            var result = await _service.HoaDonThu.GetHoaDonThusAllAsync(param, false);
            // Lưu lại cả header và body
            var headers = new Dictionary<string, string>
            {
                { "X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi) }
            };
            // Chuẩn bị dữ liệu để lưu vào redis
            var cacheObj = new CachedResponse<IEnumerable<HoaDonThuDto>>
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
            _logger.LogDebug("get all hoa don thu");
            return Ok(result.datas);
        }

        // action này dùng để hiển thị phiếu đăng ký cho khách hàng cụ thể
        [HttpGet]
        [Authorize(Roles = "KH,BLD,KET,KHTH,KYT")]
        [Route("getHoaDonThuOfCustomer")]
        public async Task<ActionResult> getPhieuDangKiesOfCustomer(string maKH)
        {
            // Kiểm tra xem trong cache co lưu chưa, nếu có thì trả về
            var version = await _cache.GetStringAsync("hoadonthu:customer:all:version") ?? "v1";
            var cacheKey = $"hoadonthu:customer:all:{version}:{maKH}";
            var cacheData = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cacheData))
            {
                var cached = JsonConvert.DeserializeObject<CachedResponse<IEnumerable<HoaDonThuDto>>>(cacheData);
                return Ok(cached.Data);
            }

            // Ngược lại nếu cache chưa có thì tiến hành lưu redis và trả về từ BD
            var hoaDonThus = await _service.HoaDonThu.GetHoaDonThuOfCustomer(maKH);
            var cacheObj = new CachedResponse<IEnumerable<HoaDonThuDto>>
            {
                Data = hoaDonThus
            };
            // Lưu dữ liệu vào redis
            await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });
            _logger.LogDebug("lay toan bo hoa don thu cua khach hang: " + maKH);
            return Ok(hoaDonThus);
        }

        [HttpGet]
        [Route("getHoaDonThuByID")]
        public async Task<ActionResult> getHoaDonThuByID(string maHoaDonThu)
        {
            // Kiểm tra xem trong cache co lưu chưa, nếu có thì trả về
            var cacheKey = $"hoadonthu:{maHoaDonThu}";
            var cacheData = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cacheData))
            {
                var cached = JsonConvert.DeserializeObject<CachedResponse<HoaDonThuDto>>(cacheData);
                return Ok(cached.Data);
            }

            var result = await _service.HoaDonThu.FindHoaDonThuAsync(maHoaDonThu);
            // Ngược lại nếu cache chưa có thì tiến hành lưu redis và trả về từ BD
            var cacheObj = new CachedResponse<HoaDonThuDto>
            {
                Data = result
            };
            // Lưu dữ liệu vào redis
            await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });

            _logger.LogDebug("lay hoa don thu can tim: " + maHoaDonThu);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "KET")]
        [Route("createHoaDonThu")]
        public async Task<ActionResult> createHoaDonThu(HoaDonThuDto HoaDonThuDto)
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
            ResponseModel1<HoaDonThuDto> create = await _service.HoaDonThu.CreateHoaDonThuAsync(HoaDonThuDto, nameUser);
            if (create.KetQua)
            {
                var cacheKey = $"hoadonthu:{create?.Data?.MaId}";
                var cacheObj = new CachedResponse<HoaDonThuDto>
                {
                    Data = create?.Data
                };
                // Lưu dữ liệu vào redis hoadonthu
                await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                // Cap nhat version moi cho cache redis hoadonthu:nhanvien:all:version
                await _cache.SetStringAsync("hoadonthu:nhanvien:all:version", $"v{DateTime.UtcNow.Ticks}");
                // Cap nhat version moi cho cache redis hoadonthu:customer:all:version
                await _cache.SetStringAsync("hoadonthu:customer:all:version", $"v{DateTime.UtcNow.Ticks}");

                _logger.LogDebug(create.Message);
                return Ok(create);
            }
            else
            {
                _logger.LogDebug(create.Message);
                return BadRequest();
            }
        }

        [HttpPut]
        [Authorize(Roles = "KET")]
        [Route("updateHoaDonThu")]
        public async Task<ActionResult> updateHoaDonThu(HoaDonThuDto HoaDonThuDto)
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
            var update = await _service.HoaDonThu.UpdateHoaDonThuAsync(HoaDonThuDto, nameUser);
            if (update.KetQua)
            {
                // Xoa cache cu da co tren redis, va cap nhat du lieu moi cho cache hoadonthu
                await _cache.RemoveAsync($"hoadonthu:{update?.Data.MaId}");
                await _cache.SetStringAsync($"hoadonthu:{update?.Data.MaId}", JsonConvert.SerializeObject(update.Data), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                // Cap nhat version moi cho cache redis hoadonthu:nhanvien:all:version
                await _cache.SetStringAsync("hoadonthu:nhanvien:all:version", $"v{DateTime.UtcNow.Ticks}");
                // Cap nhat version moi cho cache redis hoadonthu:customer:all:version
                await _cache.SetStringAsync("hoadonthu:customer:all:version", $"v{DateTime.UtcNow.Ticks}");

                _logger.LogDebug("Cap nhat hoa don thu thanh cong");
                return Ok(HoaDonThuDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat hoa don thu that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Authorize(Roles = "KET")]
        [Route("deleteHoaDonThu")]
        public async Task<ActionResult> deleteHoaDonThu(string maHoaDonThu)
        {
            string nameUser = User.FindFirst(ClaimTypes.Email)?.Value.ToString();
            ResponseModel1<string> delete = await _service.HoaDonThu.DeleteHoaDonThuAsync(maHoaDonThu, nameUser);
            if (delete.KetQua)
            {
                // Xoa cache cu da co tren redis cho cache hoadonthu
                await _cache.RemoveAsync($"hoadonthu:{maHoaDonThu}");
                // Cap nhat version moi cho cache redis hoadonthu:nhanvien:all:version
                await _cache.SetStringAsync("hoadonthu:nhanvien:all:version", $"v{DateTime.UtcNow.Ticks}");
                // Cap nhat version moi cho cache redis hoadonthu:customer:all:version
                await _cache.SetStringAsync("hoadonthu:customer:all:version", $"v{DateTime.UtcNow.Ticks}");

                _logger.LogDebug(delete.Message);
                return Ok(delete.Message);
            }
            else
            {
                _logger.LogDebug(delete.Message);
                return BadRequest(delete.Message);
            }
        }
    }
}

