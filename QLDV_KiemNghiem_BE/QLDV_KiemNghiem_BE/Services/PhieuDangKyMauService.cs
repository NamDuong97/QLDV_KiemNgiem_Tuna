using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
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
        public PhieuDangKyMauService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
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
        public async Task<ResponseModel1<PhieuDangKyMauDto>> CancelPhieuDangKyMau(PhieuDangKyMauRequestCancelDto mauDto, string user)
        {
            if(mauDto == null || mauDto.MaId == null || mauDto.MaId == "")
            {
                return new ResponseModel1<PhieuDangKyMauDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }

            var checkExist = await _repositoryManager.PhieuDangKyMau.FindPhieuDangKyMauAsync(mauDto.MaId);
            
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

            checkExist.TrangThai = false;
            checkExist.TrangThaiPhanCong = mauDto.TypeCancel == 3 ? 3 : 4;
            checkExist.LyDoHuyMau = mauDto.Message;

            checkExistPhieuDangKy.NguoiSua = user;
            checkExistPhieuDangKy.NgaySua = DateTime.Now;
            _repositoryManager.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(checkExist);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistPhieuDangKy);
            await _repositoryManager.PhieuDangKyMau.ProcessUpdateStatusObjecRelative(mauDto.MaId, mauDto.TypeCancel);
            await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhieuDangKyMauDto>(checkExist);
            return new ResponseModel1<PhieuDangKyMauDto>
            {
                KetQua = true,
                Message = "Huy mau thanh cong!",
                Data = dataReturn
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
