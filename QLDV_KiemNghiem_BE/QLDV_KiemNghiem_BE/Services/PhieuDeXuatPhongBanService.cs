using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using StackExchange.Redis;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDeXuatPhongBanService : IPhieuDeXuatPhongBanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;
        public PhieuDeXuatPhongBanService(IRepositoryManager repositoryManager, IMapper mapper, DataContext context, IHubContext<NotificationHub> hubContext)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
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
            NotificationModel noti = new NotificationModel();
            string listMau = "";
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
                MaKhoaTiepNhan = PhieuDeXuatPhongBanDto.MaKhoaTiepNhan,
                ManvDeXuat = PhieuDeXuatPhongBanDto.ManvDeXuat,
                ThoiGianGiaoMau = PhieuDeXuatPhongBanDto.ThoiGianGiaoMau,
                TrangThai = 2
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
                    TrangThai = 2,
                };
                listMau += item.MaPdkMau + " ";

                _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBan);
                var returnData1 = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(chiTietPhieuDeXuatPhongBan);
                chiTietPhieuDeXuatPhongBanDtos.Add(returnData1);
            }

            _repositoryManager.PhieuDeXuatPhongBan.CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            // Tạo phiếu phân công phòng ban thành công thì mới gửi thông báo
            if (check)
            {
                noti.Title = "Phan cong kiem nghiem cho phong/khoa";
                noti.Message = $"Phong khoa {PhieuDeXuatPhongBanDto.MaKhoaTiepNhan} da duoc phan cong kiem nghiem mau {listMau}, vui long kiem tra va xet duyet";
                noti.CreatedAt = DateTime.Now;
                ParamGetUserIdNhanVien nhanVienParam = new ParamGetUserIdNhanVien()
                {
                    MaKhoa = PhieuDeXuatPhongBanDto.MaKhoaTiepNhan,
                    GetLeader = "1",
                    GetEmployee = "0",
                    GetBld = "0"
                };
                var userIds =  await _repositoryManager.NhanVien.GetUserIdOfEmployeeCustom(nhanVienParam);
                foreach (var userId in userIds)
                {
                    await _hubContext.Clients.Group(userId).SendAsync("receiveNotification", noti);
                }
            }
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

            var PhieuDeXuatPhongBanCheck = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto.MaId, true);
            if (PhieuDeXuatPhongBanCheck == null)
            {
                return new ResponseModel1<PhieuDeXuatPhongBanDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }

            PhieuDeXuatPhongBanCheck.MaPhieuDeXuat = !string.IsNullOrEmpty(PhieuDeXuatPhongBanDto.MaPhieuDeXuat) ? PhieuDeXuatPhongBanDto.MaPhieuDeXuat : PhieuDeXuatPhongBanCheck.MaPhieuDeXuat;
            PhieuDeXuatPhongBanCheck.MaKhoaTiepNhan = !string.IsNullOrEmpty(PhieuDeXuatPhongBanDto.MaKhoaTiepNhan) ? PhieuDeXuatPhongBanDto.MaKhoaTiepNhan : PhieuDeXuatPhongBanCheck.MaKhoaTiepNhan;
            PhieuDeXuatPhongBanCheck.ManvDeXuat = !string.IsNullOrEmpty(PhieuDeXuatPhongBanDto.ManvDeXuat) ? PhieuDeXuatPhongBanDto.ManvDeXuat : PhieuDeXuatPhongBanCheck.ManvDeXuat;
            PhieuDeXuatPhongBanCheck.ManvTiepNhan = !string.IsNullOrEmpty(PhieuDeXuatPhongBanDto.ManvTiepNhan) ? PhieuDeXuatPhongBanDto.ManvTiepNhan : PhieuDeXuatPhongBanCheck.ManvTiepNhan;
            PhieuDeXuatPhongBanCheck.ThoiGianGiaoMau = PublicFunction.IsValidDateTime(PhieuDeXuatPhongBanDto.ThoiGianGiaoMau) ? PhieuDeXuatPhongBanDto.ThoiGianGiaoMau : PhieuDeXuatPhongBanCheck.ThoiGianGiaoMau;
            PhieuDeXuatPhongBanCheck.ManvTiepNhan = !string.IsNullOrEmpty(PhieuDeXuatPhongBanDto.ManvTiepNhan) ? PhieuDeXuatPhongBanDto.ManvTiepNhan : PhieuDeXuatPhongBanCheck.ManvTiepNhan;
            PhieuDeXuatPhongBanCheck.NgaySua = DateTime.Now;
            PhieuDeXuatPhongBanCheck.NguoiSua = user;

            if (PhieuDeXuatPhongBanDto.ChiTietPhieuDeXuatPhongBans.Count() > 0)
            {
                foreach (var item in PhieuDeXuatPhongBanDto.ChiTietPhieuDeXuatPhongBans)
                {
                    if(item.MaId == null || item.MaId == "") // Thêm chi tiết
                    {
                        ChiTietPhieuDeXuatPhongBan chiTiet = new ChiTietPhieuDeXuatPhongBan()
                        {
                            MaId = Guid.NewGuid().ToString(),
                            MaPhieuDeXuat = PhieuDeXuatPhongBanCheck.MaId,
                            MaPdkMau = item.MaPdkMau,
                            GhiChu = item.GhiChu,
                            TrangThai = 2
                        };

                        _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(chiTiet);
                        ChiTietPhieuDeXuatPhongBanDto chiTieuPhieuDeXuatPhongBanDto = new ChiTietPhieuDeXuatPhongBanDto();
                        _mapper.Map(chiTiet, chiTieuPhieuDeXuatPhongBanDto); // nghi vấn lỗi ở đây
                        chiTietPhieuDeXuatPhongBanDtos.Add(chiTieuPhieuDeXuatPhongBanDto);
                    }
                    else
                    {
                        var chiTietPhieuDeXuatPhongBanCheck = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(item.MaId, true);
                        if (chiTietPhieuDeXuatPhongBanCheck != null && item.IsDel == false) // Sửa 
                        {
                            chiTietPhieuDeXuatPhongBanCheck.MaPhieuDeXuat = !string.IsNullOrEmpty(item.MaPhieuDeXuat) ? item.MaPhieuDeXuat : chiTietPhieuDeXuatPhongBanCheck.MaPhieuDeXuat;
                            chiTietPhieuDeXuatPhongBanCheck.MaPdkMau = !string.IsNullOrEmpty(item.MaPdkMau) ? item.MaPdkMau : chiTietPhieuDeXuatPhongBanCheck.MaPdkMau;
                            chiTietPhieuDeXuatPhongBanCheck.GhiChu = !string.IsNullOrEmpty(item.GhiChu) ? item.GhiChu : chiTietPhieuDeXuatPhongBanCheck.GhiChu;
                            chiTietPhieuDeXuatPhongBanCheck.LyDoTuChoi = !string.IsNullOrEmpty(item.LyDoTuChoi) ? item.LyDoTuChoi : chiTietPhieuDeXuatPhongBanCheck.LyDoTuChoi;
                            chiTietPhieuDeXuatPhongBanCheck.ManvTuChoi = !string.IsNullOrEmpty(item.ManvTuChoi) ? item.ManvTuChoi : chiTietPhieuDeXuatPhongBanCheck.ManvTuChoi;
                            chiTietPhieuDeXuatPhongBanCheck.NgayTuChoi = PublicFunction.IsValidDateTime(item.NgayTuChoi) ? item.NgayTuChoi : chiTietPhieuDeXuatPhongBanCheck.NgayTuChoi;
                            chiTietPhieuDeXuatPhongBanCheck.NgayThucHienKiemNghiem = PublicFunction.IsValidDateTime(item.NgayThucHienKiemNghiem) ? item.NgayThucHienKiemNghiem : chiTietPhieuDeXuatPhongBanCheck.NgayThucHienKiemNghiem;
                            chiTietPhieuDeXuatPhongBanCheck.TrangThai =  chiTietPhieuDeXuatPhongBanCheck.TrangThai;
                          
                            _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBanCheck);
                            var returnData = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(chiTietPhieuDeXuatPhongBanCheck);
                            chiTietPhieuDeXuatPhongBanDtos.Add(returnData);
                        }
                        else if(chiTietPhieuDeXuatPhongBanCheck != null && item.IsDel == true) 
                        {
                            // Xóa khi kh hàng k mún kiểm nghiệm nữa
                            chiTietPhieuDeXuatPhongBanCheck.TrangThai = 0;
                            _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBanCheck);
                        }
                    } 
                }
            }
            _context.ChangeTracker.DetectChanges();
            Console.WriteLine(_context.ChangeTracker.DebugView.LongView);
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
