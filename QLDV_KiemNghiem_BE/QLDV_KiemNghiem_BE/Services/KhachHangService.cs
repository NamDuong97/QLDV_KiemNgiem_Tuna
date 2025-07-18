using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using Org.BouncyCastle.Crypto.Engines;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class KhachHangService : IKhachHangService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IEmailService _emailService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public KhachHangService(IRepositoryManager repositoryManager, IMapper mapper, IEmailService emailService, ITokenService tokenService, IConfiguration configuration)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _emailService = emailService;
            _tokenService = tokenService;
            _configuration = configuration; 
        }
        public async Task<(IEnumerable<KhachHangReturnDto> datas, Pagination pagi)> GetKhachHangsAllAsync(KhachHangParam param, bool tracking)
        {
            var KhachHangDomains = await _repositoryManager.KhachHang.GetKhachHangsAllAsync(param, tracking);
            var result = _mapper.Map<IEnumerable<KhachHangReturnDto>>(KhachHangDomains);
            return (datas: result, pagi: KhachHangDomains.Pagination);
        }
        public async Task<LoginResponse> LoginKhachHangAsync(LoginDto login)
        {
            // Kiểm tra email tồn tại
            var khachHang = await _repositoryManager.KhachHang.GetKhacHangByEmailAsync(login.Email, true);
            if (khachHang == null)
            {
                return new LoginResponse
                {
                    KetQua = false,
                    Message = "Email không tồn tại, vui lòng kiểm tra lại!",
                };
            }
            // Kiểm tra tài khoản - email đã được verify xác minh chưa
            if (khachHang?.IsEmailVerify == false)
            {
                return new LoginResponse
                {
                    KetQua = false,
                    Message = "Tài khoản chưa được xác minh email, vui lòng kiểm tra hộp thư email và xác minh",
                };
            }
            // Kiểm tra pasword, tham số 1 là pass từ client gửi lên, tham số 2 là từ csdl lấy
            if (!BCrypt.Net.BCrypt.Verify(login.Password, khachHang.MatKhau))
            {
                return new LoginResponse
                {
                    KetQua = false,
                    Message = "Mật khẩu không đúng, vui lòng kiểm tra lại!",
                };
            }
            // Kiểm tra pasword đã hết hạn đăng nhập chưa
            if (khachHang.NgayHetHanMatKhau <= DateTime.Now)
            {
                return new LoginResponse
                {
                    KetQua = false,
                    Message = "Mật khẩu đã hết hạn vui lòng thay đổi mật khẩu và đăng nhập lại!",
                };
            }

            TokenParam param = new TokenParam()
            {
                ID = khachHang.MaId,
                Email = khachHang.Email,
                Role = "KH"
            };
            string token = _tokenService.GenerateJwtToken(param);
            string refreshToken = _tokenService.GenerateRefreshToken();
            khachHang.RefreshToken = refreshToken;
            khachHang.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await _repositoryManager.SaveChangesAsync();    

            return new LoginResponse
            {
                KetQua = true,
                Message = "Đăng nhập thành công",
                Token = token,
                RefreshToken = refreshToken
            }; 
        }
        public async Task<ResponseModel1<TokenDto>> GetRefreshTokenForKhachHang(TokenDto token)
        {
            return  await _tokenService.RefreshToken(token);
        }
        public async Task<KhachHangDto?> FindKhachHangByNhanVienAsync(string maKhachHang)
        {
            if (maKhachHang == null || maKhachHang == "") return null;
            var KhachHangDomain = await _repositoryManager.KhachHang.FindKhachHangAsync(maKhachHang);
            var result = _mapper.Map<KhachHangDto>(KhachHangDomain);
            return result;
        }
        public async Task<ResponseModel1<KhachHangReturnClientDto?>> FindKhachHangBySeflAsync(string maKhachHang)
        {
            if (maKhachHang == null || maKhachHang == "") return new ResponseModel1<KhachHangReturnClientDto?>
            {
                KetQua = false,
                Message = "Ma khach hang trong hoac null, vui long kiem tra lai!",
                Data = null
            }; 
            var KhachHangDomain = await _repositoryManager.KhachHang.FindKhachHangAsync(maKhachHang);
            var result = _mapper.Map<KhachHangReturnClientDto>(KhachHangDomain);
            bool kq = KhachHangDomain != null ? true : false;
            return new ResponseModel1<KhachHangReturnClientDto?>
            {
                KetQua = kq,
                Message = kq ? "Lay thong tin khach hang thanh cong!": "Lay thong tin khach hang that bai, vui long thu lai!",
                Data = result
            }; 
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
        public async Task<ResponseModel1<string>> ForgetPasswordAsync(string email)
        {
            var khachHang = await _repositoryManager.KhachHang.GetKhacHangByEmailAsync(email, true);
            if(khachHang == null)
            {
                return new ResponseModel1<string>
                {
                    KetQua = false,
                    Message = "Email not exists, please check again",
                    Data = "Email dang nhap khong ton tai, vui long kiem tra lai",
                };
            }
            
            var tokenResetPassoword = PublicFunction.GenerateResetPassword();
            // Mã hoá pasword
            khachHang.MatKhau = BCrypt.Net.BCrypt.HashPassword(tokenResetPassoword);
            khachHang.NgaySuaMatKhau = DateTime.Now;
            khachHang.NgayHetHanMatKhau = DateTime.Now.AddDays(3);
            await _repositoryManager.SaveChangesAsync();

            var body = $@"
            <div style='font-family:Arial,sans-serif; font-size:16px; color:#333;'>
                <p>Xin chào,</p>
                <p>
                    Đây là mật khẩu đăng nhập mới của bạn: 
                    <strong style='color:#d9534f;'>{tokenResetPassoword}</strong>
                </p>
                <p>
                    Mật khẩu này sẽ <strong>hết hạn trong 3 ngày</strong>. Vui lòng đăng nhập và thay đổi mật khẩu trong giao diện quản lý tài khoản để bảo mật thông tin của bạn.
                </p>
                <p>
                    Truy cập: 
                    <a href='http://localhost:5175/' style='color:#0275d8;'>Trang Chủ</a>
                </p>
                <p>Trân trọng,<br>Hệ thống QLDV Kiểm nghiệm</p>
            </div>";

            await _emailService.SendEmailAsync(email, "Reset Password", body);
            return new ResponseModel1<string>
            {
                KetQua = true,
                Message = "Sucessfully",
                Data = "Mat khau moi da duoc gui vao email cua ban, vui long kiem tra email",
            };
        }
        public async Task<ResponseModel1<KhachHangDto>> ChangePasswordAsync(ResetPasswordRequestDto pass)
        {
            var checkExists = await _repositoryManager.KhachHang.FindKhachHangAsync(pass.MaId);
            if(checkExists == null)
            {
                return new ResponseModel1<KhachHangDto>
                {
                    KetQua = false,
                    Message = "Nguoi dung khong ton tai, vui long kiem tra lai!",
                };
            }
            checkExists.MatKhau = BCrypt.Net.BCrypt.HashPassword(pass.Password);
            checkExists.NgaySuaMatKhau = DateTime.Now;
            checkExists.NgayHetHanMatKhau = DateTime.Now.AddMonths(3);
            checkExists.NgaySua = DateTime.Now;
            checkExists.NguoiSua = "admin";
            _repositoryManager.KhachHang.UpdateKhachHangAsync(checkExists);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<KhachHangDto>(checkExists);
            return new ResponseModel1<KhachHangDto>
            {
                KetQua = check,
                Message = check ? "Doi mat khau thanh cong" : "Doi mat khau that bai",
                Data = dataReturn
            };
        }
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
            KhachHangDomain.NguoiTao = khachHangDto.Email;
            KhachHangDomain.NgayTao = DateTime.Now;
            KhachHangDomain.ThanThien = 0; // tài khoản mới tạo sẽ có thân thiện = 0
            KhachHangDomain.NgayHetHanMatKhau = DateTime.Now.AddMonths(3); // thời hạn của mật khẩu là 3 tháng
            KhachHangDomain.TockenXacMinh = token; // gán cho cái token để user gửi lên api xác minh
            KhachHangDomain.IsEmailVerify = false; // Tạo user mới thì defaulte là false => là chưa xác minh email
            _repositoryManager.KhachHang.CreateKhachHangAsync(KhachHangDomain);

            // Tiến hành gửi email cho khách hàng thông báo đã tạo tài khoản thành công
            var emailBody = $@"
            <div style='font-family:Arial,sans-serif; font-size:16px; color:#333; line-height:1.6;'>
                <h2 style='color:#2c3e50;'>Chào mừng bạn đến với hệ thống Kiểm nghiệm Tuna!</h2>
    
                <p>Xin chúc mừng, bạn đã tạo tài khoản thành công.</p>
    
                <p>
                    <strong>Email đăng nhập:</strong> {KhachHangDomain.Email}<br />
                    Để hoàn tất quá trình đăng ký, vui lòng xác minh địa chỉ email của bạn bằng cách nhấn vào liên kết bên dưới:
                </p>

                <p style='margin:20px 0;'>
                    <a href='{verifyUrl}' style='background-color:#28a745; color:white; padding:12px 24px; text-decoration:none; border-radius:5px; font-weight:bold;'>
                        Xác minh email ngay
                    </a>
                </p>

                <p style='color:#999; font-size:14px;'>
                    Nếu bạn không đăng ký tài khoản tại hệ thống của chúng tôi, vui lòng bỏ qua email này.
                </p>

                <p>Trân trọng,<br>Đội ngũ hỗ trợ QLDV Kiểm nghiệm</p>
            </div>";
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
        public async Task<ResponseModel1<KhachHangDto>> UpdateKhachHangAsync(KhachHangRequestDto KhachHangDto, string user)
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
            KhachHangCheck.NgaySua = DateTime.Now;
            KhachHangCheck.NguoiSua = user;

            _mapper.Map(KhachHangDto, KhachHangCheck);
            _repositoryManager.KhachHang.UpdateKhachHangAsync(KhachHangCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var KhachHangReturnDto = _mapper.Map<KhachHangDto>(KhachHangCheck);
            return new ResponseModel1<KhachHangDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = KhachHangReturnDto
            };
        }
        public async Task<bool> DeleteKhachHangAsync(string maKhachHang, string user)
        {
            if (maKhachHang == null) return false;
            else
            {
                var KhachHangDomain = await _repositoryManager.KhachHang.FindKhachHangAsync(maKhachHang);
                if (KhachHangDomain == null)
                {
                    return false;
                }
                KhachHangDomain.TrangThai = false;
                KhachHangDomain.NgaySua = DateTime.Now;
                KhachHangDomain.NguoiSua = user;
                _repositoryManager.KhachHang.UpdateKhachHangAsync(KhachHangDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
