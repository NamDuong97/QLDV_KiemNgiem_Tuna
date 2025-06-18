using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace QLDV_KiemNghiem_BE.Hubs
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public string? GetUserId(HubConnectionContext connection)
        { 
            var userId = connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                Console.WriteLine("UserId is missing in JWT.");
                return null;
            }

            return userId;
        }
    }
}
// File này để config để ánh xạ userId từ JWT sang cho Hub, gửi thông báo từ server SignalR đến một hoặc nhiều người dùng cụ thể dựa trên userId.
// Mapping từ connectedID sang userid