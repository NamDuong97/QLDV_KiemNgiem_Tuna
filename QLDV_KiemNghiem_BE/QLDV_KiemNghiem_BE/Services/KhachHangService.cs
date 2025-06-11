using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.EmailService;
using Org.BouncyCastle.Crypto.Engines;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class KhachHangService : IKhachHangService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public KhachHangService(IRepositoryManager repositoryManager, IMapper mapper, IEmailService emailService, IConfiguration configuration)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _emailService = emailService;
            _configuration = configuration;
        }
        private string GenerateJwtToken(KhachHang khachHang)
        {
            // Lấy key tạo token từ appsetting.json
            var securityKey = _configuration["Jwt:Key"];
            Console.WriteLine($"JWT Key: {securityKey}"); // Kiểm tra trong output
            var formatKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            // Tạo khoá không trùng
            var creadentials = new SigningCredentials(formatKey, SecurityAlgorithms.HmacSha256);

            // Tạo claims lưu những thông tin cơ bản của user để backend xác thực
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, khachHang.MaId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, khachHang.Email.ToString()),
            };

            // Tạo token
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                claims: claims, // Thong tin cua nguoi dung
                expires: DateTime.UtcNow.AddHours(1), // Thoi gian song cua token la 1 tieng
                signingCredentials: creadentials,
                audience: _configuration["Jwt:Audience"]
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public async Task<IEnumerable<KhachHangReturnDto>> GetKhachHangsAllAsync()
        {
            var KhachHangDomains = await _repositoryManager.KhachHang.GetKhachHangsAllAsync();
            var result = _mapper.Map<IEnumerable<KhachHangReturnDto>>(KhachHangDomains);
            return result;
        }
        public async Task<ResponseModel1<string>> LoginAsync(LoginDto login)
        {
            // Kiểm tra email tồn tại
            var khachHang = await _repositoryManager.KhachHang.GetKhacHangByEmailAsync(login.Email, false);
            if (khachHang == null)
            {
                return new ResponseModel1<string>
                {
                    KetQua = false,
                    Message = "Email không tồn tại, vui lòng kiểm tra lại!",
                    Data = null
                };
            } 
            // Kiểm tra pasword, tham số 1 là pass từ client gửi lên, tham số 2 là từ csdl lấy
            if(!BCrypt.Net.BCrypt.Verify(login.Password, khachHang.MatKhau))
            {
                return new ResponseModel1<string>
                {
                    KetQua = false,
                    Message = "Mật khẩu không đúng, vui lòng kiểm tra lại!",
                    Data = null
                };
            }
            // Kiểm tra tài khoản - email đã được verify xác minh chưa
            if (!khachHang.IsEmailVerify)
            {
                return new ResponseModel1<string>
                {
                    KetQua = false,
                    Message = "Tài khoản chưa được xác minh email, vui lòng kiểm tra hộp thư email và xác minh",
                    Data = null
                };
            }
            string token = GenerateJwtToken(khachHang);
            return new ResponseModel1<string>
            {
                KetQua = true,
                Message = "Đăng nhập thành công",
                Data = token
            }; 
        }
        public async Task<KhachHangDto?> FindKhachHangAsync(string maKhachHang)
        {
            if (maKhachHang == null || maKhachHang == "") return null;
            var KhachHangDomain = await _repositoryManager.KhachHang.FindKhachHangAsync(maKhachHang);
            var result = _mapper.Map<KhachHangDto>(KhachHangDomain);
            return result;
        }
        // Sau khi tạo tài khoản => hệ thống gửi email => kh vào email xác thực => gọi action trong controller => controller gọi action này
        public async Task<KhachHangDto?> VerifyKhachHangByTokenAsync(string token)
        {
            var result = await _repositoryManager.KhachHang.GetKhachHangByTokenAsync(token);
            if (result != null)
            {
                // Nếu xác minh thành công thì sẽ tìm thấy entity mới tạo trong CSDL và trả về k null
                // Lúc này cần xoá đi TockenXacMinh để tránh bị người dùng sử dụng lại, và trạng thái IsEmailVerify = true 
                result.TockenXacMinh = null;
                result.IsEmailVerify = true;
            }
            else return null;
            await _repositoryManager.SaveChangesAsync();
            var ketqua = _mapper.Map<KhachHangDto>(result);
            return ketqua ;
        }
        // action này tương đương với đăng ký tài khoản khách hàng
        public async Task<ResponseModel1<KhachHangDto>> CreateKhachHangAsync(KhachHangDto khachHangDto)
        {
            if (khachHangDto == null || khachHangDto.Email == null || khachHangDto.Email == "") return new ResponseModel1<KhachHangDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.KhachHang.FindKhachHangAsync(khachHangDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<KhachHangDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var checkExistsByeMail = await _repositoryManager.KhachHang.CheckExistsEmailAsync(khachHangDto.Email, false);
            if (checkExistsByeMail != null) return new ResponseModel1<KhachHangDto>
            {
                KetQua = false,
                Message = "Email da ton tai, vui long kiem tra lai!",
                Data = null
            };

            // Mã hoá pasword
            khachHangDto.MatKhau = BCrypt.Net.BCrypt.HashPassword(khachHangDto.MatKhau);

            // Tao tocken để xác minh user mới, Uri.EscapeDataString() sẽ mã hóa các ký tự đặc biệt như +, =, /,... để tránh lỗi.
            var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            var encodedToken = Uri.EscapeDataString(token); 

            // Tạo link để xác minh tài khoản mới, gửi qua email cho khách hàng => kh bấm vô url này để gọi api xác minh
            var baseUrl = _configuration["AppSettings:BaseUrl"];
            var verifyUrl = $"{baseUrl}/khachhang/verify-email?token={encodedToken}";

            var KhachHangDomain = _mapper.Map<KhachHang>(khachHangDto);
            KhachHangDomain.MaId = Guid.NewGuid().ToString();
            KhachHangDomain.MaKh = "KH_" + PublicFunction.getTimeSystem();
            KhachHangDomain.NgayTao = DateTime.Now;
            KhachHangDomain.ThanThien = 0; // tài khoản mới tạo sẽ có thân thiện = 0
            KhachHangDomain.NgayHetHanMatKhau = DateTime.Now.AddMonths(3); // thời hạn của mật khẩu là 3 tháng
            KhachHangDomain.TockenXacMinh = token; // gán cho cái token để user gửi lên api xác minh
            KhachHangDomain.IsEmailVerify = false; // Tạo user mới thì defaulte là false => là chưa xác minh email
            _repositoryManager.KhachHang.CreateKhachHangAsync(KhachHangDomain);

            // Tiến hành gửi email cho khách hàng thông báo đã tạo tài khoản thành công
            var emailBody = $@"
                <h1> Welcome to your website </h1>
                <p> Ban da tao tai khoan thanh cong </p>
                <p> Your username is: {KhachHangDomain.Email} </p>
                <a href='{verifyUrl}'>Verify your email</a>";
            await _emailService.SendEmailAsync(khachHangDto.Email, "Dang Ky Thanh Cong, Vui Long Xac Minh Email", emailBody);

            // Luu thông tin khách hàng vào CSDL
            bool check = await _repositoryManager.SaveChangesAsync();
            var KhachHangReturnDto = _mapper.Map<KhachHangDto>(KhachHangDomain);
            return new ResponseModel1<KhachHangDto>
            {
                KetQua = check,
                Message = check ? "Dang ky tai khoan thanh cong!" : "Dang ky tai khoan that bai, vui long thu lai!",
                Data = KhachHangReturnDto
            };
        }
        public async Task<ResponseModel1<KhachHangDto>> UpdateKhachHangAsync(KhachHangDto KhachHangDto)
        {
            if (KhachHangDto == null || KhachHangDto.MaId == null || KhachHangDto.MaId == "") return new ResponseModel1<KhachHangDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var KhachHangCheck = await _repositoryManager.KhachHang.FindKhachHangAsync(KhachHangDto.MaId);
            if (KhachHangCheck == null)
            {
                return new ResponseModel1<KhachHangDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var KhachHangDomain = _mapper.Map<KhachHang>(KhachHangDto);
            KhachHangDomain.NgaySua = DateTime.Now;
            KhachHangDomain.NguoiSua = "admin";
            _repositoryManager.KhachHang.UpdateKhachHangAsync(KhachHangDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var KhachHangReturnDto = _mapper.Map<KhachHangDto>(KhachHangDomain);
            return new ResponseModel1<KhachHangDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = KhachHangReturnDto
            };
        }
        public async Task<bool> DeleteKhachHangAsync(KhachHang KhachHang)
        {
            if (KhachHang == null) return false;
            else
            {
                var KhachHangDomain = await _repositoryManager.KhachHang.FindKhachHangAsync(KhachHang.MaId);
                if (KhachHangDomain == null)
                {
                    return false;
                }
                _repositoryManager.KhachHang.DeleteKhachHangAsync(KhachHangDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
