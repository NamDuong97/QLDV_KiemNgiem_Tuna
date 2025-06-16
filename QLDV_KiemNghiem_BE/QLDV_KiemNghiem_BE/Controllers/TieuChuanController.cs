using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public class TieuChuanController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<TieuChuanController> _logger;
        private readonly IMapper _mapper;
        public TieuChuanController(IServiceManager serviceManager, ILogger<TieuChuanController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getTieuChuanAll")]
        public async Task<ActionResult> getTieuChuanAll()
        {
            var result = await _service.TieuChuan.GetTieuChuansAllAsync();
            _logger.LogDebug("get toan bo tieu chuan");
            return Ok(result);
        }

        [HttpGet]
        [Route("getTieuChuanByID")]
        public async Task<ActionResult> getTieuChuanByID(string maTieuChuan)
        {
            var result = await _service.TieuChuan.FindTieuChuanAsync(maTieuChuan);
            _logger.LogDebug("lay tieu chuan can tim: " + maTieuChuan);
            return Ok(result);
        }

        [HttpPost]
        [Route("createTieuChuan")]
        public async Task<ActionResult> createTieuChuan(TieuChuanRequestCreateDto tieuChuanDto)
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
            ResponseModel1<TieuChuanDto> create = await _service.TieuChuan.CreateTieuChuanAsync(tieuChuanDto, user);
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
        [Route("updateTieuChuan")]
        public async Task<ActionResult> updateTieuChuan(TieuChuanRequestUpdateDto tieuChuanDto)
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
            ResponseModel1<TieuChuanDto> update = await _service.TieuChuan.UpdateTieuChuanAsync(tieuChuanDto, user);
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
        [Route("deleteTieuChuan")]
        public async Task<ActionResult> deleteTieuChuan(string maTieuChuan)
        {
            var checkExists = await _service.TieuChuan.FindTieuChuanAsync(maTieuChuan);
            if (checkExists != null)
            {
                bool delete = await _service.TieuChuan.DeleteTieuChuanAsync(maTieuChuan);
                if (delete)
                {
                    _logger.LogDebug("Xoa tieu chuan thanh cong");
                    return Ok("Xoa tieu chuan thanh cong");
                }
                else
                {
                    _logger.LogDebug("Xoa tieu chuan that bai");
                    return BadRequest("Xoa tieu chuan that bai");
                }
            }
            else
            {
                _logger.LogDebug("tieu chuan khong ton tai");
                return BadRequest();
            }
        }
    }
}

