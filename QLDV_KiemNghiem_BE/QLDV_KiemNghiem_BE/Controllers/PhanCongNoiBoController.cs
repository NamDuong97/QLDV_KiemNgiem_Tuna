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
    public class PhanCongNoiBoController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhanCongNoiBoController> _logger;
        private readonly IMapper _mapper;
        public PhanCongNoiBoController(IServiceManager serviceManager, ILogger<PhanCongNoiBoController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhanCongNoiBoAll")]
        public async Task<ActionResult> getPhanCongNoiBoAll()
        {
            var result = await _service.PhanCongNoiBo.GetPhanCongNoiBosAllAsync();
            _logger.LogDebug("get toan bo phan cong noi bo");
            return Ok(result);
        }

        [HttpGet]
        [Route("getPhanCongNoiBoByID")]
        public async Task<ActionResult> getPhanCongNoiBoByID(string maPhanCongNoiBo)
        {
            var result = await _service.PhanCongNoiBo.FindPhanCongNoiBoAsync(maPhanCongNoiBo);
            _logger.LogDebug("lay phan cong noi bo can tim: " + maPhanCongNoiBo);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhanCongNoiBo")]
        public async Task<ActionResult> createPhanCongNoiBo(PhanCongNoiBoDto PhanCongNoiBoDto)
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
            ResponseModel1<PhanCongNoiBoDto> create = await _service.PhanCongNoiBo.CreatePhanCongNoiBoAsync(PhanCongNoiBoDto);
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
        [Route("updatePhanCongNoiBo")]
        public async Task<ActionResult> updatePhanCongNoiBo(PhanCongNoiBoDto PhanCongNoiBoDto)
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
            ResponseModel1<PhanCongNoiBoDto> update = await _service.PhanCongNoiBo.UpdatePhanCongNoiBoAsync(PhanCongNoiBoDto);
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
        [Route("deletePhanCongNoiBo")]
        public async Task<ActionResult> deletePhanCongNoiBo(PhanCongNoiBo PhanCongNoiBo)
        {
            var checkExists = await _service.PhanCongNoiBo.FindPhanCongNoiBoAsync(PhanCongNoiBo.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhanCongNoiBo.DeletePhanCongNoiBoAsync(PhanCongNoiBo);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat phan cong noi bo thanh cong");
                    return Ok(PhanCongNoiBo);
                }
                else
                {
                    _logger.LogDebug("Cap nhat phan cong noi bo that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("phan cong noi bo khong ton tai");
                return BadRequest();
            }
        }
    }
}
