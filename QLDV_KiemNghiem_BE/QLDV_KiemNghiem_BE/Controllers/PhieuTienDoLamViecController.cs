using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuTienDoLamViecController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuTienDoLamViecController> _logger;
        private readonly IMapper _mapper;
        public PhieuTienDoLamViecController(IServiceManager serviceManager, ILogger<PhieuTienDoLamViecController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuTienDoLamViecAll")]
        public async Task<ActionResult> getPhieuTienDoLamViecAll(PhieuTienDoLamViecParam param)
        {
            var result = await _service.PhieuTienDoLamViec.GetPhieuTienDoLamViecAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo phieu tien do lam viec");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getPhieuTienDoLamViecByID")]
        public async Task<ActionResult> getPhieuTienDoLamViecByID(string maPhieuTienDoLamViec)
        {
            var result = await _service.PhieuTienDoLamViec.FindPhieuTienDoLamViecShowAsync(maPhieuTienDoLamViec);
            _logger.LogDebug("lay phieu tien do lam viec can tim: " + maPhieuTienDoLamViec);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuTienDoLamViec")]
        public async Task<ActionResult> createPhieuTienDoLamViec(PhieuTienDoLamViecDto PhieuTienDoLamViecDto)
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
            ResponseModel1<PhieuTienDoLamViecDto> create = await _service.PhieuTienDoLamViec.CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDto);
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
        [Route("updatePhieuTienDoLamViec")]
        public async Task<ActionResult> updatePhieuTienDoLamViec(PhieuTienDoLamViecDto PhieuTienDoLamViecDto)
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
            ResponseModel1<PhieuTienDoLamViecDto> update = await _service.PhieuTienDoLamViec.UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDto);
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
        [Route("deletePhieuTienDoLamViec")]
        public async Task<ActionResult> deletePhieuTienDoLamViec(PhieuTienDoLamViec PhieuTienDoLamViec)
        {
            var checkExists = await _service.PhieuTienDoLamViec.FindPhieuTienDoLamViecAsync(PhieuTienDoLamViec.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuTienDoLamViec.DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViec);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu tien do lam viec thanh cong");
                    return Ok(PhieuTienDoLamViec);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu tien do lam viec that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phieu tien do lam viec khong ton tai");
                return BadRequest();
            }
        }
    }
}
