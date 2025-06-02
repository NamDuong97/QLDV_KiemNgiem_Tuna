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

        //[HttpGet]
        //[Route("getBoPhanByName")]
        //public async Task<ActionResult> getBoPhanByName(string tenBoPhan)
        //{
        //    var result = await _service.BoPhan.FindBoPhanByNameAsync(tenBoPhan);
        //    _logger.LogDebug("lay bo phan can tim: " + tenBoPhan);
        //    return Ok(result);
        //}

        [HttpPost]
        [Route("createBoPhan")]
        public async Task<ActionResult> createBoPhan(BoPhanDto BoPhanDto)
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
            bool create = await _service.BoPhan.CreateBoPhanAsync(BoPhanDto);
            if (create)
            {
                _logger.LogDebug("Tao bo phan thanh cong");
                return Ok(BoPhanDto);
            }
            else
            {
                _logger.LogDebug("Tao bo phan that bai");
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updateBoPhan")]
        public async Task<ActionResult> updateBoPhan(BoPhanDto BoPhanDto)
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
            bool update = await _service.BoPhan.UpdateBoPhanAsync(BoPhanDto);
            if (update)
            {
                _logger.LogDebug("Cap nhat bo phan thanh cong");
                return Ok(BoPhanDto);
            }
            else
            {
                _logger.LogDebug("Cap nhat bo phan that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteBoPhan")]
        public async Task<ActionResult> deleteBoPhan(BoPhan BoPhan)
        {
            var checkExists = await _service.BoPhan.FindBoPhanAsync(BoPhan.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.BoPhan.DeleteBoPhanAsync(BoPhan);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat bo phan thanh cong");
                    return Ok(BoPhan);
                }
                else
                {
                    _logger.LogDebug("Cap nhat bo phan that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("bo phan khong ton tai");
                return BadRequest();
            }
        }
    }
}
