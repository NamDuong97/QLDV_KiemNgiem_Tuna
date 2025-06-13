namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
}
