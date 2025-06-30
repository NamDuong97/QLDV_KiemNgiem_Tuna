using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.Collections.Concurrent;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace QLDV_KiemNghiem_BE.HubsRealTime
{
    public class NotificationHub : Hub
    {
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
    
        public async Task NotifyToAllAsync(string role, NotificationModel notification)
        {
            await Clients.All.SendAsync("notifycation", notification);
        }
        public async Task NotifyToOneGroupAsync(string role, NotificationModel notification)
        {
            await Clients.Group(role).SendAsync("receiveNotification", notification);
        }
        public async Task SendToUsers(List<string> userIds, NotificationModel noti)
        {
            await Clients.Users(userIds).SendAsync("notificationForPDXPB", noti);
        }

        public async Task SendToUser(string userId, NotificationModel noti)
        {
            await Clients.User(userId).SendAsync("notificationForOneUser", noti);
        }
    }
}
