using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;
using Org.BouncyCastle.Pqc.Crypto.Lms;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces.Notification;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationService(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task NotifyToOneGroupAsync(string role, NotificationModel notification)
        {
            await _hubContext.Clients.Group(role).SendAsync("ReciveNotification", notification);
        }
        public async Task NotifyToManyGroupAsync(List<string> roles, NotificationModel notification)
        {
            foreach(var role in roles)
            {
                await _hubContext.Clients.Group(role).SendAsync("ReciveNotification", notification);
            }
        }
    }
}
