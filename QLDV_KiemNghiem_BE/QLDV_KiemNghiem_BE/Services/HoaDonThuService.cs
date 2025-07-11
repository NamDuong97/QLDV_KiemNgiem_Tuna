using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;
using System;

namespace QLDV_KiemNghiem_BE.Services
{
    public class HoaDonThuService : IHoaDonThuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public HoaDonThuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<HoaDonThuProcedureDto> datas, Pagination pagi)> GetHoaDonThusAllAsync(HoaDonThuParam param)
        {
            var HoaDonThuDomains = await _repositoryManager.HoaDonThu.GetAllHoaDonThuByBoLocAsync(param);
            List<HoaDonThuProcedureDto> hoaDonThuDtos = new List<HoaDonThuProcedureDto>();
           
            foreach(var hoaDon in HoaDonThuDomains)
            {
                if (hoaDon != null)
                {
                    var hoaDonThuDto = _mapper.Map<HoaDonThuProcedureDto>(hoaDon);
                    List<HoaDonThuBoSungProcedureDto> hoaDonThuBoSungDtos = new List<HoaDonThuBoSungProcedureDto>();
                    List<ChiTietHoaDonThuDto> chiTietHoaDonThuDtos = new List<ChiTietHoaDonThuDto>();

                    if (param.IsHoaDonBoSung)
                    {
                        // tìm tất cả hóa đơn bổ sung của hóa đơn hiện tại
                        var hoaDonBoSungProcedures = await _repositoryManager.HoaDonThuBoSung.FindHoaDonThuBoSungByMaHoaDonThuAsync(hoaDon?.MaID ?? "");
                        if (hoaDonBoSungProcedures != null && hoaDonBoSungProcedures.Count() > 0)
                        {
                            hoaDon!.DsHoaDonThuBoSung = hoaDonBoSungProcedures;
                            foreach (var hoaDonBoSung in hoaDon.DsHoaDonThuBoSung)
                            {
                                var hoaDonBoSungDto = _mapper.Map<HoaDonThuBoSungProcedureDto>(hoaDonBoSung);
                                hoaDonBoSungDto.ChiTietHoaDonThuBoSungDtos = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(hoaDonBoSung.ChiTietHoaDonThuBoSungs);
                                hoaDonThuBoSungDtos.Add(hoaDonBoSungDto);
                            }
                            hoaDonThuDto.DsHoaDonThuBoSung = hoaDonThuBoSungDtos;
                        }
                    }

                    // Thêm chi tiết hóa đơn 
                    if(hoaDon!.DsChiTietHoaDonThu != null && hoaDon!.DsChiTietHoaDonThu.Count()> 0)
                    {
                        chiTietHoaDonThuDtos = _mapper.Map<List<ChiTietHoaDonThuDto>>(hoaDon!.DsChiTietHoaDonThu);
                        hoaDonThuDto.DsChiTietHoaDonThu = chiTietHoaDonThuDtos;
                    }

                    // Thêm hóa đơn dto vào danh sách sách hóa đơn trả về cho client
                    hoaDonThuDtos.Add(hoaDonThuDto);
                }
            }

            return (datas: hoaDonThuDtos, pagi: HoaDonThuDomains.Pagination);
        } 
        public async Task<HoaDonThuProcedureDto?> FindHoaDonThuAsync(string maHoaDonThu)
        {
            if (maHoaDonThu == null || maHoaDonThu == "") return null;
            var HoaDonThuDomain = await _repositoryManager.HoaDonThu.FindHoaDonThuShowAsync(maHoaDonThu);
            // Lấy những hóa đơn bổ sung liên quan đến hóa đơn thu
            var hoaDonThuBoSung = await _repositoryManager.HoaDonThuBoSung.FindHoaDonThuBoSungByMaHoaDonThuAsync(maHoaDonThu);
            List<HoaDonThuBoSungProcedureDto> ds = new List<HoaDonThuBoSungProcedureDto>();
            if(HoaDonThuDomain != null && hoaDonThuBoSung!= null)
            {
                foreach (var item in hoaDonThuBoSung)
                {
                    var hoaDonBoSungProcedureDto = _mapper.Map<HoaDonThuBoSungProcedureDto>(item);
                    hoaDonBoSungProcedureDto.ChiTietHoaDonThuBoSungDtos = _mapper.Map<List<ChiTietHoaDonThuBoSungDto>>(item.ChiTietHoaDonThuBoSungs);
                    ds.Add(hoaDonBoSungProcedureDto);
                }
                var result = _mapper.Map<HoaDonThuProcedureDto>(HoaDonThuDomain);
                result.DsHoaDonThuBoSung = ds;
                return result;
            }

            return _mapper.Map<HoaDonThuProcedureDto>(HoaDonThuDomain); ;
        }
        public async Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuAsync(HoaDonThuRequestCreateDto hoaDonThuDto, string user, string userId)
        {
            List<ChiTietHoaDonThu> chiTietHoaDonThus = new List<ChiTietHoaDonThu>();
            if (hoaDonThuDto == null)
            {
                return new ResponseModel1<HoaDonThuDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao",
                    Data = null
                };
            }
            HoaDonThu hoaDonThu = new HoaDonThu()
            {
                MaId = Guid.NewGuid().ToString(),
                MaHd = "HD_" + hoaDonThuDto.SoDKPT,
                MaPhieuDangKy = hoaDonThuDto.MaPhieuDangKy,
                ManvXuLy = userId,
                TongTien = hoaDonThuDto.TongTien,
                NgayLap = DateTime.Now,
                TrangThai = "Hoa don moi tao",
                SoDkpt = hoaDonThuDto.SoDKPT,
                Active = true
            };
        
            if(hoaDonThuDto.ChiTietHoaDonThuDtos.Count() > 0)
            {
                foreach(var item in hoaDonThuDto.ChiTietHoaDonThuDtos)
                {
                    ChiTietHoaDonThu chiTietHoaDonThu = new ChiTietHoaDonThu()
                    {
                        MaId = Guid.NewGuid().ToString(),
                        MaMau = item.MaMau,
                        MaHd = hoaDonThu.MaId,
                        ThanhTien = item.ThanhTien,
                        TrangThai = true
                    };
                    await _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(chiTietHoaDonThu);
                    chiTietHoaDonThus.Add(chiTietHoaDonThu);
                }
            }
            await _repositoryManager.HoaDonThu.CreateHoaDonThuAsync(hoaDonThu);
            bool check = await _repositoryManager.SaveChangesAsync();

            var hoaDonThuReturn = _mapper.Map<HoaDonThuDto>(hoaDonThu);
            hoaDonThuReturn.ChiTietHoaDonThus = _mapper.Map<List<ChiTietHoaDonThuDto>>(chiTietHoaDonThus);
            return new ResponseModel1<HoaDonThuDto>
            {
                KetQua = check,
                Message = check ? "Tao hoa don thu thanh cong" : "Tao hoa don thu that bai",
                Data = hoaDonThuReturn
            };
        }
        public async Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuByPhieuDangKyAsync(PhieuDangKyDto phieuDangKy, string user)
        {
            decimal tongTien = 0;
            List<ChiTietHoaDonThuDto> chiTietHoaDonThuDtos = new List<ChiTietHoaDonThuDto>();
            HoaDonThu hoaDonThu = new HoaDonThu()
            {
                MaId = Guid.NewGuid().ToString(),
                MaHd = "HD" + PublicFunction.getTimeSystem() + "_" + phieuDangKy.SoDkpt,
                MaPhieuDangKy = phieuDangKy.MaId,
                TongTien = tongTien,
                NgayLap = DateTime.Now,
                GhiChu = "Tao hoa don thanh toan cho phieu dang ky" + phieuDangKy.SoDkpt,
                Active = true,
                NguoiTao = user,
                SoDkpt = phieuDangKy.SoDkpt
            };
            // Them chi tiet hoa don thu cho hoa don moi tao
            foreach (var mau in phieuDangKy.Maus)
            {
                ChiTietHoaDonThu chiTietHoaDonThu = new ChiTietHoaDonThu()
                {
                    MaId = Guid.NewGuid().ToString(),
                    MaMau = mau.MaId,
                    MaHd = hoaDonThu.MaId,
                    ThanhTien = await _repositoryManager.HoaDonThu.GetToTalMoneyOfMau(mau.MaDmMau, mau.MaTieuChuan, mau.MaLoaiDv),
                    GhiChu = "Hoa don cho mau" + mau.MaId,
                    TrangThai = true,
                };
                tongTien += (decimal)chiTietHoaDonThu.ThanhTien;
                await _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(chiTietHoaDonThu);
                var chiTietHoaDonThuDto = _mapper.Map<ChiTietHoaDonThuDto>(chiTietHoaDonThu);
                chiTietHoaDonThuDtos.Add(chiTietHoaDonThuDto);
            }
            hoaDonThu.TongTien = tongTien;
            await _repositoryManager.HoaDonThu.CreateHoaDonThuAsync(hoaDonThu);
            bool check = await _repositoryManager.SaveChangesAsync();
            var hoaDonThuDto = _mapper.Map<HoaDonThuDto>(hoaDonThu);
            hoaDonThuDto.ChiTietHoaDonThus = chiTietHoaDonThuDtos;

            return new ResponseModel1<HoaDonThuDto>
            {
                KetQua = check,
                Message = "Tao hoa don thanh cong",
                Data = hoaDonThuDto
            };
        }
        public async Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuAsync(HoaDonThuRequestUpdateDto hoaDonThuDto, string user, string userId)
        {
            List<ChiTietHoaDonThu> chiTietHoaDonThus = new List<ChiTietHoaDonThu>();
            if (hoaDonThuDto == null || hoaDonThuDto.MaID==null || hoaDonThuDto.MaID == "")
            {
                return new ResponseModel1<HoaDonThuDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao",
                    Data = null
                };
            }
            var checkHoaDonThu = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(hoaDonThuDto.MaID, false);
            if (checkHoaDonThu == null)
            {
                return new ResponseModel1<HoaDonThuDto>
                {
                    KetQua = false,
                    Message = "Hoa don can sua khong ton tai, vui long kiem tra lai du lieu",
                    Data = null
                };
            }
            if(hoaDonThuDto.ChiTietHoaDonThuDtos.Count()> 0)
            {
                foreach(var item in hoaDonThuDto.ChiTietHoaDonThuDtos)
                {
                    if (string.IsNullOrEmpty(item.MaID))
                    {
                        var checkExistCTHDT = await _repositoryManager.ChiTietHoaDonThu.CheckExistChiTietHoaDonThuByMaMauAsync(checkHoaDonThu.MaId, false);
                        if (checkExistCTHDT == null)
                        {
                            ChiTietHoaDonThu chiTietHoaDonThu = new ChiTietHoaDonThu()
                            {
                                MaId = Guid.NewGuid().ToString(),
                                MaHd = checkHoaDonThu.MaId,
                                ThanhTien = item?.ThanhTien ?? 0,
                                GhiChu = item?.GhiChu ?? "",
                                TrangThai = true
                            };
                            await _repositoryManager.ChiTietHoaDonThu.CreateChiTietHoaDonThuAsync(chiTietHoaDonThu);
                            chiTietHoaDonThus.Add(chiTietHoaDonThu);
                        }
                        else
                        {
                            checkExistCTHDT.ThanhTien += item?.ThanhTien;
                            _repositoryManager.ChiTietHoaDonThu.UpdateChiTietHoaDonThuAsync(checkExistCTHDT);
                            chiTietHoaDonThus.Add(checkExistCTHDT);
                        }
                    }
                    else
                    {
                        var checkExistCTHDT = await _repositoryManager.ChiTietHoaDonThu.FindChiTietHoaDonThuAsync(item.MaID);
                        if (checkExistCTHDT == null) continue;
                        if (item.IsDel)
                        {
                            _repositoryManager.ChiTietHoaDonThu.DeleteChiTietHoaDonThuAsync(checkExistCTHDT);
                        }
                        else
                        {
                            checkExistCTHDT.ThanhTien = item.ThanhTien > 0 ? item.ThanhTien : checkExistCTHDT.ThanhTien;
                            checkExistCTHDT.GhiChu = string.IsNullOrEmpty(item.GhiChu) ? checkExistCTHDT.GhiChu : item.GhiChu;
                            _repositoryManager.ChiTietHoaDonThu.UpdateChiTietHoaDonThuAsync(checkExistCTHDT);
                            chiTietHoaDonThus.Add(checkExistCTHDT);
                        }
                    }
                }
            }
            checkHoaDonThu.GhiChu = string.IsNullOrEmpty(hoaDonThuDto.GhiChu) ? checkHoaDonThu.GhiChu : hoaDonThuDto.GhiChu;
            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(checkHoaDonThu);
            bool check = await _repositoryManager.SaveChangesAsync();
            var hoaDonThuReturn = _mapper.Map<HoaDonThuDto>(checkHoaDonThu);
            hoaDonThuReturn.ChiTietHoaDonThus = _mapper.Map<List<ChiTietHoaDonThuDto>>(chiTietHoaDonThus);
            return new ResponseModel1<HoaDonThuDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat hoa don thu thanh cong" : "Cạp nhat hoa don thu that bai",
                Data = hoaDonThuReturn
            };
        }
        public async Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy)
        {
            var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(maPhieuDangKy);
            var hoaDonThu = await _repositoryManager.HoaDonThu.CheckExistHoaDonThuByPhieuDangKyAsync(maPhieuDangKy, true);
            if(hoaDonThu!= null && phieuDangKy != null  && phieuDangKy.PhieuDangKyMaus.Count() > 0)
            {
                hoaDonThu.TongTien = 0;
                foreach (var mau in phieuDangKy.PhieuDangKyMaus)
                {
                    hoaDonThu.TongTien += await _repositoryManager.HoaDonThu.GetToTalMoneyOfMau(mau.MaDmMau, mau.MaTieuChuan, mau.MaLoaiDv);
                }
            }
            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(hoaDonThu);
            bool check = await _repositoryManager.SaveChangesAsync();
            var hoaDonThuReturn = _mapper.Map<HoaDonThuDto>(hoaDonThu);
            return new ResponseModel1<HoaDonThuDto>
            {
                KetQua = check,
                Message = check ? "Cap nhat hoa don thu thanh cong" : "Cap nhat hoa don thu that bai",
                Data = hoaDonThuReturn
            };
        }
        public async Task<ResponseModel1<string>> DeleteHoaDonThuAsync(string maHoaDonThu, string user)
        {
            if (maHoaDonThu == null || maHoaDonThu == "")                     
             return new ResponseModel1<string>
             {
                KetQua = false,
                Message = "Tham so dau vao null hoac rong, vui long kiem tra lai",
             };
           
            var HoaDonThuDomain = await _repositoryManager.HoaDonThu.FindHoaDonThuAsync(maHoaDonThu, false);
            if (HoaDonThuDomain == null)
            {
                return new ResponseModel1<string>
                {
                    KetQua = false,
                    Message = "Du lieu can xoa khong ton tai, vui long kiem tra lai",
                };
            }
            HoaDonThuDomain.Active = false;
            HoaDonThuDomain.NguoiSua = user;
            HoaDonThuDomain.NgaySua = DateTime.Now;

            _repositoryManager.HoaDonThu.UpdateHoaDonThuAsync(HoaDonThuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return new ResponseModel1<string>
            {
                KetQua = true,
                Message = "Xoa du lieu thanh cong",
            };
        }
    }
}
