using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuDuTruController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDuTruController> _logger;
        private readonly IMapper _mapper;
        public PhieuDuTruController(IServiceManager serviceManager, ILogger<PhieuDuTruController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuDuTruAll")]
        public async Task<ActionResult> getPhieuDuTruAll()
        {
            var result = await _service.PhieuDuTru.GetPhieuDuTrusAllAsync();
            _logger.LogDebug("get toan bo phieu du tru");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuDuTruByID")]
        public async Task<ActionResult> getPhieuDuTruByID(string maPhieuDuTru)
        {
            var result = await _service.PhieuDuTru.FindPhieuDuTruAsync(maPhieuDuTru);
            _logger.LogDebug("lay phieu du tru can tim: " + maPhieuDuTru);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuDuTru")]
        public async Task<ActionResult> createPhieuDuTru(PhieuDuTruDto PhieuDuTruDto)
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
            ResponseModel1<PhieuDuTruDto> create = await _service.PhieuDuTru.CreatePhieuDuTruAsync(PhieuDuTruDto);
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
        [Route("updatePhieuDuTru")]
        public async Task<ActionResult> updatePhieuDuTru(PhieuDuTruDto PhieuDuTruDto)
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
            ResponseModel1<PhieuDuTruDto> update = await _service.PhieuDuTru.UpdatePhieuDuTruAsync(PhieuDuTruDto);
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
        [Route("deletePhieuDuTru")]
        public async Task<ActionResult> deletePhieuDuTru(PhieuDuTru PhieuDuTru)
        {
            var checkExists = await _service.PhieuDuTru.FindPhieuDuTruAsync(PhieuDuTru.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuDuTru.DeletePhieuDuTruAsync(PhieuDuTru);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu du tru thanh cong");
                    return Ok(PhieuDuTru);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu du tru that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phieu du tru khong ton tai");
                return BadRequest();
            }
        }
    }
}
