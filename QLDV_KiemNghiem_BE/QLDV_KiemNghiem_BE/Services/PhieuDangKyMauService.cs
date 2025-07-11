
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyMauService : IPhieuDangKyMauService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IHubContext<NotificationHub> _hubContext;
        public PhieuDangKyMauService(IRepositoryManager repositoryManager, IMapper mapper, IHubContext<NotificationHub> hubContext)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _hubContext = hubContext;
        }
        public async Task<(IEnumerable<PhieuDangKyMauProcedureDto> datas, Pagination pagi)> GetPhieuDangKyMauAllAsync(PhieuDangKyMauParam param)
        {
            List<PhieuDangKyMauProcedureDto> PhieuDangKyMauDtos = new List<PhieuDangKyMauProcedureDto>();
            var PhieuDangKyMauDomains = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAllAsync(param);
            foreach (var PhieuDangKyMau in PhieuDangKyMauDomains)
            {
                var PhieuDangKyMauDto = _mapper.Map<PhieuDangKyMauProcedureDto>(PhieuDangKyMau);
                PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(PhieuDangKyMau.PhieuDangKyMauHinhAnhs);
                PhieuDangKyMauDtos.Add(PhieuDangKyMauDto);
            }
            return ( datas : PhieuDangKyMauDtos,  pagi : PhieuDangKyMauDomains.Pagination);
        }
        public async Task<PhieuDangKyMauDto?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau)
        {
            if (maPhieuDangKyMau == null || maPhieuDangKyMau == "") return null;
            var PhieuDangKyMauDomain = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAsync(maPhieuDangKyMau);
            var result = _mapper.Map<PhieuDangKyMauDto>(PhieuDangKyMauDomain);
            result.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(PhieuDangKyMauDomain?.PhieuDangKyMauHinhAnhs);
            return result;
        }
        public PhieuDangKyMauThongKeDto? GetPhieuDangKyMauThongKe()
        {
            return _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauThongKe();
        }
        public async Task<ResponseModel1<PhieuDangKyMauDto>> CancelPhieuDangKyMauByKHTH(PhieuDangKyMauRequestCancelByKHTHDto mauDto, string user)
        {
            if(mauDto == null || mauDto.MaId == null || mauDto.MaId == "")
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }

            var checkExist = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(mauDto.MaId, true);
            
            if (checkExist== null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Mau khong ton tai!"
                };
            }

            var checkExistPhieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(checkExist.MaPhieuDangKy);
            if (checkExistPhieuDangKy == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky chua mau nay khong ton tai, vui long kiem tra!"
                };
            }

            await _repositoryManager.PhieuDangKyMau.ProcessUpdateStatusObjecRelative(mauDto.MaId, mauDto.TypeCancel, mauDto.Message, user);

            var dataReturn = _mapper.Map<PhieuDangKyMauDto>(checkExist);
            return new ResponseModel1<PhieuDangKyMauDto>
            {
                KetQua = true,
                Message = "Huy mau thanh cong!",
                Data = dataReturn
            };
        }
        public async Task<ResponseModel1<PhieuDangKyMauDto>> CancelPhieuDangKyMauByLDP(PhieuDangKyMauRequestCancelByLDPDto mauDto, string user, string userId)
        {
            if (mauDto == null || mauDto.MaMau == null || mauDto.MaMau == "")
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }
            var checkExist = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(mauDto.MaMau, true);
            if (checkExist == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Mau khong ton tai!"
                };
            }
            var checkExistPhieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(checkExist?.MaPhieuDangKy ?? "");
            if (checkExistPhieuDangKy == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky chua mau nay khong ton tai, vui long kiem tra!"
                };
            }
            var userTable = await _repositoryManager.NhanVien.FindNhanVienAsync(userId);
            var checkLichSuPhanCongMau = await _repositoryManager.LichSuPhanCongMauChoKhoa.FindLichSuPhanCongMauChoKhoaByMaMauAndKhoaAsync(mauDto.MaMau, userTable?.MaKhoa ?? "", true);
            if(checkLichSuPhanCongMau!= null)
            {
                checkLichSuPhanCongMau.ThoiGianHuyMau = DateTime.Now;
                checkLichSuPhanCongMau.ManvHuyMau = userId;
                checkLichSuPhanCongMau.NgaySua = DateTime.Now;
                checkLichSuPhanCongMau.NguoiSua = user;
                checkLichSuPhanCongMau.NoiDungHuyMau = mauDto.Message;
            }
            checkExist!.TrangThaiPhanCong = 10;
            checkExistPhieuDangKy.NgaySua = DateTime.Now;
            checkExistPhieuDangKy.NguoiSua = user;
            bool check = await _repositoryManager.SaveChangesAsync();

            if (check) {
                NotificationModel notificationModel = new NotificationModel()
                {
                    Title = "Lanh dao phong huy mau kiem nghiem",
                    Message = $"Nguoi dung {user} da hoan tra mau {mauDto.MaMau}, Ban lanh dao can xet duyet truong hop nay",
                    CreatedAt = DateTime.Now,
                };
                await _hubContext.Clients.Group("BLD").SendAsync("receiveNotification", notificationModel);
            }
            var dataReturn = _mapper.Map<PhieuDangKyMauDto>(checkExist);
            return new ResponseModel1<PhieuDangKyMauDto>
            {
                KetQua = check,
                Message = check ? "Huy mau thanh cong boi LDP!" : "Huy mau that bai boi LDP",
                Data = dataReturn
            };
        }
        public async Task<ResponseModel1<PhieuDangKyMauDto>> ReviewCancelPhieuDangKyMauByBLD(PhieuDangKyMauRequestReviewCancelByBLDDto mauDto, string user, string userId)
        {
            if (mauDto == null || mauDto.MaMau == null || mauDto.MaMau == "")
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }
            var checkExist = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(mauDto.MaMau, true);
            if (checkExist == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Mau khong ton tai!"
                };
            }
            var checkExistPhieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(checkExist?.MaPhieuDangKy ?? "");
            if (checkExistPhieuDangKy == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky chua mau nay khong ton tai, vui long kiem tra!"
                };
            }
         
            int qk = await _repositoryManager.PhieuDangKyMau.ProcessCancelMauByLDP(mauDto.MaMau, mauDto.Message, mauDto.Action, user, userId, mauDto.MaKhoa);
            if(qk > 0)
            {
                NotificationModel notificationModel = new NotificationModel()
                {
                    Title = "Ban lanh dao phe duyet hoan tra mau",
                    Message = $"Nguoi dung {user} da phe duyet hoan tra mau {mauDto.MaMau} thanh cong",
                    CreatedAt = DateTime.Now,
                };
                await _hubContext.Clients.Group("KN_L").SendAsync("receiveNotification", notificationModel);
                await _hubContext.Clients.Group("KN_P").SendAsync("receiveNotification", notificationModel);
            }
            return new ResponseModel1<PhieuDangKyMauDto>
            {
                KetQua = qk > 0 ? true: false,
                Message = qk > 0 ? "Ban lanh dao duyet mau huy boi lanh đao phong thanh cong!" : "Ban lanh dao duyet mau huy boi lanh đao phong that bai!",
            };
        }
        public async Task<ResponseModel1<PhieuDangKyMauDto>> CreatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMauDto, string user)
        {
            // Khoi tao 1 ob PhieuDangKyMauDomain moi kem ID tu dong tang
            if(PhieuDangKyMauDto == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }

            // Kiem tra xem voi phieu dang ky nay, da co ton tai mau nay chua
            var checkExistMau = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauByPhieuDangKyAndMaDmMauAsync(PhieuDangKyMauDto.MaPhieuDangKy, PhieuDangKyMauDto.MaDmMau, false);
            if(checkExistMau!= null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = $"Mau them vo da ton tai trong phieu dang ky {PhieuDangKyMauDto.MaPhieuDangKy} nay roi, vui long kiem tra lai!"
                };
            }

            var checkExistPDK = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(checkExistMau?.MaPhieuDangKy ?? "");
            if (checkExistPDK == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky chua mau nay khong ton tai, vui long kiem tra lai!"
                };
            }

            PhieuDangKyMau PhieuDangKyMauDomain = new PhieuDangKyMau();
            PhieuDangKyMauDomain = _mapper.Map<PhieuDangKyMau>(PhieuDangKyMauDto);
            PhieuDangKyMauDomain.MaId = Guid.NewGuid().ToString();
            await _repositoryManager.PhieuDangKyMau.CreatePhieuDangKyMauAsync(PhieuDangKyMauDomain);

            // kiem tra neu co hinh anh gui len hay k
            if (PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs.Count() > 0)
            {
                PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnh>>(PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs);
                // Them du lieu hinh anh cua PhieuDangKyMau vao bang PhieuDangKyMauHinhAnh
                foreach (var PhieuDangKyMauHinhAnh in PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs)
                {
                    PhieuDangKyMauHinhAnh.MaMau = PhieuDangKyMauDomain.MaId;
                    PhieuDangKyMauHinhAnh.MaId = Guid.NewGuid().ToString();
                   await _repositoryManager.PhieuDangKyMauHinhAnh.CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh);
                }
            }

            checkExistPDK.NguoiSua = user;
            checkExistPDK.NgaySua = DateTime.Now;

            bool check =  await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhieuDangKyMauDto>(PhieuDangKyMauDomain);
            return  new ResponseModel1<PhieuDangKyMauDto>
            {
                KetQua = true,
                Message = "Thieu du lieu dau vao!",
                Data = dataReturn
            }; 
        }
        public async Task<ResponseModel1<PhieuDangKyMauDto>> UpdatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMauDto, string user)
        {
            var PhieuDangKyMauDomain = _mapper.Map<PhieuDangKyMau>(PhieuDangKyMauDto);
            var PhieuDangKyMauCheck = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAsync(PhieuDangKyMauDto.MaId);
            if (PhieuDangKyMauCheck == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }

            var checkExistPDK = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(PhieuDangKyMauCheck?.MaPhieuDangKy ?? "");
            if (checkExistPDK == null)
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Phieu dang ky chua mau nay khong ton tai, vui long kiem tra lai!"
                };
            }
            checkExistPDK.NgaySua = DateTime.Now;
            checkExistPDK.NguoiSua = user;

            _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(PhieuDangKyMauDomain);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistPDK);

            if (PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs.Count() > 0)
            {
                PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnh>>(PhieuDangKyMauDto.PhieuDangKyMauHinhAnhs);
                // Them du lieu hinh anh cua PhieuDangKyMau vao bang PhieuDangKyMauHinhAnh
                foreach (var PhieuDangKyMauHinhAnh in PhieuDangKyMauDomain.PhieuDangKyMauHinhAnhs)
                {
                    _repositoryManager.PhieuDangKyMauHinhAnh.UpdatePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnh);
                }
            }
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhieuDangKyMauDto>(PhieuDangKyMauDomain);
            return new ResponseModel1<PhieuDangKyMauDto>
            {
                KetQua = true,
                Message = "Cap nhat mau thanh cong!",
                Data = dataReturn
            };
        }
        public async Task<bool> DeletePhieuDangKyMauAsync(string maPhieuDangKyMau, string user)
        {
            var PhieuDangKyMauDomain = await _repositoryManager.PhieuDangKyMau.GetPhieuDangKyMauAsync(maPhieuDangKyMau);
            if (PhieuDangKyMauDomain == null)
            {
                return false;
            }

            var checkExistPDK = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(PhieuDangKyMauDomain?.MaPhieuDangKy ?? "");
            if (checkExistPDK == null)
            {
                return false;
            }
            checkExistPDK.NgaySua = DateTime.Now;
            checkExistPDK.NguoiSua = user;

            _repositoryManager.PhieuDangKyMau.DeletePhieuDangKyMauAsync(PhieuDangKyMauDomain);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistPDK);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
