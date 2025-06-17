using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDeXuatPhongBanService : IPhieuDeXuatPhongBanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PhieuDeXuatPhongBanService(IRepositoryManager repositoryManager, IMapper mapper, DataContext context)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<PhieuDeXuatPhongBanDto>> GetPhieuDeXuatPhongBansAllAsync()
        {
            var PhieuDeXuatPhongBanDomains = await _repositoryManager.PhieuDeXuatPhongBan.GetPhieuDeXuatPhongBansAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuDeXuatPhongBanDto>>(PhieuDeXuatPhongBanDomains);
            return result;
        }
        public async Task<PhieuDeXuatPhongBanDto?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan)
        {
            if (maPhieuDeXuatPhongBan == null || maPhieuDeXuatPhongBan == "") return null;
            var PhieuDeXuatPhongBanDomain = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(maPhieuDeXuatPhongBan, false);
            var result = _mapper.Map<PhieuDeXuatPhongBanDto>(PhieuDeXuatPhongBanDomain);
            return result;
        }
        public async Task<ResponseModel1<PhieuDeXuatPhongBanDto>> CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanRequestCreateDto PhieuDeXuatPhongBanDto, string user)
        {
            List<ChiTietPhieuDeXuatPhongBanDto> chiTietPhieuDeXuatPhongBanDtos = new List<ChiTietPhieuDeXuatPhongBanDto>();
            if (PhieuDeXuatPhongBanDto == null) return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            PhieuDeXuatPhongBan PhieuDeXuatPhongBanDomain = new PhieuDeXuatPhongBan()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPhieuDeXuat = "PDXPB_" + PublicFunction.getTimeSystem(),
                NgayTao = DateTime.Now,
                NguoiTao = user,
                MaPhieuDangKy = PhieuDeXuatPhongBanDto.MaPhieuDangKy,
                TenKhachHang = PhieuDeXuatPhongBanDto.TenKhachHang,
                MaKhoaTiepNhan = PhieuDeXuatPhongBanDto.MaKhoaTiepNhan,
                ManvDeXuat = PhieuDeXuatPhongBanDto.ManvDeXuat,
                ThoiGianGiaoMau = PhieuDeXuatPhongBanDto.ThoiGianGiaoMau,
                TrangThai = $"Đã phân công cho phòng/khoa {PhieuDeXuatPhongBanDto.MaKhoaTiepNhan}"
            };

            foreach (var item in PhieuDeXuatPhongBanDto.ChiTietPhieuDeXuatPhongBans)
            {
                ChiTietPhieuDeXuatPhongBan chiTietPhieuDeXuatPhongBan = new ChiTietPhieuDeXuatPhongBan()
                {
                    MaId = Guid.NewGuid().ToString(),
                    MaPhieuDeXuat = PhieuDeXuatPhongBanDomain.MaId,
                    MaPdkMau = item.MaPdkMau,
                    GhiChu = item.GhiChu,
                    NgayThucHienKiemNghiem = item.NgayThucHienKiemNghiem,
                    TrangThai = item.TrangThai,
                    NgayTao = DateTime.Now,
                    NguoiTao = user
                };

                _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBan);
                var returnData1 = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(chiTietPhieuDeXuatPhongBan);
                chiTietPhieuDeXuatPhongBanDtos.Add(returnData1);
            }

            _repositoryManager.PhieuDeXuatPhongBan.CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDeXuatPhongBanReturnDto = _mapper.Map<PhieuDeXuatPhongBanDto>(PhieuDeXuatPhongBanDomain);
            PhieuDeXuatPhongBanReturnDto.ChiTietPhieuDeXuatPhongBans = chiTietPhieuDeXuatPhongBanDtos;

            return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDeXuatPhongBanDto>> UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanRequestUpdateDto PhieuDeXuatPhongBanDto, string user)
        {
            List<ChiTietPhieuDeXuatPhongBanDto> chiTietPhieuDeXuatPhongBanDtos = new List<ChiTietPhieuDeXuatPhongBanDto>();
            if (PhieuDeXuatPhongBanDto == null || PhieuDeXuatPhongBanDto.MaId == null || PhieuDeXuatPhongBanDto.MaId == "") return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuDeXuatPhongBanCheck = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto.MaId, false);
            if (PhieuDeXuatPhongBanCheck == null)
            {
                return new ResponseModel1<PhieuDeXuatPhongBanDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }

            _mapper.Map(PhieuDeXuatPhongBanDto, PhieuDeXuatPhongBanCheck);
            PhieuDeXuatPhongBanCheck.NgaySua = DateTime.Now;
            PhieuDeXuatPhongBanCheck.NguoiSua = user;

            if (PhieuDeXuatPhongBanDto.ChiTietPhieuDeXuatPhongBans.Count() > 0)
            {
                foreach (var item in PhieuDeXuatPhongBanDto.ChiTietPhieuDeXuatPhongBans)
                {
                    if(item.MaId == null || item.MaId == "")
                    {
                        ChiTietPhieuDeXuatPhongBan chiTiet = new ChiTietPhieuDeXuatPhongBan()
                        {
                            MaId = Guid.NewGuid().ToString(),
                            NgayTao = DateTime.Now,
                            NguoiTao = user
                        };
                        chiTiet = _mapper.Map<ChiTietPhieuDeXuatPhongBan>(item);
                        _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(chiTiet);
                        var returnData = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(chiTiet);
                        // Dùng _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(chiTiet) như này là đang tạo 1 OBJECT mới và ván vào biến returnData
                        // Có thể dẫn tới mất tracking của EF Core dẫn tới double tracking
                        chiTietPhieuDeXuatPhongBanDtos.Add(returnData);
                    }
                    else
                    {
                        var chiTietPhieuDeXuatPhongBanCheck = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(item.MaId, false);
                        if (chiTietPhieuDeXuatPhongBanCheck != null && item.TrangThai == 1)
                        {
                            _mapper.Map(item, chiTietPhieuDeXuatPhongBanCheck);
                            // Dùng hàm map như trên là cách an toàn k tạo ra object mới, cũng k làm mất đi tracking của chiTietPhieuDeXuatPhongBanCheck
                            chiTietPhieuDeXuatPhongBanCheck.NgaySua = DateTime.Now;
                            chiTietPhieuDeXuatPhongBanCheck.NguoiSua = user;
                            _context.ChangeTracker.DetectChanges();
                            Console.WriteLine(_context.ChangeTracker.DebugView.LongView);

                            _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBanCheck);
                            var returnData = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(chiTietPhieuDeXuatPhongBanCheck);
                            chiTietPhieuDeXuatPhongBanDtos.Add(returnData);
                        }
                        else
                        {
                            _repositoryManager.ChiTietPhieuDeXuatPhongBan.DeleteChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBanCheck);
                        }
                    } 
                }
            }

            _repositoryManager.PhieuDeXuatPhongBan.UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDeXuatPhongBanReturnDto = _mapper.Map<PhieuDeXuatPhongBanDto>(PhieuDeXuatPhongBanCheck);
            return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<bool> DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan)
        {
            if (PhieuDeXuatPhongBan == null) return false;
            else
            {
                var PhieuDeXuatPhongBanDomain = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan.MaId, false);
                if (PhieuDeXuatPhongBanDomain == null)
                {
                    return false;
                }
                _repositoryManager.PhieuDeXuatPhongBan.DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
