using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChucVuController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<ChucVuController> _logger;
        private readonly IMapper _mapper;
        public ChucVuController(IServiceManager serviceManager, ILogger<ChucVuController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getChucVuAll")]
        public async Task<ActionResult> getChucVuAll()
        {
            var result = await _service.ChucVu.GetChucVusAllAsync();
            _logger.LogDebug("get toan bo chuc vu");
            return Ok(result);
        }

        [HttpGet]
        [Route("getChucVuByID")]
        public async Task<ActionResult> getChucVuByID(string maChucVu)
        {
            ResponseModel1<ChucVuDto?> find = await _service.ChucVu.FindChucVuAsync(maChucVu);

            _logger.LogDebug("lay chuc vu can tim: " + maChucVu);
            if (find.KetQua)
            {
                _logger.LogDebug(find.Message);
                return Ok(find);
            }
            else
            {
                _logger.LogDebug(find.Message);
                return BadRequest(find);
            }
        }

        [HttpPost]
        [Route("createChucVu")]
        public async Task<ActionResult> createChucVu(ChucVuRequestCreateDto ChucVuDto)
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
            ResponseModel1<ChucVuDto> create = await _service.ChucVu.CreateChucVuAsync(ChucVuDto, user);
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
        [Route("updateChucVu")]
        public async Task<ActionResult> updateChucVu(ChucVuRequestUpdateDto ChucVuDto)
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
            ResponseModel1<ChucVuDto> update = await _service.ChucVu.UpdateChucVuAsync(ChucVuDto, user);
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
        [Route("deleteChucVu")]
        public async Task<ActionResult> deleteChucVu(string  maChucVu)
        {
            var checkExists = await _service.ChucVu.FindChucVuAsync(maChucVu);
            if (checkExists != null)
            {
                bool delete = await _service.ChucVu.DeleteChucVuAsync(maChucVu);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat chuc vu thanh cong");
                    return Ok("Xoa thanh cong");
                }
                else
                {
                    _logger.LogDebug("Cap nhat chuc vu that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("chuc vu khong ton tai");
                return BadRequest();
            }
        }
    }
}

