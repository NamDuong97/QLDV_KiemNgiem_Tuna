using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Data;

public partial class DataContext : DbContext
{
    public DataContext()
    {
    }

    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BoPhan> BoPhans { get; set; }

    public virtual DbSet<ChiTietHoaDonThu> ChiTietHoaDonThus { get; set; }

    public virtual DbSet<ChiTietHoaDonThuBoSung> ChiTietHoaDonThuBoSungs { get; set; }

    public virtual DbSet<ChiTietPhieuDeXuatMuaPlhc> ChiTietPhieuDeXuatMuaPlhcs { get; set; }

    public virtual DbSet<ChiTietPhieuDeXuatPhongBan> ChiTietPhieuDeXuatPhongBans { get; set; }

    public virtual DbSet<ChiTietPhieuDuTru> ChiTietPhieuDuTrus { get; set; }

    public virtual DbSet<ChiTietPhieuXuatKho> ChiTietPhieuXuatKhos { get; set; }

    public virtual DbSet<ChiTieu> ChiTieus { get; set; }

    public virtual DbSet<ChiTieuPhuongPhap> ChiTieuPhuongPhaps { get; set; }

    public virtual DbSet<ChucVu> ChucVus { get; set; }

    public virtual DbSet<DichVu> DichVus { get; set; }

    public virtual DbSet<DmPhuLieuHoaChat> DmPhuLieuHoaChats { get; set; }

    public virtual DbSet<DuocDien> DuocDiens { get; set; }

    public virtual DbSet<HoaDonMuaPlhc> HoaDonMuaPlhcs { get; set; }

    public virtual DbSet<HoaDonMuaPlhcchiTiet> HoaDonMuaPlhcchiTiets { get; set; }

    public virtual DbSet<HoaDonThu> HoaDonThus { get; set; }

    public virtual DbSet<HoaDonThuBoSung> HoaDonThuBoSungs { get; set; }

    public virtual DbSet<KhachHang> KhachHangs { get; set; }

    public virtual DbSet<Khoa> Khoas { get; set; }

    public virtual DbSet<LichSuPhanCong> LichSuPhanCongs { get; set; }

    public virtual DbSet<Lkct> Lkcts { get; set; }

    public virtual DbSet<LoaiDichVu> LoaiDichVus { get; set; }

    public virtual DbSet<LoaiMau> LoaiMaus { get; set; }

    public virtual DbSet<LoaiTaiKhoan> LoaiTaiKhoans { get; set; }

    public virtual DbSet<Mau> Maus { get; set; }

    public virtual DbSet<MauHinhAnh> MauHinhAnhs { get; set; }

    public virtual DbSet<NhaCungCap> NhaCungCaps { get; set; }

    public virtual DbSet<NhanVien> NhanViens { get; set; }

    public virtual DbSet<PhanCongNoiBo> PhanCongNoiBos { get; set; }

    public virtual DbSet<PhieuChi> PhieuChis { get; set; }

    public virtual DbSet<PhieuDangKy> PhieuDangKies { get; set; }

    public virtual DbSet<PhieuDangKyPhuLieuHoaChat> PhieuDangKyPhuLieuHoaChats { get; set; }

    public virtual DbSet<PhieuDeXuatMuaPlhc> PhieuDeXuatMuaPlhcs { get; set; }

    public virtual DbSet<PhieuDeXuatPhongBan> PhieuDeXuatPhongBans { get; set; }

    public virtual DbSet<PhieuDuTru> PhieuDuTrus { get; set; }

    public virtual DbSet<PhieuLuuMau> PhieuLuuMaus { get; set; }

    public virtual DbSet<PhieuNhapKho> PhieuNhapKhos { get; set; }

    public virtual DbSet<PhieuNhapKhoChiTiet> PhieuNhapKhoChiTiets { get; set; }

    public virtual DbSet<PhieuPhanTichKetQua> PhieuPhanTichKetQuas { get; set; }

    public virtual DbSet<PhieuPhanTichKetQuaChiTiet> PhieuPhanTichKetQuaChiTiets { get; set; }

    public virtual DbSet<PhieuThu> PhieuThus { get; set; }

    public virtual DbSet<PhieuTienDoLamViec> PhieuTienDoLamViecs { get; set; }

    public virtual DbSet<PhieuXuatKho> PhieuXuatKhos { get; set; }

    public virtual DbSet<PhuLieuHoaChatKho> PhuLieuHoaChatKhos { get; set; }

    public virtual DbSet<PhuongPhap> PhuongPhaps { get; set; }

    public virtual DbSet<TaiKhoan> TaiKhoans { get; set; }

    public virtual DbSet<TaiKhoanKhachHang> TaiKhoanKhachHangs { get; set; }

    public virtual DbSet<ThongBaoChoKhachHang> ThongBaoChoKhachHangs { get; set; }

    public virtual DbSet<ThongBaoChoTrungTam> ThongBaoChoTrungTams { get; set; }

    public virtual DbSet<ThongBaoChoTrungTamNhan> ThongBaoChoTrungTamNhans { get; set; }

    public virtual DbSet<ThongBaoChoTrungTamNhom> ThongBaoChoTrungTamNhoms { get; set; }

    public virtual DbSet<ThongBaoNoiBo> ThongBaoNoiBos { get; set; }

    public virtual DbSet<ThongBaoNoiBoNhan> ThongBaoNoiBoNhans { get; set; }

    public virtual DbSet<ThongBaoNoiBoNhom> ThongBaoNoiBoNhoms { get; set; }

    public virtual DbSet<TieuChuan> TieuChuans { get; set; }

    public virtual DbSet<TrangThaiPhieuDk> TrangThaiPhieuDks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BoPhan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__BoPhan__2725BF40552092BC");
        });

        modelBuilder.Entity<ChiTietHoaDonThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietH__2725BF403EBFC7FE");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.ChiTietHoaDonThus).HasConstraintName("Fk_ChiTietHoaDonThu_HoaDonThu");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.ChiTietHoaDonThus).HasConstraintName("Fk_ChiTietHoaDonThu_Mau");
        });

        modelBuilder.Entity<ChiTietHoaDonThuBoSung>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietH__2725BF40912156EF");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.ChiTietHoaDonThuBoSungs).HasConstraintName("Fk_ChiTietHoaDonThuBoSung_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaHdbsNavigation).WithMany(p => p.ChiTietHoaDonThuBoSungs).HasConstraintName("Fk_ChiTietHoaDonThuBoSung_HoaDonThuBoSung");
        });

        modelBuilder.Entity<ChiTietPhieuDeXuatMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF4010A2008E");

            entity.HasOne(d => d.MaPhieuDeXuatMuaNavigation).WithMany(p => p.ChiTietPhieuDeXuatMuaPlhcs).HasConstraintName("Fk_PhieuDeXuatMuaPLHCChiTiet_PhieuDeXuatMuaPLHC");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.ChiTietPhieuDeXuatMuaPlhcs).HasConstraintName("Fk_PhieuDeXuatMuaPLHCChiTiet_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<ChiTietPhieuDeXuatPhongBan>(entity =>
        {
            entity.HasOne(d => d.MaMauNavigation).WithMany().HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_Mau");

            entity.HasOne(d => d.MaPhieuDeXuatNavigation).WithMany().HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_PhieuDeXuatPhongBan");

            entity.HasOne(d => d.ManvTuChoiNavigation).WithMany().HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_NhanVien");
        });

        modelBuilder.Entity<ChiTietPhieuDuTru>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF40EB9B26C1");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.ChiTietPhieuDuTrus).HasConstraintName("Fk_ChiTietPhieuDuTru_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaPhieuDuTruNavigation).WithMany(p => p.ChiTietPhieuDuTrus).HasConstraintName("Fk_ChiTietPhieuDuTru_PhieuDuTru");
        });

        modelBuilder.Entity<ChiTietPhieuXuatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF4018F52624");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.ChiTietPhieuXuatKhos).HasConstraintName("Fk_ChiTietPhieuXuatKho_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaPhieuXuatKhoNavigation).WithMany(p => p.ChiTietPhieuXuatKhos).HasConstraintName("Fk_ChiTietPhieuXuatKho_PhieuXuatKho");
        });

        modelBuilder.Entity<ChiTieu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTieu__2725BF40BC1B7449");

            entity.HasOne(d => d.MaTieuChuanNavigation).WithMany(p => p.ChiTieus).HasConstraintName("Fk_ChiTieu_TieuChuan");
        });

        modelBuilder.Entity<ChiTieuPhuongPhap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTieu___2725BF40A20D9A20");

            entity.HasOne(d => d.MaChiTieuNavigation).WithMany(p => p.ChiTieuPhuongPhaps).HasConstraintName("Fk_ChiTieu_PhuongPhap_ChiTieu");

            entity.HasOne(d => d.MaPpNavigation).WithMany(p => p.ChiTieuPhuongPhaps).HasConstraintName("Fk_ChiTieu_PhuongPhap_PhuongPhap");
        });

        modelBuilder.Entity<ChucVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChucVu__2725BF4033EFB433");
        });

        modelBuilder.Entity<DichVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__DichVu__2725BF40EF20112B");

            entity.HasOne(d => d.MaLoaidvNavigation).WithMany(p => p.DichVus).HasConstraintName("Fk_DichVu_LoaiDichVu");
        });

        modelBuilder.Entity<DmPhuLieuHoaChat>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Loai_Phu__2725BF40CB031E6C");
        });

        modelBuilder.Entity<DuocDien>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__DuocDien__2725BF406601CC67");
        });

        modelBuilder.Entity<HoaDonMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonMu__2725BF4086D58B5E");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.HoaDonMuaPlhcs).HasConstraintName("Fk_HoaDonMuaPLHC_NhanVien_Lap");
        });

        modelBuilder.Entity<HoaDonMuaPlhcchiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonMu__2725BF401DFC7594");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("FK_HoaDonMuaPLHCChiTiet_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaHoaDonNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("Fk_HoaDonMuaPLHCChiTiet_HoaDonMuaPLHC");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("FK_HoaDonMuaPLHCChiTiet_NhaCungCap");
        });

        modelBuilder.Entity<HoaDonThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonTh__2725BF400B0D856C");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.HoaDonThus).HasConstraintName("Fk_HoaDonThu_PhieuDangKy");

            entity.HasOne(d => d.ManvXuLyNavigation).WithMany(p => p.HoaDonThus).HasConstraintName("Fk_HoaDonThu_NhanVien_XuLy");
        });

        modelBuilder.Entity<HoaDonThuBoSung>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonTh__2725BF40623E6D45");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.HoaDonThuBoSungs).HasConstraintName("Fk_HoaDonThuBoSung_HoaDonThu");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.HoaDonThuBoSungs).HasConstraintName("Fk_HoaDonThuBoSung_NhanVien");
        });

        modelBuilder.Entity<KhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__KhachHan__2725BF40EC7B0764");
        });

        modelBuilder.Entity<Khoa>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Khoa__2725BF408B9E0435");
        });

        modelBuilder.Entity<LichSuPhanCong>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LichSuPh__2725BF402AA9D0A6");

            entity.HasOne(d => d.MaPhanCongNoiBoNavigation).WithMany(p => p.LichSuPhanCongs).HasConstraintName("Fk_LichSuPhanCong_PhanCongNoiBo");

            entity.HasOne(d => d.ManvCuNavigation).WithMany(p => p.LichSuPhanCongManvCuNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_Cu");

            entity.HasOne(d => d.ManvMoiNavigation).WithMany(p => p.LichSuPhanCongManvMoiNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_Moi");

            entity.HasOne(d => d.ManvPhanCongNavigation).WithMany(p => p.LichSuPhanCongManvPhanCongNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_PhanCong");
        });

        modelBuilder.Entity<Lkct>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LKCT__2725BF40B29E1114");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.Lkcts).HasConstraintName("Fk_LKCT_HoaDonThu");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.Lkcts).HasConstraintName("Fk_LKCT_NhanVien");
        });

        modelBuilder.Entity<LoaiDichVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiDich__2725BF40684AB178");
        });

        modelBuilder.Entity<LoaiMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiMau__2725BF400641FA22");
        });

        modelBuilder.Entity<LoaiTaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiTaiK__2725BF407F0EEB6E");
        });

        modelBuilder.Entity<Mau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau__2725BF40E14955B5");

            entity.HasOne(d => d.MaLoaiMauNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_LoaiMau");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_PhieuDangKy");

            entity.HasOne(d => d.MaTieuChuanNavigation).WithMany(p => p.Maus).HasConstraintName("FK_Mau_TieuChuan");

            entity.HasOne(d => d.MadvNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_DichVu");

            entity.HasOne(d => d.ManvThucHienNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_NhanVien_ThucHien");
        });

        modelBuilder.Entity<MauHinhAnh>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau_Hinh__2725BF40431D3BCB");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.MauHinhAnhs).HasConstraintName("Fk_Mau_HinhAnh_Mau");
        });

        modelBuilder.Entity<NhaCungCap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__NhaCungC__2725BF40330566B5");
        });

        modelBuilder.Entity<NhanVien>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__NhanVien__2725BF40A61DCA1F");

            entity.HasOne(d => d.MaBoPhanNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_BoPhan");

            entity.HasOne(d => d.MaChucVuNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_ChucVu");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_Khoa");
        });

        modelBuilder.Entity<PhanCongNoiBo>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhanCong__2725BF4017A0B88C");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhanCongNoiBos).HasConstraintName("Fk_PhanCongNoiBo_Mau");

            entity.HasOne(d => d.ManvPhanCongNavigation).WithMany(p => p.PhanCongNoiBoManvPhanCongNavigations).HasConstraintName("Fk_PhanCongNoiBo_NhanVien_PhanCong");

            entity.HasOne(d => d.ManvXyLyNavigation).WithMany(p => p.PhanCongNoiBoManvXyLyNavigations).HasConstraintName("Fk_PhanCongNoiBo_NhanVien_XyLy");
        });

        modelBuilder.Entity<PhieuChi>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuChi__2725BF40C982A6E8");

            entity.HasOne(d => d.MaHoaDonMuaPlhcNavigation).WithMany(p => p.PhieuChis).HasConstraintName("Fk_PhieuChi_HoaDonMuaPLHC");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.PhieuChis).HasConstraintName("Fk_PhieuChi_NhanVien");
        });

        modelBuilder.Entity<PhieuDangKy>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDan__2725BF40039DD21B");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_KhachHang");

            entity.HasOne(d => d.ManvNhanMauNavigation).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_NhanVien_Nhanmau");

            entity.HasOne(d => d.TrangThai).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_TrangThaiPhieuDK");
        });

        modelBuilder.Entity<PhieuDangKyPhuLieuHoaChat>(entity =>
        {
            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany().HasConstraintName("FK_PhieuDangKy_PhuLieuHoaChat_PhieuDangKy");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany().HasConstraintName("FK_PhieuDangKy_PhuLieuHoaChat_Dm_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<PhieuDeXuatMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF40B9E481DE");

            entity.HasOne(d => d.ManvDuyetNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcManvDuyetNavigations).HasConstraintName("Fk_PhieuDeXuatMuaPLHC_NhanVien_TuChoi");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcManvLapNavigations).HasConstraintName("Fk_PhieuDeXuatMuaPLHC_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuDeXuatPhongBan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF4089201D2E");

            entity.HasOne(d => d.MaKhoaTiepNhanNavigation).WithMany(p => p.PhieuDeXuatPhongBans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Fk_PhieuDeXuatPhongBan_Khoa_TiepNhan");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.PhieuDeXuatPhongBans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Fk_PhieuDeXuatPhongBan_PhieuDangKy");

            entity.HasOne(d => d.ManvDeXuatNavigation).WithMany(p => p.PhieuDeXuatPhongBanManvDeXuatNavigations).HasConstraintName("Fk_PhieuDeXuatPhongBan_NhanVien_DeXuat");

            entity.HasOne(d => d.ManvTiepNhanNavigation).WithMany(p => p.PhieuDeXuatPhongBanManvTiepNhanNavigations).HasConstraintName("Fk_PhieuDeXuatPhongBan_NhanVien_TiepNhan");
        });

        modelBuilder.Entity<PhieuDuTru>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDuT__2725BF400CF088FE");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_Khoa");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_Mau");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuLuuMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuLuu__2725BF40EB32796F");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuLuuMaus).HasConstraintName("Fk_PhieuLuuMau_Mau");

            entity.HasOne(d => d.ManvLuuNavigation).WithMany(p => p.PhieuLuuMaus).HasConstraintName("Fk_PhieuLuuMau_NhanVien_Luu");
        });

        modelBuilder.Entity<PhieuNhapKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuNha__2725BF401C725170");

            entity.HasOne(d => d.MaHoaDonMuaPlhcNavigation).WithMany(p => p.PhieuNhapKhos).HasConstraintName("Fk_PhieuNhapKho_HoaDonMuaPLHC");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuNhapKhoManvLapPhieuNavigations).HasConstraintName("Fk_PhieuNhapKho_NhanVien_Lap");

            entity.HasOne(d => d.ManvNhapKhoNavigation).WithMany(p => p.PhieuNhapKhoManvNhapKhoNavigations).HasConstraintName("Fk_PhieuNhapKho_NhanVien_Nhap");
        });

        modelBuilder.Entity<PhieuNhapKhoChiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuNha__2725BF4013816B41");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.PhieuNhapKhoChiTiets).HasConstraintName("Fk_PhieuNhapKhoChiTiet_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaPhieuNhapKhoNavigation).WithMany(p => p.PhieuNhapKhoChiTiets).HasConstraintName("Fk_PhieuNhapKhoChiTiet_PhieuNhapKho");
        });

        modelBuilder.Entity<PhieuPhanTichKetQua>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuPha__2725BF40D282A625");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.PhieuPhanTichKetQuas).HasConstraintName("Fk_PhieuPhanTichKetQua_Khoa");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuPhanTichKetQuas).HasConstraintName("Fk_PhieuPhanTichKetQua_Mau");

            entity.HasOne(d => d.ManvKiemTraNavigation).WithMany(p => p.PhieuPhanTichKetQuaManvKiemTraNavigations).HasConstraintName("Fk_PhieuPhanTichKetQua_NhanVien_KiemTra");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.PhieuPhanTichKetQuaManvLapNavigations).HasConstraintName("Fk_PhieuPhanTichKetQua_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuPhanTichKetQuaChiTiet>(entity =>
        {
            entity.HasOne(d => d.MaChiTieuNavigation).WithMany().HasConstraintName("Fk_PhieuPhanTichKetQuaChiTiet_ChiTieu");

            entity.HasOne(d => d.MaPhieuKetQuaNavigation).WithMany().HasConstraintName("Fk_PhieuPhanTichKetQuaChiTiet_PhieuPhanTichKetQua");

            entity.HasOne(d => d.MaPpNavigation).WithMany().HasConstraintName("Fk_PhieuPhanTichKetQuaChiTiet_PhuongPhap");
        });

        modelBuilder.Entity<PhieuThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuThu__2725BF40A73C9377");

            entity.HasOne(d => d.MaLienKetChungTuNavigation).WithMany(p => p.PhieuThus).HasConstraintName("Fk_PhieuThu_LKCT");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.PhieuThus).HasConstraintName("Fk_PhieuThu_NhanVien");
        });

        modelBuilder.Entity<PhieuTienDoLamViec>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuTie__2725BF409F7AB0BC");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuTienDoLamViecs).HasConstraintName("Fk_PhieuTienDoLamViec_Mau");

            entity.HasOne(d => d.ManvKiemTraNavigation).WithMany(p => p.PhieuTienDoLamViecManvKiemTraNavigations).HasConstraintName("Fk_PhieuTienDoLamViec_NhanVien_KiemTra");

            entity.HasOne(d => d.ManvXuLyNavigation).WithMany(p => p.PhieuTienDoLamViecManvXuLyNavigations).HasConstraintName("Fk_PhieuTienDoLamViec_NhanVien_Lam");
        });

        modelBuilder.Entity<PhieuXuatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuXua__2725BF4029BA4907");

            entity.HasOne(d => d.MaPhieuDuTruNavigation).WithMany(p => p.PhieuXuatKhos).HasConstraintName("Fk_PhieuThu_NhanVien_PhieuDuTru");

            entity.HasOne(d => d.ManvGiaoVatTuNavigation).WithMany(p => p.PhieuXuatKhoManvGiaoVatTuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Xuat");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuXuatKhoManvLapPhieuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Lap");

            entity.HasOne(d => d.ManvNhanVatTuNavigation).WithMany(p => p.PhieuXuatKhoManvNhanVatTuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Nhan");
        });

        modelBuilder.Entity<PhuLieuHoaChatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhuLieu___2725BF409C45A1D6");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.PhuLieuHoaChatKhos).HasConstraintName("Fk_PhuLieu_HoaChat_Kho_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.PhuLieuHoaChatKhos).HasConstraintName("Fk_PhuLieu_HoaChat_NhaCungCap");
        });

        modelBuilder.Entity<PhuongPhap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhuongPh__2725BF408520EC93");
        });

        modelBuilder.Entity<TaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TaiKhoan__2725BF400325F03C");

            entity.HasOne(d => d.MaBoPhanNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_BoPhan");

            entity.HasOne(d => d.MaChucVuNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_ChucVu");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_Khoa");

            entity.HasOne(d => d.MaLoaiTkNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_LoaiTaiKhoan");

            entity.HasOne(d => d.ManvNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_NhanVien");
        });

        modelBuilder.Entity<TaiKhoanKhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TaiKhoan__2725BF40D7873868");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.TaiKhoanKhachHangs).HasConstraintName("Fk_TaiKhoan_KhachHang_KhachHang");
        });

        modelBuilder.Entity<ThongBaoChoKhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF405ECC05CC");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.ThongBaoChoKhachHangs).HasConstraintName("Fk_ThongBaoChoKhachHang_KhachHang");

            entity.HasOne(d => d.ManvGuiNavigation).WithMany(p => p.ThongBaoChoKhachHangs).HasConstraintName("Fk_ThongBaoChoKhachHang_NhanVien");
        });

        modelBuilder.Entity<ThongBaoChoTrungTam>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40B21B6435");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.ThongBaoChoTrungTams).HasConstraintName("Fk_ThongBaoChoTrungTam_KhachHang");
        });

        modelBuilder.Entity<ThongBaoChoTrungTamNhan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40CB2BFFDB");

            entity.HasOne(d => d.NhanVien).WithMany(p => p.ThongBaoChoTrungTamNhans).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhan_NhanVien");

            entity.HasOne(d => d.ThongBao).WithMany(p => p.ThongBaoChoTrungTamNhans).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhan_ThongBaoChoTrungTam");
        });

        modelBuilder.Entity<ThongBaoChoTrungTamNhom>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40ACE55A86");

            entity.HasOne(d => d.ThongBao).WithMany(p => p.ThongBaoChoTrungTamNhoms).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhom_ThongBaoChoTrungTam");
        });

        modelBuilder.Entity<ThongBaoNoiBo>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40DBB3C6B5");

            entity.HasOne(d => d.ManvGuiNavigation).WithMany(p => p.ThongBaoNoiBos).HasConstraintName("Fk_ThongBaoNoiBo_NhanVien_Gui");
        });

        modelBuilder.Entity<ThongBaoNoiBoNhan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF400EAE2765");

            entity.HasOne(d => d.NhanVien).WithMany(p => p.ThongBaoNoiBoNhans).HasConstraintName("Fk_ThongBaoNoiBo_Nhan_NhanVien");

            entity.HasOne(d => d.ThongBaoNoiBo).WithMany(p => p.ThongBaoNoiBoNhans).HasConstraintName("Fk_ThongBaoNoiBo_Nhan_ThongBaoNoiBo");
        });

        modelBuilder.Entity<ThongBaoNoiBoNhom>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40B7C57592");

            entity.HasOne(d => d.ThongBaoNoiBo).WithMany(p => p.ThongBaoNoiBoNhoms).HasConstraintName("Fk_ThongBao_Nhom_ThongBaoNoiBo");
        });

        modelBuilder.Entity<TieuChuan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TieuChua__2725BF402CED50C6");

            entity.HasOne(d => d.MaDuocDienNavigation).WithMany(p => p.TieuChuans).HasConstraintName("Fk_TieuChuan_DuocDien");
        });

        modelBuilder.Entity<TrangThaiPhieuDk>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TrangTha__2725BF40A5755895");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
