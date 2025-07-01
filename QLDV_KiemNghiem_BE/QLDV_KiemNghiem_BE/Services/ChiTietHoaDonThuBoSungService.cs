using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChiTietHoaDonThuBoSungService : IChiTietHoaDonThuBoSungService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChiTietHoaDonThuBoSungService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChiTietHoaDonThuBoSungDto>> GetChiTietHoaDonThuBoSungsAllAsync()
        {
            var ChiTietHoaDonThuBoSungDomains = await _repositoryManager.ChiTietHoaDonThuBoSung.GetChiTietHoaDonThuBoSungsAllAsync();
            var result = _mapper.Map<IEnumerable<ChiTietHoaDonThuBoSungDto>>(ChiTietHoaDonThuBoSungDomains);
            return result;
        }
        public async Task<ChiTietHoaDonThuBoSungDto?> FindChiTietHoaDonThuBoSungAsync(string maChiTietHoaDonThuBoSung)
        {
            if (maChiTietHoaDonThuBoSung == null || maChiTietHoaDonThuBoSung == "") return null;
            var ChiTietHoaDonThuBoSungDomain = await _repositoryManager.ChiTietHoaDonThuBoSung.FindChiTietHoaDonThuBoSungAsync(maChiTietHoaDonThuBoSung, false);
            var result = _mapper.Map<ChiTietHoaDonThuBoSungDto>(ChiTietHoaDonThuBoSungDomain);
            return result;
        }
        public async Task<ResponseModel1<ChiTietHoaDonThuBoSungDto>> CreateChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSungRequestCreateDto ChiTietHoaDonThuBoSungDto)
        {
            if (ChiTietHoaDonThuBoSungDto == null)
            {
                return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Tham số gửi lên bị null, vui lòng kiểm tra lại!",
                    Data = null
                };
            }

            var chiTietEntity = _mapper.Map<ChiTietHoaDonThuBoSung>(ChiTietHoaDonThuBoSungDto);
            chiTietEntity.MaId = Guid.NewGuid().ToString();
            chiTietEntity.TrangThai = true;

            // Tính lại ThanhTien nếu cần
            if (chiTietEntity.SoLuong > 0 && chiTietEntity.DonGia > 0)
            {
                chiTietEntity.ThanhTien = chiTietEntity.SoLuong * chiTietEntity.DonGia;
            }

            _repositoryManager.ChiTietHoaDonThuBoSung.CreateChiTietHoaDonThuBoSung(chiTietEntity);
            bool check = await _repositoryManager.SaveChangesAsync();

            var resultDto = _mapper.Map<ChiTietHoaDonThuBoSungDto>(chiTietEntity);

            return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
            {
                KetQua = check,
                Message = check
                    ? "Thêm chi tiết hóa đơn bổ sung thành công!"
                    : "Thêm chi tiết hóa đơn bổ sung thất bại, vui lòng thử lại!",
                Data = resultDto
            };
        }
        public async Task<ResponseModel1<ChiTietHoaDonThuBoSungDto>> UpdateChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSungRequestUpdateDto ChiTietHoaDonThuBoSungDto)
        {
            if (ChiTietHoaDonThuBoSungDto == null || string.IsNullOrWhiteSpace(ChiTietHoaDonThuBoSungDto.MaID))
            {
                return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Tham số đầu vào null hoặc không hợp lệ, vui lòng kiểm tra lại!",
                    Data = null
                };
            }

            var chiTietEntity = await _repositoryManager.ChiTietHoaDonThuBoSung.FindChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSungDto.MaID, false);
            if (chiTietEntity == null)
            {
                return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Không tìm thấy dữ liệu cần cập nhật!",
                    Data = null
                };
            }

            // Gán lại các giá trị cần cập nhật từ DTO sang entity
            _mapper.Map(ChiTietHoaDonThuBoSungDto, chiTietEntity);

            // Tính lại Thành tiền nếu SoLuong và DonGia hợp lệ
            if (chiTietEntity.SoLuong > 0 && chiTietEntity.DonGia > 0)
            {
                chiTietEntity.ThanhTien = chiTietEntity.SoLuong * chiTietEntity.DonGia;
            }


            // Cập nhật entity
            _repositoryManager.ChiTietHoaDonThuBoSung.UpdateChiTietHoaDonThuBoSungAsync(chiTietEntity);
            bool isSuccess = await _repositoryManager.SaveChangesAsync();

            var resultDto = _mapper.Map<ChiTietHoaDonThuBoSungDto>(chiTietEntity);

            return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
            {
                KetQua = isSuccess,
                Message = isSuccess
                    ? "Cập nhật chi tiết hóa đơn bổ sung thành công!"
                    : "Cập nhật thất bại, vui lòng thử lại!",
                Data = resultDto
            };
        }
        public async Task<ResponseModel1<ChiTietHoaDonThuBoSungDto>> DeleteChiTietHoaDonThuBoSungAsync(string maChiTietHoaDonThuBoSung)
        {
            if (string.IsNullOrWhiteSpace(maChiTietHoaDonThuBoSung))
            {
                return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Mã chi tiết hóa đơn bổ sung không hợp lệ!",
                    Data = null
                };
            }

            var entity = await _repositoryManager.ChiTietHoaDonThuBoSung.FindChiTietHoaDonThuBoSungAsync(maChiTietHoaDonThuBoSung, false);
            if (entity == null)
            {
                return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Không tìm thấy chi tiết hóa đơn bổ sung cần xóa!",
                    Data = null
                };
            }

            // Xóa entity
            _repositoryManager.ChiTietHoaDonThuBoSung.DeleteChiTietHoaDonThuBoSungAsync(entity);
            bool isDeleted = await _repositoryManager.SaveChangesAsync();

            var resultDto = _mapper.Map<ChiTietHoaDonThuBoSungDto>(entity);

            return new ResponseModel1<ChiTietHoaDonThuBoSungDto>
            {
                KetQua = isDeleted,
                Message = isDeleted
                    ? "Xóa chi tiết hóa đơn bổ sung thành công!"
                    : "Xóa thất bại, vui lòng thử lại!",
                Data = isDeleted ? resultDto : null
            };
        }

    }
}
