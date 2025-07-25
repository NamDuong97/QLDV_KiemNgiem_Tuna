﻿using AutoMapper;
using Microsoft.AspNetCore.Routing.Template;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDuTruService : IPhieuDuTruService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;
        public PhieuDuTruService(IRepositoryManager repositoryManager, IMapper mapper, DataContext context, IHubContext<NotificationHub> hubContext)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
        }
        public async Task<(IEnumerable<PhieuDuTruProcedureDto> datas, Pagination pagi)> GetPhieuDuTruAllAsync(PhieuDuTruParam param)
        {
            List<PhieuDuTruProcedureDto> phieuDuTruDtos = new List<PhieuDuTruProcedureDto>();

            var phieuDuTruDomains = await _repositoryManager.PhieuDuTru.GetPhieuDuTruAllAsync(param);
            foreach (var phieuDuTru in phieuDuTruDomains)
            {
                var phieuDuTruDto = _mapper.Map<PhieuDuTruProcedureDto>(phieuDuTru);
                phieuDuTruDto.ChiTietPhieuDuTruDtos = _mapper.Map<List<ChiTietPhieuDuTruDto>>(phieuDuTru.ChiTietPhieuDuTrus);
                phieuDuTruDtos.Add(phieuDuTruDto);
            }

            return (datas: phieuDuTruDtos, pagi: phieuDuTruDomains.Pagination);
        }
        public async Task<PhieuDuTruProcedureDto?> FindPhieuDuTruShowAsync(string maPhieuDuTru)
        {
            if (maPhieuDuTru == null || maPhieuDuTru == "") return null;
            var PhieuDuTruDomain = await _repositoryManager.PhieuDuTru.FindPhieuDuTruShowAsync(maPhieuDuTru);
            if (PhieuDuTruDomain != null)
            {
                var result = _mapper.Map<PhieuDuTruProcedureDto>(PhieuDuTruDomain);
                result.ChiTietPhieuDuTruDtos = _mapper.Map<List<ChiTietPhieuDuTruDto>>(PhieuDuTruDomain.ChiTietPhieuDuTrus);
                return result;
            }
            return null;
        }
        public async Task<ResponseModel1<PhieuDuTruDto>> CreatePhieuDuTruAsync(PhieuDuTruRequestCreateDto PhieuDuTruDto, string user, string userId)
        {
            if (PhieuDuTruDto == null) return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Tham so gui len null vui long kiem tra lai!",
                Data = null
            };
            PhieuDuTru phieuDuTru = new PhieuDuTru()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPhieuDuTru = "PDT_" + PublicFunction.getTimeSystem(),
                ManvLapPhieu = userId ?? null,
                MaPdkMau = PhieuDuTruDto.MaPdkMau,
                NgayLap = DateTime.Now,
                MaKhoa = PhieuDuTruDto.MaKhoa,
                GhiChu = PhieuDuTruDto.GhiChu,
                TrangThai = 1, // chờ duyệt
                Active = true, // còn tồn tại
            };

            if(PhieuDuTruDto.ChiTietPhieuDuTrus!= null && PhieuDuTruDto.ChiTietPhieuDuTrus.Count() > 0)
            {
                foreach (var item in PhieuDuTruDto.ChiTietPhieuDuTrus)
                {
                   
                        ChiTietPhieuDuTru chiTietPhieuDuTru = new ChiTietPhieuDuTru()
                        {
                            MaId = Guid.NewGuid().ToString(),
                            MaPhieuDuTru = phieuDuTru.MaId,
                            DonViTinh = item.DonViTinh,
                            SoLuong = item.SoLuong,
                            GhiChu = item.GhiChu,
                            TrangThai = true,
                            MaDmPlhc = item.MaDmPlhc,
                        };
                        phieuDuTru.ChiTietPhieuDuTrus.Add(chiTietPhieuDuTru);
                    
                }
            }
            else
            {
                return new ResponseModel1<PhieuDuTruDto>
                {
                    KetQua = false,
                    Message = "Vui long them hoa chat phu lieu cho phieu du tru",
                };
            }

            _repositoryManager.PhieuDuTru.CreatePhieuDuTruAsync(phieuDuTru);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDuTruReturnDto = _mapper.Map<PhieuDuTruDto>(phieuDuTru);

            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Tao phieu du tru thanh cong!" : "Tao phieu du tru that bai, vui long thu lai!",
                Data = PhieuDuTruReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDuTruDto>> UpdatePhieuDuTruAsync(PhieuDuTruRequestUpdateDto PhieuDuTruDto, string user, string userId)
        {
            List<ChiTietPhieuDuTru> chiTietPhieuDuTrus = new List<ChiTietPhieuDuTru>();
            if (PhieuDuTruDto == null || PhieuDuTruDto.MaId == null || PhieuDuTruDto.MaId == "") return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuDuTruCheck = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(PhieuDuTruDto.MaId, false);
            if (PhieuDuTruCheck == null)
            {
                return new ResponseModel1<PhieuDuTruDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            // Su dung mapper co theo keo theo cac thuoc tinh navigation bi theo doi 
            PhieuDuTruCheck.GhiChu = string.IsNullOrEmpty(PhieuDuTruDto.GhiChu) ? PhieuDuTruCheck.GhiChu : PhieuDuTruDto.GhiChu;
            PhieuDuTruCheck.NoiDungDuyet = string.IsNullOrEmpty(PhieuDuTruDto.NoiDungDuyet) ? PhieuDuTruCheck.NoiDungDuyet : PhieuDuTruDto.NoiDungDuyet;
            PhieuDuTruCheck.NgaySua = DateTime.Now;
            PhieuDuTruCheck.NguoiSua = user;

            // Kiem tra cap nhat chitietphieudutru
            if(PhieuDuTruDto.ChiTietPhieuDuTrus != null && PhieuDuTruDto.ChiTietPhieuDuTrus.Count() > 0)
            {
                foreach (var item in PhieuDuTruDto.ChiTietPhieuDuTrus)
                {
                    // Thêm mới
                    if (string.IsNullOrEmpty(item.MaId))
                    {
                        var checkExistPLHC = await _repositoryManager.ChiTietPhieuDuTru.CheckExistPlhcAsync(PhieuDuTruCheck.MaId, item?.MaDmPlhc ?? "", item?.DonViTinh ?? "", false);
                        if (checkExistPLHC != null)
                        {
                            checkExistPLHC.SoLuong += item?.SoLuong ?? 0;
                            _repositoryManager.ChiTietPhieuDuTru.UpdateChiTietPhieuDuTruAsync(checkExistPLHC);
                            chiTietPhieuDuTrus.Add(checkExistPLHC);
                        }
                        else // Nếu phụ liệu hóa chất chưa tồn tại thì thêm mới, ngược lại thì cộng dồn
                        {
                            var temp = new ChiTietPhieuDuTru
                            {
                                MaId = Guid.NewGuid().ToString(),
                                MaPhieuDuTru = PhieuDuTruCheck.MaId,
                                DonViTinh = item?.DonViTinh,
                                SoLuong = item?.SoLuong,
                                GhiChu = item?.GhiChu,
                                MaDmPlhc = item?.MaDmPlhc,
                            };
                            _repositoryManager.ChiTietPhieuDuTru.CreateChiTietPhieuDuTru(temp);
                            chiTietPhieuDuTrus.Add(temp);
                        }
                    }
                    else // xoa, sua
                    {
                        var existing = await _repositoryManager.ChiTietPhieuDuTru.FindChiTietPhieuDuTruByPDTAsync(PhieuDuTruDto.MaId, item.MaId, false);
                        if (existing != null)
                        {
                            if (item.IsDel)
                            {
                                _repositoryManager.ChiTietPhieuDuTru.DeleteChiTietPhieuDuTruAsync(existing);
                            }
                            else
                            {
                                existing.DonViTinh = string.IsNullOrEmpty(item.DonViTinh) ? existing.DonViTinh: item.DonViTinh;
                                existing.SoLuong = item.SoLuong > 0 ? item.SoLuong : existing.SoLuong;
                                existing.GhiChu = string.IsNullOrEmpty(item.GhiChu) ? existing.GhiChu : item.GhiChu;
                                _repositoryManager.ChiTietPhieuDuTru.UpdateChiTietPhieuDuTruAsync(existing);
                                chiTietPhieuDuTrus.Add(existing);
                            }
                        }
                    }
                }
            }
            _repositoryManager.PhieuDuTru.UpdatePhieuDuTruAsync(PhieuDuTruCheck);
            _context.ChangeTracker.DetectChanges();
            Console.WriteLine(_context.ChangeTracker.DebugView.LongView);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDuTruReturnDto = _mapper.Map<PhieuDuTruDto>(PhieuDuTruCheck);
            PhieuDuTruReturnDto.ChiTietPhieuDuTrus = _mapper.Map<List<ChiTietPhieuDuTruDto>>(chiTietPhieuDuTrus);
            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuDuTruReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDuTruDto>> ReviewPhieuDuTruByLDP(RequestReviewPhieuDuTru param, string user, string userId)
        {
            if (param == null) return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuDuTruCheck = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(param.MaPhieuDuTru, true);
            if (PhieuDuTruCheck == null)
            {
                return new ResponseModel1<PhieuDuTruDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuDuTruCheck.NgaySua = DateTime.Now;
            PhieuDuTruCheck.NguoiSua = user;
            PhieuDuTruCheck.ManvDuyet = userId;
            PhieuDuTruCheck.NoiDungDuyet = param.Message;
            
            if (param.Action)
            {
                PhieuDuTruCheck.TrangThai = 2;
            }
            else
            {
                PhieuDuTruCheck.TrangThai = 0;
            }

            _repositoryManager.PhieuDuTru.UpdatePhieuDuTruAsync(PhieuDuTruCheck);
            bool check = await _repositoryManager.SaveChangesAsync();
            if (check)
            {
                if (param.Action)
                {
                    // Tao thong bao gui cho phong BLD
                    NotificationModel noti = new NotificationModel()
                    {
                        Title = "Lanh dao phong duyet phieu phan tich ket qua",
                        Message = $"Phieu du tru cho mau {PhieuDuTruCheck.MaPdkMau} duoc duyet nhan vien {user}, vui long kiem tra va kiem kho",
                        CreatedAt = DateTime.Now,
                    };
                    await _hubContext.Clients.Group("VT_L").SendAsync("receiveNotification", noti);
                    await _hubContext.Clients.Group("VT").SendAsync("receiveNotification", noti);
                    await _hubContext.Clients.Group("VT_P").SendAsync("receiveNotification", noti);
                    await _hubContext.Clients.User(PhieuDuTruCheck?.ManvLapPhieu ?? "").SendAsync("notificationForOneUser", noti);
                }
                else
                {
                    NotificationModel noti = new NotificationModel()
                    {
                        Title = "Lanh dao phong duyet phieu du tru",
                        Message = $"Phieu du tru cho mau {PhieuDuTruCheck.MaPdkMau} duoc bi tu choi duyet boi nhan vien {user}, vui long kiem tra lai!",
                        CreatedAt = DateTime.Now,
                    };
                    await _hubContext.Clients.User(PhieuDuTruCheck?.ManvLapPhieu ?? "").SendAsync("notificationForOneUser", noti);
                }
            }
            var PhieuDuTruReturnDto = _mapper.Map<PhieuDuTruDto>(PhieuDuTruCheck);
            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat thanh cong!" : "Cap nhat that bai",
                Data = PhieuDuTruReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDuTruDto>> RequestReviewAgainPhieuDuTru(string maPhieuDuTru, string user, string userId)
        {
            if (maPhieuDuTru == null) return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Du lieu tham so dau vao null hoac khong hop le, vui long kiem tra lai!",
                Data = null
            };

            var PhieuDuTruCheck = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(maPhieuDuTru, true);
            if (PhieuDuTruCheck == null)
            {
                return new ResponseModel1<PhieuDuTruDto>
                {
                    KetQua = false,
                    Message = "Du lieu muon cap nhat khong ton tai, vui long kiem tra lai",
                    Data = null
                };
            }
            PhieuDuTruCheck.NgaySua = DateTime.Now;
            PhieuDuTruCheck.NguoiSua = user;
            PhieuDuTruCheck.TrangThai = 1;

            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDuTruReturnDto = _mapper.Map<PhieuDuTruDto>(PhieuDuTruCheck);
            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Phieu du tru duoc gui duyet lai thanh cong" : "Phieu du tru duoc gui duyet lai that bai",
                Data = PhieuDuTruReturnDto
            };
        }
        public async Task<ResponseModel1<PhieuDuTruDto>> DeletePhieuDuTruAsync(string maPhieuDuTru, string user, string userId)
        {
            if (maPhieuDuTru == null) return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = false,
                Message = "Thieu du lieu dau vao, vui long kiem tra lai!",
                Data = null
            };
           
            var PhieuDuTruDomain = await _repositoryManager.PhieuDuTru.FindPhieuDuTruAsync(maPhieuDuTru, false);
            if (PhieuDuTruDomain == null)
            {
                return new ResponseModel1<PhieuDuTruDto>
                {
                    KetQua = false,
                    Message = "Phieu du tru khong ton tai, vui long kiem tra lai!",
                    Data = null
                };
            }
            PhieuDuTruDomain.Active = false;
            PhieuDuTruDomain.NguoiSua = user;
            PhieuDuTruDomain.NgaySua = DateTime.Now;

            // Cap nhat trang thai cho chitietphieudutru
            var chiTietPhieuDuTrus = await _repositoryManager.ChiTietPhieuDuTru.FindChiTietPhieuDuTruByPDTsAsync(maPhieuDuTru);
            if(chiTietPhieuDuTrus!= null && chiTietPhieuDuTrus.Count() > 0)
            {
                foreach(var item in chiTietPhieuDuTrus)
                {
                    item.TrangThai = false;
                    _repositoryManager.ChiTietPhieuDuTru.UpdateChiTietPhieuDuTruAsync(item);
                }
            }

            _repositoryManager.PhieuDuTru.UpdatePhieuDuTruAsync(PhieuDuTruDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Xoa men phieu du tru thanh cong!": "Xoa men phieu du tru that bai!",
            };
        }
    }
}
