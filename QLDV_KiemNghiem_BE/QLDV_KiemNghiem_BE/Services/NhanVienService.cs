using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.EmailService;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.PublicFunc;

namespace QLDV_KiemNghiem_BE.Services
{
    public class NhanVienService : INhanVienService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        public NhanVienService(IRepositoryManager repositoryManager, IMapper mapper, IEmailService emailService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _emailService = emailService;
        }
        public async Task<(IEnumerable<NhanVienDto> employees, Pagination pagi)> GetNhanViensAllAsync(NhanVienParam nhanVienParam, bool tracking)
        {
            var NhanVienDomains = await _repositoryManager.NhanVien.GetNhanViensAllAsync(nhanVienParam, tracking);
            var result = _mapper.Map<IEnumerable<NhanVienDto>>(NhanVienDomains);

            return (employees: result, pagi: NhanVienDomains.Pagination);
        }
        public async Task<NhanVienDto?> FindNhanVienAsync(string maNhanVien)
        {
            if (maNhanVien == null || maNhanVien == "") return null;
            var NhanVienDomain = await _repositoryManager.NhanVien.FindNhanVienAsync(maNhanVien);
            var result = _mapper.Map<NhanVienDto>(NhanVienDomain);
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
            _repositoryManager.NhanVien.CreateNhanVienAsync(NhanVienDomain);

            // Send mail for user
            var emailBody = $@"
                <h1> Welcome to your website </h1>
                <p> Ban da tao tai khoan thanh cong </p>
            ";
            await _emailService.SendEmailAsync(NhanVienDto.EmailCaNhan, "Dang Ky Thanh Cong", emailBody);

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
