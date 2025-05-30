using AutoMapper;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Services
{
    public class DmPhuLieuHoaChatService : IDmPhuLieuHoaChatService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
       
        public DmPhuLieuHoaChatService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DmPhuLieuHoaChatDto>> GetDmPhuLieuHoaChatAllAsync()
        {
            var dmPhuLieuHoaChatDomains = await _repositoryManager.DmPhuLieuHoaChat.GetDmPhuLieuHoaChatAllAsync();
            var dmPhuLieuHoaChatDtos = _mapper.Map<List<DmPhuLieuHoaChatDto>>(dmPhuLieuHoaChatDomains);
            return dmPhuLieuHoaChatDtos;
        }
        public async Task<DmPhuLieuHoaChatDto?> FindDmPhuLieuHoaChatAsync(string id)
        {
            var dmPhuLieuHoaChatDomain = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatAsync(id);
            var dmPhuLieuHoaChatDto = _mapper.Map<DmPhuLieuHoaChatDto>(dmPhuLieuHoaChatDomain);
            return dmPhuLieuHoaChatDto;
        }

        public async Task<bool> CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatDto plhcDto)
        {
            var dmPhuLieuHoaChatDomain = _mapper.Map<DmPhuLieuHoaChat>(plhcDto);
            _repositoryManager.DmPhuLieuHoaChat.CreateDmPhuLieuHoaChatAsync(dmPhuLieuHoaChatDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<bool> UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatDto plhcDto)
        {
            var checkDmPhuLieuHoaChat = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatAsync(plhcDto.MaId);
            if (checkDmPhuLieuHoaChat == null)
            {
                return false;
            }
            var dmPhuLieuHoaChatDomain = _mapper.Map<DmPhuLieuHoaChat>(plhcDto);
            _repositoryManager.DmPhuLieuHoaChat.UpdateDmPhuLieuHoaChatAsync(dmPhuLieuHoaChatDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
        public async Task<bool> DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc)
        {
            var dmPhuLieuHoaChatDomain = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatAsync(plhc.MaId);
            if (dmPhuLieuHoaChatDomain == null)
            {
                return false;
            }
            _repositoryManager.DmPhuLieuHoaChat.DeleteDmPhuLieuHoaChatAsync(plhc);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
