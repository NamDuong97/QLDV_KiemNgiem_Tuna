using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoPhanController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<BoPhanController> _logger;
        private readonly IMapper _mapper;
        public BoPhanController(IServiceManager serviceManager, ILogger<BoPhanController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getBoPhanAll")]
        public async Task<ActionResult> getBoPhanAll()
        {
            var result = await _service.BoPhan.GetBoPhansAllAsync();
            _logger.LogDebug("get toan bo bo phan");
            return Ok(result);
        }

        [HttpGet]
        [Route("getBoPhanByID")]
        public async Task<ActionResult> getBoPhanByID(string maBoPhan)
        {
            var result = await _service.BoPhan.FindBoPhanAsync(maBoPhan);
            _logger.LogDebug("lay bo phan can tim: " + maBoPhan);
            return Ok(result);
        }

        [HttpPost]
        [Route("createBoPhan")]
        public async Task<ActionResult> createBoPhan(BoPhanRequestCreateDto BoPhanDto)
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
            ResponseModel1<BoPhanDto> create = await _service.BoPhan.CreateBoPhanAsync(BoPhanDto, user);
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
        [Route("updateBoPhan")]
        public async Task<ActionResult> updateBoPhan(BoPhanRequestUpdateDto BoPhanDto)
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
            ResponseModel1<BoPhanDto> update = await _service.BoPhan.UpdateBoPhanAsync(BoPhanDto, user);
            if (update.KetQua)
            {
                _logger.LogDebug(update.Message);
                return Ok(update);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update.Message);
            }
        }

        [HttpDelete]
        [Route("deleteBoPhan")]
        public async Task<ActionResult> deleteBoPhan(string maBoPhan)
        {
            bool delete = await _service.BoPhan.DeleteBoPhanAsync(maBoPhan);
            if (delete)
            {
                _logger.LogDebug("Xoa bo phan thanh cong");
                return Ok("Xoa bo phan thanh cong");
            }
            else
            {
                _logger.LogDebug("Xoa bo phan that bai");
                return BadRequest("Xoa bo phan that bai");
            }
        }
    }
}
