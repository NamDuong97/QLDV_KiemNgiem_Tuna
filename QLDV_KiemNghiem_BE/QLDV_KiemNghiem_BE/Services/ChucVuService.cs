using AutoMapper;
using Newtonsoft.Json.Converters;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class ChucVuService : IChucVuService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChucVuService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChucVuDto>> GetChucVusAllAsync()
        {
            var ChucVuDomains = await _repositoryManager.ChucVu.GetChucVusAllAsync();
            var result = _mapper.Map<IEnumerable<ChucVuDto>>(ChucVuDomains);
            return result;
        }
        public async Task<ResponseModel1<ChucVuDto?>> FindChucVuAsync(string maChucVu)
        {
            if (maChucVu == null || maChucVu == "")
            {
                return new ResponseModel1<ChucVuDto?>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }
            var ChucVuDomain = await _repositoryManager.ChucVu.FindChucVuAsync(maChucVu);
            if (ChucVuDomain == null)
            {
                return new ResponseModel1<ChucVuDto?>
                {
                    KetQua = false,
                    Message = "Chuc vu can tim khong ton tai!"
                };
            }
            var result = _mapper.Map<ChucVuDto>(ChucVuDomain);

            return new ResponseModel1<ChucVuDto?>
            {
                KetQua = true,
                Message = "Lay du lieu thanh cong",
                Data = result
            };
        }
        public async Task<ResponseModel1<ChucVuDto>> CreateChucVuAsync(ChucVuRequestCreateDto ChucVu, string user)
        {
            if(ChucVu== null || ChucVu.TenChucVu == null || ChucVu.TenChucVu == "")
            {
                return new ResponseModel1<ChucVuDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }
            var checkExistName = await _repositoryManager.ChucVu.FindChucVuByNameAsync(ChucVu.TenChucVu);
            if(checkExistName != null)
            {
                return new ResponseModel1<ChucVuDto>
                {
                    KetQua = false,
                    Message = "Ten chucvu da ton tai!"
                };
            }
            ChucVu chucVu = new ChucVu()
            {
                MaId = Guid.NewGuid().ToString(),
                TenChucVu = ChucVu.TenChucVu,
                TrangThai = true,
                MaChucVu = "CV_" + PublicFunction.processString(ChucVu.TenChucVu),
                NguoiTao = user,
                NgayTao = DateTime.Now
            }; 
            _repositoryManager.ChucVu.CreateChucVuAsync(chucVu);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<ChucVuDto>(chucVu);
            return new ResponseModel1<ChucVuDto>
            {
                KetQua = true,
                Message = "Them chuc vu thanh cong",
                Data = dataReturn
            };
        }
        public async Task<ResponseModel1<ChucVuDto>> UpdateChucVuAsync(ChucVuRequestUpdateDto ChucVu, string user)
        {
            if (ChucVu == null || ChucVu.TenChucVu == null || ChucVu.TenChucVu == "")
            {
                return new ResponseModel1<ChucVuDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao!"
                };
            }
            var checkExist = await _repositoryManager.ChucVu.FindChucVuAsync(ChucVu.MaId);
            if (checkExist == null)
            {
                return new ResponseModel1<ChucVuDto>
                {
                    KetQua = false,
                    Message = "Chuc vu can sua khong ton tai!"
                };
            }

            checkExist.TenChucVu = ChucVu.TenChucVu;
            checkExist.MaChucVu = "CV_" + PublicFunction.processString(ChucVu.TenChucVu);
            checkExist.NguoiSua = user;
            checkExist.NgaySua = DateTime.Now;
           
            _repositoryManager.ChucVu.UpdateChucVuAsync(checkExist);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<ChucVuDto>(checkExist);
            return new ResponseModel1<ChucVuDto>
            {
                KetQua = true,
                Message = "Cap nhat chuc vu thanh cong",
                Data = dataReturn
            };
        }
        public async Task<bool> DeleteChucVuAsync(string maChucVu)
        {
            var ChucVuDomain = await _repositoryManager.ChucVu.FindChucVuAsync(maChucVu);
            if (ChucVuDomain == null)
            {
                return false;
            }
            _repositoryManager.ChucVu.DeleteChucVuAsync(ChucVuDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
