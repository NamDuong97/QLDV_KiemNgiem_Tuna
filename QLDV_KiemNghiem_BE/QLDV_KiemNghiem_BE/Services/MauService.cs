using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class MauService : IMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public MauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<MauDto>> GetMauAllAsync()
        {
            List<MauDto> mauDtos = new List<MauDto>();
            var mauDomains = await _repositoryManager.Mau.GetMauAllAsync();
            foreach (var mau in mauDomains)
            {
                var mauDto = _mapper.Map<MauDto>(mau);
                mauDto.MauHinhAnhs = _mapper.Map<List<MauHinhAnhDto>>(mau.MauHinhAnhs);
                mauDtos.Add(mauDto);
            }
            return mauDtos;
        }
        public async Task<MauDto?> GetMauAsync(string maMau)
        {
            var mauDomain = await _repositoryManager.Mau.GetMauAsync(maMau);
            var result = _mapper.Map<MauDto>(mauDomain);
            result.MauHinhAnhs = _mapper.Map<List<MauHinhAnhDto>>(mauDomain?.MauHinhAnhs);
            return result;
        }
        public async Task<bool> CreateMauAsync(MauDto mauDto)
        {
            // Khoi tao 1 ob mauDomain moi kem ID tu dong tang
            Mau mauDomain = new Mau(); 
            mauDomain = _mapper.Map<Mau>(mauDto);
            mauDomain.MaMau = mauDomain?.TenMau?.Trim().ToString() + mauDomain?.Madv + PublicFunc.getTimeSystem() + mauDomain?.ThoiGianTieuChuan.ToString();
            _repositoryManager.Mau.CreateMauAsync(mauDomain);
            // kiem tra neu co hinh anh gui len hay k
            if (mauDto.MauHinhAnhs.Count() > 0)
            {
                mauDomain.MauHinhAnhs = _mapper.Map<List<MauHinhAnh>>(mauDto.MauHinhAnhs);
                // Them du lieu hinh anh cua mau vao bang MauHinhAnh
                foreach (var mauHinhAnh in mauDomain.MauHinhAnhs)
                {
                    _repositoryManager.MauHinhAnh.CreateMauHinhAnhAsync(mauHinhAnh);
                }
            }
            bool check =  await _repositoryManager.SaveChangesAsync();    
            return check;
        }
        public async Task<bool> UpdateMauAsync(MauDto mauDto)
        {
            var mauDomain = _mapper.Map<Mau>(mauDto);
            var mauCheck = await _repositoryManager.Mau.GetMauAsync(mauDto.MaId);
            if (mauCheck == null)
            {
                return false;
            }
            _repositoryManager.Mau.UpdateMauAsync(mauDomain);
            if (mauDto.MauHinhAnhs.Count() > 0)
            {
                mauDomain.MauHinhAnhs = _mapper.Map<List<MauHinhAnh>>(mauDto.MauHinhAnhs);
                // Them du lieu hinh anh cua mau vao bang MauHinhAnh
                foreach (var mauHinhAnh in mauDomain.MauHinhAnhs)
                {
                    _repositoryManager.MauHinhAnh.UpdateMauHinhAnhAsync(mauHinhAnh);
                }
            }
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteMauAsync(string maMau)
        {
            var mauDomain = await _repositoryManager.Mau.GetMauAsync(maMau);
            if (mauDomain == null)
            {
                return false;
            }
            _repositoryManager.Mau.DeleteMauAsync(mauDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
