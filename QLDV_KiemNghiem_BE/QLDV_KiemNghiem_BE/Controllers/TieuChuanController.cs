using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

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
        public async Task<ActionResult> createTieuChuan(TieuChuanDto tieuChuanDto)
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
            ResponseModel1<TieuChuanDto> create = await _service.TieuChuan.CreateTieuChuanAsync(tieuChuanDto);
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
        [Route("updateTieuChuan")]
        public async Task<ActionResult> updateTieuChuan(TieuChuanDto tieuChuanDto)
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
            ResponseModel1<TieuChuanDto> update = await _service.TieuChuan.UpdateTieuChuanAsync(tieuChuanDto);
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
        [Route("deleteTieuChuan")]
        public async Task<ActionResult> deleteTieuChuan(TieuChuan TieuChuan)
        {
            var checkExists = await _service.TieuChuan.FindTieuChuanAsync(TieuChuan.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.TieuChuan.DeleteTieuChuanAsync(TieuChuan);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat tieu chuan thanh cong");
                    return Ok(TieuChuan);
                }
                else
                {
                    _logger.LogDebug("Cap nhat tieu chuan that bai");
                    return BadRequest();
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

