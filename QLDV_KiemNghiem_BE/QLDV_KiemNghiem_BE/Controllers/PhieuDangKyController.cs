using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System;
using System.Security.Claims;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuDangKyController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDangKyController> _logger;
        private readonly IMapper _mapper;
        private readonly IHubContext<NotificationHub> _hubContext;
        public PhieuDangKyController(IServiceManager serviceManager, ILogger<PhieuDangKyController> logger, IMapper mapper, IHubContext<NotificationHub> hubContext)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _hubContext = hubContext;
        }

        // action này dùng cho nhân viên phòng kế hoạch đầu tư sử dụng để xem
        [HttpGet]
        [Route("getPhieuDangKyAll")]
        public async Task<ActionResult> getPhieuDangKyAll([FromQuery] PhieuDangKyParam phieuDangKyParam)
        {
            if(phieuDangKyParam == null)
            {
                _logger.LogError("Thieu tham so truyen vao");
                return BadRequest("Thieu tham so truyen vao");
            }
            var phieuDangKys = await _service.PhieuDangKy.GetPhieuDangKiesAllAsync(phieuDangKyParam);
            _logger.LogDebug("lay toan bo phieu dang ky");
            return Ok(phieuDangKys);
        }

        [Authorize(Roles = "KHTH")]
        [HttpPut]
        [Route("reviewPhieuDangKyByKHDT")]
        public async Task<ActionResult> reviewPhieuDangKyByKHDT( RequestReviewPhieuDangKy duyetPhieu)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var phieuDangKys = await _service.PhieuDangKy.ReviewPhieuDangKyByKHDT(duyetPhieu);
            // Tao thong bao gui cho phong KHTH
            NotificationModel noti = new NotificationModel()
            {
                Title = "Duyet phieu dang ky boi KHTH",
                Message = phieuDangKys.KetQua ?  $"Phieu dang ky co maid {phieuDangKys.MaPhieuDangKy} duoc duyet thanh cong boi nguoi dung {user}!"
                : $"Phieu dang ky co maid {phieuDangKys.MaPhieuDangKy} da bi tu choi boi nguoi dung {user}!",
                CreatedAt = DateTime.Now,
            };
            await _hubContext.Clients.Group("BLD").SendAsync("receiveNotification", noti);
            _logger.LogDebug(phieuDangKys.Message);
            return Ok(phieuDangKys);
        }

        [Authorize(Roles = "BLD")]
        [HttpPut]
        [Route("reviewPhieuDangKyByBLD")]
        public async Task<ActionResult> reviewPhieuDangKyByBLD(RequestReviewPhieuDangKy duyetPhieu)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var phieuDangKys = await _service.PhieuDangKy.ReviewPhieuDangKyByBLD(duyetPhieu);
            NotificationModel noti = new NotificationModel()
            {
                Title = "Duyet phieu dang ky boi BLD",
                Message = phieuDangKys.KetQua ? $"Phieu dang ky co maid {phieuDangKys.MaPhieuDangKy} duoc duyet thanh cong boi nguoi dung {user}!"
               : $"Phieu dang ky co maid {phieuDangKys.MaPhieuDangKy} da bi tu choi boi nguoi dung {user}!",
                CreatedAt = DateTime.Now,
            };
            await _hubContext.Clients.Group("KHTH").SendAsync("receiveNotification", noti);
            _logger.LogDebug(phieuDangKys.Message);
            return Ok(phieuDangKys);
        }

        // action này dùng để hiển thị phiếu đăng ký cho khách hàng cụ thể
        [HttpGet]
        [Route("getPhieuDangKiesOfCustomer")]
        public async Task<ActionResult> getPhieuDangKiesOfCustomer(string maKH, string maTrangThaiPhieuDangKy)
        {
            var phieuDangKy = await _service.PhieuDangKy.GetPhieuDangKiesOfCustomerAsync(maKH, maTrangThaiPhieuDangKy);
            _logger.LogDebug("lay toan bo phieu dang ky cua khach hang: " + maKH);
            return Ok(phieuDangKy);
        }

        [HttpGet]
        [Route("findPhieuDangKy")]
        public async Task<ActionResult> findPhieuDangKy(string maPhieuDangKy)
        {
            var phieuDangKy = await _service.PhieuDangKy.FindPhieuDangKyAsync(maPhieuDangKy);
            _logger.LogDebug("lay phieu dang ky co ma phieu: " + maPhieuDangKy);
            return Ok(phieuDangKy);
        }

        [HttpPost]
        [Route("createPhieuDangKy")]
        public async Task<ActionResult> createPhieuDangKy(PhieuDangKyDto phieuDangKyDto)
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
            ResponseModel1<PhieuDangKyDto> phieuDangKy = await _service.PhieuDangKy.CreatePhieuDangKyAsync(phieuDangKyDto);
            if (phieuDangKy.KetQua)
            {
                var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
                // Tao thong bao gui cho phong KHTH
                NotificationModel noti = new NotificationModel()
                {
                    Title = "Tao phieu dang ky thanh cong!",
                    Message = $"Phieu dang ky co maid {phieuDangKy.Data.MaId} duoc tao thanh cong boi khach hang {user}, vui long kiem tra va xet duyet",
                    CreatedAt = DateTime.Now,
                };
                await _hubContext.Clients.Group("KHTH").SendAsync("receiveNotification", noti);

                // Them hoa don sau khi them phieu dang ky
                ResponseModel1<HoaDonThuDto> hoaDonThu =  await _service.HoaDonThu.CreateHoaDonThuByPhieuDangKyAsync(phieuDangKy?.Data);
                _logger.LogDebug("Tao phieu dang ky thanh cong");
                return Ok(new { phieuDangKy = phieuDangKy.Data, hoaDon = hoaDonThu.Data});
            }
            else
            {
                _logger.LogDebug("Tao phieu dang ky that bai");
                return BadRequest(phieuDangKy.Message);
            }
        }

        [HttpPut]
        [Route("updatePhieuDangKy")]
        public async Task<ActionResult> updatePhieuDangKy(PhieuDangKyDto phieuDangKyDto)
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

            ResponseModel1<PhieuDangKyDto> phieuDangKy = await _service.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKyDto);
            if (phieuDangKy.KetQua)
            {
                // Cap nhat hoa don sau khi them phieu dang ky
                ResponseModel1<HoaDonThuDto> hoaDonThu = await _service.HoaDonThu.UpdateHoaDonThuByMaPhieuDangKyAsync(phieuDangKy.Data.MaId);
                _logger.LogDebug("Cap nhat phieu dang ky thanh cong");
                return Ok(new { phieuDangKy = phieuDangKy.Data, hoaDon = hoaDonThu.Data });
            }
            else
            {
                _logger.LogDebug("Cap nhat phieu dang ky that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deletePhieuDangKy")]
        public async Task<ActionResult> deletePhieuDangKy(string maPhieuDangKy)
        {
            var checkExists = await _service.PhieuDangKy.CheckExistPhieuDangKyAsync(maPhieuDangKy, false);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuDangKy.DeletePhieuDangKyAsync(checkExists);
                if (delete)
                {
                    _logger.LogDebug("Huy phieu dang ky thanh cong");
                    return Ok(new {message = "Huy phieu dang ky thanh cong" });
                }
                else
                {
                    _logger.LogDebug("Cap nhat phieu dang ky that bai");
                    return BadRequest(new { message = "Huy phieu dang ky that bai, vui long thu lai" });
                }
            }
            else
            {
                _logger.LogDebug("Phieu dang ky khong ton tai");
                return BadRequest(new { message = "Phieu dang ky khong ton tai" });
            }
        }

        [HttpGet]
        [Route("duTinhThoiGianKiemNghiem")]
        public async Task<ActionResult> duTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan)
        {
            int time = await _service.PhieuDangKy.DuTinhThoiGianKiemNghiem(maDmMau, maTieuChuan);
            if (time != 0)
            {
                _logger.LogDebug("Tra ket qua thoi gian du tinh kiem nghiem thanh cong");
                return Ok(new {data = time, message = "Lấy dữ liệu thời gian tiêu chuẩn thành công"});
            }
            else 
            {
                _logger.LogDebug("Ma tieu chuan chua ton tai trong CSDL");
                return BadRequest(new { data = time, message = "Lấy dữ liệu không thành công" });
            }
        }
    }
}
