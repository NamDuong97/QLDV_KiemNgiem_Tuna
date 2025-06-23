using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualBasic;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChiTietPhieuDeXuatPhongBanService : IChiTietPhieuDeXuatPhongBanService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IHubContext<NotificationHub> _hubContext;
        public ChiTietPhieuDeXuatPhongBanService(IRepositoryManager repositoryManager, IMapper mapper, IHubContext<NotificationHub> hubContext)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _hubContext = hubContext;
        }
        public async Task<IEnumerable<ChiTietPhieuDeXuatPhongBanDto>> GetChiTietPhieuDeXuatPhongBansAllAsync()
        {
            var ChiTietPhieuDeXuatPhongBanDomains = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.GetChiTietPhieuDeXuatPhongBansAllAsync();
            var result = _mapper.Map<IEnumerable<ChiTietPhieuDeXuatPhongBanDto>>(ChiTietPhieuDeXuatPhongBanDomains);
            return result;
        }
        public async Task<ChiTietPhieuDeXuatPhongBanDto?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan)
        {
            if (maChiTietPhieuDeXuatPhongBan == null || maChiTietPhieuDeXuatPhongBan == "") return null;
            var ChiTietPhieuDeXuatPhongBanDomain = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(maChiTietPhieuDeXuatPhongBan, false);
            var result = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(ChiTietPhieuDeXuatPhongBanDomain);
            return result;
        }
        public async Task<ResponseReviewPhieuDeXuatPhongBan> ReviewPhieuDeXuatPhongBanByPhongKhoa(RequestReviewPhieuDeXuatPhongBan duyetPhieu, string user, string userId)
        {
            if (duyetPhieu == null || duyetPhieu.MaId == "")
            {
                return new ResponseReviewPhieuDeXuatPhongBan
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!",
                };
            }
            var checkExistsChiTietPhieuDXPB = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(duyetPhieu.MaId, true);
            if (checkExistsChiTietPhieuDXPB != null)
            {
                if (duyetPhieu.Action)
                {
                    // Nếu action = true thì tức là phòng khoa đã đồng ý phân công mẫu này. BLĐ không cần duyệt nữa.
                    checkExistsChiTietPhieuDXPB.TrangThai = 3;
                    checkExistsChiTietPhieuDXPB.ManvTuChoi = userId;

                    // Kiểm tra xem các mẫu trong phiếu đề xuất này đã được phân công và chấp nhận hết chưa -> cập nhật trạng thái của bảng PhieuDeXuatPhanCong
                    var checkAllSamplesApproved_PDXPB = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.CheckAllSamplesApproved_PDXPB(checkExistsChiTietPhieuDXPB.MaPhieuDeXuat, duyetPhieu.MaId);
                    if(checkAllSamplesApproved_PDXPB == 1)
                    {
                        // Da duyet het mau trong phieu de xuat nay cap nhat trang thai cho phieu de xuat
                        var phieuDeXuat = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(checkExistsChiTietPhieuDXPB.MaPhieuDeXuat, true);
                        if (phieuDeXuat != null)
                        {
                            phieuDeXuat.TrangThai = 3;
                            _repositoryManager.PhieuDeXuatPhongBan.UpdatePhieuDeXuatPhongBanAsync(phieuDeXuat);
                        }
                    }
                    // Cập nhật trạng thái cho mẫu tương ứng trong bảng PhieuDangKy_Mau
                    var phieuDangKyMau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(checkExistsChiTietPhieuDXPB.MaPdkMau ?? "");
                    if(phieuDangKyMau!=null)
                    {
                        phieuDangKyMau.TrangThaiPhanCong = 2;
                        _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(phieuDangKyMau);

                        var checkPhanCongAllMauInPDK = await _repositoryManager.PhieuDangKyMau.CheckPhanCongAllMauInPDK(phieuDangKyMau.MaId, phieuDangKyMau.MaPhieuDangKy);
                        if(checkPhanCongAllMauInPDK == 1)
                        {
                            var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(phieuDangKyMau.MaPhieuDangKy);
                            if(phieuDangKy!= null)
                            {
                                phieuDangKy.TrangThaiId = "TT07";
                                _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKy);
                            }
                        }
                    }
                }
                else
                {
                    // nguoc lai thi trang thai la bi phong KHDT tu choi duyet, thi cho BLD quyet dinh
                    checkExistsChiTietPhieuDXPB.TrangThai = 1;
                    checkExistsChiTietPhieuDXPB.LyDoTuChoi = duyetPhieu.Message;
                    checkExistsChiTietPhieuDXPB.ManvTuChoi = userId;  
                }

               
                _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(checkExistsChiTietPhieuDXPB);
                bool check = await _repositoryManager.SaveChangesAsync();

                return new ResponseReviewPhieuDeXuatPhongBan
                {
                    MaId = duyetPhieu.MaId,
                    Message = check ? "Xu ly duyet phieu de xuat phong ban thanh cong!" : "Xu ly duyet phieu de xuat phong ban that bai vui long thu lai!",
                    KetQua = check
                };
            }
            else
            {
                return new ResponseReviewPhieuDeXuatPhongBan
                {
                    KetQua = false,
                    Message = "Chi tiet phieu de xuat phong ban khong ton tai",
                    MaId = duyetPhieu.MaId,
                };
            }
        }
        public async Task<ResponseReviewPhieuDeXuatPhongBan> ReviewPhieuDeXuatPhongBanByBLD(RequestReviewPhieuDeXuatPhongBan duyetPhieu, string user, string userId)
        {
            if (duyetPhieu == null || duyetPhieu.MaId == "")
            {
                return new ResponseReviewPhieuDeXuatPhongBan
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!",
                };
            }
            var checkExistsChiTietPhieuDXPB = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(duyetPhieu.MaId, true);
            if (checkExistsChiTietPhieuDXPB != null)
            {
                if (duyetPhieu.Action)
                {
                    // BLĐ đồng ý cho từ chối thì trang thái là: Phòng ban từ chối chờ phân công lại
                    checkExistsChiTietPhieuDXPB.TrangThai = 4;
                    // Update lai PhieuDangKyMau nay thanh cho phan cong
                    var phieuDangKyMau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(checkExistsChiTietPhieuDXPB.MaPdkMau ?? "");
                    if (phieuDangKyMau != null)
                    {
                        phieuDangKyMau.TrangThaiPhanCong = 1;
                        _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(phieuDangKyMau);
                    }
                }
                else
                {
                    // BLĐ không đồng ý thì trạng thái là: Đã duyệt - Tự nguyện hay bị BLĐ ép buộc
                    checkExistsChiTietPhieuDXPB.TrangThai = 3;
                    checkExistsChiTietPhieuDXPB.ManvTuChoi = "";
                    checkExistsChiTietPhieuDXPB.LyDoTuChoi = "";
                    checkExistsChiTietPhieuDXPB.NgayTuChoi = null;
                    // Lúc này cần cập nhật trạng thái của PhieuDangKy_Mau, PhieuDangKy nếu như toàn bộ mẫu đều đang đc kiểm nghiệm
                    var phieuDangKyMau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(checkExistsChiTietPhieuDXPB.MaPdkMau ?? "");
                    if (phieuDangKyMau != null)
                    {
                        phieuDangKyMau.TrangThaiPhanCong = 2;
                        _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(phieuDangKyMau);

                        var checkPhanCongAllMauInPDK = await _repositoryManager.PhieuDangKyMau.CheckPhanCongAllMauInPDK(phieuDangKyMau.MaId, phieuDangKyMau.MaPhieuDangKy);
                        if (checkPhanCongAllMauInPDK == 1)
                        {
                            var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(phieuDangKyMau.MaPhieuDangKy);
                            if (phieuDangKy != null)
                            {
                                phieuDangKy.TrangThaiId = "TT07";
                                _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKy);
                            }
                        }
                    }
                }

                checkExistsChiTietPhieuDXPB.NgaySua = DateTime.Now;
                checkExistsChiTietPhieuDXPB.NguoiSua = user;
                _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(checkExistsChiTietPhieuDXPB);
                bool check = await _repositoryManager.SaveChangesAsync();
                return new ResponseReviewPhieuDeXuatPhongBan
                {
                    MaId = duyetPhieu.MaId,
                    Message = check ? "Xu ly duyet phieu de xuat phong ban thanh cong!" : "Xu ly duyet phieu de xuat phong ban that bai vui long thu lai!",
                    KetQua = check
                };
            }
            else
            {
                return new ResponseReviewPhieuDeXuatPhongBan
                {
                    KetQua = false,
                    Message = "Chi tiet phieu de xuat phong ban khong ton tai",
                    MaId = duyetPhieu.MaId,
                };
            }
        }
        public async Task<bool> CancelChiTietPhieuDeXuatPhongBansByKHTH(CancelChiTietPhieuDeXuatPhongBanRequestDto cancelPhieu, string user, string userId)
        {
            try
            {
                await _repositoryManager.ChiTietPhieuDeXuatPhongBan.ProcessUpdatePDXPBFromMauCancel(cancelPhieu.MaMau, user, userId);
                return true;
            }
            catch ( Exception ex)
            {
                Console.WriteLine($"Có lỗi xảy ra: {ex.Message}");
                return false;
            } 
        }
        public async Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto)
        {
            if (ChiTietPhieuDeXuatPhongBanDto == null) return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };

            var checkExistsByID = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto.MaId, false);
            if (checkExistsByID != null) return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Du lieu them vo da ton tai, vui long kiem tra lai",
                Data = null
            };

            var ChiTietPhieuDeXuatPhongBanDomain = _mapper.Map<ChiTietPhieuDeXuatPhongBan>(ChiTietPhieuDeXuatPhongBanDto);
            ChiTietPhieuDeXuatPhongBanDomain.MaId = Guid.NewGuid().ToString();
            ChiTietPhieuDeXuatPhongBanDomain.NgayTao = DateTime.Now;

            _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var ChiTietPhieuDeXuatPhongBanReturnDto = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(ChiTietPhieuDeXuatPhongBanDomain);

            return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Them chi tiet phieu de xuat phong ban thanh cong!" : "Them chi tiet phieu de xuat phong ban that bai, vui long thu lai!",
                Data = ChiTietPhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto)
        {
            if (ChiTietPhieuDeXuatPhongBanDto == null || ChiTietPhieuDeXuatPhongBanDto.MaId == null || ChiTietPhieuDeXuatPhongBanDto.MaId == "") return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var ChiTietPhieuDeXuatPhongBanCheck = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto.MaId, false);
            if (ChiTietPhieuDeXuatPhongBanCheck == null)
            {
                return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            var ChiTietPhieuDeXuatPhongBanDomain = _mapper.Map<ChiTietPhieuDeXuatPhongBan>(ChiTietPhieuDeXuatPhongBanDto);
            ChiTietPhieuDeXuatPhongBanDomain.NgaySua = DateTime.Now;
            ChiTietPhieuDeXuatPhongBanDomain.NguoiSua = "admin";
            _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var ChiTietPhieuDeXuatPhongBanReturnDto = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(ChiTietPhieuDeXuatPhongBanDomain);
            return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = ChiTietPhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<bool> DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan)
        {
            if (ChiTietPhieuDeXuatPhongBan == null) return false;
            else
            {
                var ChiTietPhieuDeXuatPhongBanDomain = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.FindChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan.MaId, false);
                if (ChiTietPhieuDeXuatPhongBanDomain == null)
                {
                    return false;
                }
                _repositoryManager.ChiTietPhieuDeXuatPhongBan.DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
                bool check = await _repositoryManager.SaveChangesAsync();
                return check;
            }
        }
    }
}
