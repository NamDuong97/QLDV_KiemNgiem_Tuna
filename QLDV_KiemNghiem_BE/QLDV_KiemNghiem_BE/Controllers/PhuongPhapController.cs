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
    public class PhuongPhapController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhuongPhapController> _logger;
        private readonly IMapper _mapper;
        public PhuongPhapController(IServiceManager serviceManager, ILogger<PhuongPhapController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhuongPhapAll")]
        public async Task<ActionResult> getPhuongPhapAll()
        {
            var result = await _service.PhuongPhap.GetPhuongPhapsAllAsync();
            _logger.LogDebug("get toan bo phuong phap");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhuongPhap")]
        public async Task<ActionResult> getPhuongPhap(string maPhuongPhap)
        {
            var result = await _service.PhuongPhap.FindPhuongPhapAsync(maPhuongPhap);
            _logger.LogDebug("lay phuong phap can tim: " + maPhuongPhap);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhuongPhap")]
        public async Task<ActionResult> createPhuongPhap(PhuongPhapDto PhuongPhapDto)
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
            bool create = await _service.PhuongPhap.CreatePhuongPhapAsync(PhuongPhapDto);
            if (create)
            {
                _logger.LogDebug("Tao phuong phap thanh cong");
                return Ok(PhuongPhapDto);
            }
            else
            {
                _logger.LogDebug("Tao phuong phap that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updatePhuongPhap")]
        public async Task<ActionResult> updatePhuongPhap(PhuongPhapDto PhuongPhapDto)
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
            bool update = await _service.PhuongPhap.UpdatePhuongPhapAsync(PhuongPhapDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat phuong phap thanh cong");
                return Ok(PhuongPhapDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat phuong phap that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deletePhuongPhap")]
        public async Task<ActionResult> deletePhuongPhap(PhuongPhap PhuongPhap)
        {
            var checkExists = await _service.PhuongPhap.FindPhuongPhapAsync(PhuongPhap.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhuongPhap.DeletePhuongPhapAsync(PhuongPhap);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phuong phap thanh cong");
                    return Ok(PhuongPhap);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phuong phap that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phuong phap khong ton tai");
                return BadRequest();
            }
        }
    }
}
