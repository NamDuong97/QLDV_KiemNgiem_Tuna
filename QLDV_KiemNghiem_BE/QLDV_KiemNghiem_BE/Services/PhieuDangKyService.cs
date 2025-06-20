using AutoMapper;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyService : IPhieuDangKyService
    {
        private readonly DataContext _context;
        private readonly IRepositoryManager _repositoryManager;
        private IMapper _mapper;
        public PhieuDangKyService(IRepositoryManager repositoryManager, IMapper mapper, DataContext dataContext)
        {
            _context = dataContext;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesAllAsync(PhieuDangKyParam phieuDangKyParam)
        {
            string makh, trangthaiID, from, to;
            DateTime temp = DateTime.Now;
            List<PhieuDangKyDto> phieuDangKyDtos = new List<PhieuDangKyDto>(); // lưu những phiếu đăng ký đã chuyển sang Dto
            from = phieuDangKyParam.TimeFrom == "" ? "" : DateTime.TryParse(phieuDangKyParam.TimeFrom, out temp) ? phieuDangKyParam.TimeFrom : "";
            to = phieuDangKyParam.TimeTo == "" ? "" : DateTime.TryParse(phieuDangKyParam.TimeTo, out temp) ? phieuDangKyParam.TimeTo : "";
            makh = phieuDangKyParam.MaKH;
            trangthaiID = phieuDangKyParam.TrangThaiID;
            var phieuDangKies = await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAllAsync(makh, trangthaiID, from, to); // lấy ra các phiếu đăng ký domain
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
            return phieuDangKyDtos;
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

            // Them danh sach mau vao CSDL
            foreach (var mau in phieuDangKyDto.Maus)
            {
                PhieuDangKyMau mauDomain = new PhieuDangKyMau();
                mauDomain = _mapper.Map<PhieuDangKyMau>(mau);
                mauDomain.MaId = Guid.NewGuid().ToString();
                mauDomain.MaPhieuDangKy = phieuDangKyDomain.MaId;
                mauDomain.MaPdkMau = PublicFunction.processString(mauDomain.TenMau ?? "unknow") + "_" + mauDomain.LoaiDv  + "_" + mauDomain.ThoiGianTieuChuan.ToString();
                mauDomain.TrangThaiPhanCong = 1;
                mauDomain.NgayTao = DateTime.Now;
                mauDomain.NguoiTao = user;
                // Thêm hình ảnh vào CSDL
                Console.WriteLine("So luong hinh anh trong mau: " + mau.PhieuDangKyMauHinhAnhs.Count);
                foreach (var img in mau.PhieuDangKyMauHinhAnhs)
                {
                    var hinhAnh = new PhieuDangKyMauHinhAnh
                    {
                        MaId = Guid.NewGuid().ToString(),
                        MaMau = mauDomain.MaId,
                        Ten = img.Ten,
                        DinhDang = img.DinhDang,
                        GhiChu = img.GhiChu,
                        LoaiAnh = img.LoaiAnh,
                        TrangThai = img.TrangThai,
                        NguoiTao = user,
                        NgayTao = DateTime.Now
                    };
                    phieuDangKyMauHinhAnhDomains.Add(hinhAnh); // Them vao de tra ve cho ng dung
                    await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(hinhAnh);
                }
                mauDomain.PhieuDangKyMauHinhAnhs = phieuDangKyMauHinhAnhDomains;
                phieuDangKyMauDomains.Add(mauDomain);
                await _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDomain);
                phieuDangKyMauHinhAnhDomains = new List<PhieuDangKyMauHinhAnh>(); // sau khi them anh xong thi xoa mang anh di, them tiep
            }

            // Them danh sach plhc vao CSDL
            foreach (var plhc in phieuDangKyDto.PhieuDangKyPhuLieuHoaChats)
            {
                PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChatDomain = new PhieuDangKyPhuLieuHoaChat();
                phieuDangKyPhuLieuHoaChatDomain = _mapper.Map<PhieuDangKyPhuLieuHoaChat>(plhc);
                phieuDangKyPhuLieuHoaChatDomain.MaId = Guid.NewGuid().ToString();
                phieuDangKyPhuLieuHoaChatDomain.MaPhieuDangKy = phieuDangKyDomain.MaId;
                phieuDangKyPhuLieuHoaChatDomain.NgayTao = DateTime.Now;
                phieuDangKyPhuLieuHoaChatDomain.NguoiTao = user;
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
            List<PhieuDangKyMauHinhAnh> phieuDangKyMauHinhAnhs1 = new List<PhieuDangKyMauHinhAnh>();

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
                var checkExistsMau = await _repositoryManager.PhieuDangKyMau.CheckExistPhieuDangKyMauAsync(mau.MaId, phieuDangKyDto.MaId, true);
                // nếu mẫu đã tồn tại thì update hoac delete mẫu này
                if (checkExistsMau != null)
                {
                    var cchdt = await _repositoryManager.ChiTietHoaDonThu.CheckExistChiTietHoaDonThuByMaMauAsync(mau.MaId, hoaDonThu.MaId, true);
                    // Xoa mau va hinh anh lien quan
                    if (mau.IsDel)
                    {
                        var phieuDangKyMauHinhAnhs = await _repositoryManager.PhieuDangKyMauHinhAnh.GetPhieuDangKyMauHinhAnhByMaMauAsync(mau.MaId, false);
                        if (phieuDangKyMauHinhAnhs != null && phieuDangKyMauHinhAnhs.Count() > 0)
                        {
                            foreach (var img in phieuDangKyMauHinhAnhs)
                            {
                                _repositoryManager.PhieuDangKyMauHinhAnh.DeletePhieuDangKyMauHinhAnh(img);
                            }
                        }
                        if (hoaDonThu != null && hoaDonThu.MaId != null && hoaDonThu.MaId != "")
                        {
                            if (cchdt != null) _repositoryManager.ChiTietHoaDonThu.DeleteChiTietHoaDonThuAsync(cchdt);
                        }
                        _repositoryManager.PhieuDangKyMau.DeletePhieuDangKyMauAsync(checkExistsMau);
                    }
                    // Cap nhat mau va hinh anh lien quan
                    else
                    {
                        mau.NgaySua = DateTime.Now;
                        mau.NguoiSua = user;
                        foreach (var img in mau.PhieuDangKyMauHinhAnhs)
                        {
                            // Neu checkExistsHinhAnh = null thi EF k theo doi checkExistsHinhAnh nua
                            var checkExistsHinhAnh = await _repositoryManager.PhieuDangKyMauHinhAnh.CheckExistPhieuDangKyMauHinhAnhAsync(img.MaId, true);
                            // nếu hình ảnh k có maid thì là thêm mới, ngược lại thì update
                            if (checkExistsHinhAnh != null)
                            {
                                // Xoa hinh anh 
                                if (img.IsDel)
                                {
                                    _repositoryManager.PhieuDangKyMauHinhAnh.DeletePhieuDangKyMauHinhAnh(checkExistsHinhAnh);
                                }
                                // Update hinh anh
                                else
                                {
                                    img.NgaySua = DateTime.Now;
                                    img.NguoiSua = user;
                                    _mapper.Map(img, checkExistsHinhAnh);
                                    phieuDangKyMauHinhAnhs1.Add(checkExistsHinhAnh);
                                    _repositoryManager.PhieuDangKyMauHinhAnh.UpdatePhieuDangKyMauHinhAnh(checkExistsHinhAnh);
                                }
                            }
                            // Them moi hinh anh, khi maid cua no null hoac "", nguoc lai k them moi
                            else if (img.MaId == null || img.MaId == "")
                            {
                                PhieuDangKyMauHinhAnh hinhAnhDomain = new PhieuDangKyMauHinhAnh();
                                hinhAnhDomain.MaId = Guid.NewGuid().ToString();
                                Console.WriteLine("day la hinh anh moi" + "--" + hinhAnhDomain.MaId);
                                hinhAnhDomain.NgayTao = DateTime.Now;
                                hinhAnhDomain.NguoiTao = user;
                                _mapper.Map(img, hinhAnhDomain);
                                phieuDangKyMauHinhAnhs1.Add(hinhAnhDomain);
                                await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(hinhAnhDomain);
                            }
                        }
                        // mapping dữ liệu sang domain để cập nhật
                        _mapper.Map(mau, checkExistsMau);
                        // cap nhat chi tiet hoa don thu
                        if (hoaDonThu != null && hoaDonThu.MaId != null && hoaDonThu.MaId != "")
                        {
                            if (cchdt != null)
                            {
                                cchdt.NgaySua = DateTime.Now;
                                cchdt.ThanhTien = await _repositoryManager.HoaDonThu.GetToTalMoneyOfMau(mau.MaDmMau, mau.MaTieuChuan, mau.MaLoaiDv);
                                cchdt.NguoiSua = "System";
                                _repositoryManager.ChiTietHoaDonThu.UpdateChiTietHoaDonThuAsync(cchdt);
                            }
                        }
                        // Thêm mẫu vào context để chuẩn bị ghi xún CSDL
                        _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(checkExistsMau);
                        // thêm danh sách ảnh vào mẫu hiện tại để trả cho client
                        checkExistsMau.PhieuDangKyMauHinhAnhs = phieuDangKyMauHinhAnhs1;
                        phieuDangKyMaus1.Add(checkExistsMau);
                        // Duyệt xong 1 mẫu thì hình ảnh reset để sang mẫu mới
                        phieuDangKyMauHinhAnhs1 = new List<PhieuDangKyMauHinhAnh>();
                    }
                }
                // nếu mẫu không tồn tại thì create mẫu này, và thêm mới hình ảnh
                else if (mau.MaId == null || mau.MaId == "")
                {
                    PhieuDangKyMau mauDoMain = new PhieuDangKyMau();
                    mau.MaId = Guid.NewGuid().ToString();
                    mau.MaPhieuDangKy = phieuDangKyDto.MaId;
                    mau.NgayTao = DateTime.Now;
                    mau.NguoiTao = user;
                    mau.TrangThaiPhanCong = 1;
                    foreach (var img in mau.PhieuDangKyMauHinhAnhs)
                    {
                        var hinhAnhDomain = new PhieuDangKyMauHinhAnh();
                        hinhAnhDomain.MaId = Guid.NewGuid().ToString();
                        img.MaMau = mau.MaId;
                        img.NgayTao = DateTime.Now;
                        img.NguoiTao = user;
                        _mapper.Map(img, hinhAnhDomain);
                        await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(hinhAnhDomain);
                        phieuDangKyMauHinhAnhs1.Add(hinhAnhDomain);
                    }
                    _mapper.Map(mau, mauDoMain);
                    // Them chi tiet hoa don thu
                    if (hoaDonThu != null && hoaDonThu.MaId != null && hoaDonThu.MaId != "")
                    {
                        ChiTietHoaDonThu cchdt = new ChiTietHoaDonThu();
                        cchdt.MaId = Guid.NewGuid().ToString();
                        cchdt.MaMau = mauDoMain.MaId;
                        cchdt.MaHd = hoaDonThu.MaId;
                        cchdt.NgayTao = DateTime.Now;
                        cchdt.ThanhTien = await _repositoryManager.HoaDonThu.GetToTalMoneyOfMau(mauDoMain.MaDmMau, mauDoMain.MaTieuChuan, mauDoMain.MaLoaiDv);
                        cchdt.NguoiTao = user;
                        await _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(cchdt);
                    }
                    // Them mau
                    await _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDoMain);
                    // Tra du lieu mau cho client
                    mauDoMain.PhieuDangKyMauHinhAnhs = phieuDangKyMauHinhAnhs1;
                    phieuDangKyMaus1.Add(mauDoMain);
                    phieuDangKyMauHinhAnhs1 = new List<PhieuDangKyMauHinhAnh>();
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
                        plhc.NgaySua = DateTime.Now;
                        plhc.NguoiSua = user;
                        _mapper.Map(plhc, checkExistsPlhc);
                        _repositoryManager.PhieuDangKyPhuLieuHoaChat.UpdatePhieuDangKyPhuLieuHoaChatAsync(checkExistsPlhc);
                        phieuDangKyPhuLieuHoaChats1.Add(checkExistsPlhc);
                    }
                }
                // Them moi phu lieu hoa chat
                else if (plhc.MaId == null || plhc.MaId == "")// Them moi Plhc
                {
                    PhieuDangKyPhuLieuHoaChat plhcDomain = new PhieuDangKyPhuLieuHoaChat();
                    plhc.MaId = Guid.NewGuid().ToString();
                    plhc.MaPhieuDangKy = phieuDangKyDto.MaId;
                    plhc.NgayTao = DateTime.Now;
                    plhc.NguoiTao = user;
                    _mapper.Map(plhc, plhcDomain);
                    await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(plhcDomain);
                    phieuDangKyPhuLieuHoaChats1.Add(plhcDomain);
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
                Message = check ? "Tao phieu dang ky thanh cong" : "Tao phieu dang ky that bai",
                Data = phieuDangKyReturnDto
            };
        }
        public async Task<bool> DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            // Xoa cac mau co lien quan den phieu dang ky bi xoa
            phieuDangKy.TrangThaiId = "TT10";
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKy);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
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
        public async Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByKHDT(RequestReviewPhieuDangKy duyetPhieu,  string user)
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
                    // neu action = 1 thi tiep theo se la cho BLD duyet
                    checkExistsPhieuDangKy.TrangThaiId = "TT02";
                else // nguoc lai thi trang thai la bi phong KHDT tu choi duyet, thi cho BLD quyet dinh
                    checkExistsPhieuDangKy.TrangThaiId = "TT03";
                checkExistsPhieuDangKy.NgaySua = DateTime.Now;
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
        public async Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByBLD(RequestReviewPhieuDangKy duyetPhieu, string user)
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
                checkExistsPhieuDangKy.NgaySua = DateTime.Now;
                checkExistsPhieuDangKy.NguoiSua = user;
                _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistsPhieuDangKy);
                bool check = await _repositoryManager.SaveChangesAsync();
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
    }
}
