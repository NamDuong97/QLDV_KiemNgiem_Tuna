using AutoMapper;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.DTO.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PhieuDangKy, PhieuDangKyDto>().ReverseMap();
            CreateMap<Mau, MauDto>().ReverseMap();
        }
    }
}
