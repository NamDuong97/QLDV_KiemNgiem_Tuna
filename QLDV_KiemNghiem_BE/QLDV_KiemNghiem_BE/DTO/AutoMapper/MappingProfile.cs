using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.DTO.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PhieuDangKy, PhieuDangKyDto>().ReverseMap().ForMember(dest => dest.PhieuDangKyMaus, opt => opt.Ignore()).
                ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDangKyMau, PhieuDangKyMauDto>().ReverseMap().ForMember(dest => dest.PhieuDangKyMauHinhAnhs, opt => opt.Ignore()).
                 ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDangKyMauProcedure, PhieuDangKyMauProcedureDto>().ReverseMap().
                ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDangKyPhuLieuHoaChat, PhieuDangKyPhuLieuHoaChatDto>().ReverseMap().
                 ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<TieuChuan, TieuChuanDto>().ReverseMap().
                 ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<TieuChuan, TieuChuanRequestCreateDto>().ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<TieuChuan, TieuChuanRequestUpdateDto>().ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTieu, ChiTieuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhuongPhap, PhuongPhapDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDangKyMauHinhAnh, PhieuDangKyMauHinhAnhDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<DmMau, DmMauDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<DmPhuLieuHoaChat, DmPhuLieuHoaChatDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<LoaiDichVu, LoaiDichVuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<TrangThaiPhieuDk, TrangThaiPhieuDkDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<BoPhan, BoPhanDto>().ReverseMap()
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChucVu, ChucVuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<Khoa, KhoaDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
              .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<LoaiMau, LoaiMauDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<HoaDonThu, HoaDonThuDto>().ReverseMap().ForMember(dest => dest.ChiTietHoaDonThus, opt => opt.Ignore()).
                ForMember(dest => dest.HoaDonThuBoSungs, opt => opt.Ignore()).
                ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTietHoaDonThu, ChiTietHoaDonThuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<HoaDonThuBoSung, HoaDonThuBoSungDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTietHoaDonThuBoSung, ChiTietHoaDonThuBoSungDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<KhachHang, KhachHangRequestDto>().ReverseMap()
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<KhachHang, KhachHangDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<KhachHang, KhachHangReturnClientDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<KhachHang, KhachHangReturnDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<NhanVien, NhanVienDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuChi, PhieuChiDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuThu, PhieuThuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuPhanTichKetQua, PhieuPhanTichKetQuaDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuPhanTichKetQuaChiTiet, PhieuPhanTichKetQuaChiTietDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhanCongNoiBo, PhanCongNoiBoDto>().ReverseMap()
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhanCongNoiBoRequestCreateDto, PhanCongNoiBo>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhanCongNoiBoRequestUpdateDto, PhanCongNoiBo>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ReassignPhanCongNoiBoRequestUpdateDto, PhanCongNoiBo>().ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                  srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<LichSuPhanCong, LichSuPhanCongDto>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<LichSuPhanCongRequestCreateDto, LichSuPhanCong>().ReverseMap()
               .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                 srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<LichSuPhanCongRequestUpdateDto, LichSuPhanCong>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDuTru, PhieuDuTruDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDuTruRequestCreateDto, PhieuDuTru>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDuTruRequestUpdateDto, PhieuDuTru>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuLuuMau, PhieuLuuMauDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDeXuatPhongBan, PhieuDeXuatPhongBanDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuDeXuatPhongBanRequestUpdateDto, PhieuDeXuatPhongBan>().ReverseMap()
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTietPhieuDeXuatPhongBanRequestUpdateDto, ChiTietPhieuDeXuatPhongBan>().ReverseMap()
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTietPhieuDeXuatPhongBan, ChiTietPhieuDeXuatPhongBanDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<PhieuTienDoLamViec, PhieuTienDoLamViecDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore())
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTietPhieuDuTruRequestCreateDto, ChiTietPhieuDuTru>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTietPhieuDuTruRequestUpdateDto, ChiTietPhieuDuTru>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));

            CreateMap<ChiTietPhieuDuTruDto, ChiTietPhieuDuTru>().ReverseMap()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                   srcMember != null && (!(srcMember is string str) || !string.IsNullOrWhiteSpace(str))));
        }
    }
}
