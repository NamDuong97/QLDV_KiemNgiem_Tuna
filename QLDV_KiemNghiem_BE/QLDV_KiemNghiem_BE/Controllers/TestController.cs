using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public TestController(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationModel dto)
        {
            await _hubContext.Clients.All.SendAsync("notifycation", dto);
            return Ok(new { message = "Notification sent" });
        }

        [HttpPost("receiveNotification")]
        public async Task<IActionResult> SendNotification2([FromBody] NotificationModel dto)
        {
            await _hubContext.Clients.Group("BLD").SendAsync("receiveNotification", dto);
            return Ok(new { message = "receiveNotification sent" });
        }
    }
}
