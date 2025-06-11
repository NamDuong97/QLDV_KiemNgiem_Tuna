using System;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class HoaDonThuService : IHoaDonThuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public HoaDonThuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<HoaDonThuDto>> GetHoaDonThusAllAsync()
        {
            var HoaDonThuDomains = await _repositoryManager.HoaDonThu.GetHoaDonThusAllAsync();
            List<HoaDonThuDto> hoaDonThuDtos = new List<HoaDonThuDto>();
            foreach(var hoaDon in HoaDonThuDomains)
            {
                var hoaDonThuDto = _mapper.Map<HoaDonThuDto>(hoaDon);
                List<HoaDonThuBoSungDto> hoaDonThuBoSungDtos = new List<HoaDonThuBoSungDto>();
                List<ChiTietHoaDonThuDto> chiTietHoaDonThuDtos = new List<ChiTietHoaDonThuDto>();

                chiTietHoaDonThuDtos = _mapper.Map<List<ChiTietHoaDonThuDto>>(hoaDon.ChiTietHoaDonThus);
                hoaDonThuDto.ChiTietHoaDonThus = chiTietHoaDonThuDtos;

                foreach(var hoaDonBoSung in hoaDon.HoaDonThuBoSungs)
                {
                    var hoaDonBoSungDto = _mapper.Map<HoaDonThuBoSungDto>(hoaDonBoSung);
                    hoaDonBoSungDto.ChiTietHoaDonThuBoSungs = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(hoaDonBoSung.ChiTietHoaDonThuBoSungs);
                    hoaDonThuBoSungDtos.Add(hoaDonBoSungDto);
                }
                hoaDonThuDto.HoaDonThuBoSungs = hoaDonThuBoSungDtos;

                hoaDonThuDtos.Add(hoaDonThuDto);
            }
            return hoaDonThuDtos;
        }
        public async Task<IEnumerable<HoaDonThuDto>>  GetHoaDonThuOfCustomer(string maKH)
        {
            var HoaDonThuDomains = await _repositoryManager.HoaDonThu.GetHoaDonThuOfCustomer(maKH);
            List<HoaDonThuDto> hoaDonThuDtos = new List<HoaDonThuDto>();
            foreach (var hoaDon in HoaDonThuDomains)
            {
                var hoaDonThuDto = _mapper.Map<HoaDonThuDto>(hoaDon);
                List<HoaDonThuBoSungDto> hoaDonThuBoSungDtos = new List<HoaDonThuBoSungDto>();
                List<ChiTietHoaDonThuDto> chiTietHoaDonThuDtos = new List<ChiTietHoaDonThuDto>();

                chiTietHoaDonThuDtos = _mapper.Map<List<ChiTietHoaDonThuDto>>(hoaDon.ChiTietHoaDonThus);
                hoaDonThuDto.ChiTietHoaDonThus = chiTietHoaDonThuDtos;

                foreach (var hoaDonBoSung in hoaDon.HoaDonThuBoSungs)
                {
                    var hoaDonBoSungDto = _mapper.Map<HoaDonThuBoSungDto>(hoaDonBoSung);
                    hoaDonBoSungDto.ChiTietHoaDonThuBoSungs = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(hoaDonBoSung.ChiTietHoaDonThuBoSungs);
                    hoaDonThuBoSungDtos.Add(hoaDonBoSungDto);
                }
                hoaDonThuDto.HoaDonThuBoSungs = hoaDonThuBoSungDtos;

                hoaDonThuDtos.Add(hoaDonThuDto);
            }
            return hoaDonThuDtos;
        }
        public async Task<HoaDonThuDto?> FindHoaDonThuAsync(string maHoaDonThu)
        {
            if (maHoaDonThu == null || maHoaDonThu == "") return null;
            var HoaDonThuDomain = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(maHoaDonThu, false);
            var result = _mapper.Map<HoaDonThuDto>(HoaDonThuDomain);
            return result;
        }
        public async Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuByAsync(HoaDonThuDto hoaDonThuDto)
        {
            if (hoaDonThuDto == null)
            {
                return new ResponseModel1<HoaDonThuDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao",
                    Data = null
                };
            }
            var hoaDonThuDomain = _mapper.Map<HoaDonThu>(hoaDonThuDto);
            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(hoaDonThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var hoaDonThuReturn = _mapper.Map<HoaDonThuDto>(hoaDonThuDomain);
            return new ResponseModel1<HoaDonThuDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat hoa don thu thanh cong" : "Cạp nhat hoa don thu that bai",
                Data = hoaDonThuReturn
            };
        }
        public async Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuByPhieuDangKyAsync(PhieuDangKyDto phieuDangKy)
        {
            decimal tongTien = 0;
            List<ChiTietHoaDonThuDto> chiTietHoaDonThuDtos = new List<ChiTietHoaDonThuDto>();
            HoaDonThu hoaDonThu = new HoaDonThu()
            {
                MaId = Guid.NewGuid().ToString(),
                MaHd = "HD" + PublicFunction.getTimeSystem() + "_" + phieuDangKy.SoDkpt,
                MaPhieuDangKy = phieuDangKy.MaId,
                TongTien = tongTien,
                NgayLap = DateTime.Now,
                GhiChu = "Tao hoa don thanh toan cho phieu dang ky" + phieuDangKy.SoDkpt,
                TrangThai = true,
                NgayTao = DateTime.Now,
                NguoiTao = "admin",
                SoDkpt = phieuDangKy.SoDkpt
            };
            // Them chi tiet hoa don thu cho hoa don moi tao
            foreach (var mau in phieuDangKy.Maus)
            {
                ChiTietHoaDonThu chiTietHoaDonThu = new ChiTietHoaDonThu()
                {
                    MaId = Guid.NewGuid().ToString(),
                    MaMau = mau.MaId,
                    MaHd = hoaDonThu.MaId,
                    ThanhTien = await _repositoryManager.HoaDonThu.GetToTalMoneyOfMau(mau.MaDmMau, mau.MaTieuChuan, mau.MaLoaiDv),
                    GhiChu = "Hoa don cho mau" + mau.MaId,
                    TrangThai = true,
                    NgayTao = DateTime.Now,
                    NguoiTao = "admin"
                };
                tongTien += (decimal)chiTietHoaDonThu.ThanhTien;
                await _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(chiTietHoaDonThu);
                var chiTietHoaDonThuDto = _mapper.Map<ChiTietHoaDonThuDto>(chiTietHoaDonThu);
                chiTietHoaDonThuDtos.Add(chiTietHoaDonThuDto);
            }
            hoaDonThu.TongTien = tongTien;
            await _repositoryManager.HoaDonThu.CreateHoaDonThuAsync(hoaDonThu);
            bool check = await _repositoryManager.SaveChangesAsync();
            var hoaDonThuDto = _mapper.Map<HoaDonThuDto>(hoaDonThu);
            hoaDonThuDto.ChiTietHoaDonThus = chiTietHoaDonThuDtos;

            return new ResponseModel1<HoaDonThuDto>
            {
                KetQua = check,
                Message = "Tao hoa don thanh cong",
                Data = hoaDonThuDto
            };
        }
        public async Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuAsync(HoaDonThuDto hoaDonThuDto)
        {
            if (hoaDonThuDto == null || hoaDonThuDto.MaId==null || hoaDonThuDto.MaId == "")
            {
                return new ResponseModel1<HoaDonThuDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao",
                    Data = null
                };
            }
            var checkHoaDonThu = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(hoaDonThuDto.MaId, true);
            if (checkHoaDonThu == null)
            {
                return new ResponseModel1<HoaDonThuDto>
                {
                    KetQua = false,
                    Message = "Hoa don can sua khong ton tai, vui long kiem tra lai du lieu",
                    Data = null
                };
            }
            else
            {
                hoaDonThuDto.NgaySua = DateTime.Now;
                hoaDonThuDto.NguoiSua = "admin";
                _mapper.Map(hoaDonThuDto, checkHoaDonThu);
                _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(checkHoaDonThu);
                bool check = await _repositoryManager.SaveChangesAsync();
                var hoaDonThuReturn = _mapper.Map<HoaDonThuDto>(checkHoaDonThu);
                return new ResponseModel1<HoaDonThuDto>
                {
                    KetQua = check,
                    Message = check ? "Cap nhat hoa don thu thanh cong" : "Cạp nhat hoa don thu that bai",
                    Data = hoaDonThuReturn
                };
            }
        }
        public async Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy)
        {
            var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(maPhieuDangKy);
            var hoaDonThu = await _repositoryManager.HoaDonThu.CheckExistHoaDonThuByPhieuDangKyAsync(maPhieuDangKy, true);
            if(hoaDonThu!= null && phieuDangKy != null  && phieuDangKy.PhieuDangKyMaus.Count() > 0)
            {
                hoaDonThu.TongTien = 0;
                foreach (var mau in phieuDangKy.PhieuDangKyMaus)
                {
                    hoaDonThu.TongTien += await _repositoryManager.HoaDonThu.GetToTalMoneyOfMau(mau.MaDmMau, mau.MaTieuChuan, mau.MaLoaiDv);
                }
            }
            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(hoaDonThu);
            bool check = await _repositoryManager.SaveChangesAsync();
            var hoaDonThuReturn = _mapper.Map<HoaDonThuDto>(hoaDonThu);
            return new ResponseModel1<HoaDonThuDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat hoa don thu thanh cong" : "Cap nhat hoa don thu that bai",
                Data = hoaDonThuReturn
            };
        }
        public async Task<bool> DeleteHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            if (HoaDonThu == null) return false;
            else
            {
                var HoaDonThuDomain = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(HoaDonThu.MaId, false);
                if (HoaDonThuDomain == null)
                {
                    return false;
                }
                _repositoryManager.HoaDonThu.DeleteHoaDonThuAsync(HoaDonThuDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
