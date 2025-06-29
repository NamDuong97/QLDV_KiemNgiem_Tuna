using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChiTietPhieuDuTruService : IChiTietPhieuDuTruService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChiTietPhieuDuTruService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietPhieuDuTruDto>> GetChiTietPhieuDuTrusAllAsync()
        {
            var ChiTietPhieuDuTruDomains = await _repositoryManager.ChiTietPhieuDuTru.GetChiTietPhieuDuTrusAllAsync();
            var result = _mapper.Map<IEnumerable<ChiTietPhieuDuTruDto>>(ChiTietPhieuDuTruDomains);
            return result;
        }
        public async Task<ChiTietPhieuDuTruDto?> FindChiTietPhieuDuTruAsync(string maChiTietPhieuDuTru)
        {
            if (maChiTietPhieuDuTru == null || maChiTietPhieuDuTru == "") return null;
            var ChiTietPhieuDuTruDomain = await _repositoryManager.ChiTietPhieuDuTru.FindChiTietPhieuDuTruAsync(maChiTietPhieuDuTru);
            var result = _mapper.Map<ChiTietPhieuDuTruDto>(ChiTietPhieuDuTruDomain);
            return result;
        }
        public async Task<ResponseModel1<ChiTietPhieuDuTruDto>> CreateChiTietPhieuDuTruAsync(ChiTietPhieuDuTruRequestCreateDto ChiTietPhieuDuTruDto)
        {
            if (ChiTietPhieuDuTruDto == null) return new ResponseModel1<ChiTietPhieuDuTruDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var ChiTietPhieuDuTruDomain = _mapper.Map<ChiTietPhieuDuTru>(ChiTietPhieuDuTruDto);
            ChiTietPhieuDuTruDomain.MaId = Guid.NewGuid().ToString();
            ChiTietPhieuDuTruDomain.TrangThai = "active";

            _repositoryManager.ChiTietPhieuDuTru.CreateChiTietPhieuDuTru(ChiTietPhieuDuTruDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var ChiTietPhieuDuTruReturnDto = _mapper.Map<ChiTietPhieuDuTruDto>(ChiTietPhieuDuTruDomain);

            return new ResponseModel1<ChiTietPhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Them chi tiet phieu du tru thanh cong!" : "Them chi tiet phieu du tru that bai, vui long thu lai!",
                Data = ChiTietPhieuDuTruReturnDto
            };
        }
        public async Task<ResponseModel1<ChiTietPhieuDuTruDto>> UpdateChiTietPhieuDuTruAsync(ChiTietPhieuDuTruRequestUpdateDto ChiTietPhieuDuTruDto)
        {
            if (ChiTietPhieuDuTruDto == null || ChiTietPhieuDuTruDto.MaId == null || ChiTietPhieuDuTruDto.MaId == "") return new ResponseModel1<ChiTietPhieuDuTruDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var ChiTietPhieuDuTruCheck = await _repositoryManager.ChiTietPhieuDuTru.FindChiTietPhieuDuTruAsync(ChiTietPhieuDuTruDto.MaId);
            if (ChiTietPhieuDuTruCheck == null)
            {
                return new ResponseModel1<ChiTietPhieuDuTruDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            _mapper.Map(ChiTietPhieuDuTruDto, ChiTietPhieuDuTruCheck);
            _repositoryManager.ChiTietPhieuDuTru.UpdateChiTietPhieuDuTruAsync(ChiTietPhieuDuTruCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var ChiTietPhieuDuTruReturnDto = _mapper.Map<ChiTietPhieuDuTruDto>(ChiTietPhieuDuTruCheck);
            return new ResponseModel1<ChiTietPhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = ChiTietPhieuDuTruReturnDto
            };
        }
        public async Task<bool> DeleteChiTietPhieuDuTruAsync(string  maChiTietPhieuDuTru)
        {
            if (maChiTietPhieuDuTru == null) return false;
            else
            {
                var ChiTietPhieuDuTruDomain = await _repositoryManager.ChiTietPhieuDuTru.FindChiTietPhieuDuTruAsync(maChiTietPhieuDuTru);
                if (ChiTietPhieuDuTruDomain == null)
                {
                    return false;
                }
                _repositoryManager.ChiTietPhieuDuTru.DeleteChiTietPhieuDuTruAsync(ChiTietPhieuDuTruDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
