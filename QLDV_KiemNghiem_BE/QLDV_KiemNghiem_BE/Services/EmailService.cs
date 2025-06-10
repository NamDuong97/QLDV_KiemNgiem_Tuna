using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using QLDV_KiemNghiem_BE.Interfaces.EmailService;

namespace QLDV_KiemNghiem_BE.Services
{
    public class EmailService : IEmailService
    {
        // Đây là biến load các biến môi trường từ file appsetting.json
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            // Tạo email mime
            var email = new MimeMessage();
            // Cài đặt thông tin người gửi from 
            email.From.Add(MailboxAddress.Parse(_configuration["EmailSettings:From"]));
            // Cài đặt thông tin người nhận to 
            email.To.Add(MailboxAddress.Parse(to));
            // Cài đặt chủ đề
            email.Subject = subject;
            // Cài đặt nội dung email
            var builder = new BodyBuilder()
            {
                HtmlBody = body,
            };
            email.Body = builder.ToMessageBody();
            // Cài đặt SMTP client
            var smtpClient =  new SmtpClient();
            // Kết nối với server Smtp của gmail 
            await smtpClient.ConnectAsync(_configuration["EmailSettings:SmtpServer"],
                int.Parse(_configuration["EmailSettings:Port"]),
                SecureSocketOptions.StartTls);
            // Xac thuc nguoi dung dung tk va mat khau
            await smtpClient.AuthenticateAsync(_configuration["EmailSettings:Username"], _configuration["EmailSettings:Password"]);
            // Gửi email thôi
            await smtpClient.SendAsync(email);
            // Ngắt kết nối
            await smtpClient.DisconnectAsync(true);
        }
    }
}
