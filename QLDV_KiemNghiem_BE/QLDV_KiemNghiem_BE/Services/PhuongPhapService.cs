using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhuongPhapService : IPhuongPhapService
    {

        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhuongPhapService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhuongPhapDto>> GetPhuongPhapsAllAsync()
        {

            var phuongPhapDomains = await _repositoryManager.PhuongPhap.GetPhuongPhapsAllAsync();
            var result = _mapper.Map<IEnumerable<PhuongPhapDto>>(phuongPhapDomains);
            return result;
        }
        public async Task<PhuongPhapDto?> FindPhuongPhapAsync(string maPhuongPhap)
        {
            if (maPhuongPhap == null || maPhuongPhap == "") return null;
            var phuongPhapDomain = await _repositoryManager.PhuongPhap.FindPhuongPhapAsync(maPhuongPhap);
            var result = _mapper.Map<PhuongPhapDto>(phuongPhapDomain);
            return result;
        }
        public async Task<ResponseModel1<PhuongPhapDto>> CreatePhuongPhapAsync(PhuongPhapRequestCreateDto PhuongPhapDto, string user)
        {
            if (PhuongPhapDto == null || PhuongPhapDto.TenPp == null || PhuongPhapDto.TenPp == "")
            {
                return new ResponseModel1<PhuongPhapDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao vui long kiem tra"
                };
            }
            var checkExist = await _repositoryManager.PhuongPhap.FindPhuongPhapByNameAsync(PhuongPhapDto.TenPp.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<PhuongPhapDto>
                {
                    KetQua = false,
                    Message = "Ten phuong phap da ton tai, vui long kiem tra lai!"
                };
            }
            PhuongPhap PhuongPhap = new PhuongPhap()
            {
                MaId = Guid.NewGuid().ToString(),
                MaPp = "PP_" + PublicFunction.processString(PhuongPhapDto.TenPp),
                TrangThai = true,
                GhiChu = PhuongPhapDto.GhiChu,
                TenPp = PhuongPhapDto.TenPp,
                DonGia = PhuongPhapDto.DonGia,
                NoiDung = PhuongPhapDto.NoiDung,
                NgayTao = DateTime.Now,
                NguoiTao = user ?? "unknow"
            };

            _repositoryManager.PhuongPhap.CreatePhuongPhapAsync(PhuongPhap);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhuongPhapDto>(PhuongPhap);
            return new ResponseModel1<PhuongPhapDto>
            {
                KetQua = check,
                Message = check ? "Create thanh cong!" : "Create that bai!",
                Data = check ? dataReturn : null
            };
        }

        public async Task<ResponseModel1<PhuongPhapDto>> UpdatePhuongPhapAsync(PhuongPhapRequestUpdateDto PhuongPhapDto, string user)
        {
            var PhuongPhapDomain = await _repositoryManager.PhuongPhap.FindPhuongPhapAsync(PhuongPhapDto.MaId);
            if (PhuongPhapDomain == null)
            {
                return new ResponseModel1<PhuongPhapDto>
                {
                    KetQua = true,
                    Message = "phuong phap khong ton tai, vui long kiem tra lai!"
                };
            }
            var checkExist = await _repositoryManager.PhuongPhap.FindPhuongPhapByNameAsync(PhuongPhapDto.TenPp.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<PhuongPhapDto>
                {
                    KetQua = false,
                    Message = "Ten phuong phap da ton tai, vui long kiem tra lai!"
                };
            }
            PhuongPhapDomain.NguoiSua = user ?? "unknow";
            PhuongPhapDomain.NgaySua = DateTime.Now;
            PhuongPhapDomain.MaPp = "PP_" + PublicFunction.processString(PhuongPhapDto.TenPp);
            PhuongPhapDomain.GhiChu = PhuongPhapDto.GhiChu;
            PhuongPhapDomain.TenPp = PhuongPhapDto.TenPp;
            PhuongPhapDomain.DonGia = PhuongPhapDto.DonGia;
            PhuongPhapDomain.NoiDung = PhuongPhapDto.NoiDung;

            _repositoryManager.PhuongPhap.UpdatePhuongPhapAsync(PhuongPhapDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhuongPhapDto>(PhuongPhapDomain);

            return new ResponseModel1<PhuongPhapDto>
            {
                KetQua = check,
                Message = check ? "Update thanh cong!" : "Update that bai!",
                Data = check ? dataReturn : null
            };
        }
        public async Task<bool> DeletePhuongPhapAsync(string maPhuongPhap)
        {
            var PhuongPhapDomain = await _repositoryManager.PhuongPhap.FindPhuongPhapAsync(maPhuongPhap);
            if (PhuongPhapDomain == null)
            {
                return false;
            }
            _repositoryManager.PhuongPhap.DeletePhuongPhapAsync(PhuongPhapDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
