using AutoMapper;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Repositories;
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
            var phieuDangKies =  await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAllAsync(makh, trangthaiID, from, to); // lấy ra các phiếu đăng ký domain
            foreach (var item in phieuDangKies)
            {
                List<PhieuDangKyMauDto> mauDtos = new List<PhieuDangKyMauDto>(); // lưu những mẫu đã chuyển sang Dto
                var phieuDangKyPhuLieuHoaChatDomain = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(item.MaId);
                var phieuDangKyPhuLieuHoaChatDtos = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChatDomain);
                var phieuDangKyDto = _mapper.Map<PhieuDangKyDto>(item);
                foreach (var mau  in item.PhieuDangKyMaus)
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
        public async Task<ResponseModel1<PhieuDangKyDto>> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto)
        {
            PhieuDangKy phieuDangKyDomain = new PhieuDangKy();
            List<PhieuDangKyMau> phieuDangKyMauDomains = new List<PhieuDangKyMau>();
            List<PhieuDangKyPhuLieuHoaChat> phieuDangKyPhuLieuHoaChatDomains = new List<PhieuDangKyPhuLieuHoaChat>();
            List<PhieuDangKyMauHinhAnh> phieuDangKyMauHinhAnhDomains = new List<PhieuDangKyMauHinhAnh>();
           

            phieuDangKyDomain = _mapper.Map<PhieuDangKy>(phieuDangKyDto);
            phieuDangKyDomain.MaId = Guid.NewGuid().ToString();
            phieuDangKyDomain.TrangThaiId = "TT01";
            phieuDangKyDomain.SoDkpt = "SDKPT" + PublicFunc.getTimeSystem();
            phieuDangKyDomain.NgayTao = DateTime.Now;
            if (phieuDangKyDto?.Maus?.Count() > 0)
            {
                // Them danh sach mau vao CSDL
                foreach (var mau in phieuDangKyDto.Maus)
                {
                    PhieuDangKyMau mauDomain = new PhieuDangKyMau();
                    mauDomain = _mapper.Map<PhieuDangKyMau>(mau);
                    mauDomain.MaId = Guid.NewGuid().ToString();
                    mauDomain.MaPhieuDangKy = phieuDangKyDomain.MaId;
                    mauDomain.MaPdkMau = mauDomain.TenMau + "_" + mauDomain.LoaiDv + "_" + PublicFunc.getTimeSystem() + "_" + mauDomain.ThoiGianTieuChuan.ToString();
                    mauDomain.NgayTao = DateTime.Now;
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
                            NguoiTao = img.NguoiTao,
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
            }
            else
            {
                return new ResponseModel1<PhieuDangKyDto> { 
                    KetQua = false,
                    Message = "Danh sach mau khong co du lieu, vui long gui lai phieu dang ky!",
                    Data = null
                };
            }

            if (phieuDangKyDto.PhieuDangKyPhuLieuHoaChats.Count() > 0)
            {
                // Them danh sach plhc vao CSDL
                foreach (var plhc in phieuDangKyDto.PhieuDangKyPhuLieuHoaChats)
                {
                    PhieuDangKyPhuLieuHoaChat phieuDangKyPhuLieuHoaChatDomain = new PhieuDangKyPhuLieuHoaChat();
                    phieuDangKyPhuLieuHoaChatDomain = _mapper.Map<PhieuDangKyPhuLieuHoaChat>(plhc);
                    phieuDangKyPhuLieuHoaChatDomain.MaId = Guid.NewGuid().ToString();
                    phieuDangKyPhuLieuHoaChatDomain.MaPhieuDangKy = phieuDangKyDomain.MaId;
                    phieuDangKyPhuLieuHoaChatDomain.NgayTao = DateTime.Now;
                    phieuDangKyPhuLieuHoaChatDomains.Add(phieuDangKyPhuLieuHoaChatDomain);
                    await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChatDomain);
                }
            }
            else
            {
                return new ResponseModel1<PhieuDangKyDto>
                {
                    KetQua = false,
                    Message = "Danh sach phu lieu hoa chat khong co du lieu, vui long gui lai phieu dang ky!",
                    Data = null
                };
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
        public async Task<bool> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto)
        {
            var checkExists = await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(phieuDangKyDto.MaId, true);
            if (checkExists == null)
            {
                throw new Exception("Phieu Dang Ky Khong Ton Tai");
            }
            phieuDangKyDto.NgaySua = DateTime.Now;
            phieuDangKyDto.NguoiSua = "admin";
            // Update or Delete Mau
            foreach (var mau in phieuDangKyDto.Maus)
            {
                var checkExistsMau =  await _repositoryManager.PhieuDangKyMau.CheckExistPhieuDangKyMauAsync(mau.MaId, phieuDangKyDto.MaId, true);
                // nếu mẫu đã tồn tại thì update mẫu này
                if (checkExistsMau != null) 
                {
                    // Xoa mau va hinh anh lien quan
                    if(mau.IsDel)
                    {
                        var phieuDangKyMauHinhAnhs = await _repositoryManager.PhieuDangKyMauHinhAnh.GetPhieuDangKyMauHinhAnhByMaMauAsync(mau.MaId, false);
                        if(phieuDangKyMauHinhAnhs !=null && phieuDangKyMauHinhAnhs.Count() > 0)
                        {
                            foreach (var img in phieuDangKyMauHinhAnhs)
                            {
                                 _repositoryManager.PhieuDangKyMauHinhAnh.DeletePhieuDangKyMauHinhAnh(img);
                            }
                        }
                        _repositoryManager.PhieuDangKyMau.DeletePhieuDangKyMauAsync(checkExistsMau);
                    }
                    // Cap nhat mau va hinh anh lien quan
                    else
                    {
                        mau.NgaySua = DateTime.Now;
                        mau.NguoiSua = "admin";
                        foreach (var img in mau.PhieuDangKyMauHinhAnhs)
                        {
                            // Neu checkExistsHinhAnh = null thi EF k theo doi checkExistsHinhAnh nua
                            var checkExistsHinhAnh = await _repositoryManager.PhieuDangKyMauHinhAnh.CheckExistPhieuDangKyMauHinhAnhAsync(img.MaId, true);
                            // nếu hình ảnh k có maid thì là thêm mới, ngược lại thì update
                            if (checkExistsHinhAnh != null) 
                            {
                                // Xoa hinh anh
                                if(img.IsDel)
                                {
                                    _repositoryManager.PhieuDangKyMauHinhAnh.DeletePhieuDangKyMauHinhAnh(checkExistsHinhAnh);
                                }
                                // Update hinh anh
                                else 
                                {
                                    img.NgaySua = DateTime.Now;
                                    img.NguoiSua = "admin";
                                    _mapper.Map(img, checkExistsHinhAnh);
                                    _repositoryManager.PhieuDangKyMauHinhAnh.UpdatePhieuDangKyMauHinhAnh(checkExistsHinhAnh);
                                }
                            }
                            // Them moi hinh anh, khi maid cua no null hoac "", nguoc lai k them moi
                            else if(img.MaId == null || img.MaId == "")
                            {
                                PhieuDangKyMauHinhAnh hinhAnhDomain = new PhieuDangKyMauHinhAnh();
                                hinhAnhDomain.MaId = Guid.NewGuid().ToString();
                                Console.WriteLine("day la hinh anh moi" + "--" + hinhAnhDomain.MaId);
                                hinhAnhDomain.NgayTao = DateTime.Now;
                                hinhAnhDomain.NguoiTao = "admin";
                                _mapper.Map(img, hinhAnhDomain);
                                await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(hinhAnhDomain);
                            }
                        }
                        _mapper.Map(mau, checkExistsMau);
                        _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(checkExistsMau);
                    }
                }
                // nếu mẫu không tồn tại thì create mẫu này, và thêm mới hình ảnh
                else if (mau.MaId == null || mau.MaId == "") 
                {
                    PhieuDangKyMau mauDoMain = new PhieuDangKyMau();
                    mau.MaId = Guid.NewGuid().ToString();
                    mau.MaPhieuDangKy = phieuDangKyDto.MaId;
                    mau.NgayTao = DateTime.Now;
                    mau.NguoiTao = "admin";
                    foreach (var img in mau.PhieuDangKyMauHinhAnhs)
                    {
                        var hinhAnhDomain = new PhieuDangKyMauHinhAnh();
                        hinhAnhDomain.MaId = Guid.NewGuid().ToString();
                        img.MaMau = mau.MaId;
                        img.NgayTao = DateTime.Now;
                        img.NguoiTao = "admin";
                        _mapper.Map(img, hinhAnhDomain);
                        await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(hinhAnhDomain);
                    }
                    _mapper.Map(mau, mauDoMain);
                    await _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDoMain);
                }
            }
            // Update Or Delete Plhc
            foreach (var plhc in phieuDangKyDto.PhieuDangKyPhuLieuHoaChats)
            {
                var checkExistsPlhc = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CheckExistPhieuDangKyPhuLieuHoaChatAsync(plhc.MaId, phieuDangKyDto.MaId, true);
                // Plhc da ton tai thi sua hoac xoa di
                if (checkExistsPlhc!=null) 
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
                        plhc.NguoiSua = "admin";
                        _mapper.Map(plhc, checkExistsPlhc);
                        _repositoryManager.PhieuDangKyPhuLieuHoaChat.UpdatePhieuDangKyPhuLieuHoaChatAsync(checkExistsPlhc);
                    }
                }
                // Them moi phu lieu hoa chat
                else if(plhc.MaId == null || plhc.MaId == "")// Them moi Plhc
                {
                    PhieuDangKyPhuLieuHoaChat plhcDomain = new PhieuDangKyPhuLieuHoaChat();
                    plhc.MaId = Guid.NewGuid().ToString();
                    plhc.MaPhieuDangKy = phieuDangKyDto.MaId;
                    plhc.NgayTao = DateTime.Now;
                    plhc.NguoiTao = "admin";
                    _mapper.Map(plhc, plhcDomain);
                    await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(plhcDomain);
                }
            }
            _mapper.Map(phieuDangKyDto, checkExists);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExists);
            // Xac nhan da thay doi va in ra cac doi tuong ma dang dc EF theo doi
            _context.ChangeTracker.DetectChanges();
            Console.WriteLine(_context.ChangeTracker.DebugView.LongView);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
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
            if(checkExistTieuChuan == null)
            {
                return 0;
            }
            var checkExistDmMau = await _repositoryManager.DmMau.FindDmMauAsync(maDmMau);
            if (checkExistDmMau == null)
            {
                return 0;
            }
            return await _repositoryManager.PhieuDangKy.DuTinhThoiGianKiemNghiem( maDmMau,  maTieuChuan);
        }
    }
}
