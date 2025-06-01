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
    public class KhoaController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<KhoaController> _logger;
        private readonly IMapper _mapper;
        public KhoaController(IServiceManager serviceManager, ILogger<KhoaController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getKhoaAll")]
        public async Task<ActionResult> getKhoaAll()
        {
            var result = await _service.Khoa.GetKhoasAllAsync();
            _logger.LogDebug("get toan bo khoa");
            return Ok(result);
        }

        [HttpGet]
        [Route("getKhoaByID")]
        public async Task<ActionResult> getKhoaByID(string maKhoa)
        {
            var result = await _service.Khoa.FindKhoaAsync(maKhoa);
            _logger.LogDebug("lay khoa can tim: " + maKhoa);
            return Ok(result);
        }

        //[HttpGet]
        //[Route("getKhoaByName")]
        //public async Task<ActionResult> getKhoaByName(string tenKhoa)
        //{
        //    var result = await _service.Khoa.FindKhoaByNameAsync(tenKhoa);
        //    _logger.LogDebug("lay khoa can tim: " + tenKhoa);
        //    return Ok(result);
        //}

        [HttpPost]
        [Route("createKhoa")]
        public async Task<ActionResult> createKhoa(KhoaDto KhoaDto)
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
            bool create = await _service.Khoa.CreateKhoaAsync(KhoaDto);
            if (create)
            {
                _logger.LogDebug("Tao khoa thanh cong");
                return Ok(KhoaDto);
            }
            else
            {
                _logger.LogDebug("Tao khoa that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateKhoa")]
        public async Task<ActionResult> updateKhoa(KhoaDto KhoaDto)
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
            bool update = await _service.Khoa.UpdateKhoaAsync(KhoaDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat khoa thanh cong");
                return Ok(KhoaDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat khoa that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteKhoa")]
        public async Task<ActionResult> deleteKhoa(Khoa Khoa)
        {
            var checkExists = await _service.Khoa.FindKhoaAsync(Khoa.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.Khoa.DeleteKhoaAsync(Khoa);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat khoa thanh cong");
                    return Ok(Khoa);
                }
                else
                {
                    _logger.LogDebug("Cap nhat khoa that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("khoa khong ton tai");
                return BadRequest();
            }
        }
    }
}

