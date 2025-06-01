using AutoMapper;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using System;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyService : IPhieuDangKyService
    {
        private readonly DataContext _context;
        private readonly IRepositoryManager _repositoryManager;
        private IMapper _mapper;
        public PhieuDangKyService(IRepositoryManager repositoryManager, IMapper mapper)
        {
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
        public async Task<bool> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto)
        {
            PhieuDangKy phieuDangKyDomain = new PhieuDangKy();
            phieuDangKyDomain = _mapper.Map<PhieuDangKy>(phieuDangKyDto);
            phieuDangKyDomain.MaId = Guid.NewGuid().ToString();
            phieuDangKyDomain.TrangThaiId = "TT01";
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
                        _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(hinhAnh);
                    }
                    _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDomain);
                }
            }
            else
            {
                return false;
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
                    _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChatDomain);
                }
            }
            else
            {
                return false;
            }

            _repositoryManager.PhieuDangKy.CreatePhieuDangKyAsync(phieuDangKyDomain);
            // Ghi vao CSDL
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<bool> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto)
        {
            var phieuDangKyDomain = _mapper.Map<PhieuDangKy>(phieuDangKyDto);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKyDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<bool> DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            // Xoa cac mau co lien quan den phieu dang ky bi xoa
            _repositoryManager.PhieuDangKy.DeletePhieuDangKyAsync(phieuDangKy);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id)
        {
            return await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(id);
        }

        public async Task<int> DuTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan)
        {
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
