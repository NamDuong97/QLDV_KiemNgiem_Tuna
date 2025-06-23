using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class NhanVienService : INhanVienService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public NhanVienService(IRepositoryManager repositoryManager, IMapper mapper, ITokenService tokenService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }
        public async Task<(IEnumerable<NhanVienDto> datas, Pagination pagi)> GetNhanViensAllAsync(NhanVienParam nhanVienParam, bool tracking)
        {
            var NhanVienDomains = await _repositoryManager.NhanVien.GetNhanViensAllAsync(nhanVienParam, tracking);
            var result = _mapper.Map<IEnumerable<NhanVienDto>>(NhanVienDomains);

            return (datas: result, pagi: NhanVienDomains.Pagination);
        }
        public async Task<LoginResponse> LoginNhanVienAsync(LoginDto login)
        {
            // Kiểm tra email tồn tại
            var nhanVien = await _repositoryManager.NhanVien.GetNhanVienByEmailAsync(login.Email, true);
            if (nhanVien == null)
            {
                return new LoginResponse
                {
                    KetQua = false,
                    Message = "Email không tồn tại, vui lòng kiểm tra lại!",
                };
            }
            // Kiểm tra pasword, tham số 1 là pass từ client gửi lên, tham số 2 là từ csdl lấy
            if (!BCrypt.Net.BCrypt.Verify(login.Password, nhanVien.MatKhau))
            {
                return new LoginResponse
                {
                    KetQua = false,
                    Message = "Mật khẩu không đúng, vui lòng kiểm tra lại!",
                };
            }
            TokenParam param = new TokenParam()
            {
                ID = nhanVien.MaId,
                Email = nhanVien.EmailCaNhan,
                Role = nhanVien.MaLoaiTk,
                MaChucVu = nhanVien.MaChucVu,
                MaKhoa = nhanVien.MaKhoa
            };
            string token = _tokenService.GenerateJwtToken(param);
            string refreshToken = _tokenService.GenerateRefreshToken();
            nhanVien.RefreshToken = refreshToken;
            nhanVien.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await _repositoryManager.SaveChangesAsync();

            return new LoginResponse
            {
                KetQua = true,
                Message = "Đăng nhập thành công",
                Token = token,
                RefreshToken = refreshToken,
                MaId = nhanVien.MaId
            };
        }
        public async Task<ResponseModel1<TokenDto>> GetRefreshTokenForNhanVien(TokenDto token)
        {
            return await _tokenService.RefreshToken(token);
        }
        public async Task<NhanVienDto?> FindNhanVienAsync(string maNhanVien)
        {
            if (maNhanVien == null || maNhanVien == "") return null;
            var NhanVienDomain = await _repositoryManager.NhanVien.FindNhanVienAsync(maNhanVien);
            var result = _mapper.Map<NhanVienDto>(NhanVienDomain);
            return result;
        }
        public async Task<List<string>> GetUserIdOfEmployeeCustom(ParamGetUserIdNhanVien nhanVienParam)
        {
            var result = await _repositoryManager.NhanVien.GetUserIdOfEmployeeCustom(nhanVienParam);
            return result;
        }
        public async Task<ResponseModel1<NhanVienDto>> CreateNhanVienAsync(NhanVienDto NhanVienDto)
        {
            if (NhanVienDto == null) return new ResponseModel1<NhanVienDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.NhanVien.FindNhanVienAsync(NhanVienDto.MaId);
            if (checkExistsByID != null) return new ResponseModel1<NhanVienDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var NhanVienDomain = _mapper.Map<NhanVien>(NhanVienDto);
            NhanVienDomain.MaId = Guid.NewGuid().ToString();
            NhanVienDomain.NgayTao = DateTime.Now;
            NhanVienDomain.NgayHetHanMatKhau = DateTime.Now.AddMonths(3); // thời hạn của mật khẩu là 3 tháng
            _repositoryManager.NhanVien.CreateNhanVienAsync(NhanVienDomain);

            bool check = await _repositoryManager.SaveChangesAsync();
            var NhanVienReturnDto = _mapper.Map<NhanVienDto>(NhanVienDomain);
            return new ResponseModel1<NhanVienDto>
            {
                KetQua = check,
                Message = check ? "Them nhan vien thanh cong!" : "Them nhan vien that bai, vui long thu lai!",
                Data = NhanVienReturnDto
            };
        }
        public async Task<ResponseModel1<NhanVienDto>> UpdateNhanVienAsync(NhanVienDto NhanVienDto)
        {
            if (NhanVienDto == null || NhanVienDto.MaId == null || NhanVienDto.MaId == "") return new ResponseModel1<NhanVienDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var NhanVienCheck = await _repositoryManager.NhanVien.FindNhanVienAsync(NhanVienDto.MaId);
            if (NhanVienCheck == null)
            {
                return new ResponseModel1<NhanVienDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var NhanVienDomain = _mapper.Map<NhanVien>(NhanVienDto);
            NhanVienDomain.NgaySua = DateTime.Now;
            NhanVienDomain.NguoiSua = "admin";
            _repositoryManager.NhanVien.UpdateNhanVienAsync(NhanVienDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var NhanVienReturnDto = _mapper.Map<NhanVienDto>(NhanVienDomain);
            return new ResponseModel1<NhanVienDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = NhanVienReturnDto
            };
        }
        public async Task<bool> DeleteNhanVienAsync(NhanVien NhanVien)
        {
            if (NhanVien == null) return false;
            else
            {
                var NhanVienDomain = await _repositoryManager.NhanVien.FindNhanVienAsync(NhanVien.MaId);
                if (NhanVienDomain == null)
                {
                    return false;
                }
                _repositoryManager.NhanVien.DeleteNhanVienAsync(NhanVienDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
