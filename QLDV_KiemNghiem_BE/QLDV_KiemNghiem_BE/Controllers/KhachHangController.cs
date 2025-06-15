using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using Microsoft.AspNetCore.Authorization;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Text.Json;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using System.Security.Claims;

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

        [Authorize(Roles = "BLD,KYT,KHTH")]
        [HttpGet]
        [Route("getKhachHangAll")]
        public async Task<ActionResult> getKhachHangAll(KhachHangParam param)
        {
            var result = await _service.KhachHang.GetKhachHangsAllAsync(param, false);
            Response.Headers.Append("X-Pagination", JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo khach hang");
            return Ok(result.datas);
        }

        [Authorize(Roles = "BLD,KYT,KHTH")]
        [HttpGet]
        [Route("getKhachHangByID")]
        public async Task<ActionResult> getKhachHangByID(string maKhachHang)
        {
            var result = await _service.KhachHang.FindKhachHangByNhanVienAsync(maKhachHang);
            _logger.LogDebug("lay khach hang can tim: " + maKhachHang);
            return Ok(result);
        }

        [Authorize(Roles = "KH")]
        [HttpGet] 
        [Route("getInfoKhachHang")]
        public async Task<ActionResult> getInfoKhachHang()
        {
            try
            {
                var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var khachhang = await _service.KhachHang.FindKhachHangBySeflAsync(userID);
                if (khachhang != null)
                {
                    return Ok(khachhang);
                }
                else
                {
                    return BadRequest(khachhang);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      
        [HttpPost]
        [Route("getRefreshToken")]
        public async Task<ActionResult> getRefreshToken( TokenDto tokenDto)
        {
            try
            {
                ResponseModel1<TokenDto> token = await _service.KhachHang.GetRefreshTokenForKhachHang(tokenDto);
                if (token.KetQua)
                {
                    return Ok(token);
                }
                else
                {
                    return BadRequest(token);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

        [HttpPost]
        [Route("forgetPassword")]
        public async Task<ActionResult> forgetPassword(string email)
        {
            try
            {
                ResponseModel1<string> result = await _service.KhachHang.ForgetPasswordAsync(email);
                if (result.KetQua)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

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
            LoginResponse checkLogin = await _service.KhachHang.LoginKhachHangAsync(login);
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

        [Authorize(Roles = "BLD,KYT,KHTH")]
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

        [Authorize(Roles = "BLD,KYT,KHTH")]
        [HttpDelete]
        [Route("deleteKhachHang")]
        public async Task<ActionResult> deleteKhachHang(KhachHang KhachHang)
        {
            var checkExists = await _service.KhachHang.FindKhachHangByNhanVienAsync(KhachHang.MaId);
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
