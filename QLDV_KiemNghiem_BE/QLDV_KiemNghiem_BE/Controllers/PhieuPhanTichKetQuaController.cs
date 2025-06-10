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
    public class PhieuPhanTichKetQuaController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuPhanTichKetQuaController> _logger;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaController(IServiceManager serviceManager, ILogger<PhieuPhanTichKetQuaController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuPhanTichKetQuaAll")]
        public async Task<ActionResult> getPhieuPhanTichKetQuaAll()
        {
            var result = await _service.PhieuPhanTichKetQua.GetPhieuPhanTichKetQuasAllAsync();
            _logger.LogDebug("get toan bo phieu phan tich ket qua");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuPhanTichKetQuaByID")]
        public async Task<ActionResult> getPhieuPhanTichKetQuaByID(string maPhieuPhanTichKetQua)
        {
            var result = await _service.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua);
            _logger.LogDebug("lay phieu phan tich ket qua can tim: " + maPhieuPhanTichKetQua);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuPhanTichKetQua")]
        public async Task<ActionResult> createPhieuPhanTichKetQua(PhieuPhanTichKetQuaDto PhieuPhanTichKetQuaDto)
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
            ResponseModel1<PhieuPhanTichKetQuaDto> create = await _service.PhieuPhanTichKetQua.CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto);
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
        [Route("updatePhieuPhanTichKetQua")]
        public async Task<ActionResult> updatePhieuPhanTichKetQua(PhieuPhanTichKetQuaDto PhieuPhanTichKetQuaDto)
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
            ResponseModel1<PhieuPhanTichKetQuaDto> update = await _service.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto);
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
        [Route("deletePhieuPhanTichKetQua")]
        public async Task<ActionResult> deletePhieuPhanTichKetQua(PhieuPhanTichKetQua PhieuPhanTichKetQua)
        {
            var checkExists = await _service.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuPhanTichKetQua.DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu phan tich ket qua thanh cong");
                    return Ok(PhieuPhanTichKetQua);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu phan tich ket qua that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phieu phan tich ket qua khong ton tai");
                return BadRequest();
            }
        }
    }
}
