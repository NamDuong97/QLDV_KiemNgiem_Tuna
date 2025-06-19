using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Security.Claims;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietPhieuDeXuatPhongBanController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<ChiTietPhieuDeXuatPhongBanController> _logger;
        private readonly IMapper _mapper;
        private readonly IHubContext<NotificationHub> _hubContext;
        public ChiTietPhieuDeXuatPhongBanController(IServiceManager serviceManager, ILogger<ChiTietPhieuDeXuatPhongBanController> logger, IMapper mapper, IHubContext<NotificationHub> hubContext)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _hubContext = hubContext;
        }

        [HttpGet]
        [Route("getChiTietPhieuDeXuatPhongBanAll")]
        public async Task<ActionResult> getChiTietPhieuDeXuatPhongBanAll()
        {
            var result = await _service.ChiTietPhieuDeXuatPhongBan.GetChiTietPhieuDeXuatPhongBansAllAsync();
            _logger.LogDebug("get toan bo chi tiet phieu de xuat phong ban");
            return Ok(result);
        }

        [HttpPut]
        [Route("reviewPhieuDeXuatPhongBanByPhongKhoa")]
        public async Task<ActionResult> reviewPhieuDeXuatPhongBanByPhongKhoa(RequestReviewPhieuDeXuatPhongBan duyetPhieu)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var phieuDeXuat = await _service.ChiTietPhieuDeXuatPhongBan.ReviewPhieuDeXuatPhongBanByPhongKhoa(duyetPhieu, user);
            // Tao thong bao gui cho phong KHTH
            if(phieuDeXuat.KetQua) // Lưu thành công rồi mới xem xét gửi thông báo
            {
                NotificationModel noti = new NotificationModel()
                {
                    Title = "Lanh dao phong/khoa duyet phieu de xuat kiem nghiem phong ban",
                    Message = duyetPhieu.Action ? $"Chi tiet phieu de xuat co maid {phieuDeXuat.MaPhieuDeXuat} duoc duyet thanh cong boi nguoi dung {user}!"
                : $"Chi tiet phieu de xuat co maid {phieuDeXuat.MaPhieuDeXuat} da bi tu choi boi nguoi dung {user}!",
                    CreatedAt = DateTime.Now,
                };
                await _hubContext.Clients.Group("KHTH").SendAsync("receiveNotification", noti);
            }
            
            _logger.LogDebug(phieuDeXuat.Message);
            return Ok(phieuDeXuat);
        }

        [HttpGet]
        [Route("getChiTietPhieuDeXuatPhongBanByID")]
        public async Task<ActionResult> getChiTietPhieuDeXuatPhongBanByID(string maChiTietPhieuDeXuatPhongBan)
        {
            var result = await _service.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(maChiTietPhieuDeXuatPhongBan);
            _logger.LogDebug("lay chi tiet phieu de xuat phong ban can tim: " + maChiTietPhieuDeXuatPhongBan);
            return Ok(result);
        }

        [HttpPost]
        [Route("createChiTietPhieuDeXuatPhongBan")]
        public async Task<ActionResult> createChiTietPhieuDeXuatPhongBan(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto)
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
            ResponseModel1<ChiTietPhieuDeXuatPhongBanDto> create = await _service.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto);
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
        [Route("updateChiTietPhieuDeXuatPhongBan")]
        public async Task<ActionResult> updateChiTietPhieuDeXuatPhongBan(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto)
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
            ResponseModel1<ChiTietPhieuDeXuatPhongBanDto> update = await _service.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto);
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
        [Route("deleteChiTietPhieuDeXuatPhongBan")]
        public async Task<ActionResult> deleteChiTietPhieuDeXuatPhongBan(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            var checkExists = await _service.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.ChiTietPhieuDeXuatPhongBan.DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat chi tiet phieu de xuat phong ban thanh cong");
                    return Ok(ChiTietPhieuDeXuatPhongBan);
                }
                else
                {
                    _logger.LogDebug("Cap nhat chi tiet phieu de xuat phong ban that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("chi tiet phieu de xuat phong ban khong ton tai");
                return BadRequest();
            }
        }
    }
}
