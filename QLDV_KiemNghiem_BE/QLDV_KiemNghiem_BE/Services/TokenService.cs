using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.DTO;
using System.Security.Cryptography;
using System.Data;
using Newtonsoft.Json.Linq;
using System.Runtime.Intrinsics.Arm;
using Microsoft.AspNetCore.Identity;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using Org.BouncyCastle.Crypto.Macs;

namespace QLDV_KiemNghiem_BE.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IRepositoryManager _repositoryManager;
        public TokenService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IRepositoryManager repositoryManager)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _repositoryManager = repositoryManager;
        }
       public string GenerateJwtToken(TokenParam param)
       {
            // Lấy key tạo token từ appsetting.json
            var securityKey = _configuration["Jwt:Key"];
            Console.WriteLine($"JWT Key: {securityKey}"); // Kiểm tra trong output
            var formatKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            // Tạo khoá không trùng
            var creadentials = new SigningCredentials(formatKey, SecurityAlgorithms.HmacSha256);

            // Tạo claims lưu những thông tin cơ bản của user để backend xác thực
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, param.ID.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, param.Email),
                new Claim(ClaimTypes.Role, param.Role),
            };

            // Tạo token
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                claims: claims, // Thong tin cua nguoi dung
                expires: DateTime.UtcNow.AddMinutes(2), // Thoi gian song cua token la 1 tieng
                signingCredentials: creadentials,
                audience: _configuration["Jwt:Audience"]
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public string GenerateRefreshToken()
        {
            // Tạo RefresToken
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            //Hàm GetPrincipalFromExpiredToken có nhiệm vụ trích xuất thông tin người dùng(ClaimsPrincipal) từ một access token JWT đã hết hạn.
            //Dù token không còn hợp lệ về mặt thời gian(exp), bạn vẫn có thể lấy được các thông tin bên trong như UserId, Username, Roles
            var jwtSettings = _configuration.GetSection("Jwt");

            // Cấu hình tham số xác thực token
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSettings["Key"].ToString())),
                ValidateLifetime = false,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"]
            };

            //ValidateToken(): Thực hiện giải mã và xác thực token theo các TokenValidationParameters đã cấu hình.
            //Trả về đối tượng ClaimsPrincipal chứa các Claims(ví dụ: tên, id, role...).
            var tokenHandler = new JwtSecurityTokenHandler();
            // securityToken là đối tượng đại diện cho JWT sau khi được giải mã.
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;
            //Kiểm tra: Token có đúng kiểu JWT không.Thuật toán dùng để ký có đúng là HS256 không(HMAC SHA256).
            if (jwtSecurityToken == null ||!jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }
            return principal;
        }
        public async Task<ResponseModel1<TokenDto>> RefreshToken(TokenDto tokenDto)
        {
            // Ham nay chi de tao ra token va refreshToken moi
            TokenDto token = new TokenDto();
            var principal = GetPrincipalFromExpiredToken(tokenDto.AccessToken);
            var userID = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            var email = principal.FindFirst(ClaimTypes.Email)?.Value.ToString();
            var Role = principal.FindFirst(ClaimTypes.Role)?.Value.ToString();

            if(Role == "KH")
            {
                var khach = await _repositoryManager.KhachHang.FindKhachHangAsync(userID);
                if (khach == null || khach.RefreshToken != tokenDto.RefreshToken || khach.RefreshTokenExpiryTime <= DateTime.Now)
                    return new ResponseModel1<TokenDto>
                    {
                        KetQua = false,
                        Message = "RefreshToken khong khop hoac het han, vui long dang nhap lai!",
                    };

                TokenParam param = new TokenParam()
                {
                    ID = userID,
                    Email = email,
                    Role = Role,
                };
                token.AccessToken = GenerateJwtToken(param);
                token.RefreshToken = GenerateRefreshToken();
                khach.RefreshToken = token.RefreshToken;
                // Khong update thoi gian het han, thoi gian het han dung chung cho refreshToken cu va moi, de cu sau 7 ngay thi phai dang nhap
                _repositoryManager.KhachHang.UpdateKhachHangAsync(khach);
            }
            else
            {
                var nhanVien = await _repositoryManager.NhanVien.FindNhanVienAsync(userID);
                if (nhanVien == null || nhanVien.RefreshToken != tokenDto.RefreshToken || nhanVien.RefreshTokenExpiryTime <= DateTime.Now)
                    return new ResponseModel1<TokenDto>
                    {
                        KetQua = false,
                        Message = "RefreshToken khong khop hoac het han, vui long dang nhap lai!",
                    };
                TokenParam param = new TokenParam()
                {
                    ID = userID,
                    Email = email,
                    Role = Role,
                };
                token.AccessToken = GenerateJwtToken(param);
                token.RefreshToken = GenerateRefreshToken();
                nhanVien.RefreshToken = token.RefreshToken;
                // Khong update thoi gian het han, thoi gian het han dung chung cho refreshToken cu va moi, de cu sau 7 ngay thi phai dang nhap
                _repositoryManager.NhanVien.UpdateNhanVienAsync(nhanVien);
            }

            await _repositoryManager.SaveChangesAsync(); //Luu refreshToken vao CSDL
            return  new ResponseModel1<TokenDto>
            {
                KetQua = true,
                Message = "Lay token va refreshToken thanh cong",
                Data = token
            }; 
        } 
    }
}
// Service token tạo ra token để các class khác sử dụng