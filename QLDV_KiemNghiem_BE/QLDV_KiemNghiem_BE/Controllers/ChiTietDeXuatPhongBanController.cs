using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Repositories;
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
        [Route("reviewChiTietPhieuDeXuatPhongBanByPhongKhoa")]
        public async Task<ActionResult> reviewChiTietPhieuDeXuatPhongBanByPhongKhoa(RequestReviewPhieuDeXuatPhongBan duyetPhieu)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var phieuDeXuat = await _service.ChiTietPhieuDeXuatPhongBan.ReviewPhieuDeXuatPhongBanByPhongKhoa(duyetPhieu, user);
            // Tao thong bao gui cho phong KHTH
            if(phieuDeXuat.KetQua) // Lưu thành công rồi mới xem xét gửi thông báo
            {
                if(duyetPhieu.Action)
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
                else
                {
                    NotificationModel notification = new NotificationModel()
                    {
                        Message = duyetPhieu.Message,
                        Title = $"Mau {duyetPhieu.MaMau} da bi tu choi tiep nhan boi nguoi dung {user}",
                        CreatedAt = DateTime.Now,
                    };
                    await _hubContext.Clients.Group("BLD").SendAsync("receiveNotification", notification);
                    // Can them thong bao vao database
                }
            }

            _logger.LogDebug(phieuDeXuat.Message);
            return Ok(phieuDeXuat);
        }

        [HttpPut]
        [Route("reviewChiTietPhieuDeXuatPhongBanByBLD")]
        public async Task<ActionResult> reviewChiTietPhieuDeXuatPhongBanByBLD(RequestReviewPhieuDeXuatPhongBan duyetPhieu)
        {
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var phieuDeXuat = await _service.ChiTietPhieuDeXuatPhongBan.ReviewPhieuDeXuatPhongBanByBLD(duyetPhieu, user);
            
            if (phieuDeXuat.KetQua) 
            {
                NotificationModel noti = new NotificationModel();
                if (duyetPhieu.Action)
                {
                    // Action = true tức là BLD đồng ý cho phòng ban X từ chối mẫu - ChiTietPhieuDeXuatPhongBan
                    // -> KHTH nhận thông báo tạo phân công mới cho phiếu này - mẫu này
                    noti.Title = "BLD chấp nhận lý do từ chối tiếp nhận mẫu từ phòng ban - phân công lại mẫu này";
                    noti.Message = $"Chi tiet phieu de xuat co maid {phieuDeXuat.MaPhieuDeXuat} da bi phong khoa tu choi tiep nhan, BLD da duyet. Vui long phan cong lai!";
                    noti.CreatedAt = DateTime.Now;
                }
                else
                {
                    // Action = fasle tức là BLD không đồng ý cho phòng ban X từ chối mẫu - ChiTietPhieuDeXuatPhongBan
                    // -> Phòng ban x bắt buộc nhận mẫu và kiểm nghiệm
                    noti.Title = "BLD không chấp nhận lý do từ chối tiếp nhận mẫu từ phòng ban";
                    noti.Message = $"Chi tiet phieu de xuat co maid {phieuDeXuat.MaPhieuDeXuat} da bi BLD bac bo tu choi, phong ban tiep tuc lam mau nay";
                    noti.CreatedAt = DateTime.Now;
                }
                await _hubContext.Clients.Group("KHTH").SendAsync("receiveNotification", noti);
                ParamGetUserIdNhanVien nhanVienParam = new ParamGetUserIdNhanVien()
                {
                    MaKhoa = duyetPhieu.MaKhoa,
                    GetLeader = "1",
                    GetEmployee = "0",
                    GetBld = "0"
                };
                var userIds = await _service.NhanVien.GetUserIdOfEmployeeCustom(nhanVienParam);
                foreach (var userId in userIds)
                {
                    await _hubContext.Clients.Group(userId).SendAsync("receiveNotification", noti);
                }
            }
            _logger.LogDebug(phieuDeXuat.Message);
            return Ok(phieuDeXuat);
        }

        [HttpPut]
        [Route("cancelChiTietPhieuDeXuatPhongBansByKHTH")]
        public async Task<ActionResult> cancelChiTietPhieuDeXuatPhongBansByKHTH(CancelChiTietPhieuDeXuatPhongBanRequestDto cancelPhieu)
        {
            // api này để thay đổi trạng thái của toàn bộ các chitietphieudexuatphong ban co mamau ma bi nhan vien huy
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var phieuDeXuat = await _service.ChiTietPhieuDeXuatPhongBan.CancelChiTietPhieuDeXuatPhongBansByKHTH(cancelPhieu, user);

            //if (phieuDeXuat.KetQua)
            //{
            //    NotificationModel noti = new NotificationModel();
            //    if (duyetPhieu.Action)
            //    {
            //        // Action = true tức là BLD đồng ý cho phòng ban X từ chối mẫu - ChiTietPhieuDeXuatPhongBan
            //        // -> KHTH nhận thông báo tạo phân công mới cho phiếu này - mẫu này
            //        noti.Title = "BLD chấp nhận lý do từ chối tiếp nhận mẫu từ phòng ban - phân công lại mẫu này";
            //        noti.Message = $"Chi tiet phieu de xuat co maid {phieuDeXuat.MaPhieuDeXuat} da bi phong khoa tu choi tiep nhan, BLD da duyet. Vui long phan cong lai!";
            //        noti.CreatedAt = DateTime.Now;
            //    }
            //    else
            //    {
            //        // Action = fasle tức là BLD không đồng ý cho phòng ban X từ chối mẫu - ChiTietPhieuDeXuatPhongBan
            //        // -> Phòng ban x bắt buộc nhận mẫu và kiểm nghiệm
            //        noti.Title = "BLD không chấp nhận lý do từ chối tiếp nhận mẫu từ phòng ban";
            //        noti.Message = $"Chi tiet phieu de xuat co maid {phieuDeXuat.MaPhieuDeXuat} da bi BLD bac bo tu choi, phong ban tiep tuc lam mau nay";
            //        noti.CreatedAt = DateTime.Now;
            //    }
            //    await _hubContext.Clients.Group("KHTH").SendAsync("receiveNotification", noti);
            //    ParamGetUserIdNhanVien nhanVienParam = new ParamGetUserIdNhanVien()
            //    {
            //        MaKhoa = duyetPhieu.MaKhoa,
            //        GetLeader = "1",
            //        GetEmployee = "0",
            //        GetBld = "0"
            //    };
            //    var userIds = await _service.NhanVien.GetUserIdOfEmployeeCustom(nhanVienParam);
            //    foreach (var userId in userIds)
            //    {
            //        await _hubContext.Clients.Group(userId).SendAsync("receiveNotification", noti);
            //    }
            //}
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
