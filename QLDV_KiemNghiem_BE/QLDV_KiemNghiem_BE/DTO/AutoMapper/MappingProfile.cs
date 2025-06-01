using AutoMapper;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.DTO.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PhieuDangKy, PhieuDangKyDto>().ReverseMap().ForMember(dest => dest.PhieuDangKyMaus, opt => opt.Ignore());
            CreateMap<PhieuDangKyMau, PhieuDangKyMauDto>().ReverseMap().ForMember(dest => dest.PhieuDangKyMauHinhAnhs, opt => opt.Ignore());
            CreateMap<PhieuDangKyPhuLieuHoaChat, PhieuDangKyPhuLieuHoaChatDto>().ReverseMap();
            CreateMap<TieuChuan, TieuChuanDto>().ReverseMap();
            CreateMap<ChiTieu, ChiTieuDto>().ReverseMap();
            CreateMap<PhuongPhap, PhuongPhapDto>().ReverseMap();
            CreateMap<PhieuDangKyMauHinhAnh, PhieuDangKyMauHinhAnhDto>().ReverseMap();
            CreateMap<DmMau, DmMauDto>().ReverseMap();
            CreateMap<DmPhuLieuHoaChat, DmPhuLieuHoaChatDto>().ReverseMap();
            CreateMap<LoaiDichVu, LoaiDichVuDto>().ReverseMap();
            CreateMap<TrangThaiPhieuDk, TrangThaiPhieuDkDto>().ReverseMap();
            CreateMap<BoPhan, BoPhanDto>().ReverseMap();
            CreateMap<ChucVu, ChucVuDto>().ReverseMap();
            CreateMap<Khoa, KhoaDto>().ReverseMap();
            CreateMap<LoaiMau, LoaiMauDto>().ReverseMap();
        }
    }
}
