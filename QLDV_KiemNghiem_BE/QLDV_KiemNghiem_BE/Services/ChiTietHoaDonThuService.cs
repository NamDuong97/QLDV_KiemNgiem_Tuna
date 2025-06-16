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
      
        public async Task<bool> CreateChiTietHoaDonThuAsync(ChiTietHoaDonThuDto ChiTietHoaDonThuDto)
        {
            if (ChiTietHoaDonThuDto == null) return false;

            var ChiTietHoaDonThuDomain = _mapper.Map<ChiTietHoaDonThu>(ChiTietHoaDonThuDto);
            ChiTietHoaDonThuDomain.MaId = Guid.NewGuid().ToString();
            ChiTietHoaDonThuDomain.NgayTao = DateTime.Now;

            _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(ChiTietHoaDonThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> UpdateChiTietHoaDonThuAsync(ChiTietHoaDonThuDto ChiTietHoaDonThuDto)
        {
            if (ChiTietHoaDonThuDto == null) return false;
            var ChiTietHoaDonThuCheck = await _repositoryManager.ChiTietHoaDonThu.FindChiTietHoaDonThuAsync(ChiTietHoaDonThuDto.MaId);
            if (ChiTietHoaDonThuCheck == null)
            {
                return false;
            }
            var ChiTietHoaDonThuDomain = _mapper.Map<ChiTietHoaDonThu>(ChiTietHoaDonThuDto);
            ChiTietHoaDonThuDomain.NgaySua = DateTime.Now;
            _repositoryManager.ChiTietHoaDonThu.UpdateChiTietHoaDonThuAsync(ChiTietHoaDonThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu)
        {
            if (ChiTietHoaDonThu == null) return false;
            else
            {
                var ChiTietHoaDonThuDomain = await _repositoryManager.ChiTietHoaDonThu.FindChiTietHoaDonThuAsync(ChiTietHoaDonThu.MaId);
                if (ChiTietHoaDonThuDomain == null)
                {
                    return false;
                }
                _repositoryManager.ChiTietHoaDonThu.DeleteChiTietHoaDonThuAsync(ChiTietHoaDonThuDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
