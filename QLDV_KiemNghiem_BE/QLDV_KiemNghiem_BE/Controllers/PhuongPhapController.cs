using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        public async Task<ActionResult> createPhuongPhap(PhuongPhapRequestCreateDto PhuongPhapDto)
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
            ResponseModel1<PhuongPhapDto> create = await _service.PhuongPhap.CreatePhuongPhapAsync(PhuongPhapDto, user);
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
        [Route("updatePhuongPhap")]
        public async Task<ActionResult> updatePhuongPhap(PhuongPhapRequestUpdateDto PhuongPhapDto)
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
            ResponseModel1<PhuongPhapDto> update = await _service.PhuongPhap.UpdatePhuongPhapAsync(PhuongPhapDto, user);
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
        [Route("deletePhuongPhap")]
        public async Task<ActionResult> deletePhuongPhap(string  maPhuongPhap)
        {
            bool delete = await _service.PhuongPhap.DeletePhuongPhapAsync(maPhuongPhap);
            if (delete)
            {
                _logger.LogDebug("Xoa phuong phap thanh cong");
                return Ok("Xoa phuong phap thanh cong");
            }
            else
            {
                _logger.LogDebug("Xoa phuong phap that bai");
                return BadRequest("Xoa phuong phap that bai");
            }
           
        }
    }
}
