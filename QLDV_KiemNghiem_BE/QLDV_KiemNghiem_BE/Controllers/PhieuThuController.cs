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
    public class PhieuThuController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuThuController> _logger;
        private readonly IMapper _mapper;
        public PhieuThuController(IServiceManager serviceManager, ILogger<PhieuThuController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuThuAll")]
        public async Task<ActionResult> getPhieuThuAll()
        {
            var result = await _service.PhieuThu.GetPhieuThusAllAsync();
            _logger.LogDebug("get toan bo phieu thu");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuThuByID")]
        public async Task<ActionResult> getPhieuThuByID(string maPhieuThu)
        {
            var result = await _service.PhieuThu.FindPhieuThuAsync(maPhieuThu);
            _logger.LogDebug("lay phieu thu can tim: " + maPhieuThu);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuThu")]
        public async Task<ActionResult> createPhieuThu(PhieuThuDto PhieuThuDto)
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
            ResponseModel1<PhieuThuDto> create = await _service.PhieuThu.CreatePhieuThuAsync(PhieuThuDto);
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
        [Route("updatePhieuThu")]
        public async Task<ActionResult> updatePhieuThu(PhieuThuDto PhieuThuDto)
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
            ResponseModel1<PhieuThuDto> update = await _service.PhieuThu.UpdatePhieuThuAsync(PhieuThuDto);
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
        [Route("deletePhieuThu")]
        public async Task<ActionResult> deletePhieuThu(PhieuThu PhieuThu)
        {
            var checkExists = await _service.PhieuThu.FindPhieuThuAsync(PhieuThu.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuThu.DeletePhieuThuAsync(PhieuThu);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu thu thanh cong");
                    return Ok(PhieuThu);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu thu that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phieu thu khong ton tai");
                return BadRequest();
            }
        }
    }
}
