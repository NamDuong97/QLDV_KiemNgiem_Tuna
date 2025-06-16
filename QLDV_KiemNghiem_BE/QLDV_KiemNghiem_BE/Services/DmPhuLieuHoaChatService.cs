using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Services
{
    public class DmPhuLieuHoaChatService : IDmPhuLieuHoaChatService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
       
        public DmPhuLieuHoaChatService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DmPhuLieuHoaChatDto>> GetDmPhuLieuHoaChatAllAsync()
        {
            var dmPhuLieuHoaChatDomains = await _repositoryManager.DmPhuLieuHoaChat.GetDmPhuLieuHoaChatAllAsync();
            var dmPhuLieuHoaChatDtos = _mapper.Map<List<DmPhuLieuHoaChatDto>>(dmPhuLieuHoaChatDomains);
            return dmPhuLieuHoaChatDtos;
        }
        public async Task<DmPhuLieuHoaChatDto?> FindDmPhuLieuHoaChatAsync(string maPhuLieuHoaChat)
        {
            if (maPhuLieuHoaChat == null || maPhuLieuHoaChat == "") return null;
            var dmPhuLieuHoaChatDomain = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatAsync(maPhuLieuHoaChat);
            var dmPhuLieuHoaChatDto = _mapper.Map<DmPhuLieuHoaChatDto>(dmPhuLieuHoaChatDomain);
            return dmPhuLieuHoaChatDto;
        }

        public async Task<ResponseModel1<DmPhuLieuHoaChatDto>> CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatRequestCreateDto plhcDto, string user)
        {
            if (plhcDto == null || plhcDto.TenDmPlhc == null || plhcDto.TenDmPlhc == "")
            {
                return new ResponseModel1<DmPhuLieuHoaChatDto>
                {
                    KetQua = false,
                    Message = "Thieu du lieu dau vao vui long kiem tra"
                };
            }
            var checkExist = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatByNameAsync(plhcDto.TenDmPlhc.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<DmPhuLieuHoaChatDto>
                {
                    KetQua = false,
                    Message = "Ten plhc da ton tai, vui long kiem tra lai!"
                };
            }
            DmPhuLieuHoaChat dmPLHC = new DmPhuLieuHoaChat()
            {
                MaId = Guid.NewGuid().ToString(),
                MaDmPlhc = "PLHC_" + PublicFunction.processString(plhcDto.TenDmPlhc),
                TenDmPlhc = plhcDto.TenDmPlhc,
                NongDo = plhcDto.NongDo,
                DonViNongDo = plhcDto.DonViNongDo,
                TrangThai = true,
                NgayTao = DateTime.Now,
                NguoiTao = user ?? "unknow"
            };

            _repositoryManager.DmPhuLieuHoaChat.CreateDmPhuLieuHoaChatAsync(dmPLHC);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<DmPhuLieuHoaChatDto>(dmPLHC);
            return new ResponseModel1<DmPhuLieuHoaChatDto>
            {
                KetQua = check,
                Message = check ? "Create thanh cong!" : "Create that bai!",
                Data = check ? dataReturn : null
            };
        }

        public async Task<ResponseModel1<DmPhuLieuHoaChatDto>> UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatRequestUpdateDto plhcDto, string user)
        {
            var dmPLHCDomain = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatAsync(plhcDto.MaId);
            if (dmPLHCDomain == null)
            {
                return new ResponseModel1<DmPhuLieuHoaChatDto>
                {
                    KetQua = true,
                    Message = "Ten danh muc plhc da ton tai, vui long kiem tra lai!"
                };
            }
            var checkExist = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatByNameAsync(plhcDto.TenDmPlhc.ToLower().Trim());
            if (checkExist != null)
            {
                return new ResponseModel1<DmPhuLieuHoaChatDto>
                {
                    KetQua = false,
                    Message = "Ten danh muc plhc da ton tai, vui long kiem tra lai!"
                };
            }
            dmPLHCDomain.NguoiSua = user ?? "unknow";
            dmPLHCDomain.NgaySua = DateTime.Now;
            dmPLHCDomain.MaDmPlhc = "PLHC_" + PublicFunction.processString(plhcDto.TenDmPlhc);
            dmPLHCDomain.TenDmPlhc = plhcDto.TenDmPlhc;
            dmPLHCDomain.DonViNongDo = plhcDto.DonViNongDo;
            dmPLHCDomain.TenHienThi = plhcDto.TenHienThi;
            dmPLHCDomain.NongDo = plhcDto.NongDo;

            _repositoryManager.DmPhuLieuHoaChat.UpdateDmPhuLieuHoaChatAsync(dmPLHCDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<DmPhuLieuHoaChatDto>(dmPLHCDomain);

            return new ResponseModel1<DmPhuLieuHoaChatDto>
            {
                KetQua = check,
                Message = check ? "Update thanh cong!" : "Update that bai!",
                Data = check ? dataReturn : null
            };
        }
        public async Task<bool> DeleteDmPhuLieuHoaChatAsync(string maPLHC)
        {
            var dmPhuLieuHoaChatDomain = await _repositoryManager.DmPhuLieuHoaChat.FindDmPhuLieuHoaChatAsync(maPLHC);
            if (dmPhuLieuHoaChatDomain == null)
            {
                return false;
            }
            _repositoryManager.DmPhuLieuHoaChat.DeleteDmPhuLieuHoaChatAsync(dmPhuLieuHoaChatDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
