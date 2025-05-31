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
    public class TrangThaiPhieuDkController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<TrangThaiPhieuDkController> _logger;
        private readonly IMapper _mapper;
        public TrangThaiPhieuDkController(IServiceManager serviceManager, ILogger<TrangThaiPhieuDkController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getTrangThaiPhieuDkAll")]
        public async Task<ActionResult> getTrangThaiPhieuDkAll()
        {
            var result = await _service.TrangThaiPhieuDk.GetTrangThaiPhieuDksAllAsync();
            _logger.LogDebug("get toan bo trang thai phieu dang ky");
            return Ok(result);
        }

        [HttpGet]
        [Route("getTrangThaiPhieuDkByID")]
        public async Task<ActionResult> getTrangThaiPhieuDkByID(string maTrangThaiPhieuDk)
        {
            var result = await _service.TrangThaiPhieuDk.FindTrangThaiPhieuDkAsync(maTrangThaiPhieuDk);
            _logger.LogDebug("lay trang thai phieu dang ky can tim: " + maTrangThaiPhieuDk);
            return Ok(result);
        }

        //[HttpGet]
        //[Route("getTrangThaiPhieuDkByName")]
        //public async Task<ActionResult> getTrangThaiPhieuDkByName(string tenTrangThaiPhieuDk)
        //{
        //    var result = await _service.TrangThaiPhieuDk.FindTrangThaiPhieuDkByNameAsync(tenTrangThaiPhieuDk);
        //    _logger.LogDebug("lay trang thai phieu dang ky can tim: " + tenTrangThaiPhieuDk);
        //    return Ok(result);
        //}

        [HttpPost]
        [Route("createTrangThaiPhieuDk")]
        public async Task<ActionResult> createTrangThaiPhieuDk(TrangThaiPhieuDkDto TrangThaiPhieuDkDto)
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
            bool create = await _service.TrangThaiPhieuDk.CreateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDto);
            if (create)
            {
                _logger.LogDebug("Tao trang thai phieu dang ky thanh cong");
                return Ok(TrangThaiPhieuDkDto);
            }
            else
            {
                _logger.LogDebug("Tao trang thai phieu dang ky that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateTrangThaiPhieuDk")]
        public async Task<ActionResult> updateTrangThaiPhieuDk(TrangThaiPhieuDkDto TrangThaiPhieuDkDto)
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
            bool update = await _service.TrangThaiPhieuDk.UpdateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat trang thai phieu dang ky thanh cong");
                return Ok(TrangThaiPhieuDkDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat trang thai phieu dang ky that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteTrangThaiPhieuDk")]
        public async Task<ActionResult> deleteTrangThaiPhieuDk(TrangThaiPhieuDk TrangThaiPhieuDk)
        {
            var checkExists = await _service.TrangThaiPhieuDk.FindTrangThaiPhieuDkAsync(TrangThaiPhieuDk.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.TrangThaiPhieuDk.DeleteTrangThaiPhieuDkAsync(TrangThaiPhieuDk);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat trang thai phieu dang ky thanh cong");
                    return Ok(TrangThaiPhieuDk);
                }
                else
                {
                    _logger.LogDebug("Cap nhat trang thai phieu dang ky that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("trang thai phieu dang ky khong ton tai");
                return BadRequest();
            }
        }
    }
}
