using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuPhanTichKetQuaService : IPhieuPhanTichKetQuaService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IHubContext<NotificationHub> _hubContext;
        public PhieuPhanTichKetQuaService(IRepositoryManager repositoryManager, IMapper mapper, IHubContext<NotificationHub> hubContext)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _hubContext = hubContext;
        }
        public async Task<(IEnumerable<PhieuPhanTichKetQuaProcedureDto> datas, Pagination pagi)> GetPhieuPhanTichKetQuaAllAsync(PhieuPhanTichKetQuaParam param)
        {
            List<PhieuPhanTichKetQuaProcedureDto> PhieuPhanTichKetQuaDtos = new List<PhieuPhanTichKetQuaProcedureDto>();
            var PhieuPhanTichKetQuaDomains = await _repositoryManager.PhieuPhanTichKetQua.GetPhieuPhanTichKetQuaAllAsync(param);
            foreach (var PhieuPhanTichKetQua in PhieuPhanTichKetQuaDomains)
            {
                var PhieuPhanTichKetQuaDto = _mapper.Map<PhieuPhanTichKetQuaProcedureDto>(PhieuPhanTichKetQua);
                PhieuPhanTichKetQuaDto.PhieuPhanTichKetQuaChiTietDtos = _mapper.Map<List<PhieuPhanTichKetQuaChiTietDto>>(PhieuPhanTichKetQua.PhieuPhanTichKetQuaChiTiets);
                PhieuPhanTichKetQuaDtos.Add(PhieuPhanTichKetQuaDto);
            }
            return (datas: PhieuPhanTichKetQuaDtos, pagi: PhieuPhanTichKetQuaDomains.Pagination);
        }
        public async Task<PhieuPhanTichKetQuaProcedureDto?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua)
        {
            if (maPhieuPhanTichKetQua == null || maPhieuPhanTichKetQua == "") return null;
            var PhieuPhanTichKetQuaDomain = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaShowAsync(maPhieuPhanTichKetQua);
            if(PhieuPhanTichKetQuaDomain!= null)
            {
                var result = _mapper.Map<PhieuPhanTichKetQuaProcedureDto>(PhieuPhanTichKetQuaDomain);
                result.PhieuPhanTichKetQuaChiTietDtos = _mapper.Map<List<PhieuPhanTichKetQuaChiTietDto>>(PhieuPhanTichKetQuaDomain.PhieuPhanTichKetQuaChiTiets);
                return result;
            }
            return null;
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestCreateDto PhieuPhanTichKetQuaDto, string user, string userId)
        {
            List<PhieuPhanTichKetQuaChiTiet> datas = new List<PhieuPhanTichKetQuaChiTiet>();
            if (PhieuPhanTichKetQuaDto == null) return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };


            PhieuPhanTichKetQua phieuPhanTichKetQua = new PhieuPhanTichKetQua()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPhieuKetQua = "PPTKQ_" + PublicFunction.getTimeSystem(),
                MaPdkMau = PhieuPhanTichKetQuaDto.MaPdkMau,
                ManvLap = userId ?? "NV009",
                MaKhoa = PhieuPhanTichKetQuaDto.MaKhoa,
                GhiChu = PhieuPhanTichKetQuaDto.GhiChu,
                NgayTao = DateTime.Now,
                NguoiTao = user,
                TrangThai = 1
            };
           
            if(PhieuPhanTichKetQuaDto.ChiTietPhanTichKetQuas.Count() > 0)
            {
                foreach (var item in PhieuPhanTichKetQuaDto.ChiTietPhanTichKetQuas)
                {
                    PhieuPhanTichKetQuaChiTiet phieuPhanTichKetQuaChiTiet = new PhieuPhanTichKetQuaChiTiet()
                    {
                        MaId = Guid.NewGuid().ToString(),
                        MaPhieuKetQua = phieuPhanTichKetQua.MaId,
                        MaChiTieu = item.MaChiTieu,
                        TenChiTieu = item.TenChiTieu,
                        KetQua = item.KetQua,
                        DonVi = item.DonVi,
                        GhiChu = item.GhiChu,
                        MucChatLuong = item.MucChatLuong,
                        TrangThai = item.TrangThai,
                    };
                    _repositoryManager.PhieuPhanTichKetQuaChiTiet.CreatePhieuPhanTichKetQuaChiTietAsync(phieuPhanTichKetQuaChiTiet);
                    datas.Add(phieuPhanTichKetQuaChiTiet);
                } 
            }

            _repositoryManager.PhieuPhanTichKetQua.CreatePhieuPhanTichKetQuaAsync(phieuPhanTichKetQua);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(phieuPhanTichKetQua);
            PhieuPhanTichKetQuaReturnDto.phieuPhanTichKetQuaChiTietDtos = _mapper.Map<List<PhieuPhanTichKetQuaChiTietDto>>(datas);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Them phieu phan tich ket qua thanh cong!" : "Them phieu phan tich ket qua that bai, vui long thu lai!",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestUpdateDto pTKQ, string user, string userId)
        {
            List<PhieuPhanTichKetQuaChiTiet> datas = new List<PhieuPhanTichKetQuaChiTiet>();
            if (pTKQ == null || pTKQ.MaId == null || pTKQ.MaId == "") return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuPhanTichKetQuaCheck = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(pTKQ.MaId, false);
            if (PhieuPhanTichKetQuaCheck == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuPhanTichKetQuaCheck.GhiChu = string.IsNullOrEmpty(pTKQ.GhiChu) ? PhieuPhanTichKetQuaCheck.GhiChu : pTKQ.GhiChu;
            PhieuPhanTichKetQuaCheck.TrangThai = pTKQ.TrangThai == 0 ? PhieuPhanTichKetQuaCheck.TrangThai : pTKQ.TrangThai;
            PhieuPhanTichKetQuaCheck.NoiDungDuyetSoBo = string.IsNullOrEmpty(pTKQ.NoiDungDuyetSoBo) ? PhieuPhanTichKetQuaCheck.NoiDungDuyetSoBo : pTKQ.NoiDungDuyetSoBo;
            PhieuPhanTichKetQuaCheck.NoiDungDuyetTongBo = string.IsNullOrEmpty(pTKQ.NoiDungDuyetTongBo) ? PhieuPhanTichKetQuaCheck.NoiDungDuyetTongBo : pTKQ.NoiDungDuyetTongBo;
            PhieuPhanTichKetQuaCheck.NguoiSua = user;
            PhieuPhanTichKetQuaCheck.NgaySua = DateTime.Now;

            if (pTKQ.ChiTietPhanTichKetQuas.Count() > 0)
            {
                foreach(var item in pTKQ.ChiTietPhanTichKetQuas)
                {
                    if(string.IsNullOrEmpty(item.MaId))
                    {
                        PhieuPhanTichKetQuaChiTiet pTKQCT = new PhieuPhanTichKetQuaChiTiet()
                        {
                            MaId = Guid.NewGuid().ToString(),
                            MaPhieuKetQua = PhieuPhanTichKetQuaCheck.MaId,
                            MaChiTieu = item.MaChiTieu,
                            TenChiTieu = item.TenChiTieu,
                            KetQua = item.KetQua,
                            DonVi = item.DonVi,
                            GhiChu = item.GhiChu,
                            TrangThai = item.TrangThai,
                            MucChatLuong = item.MucChatLuong,
                            Active = true,
                        };
                        _repositoryManager.PhieuPhanTichKetQuaChiTiet.CreatePhieuPhanTichKetQuaChiTietAsync(pTKQCT);
                        datas.Add(pTKQCT);
                    }
                    else
                    {
                        var checkPPTKQCT = await _repositoryManager.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietAsync(item.MaId);
                        if(checkPPTKQCT == null) continue;
                        if (item.IsDel)
                        {  
                          _repositoryManager.PhieuPhanTichKetQuaChiTiet.DeletePhieuPhanTichKetQuaChiTietAsync(checkPPTKQCT);
                        }
                        else
                        {
                            checkPPTKQCT.KetQua = string.IsNullOrEmpty(item.KetQua) ? checkPPTKQCT.KetQua : item.KetQua;
                            checkPPTKQCT.DonVi = string.IsNullOrEmpty(item.DonVi) ? checkPPTKQCT.DonVi : item.DonVi;
                            checkPPTKQCT.GhiChu = string.IsNullOrEmpty(item.GhiChu) ? checkPPTKQCT.GhiChu : item.GhiChu;
                            checkPPTKQCT.TrangThai = string.IsNullOrEmpty(item.TrangThai) ? checkPPTKQCT.TrangThai : item.TrangThai;
                            checkPPTKQCT.MucChatLuong = string.IsNullOrEmpty(item.MucChatLuong) ? checkPPTKQCT.MucChatLuong : item.MucChatLuong;
                            _repositoryManager.PhieuPhanTichKetQuaChiTiet.UpdatePhieuPhanTichKetQuaChiTietAsync(checkPPTKQCT);
                            datas.Add(checkPPTKQCT);
                        }
                    }     
                }
            }

            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaCheck);
            PhieuPhanTichKetQuaReturnDto.phieuPhanTichKetQuaChiTietDtos = _mapper.Map<List<PhieuPhanTichKetQuaChiTietDto>>(datas);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByLDP(RequestReviewPhieuPhanTichKetQua param, string user, string userId)
        {
            if (param == null) return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuPhanTichKetQuaCheck = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(param.MaPhieuPhanTichKetQua, true);
            if (PhieuPhanTichKetQuaCheck == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuPhanTichKetQuaCheck.NgaySua = DateTime.Now;
            PhieuPhanTichKetQuaCheck.NguoiSua = user;
            PhieuPhanTichKetQuaCheck.NoiDungDuyetSoBo = param.Message;
            PhieuPhanTichKetQuaCheck.ManvKiemTra = userId;

            if (param.Action)
            {
                PhieuPhanTichKetQuaCheck.TrangThai = 2;
            }
            else
            {
                PhieuPhanTichKetQuaCheck.TrangThai = 1;
            }

            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            if (check)
            {
                if (param.Action)
                {
                    // Tao thong bao gui cho phong BLD
                    NotificationModel noti = new NotificationModel()
                    {
                        Title = "Lanh dao phong duyet phieu phan tich ket qua",
                        Message = $"Phieu phan tich ket qua cho mau {PhieuPhanTichKetQuaCheck.MaPdkMau} duoc duyet nhan vien {user}, vui long kiem tra va xet duyet",
                        CreatedAt = DateTime.Now,
                    };
                    await _hubContext.Clients.Group("BLD_L").SendAsync("receiveNotification", noti);
                    await _hubContext.Clients.Group("BLD_KN").SendAsync("receiveNotification", noti);
                }
                else
                {
                    NotificationModel noti = new NotificationModel()
                    {
                        Title = "Lanh dao phong duyet phieu phan tich ket qua",
                        Message = $"Phieu phan tich ket qua cho mau {PhieuPhanTichKetQuaCheck.MaPdkMau} duoc bi tu choi duyet boi nhan vien {user}, vui long kiem tra lai!",
                        CreatedAt = DateTime.Now,
                    };
                    await _hubContext.Clients.User(PhieuPhanTichKetQuaCheck?.ManvLap ?? "").SendAsync("notificationForOneUser", noti);
                }
            }
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaCheck);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByBLD(RequestReviewPhieuPhanTichKetQua param, string user, string userId)
        {
            if (param == null) return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuPhanTichKetQuaCheck = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(param.MaPhieuPhanTichKetQua, true);
            if (PhieuPhanTichKetQuaCheck == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuPhanTichKetQuaCheck.NgaySua = DateTime.Now;
            PhieuPhanTichKetQuaCheck.NguoiSua = user;
            PhieuPhanTichKetQuaCheck.NoiDungDuyetTongBo = param.Message;
            PhieuPhanTichKetQuaCheck.MabldDuyet = userId;

            if (param.Action)
            {
                PhieuPhanTichKetQuaCheck.TrangThai = 3;
            }
            else
            {
                PhieuPhanTichKetQuaCheck.TrangThai = 4;
            }

            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            if (check )
            {
                if(param.Action)
                {
                    // Tao thong bao gui cho phong BLD
                    NotificationModel noti = new NotificationModel()
                    {
                        Title = "BLD duyet phieu phan tich ket qua",
                        Message = $"Phieu phan tich ket qua cho mau {PhieuPhanTichKetQuaCheck.MaPdkMau} da duoc phe duyet boi {user}",
                        CreatedAt = DateTime.Now,
                    };
                    await _hubContext.Clients.User(PhieuPhanTichKetQuaCheck?.ManvKiemTra ?? "").SendAsync("notificationForOneUser", noti);
                    await _hubContext.Clients.User(PhieuPhanTichKetQuaCheck?.ManvLap ?? "").SendAsync("notificationForOneUser", noti);
                    // Neu bld duyet thi can cap nhat trang thai pdkm, pdk
                    await _repositoryManager.PhieuPhanTichKetQua.ProcessReviewSuccessPhieuPhanTichKetQuaByBLD(PhieuPhanTichKetQuaCheck.MaPdkMau, user, userId);
                }
                else
                {
                    NotificationModel noti = new NotificationModel()
                    {
                        Title = "BLD duyet phieu phan tich ket qua",
                        Message = $"Phieu phan tich ket qua cho mau {PhieuPhanTichKetQuaCheck.MaPdkMau} da bi tu choi phe duyet boi {user}",
                        CreatedAt = DateTime.Now,
                    };
                    await _hubContext.Clients.User(PhieuPhanTichKetQuaCheck?.ManvKiemTra ?? "").SendAsync("notificationForOneUser", noti);
                    await _hubContext.Clients.User(PhieuPhanTichKetQuaCheck?.ManvLap ?? "").SendAsync("notificationForOneUser", noti);
                }
            }
            var PhieuPhanTichKetQuaReturnDto = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaCheck);
            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuPhanTichKetQuaReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuPhanTichKetQuaDto>> DeletePhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua, string user)
        {
            var PhieuPhanTichKetQuaDomain = await _repositoryManager.PhieuPhanTichKetQua.FindPhieuPhanTichKetQuaAsync(maPhieuPhanTichKetQua, false);
            if (PhieuPhanTichKetQuaDomain == null)
            {
                return new ResponseModel1<PhieuPhanTichKetQuaDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuPhanTichKetQuaDomain.Active = false;
            PhieuPhanTichKetQuaDomain.NguoiSua = user;
            PhieuPhanTichKetQuaDomain.NgaySua = DateTime.Now;

            var phieuPhanTichKetQuaChiTiets = await _repositoryManager.PhieuPhanTichKetQuaChiTiet.FindPhieuPhanTichKetQuaChiTietByMaPPTKQAsync(PhieuPhanTichKetQuaDomain.MaId, false);
            if(phieuPhanTichKetQuaChiTiets!= null && phieuPhanTichKetQuaChiTiets.Count() > 0){
                foreach(var item in phieuPhanTichKetQuaChiTiets)
                {
                    item.Active = false;
                    _repositoryManager.PhieuPhanTichKetQuaChiTiet.UpdatePhieuPhanTichKetQuaChiTietAsync(item);
                }
            }
            _repositoryManager.PhieuPhanTichKetQua.UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhieuPhanTichKetQuaDto>(PhieuPhanTichKetQuaDomain);
            dataReturn.phieuPhanTichKetQuaChiTietDtos = _mapper.Map<List<PhieuPhanTichKetQuaChiTietDto>>(phieuPhanTichKetQuaChiTiets);

            return new ResponseModel1<PhieuPhanTichKetQuaDto>
            {
                KetQua = check,
                Message = check? "Xoa men phieu phan tich ket qua thanh cong!": "Xoa mem phieu phan tich ket qua that bai!",
                Data = dataReturn
            };
        }
    }
}
