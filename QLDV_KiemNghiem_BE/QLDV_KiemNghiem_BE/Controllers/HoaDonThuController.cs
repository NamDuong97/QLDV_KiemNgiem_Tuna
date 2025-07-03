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
using System.Security.Claims;
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
            var result = await _service.HoaDonThu.GetHoaDonThusAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get all hoa don thu");
            return Ok(result.datas);
        }


        [HttpGet]
        [Route("getHoaDonThuByID")]
        public async Task<ActionResult> getHoaDonThuByID(string maHoaDonThu)
        {
            var result = await _service.HoaDonThu.FindHoaDonThuAsync(maHoaDonThu);
            _logger.LogDebug("lay hoa don thu can tim: " + maHoaDonThu);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "KET")]
        [Route("createHoaDonThu")]
        public async Task<ActionResult> createHoaDonThu(HoaDonThuRequestCreateDto HoaDonThuDto)
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
            var nameUser = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<HoaDonThuDto> create = await _service.HoaDonThu.CreateHoaDonThuAsync(HoaDonThuDto, nameUser, userId);
            if (create.KetQua)
            {
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
        public async Task<ActionResult> updateHoaDonThu(HoaDonThuRequestUpdateDto HoaDonThuDto)
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
            var nameUser = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            var update = await _service.HoaDonThu.UpdateHoaDonThuAsync(HoaDonThuDto, nameUser, userId);
            if (update.KetQua)
            {
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
            var nameUser = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            ResponseModel1<string> delete = await _service.HoaDonThu.DeleteHoaDonThuAsync(maHoaDonThu, nameUser);
            if (delete.KetQua)
            {
                //// Xoa cache cu da co tren redis cho cache hoadonthu
                //await _cache.RemoveAsync($"hoadonthu:{maHoaDonThu}");
                //// Cap nhat version moi cho cache redis hoadonthu:nhanvien:all:version
                //await _cache.SetStringAsync("hoadonthu:nhanvien:all:version", $"v{DateTime.UtcNow.Ticks}");
                //// Cap nhat version moi cho cache redis hoadonthu:customer:all:version
                //await _cache.SetStringAsync("hoadonthu:customer:all:version", $"v{DateTime.UtcNow.Ticks}");

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

