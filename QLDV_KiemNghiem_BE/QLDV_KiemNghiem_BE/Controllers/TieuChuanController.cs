using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

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
            _logger.LogDebug("get toan bo phieu dang ky");
            return Ok(result);
        }

        [HttpGet]
        [Route("getTieuChuan")]
        public async Task<ActionResult> getTieuChuan(string maTieuChuan)
        {
            var result = await _service.TieuChuan.FindTieuChuanAsync(maTieuChuan);
            _logger.LogDebug("lay tieu chuan can tim: " + maTieuChuan);
            return Ok(result);
        }

        [HttpPost]
        [Route("createTieuChuan")]
        public async Task<ActionResult> createTieuChuan(TieuChuan tieuChuan)
        {
            if (ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            bool create = await _service.TieuChuan.CreateTieuChuanAsync(tieuChuan);
            if (create)
            {
                _logger.LogDebug("Tao phieu dang ky thanh cong");
                return Ok(tieuChuan);
            }
            else
            {
                _logger.LogDebug("Tao phieu dang ky that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateTieuChuan")]
        public async Task<ActionResult> updateTieuChuan(TieuChuanDto tieuChuanDto)
        {
            if (ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            bool update = await _service.TieuChuan.UpdateTieuChuanAsync(tieuChuanDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                return Ok(TieuChuanDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat phieu dang ky that bai");
                return BadRequest();
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
                    _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                    return Ok(TieuChuan);
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
}
