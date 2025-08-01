﻿using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using StackExchange.Redis;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDeXuatPhongBanService : IPhieuDeXuatPhongBanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly IDistributedCache _cache;
        private readonly IConnectionMultiplexer _redis;
        public PhieuDeXuatPhongBanService(IRepositoryManager repositoryManager, IMapper mapper, DataContext context, IHubContext<NotificationHub> hubContext,
            IDistributedCache cache, IConnectionMultiplexer redis)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
            _cache = cache;
            _redis = redis;
        }
        public async Task<(IEnumerable<PhieuDeXuatPhongBanDto> datas, Pagination pagi)> GetPhieuDeXuatPhongBansAllAsync(PhieuDeXuatPhongBanParam param)
        {
            var PhieuDeXuatPhongBanDomains = await _repositoryManager.PhieuDeXuatPhongBan.GetPhieuDeXuatPhongBansAllAsync(param);
            var result = _mapper.Map<IEnumerable<PhieuDeXuatPhongBanDto>>(PhieuDeXuatPhongBanDomains);
            return (datas : result, pagi : PhieuDeXuatPhongBanDomains.Pagination);
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
                TrangThai = 1
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

                // Cập nhật trạng thái của phieudangkymau
                var mau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(item.MaPdkMau, true);
                if(mau == null)
                {
                    return new ResponseModel1<PhieuDeXuatPhongBanDto>
                    {
                        KetQua = false,
                        Message = $"Mau {item.MaPdkMau} khog ton tai, vui long kiem tra lai!",
                        Data = null
                    };
                }
                mau.TrangThaiPhanCong = 6;
                // Cập nhật phiếu đăng ký liên quan mẫu này
                var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(mau.MaPhieuDangKy);
                if(phieuDangKy == null)
                {
                    return new ResponseModel1<PhieuDeXuatPhongBanDto>
                    {
                        KetQua = false,
                        Message = $"Phieu dang ky {mau.MaPhieuDangKy} khog ton tai, vui long kiem tra lai!",
                        Data = null
                    };
                }
                phieuDangKy.NgaySua = DateTime.Now;
                phieuDangKy.NguoiSua = user;
                _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(mau);
                _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKy);
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

            // Cập nhật redis cho phieudangky mau
            //foreach (var item in PhieuDeXuatPhongBanReturnDto.ChiTietPhieuDeXuatPhongBans)
            //{
            //    var mau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(item.MaPdkMau ?? "");
            //    if (_redis.IsConnected && mau!= null)
            //    {
            //        var cacheKey = $"phieudangkymau:{mau.MaId}";
            //        var cacheObj = new CachedResponse<PhieuDangKyMauDto>
            //        {
            //            Data = _mapper.Map<PhieuDangKyMauDto>(mau)
            //        };
            //        // Lưu dữ liệu vào redis phieudangkymau
            //        await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
            //        {
            //            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            //        });
            //        // Cap nhat version moi cho cache redis phieudangkymau:all
            //        await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
            //    }
            //}

            return new ResponseModel1<PhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
                Data = PhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDeXuatPhongBanDto>> UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanRequestUpdateDto PhieuDeXuatPhongBanDto, string user, string userId)
        {
            List<ChiTietPhieuDeXuatPhongBanDto> chiTietPhieuDeXuatPhongBanDtos = new List<ChiTietPhieuDeXuatPhongBanDto>();
            List<PhieuDangKyMau> dsMau = new List<PhieuDangKyMau>();
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
                    var mau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(item.MaPdkMau ?? "", true);
                    var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(mau?.MaPhieuDangKy ?? "");
                    var phieuDeXuatPhongBan = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(item.MaPhieuDeXuat ?? "", true);
                    if (item.MaId == null || item.MaId == "") // Thêm chi tiết
                    {
                        ChiTietPhieuDeXuatPhongBan chiTiet = new ChiTietPhieuDeXuatPhongBan()
                        {
                            MaId = Guid.NewGuid().ToString(),
                            MaPhieuDeXuat = PhieuDeXuatPhongBanCheck.MaId,
                            MaPdkMau = item.MaPdkMau,
                            GhiChu = item.GhiChu,
                            TrangThai = 2
                        };

                        // Cập nhật trạng thái cho PhieuDangKyMau, phieudangky va the chitietphieudexuatphongban neu no ton tai
                        if (mau!= null && phieuDangKy != null && phieuDeXuatPhongBan!= null)
                        {
                            // thêm chitietphieudexuatphongban mới
                            _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(chiTiet);
                            ChiTietPhieuDeXuatPhongBanDto chiTieuPhieuDeXuatPhongBanDto = new ChiTietPhieuDeXuatPhongBanDto();
                            _mapper.Map(chiTiet, chiTieuPhieuDeXuatPhongBanDto); // nghi vấn lỗi ở đây
                            chiTietPhieuDeXuatPhongBanDtos.Add(chiTieuPhieuDeXuatPhongBanDto);

                            // cập nhật trạng thái phieudangkymau
                            mau.TrangThaiPhanCong = 6;
                            _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(mau);

                            // cập nhật phieudangky
                            phieuDangKy.NgaySua = DateTime.Now;
                            phieuDangKy.NguoiSua = user;
                            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKy);
                           
                            // cập nhật trạng thái của Phieudexuatphongban la cho duyet
                            phieuDeXuatPhongBan.TrangThai = 1;
                            phieuDeXuatPhongBan.NguoiSua = user;
                            phieuDeXuatPhongBan.NgaySua = DateTime.Now;
                            _repositoryManager.PhieuDeXuatPhongBan.UpdatePhieuDeXuatPhongBanAsync(phieuDeXuatPhongBan);

                            // Cập nhật redis cho phieudangkymau
                            //if (_redis.IsConnected)
                            //{
                            //    var cacheKey = $"phieudangkymau:{mau?.MaId}";
                            //    PhieuDangKyMauDto mauDto = new PhieuDangKyMauDto();
                            //    _mapper.Map(mau, mauDto);
                            //    var cacheObj = new CachedResponse<PhieuDangKyMauDto>
                            //    {
                            //        Data = mauDto
                            //    };
                            //    // Lưu dữ liệu vào redis phieudangkymau
                            //    await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                            //    {
                            //        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                            //    });
                            //    // Cap nhat version moi cho cache redis phieudangkymau:all
                            //    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                            //}
                        }
                    }
                    else
                    {
                        // Chỉ update các thông tin cơ bản, k cho update trạng thái phiếu - nếu muốn thì gọi api khác
                        var chiTietPhieuDeXuatPhongBanCheck = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(item.MaId, true);
                        if (chiTietPhieuDeXuatPhongBanCheck != null && item.IsDel == false) // Sửa 
                        {
                            chiTietPhieuDeXuatPhongBanCheck.MaPhieuDeXuat = !string.IsNullOrEmpty(item.MaPhieuDeXuat) ? item.MaPhieuDeXuat : chiTietPhieuDeXuatPhongBanCheck.MaPhieuDeXuat;
                            chiTietPhieuDeXuatPhongBanCheck.GhiChu = !string.IsNullOrEmpty(item.GhiChu) ? item.GhiChu : chiTietPhieuDeXuatPhongBanCheck.GhiChu;
                            chiTietPhieuDeXuatPhongBanCheck.LyDoTuChoi = !string.IsNullOrEmpty(item.LyDoTuChoi) ? item.LyDoTuChoi : chiTietPhieuDeXuatPhongBanCheck.LyDoTuChoi;
                            chiTietPhieuDeXuatPhongBanCheck.ManvTuChoi = !string.IsNullOrEmpty(item.ManvTuChoi) ? item.ManvTuChoi : chiTietPhieuDeXuatPhongBanCheck.ManvTuChoi;
                            chiTietPhieuDeXuatPhongBanCheck.NgayTuChoi = PublicFunction.IsValidDateTime(item.NgayTuChoi) ? item.NgayTuChoi : chiTietPhieuDeXuatPhongBanCheck.NgayTuChoi;
                            chiTietPhieuDeXuatPhongBanCheck.NgayThucHienKiemNghiem = PublicFunction.IsValidDateTime(item.NgayThucHienKiemNghiem) ? item.NgayThucHienKiemNghiem : chiTietPhieuDeXuatPhongBanCheck.NgayThucHienKiemNghiem;
                            _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBanCheck);
                            var returnData = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(chiTietPhieuDeXuatPhongBanCheck);
                            chiTietPhieuDeXuatPhongBanDtos.Add(returnData);
                        }
                        else if(chiTietPhieuDeXuatPhongBanCheck != null && item.IsDel == true) 
                        {
                            // nếu ct phiếu đề xuất này bị phòng ban từ chối và chờ BLĐ xem xét hoặc đang chờ phòng ban duyệt => được hủy để giao cho pb khác
                            if (chiTietPhieuDeXuatPhongBanCheck.TrangThai == 1 || chiTietPhieuDeXuatPhongBanCheck.TrangThai == 2)
                            {
                                // Xóa khi KHTH hoặc BLD không muốn phân công mẫu này cho phòng khoa this, mẫu sẽ về dạng chờ phân công lại
                                chiTietPhieuDeXuatPhongBanCheck.TrangThai = 4;
                                chiTietPhieuDeXuatPhongBanCheck.Active = false;
                                chiTietPhieuDeXuatPhongBanCheck.ManvTuChoi = item.ManvTuChoi;
                                chiTietPhieuDeXuatPhongBanCheck.NgayTuChoi = item.NgayTuChoi;
                                chiTietPhieuDeXuatPhongBanCheck.LyDoTuChoi = item.LyDoTuChoi;
                                _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(chiTietPhieuDeXuatPhongBanCheck);
                                // update cho mẫu và phieudangky
                                if (mau != null && phieuDangKy!= null)
                                {
                                    mau.TrangThaiPhanCong = 1;
                                    mau.TrangThai = true;
                                    phieuDangKy.NguoiSua = user;
                                    phieuDangKy.NgaySua = DateTime.Now;
                                    _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(mau);
                                    _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKy);
                                    // nhật nhật redis cho mẫu
                                    //if (_redis.IsConnected)
                                    //{
                                    //    PhieuDangKyMauDto mauDto = new PhieuDangKyMauDto();
                                    //    _mapper.Map(mau, mauDto);
                                    //    var cacheKey = $"phieudangkymau:{mauDto?.MaId}";
                                    //    var cacheObj = new CachedResponse<PhieuDangKyMauDto>
                                    //    {
                                    //        Data = mauDto
                                    //    };
                                    //    // Lưu dữ liệu vào redis phieudangkymau
                                    //    await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(cacheObj), new DistributedCacheEntryOptions
                                    //    {
                                    //        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                                    //    });
                                    //    // Cap nhat version moi cho cache redis phieudangkymau:all
                                    //    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                                    //}
                                }
                                // kiểm tra update phieudexuatphongban xem nó sẽ ở trạng thái đã duyệt hay bị hủy sau khi mất đi mẫu này
                                await _repositoryManager.ChiTietPhieuDeXuatPhongBan.ProcessUpdatePDXPBFromMauCancel(chiTietPhieuDeXuatPhongBanCheck.MaId, chiTietPhieuDeXuatPhongBanCheck?.MaPhieuDeXuat?? "", chiTietPhieuDeXuatPhongBanCheck?.MaPdkMau ?? "", user);
                            }
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
