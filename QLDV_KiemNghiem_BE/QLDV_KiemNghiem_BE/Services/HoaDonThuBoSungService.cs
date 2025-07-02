using AutoMapper;
using Org.BouncyCastle.Bcpg.OpenPgp;
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
    public class HoaDonThuBoSungService : IHoaDonThuBoSungService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public HoaDonThuBoSungService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<HoaDonThuBoSungProcedureDto> datas, Pagination pagi)> GetHoaDonThuBoSungAllAsync(HoaDonThuBoSungParam param)
        {
            List<HoaDonThuBoSungProcedureDto> hoaDonThuBoSungProcedureDtos = new List<HoaDonThuBoSungProcedureDto> ();
            var phieuTienDoDomains = await _repositoryManager.HoaDonThuBoSung.GetHoaDonThuBoSungAllAsync(param);
            foreach(var item in phieuTienDoDomains)
            {
                var data = _mapper.Map<HoaDonThuBoSungProcedureDto>(item);
                data.ChiTietHoaDonThuBoSungDtos = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(item.ChiTietHoaDonThuBoSungs);
                hoaDonThuBoSungProcedureDtos.Add(data);
            }
            return (datas: hoaDonThuBoSungProcedureDtos, pagi: phieuTienDoDomains.Pagination);
        }
        public async Task<HoaDonThuBoSungProcedureDto?> FindHoaDonThuBoSungShowAsync(string maHoaDonThuBoSung)
        {
            if (string.IsNullOrEmpty(maHoaDonThuBoSung)) return null;
            var HoaDonThuBoSungDomain = await _repositoryManager.HoaDonThuBoSung.FindHoaDonThuBoSungShowAsync(maHoaDonThuBoSung);
            if(HoaDonThuBoSungDomain!= null)
            {
                var result = _mapper.Map<HoaDonThuBoSungProcedureDto>(HoaDonThuBoSungDomain);
                result.ChiTietHoaDonThuBoSungDtos = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(HoaDonThuBoSungDomain.ChiTietHoaDonThuBoSungs);
                return result;
            }
            return null;
        }
        public async Task<HoaDonThuBoSungDto?> FindHoaDonThuBoSungAsync(string maHoaDonThuBoSung)
        {
            if (maHoaDonThuBoSung == null || maHoaDonThuBoSung == "") return null;
            var HoaDonThuBoSungDomain = await _repositoryManager.HoaDonThuBoSung.FindHoaDonThuBoSungAsync(maHoaDonThuBoSung, false);
            var result = _mapper.Map<HoaDonThuBoSungDto>(HoaDonThuBoSungDomain);
            return result;
        }
        public async Task<ResponseModel1<HoaDonThuBoSungDto>> CreateHoaDonBoSungAsync(HoaDonThuBoSungRequestCreateDto hoaDonThuBoSungDto,string user,string userId)
        {
            List<ChiTietHoaDonThuBoSung> chiTietEntities = new();

            if (hoaDonThuBoSungDto == null)
            {
                return new ResponseModel1<HoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Tham số gửi lên null, vui lòng kiểm tra lại!",
                    Data = null
                };
            }

            // Khởi tạo entity hóa đơn
            HoaDonThuBoSung hoaDonThuBoSung = new HoaDonThuBoSung
            {
                MaId = Guid.NewGuid().ToString(),
                MaHd = hoaDonThuBoSungDto.MaHD,
                TongTien = 0,
                GhiChu = hoaDonThuBoSungDto.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = user,
                TrangThai = "moi tao"
            };

            // Xử lý chi tiết hóa đơn nếu có
            if (hoaDonThuBoSungDto.ChiTietHoaDonThuBoSungDtos?.Count > 0)
            {
                foreach (var item in hoaDonThuBoSungDto.ChiTietHoaDonThuBoSungDtos)
                {
                    var chiTiet = new ChiTietHoaDonThuBoSung
                    {
                        MaId = Guid.NewGuid().ToString(),
                        MaHdbs = hoaDonThuBoSung.MaId, // FK trỏ về hóa đơn vừa tạo
                        MaDmPlhc = item.MaDM_PLHC,
                        DonViTinh = item.DonViTinh,
                        SoLuong = item.SoLuong,
                        DonGia = item.DonGia,
                        ThanhTien = item.SoLuong * item.DonGia,
                        TrangThai = true
                    };
                    hoaDonThuBoSung.TongTien += chiTiet.ThanhTien;
                     _repositoryManager.ChiTietHoaDonThuBoSung.CreateChiTietHoaDonThuBoSung(chiTiet);
                    chiTietEntities.Add(chiTiet);
                }
            }

            _repositoryManager.HoaDonThuBoSung.CreateHoaDonThuBoSungAsync(hoaDonThuBoSung);
            bool check = await _repositoryManager.SaveChangesAsync();
            var resultDto = _mapper.Map<HoaDonThuBoSungDto>(hoaDonThuBoSung);
            resultDto.ChiTietHoaDonThuBoSungs = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(chiTietEntities);

            return new ResponseModel1<HoaDonThuBoSungDto>
            {
                KetQua = check,
                Message = check ? "Thêm hóa đơn bổ sung thành công!" : "Thêm hóa đơn thất bại!",
                Data = resultDto
            };
        }
        public async Task<ResponseModel1<HoaDonThuBoSungDto>> UpdateHoaDonThuBoSungAsync(HoaDonThuBoSungRequestUpdateDto dto, string user, string userId)
        {
            List<ChiTietHoaDonThuBoSung> chiTietList = new List<ChiTietHoaDonThuBoSung>();

            if (dto == null || string.IsNullOrWhiteSpace(dto.MaID))
            {
                return new ResponseModel1<HoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Dữ liệu đầu vào không hợp lệ hoặc MaID rỗng.",
                    Data = null
                };
            }

            var hoaDonCheck = await _repositoryManager.HoaDonThuBoSung.FindHoaDonThuBoSungAsync(dto.MaID, false);
            if (hoaDonCheck == null)
            {
                return new ResponseModel1<HoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Hóa đơn bổ sung không tồn tại.",
                    Data = null
                };
            }

            // Cập nhật thông tin hóa đơn chính
            hoaDonCheck.GhiChu = string.IsNullOrWhiteSpace(dto.GhiChu) ? hoaDonCheck.GhiChu : dto.GhiChu;
            hoaDonCheck.NguoiSua = user;
            hoaDonCheck.NgaySua = DateTime.Now;

            // Cập nhật chi tiết hóa đơn bổ sung
            if (dto.ChiTietHoaDonThuBoSungDtos != null && dto.ChiTietHoaDonThuBoSungDtos.Any())
            {
                foreach (var item in dto.ChiTietHoaDonThuBoSungDtos)
                {
                    if (string.IsNullOrEmpty(item.MaID))
                    {
                        // Tạo mới
                        var newCT = new ChiTietHoaDonThuBoSung
                        {
                            MaId = Guid.NewGuid().ToString(),
                            MaHdbs = hoaDonCheck.MaId,
                            MaDmPlhc = item.MaDM_PLHC,
                            DonViTinh = item.DonViTinh,
                            SoLuong = item.SoLuong ?? 0,
                            DonGia = item.DonGia ?? 0,
                            ThanhTien = item.SoLuong * item.DonGia
                        };
                        hoaDonCheck.TongTien += newCT.ThanhTien;
                        _repositoryManager.ChiTietHoaDonThuBoSung.CreateChiTietHoaDonThuBoSung(newCT);
                        chiTietList.Add(newCT);
                    }
                    else
                    {
                        var ctCheck = await _repositoryManager.ChiTietHoaDonThuBoSung.FindChiTietHoaDonThuBoSungAsync(item.MaID, false);
                        if (ctCheck == null) continue;

                        if (item.IsDel)
                        {
                            hoaDonCheck.TongTien -= ctCheck.ThanhTien;
                            _repositoryManager.ChiTietHoaDonThuBoSung.DeleteChiTietHoaDonThuBoSungAsync(ctCheck);
                        }
                        else
                        {
                            hoaDonCheck.TongTien -= ctCheck.ThanhTien; // trừ đi số tiền cũ
                            ctCheck.MaDmPlhc = string.IsNullOrWhiteSpace(item.MaDM_PLHC) ? ctCheck.MaDmPlhc : item.MaDM_PLHC;
                            ctCheck.DonViTinh = string.IsNullOrWhiteSpace(item.DonViTinh) ? ctCheck.DonViTinh : item.DonViTinh;
                            if (item.SoLuong != null  && item.SoLuong > 0)
                            {
                                ctCheck.SoLuong = item.SoLuong;
                            }
                            if (item.DonGia != null && item.DonGia > 0)
                            {
                                ctCheck.DonGia = item.DonGia;
                            }
                            ctCheck.ThanhTien = ctCheck.SoLuong * ctCheck.DonGia;
                            hoaDonCheck.TongTien += ctCheck.ThanhTien; // cộng vào số tiền mới
                            _repositoryManager.ChiTietHoaDonThuBoSung.UpdateChiTietHoaDonThuBoSungAsync(ctCheck);
                            chiTietList.Add(ctCheck);
                        }
                    }
                }
            }

            _repositoryManager.HoaDonThuBoSung.UpdateHoaDonThuBoSungAsync(hoaDonCheck);
            bool success = await _repositoryManager.SaveChangesAsync();

            var returnDto = _mapper.Map<HoaDonThuBoSungDto>(hoaDonCheck);
            returnDto.ChiTietHoaDonThuBoSungs = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(chiTietList);

            return new ResponseModel1<HoaDonThuBoSungDto>
            {
                KetQua = success,
                Message = success ? "Cập nhật hóa đơn bổ sung thành công." : "Cập nhật thất bại.",
                Data = returnDto
            };
        }
        public async Task<ResponseModel1<HoaDonThuBoSungDto>> DeleteHoaDonThuBoSungAsync(string maHoaDonThuBoSung, string user, string userId)
        {
            if (string.IsNullOrWhiteSpace(maHoaDonThuBoSung))
            {
                return new ResponseModel1<HoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Thiếu dữ liệu đầu vào, vui lòng kiểm tra!",
                    Data = null
                };
            }

            var hoaDonThuBoSungDomain = await _repositoryManager.HoaDonThuBoSung.FindHoaDonThuBoSungAsync(maHoaDonThuBoSung, false);
            if (hoaDonThuBoSungDomain == null)
            {
                return new ResponseModel1<HoaDonThuBoSungDto>
                {
                    KetQua = false,
                    Message = "Phiếu cần xoá không tồn tại, vui lòng kiểm tra lại!",
                    Data = null
                };
            }

            hoaDonThuBoSungDomain.Active = false;
            hoaDonThuBoSungDomain.NguoiSua = user;
            hoaDonThuBoSungDomain.NgaySua = DateTime.Now;

            // Tìm và xoá mềm chi tiết hoá đơn bổ sung nếu có
            var chiTietList = await _repositoryManager.ChiTietHoaDonThuBoSung.FindChiTietHoaDonThuBoSungByHDBSsAsync(hoaDonThuBoSungDomain.MaId, false);
            if (chiTietList != null && chiTietList.Any())
            {
                foreach (var item in chiTietList)
                {
                    item.TrangThai = false;
                    _repositoryManager.ChiTietHoaDonThuBoSung.UpdateChiTietHoaDonThuBoSungAsync(item);
                }
            }

            _repositoryManager.HoaDonThuBoSung.UpdateHoaDonThuBoSungAsync(hoaDonThuBoSungDomain);
            bool check = await _repositoryManager.SaveChangesAsync();

            var dataReturn = _mapper.Map<HoaDonThuBoSungDto>(hoaDonThuBoSungDomain);
            dataReturn.ChiTietHoaDonThuBoSungs = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(chiTietList);

            return new ResponseModel1<HoaDonThuBoSungDto>
            {
                KetQua = check,
                Message = check ? "Xoá mềm hóa đơn thu bổ sung thành công!" : "Xoá mềm hóa đơn thu bổ sung thất bại!",
                Data = dataReturn
            };
        }
    }
}
