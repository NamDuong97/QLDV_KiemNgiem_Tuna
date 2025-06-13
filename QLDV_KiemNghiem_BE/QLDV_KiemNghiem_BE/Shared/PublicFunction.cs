using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.IdentityModel.Tokens;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE
{
    public static class PublicFunction
    {
        public static string getTimeSystem()
        {
           return DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();  
        }

        public static string processString(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return string.Empty;
            // Chuẩn hóa chuỗi, chuyển về dạng decomposed (ký tự + dấu)
            string normalized = input.Normalize(NormalizationForm.FormD);
            // Loại bỏ các dấu (chỉ giữ lại ký tự base)
            StringBuilder sb = new StringBuilder();
            foreach (char c in normalized)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    sb.Append(c);
            }
            // Chuyển về dạng thường, loại bỏ khoảng trắng và ký tự đặc biệt nếu cần
            string result = sb.ToString().Normalize(NormalizationForm.FormC).ToLowerInvariant();
            // Loại bỏ khoảng trắng và ký tự không phải chữ cái/số nếu muốn "sạch"
            result = Regex.Replace(result, @"[^a-z0-9]", "");
            return result;
        }

        public static string GenerateResetPassword(int length = 12)
        {
            const string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string lower = "abcdefghijklmnopqrstuvwxyz";
            const string digits = "0123456789";
            const string special = "!@#$%^&*()-_=+<>?";

            string allChars = upper + lower + digits + special;
            Random rand = new Random();

            // Đảm bảo có ít nhất 1 ký tự từ mỗi nhóm
            char[] password = new char[length];
            password[0] = upper[rand.Next(upper.Length)];
            password[1] = lower[rand.Next(lower.Length)];
            password[2] = digits[rand.Next(digits.Length)];
            password[3] = special[rand.Next(special.Length)];

            for (int i = 4; i < length; i++)
            {
                password[i] = allChars[rand.Next(allChars.Length)];
            }

            // Shuffle để mật khẩu không luôn có định dạng predictable (chữ hoa, thường, số, đặc biệt)
            return new string(password.OrderBy(x => rand.Next()).ToArray());
        }

    }
}
// Chứa các hàm thường được sử dụng