using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class LichSuPhanCongService : ILichSuPhanCongService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public LichSuPhanCongService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<LichSuPhanCongDto> datas, Pagination pagi)> GetLichSuPhanCongsAllAsync(LichSuPhanCongParam param)
        {
            var LichSuPhanCongDomains = await _repositoryManager.LichSuPhanCong.GetLichSuPhanCongsAllAsync(param);
            // Dòng này sẽ tự động mapping đối tượng con của LichSuPhanCong là LichSuPhanCong sang LichSuPhanCongDto
            var dataReturn = _mapper.Map<List<LichSuPhanCongDto>>(LichSuPhanCongDomains);
            return (datas: dataReturn, pagi : LichSuPhanCongDomains.Pagination);
        }
        public async Task<LichSuPhanCongDto?> FindLichSuPhanCongAsync(string maLichSuPhanCong)
        {
            if (maLichSuPhanCong == null || maLichSuPhanCong == "") return null;
            var LichSuPhanCongDomain = await _repositoryManager.LichSuPhanCong.FindLichSuPhanCongAsync(maLichSuPhanCong);
            // Dòng này sẽ tự động mapping đối tượng con của LichSuPhanCong là LichSuPhanCong sang LichSuPhanCongDto
            var result = _mapper.Map<LichSuPhanCongDto>(LichSuPhanCongDomain);
            return result;
        }

        public async Task<List<LichSuPhanCongDto>?> GetLichSuPhanCongByPCNB(string maPCNB)
        {
            var results = await _repositoryManager.LichSuPhanCong.FindLichSuPhanCongByPCNBAsync(maPCNB, false);
            var data =  _mapper.Map<List<LichSuPhanCongDto>>(results);
            return data;
        }

        public async Task<ResponseModel1<LichSuPhanCongDto>> CreateLichSuPhanCongAsync(LichSuPhanCongRequestCreateDto LichSuPhanCongDto, string user, string userId)
        {
            if (LichSuPhanCongDto == null) return new ResponseModel1<LichSuPhanCongDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var lichSuPhanCong = new LichSuPhanCong()
            {
                MaId = Guid.NewGuid().ToString(),
                NgayTao = DateTime.Now,
                NguoiTao = LichSuPhanCongDto.TennvPhanCong,
                TrangThai = "active"
            };
            _mapper.Map(LichSuPhanCongDto, lichSuPhanCong);
           
            _repositoryManager.LichSuPhanCong.CreateLichSuPhanCongAsync(lichSuPhanCong);
            bool check = await _repositoryManager.SaveChangesAsync();
            var LichSuPhanCongReturnDto = _mapper.Map<LichSuPhanCongDto>(lichSuPhanCong);

            return new ResponseModel1<LichSuPhanCongDto>
            {
                KetQua = check,
                Message = check ? "Them phan cong noi bo thanh cong!" : "Them phan cong noi bo that bai, vui long thu lai!",
                Data = LichSuPhanCongReturnDto
            };
        }
        public async Task<ResponseModel1<LichSuPhanCongDto>> UpdateLichSuPhanCongAsync(LichSuPhanCongRequestUpdateDto LichSuPhanCongDto,string user, string userId)
        {
            if (LichSuPhanCongDto == null || LichSuPhanCongDto.MaId == null || LichSuPhanCongDto.MaId == "") return new ResponseModel1<LichSuPhanCongDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var LichSuPhanCongCheck = await _repositoryManager.LichSuPhanCong.FindLichSuPhanCongAsync(LichSuPhanCongDto.MaId);
            if (LichSuPhanCongCheck == null)
            {
                return new ResponseModel1<LichSuPhanCongDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
             _mapper.Map(LichSuPhanCongDto, LichSuPhanCongCheck);
            LichSuPhanCongCheck.NgaySua = DateTime.Now;
            LichSuPhanCongCheck.NguoiSua = user;
            _repositoryManager.LichSuPhanCong.UpdateLichSuPhanCongAsync(LichSuPhanCongCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var LichSuPhanCongReturnDto = _mapper.Map<LichSuPhanCongDto>(LichSuPhanCongCheck);
            return new ResponseModel1<LichSuPhanCongDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = LichSuPhanCongReturnDto
            };
        }

        public async Task<bool> DeleteLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong)
        {
            if (LichSuPhanCong == null) return false;
            else
            {
                var LichSuPhanCongDomain = await _repositoryManager.LichSuPhanCong.FindLichSuPhanCongAsync(LichSuPhanCong.MaId);
                if (LichSuPhanCongDomain == null)
                {
                    return false;
                }
                _repositoryManager.LichSuPhanCong.DeleteLichSuPhanCongAsync(LichSuPhanCongDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
