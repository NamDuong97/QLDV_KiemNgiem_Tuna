using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Security.Claims;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTieuController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<ChiTieuController> _logger;
        private readonly IMapper _mapper;
        public ChiTieuController(IServiceManager serviceManager, ILogger<ChiTieuController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getChiTieuAll")]
        public async Task<ActionResult> getChiTieuAll()
        {
            var ChiTieu = await _service.ChiTieu.GetChiTieuAllAsync();
            var result = _mapper.Map<IEnumerable<ChiTieuDto>>(ChiTieu);
            _logger.LogDebug("lay toan bo chi tieu");
            return Ok(result);
        }


        [HttpGet]
        [Route("findChiTieu")]
        public async Task<ActionResult> findChiTieu(string maChiTieu)
        {
            var chiTieu = await _service.ChiTieu.FindChiTieuAsync(maChiTieu);
            _logger.LogDebug("lay toan bo chi tieu");
            return Ok(chiTieu);
        }

        [HttpPost]
        [Route("createChiTieu")]
        public async Task<ActionResult> createChiTieu(ChiTieuRequestCreateDto ChiTieu)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogDebug("Loi validate du lieu dau vao");
                return BadRequest(new { Errors = errors });
            }
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<ChiTieuDto> create = await _service.ChiTieu.CreateChiTieuAsync(ChiTieu, user);
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
        [Route("updateChiTieu")]
        public async Task<ActionResult> updateChiTieu(ChiTieuRequestUpdateDto ChiTieu)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogDebug("Loi validate du lieu dau vao");
                return BadRequest(new { Errors = errors });
            }
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<ChiTieuDto> update = await _service.ChiTieu.UpdateChiTieuAsync(ChiTieu, user);
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
        [Route("deleteChiTieu")]
        public async Task<ActionResult> deleteChiTieu(string maChiTieu)
        {

            bool create = await _service.ChiTieu.DeleteChiTieuAsync(maChiTieu);
            if (create)
            {
                _logger.LogDebug("Xoa chi tieu thanh cong");
                return Ok("Xoa chi tieu thanh cong");
            }
            else
            {
                _logger.LogDebug("Xoa chi tieu that bai");
                return BadRequest("Xoa chi tieu that bai");
            }
        }
    }
}
