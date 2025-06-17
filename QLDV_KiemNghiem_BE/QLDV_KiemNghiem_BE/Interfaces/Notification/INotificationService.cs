using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces.Notification
{
    public interface INotificationService
    {
        Task NotifyToOneGroupAsync(string department, NotificationModel notification);
    }
}
