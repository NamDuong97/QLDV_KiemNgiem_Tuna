using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualBasic;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Repositories;
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

                int numRow = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.ProcessReviewChiTietDeXuatPhongBanByPB(checkExistsChiTietPhieuDXPB.MaId, checkExistsChiTietPhieuDXPB?.MaPdkMau,
                  duyetPhieu.Action, user, duyetPhieu.Message, userId);
                bool check = numRow > 0? true : false;

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

                int numRow = await _repositoryManager.ChiTietPhieuDeXuatPhongBan.ProcessReviewChiTietDeXuatPhongBanByBLD(checkExistsChiTietPhieuDXPB.MaId, checkExistsChiTietPhieuDXPB.MaPdkMau,
                    duyetPhieu.Action, user, userId);
                bool check = numRow > 0 ? true : false;
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
        public async Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto, string user)
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

            var checkExistPDXPB = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto.MaPhieuDeXuat, true);
            if (checkExistPDXPB == null)
            {
                return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
                {
                    Message = "Phieu de xuat phong ban khong ton tai, vui long kiem tra!",
                    KetQua = false
                };
            }
            checkExistPDXPB.NgaySua = DateTime.Now;
            checkExistPDXPB.NguoiSua = user;

            var ChiTietPhieuDeXuatPhongBanDomain = _mapper.Map<ChiTietPhieuDeXuatPhongBan>(ChiTietPhieuDeXuatPhongBanDto);
            ChiTietPhieuDeXuatPhongBanDomain.MaId = Guid.NewGuid().ToString();
            _repositoryManager.ChiTietPhieuDeXuatPhongBan.CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
            _repositoryManager.PhieuDeXuatPhongBan.UpdatePhieuDeXuatPhongBanAsync(checkExistPDXPB);

            bool check = await _repositoryManager.SaveChangesAsync();
            var ChiTietPhieuDeXuatPhongBanReturnDto = _mapper.Map<ChiTietPhieuDeXuatPhongBanDto>(ChiTietPhieuDeXuatPhongBanDomain);

            return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
            {
                KetQua = check,
                Message = check ? "Them chi tiet phieu de xuat phong ban thanh cong!" : "Them chi tiet phieu de xuat phong ban that bai, vui long thu lai!",
                Data = ChiTietPhieuDeXuatPhongBanReturnDto
            };
        }
        public async Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto, string user)
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

            var checkExistPDXPB = await _repositoryManager.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto.MaPhieuDeXuat, true);
            if (checkExistPDXPB == null)
            {
                return new ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>
                {
                    Message = "Phieu de xuat phong ban khong ton tai, vui long kiem tra!",
                    KetQua = false
                };
            }
            checkExistPDXPB.NgaySua = DateTime.Now;
            checkExistPDXPB.NguoiSua = user;

            var ChiTietPhieuDeXuatPhongBanDomain = _mapper.Map<ChiTietPhieuDeXuatPhongBan>(ChiTietPhieuDeXuatPhongBanDto);
            _repositoryManager.ChiTietPhieuDeXuatPhongBan.UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDomain);
            _repositoryManager.PhieuDeXuatPhongBan.UpdatePhieuDeXuatPhongBanAsync(checkExistPDXPB);

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
