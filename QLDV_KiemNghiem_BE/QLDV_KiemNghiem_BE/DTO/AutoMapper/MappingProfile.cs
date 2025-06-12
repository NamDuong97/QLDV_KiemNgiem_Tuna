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
            CreateMap<TieuChuan, TieuChuanDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<ChiTieu, ChiTieuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhuongPhap, PhuongPhapDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuDangKyMauHinhAnh, PhieuDangKyMauHinhAnhDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<DmMau, DmMauDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<DmPhuLieuHoaChat, DmPhuLieuHoaChatDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<LoaiDichVu, LoaiDichVuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<TrangThaiPhieuDk, TrangThaiPhieuDkDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<BoPhan, BoPhanDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<ChucVu, ChucVuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<Khoa, KhoaDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<LoaiMau, LoaiMauDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<HoaDonThu, HoaDonThuDto>().ReverseMap().ForMember(dest => dest.ChiTietHoaDonThus, opt => opt.Ignore()).
                ForMember(dest => dest.HoaDonThuBoSungs, opt => opt.Ignore()).
                ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<ChiTietHoaDonThu, ChiTietHoaDonThuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<HoaDonThuBoSung, HoaDonThuBoSungDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<ChiTietHoaDonThuBoSung, ChiTietHoaDonThuBoSungDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<KhachHang, KhachHangDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<KhachHang, KhachHangReturnDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<NhanVien, NhanVienDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuChi, PhieuChiDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuThu, PhieuThuDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuPhanTichKetQua, PhieuPhanTichKetQuaDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuPhanTichKetQuaChiTiet, PhieuPhanTichKetQuaChiTietDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhanCongNoiBo, PhanCongNoiBoDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuDuTru, PhieuDuTruDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuLuuMau, PhieuLuuMauDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuDeXuatPhongBan, PhieuDeXuatPhongBanDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<ChiTietPhieuDeXuatPhongBan, ChiTietPhieuDeXuatPhongBanDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
            CreateMap<PhieuTienDoLamViec, PhieuTienDoLamViecDto>().ReverseMap().ForMember(dest => dest.MaId, opt => opt.Ignore());
        }
    }
}
