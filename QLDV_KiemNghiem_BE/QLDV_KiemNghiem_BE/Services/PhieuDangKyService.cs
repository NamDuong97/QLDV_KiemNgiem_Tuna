﻿using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Interfaces.UploadFile;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using StackExchange.Redis;
using System;
using System.Threading.Channels;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyService : IPhieuDangKyService
    {
        private readonly DataContext _context;
        private readonly IRepositoryManager _repositoryManager;
        private IMapper _mapper;
        private readonly IConnectionMultiplexer _redis;
        private readonly IDistributedCache _cache;
        private readonly IHubContext<NotificationHub> _hubContext;
  
        public PhieuDangKyService(IRepositoryManager repositoryManager, IMapper mapper, DataContext dataContext, IConnectionMultiplexer redis, IDistributedCache cache,
            IHubContext<NotificationHub> hubContext)
        {
            _context = dataContext;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _redis = redis;
            _cache = cache;
            _hubContext = hubContext;
        }
        public async Task<(IEnumerable<PhieuDangKyDto> datas, Pagination pagi)> GetPhieuDangKiesAllAsync(PhieuDangKyParam phieuDangKyParam)
        {
            //string makh, trangthaiID, from, to;
            //DateTime temp = DateTime.Now;
            List<PhieuDangKyDto> phieuDangKyDtos = new List<PhieuDangKyDto>(); // lưu những phiếu đăng ký đã chuyển sang Dto
            var phieuDangKies = await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAllAsync(phieuDangKyParam); // lấy ra các phiếu đăng ký domain
            foreach (var item in phieuDangKies)
            {
                List<PhieuDangKyMauDto> mauDtos = new List<PhieuDangKyMauDto>(); // lưu những mẫu đã chuyển sang Dto
                var phieuDangKyPhuLieuHoaChatDomain = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(item.MaId);
                var phieuDangKyPhuLieuHoaChatDtos = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChatDomain);
                var phieuDangKyDto = _mapper.Map<PhieuDangKyDto>(item);
                foreach (var mau in item.PhieuDangKyMaus)
                {
                    var mauDto = _mapper.Map<PhieuDangKyMauDto>(mau);
                    mauDto.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(mau.PhieuDangKyMauHinhAnhs);
                    mauDtos.Add(mauDto);
                }
                phieuDangKyDto.Maus = mauDtos;
                phieuDangKyDto.PhieuDangKyPhuLieuHoaChats = phieuDangKyPhuLieuHoaChatDtos;
                phieuDangKyDtos.Add(phieuDangKyDto);
            }
            return (datas: phieuDangKyDtos, pagi: phieuDangKies.Pagination);
        }
        public async Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy)
        {
            List<PhieuDangKyDto> phieuDangKyDtos = new List<PhieuDangKyDto>(); // lưu những phiếu đăng ký đã chuyển sang Dto
            var phieuDangKies = await _repositoryManager.PhieuDangKy.GetPhieuDangKiesOfCustomerAsync(maKH, maTrangThaiPhieuDangKy);
            foreach (var item in phieuDangKies)
            {
                var phieuDangKyDto = _mapper.Map<PhieuDangKyDto>(item);
                List<PhieuDangKyMauDto> mauDtos = new List<PhieuDangKyMauDto>(); // lưu những mẫu đã chuyển sang Dto

                foreach (var mau in item.PhieuDangKyMaus)
                {
                    var mauDto = _mapper.Map<PhieuDangKyMauDto>(mau);
                    mauDto.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(mau.PhieuDangKyMauHinhAnhs);
                    mauDtos.Add(mauDto);
                }
                var phieuDangKyPhuLieuHoaChatDomains = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(item.MaId);
                var phieuDangKyPhuLieuHoaChatDtos = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChatDomains);
                phieuDangKyDto.Maus = mauDtos;
                phieuDangKyDto.PhieuDangKyPhuLieuHoaChats = (IEnumerable<PhieuDangKyPhuLieuHoaChatDto>)phieuDangKyPhuLieuHoaChatDtos;
                phieuDangKyDtos.Add(phieuDangKyDto);
            }
            return phieuDangKyDtos;
        }
        public async Task<PhieuDangKyDto?> FindPhieuDangKyAsync(string maPhieuDangKy)
        {
            var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(maPhieuDangKy);
            if (phieuDangKy == null) return null;
            var result = _mapper.Map<PhieuDangKyDto>(phieuDangKy);
            // Them danh sach phu lieu hoa chat vao phieudangky can tim
            var phieuDangKyPhuLieuHoaChat = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(maPhieuDangKy);
            var phieuDangKyPhuLieuHoaChatDto = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChat);
            result.PhieuDangKyPhuLieuHoaChats = (IEnumerable<PhieuDangKyPhuLieuHoaChatDto>)phieuDangKyPhuLieuHoaChatDto;
            // Them danh sach mau vao phieu dang ky can tim
            List<PhieuDangKyMauDto> phieuDangKyMauDtos = new List<PhieuDangKyMauDto>();
            foreach (var mau in phieuDangKy.PhieuDangKyMaus)
            {
                var mauDto = _mapper.Map<PhieuDangKyMauDto>(mau);
                var hinhanhDtos = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(mau.PhieuDangKyMauHinhAnhs);
                mauDto.PhieuDangKyMauHinhAnhs = hinhanhDtos;
                phieuDangKyMauDtos.Add(mauDto);
            }
            result.Maus = phieuDangKyMauDtos;
            // Tra ket qua
            return result;
        }
        public ThongKePhieuDangKyProcedure? GetPhieuDangKyThongKe()
        {
            return _repositoryManager.PhieuDangKy.GetPhieuDangKyThongKe();
        }
        public async Task<ResponseModel1<PhieuDangKyDto>> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto, string user)
        {
            PhieuDangKy phieuDangKyDomain = new PhieuDangKy();
            List<PhieuDangKyMau> phieuDangKyMauDomains = new List<PhieuDangKyMau>();
            List<PhieuDangKyPhuLieuHoaChat> phieuDangKyPhuLieuHoaChatDomains = new List<PhieuDangKyPhuLieuHoaChat>();
            List<PhieuDangKyMauHinhAnh> phieuDangKyMauHinhAnhDomains = new List<PhieuDangKyMauHinhAnh>();

            if (phieuDangKyDto == null)
            {
                return new ResponseModel1<PhieuDangKyDto>
                {
                    Message = "Thieu du lieu dau vao!",
                    KetQua = false,
                };
            }

            if (phieuDangKyDto.Maus == null || phieuDangKyDto.PhieuDangKyPhuLieuHoaChats == null || phieuDangKyDto.Maus.Count() <= 0 ||
                phieuDangKyDto.PhieuDangKyPhuLieuHoaChats.Count() <= 0)
            {
                return new ResponseModel1<PhieuDangKyDto>
                {
                    Message = "Thieu du lieu dau vao mau hoac phu lieu hoa chat, vui long kiem tra lai!",
                    KetQua = false,
                };
            }

            phieuDangKyDomain = _mapper.Map<PhieuDangKy>(phieuDangKyDto);
            phieuDangKyDomain.MaId = Guid.NewGuid().ToString();
            phieuDangKyDomain.TrangThaiId = "TT01";
            phieuDangKyDomain.SoDkpt = "SDKPT" + PublicFunction.getTimeSystem();
            phieuDangKyDomain.NgayTao = DateTime.Now;
            phieuDangKyDomain.NguoiSua = user;

            // Them danh sach mau vao CSDL
            foreach (var mau in phieuDangKyDto.Maus)
            {
                PhieuDangKyMau mauDomain = new PhieuDangKyMau();
                mauDomain = _mapper.Map<PhieuDangKyMau>(mau);
                mauDomain.MaPhieuDangKy = phieuDangKyDomain.MaId;
                mauDomain.MaPdkMau = PublicFunction.processString(mauDomain.TenMau ?? "unknow") + "_" + mauDomain.LoaiDv  + "_" + mauDomain.ThoiGianTieuChuan.ToString();
                mauDomain.TrangThaiPhanCong = null;
                mauDomain.TrangThai = true;
          
                // Thêm hình ảnh vào CSDL
                //Console.WriteLine("So luong hinh anh trong mau: " + mau.PhieuDangKyMauHinhAnhs.Count);
                //foreach (var img in mau.PhieuDangKyMauHinhAnhs)
                //{
                //    // Lưu ảnh vào thư mục của dự án và trả về đường dẫn ảnh
                //    var image = await _uploadFile.UploadImageAsync(img?.Image);
                //    if (image.FileName == "0" && image.Url == "0") continue;
                //    var hinhAnh = new PhieuDangKyMauHinhAnh
                //    {
                //        MaId = Guid.NewGuid().ToString(),
                //        MaMau = mauDomain.MaId,
                //        Ten = image.FileName,
                //        DinhDang = image.FileName.Split('.')[1],
                //        GhiChu = img.GhiChu,
                //        LoaiAnh = img.LoaiAnh,
                //        PathImg = image.Url,
                //        TrangThai = img.TrangThai,
                //    };
                //    phieuDangKyMauHinhAnhDomains.Add(hinhAnh); // Them vao de tra ve cho ng dung
                //    await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(hinhAnh);
                //}
                //mauDomain.PhieuDangKyMauHinhAnhs = phieuDangKyMauHinhAnhDomains;
                phieuDangKyMauDomains.Add(mauDomain);
                await _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDomain);
              /*  phieuDangKyMauHinhAnhDomains = new List<PhieuDangKyMauHinhAnh>();*/ // sau khi them anh xong thi xoa mang anh di, them tiep
            }

            // Them danh sach plhc vao CSDL
            foreach (var plhc in phieuDangKyDto.PhieuDangKyPhuLieuHoaChats)
            {
                PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChatDomain = new PhieuDangKyPhuLieuHoaChat();
                phieuDangKyPhuLieuHoaChatDomain = _mapper.Map<PhieuDangKyPhuLieuHoaChat>(plhc);
                phieuDangKyPhuLieuHoaChatDomain.MaId = Guid.NewGuid().ToString();
                phieuDangKyPhuLieuHoaChatDomain.MaPhieuDangKy = phieuDangKyDomain.MaId;
                phieuDangKyPhuLieuHoaChatDomains.Add(phieuDangKyPhuLieuHoaChatDomain);
                await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChatDomain);
            }
            await _repositoryManager.PhieuDangKy.CreatePhieuDangKyAsync(phieuDangKyDomain);
            // Ghi vao CSDL
            bool check = await _repositoryManager.SaveChangesAsync();
            // Tra ket qua ve cho nguoi dung
            var phieuDangKyReturnDto = _mapper.Map<PhieuDangKyDto>(phieuDangKyDomain);
            phieuDangKyReturnDto.Maus = _mapper.Map<List<PhieuDangKyMauDto>>(phieuDangKyMauDomains);
            phieuDangKyReturnDto.PhieuDangKyPhuLieuHoaChats = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChatDomains);
            if(check)
            {
                // Tao thong bao gui cho phong KHTH
                NotificationModel noti = new NotificationModel()
                {
                    Title = "Phieu dang ky moi",
                    Message = "Da co phieu dang ky moi, xin vui long xem xet duyet!",
                    CreatedAt = DateTime.Now,
                };
                await _hubContext.Clients.Group("KHTH").SendAsync("receiveNotification", noti);
            }
            return new ResponseModel1<PhieuDangKyDto>
            {
                KetQua = check,
                Message = check ? "Tao phieu dang ky thanh cong" : "Tao phieu dang ky that bai",
                Data = phieuDangKyReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDangKyDto>> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto, string user)
        {
            // Khai bao du lieu tra ve cho client
            List<PhieuDangKyMau> phieuDangKyMaus1 = new List<PhieuDangKyMau>();
            List<PhieuDangKyPhuLieuHoaChat> phieuDangKyPhuLieuHoaChats1 = new List<PhieuDangKyPhuLieuHoaChat>();
            
            if (phieuDangKyDto == null || phieuDangKyDto.MaId == null || phieuDangKyDto.MaId == "")
            {
                return new ResponseModel1<PhieuDangKyDto>
                {
                    Message = "Thieu du lieu dau vao!",
                    KetQua = false,
                };
            }

            if (phieuDangKyDto.Maus == null || phieuDangKyDto.PhieuDangKyPhuLieuHoaChats == null || phieuDangKyDto.Maus.Count() <= 0 ||
                phieuDangKyDto.MaId == "" || phieuDangKyDto.PhieuDangKyPhuLieuHoaChats.Count() <= 0)
            {
                return new ResponseModel1<PhieuDangKyDto>
                {
                    Message = "Thieu du lieu dau vao mau hoac phu lieu hoa chat, vui long kiem tra lai!",
                    KetQua = false,
                };
            }

            var checkExists = await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(phieuDangKyDto.MaId, true);
            if (checkExists == null)
            {
                return new ResponseModel1<PhieuDangKyDto>
                {
                    Message = "Phieu dang ky khong ton tai, vui long kiem tra lai!",
                    KetQua = false,
                };
            }

            // Tìm hoá đơn có liên quan để cập nhật tổng tiền khi mà mẫu mới được thêm, xoá, sửa...
            var hoaDonThu = await _repositoryManager.HoaDonThu.CheckExistHoaDonThuByPhieuDangKyAsync(checkExists.MaId, true); 
            phieuDangKyDto.NgaySua = DateTime.Now;
            phieuDangKyDto.NguoiSua = user;

            // Update or Delete Mau
            foreach (var mau in phieuDangKyDto.Maus)
            {
                if (mau == null) continue;
                var checkExistsMau = await _repositoryManager.PhieuDangKyMau.CheckExistPhieuDangKyMauAsync(mau?.MaId ?? "", phieuDangKyDto.MaId, true);
                // nếu mẫu đã tồn tại thì update hoac delete mẫu này
                if (checkExistsMau != null)
                {
                    var cchdt = await _repositoryManager.ChiTietHoaDonThu.CheckExistChiTietHoaDonThuByMaMauAsync(hoaDonThu?.MaId??"", true);
                    // Xoa mau va hinh anh lien quan
                    if (mau!.IsDel)
                    {
                        if (hoaDonThu != null && hoaDonThu.MaId != null && hoaDonThu.MaId != "")
                        {
                            if (cchdt != null) _repositoryManager.ChiTietHoaDonThu.DeleteChiTietHoaDonThuAsync(cchdt);  
                        }
                        _repositoryManager.PhieuDangKyMau.DeletePhieuDangKyMauAsync(checkExistsMau);
                    }
                    // Cap nhat mau
                    else
                    {
                        // mapping dữ liệu sang domain để cập nhật
                        _mapper.Map(mau, checkExistsMau);
                        // Thêm mẫu vào context để chuẩn bị ghi xún CSDL
                        _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(checkExistsMau);
                        phieuDangKyMaus1.Add(checkExistsMau);
                    }
                }
                // nếu mẫu không tồn tại thì create mẫu này
                else 
                {
                    PhieuDangKyMau mauDoMain = new PhieuDangKyMau();
                    mau!.MaPhieuDangKy = phieuDangKyDto.MaId;
                    mau.TrangThaiPhanCong = 1;
                    _mapper.Map(mau, mauDoMain);
                    // Them chi tiet hoa don thu
                    if (hoaDonThu != null && hoaDonThu.MaId != null && hoaDonThu.MaId != "")
                    {
                        ChiTietHoaDonThu cchdt = new ChiTietHoaDonThu();
                        cchdt.MaId = Guid.NewGuid().ToString();
                        cchdt.MaMau = mauDoMain.MaId;
                        cchdt.MaHd = hoaDonThu.MaId;
                        await _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(cchdt);
                    }
                    // Them mau
                    await _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDoMain);
                    // Tra du lieu mau cho client
                    phieuDangKyMaus1.Add(mauDoMain);
                }
            }
            // Update Or Delete Plhc
            foreach (var plhc in phieuDangKyDto.PhieuDangKyPhuLieuHoaChats)
            {
                var checkExistsPlhc = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CheckExistPhieuDangKyPhuLieuHoaChatAsync(plhc.MaId, phieuDangKyDto.MaId, true);
                // Plhc da ton tai thi sua hoac xoa di
                if (checkExistsPlhc != null)
                {
                    // Xoa phu lieu hoa chat
                    if (plhc.IsDel)
                    {
                        _repositoryManager.PhieuDangKyPhuLieuHoaChat.DeletePhieuDangKyPhuLieuHoaChatAsync(checkExistsPlhc);
                    }
                    // Update phu lieu hoa chat
                    else
                    {
                        _mapper.Map(plhc, checkExistsPlhc);
                        _repositoryManager.PhieuDangKyPhuLieuHoaChat.UpdatePhieuDangKyPhuLieuHoaChatAsync(checkExistsPlhc);
                        phieuDangKyPhuLieuHoaChats1.Add(checkExistsPlhc);
                    }
                }
                // Them moi phu lieu hoa chat
                else if (plhc.MaId == null || plhc.MaId == "")// Them moi Plhc
                {
                    var checkPLHCExistsSame = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.FindPhieuDangKyPhuLieuHoaChatBySameAsync(plhc.MaPlhc, plhc.SoLo, plhc.TenNhaCungCap, plhc.DonViTinh, true);
                    // Nếu trùng plhc thì thêm số lượng k tạo mới
                    if (checkPLHCExistsSame != null)
                    {
                        checkPLHCExistsSame.SoLuong += plhc.SoLuong;
                        phieuDangKyPhuLieuHoaChats1.Add(checkPLHCExistsSame);
                    }
                    else
                    {
                        PhieuDangKyPhuLieuHoaChat plhcDomain = new PhieuDangKyPhuLieuHoaChat();
                        plhc.MaId = Guid.NewGuid().ToString();
                        plhc.MaPhieuDangKy = phieuDangKyDto.MaId;
                        _mapper.Map(plhc, plhcDomain);
                        await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(plhcDomain);
                        phieuDangKyPhuLieuHoaChats1.Add(plhcDomain);
                    }
                }
            }

            _mapper.Map(phieuDangKyDto, checkExists);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExists);
            // Xac nhan da thay doi va in ra cac doi tuong ma dang dc EF theo doi
            _context.ChangeTracker.DetectChanges();
            Console.WriteLine(_context.ChangeTracker.DebugView.LongView);
            bool check = await _repositoryManager.SaveChangesAsync();
            // Tra du lieu sau update cho client
            var phieuDangKyReturnDto = _mapper.Map<PhieuDangKyDto>(checkExists);
            phieuDangKyReturnDto.Maus = _mapper.Map<List<PhieuDangKyMauDto>>(phieuDangKyMaus1);
            phieuDangKyReturnDto.PhieuDangKyPhuLieuHoaChats = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChats1);
            return new ResponseModel1<PhieuDangKyDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat phieu dang ky thanh cong" : "Cap nhat phieu dang ky that bai",
                Data = phieuDangKyReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDangKyDto>> DeletePhieuDangKyAsync(string maPhieuDangKy, string user)
        {

            var checkExistsPDK = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(maPhieuDangKy);
            if (checkExistsPDK == null) {
                return new ResponseModel1<PhieuDangKyDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky muon xoa khong ton tai, vui long kiem tra lai!",
                };
            }
            // Xoa cac mau co lien quan den phieu dang ky bi xoa
            checkExistsPDK.TrangThaiId = "TT10";
            checkExistsPDK.NgaySua = DateTime.Now;
            checkExistsPDK.NguoiSua = user;

            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistsPDK);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhieuDangKyDto>(checkExistsPDK);
            return new ResponseModel1<PhieuDangKyDto>
            {
                KetQua = check,
                Message = check ? "Xoa phieu dang ky thanh cong!" : "Xoa phieu dang ky that bai!",
                Data = dataReturn
            };
        }
        public async Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string maPhieuDangKy, bool tracking)
        {
            return await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(maPhieuDangKy, false);
        }
        public async Task<int> DuTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan)
        {
            if (maDmMau == null || maDmMau == "") return 0;
            if (maTieuChuan == null || maTieuChuan == "") return 0;
            var checkExistTieuChuan = await _repositoryManager.TieuChuan.FindTieuChuanAsync(maTieuChuan);
            if (checkExistTieuChuan == null)
            {
                return 0;
            }
            var checkExistDmMau = await _repositoryManager.DmMau.FindDmMauAsync(maDmMau);
            if (checkExistDmMau == null)
            {
                return 0;
            }
            return await _repositoryManager.PhieuDangKy.DuTinhThoiGianKiemNghiem(maDmMau, maTieuChuan);
        }
        public async Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByKHDT(RequestReviewPhieuDangKy duyetPhieu,  string user, string userId)
        {
            if (duyetPhieu == null || duyetPhieu.MaPhieuDangKy == "")
            {
                return new ResponReviewPhieuDangKy
                {
                    KetQua = false,
                    Message = "Danh sach mau khong co du lieu dau vao!",
                    MaPhieuDangKy = string.Empty,
                };
            }
            var checkExistsPhieuDangKy = await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(duyetPhieu.MaPhieuDangKy, true);
            if (checkExistsPhieuDangKy != null)
            {
                if (duyetPhieu.Action)
                {
                    // neu action = true tuc la phong KHTH dong y duyet, tiep theo BLD xem xet duyet
                    checkExistsPhieuDangKy.TrangThaiId = "TT02";
                }
                else
                {  // nguoc lai thi trang thai la bi phong KHDT tu choi duyet, luc nay chi gui thong bao cho BLD thoi, BLD co the xem
                    checkExistsPhieuDangKy.TrangThaiId = "TT03";
                } 
                checkExistsPhieuDangKy.NgaySua = DateTime.Now;
                checkExistsPhieuDangKy.NoiDungDuyetSoBo = duyetPhieu.Message;
                checkExistsPhieuDangKy.ManvSoDuyet = userId;
                checkExistsPhieuDangKy.NguoiSua = user;
                _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistsPhieuDangKy);
                bool check = await _repositoryManager.SaveChangesAsync();
                return new ResponReviewPhieuDangKy
                {
                    MaPhieuDangKy = duyetPhieu.MaPhieuDangKy,
                    Message = check ? "Xu ly duyet phieu dang ky thanh cong!" : "Xu ly duyet phieu dang ky that bai vui long thu lai!",
                    KetQua = check
                };
            }
            else
            {
                return new ResponReviewPhieuDangKy
                {
                    KetQua = false,
                    Message = "Phieu dang ky khong ton tai",
                    MaPhieuDangKy = duyetPhieu.MaPhieuDangKy,
                };
            }
        }
        public async Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByBLD(RequestReviewPhieuDangKy duyetPhieu, string user, string userId)
        {
            if (duyetPhieu == null || duyetPhieu.MaPhieuDangKy == "")
            {
                return new ResponReviewPhieuDangKy
                {
                    KetQua = false,
                    Message = "Danh sach mau khong co du lieu dau vao!",
                    MaPhieuDangKy = string.Empty,
                };
            }

            var checkExistsPhieuDangKy = await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(duyetPhieu.MaPhieuDangKy, true);
            if (checkExistsPhieuDangKy != null)
            {
                if (duyetPhieu.Action)
                    checkExistsPhieuDangKy.TrangThaiId = "TT05";
                else
                    checkExistsPhieuDangKy.TrangThaiId = "TT04";
                checkExistsPhieuDangKy.NoiDungTongDuyet = duyetPhieu.Message;
                checkExistsPhieuDangKy.MaBldduyet = userId;
                checkExistsPhieuDangKy.NgaySua = DateTime.Now;
                checkExistsPhieuDangKy.NguoiSua = user;
                _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistsPhieuDangKy);
                bool check = await _repositoryManager.SaveChangesAsync();
                if (check)
                {
                    await _repositoryManager.PhieuDangKyMau.ProcessUpdateStatusMauWhenBLDAction(checkExistsPhieuDangKy.MaId, checkExistsPhieuDangKy.TrangThaiId);
                }
                return new ResponReviewPhieuDangKy
                {
                    MaPhieuDangKy = duyetPhieu.MaPhieuDangKy,
                    Message = check ? "Xu ly duyet phieu dang ky thanh cong!" : "Xu ly duyet phieu dang ky that bai, vui long thu lai!",
                    KetQua = check
                };
            }
            else
            {
                return new ResponReviewPhieuDangKy
                {
                    KetQua = false,
                    Message = "Phieu dang ky khong ton tai",
                    MaPhieuDangKy = duyetPhieu.MaPhieuDangKy,
                };
            }
        }
        public async Task<ResponseUndoReviewPhieuDangKy> UndoReviewPhieuDangKyByBLD(RequestUndoReviewPhieuDangKy duyetPhieu, string user, string userId)
        {
            if (duyetPhieu == null || duyetPhieu.MaPhieuDangKy == "")
            {
                return new ResponseUndoReviewPhieuDangKy
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!",
                    MaPhieuDangKy = string.Empty,
                };
            }

            var checkExistsPhieuDangKy = await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(duyetPhieu.MaPhieuDangKy, true);
            if (checkExistsPhieuDangKy != null)
            {
                if (checkExistsPhieuDangKy.TrangThaiId != "TT04")
                    // Neu phieu co trang thai khong phai tu choi, thi dao nguoc thanh tu choi
                    checkExistsPhieuDangKy.TrangThaiId = "TT04";
                else
                    // Neu phieu co trang thai tu choi thi doi thanh da chap nhan cho phan cong
                    checkExistsPhieuDangKy.TrangThaiId = "TT05";

                checkExistsPhieuDangKy.NoiDungTongDuyet = duyetPhieu.Message;
                checkExistsPhieuDangKy.MaBldduyet = userId;
                checkExistsPhieuDangKy.NgaySua = DateTime.Now;
                checkExistsPhieuDangKy.NguoiSua = user;
                _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistsPhieuDangKy);
                bool check = await _repositoryManager.SaveChangesAsync();
                if (check)
                {
                    await _repositoryManager.PhieuDangKyMau.ProcessUpdateStatusMauWhenBLDAction(checkExistsPhieuDangKy.MaId, checkExistsPhieuDangKy.TrangThaiId);
                }
                return new ResponseUndoReviewPhieuDangKy
                {
                    MaPhieuDangKy = duyetPhieu.MaPhieuDangKy,
                    Message = checkExistsPhieuDangKy.TrangThaiId == "TT04" ? $"Phieu dang ky {duyetPhieu.MaPhieuDangKy} da bi user tu choi boi nguoi dung {user}!" :
                    $"Phieu dang ky {duyetPhieu.MaPhieuDangKy} da duoc phe duyet kiem nghiem boi nguoi dung {user}!",
                    KetQua = check
                };
            }
            else
            {
                return new ResponseUndoReviewPhieuDangKy
                {
                    KetQua = false,
                    Message = "Phieu dang ky khong ton tai",
                    MaPhieuDangKy = duyetPhieu.MaPhieuDangKy,
                };
            }
        }
    }
}
