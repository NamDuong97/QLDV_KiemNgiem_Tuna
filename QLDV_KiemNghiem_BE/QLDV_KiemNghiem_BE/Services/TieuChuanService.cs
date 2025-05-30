using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class TieuChuanService : ITieuChuanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public TieuChuanService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TieuChuanDto>> GetTieuChuansAllAsync()
        {
            var tieuChuanDomains = await _repositoryManager.TieuChuan.GetTieuChuansAllAsync();
            var result = _mapper.Map<IEnumerable<TieuChuanDto>>(tieuChuanDomains);
            return result;
        }
        public async Task<TieuChuanDto?> FindTieuChuanAsync(string maTieuChuan)
        {
            var tieuChuanDomain = await _repositoryManager.TieuChuan.FindTieuChuanAsync(maTieuChuan);
            var result = _mapper.Map<TieuChuanDto>(tieuChuanDomain);
            return result;
        }
        //public async Task<TieuChuanDto?> FindTieuChuanByNameAsync(string tenTieuChuan)
        //{
        //    var tieuChuanDomain = await _repositoryManager.TieuChuan.FindTieuChuanByNameAsync(tenTieuChuan);
        //    var result = _mapper.Map<TieuChuanDto>(tieuChuanDomain);
        //    return result;
        //}
        public async Task<bool> CreateTieuChuanAsync(TieuChuanDto tieuChuanDto)
        {
            var tieuChuanDomain = _mapper.Map<TieuChuan>(tieuChuanDto);
            _repositoryManager.TieuChuan.CreateTieuChuanAsync(tieuChuanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;   
        }
        public async Task<bool> UpdateTieuChuanAsync(TieuChuanDto tieuChuanDto)
        {
            var tieuChuanDomain = _mapper.Map<TieuChuan>(tieuChuanDto);
            var tieuChuanCheck = await _repositoryManager.TieuChuan.FindTieuChuanAsync(tieuChuanDto.MaId);
            if (tieuChuanCheck == null)
            {
                return false;
            }
            _repositoryManager.TieuChuan.UpdateTieuChuanAsync(tieuChuanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteTieuChuanAsync(TieuChuan tieuChuan)
        {
            var TieuChuanDomain = await _repositoryManager.TieuChuan.FindTieuChuanAsync(tieuChuan.MaId);
            if (TieuChuanDomain == null)
            {
                return false;
            }
            _repositoryManager.TieuChuan.DeleteTieuChuanAsync(tieuChuan);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
