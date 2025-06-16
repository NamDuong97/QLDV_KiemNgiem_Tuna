using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuPhanTichKetQuaChiTietController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuPhanTichKetQuaChiTietController> _logger;
        private readonly IMapper _mapper;
        public PhieuPhanTichKetQuaChiTietController(IServiceManager serviceManager, ILogger<PhieuPhanTichKetQuaChiTietController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuPhanTichKetQuaChiTietAll")]
        public async Task<ActionResult> getPhieuPhanTichKetQuaChiTietAll()
        {
            var result = await _service.PhieuPhanTichKetQuaChiTiet.GetPhieuPhanTichKetQuaChiTietsAllAsync();
            _logger.LogDebug("get toan bo phieu phan tich ket qua chi tiet");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuPhanTichKetQuaChiTietByID")]
        public async Task<ActionResult> getPhieuPhanTichKetQuaChiTietByID(string maPhieuPhanTichKetQuaChiTiet)
        {
            var result = await _service.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietAsync(maPhieuPhanTichKetQuaChiTiet);
            _logger.LogDebug("lay phieu phan tich ket qua chi tiet can tim: " + maPhieuPhanTichKetQuaChiTiet);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuPhanTichKetQuaChiTiet")]
        public async Task<ActionResult> createPhieuPhanTichKetQuaChiTiet(PhieuPhanTichKetQuaChiTietDto PhieuPhanTichKetQuaChiTietDto)
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
            ResponseModel1<PhieuPhanTichKetQuaChiTietDto> create = await _service.PhieuPhanTichKetQuaChiTiet.CreatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto);
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
        [Route("updatePhieuPhanTichKetQuaChiTiet")]
        public async Task<ActionResult> updatePhieuPhanTichKetQuaChiTiet(PhieuPhanTichKetQuaChiTietDto PhieuPhanTichKetQuaChiTietDto)
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
            ResponseModel1<PhieuPhanTichKetQuaChiTietDto> update = await _service.PhieuPhanTichKetQuaChiTiet.UpdatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto);
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
        [Route("deletePhieuPhanTichKetQuaChiTiet")]
        public async Task<ActionResult> deletePhieuPhanTichKetQuaChiTiet(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet)
        {
            var checkExists = await _service.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuPhanTichKetQuaChiTiet.DeletePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu phan tich ket qua chi tiet thanh cong");
                    return Ok(PhieuPhanTichKetQuaChiTiet);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu phan tich ket qua chi tiet that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phieu phan tich ket qua chi tiet khong ton tai");
                return BadRequest();
            }
        }
    }
}
