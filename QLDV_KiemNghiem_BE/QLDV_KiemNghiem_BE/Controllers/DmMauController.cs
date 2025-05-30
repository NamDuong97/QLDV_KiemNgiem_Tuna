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

        //[HttpGet]
        //[Route("getDmMauByName")]
        //public async Task<ActionResult> getDmMauByName(string tenDmMau)
        //{
        //    var result = await _service.DmMau.FindDmMauByNameAsync(tenDmMau);
        //    _logger.LogDebug("lay dm mau can tim: " + tenDmMau);
        //    return Ok(result);
        //}

        [HttpPost]
        [Route("createDmMau")]
        public async Task<ActionResult> createDmMau(DmMauDto DmMauDto)
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
            bool create = await _service.DmMau.CreateDmMauAsync(DmMauDto);
            if (create)
            {
                _logger.LogDebug("Tao dm mau thanh cong");
                return Ok(DmMauDto);
            }
            else
            {
                _logger.LogDebug("Tao dm mau that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateDmMau")]
        public async Task<ActionResult> updateDmMau(DmMauDto DmMauDto)
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
            bool update = await _service.DmMau.UpdateDmMauAsync(DmMauDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat dm mau thanh cong");
                return Ok(DmMauDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat dm mau that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteDmMau")]
        public async Task<ActionResult> deleteDmMau(DmMau DmMau)
        {
            var checkExists = await _service.DmMau.FindDmMauAsync(DmMau.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.DmMau.DeleteDmMauAsync(DmMau);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat dm mau thanh cong");
                    return Ok(DmMau);
                }
                else
                {
                    _logger.LogDebug("Cap nhat dm mau that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("dm mau khong ton tai");
                return BadRequest();
            }
        }
    }
}
