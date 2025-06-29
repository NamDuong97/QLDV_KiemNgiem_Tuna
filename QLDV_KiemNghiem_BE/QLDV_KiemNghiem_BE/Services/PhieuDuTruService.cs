using AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using Microsoft.AspNetCore.Routing.Template;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDuTruService : IPhieuDuTruService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PhieuDuTruService(IRepositoryManager repositoryManager, IMapper mapper, DataContext context)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<PhieuDuTruDto>> GetPhieuDuTrusAllAsync()
        {
            var PhieuDuTruDomains = await _repositoryManager.PhieuDuTru.GetPhieuDuTrusAllAsync();
            var result = _mapper.Map<IEnumerable<PhieuDuTruDto>>(PhieuDuTruDomains);
            return result;
        }
        public async Task<PhieuDuTruDto?> FindPhieuDuTruAsync(string maPhieuDuTru)
        {
            if (maPhieuDuTru == null || maPhieuDuTru == "") return null;
            var PhieuDuTruDomain = await _repositoryManager.PhieuDuTru.FindPhieuDuTrusAsync(maPhieuDuTru, false);
            var result = _mapper.Map<PhieuDuTruDto>(PhieuDuTruDomain);
            return result;
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
                ManvLapPhieu = PhieuDuTruDto.ManvLapPhieu,
                MaPdkMau = PhieuDuTruDto.MaPdkMau,
                NgayLap = DateTime.Now,
                MaKhoa = PhieuDuTruDto.MaKhoa,
                TrangThai =true,
                GhiChu = PhieuDuTruDto.GhiChu
            };

            if(PhieuDuTruDto.ChiTietPhieuDuTrus!= null && PhieuDuTruDto.ChiTietPhieuDuTrus.Count() > 0)
            {
                foreach(var item in PhieuDuTruDto.ChiTietPhieuDuTrus)
                {
                    ChiTietPhieuDuTru chiTietPhieuDuTru = new ChiTietPhieuDuTru()
                    {
                        MaId = Guid.NewGuid().ToString(),
                        MaPhieuDuTru = phieuDuTru.MaId,
                        DonViTinh = item.DonViTinh,
                        SoLuong = item.SoLuong,
                        GhiChu =item.GhiChu,
                        TrangThai = "active",
                        MaDmPlhc = item.MaDmPlhc,
                    };
                    phieuDuTru.ChiTietPhieuDuTrus.Add(chiTietPhieuDuTru);
                }
            }

            _repositoryManager.PhieuDuTru.CreatePhieuDuTruAsync(phieuDuTru);
            bool check = await _repositoryManager.SaveChangesAsync();
            var PhieuDuTruReturnDto = _mapper.Map<PhieuDuTruDto>(phieuDuTru);

            return new ResponseModel1<PhieuDuTruDto>
            {
                KetQua = check,
                Message = check ? "Them tieu chuan thanh cong!" : "Them tieu chuan that bai, vui long thu lai!",
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
            PhieuDuTruCheck.MaPdkMau = PhieuDuTruDto.MaPdkMau;
            PhieuDuTruCheck.MaKhoa = PhieuDuTruDto.MaKhoa;
            PhieuDuTruCheck.GhiChu = PhieuDuTruDto.GhiChu;
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
                        var temp = new ChiTietPhieuDuTru
                        {
                            MaId = Guid.NewGuid().ToString(),
                            MaPhieuDuTru = PhieuDuTruCheck.MaId,
                            DonViTinh = item.DonViTinh,
                            SoLuong = item.SoLuong,
                            GhiChu = item.GhiChu,
                            MaDmPlhc = item.MaDmPlhc,
                        };
                        _repositoryManager.ChiTietPhieuDuTru.CreateChiTietPhieuDuTru(temp);
                        chiTietPhieuDuTrus.Add(temp);
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
                                existing.DonViTinh = item.DonViTinh;
                                existing.SoLuong = item.SoLuong;
                                existing.GhiChu = item.GhiChu;
                                existing.MaDmPlhc = item.MaDmPlhc;
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
            PhieuDuTruDomain.TrangThai = false;
            PhieuDuTruDomain.NguoiSua = user;
            PhieuDuTruDomain.NgaySua = DateTime.Now;

            // Cap nhat trang thai cho chitietphieudutru
            var chiTietPhieuDuTrus = await _repositoryManager.ChiTietPhieuDuTru.FindChiTietPhieuDuTruByPDTsAsync(maPhieuDuTru);
            if(chiTietPhieuDuTrus!= null && chiTietPhieuDuTrus.Count() > 0)
            {
                foreach(var item in chiTietPhieuDuTrus)
                {
                    item.TrangThai = "no active";
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
