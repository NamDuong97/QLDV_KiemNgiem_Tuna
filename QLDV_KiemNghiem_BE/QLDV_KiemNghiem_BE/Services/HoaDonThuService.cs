using System;
using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

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
        public async Task<IEnumerable<HoaDonThuDto>>  GetPhieuDangKiesOfCustomer(string maKH)
        {
            var HoaDonThuDomains = await _repositoryManager.HoaDonThu.GetPhieuDangKiesOfCustomer(maKH);
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
            var HoaDonThuDomain = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(maHoaDonThu);
            var result = _mapper.Map<HoaDonThuDto>(HoaDonThuDomain);
            return result;
        }
        public async Task<bool> CreateHoaDonThuAsync(HoaDonThuDto HoaDonThuDto)
        {
            if (HoaDonThuDto == null) return false;
           
            var HoaDonThuDomain = _mapper.Map<HoaDonThu>(HoaDonThuDto);
            HoaDonThuDomain.MaId = Guid.NewGuid().ToString();
            HoaDonThuDomain.NgayTao = DateTime.Now;

            await _repositoryManager.HoaDonThu.CreateHoaDonThuAsync(HoaDonThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateHoaDonThuAsync(HoaDonThuDto HoaDonThuDto)
        {
            if (HoaDonThuDto == null) return false;
            var HoaDonThuCheck = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(HoaDonThuDto.MaId);
            if (HoaDonThuCheck == null)
            {
                return false;
            }
            var HoaDonThuDomain = _mapper.Map<HoaDonThu>(HoaDonThuDto);
            HoaDonThuDomain.NgaySua = DateTime.Now;
            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(HoaDonThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteHoaDonThuAsync(HoaDonThu HoaDonThu)
        {
            if (HoaDonThu == null) return false;
            else
            {
                var HoaDonThuDomain = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(HoaDonThu.MaId);
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
