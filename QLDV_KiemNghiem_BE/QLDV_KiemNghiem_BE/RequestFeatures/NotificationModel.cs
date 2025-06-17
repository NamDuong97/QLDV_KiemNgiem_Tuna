namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class NotificationModel
    {
        public string Title { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
