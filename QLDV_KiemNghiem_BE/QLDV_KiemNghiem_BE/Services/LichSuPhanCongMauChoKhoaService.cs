using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Services
{
    public class LichSuPhanCongMauChoKhoaService : ILichSuPhanCongMauChoKhoaService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public LichSuPhanCongMauChoKhoaService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<LichSuPhanCongMauChoKhoaDto> datas, Pagination pagi)> GetLichSuPhanCongMauChoKhoasAllAsync(LichSuPhanCongMauChoKhoaParam param)
        {
            var LichSuPhanCongMauChoKhoaDomains = await _repositoryManager.LichSuPhanCongMauChoKhoa.GetLichSuPhanCongMauChoKhoasAllAsync(param);
            // Dòng này sẽ tự động mapping đối tượng con của LichSuPhanCongMauChoKhoa là LichSuPhanCongMauChoKhoa sang LichSuPhanCongMauChoKhoaDto
            var dataReturn = _mapper.Map<List<LichSuPhanCongMauChoKhoaDto>>(LichSuPhanCongMauChoKhoaDomains);
            return (datas: dataReturn, pagi: LichSuPhanCongMauChoKhoaDomains.Pagination);
        }
        public async Task<LichSuPhanCongMauChoKhoaDto?> FindLichSuPhanCongMauChoKhoaAsync(string maLichSuPhanCongMauChoKhoa)
        {
            if (maLichSuPhanCongMauChoKhoa == null || maLichSuPhanCongMauChoKhoa == "") return null;
            var LichSuPhanCongMauChoKhoaDomain = await _repositoryManager.LichSuPhanCongMauChoKhoa.FindLichSuPhanCongMauChoKhoaAsync(maLichSuPhanCongMauChoKhoa);
            // Dòng này sẽ tự động mapping đối tượng con của LichSuPhanCongMauChoKhoa là LichSuPhanCongMauChoKhoa sang LichSuPhanCongMauChoKhoaDto
            var result = _mapper.Map<LichSuPhanCongMauChoKhoaDto>(LichSuPhanCongMauChoKhoaDomain);
            return result;
        }
        public async Task<ResponseModel1<LichSuPhanCongMauChoKhoaDto>> CreateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoaRequestCreateDto LichSuPhanCongMauChoKhoaDto, string user, string userId)
        {
            if (LichSuPhanCongMauChoKhoaDto == null) return new ResponseModel1<LichSuPhanCongMauChoKhoaDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var LichSuPhanCongMauChoKhoa = new LichSuPhanCongMauChoKhoa()
            {
                MaId = Guid.NewGuid().ToString(),
                NgayTao = DateTime.Now,
                ManvPhanCong = LichSuPhanCongMauChoKhoaDto.ManvPhanCong,
                TrangThai = 1,
                NguoiTao = user
            };
            _mapper.Map(LichSuPhanCongMauChoKhoaDto, LichSuPhanCongMauChoKhoa);

            _repositoryManager.LichSuPhanCongMauChoKhoa.CreateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa);
            bool check = await _repositoryManager.SaveChangesAsync();
            var LichSuPhanCongMauChoKhoaReturnDto = _mapper.Map<LichSuPhanCongMauChoKhoaDto>(LichSuPhanCongMauChoKhoa);

            return new ResponseModel1<LichSuPhanCongMauChoKhoaDto>
            {
                KetQua = check,
                Message = check ? "Them phan cong noi bo thanh cong!" : "Them phan cong noi bo that bai, vui long thu lai!",
                Data = LichSuPhanCongMauChoKhoaReturnDto
            };
        }
        public async Task<ResponseModel1<LichSuPhanCongMauChoKhoaDto>> UpdateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoaRequestUpdateDto LichSuPhanCongMauChoKhoaDto, string user, string userId)
        {
            if (LichSuPhanCongMauChoKhoaDto == null || LichSuPhanCongMauChoKhoaDto.MaId == null || LichSuPhanCongMauChoKhoaDto.MaId == "") return new ResponseModel1<LichSuPhanCongMauChoKhoaDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var LichSuPhanCongMauChoKhoaCheck = await _repositoryManager.LichSuPhanCongMauChoKhoa.FindLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoaDto.MaId);
            if (LichSuPhanCongMauChoKhoaCheck == null)
            {
                return new ResponseModel1<LichSuPhanCongMauChoKhoaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            LichSuPhanCongMauChoKhoaCheck.GhiChu = string.IsNullOrEmpty(LichSuPhanCongMauChoKhoaDto.GhiChu) ? LichSuPhanCongMauChoKhoaCheck.GhiChu : LichSuPhanCongMauChoKhoaDto.GhiChu;
            LichSuPhanCongMauChoKhoaCheck.NgaySua = DateTime.Now;
            LichSuPhanCongMauChoKhoaCheck.NguoiSua = user;
            bool check = await _repositoryManager.SaveChangesAsync();
            var LichSuPhanCongMauChoKhoaReturnDto = _mapper.Map<LichSuPhanCongMauChoKhoaDto>(LichSuPhanCongMauChoKhoaCheck);
            return new ResponseModel1<LichSuPhanCongMauChoKhoaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = LichSuPhanCongMauChoKhoaReturnDto
            };
        }
        public async Task<bool> DeleteLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa)
        {
            if (LichSuPhanCongMauChoKhoa == null) return false;
            else
            {
                var LichSuPhanCongMauChoKhoaDomain = await _repositoryManager.LichSuPhanCongMauChoKhoa.FindLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa.MaId);
                if (LichSuPhanCongMauChoKhoaDomain == null)
                {
                    return false;
                }
                _repositoryManager.LichSuPhanCongMauChoKhoa.DeleteLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoaDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}

