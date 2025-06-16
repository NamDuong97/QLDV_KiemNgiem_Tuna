using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Security.Claims;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DmMauController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<DmMauController> _logger;
        private readonly IMapper _mapper;
        public DmMauController(IServiceManager serviceManager, ILogger<DmMauController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getDmMauAll")]
        public async Task<ActionResult> getDmMauAll()
        {
            var result = await _service.DmMau.GetDmMausAllAsync();
            _logger.LogDebug("get toan bo dm mau");
            return Ok(result);
        }

        [HttpGet]
        [Route("getDmMauByID")]
        public async Task<ActionResult> getDmMauByID(string maDmMau)
        {
            var result = await _service.DmMau.FindDmMauAsync(maDmMau);
            _logger.LogDebug("lay dm mau can tim: " + maDmMau);
            return Ok(result);
        }

        [HttpPost]
        [Route("createDmMau")]
        public async Task<ActionResult> createDmMau(DmMauRequestCreateDto DmMauDto)
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
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<DmMauDto> create = await _service.DmMau.CreateDmMauAsync(DmMauDto, user);
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
        [Route("updateDmMau")]
        public async Task<ActionResult> updateDmMau(DmMauRequestUpdateDto DmMauDto)
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
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<DmMauDto> update = await _service.DmMau.UpdateDmMauAsync(DmMauDto, user);
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
        [Route("deleteDmMau")]
        public async Task<ActionResult> deleteDmMau(string maDmMau)
        {
            bool delete = await _service.DmMau.DeleteDmMauAsync(maDmMau);
            if (delete)
            {
                _logger.LogDebug("Xoa dm mau thanh cong");
                return Ok("Xoa dm mau thanh cong");
            }
            else
            {
                _logger.LogDebug("Xoa dm mau that bai");
                return BadRequest("Xoa dm mau that bai");
            }

        }
    }
}
