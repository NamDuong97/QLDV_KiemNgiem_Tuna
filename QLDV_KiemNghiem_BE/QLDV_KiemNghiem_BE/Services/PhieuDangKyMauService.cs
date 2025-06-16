using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyMauService : IPhieuDangKyMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhieuDangKyMauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhieuDangKyMauDto>> GetPhieuDangKyMauAllAsync()
        {
            List<PhieuDangKyMauDto> PhieuDangKyMauDtos = new List<PhieuDangKyMauDto>();
            var PhieuDangKyMauDomains = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAllAsync();
            foreach (var PhieuDangKyMau in PhieuDangKyMauDomains)
            {
                var PhieuDangKyMauDto = _mapper.Map<PhieuDangKyMauDto>(PhieuDangKyMau);
                PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(PhieuDangKyMau.PhieuDangKyMauHinhAnhs);
                PhieuDangKyMauDtos.Add(PhieuDangKyMauDto);
            }
            return PhieuDangKyMauDtos;
        }
        public async Task<PhieuDangKyMauDto?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau)
        {
            if (maPhieuDangKyMau == null || maPhieuDangKyMau == "") return null;
            var PhieuDangKyMauDomain = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAsync(maPhieuDangKyMau);
            var result = _mapper.Map<PhieuDangKyMauDto>(PhieuDangKyMauDomain);
            result.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(PhieuDangKyMauDomain?.PhieuDangKyMauHinhAnhs);
            return result;
        }
        public async Task<bool> CreatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMauDto)
        {
            // Khoi tao 1 ob PhieuDangKyMauDomain moi kem ID tu dong tang
            PhieuDangKyMau PhieuDangKyMauDomain = new PhieuDangKyMau();
            PhieuDangKyMauDomain = _mapper.Map<PhieuDangKyMau>(PhieuDangKyMauDto);
            PhieuDangKyMauDomain.MaId = Guid.NewGuid().ToString();
            _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(PhieuDangKyMauDomain);
            // kiem tra neu co hinh anh gui len hay k
            if (PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs.Count() > 0)
            {
                PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnh>>(PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs);
                // Them du lieu hinh anh cua PhieuDangKyMau vao bang PhieuDangKyMauHinhAnh
                foreach (var PhieuDangKyMauHinhAnh in PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs)
                {
                    _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh);
                }
            }
            bool check =  await _repositoryManager.SaveChangesAsync();    
            return check;
        }
        public async Task<bool> UpdatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMauDto)
        {
            var PhieuDangKyMauDomain = _mapper.Map<PhieuDangKyMau>(PhieuDangKyMauDto);
            var PhieuDangKyMauCheck = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAsync(PhieuDangKyMauDto.MaId);
            if (PhieuDangKyMauCheck == null)
            {
                return false;
            }
            _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(PhieuDangKyMauDomain);
            if (PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs.Count() > 0)
            {
                PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnh>>(PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs);
                // Them du lieu hinh anh cua PhieuDangKyMau vao bang PhieuDangKyMauHinhAnh
                foreach (var PhieuDangKyMauHinhAnh in PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs)
                {
                    _repositoryManager.PhieuDangKyMauHinhAnh.UpdatePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnh);
                }
            }
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeletePhieuDangKyMauAsync(string maPhieuDangKyMau)
        {
            var PhieuDangKyMauDomain = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAsync(maPhieuDangKyMau);
            if (PhieuDangKyMauDomain == null)
            {
                return false;
            }
            _repositoryManager.PhieuDangKyMau.DeletePhieuDangKyMauAsync(PhieuDangKyMauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
