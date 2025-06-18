using System.Collections.Concurrent;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.HubsRealTime
{
    public class NotificationHub : Hub
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public NotificationHub(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }
        // Tạo từ điển lưu tên các role để khi disconnect sẽ có tên group để xoá
        private static ConcurrentDictionary<string, string> _connectionGroups = new();

        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
        public override async Task OnConnectedAsync()
        {
            var role = _contextAccessor.HttpContext.User.FindFirst(ClaimTypes.Role)?.Value.ToString();
            if (!string.IsNullOrEmpty(role))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, role);
                _connectionGroups[Context.ConnectionId] = role;
            }
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(System.Exception? exception)
        {
            if (_connectionGroups.TryRemove(Context.ConnectionId, out var role))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, role);
            }
            await base.OnDisconnectedAsync(exception);
        }
        public async Task NotifyToAllAsync(string role, NotificationModel notification)
        {
            await Clients.All.SendAsync("notifycation", notification);
        }
        public async Task NotifyToOneGroupAsync(string role, NotificationModel notification)
        {
            await Clients.Group(role).SendAsync("receiveNotification", notification);
        }
    }
}
