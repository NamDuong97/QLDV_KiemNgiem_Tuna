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

    public virtual DbSet<ChiTietPhieuDangKy> ChiTietPhieuDangKies { get; set; }

    public virtual DbSet<ChiTietPhieuDeXuatPhongBan> ChiTietPhieuDeXuatPhongBans { get; set; }

    public virtual DbSet<ChiTietPhieuDuTru> ChiTietPhieuDuTrus { get; set; }

    public virtual DbSet<ChiTietPhieuXuatKho> ChiTietPhieuXuatKhos { get; set; }

    public virtual DbSet<ChiTieu> ChiTieus { get; set; }

    public virtual DbSet<ChiTieuPhuongPhap> ChiTieuPhuongPhaps { get; set; }

    public virtual DbSet<ChucVu> ChucVus { get; set; }

    public virtual DbSet<DichVu> DichVus { get; set; }

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

    public virtual DbSet<LoaiPhuLieuHoaChat> LoaiPhuLieuHoaChats { get; set; }

    public virtual DbSet<LoaiTaiKhoan> LoaiTaiKhoans { get; set; }

    public virtual DbSet<Mau> Maus { get; set; }

    public virtual DbSet<MauHinhAnh> MauHinhAnhs { get; set; }

    public virtual DbSet<MauPlhcCan> MauPlhcCans { get; set; }

    public virtual DbSet<MauPlhcCungCap> MauPlhcCungCaps { get; set; }

    public virtual DbSet<NhaCungCap> NhaCungCaps { get; set; }

    public virtual DbSet<NhanVien> NhanViens { get; set; }

    public virtual DbSet<PhanCongNoiBo> PhanCongNoiBos { get; set; }

    public virtual DbSet<PhieuChi> PhieuChis { get; set; }

    public virtual DbSet<PhieuDangKy> PhieuDangKies { get; set; }

    public virtual DbSet<PhieuDeXuatMuaPlhc> PhieuDeXuatMuaPlhcs { get; set; }

    public virtual DbSet<PhieuDeXuatMuaPlhcchiTiet> PhieuDeXuatMuaPlhcchiTiets { get; set; }

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

    public virtual DbSet<PhuLieuHoaChat> PhuLieuHoaChats { get; set; }

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
            entity.HasKey(e => e.MaId).HasName("PK__BoPhan__2725BF403325FA96");
        });

        modelBuilder.Entity<ChiTietHoaDonThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietH__2725BF40ABE91B15");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.ChiTietHoaDonThus).HasConstraintName("Fk_ChiTietHoaDonThu_HoaDonThu");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.ChiTietHoaDonThus).HasConstraintName("Fk_ChiTietHoaDonThu_Mau");
        });

        modelBuilder.Entity<ChiTietHoaDonThuBoSung>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietH__2725BF4098DB6284");

            entity.HasOne(d => d.MaHdbsNavigation).WithMany(p => p.ChiTietHoaDonThuBoSungs).HasConstraintName("Fk_ChiTietHoaDonThuBoSung_HoaDonThuBoSung");

            entity.HasOne(d => d.MaPhuLieuHcNavigation).WithMany(p => p.ChiTietHoaDonThuBoSungs).HasConstraintName("Fk_ChiTietHoaDonThuBoSung_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<ChiTietPhieuDangKy>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF40EB0F66C0");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.ChiTietPhieuDangKies).HasConstraintName("Fk_ChiTietPhieuDangKy_Mau");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.ChiTietPhieuDangKies).HasConstraintName("Fk_ChiTietPhieuDangKy_PhieuDangKy");

            entity.HasOne(d => d.MaTieuChuanNavigation).WithMany(p => p.ChiTietPhieuDangKies).HasConstraintName("Fk_ChiTietPhieuDangKy_TieuChuan");

            entity.HasOne(d => d.MadvNavigation).WithMany(p => p.ChiTietPhieuDangKies).HasConstraintName("Fk_ChiTietPhieuDangKy_DichVu");
        });

        modelBuilder.Entity<ChiTietPhieuDeXuatPhongBan>(entity =>
        {
            entity.HasOne(d => d.MaMauNavigation).WithMany().HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_Mau");

            entity.HasOne(d => d.MaPhieuDeXuatNavigation).WithMany().HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_PhieuDeXuatPhongBan");

            entity.HasOne(d => d.MaTieuChuanNavigation).WithMany().HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_TieuChuan");
        });

        modelBuilder.Entity<ChiTietPhieuDuTru>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF40973B5B23");

            entity.HasOne(d => d.MaPhieuDuTruNavigation).WithMany(p => p.ChiTietPhieuDuTrus).HasConstraintName("Fk_ChiTietPhieuDuTru_PhieuDuTru");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.ChiTietPhieuDuTrus).HasConstraintName("Fk_ChiTietPhieuDuTru_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<ChiTietPhieuXuatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF409920986F");

            entity.HasOne(d => d.MaPhieuXuatKhoNavigation).WithMany(p => p.ChiTietPhieuXuatKhos).HasConstraintName("Fk_ChiTietPhieuXuatKho_PhieuXuatKho");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.ChiTietPhieuXuatKhos).HasConstraintName("Fk_ChiTietPhieuXuatKho_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<ChiTieu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTieu__2725BF40766D8960");

            entity.HasOne(d => d.MaTieuChuanNavigation).WithMany(p => p.ChiTieus).HasConstraintName("Fk_ChiTieu_TieuChuan");
        });

        modelBuilder.Entity<ChiTieuPhuongPhap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTieu___2725BF40521AFE9E");

            entity.HasOne(d => d.MaChiTieuNavigation).WithMany(p => p.ChiTieuPhuongPhaps).HasConstraintName("Fk_ChiTieu_PhuongPhap_ChiTieu");

            entity.HasOne(d => d.MaPpNavigation).WithMany(p => p.ChiTieuPhuongPhaps).HasConstraintName("Fk_ChiTieu_PhuongPhap_PhuongPhap");
        });

        modelBuilder.Entity<ChucVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChucVu__2725BF40570AC19A");
        });

        modelBuilder.Entity<DichVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__DichVu__2725BF402335CEBC");

            entity.HasOne(d => d.MaLoaidvNavigation).WithMany(p => p.DichVus).HasConstraintName("Fk_DichVu_LoaiDichVu");
        });

        modelBuilder.Entity<DuocDien>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__DuocDien__2725BF40D93E39D5");
        });

        modelBuilder.Entity<HoaDonMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonMu__2725BF4077FA6681");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.HoaDonMuaPlhcs).HasConstraintName("Fk_HoaDonMuaPLHC_PhuLieu_NhaCungCap");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.HoaDonMuaPlhcs).HasConstraintName("Fk_HoaDonMuaPLHC_NhanVien_Lap");
        });

        modelBuilder.Entity<HoaDonMuaPlhcchiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonMu__2725BF4065276B45");

            entity.HasOne(d => d.MaHoaDonNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("Fk_HoaDonMuaPLHCChiTiet_HoaDonMuaPLHC");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("Fk_HoaDonMuaPLHCChiTiet_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<HoaDonThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonTh__2725BF404B65912D");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.HoaDonThus).HasConstraintName("Fk_HoaDonThu_PhieuDangKy");

            entity.HasOne(d => d.ManvXuLyNavigation).WithMany(p => p.HoaDonThus).HasConstraintName("Fk_HoaDonThu_NhanVien_XuLy");
        });

        modelBuilder.Entity<HoaDonThuBoSung>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonTh__2725BF405BE81B7C");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.HoaDonThuBoSungs).HasConstraintName("Fk_HoaDonThuBoSung_HoaDonThu");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.HoaDonThuBoSungs).HasConstraintName("Fk_HoaDonThuBoSung_NhanVien");
        });

        modelBuilder.Entity<KhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__KhachHan__2725BF407770AAA4");
        });

        modelBuilder.Entity<Khoa>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Khoa__2725BF404137C7E3");
        });

        modelBuilder.Entity<LichSuPhanCong>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LichSuPh__2725BF40D52AE13D");

            entity.HasOne(d => d.MaPhanCongNoiBoNavigation).WithMany(p => p.LichSuPhanCongs).HasConstraintName("Fk_LichSuPhanCong_PhanCongNoiBo");

            entity.HasOne(d => d.ManvCuNavigation).WithMany(p => p.LichSuPhanCongManvCuNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_Cu");

            entity.HasOne(d => d.ManvMoiNavigation).WithMany(p => p.LichSuPhanCongManvMoiNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_Moi");

            entity.HasOne(d => d.ManvPhanCongNavigation).WithMany(p => p.LichSuPhanCongManvPhanCongNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_PhanCong");
        });

        modelBuilder.Entity<Lkct>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LKCT__2725BF408F0934E6");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.Lkcts).HasConstraintName("Fk_LKCT_HoaDonThu");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.Lkcts).HasConstraintName("Fk_LKCT_NhanVien");
        });

        modelBuilder.Entity<LoaiDichVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiDich__2725BF40E0BCA7CA");
        });

        modelBuilder.Entity<LoaiMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiMau__2725BF405732E6D4");
        });

        modelBuilder.Entity<LoaiPhuLieuHoaChat>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Loai_Phu__2725BF4051508C83");
        });

        modelBuilder.Entity<LoaiTaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiTaiK__2725BF402DFBE0E0");
        });

        modelBuilder.Entity<Mau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau__2725BF40BFAEF456");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_Khoa");

            entity.HasOne(d => d.MaLoaiMauNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_LoaiMau");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_PhieuDangKy");

            entity.HasOne(d => d.MadvNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_DichVu");

            entity.HasOne(d => d.ManvThucHienNavigation).WithMany(p => p.Maus).HasConstraintName("Fk_Mau_NhanVien_ThucHien");
        });

        modelBuilder.Entity<MauHinhAnh>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau_Hinh__2725BF409D2C0A8A");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.MauHinhAnhs).HasConstraintName("Fk_Mau_HinhAnh_Mau");
        });

        modelBuilder.Entity<MauPlhcCan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau_PLHC__2725BF406E8E2A9B");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.MauPlhcCans).HasConstraintName("Fk_PLHC_Mau_Can");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.MauPlhcCans).HasConstraintName("Fk_Mau_PLHC_Can");
        });

        modelBuilder.Entity<MauPlhcCungCap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau_PLHC__2725BF40F522D4F0");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.MauPlhcCungCaps).HasConstraintName("Fk_PhuLieu_HoaChat_Mau_CungCap");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.MauPlhcCungCaps).HasConstraintName("Fk_Mau_PhuLieu_HoaChat_CungCap");
        });

        modelBuilder.Entity<NhaCungCap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__NhaCungC__2725BF403566CACB");
        });

        modelBuilder.Entity<NhanVien>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__NhanVien__2725BF40454379E9");

            entity.HasOne(d => d.MaBoPhanNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_BoPhan");

            entity.HasOne(d => d.MaChucVuNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_ChucVu");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_Khoa");
        });

        modelBuilder.Entity<PhanCongNoiBo>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhanCong__2725BF40A9A9B943");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhanCongNoiBos).HasConstraintName("Fk_PhanCongNoiBo_Mau");

            entity.HasOne(d => d.ManvPhanCongNavigation).WithMany(p => p.PhanCongNoiBoManvPhanCongNavigations).HasConstraintName("Fk_PhanCongNoiBo_NhanVien_PhanCong");

            entity.HasOne(d => d.ManvXyLyNavigation).WithMany(p => p.PhanCongNoiBoManvXyLyNavigations).HasConstraintName("Fk_PhanCongNoiBo_NhanVien_XyLy");
        });

        modelBuilder.Entity<PhieuChi>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuChi__2725BF407F8F5ACC");

            entity.HasOne(d => d.MaHoaDonMuaPlhcNavigation).WithMany(p => p.PhieuChis).HasConstraintName("Fk_PhieuChi_HoaDonMuaPLHC");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.PhieuChis).HasConstraintName("Fk_PhieuChi_NhanVien");
        });

        modelBuilder.Entity<PhieuDangKy>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDan__2725BF40552E2507");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_KhachHang");

            entity.HasOne(d => d.ManvNhanMauNavigation).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_NhanVien_Nhanmau");

            entity.HasOne(d => d.TrangThai).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_TrangThaiPhieuDK");
        });

        modelBuilder.Entity<PhieuDeXuatMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF40ED956966");

            entity.HasOne(d => d.ManvDuyetNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcManvDuyetNavigations).HasConstraintName("Fk_PhieuDeXuatMuaPLHC_NhanVien_TuChoi");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcManvLapNavigations).HasConstraintName("Fk_PhieuDeXuatMuaPLHC_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuDeXuatMuaPlhcchiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF40F82F58AB");

            entity.HasOne(d => d.MaPhieuDeXuatMuaNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcchiTiets).HasConstraintName("Fk_PhieuDeXuatMuaPLHCChiTiet_PhieuDeXuatMuaPLHC");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcchiTiets).HasConstraintName("Fk_PhieuDeXuatMuaPLHCChiTiet_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<PhieuDeXuatPhongBan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF4053506045");

            entity.HasOne(d => d.MaKhoaTiepNhanNavigation).WithMany(p => p.PhieuDeXuatPhongBans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Fk_PhieuDeXuatPhongBan_Khoa_TiepNhan");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.PhieuDeXuatPhongBans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Fk_PhieuDeXuatPhongBan_PhieuDangKy");

            entity.HasOne(d => d.ManvDeXuatNavigation).WithMany(p => p.PhieuDeXuatPhongBanManvDeXuatNavigations).HasConstraintName("Fk_PhieuDeXuatPhongBan_NhanVien_DeXuat");

            entity.HasOne(d => d.ManvTiepNhanNavigation).WithMany(p => p.PhieuDeXuatPhongBanManvTiepNhanNavigations).HasConstraintName("Fk_PhieuDeXuatPhongBan_NhanVien_TiepNhan");

            entity.HasOne(d => d.ManvTuChoiNavigation).WithMany(p => p.PhieuDeXuatPhongBanManvTuChoiNavigations).HasConstraintName("Fk_PhieuDeXuatPhongBan_NhanVien_TuChoi");
        });

        modelBuilder.Entity<PhieuDuTru>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDuT__2725BF4080887071");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_Khoa");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_Mau");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuLuuMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuLuu__2725BF40532B05DC");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuLuuMaus).HasConstraintName("Fk_PhieuLuuMau_Mau");

            entity.HasOne(d => d.ManvLuuNavigation).WithMany(p => p.PhieuLuuMaus).HasConstraintName("Fk_PhieuLuuMau_NhanVien_Luu");
        });

        modelBuilder.Entity<PhieuNhapKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuNha__2725BF405974D9FB");

            entity.HasOne(d => d.MaHoaDonMuaPlhcNavigation).WithMany(p => p.PhieuNhapKhos).HasConstraintName("Fk_PhieuNhapKho_HoaDonMuaPLHC");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuNhapKhoManvLapPhieuNavigations).HasConstraintName("Fk_PhieuNhapKho_NhanVien_Lap");

            entity.HasOne(d => d.ManvNhapKhoNavigation).WithMany(p => p.PhieuNhapKhoManvNhapKhoNavigations).HasConstraintName("Fk_PhieuNhapKho_NhanVien_Nhap");
        });

        modelBuilder.Entity<PhieuNhapKhoChiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuNha__2725BF4027458916");

            entity.HasOne(d => d.MaPhieuNhapKhoNavigation).WithMany(p => p.PhieuNhapKhoChiTiets).HasConstraintName("Fk_PhieuNhapKhoChiTiet_PhieuNhapKho");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.PhieuNhapKhoChiTiets).HasConstraintName("Fk_PhieuNhapKhoChiTiet_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<PhieuPhanTichKetQua>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuPha__2725BF4084215003");

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
            entity.HasKey(e => e.MaId).HasName("PK__PhieuThu__2725BF4061D21F6F");

            entity.HasOne(d => d.MaLienKetChungTuNavigation).WithMany(p => p.PhieuThus).HasConstraintName("Fk_PhieuThu_LKCT");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.PhieuThus).HasConstraintName("Fk_PhieuThu_NhanVien");
        });

        modelBuilder.Entity<PhieuTienDoLamViec>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuTie__2725BF4053263AF5");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuTienDoLamViecs).HasConstraintName("Fk_PhieuTienDoLamViec_Mau");

            entity.HasOne(d => d.ManvKiemTraNavigation).WithMany(p => p.PhieuTienDoLamViecManvKiemTraNavigations).HasConstraintName("Fk_PhieuTienDoLamViec_NhanVien_KiemTra");

            entity.HasOne(d => d.ManvXuLyNavigation).WithMany(p => p.PhieuTienDoLamViecManvXuLyNavigations).HasConstraintName("Fk_PhieuTienDoLamViec_NhanVien_Lam");
        });

        modelBuilder.Entity<PhieuXuatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuXua__2725BF40B699FF31");

            entity.HasOne(d => d.MaPhieuDuTruNavigation).WithMany(p => p.PhieuXuatKhos).HasConstraintName("Fk_PhieuThu_NhanVien_PhieuDuTru");

            entity.HasOne(d => d.ManvGiaoVatTuNavigation).WithMany(p => p.PhieuXuatKhoManvGiaoVatTuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Xuat");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuXuatKhoManvLapPhieuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Lap");

            entity.HasOne(d => d.ManvNhanVatTuNavigation).WithMany(p => p.PhieuXuatKhoManvNhanVatTuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Nhan");
        });

        modelBuilder.Entity<PhuLieuHoaChat>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhuLieu___2725BF40000574D5");

            entity.HasOne(d => d.MaLoaiPlhcNavigation).WithMany(p => p.PhuLieuHoaChats).HasConstraintName("Fk_PhuLieu_HoaChat_Loai_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.PhuLieuHoaChats).HasConstraintName("Fk_PhuLieu_HoaChat_NhaCungCap");
        });

        modelBuilder.Entity<PhuongPhap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhuongPh__2725BF40E6BF776A");
        });

        modelBuilder.Entity<TaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TaiKhoan__2725BF40D6046E16");

            entity.HasOne(d => d.MaBoPhanNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_BoPhan");

            entity.HasOne(d => d.MaChucVuNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_ChucVu");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_Khoa");

            entity.HasOne(d => d.MaLoaiTkNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_LoaiTaiKhoan");

            entity.HasOne(d => d.ManvNavigation).WithMany(p => p.TaiKhoans).HasConstraintName("Fk_TaiKhoan_NhanVien");
        });

        modelBuilder.Entity<TaiKhoanKhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TaiKhoan__2725BF40A4A16AE7");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.TaiKhoanKhachHangs).HasConstraintName("Fk_TaiKhoan_KhachHang_KhachHang");
        });

        modelBuilder.Entity<ThongBaoChoKhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40632845D0");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.ThongBaoChoKhachHangs).HasConstraintName("Fk_ThongBaoChoKhachHang_KhachHang");

            entity.HasOne(d => d.ManvGuiNavigation).WithMany(p => p.ThongBaoChoKhachHangs).HasConstraintName("Fk_ThongBaoChoKhachHang_NhanVien");
        });

        modelBuilder.Entity<ThongBaoChoTrungTam>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40DEE5D5E6");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.ThongBaoChoTrungTams).HasConstraintName("Fk_ThongBaoChoTrungTam_KhachHang");
        });

        modelBuilder.Entity<ThongBaoChoTrungTamNhan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40CD4EE52B");

            entity.HasOne(d => d.NhanVien).WithMany(p => p.ThongBaoChoTrungTamNhans).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhan_NhanVien");

            entity.HasOne(d => d.ThongBao).WithMany(p => p.ThongBaoChoTrungTamNhans).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhan_ThongBaoChoTrungTam");
        });

        modelBuilder.Entity<ThongBaoChoTrungTamNhom>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40CB88CC50");

            entity.HasOne(d => d.ThongBao).WithMany(p => p.ThongBaoChoTrungTamNhoms).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhom_ThongBaoChoTrungTam");
        });

        modelBuilder.Entity<ThongBaoNoiBo>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF4092DD5CB7");

            entity.HasOne(d => d.ManvGuiNavigation).WithMany(p => p.ThongBaoNoiBos).HasConstraintName("Fk_ThongBaoNoiBo_NhanVien_Gui");
        });

        modelBuilder.Entity<ThongBaoNoiBoNhan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40FD166BD6");

            entity.HasOne(d => d.NhanVien).WithMany(p => p.ThongBaoNoiBoNhans).HasConstraintName("Fk_ThongBaoNoiBo_Nhan_NhanVien");

            entity.HasOne(d => d.ThongBaoNoiBo).WithMany(p => p.ThongBaoNoiBoNhans).HasConstraintName("Fk_ThongBaoNoiBo_Nhan_ThongBaoNoiBo");
        });

        modelBuilder.Entity<ThongBaoNoiBoNhom>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40A91CD32C");

            entity.HasOne(d => d.ThongBaoNoiBo).WithMany(p => p.ThongBaoNoiBoNhoms).HasConstraintName("Fk_ThongBao_Nhom_ThongBaoNoiBo");
        });

        modelBuilder.Entity<TieuChuan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TieuChua__2725BF40B5812B94");

            entity.HasOne(d => d.MaDuocDienNavigation).WithMany(p => p.TieuChuans).HasConstraintName("Fk_TieuChuan_DuocDien");
        });

        modelBuilder.Entity<TrangThaiPhieuDk>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TrangTha__2725BF40EE3C1BD2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
