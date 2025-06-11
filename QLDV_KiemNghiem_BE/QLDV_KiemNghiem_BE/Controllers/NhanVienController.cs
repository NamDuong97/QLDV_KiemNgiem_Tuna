using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<NhanVienController> _logger;
        private readonly IMapper _mapper;
        public NhanVienController(IServiceManager serviceManager, ILogger<NhanVienController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getNhanVienAll")]
        public async Task<ActionResult> getNhanVienAll(NhanVienParam nhanVienParam)
        {
            var result = await _service.NhanVien.GetNhanViensAllAsync(nhanVienParam, false);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo nhan vien");
            return Ok(result.employees);
        }

        [HttpGet]
        [Route("getNhanVienByID")]
        public async Task<ActionResult> getNhanVienByID(string maNhanVien)
        {
            var result = await _service.NhanVien.FindNhanVienAsync(maNhanVien);
            _logger.LogDebug("lay nhan vien can tim: " + maNhanVien);
            return Ok(result);
        }

        [HttpPost]
        [Route("createNhanVien")]
        public async Task<ActionResult> createNhanVien(NhanVienDto NhanVienDto)
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
            ResponseModel1<NhanVienDto> create = await _service.NhanVien.CreateNhanVienAsync(NhanVienDto);
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
        [Route("updateNhanVien")]
        public async Task<ActionResult> updateNhanVien(NhanVienDto NhanVienDto)
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
            ResponseModel1<NhanVienDto> update = await _service.NhanVien.UpdateNhanVienAsync(NhanVienDto);
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
        [Route("deleteNhanVien")]
        public async Task<ActionResult> deleteNhanVien(NhanVien NhanVien)
        {
            var checkExists = await _service.NhanVien.FindNhanVienAsync(NhanVien.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.NhanVien.DeleteNhanVienAsync(NhanVien);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat nhan vien thanh cong");
                    return Ok(NhanVien);
                }
                else
                {
                    _logger.LogDebug("Cap nhat nhan vien that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("nhan vien khong ton tai");
                return BadRequest();
            }
        }
    }
}
