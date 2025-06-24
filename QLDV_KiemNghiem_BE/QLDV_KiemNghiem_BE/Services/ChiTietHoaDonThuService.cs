using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChiTietHoaDonThuService : IChiTietHoaDonThuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChiTietHoaDonThuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ChiTietHoaDonThuDto>> GetChiTietHoaDonThusAllAsync()
        {
            var ChiTietHoaDonThuDomains = await _repositoryManager.ChiTietHoaDonThu.GetChiTietHoaDonThusAllAsync();
            var result = _mapper.Map<IEnumerable<ChiTietHoaDonThuDto>>(ChiTietHoaDonThuDomains);
            return result;
        }
        public async Task<ChiTietHoaDonThuDto?> FindChiTietHoaDonThuAsync(string maChiTietHoaDonThu)
        {
            if (maChiTietHoaDonThu == null || maChiTietHoaDonThu == "") return null;
            var ChiTietHoaDonThuDomain = await _repositoryManager.ChiTietHoaDonThu.FindChiTietHoaDonThuAsync(maChiTietHoaDonThu);
            var result = _mapper.Map<ChiTietHoaDonThuDto>(ChiTietHoaDonThuDomain);
            return result;
        }
      
        public async Task<bool> CreateChiTietHoaDonThuAsync(ChiTietHoaDonThuDto ChiTietHoaDonThuDto, string user)
        {
            if (ChiTietHoaDonThuDto == null) return false;

            var ChiTietHoaDonThuDomain = _mapper.Map<ChiTietHoaDonThu>(ChiTietHoaDonThuDto);
            ChiTietHoaDonThuDomain.MaId = Guid.NewGuid().ToString();

            var checkExistsHoaDon = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(ChiTietHoaDonThuDto.MaHd, true);
            if(checkExistsHoaDon== null)
            {
                return false;
            }
            checkExistsHoaDon.NgaySua = DateTime.Now;
            checkExistsHoaDon.NguoiSua = user;

            await _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(ChiTietHoaDonThuDomain);
            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(checkExistsHoaDon);

            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateChiTietHoaDonThuAsync(ChiTietHoaDonThuDto ChiTietHoaDonThuDto, string user)
        {
            if (ChiTietHoaDonThuDto == null) return false;
            var ChiTietHoaDonThuCheck = await _repositoryManager.ChiTietHoaDonThu.FindChiTietHoaDonThuAsync(ChiTietHoaDonThuDto.MaId);
            if (ChiTietHoaDonThuCheck == null)
            {
                return false;
            }

            var checkExistsHoaDon = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(ChiTietHoaDonThuDto.MaHd, true);
            if (checkExistsHoaDon == null)
            {
                return false;
            }

            checkExistsHoaDon.NgaySua = DateTime.Now;
            checkExistsHoaDon.NguoiSua = user;
            var ChiTietHoaDonThuDomain = _mapper.Map<ChiTietHoaDonThu>(ChiTietHoaDonThuDto);
            _repositoryManager.ChiTietHoaDonThu.UpdateChiTietHoaDonThuAsync(ChiTietHoaDonThuDomain);
            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(checkExistsHoaDon);

            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteChiTietHoaDonThuAsync(string MaChiTietHoaDonThu, string user)
        {
            if (MaChiTietHoaDonThu == null || MaChiTietHoaDonThu== "") return false;
            else
            {
                var ChiTietHoaDonThuDomain = await _repositoryManager.ChiTietHoaDonThu.FindChiTietHoaDonThuAsync(MaChiTietHoaDonThu);
                if (ChiTietHoaDonThuDomain == null)
                {
                    return false;
                }

                var checkExistsHoaDon = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(ChiTietHoaDonThuDomain.MaHd, true);
                if (checkExistsHoaDon == null)
                {
                    return false;
                }
                checkExistsHoaDon.NgaySua = DateTime.Now;
                checkExistsHoaDon.NguoiSua = user;

                _repositoryManager.ChiTietHoaDonThu.DeleteChiTietHoaDonThuAsync(ChiTietHoaDonThuDomain);
                _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(checkExistsHoaDon);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
