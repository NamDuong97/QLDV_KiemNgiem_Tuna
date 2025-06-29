using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuLuuMauController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuLuuMauController> _logger;
        private readonly IMapper _mapper;
        public PhieuLuuMauController(IServiceManager serviceManager, ILogger<PhieuLuuMauController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuLuuMauAll")]
        public async Task<ActionResult> getPhieuLuuMauAll()
        {
            var result = await _service.PhieuLuuMau.GetPhieuLuuMausAllAsync();
            _logger.LogDebug("get toan bo phieu luu mau");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuLuuMauByID")]
        public async Task<ActionResult> getPhieuLuuMauByID(string maPhieuLuuMau)
        {
            var result = await _service.PhieuLuuMau.FindPhieuLuuMauAsync(maPhieuLuuMau);
            _logger.LogDebug("lay phieu luu mau can tim: " + maPhieuLuuMau);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuLuuMau")]
        public async Task<ActionResult> createPhieuLuuMau(PhieuLuuMauRequestCreateDto PhieuLuuMauDto)
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
            ResponseModel1<PhieuLuuMauDto> create = await _service.PhieuLuuMau.CreatePhieuLuuMauAsync(PhieuLuuMauDto, user);
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
        [Route("updatePhieuLuuMau")]
        public async Task<ActionResult> updatePhieuLuuMau(PhieuLuuMauRequestUpdateDto PhieuLuuMauDto)
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
            ResponseModel1<PhieuLuuMauDto> update = await _service.PhieuLuuMau.UpdatePhieuLuuMauAsync(PhieuLuuMauDto, user);
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
        [Route("deletePhieuLuuMau")]
        public async Task<ActionResult> deletePhieuLuuMau(string maPhieuLuuMau, bool isDel)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "know";
            ResponseModel1<PhieuLuuMauDto> delete = await _service.PhieuLuuMau.DeletePhieuLuuMauAsync(maPhieuLuuMau, user, isDel);
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
