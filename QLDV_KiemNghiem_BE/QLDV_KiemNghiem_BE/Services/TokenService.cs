using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.Interfaces;

namespace QLDV_KiemNghiem_BE.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration; 
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
            };

            // Nếu là nhân viên thì sẽ thêm Role để phân quyền
            if(param.Role!= null && param.Role!= "" && !param.IsCustomer)
            {
                claims.Add(new Claim(ClaimTypes.Role, param.Role));
            }
            else // Nếu là khách hàng thì thêm claim này
            {
                claims.Add(new Claim(ClaimTypes.Role, "KH"));
            }

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
    }
}
// Service token tạo ra token để các class khác sử dụng