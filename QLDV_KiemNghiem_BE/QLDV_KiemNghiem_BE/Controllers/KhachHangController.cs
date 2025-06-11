using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using Microsoft.AspNetCore.Authorization;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<KhachHangController> _logger;
        private readonly IMapper _mapper;
        public KhachHangController(IServiceManager serviceManager, ILogger<KhachHangController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        [Route("getKhachHangAll")]
        public async Task<ActionResult> getKhachHangAll()
        {
            var result = await _service.KhachHang.GetKhachHangsAllAsync();
            _logger.LogDebug("get toan bo khach hang");
            return Ok(result);
        }

        [HttpGet]
        [Route("getKhachHangByID")]
        public async Task<ActionResult> getKhachHangByID(string maKhachHang)
        {
            var result = await _service.KhachHang.FindKhachHangAsync(maKhachHang);
            _logger.LogDebug("lay khach hang can tim: " + maKhachHang);
            return Ok(result);
        }

        // Action này để sau khi người dùng tạo tk thành công, hệ thống sẽ gửi email để khách hàng bấm vào đường link và xác thực => gọi action này
        [HttpGet]
        [Route("verify-email")]
        public async Task<ActionResult> verifyKhachHang(string token)
        {
            try
            {
                var result = await _service.KhachHang.VerifyKhachHangByTokenAsync(token);
                if(result!= null)
                {
                    return Ok("Xác minh email thành công!");
                }
                else
                {
                    return BadRequest("Xac minh khong thanh cong, vui long kiem tra lai");
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("createKhachHang")]
        public async Task<ActionResult> createKhachHang(KhachHangDto KhachHangDto)
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
            ResponseModel1<KhachHangDto> create = await _service.KhachHang.CreateKhachHangAsync(KhachHangDto);
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

        [HttpPost]
        [Route("loginKhachHang")]
        public async Task<ActionResult> loginKhachHang(LoginDto login)
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
            ResponseModel1<string> checkLogin = await _service.KhachHang.LoginAsync(login);
            if (checkLogin.KetQua)
            {
                _logger.LogDebug(checkLogin.Message);
                return Ok(checkLogin);
            }
            else
            {
                _logger.LogDebug(checkLogin.Message);
                return BadRequest(checkLogin);
            }
        }

        [HttpPut]
        [Route("updateKhachHang")]
        public async Task<ActionResult> updateKhachHang(KhachHangDto KhachHangDto)
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
            ResponseModel1<KhachHangDto> update = await _service.KhachHang.UpdateKhachHangAsync(KhachHangDto);
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
        [Route("deleteKhachHang")]
        public async Task<ActionResult> deleteKhachHang(KhachHang KhachHang)
        {
            var checkExists = await _service.KhachHang.FindKhachHangAsync(KhachHang.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.KhachHang.DeleteKhachHangAsync(KhachHang);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat khach hang thanh cong");
                    return Ok(KhachHang);
                }
                else
                {
                    _logger.LogDebug("Cap nhat khach hang that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("khach hang khong ton tai");
                return BadRequest();
            }
        }
    }
}
