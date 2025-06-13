using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuChiController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuChiController> _logger;
        private readonly IMapper _mapper;
        public PhieuChiController(IServiceManager serviceManager, ILogger<PhieuChiController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuChiAll")]
        public async Task<ActionResult> getPhieuChiAll()
        {
            var result = await _service.PhieuChi.GetPhieuChisAllAsync();
            _logger.LogDebug("get toan bo phieu chi");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhieuChiByID")]
        public async Task<ActionResult> getPhieuChiByID(string maPhieuChi)
        {
            var result = await _service.PhieuChi.FindPhieuChiAsync(maPhieuChi);
            _logger.LogDebug("lay phieu chi can tim: " + maPhieuChi);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuChi")]
        public async Task<ActionResult> createPhieuChi(PhieuChiDto PhieuChiDto)
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
            ResponseModel1<PhieuChiDto> create = await _service.PhieuChi.CreatePhieuChiAsync(PhieuChiDto);
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
        [Route("updatePhieuChi")]
        public async Task<ActionResult> updatePhieuChi(PhieuChiDto PhieuChiDto)
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
            ResponseModel1<PhieuChiDto> update = await _service.PhieuChi.UpdatePhieuChiAsync(PhieuChiDto);
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
        [Route("deletePhieuChi")]
        public async Task<ActionResult> deletePhieuChi(PhieuChi PhieuChi)
        {
            var checkExists = await _service.PhieuChi.FindPhieuChiAsync(PhieuChi.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuChi.DeletePhieuChiAsync(PhieuChi);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phieu chi thanh cong");
                    return Ok(PhieuChi);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu chi that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phieu chi khong ton tai");
                return BadRequest();
            }
        }
    }
}
