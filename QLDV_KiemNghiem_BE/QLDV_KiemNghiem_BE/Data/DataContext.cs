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

    public virtual DbSet<DmMau> DmMaus { get; set; }

    public virtual DbSet<DmPhuLieuHoaChat> DmPhuLieuHoaChats { get; set; }

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

    public virtual DbSet<MauTieuChuan> MauTieuChuans { get; set; }

    public virtual DbSet<MauTieuChuanChiTieu> MauTieuChuanChiTieus { get; set; }

    public virtual DbSet<MauTieuChuanChiTieuPhuongPhap> MauTieuChuanChiTieuPhuongPhaps { get; set; }

    public virtual DbSet<NhaCungCap> NhaCungCaps { get; set; }

    public virtual DbSet<NhanVien> NhanViens { get; set; }

    public virtual DbSet<PhanCongNoiBo> PhanCongNoiBos { get; set; }

    public virtual DbSet<PhieuChi> PhieuChis { get; set; }

    public virtual DbSet<PhieuDangKy> PhieuDangKies { get; set; }

    public virtual DbSet<PhieuDangKyMau> PhieuDangKyMaus { get; set; }

    public virtual DbSet<PhieuDangKyMauHinhAnh> PhieuDangKyMauHinhAnhs { get; set; }

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
            entity.HasKey(e => e.MaId).HasName("PK__BoPhan__2725BF401698C8B8");
        });

        modelBuilder.Entity<ChiTietHoaDonThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietH__2725BF403C0212DB");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.ChiTietHoaDonThus).HasConstraintName("Fk_ChiTietHoaDonThu_HoaDonThu");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.ChiTietHoaDonThus).HasConstraintName("Fk_ChiTietHoaDonThu_PhieuDangKy_Mau");
        });

        modelBuilder.Entity<ChiTietHoaDonThuBoSung>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietH__2725BF407D06AD9C");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.ChiTietHoaDonThuBoSungs).HasConstraintName("Fk_ChiTietHoaDonThuBoSung_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaHdbsNavigation).WithMany(p => p.ChiTietHoaDonThuBoSungs).HasConstraintName("Fk_ChiTietHoaDonThuBoSung_HoaDonThuBoSung");
        });

        modelBuilder.Entity<ChiTietPhieuDeXuatMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF40A60C641E");

            entity.HasOne(d => d.MaPhieuDeXuatMuaNavigation).WithMany(p => p.ChiTietPhieuDeXuatMuaPlhcs).HasConstraintName("Fk_PhieuDeXuatMuaPLHCChiTiet_PhieuDeXuatMuaPLHC");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.ChiTietPhieuDeXuatMuaPlhcs).HasConstraintName("Fk_PhieuDeXuatMuaPLHCChiTiet_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<ChiTietPhieuDeXuatPhongBan>(entity =>
        {
            entity.HasOne(d => d.MaPdkMauNavigation).WithMany(p => p.ChiTietPhieuDeXuatPhongBans).HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_Mau");

            entity.HasOne(d => d.MaPhieuDeXuatNavigation).WithMany(p => p.ChiTietPhieuDeXuatPhongBans).HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_PhieuDeXuatPhongBan");

            entity.HasOne(d => d.ManvTuChoiNavigation).WithMany(p => p.ChiTietPhieuDeXuatPhongBans).HasConstraintName("Fk_ChiTietPhieuDeXuatPhongBan_NhanVien");
        });

        modelBuilder.Entity<ChiTietPhieuDuTru>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF405970F5E0");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.ChiTietPhieuDuTrus).HasConstraintName("Fk_ChiTietPhieuDuTru_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaPhieuDuTruNavigation).WithMany(p => p.ChiTietPhieuDuTrus).HasConstraintName("Fk_ChiTietPhieuDuTru_PhieuDuTru");
        });

        modelBuilder.Entity<ChiTietPhieuXuatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTietP__2725BF40CC4BBA67");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.ChiTietPhieuXuatKhos).HasConstraintName("Fk_ChiTietPhieuXuatKho_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaPhieuXuatKhoNavigation).WithMany(p => p.ChiTietPhieuXuatKhos).HasConstraintName("Fk_ChiTietPhieuXuatKho_PhieuXuatKho");
        });

        modelBuilder.Entity<ChiTieu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTieu__2725BF40CEF91B57");
        });

        modelBuilder.Entity<ChiTieuPhuongPhap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChiTieu___2725BF40D3043CD3");

            entity.HasOne(d => d.MaChiTieuNavigation).WithMany(p => p.ChiTieuPhuongPhaps).HasConstraintName("Fk_ChiTieu_PhuongPhap_ChiTieu");

            entity.HasOne(d => d.MaPpNavigation).WithMany(p => p.ChiTieuPhuongPhaps).HasConstraintName("Fk_ChiTieu_PhuongPhap_PhuongPhap");
        });

        modelBuilder.Entity<ChucVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ChucVu__2725BF40139617D5");
        });

        modelBuilder.Entity<DmMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Dm_Mau__2725BF4069596860");

            entity.HasOne(d => d.MaLoaiMauNavigation).WithMany(p => p.DmMaus).HasConstraintName("FK_Dm_Mau_LoaiMau");
        });

        modelBuilder.Entity<DmPhuLieuHoaChat>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Dm_PhuLi__2725BF40A1E51C2F");
        });

        modelBuilder.Entity<HoaDonMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonMu__2725BF4053B6456D");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.HoaDonMuaPlhcs).HasConstraintName("Fk_HoaDonMuaPLHC_NhanVien_Lap");
        });

        modelBuilder.Entity<HoaDonMuaPlhcchiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonMu__2725BF40CD167D98");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("FK_HoaDonMuaPLHCChiTiet_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaHoaDonNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("Fk_HoaDonMuaPLHCChiTiet_HoaDonMuaPLHC");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.HoaDonMuaPlhcchiTiets).HasConstraintName("FK_HoaDonMuaPLHCChiTiet_NhaCungCap");
        });

        modelBuilder.Entity<HoaDonThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonTh__2725BF40469A108D");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.HoaDonThus).HasConstraintName("Fk_HoaDonThu_PhieuDangKy");

            entity.HasOne(d => d.ManvXuLyNavigation).WithMany(p => p.HoaDonThus).HasConstraintName("Fk_HoaDonThu_NhanVien_XuLy");
        });

        modelBuilder.Entity<HoaDonThuBoSung>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__HoaDonTh__2725BF409479C392");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.HoaDonThuBoSungs).HasConstraintName("Fk_HoaDonThuBoSung_HoaDonThu");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.HoaDonThuBoSungs).HasConstraintName("Fk_HoaDonThuBoSung_NhanVien");
        });

        modelBuilder.Entity<KhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__KhachHan__2725BF4075DCE6B0");

            entity.Property(e => e.TrangThai).HasDefaultValue(true);
        });

        modelBuilder.Entity<Khoa>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Khoa__2725BF403BB96030");
        });

        modelBuilder.Entity<LichSuPhanCong>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LichSuPh__2725BF4057ACB081");

            entity.HasOne(d => d.MaPhanCongNoiBoNavigation).WithMany(p => p.LichSuPhanCongs).HasConstraintName("Fk_LichSuPhanCong_PhanCongNoiBo");

            entity.HasOne(d => d.ManvCuNavigation).WithMany(p => p.LichSuPhanCongManvCuNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_Cu");

            entity.HasOne(d => d.ManvMoiNavigation).WithMany(p => p.LichSuPhanCongManvMoiNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_Moi");

            entity.HasOne(d => d.ManvPhanCongNavigation).WithMany(p => p.LichSuPhanCongManvPhanCongNavigations).HasConstraintName("Fk_LichSuPhanCong_NhanVien_PhanCong");
        });

        modelBuilder.Entity<Lkct>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LKCT__2725BF406F962C86");

            entity.HasOne(d => d.MaHdNavigation).WithMany(p => p.Lkcts).HasConstraintName("Fk_LKCT_HoaDonThu");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.Lkcts).HasConstraintName("Fk_LKCT_NhanVien");
        });

        modelBuilder.Entity<LoaiDichVu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiDich__2725BF400125F677");
        });

        modelBuilder.Entity<LoaiMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiMau__2725BF40985604EE");
        });

        modelBuilder.Entity<LoaiTaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__LoaiTaiK__2725BF405187EA9D");
        });

        modelBuilder.Entity<MauTieuChuan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau_Tieu__2725BF40115B9B87");

            entity.HasOne(d => d.MaDmMauNavigation).WithMany(p => p.MauTieuChuans).HasConstraintName("FK_Mau_TieuChuan_Dm_Mau");

            entity.HasOne(d => d.MaTieuChuanNavigation).WithMany(p => p.MauTieuChuans).HasConstraintName("FK_Mau_TieuChuan_TieuChuan");
        });

        modelBuilder.Entity<MauTieuChuanChiTieu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TieuChua__2725BF4005307FA0");

            entity.HasOne(d => d.MaChiTieuNavigation).WithMany(p => p.MauTieuChuanChiTieus).HasConstraintName("FK_TieuChuan_ChiTieu_ChiTieu");

            entity.HasOne(d => d.MaMauTieuChuanNavigation).WithMany(p => p.MauTieuChuanChiTieus).HasConstraintName("FK_TieuChuan_ChiTieu_Mau_TieuChuan");
        });

        modelBuilder.Entity<MauTieuChuanChiTieuPhuongPhap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__Mau_Tieu__2725BF40921C9EC2");

            entity.HasOne(d => d.MaMauTieuChuanChiTieuNavigation).WithMany(p => p.MauTieuChuanChiTieuPhuongPhaps).HasConstraintName("FK_MTCCTPP_Mau_TieuChuan_ChiTieu");

            entity.HasOne(d => d.MaPpNavigation).WithMany(p => p.MauTieuChuanChiTieuPhuongPhaps).HasConstraintName("FK_MTCCTPP_PhuongPhap");
        });

        modelBuilder.Entity<NhaCungCap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__NhaCungC__2725BF40603CBAB5");
        });

        modelBuilder.Entity<NhanVien>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__NhanVien__2725BF4010F06494");

            entity.HasOne(d => d.MaBoPhanNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_BoPhan");

            entity.HasOne(d => d.MaChucVuNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_ChucVu");

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.NhanViens).HasConstraintName("Fk_NhanVien_Khoa");

            entity.HasOne(d => d.MaLoaiTkNavigation).WithMany(p => p.NhanViens).HasConstraintName("FK_NhanVien_LoaiTaiKhoan");
        });

        modelBuilder.Entity<PhanCongNoiBo>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhanCong__2725BF40BB1E4190");

            entity.HasOne(d => d.MaPdkMauNavigation).WithMany(p => p.PhanCongNoiBos).HasConstraintName("Fk_PhanCongNoiBo_PhieuDangKy_Mau");

            entity.HasOne(d => d.ManvPhanCongNavigation).WithMany(p => p.PhanCongNoiBoManvPhanCongNavigations).HasConstraintName("Fk_PhanCongNoiBo_NhanVien_PhanCong");

            entity.HasOne(d => d.ManvXyLyNavigation).WithMany(p => p.PhanCongNoiBoManvXyLyNavigations).HasConstraintName("Fk_PhanCongNoiBo_NhanVien_XyLy");
        });

        modelBuilder.Entity<PhieuChi>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuChi__2725BF407B936004");

            entity.HasOne(d => d.MaHoaDonMuaPlhcNavigation).WithMany(p => p.PhieuChis).HasConstraintName("Fk_PhieuChi_HoaDonMuaPLHC");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.PhieuChis).HasConstraintName("Fk_PhieuChi_NhanVien");
        });

        modelBuilder.Entity<PhieuDangKy>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDan__2725BF40E6D07D67");

            entity.HasOne(d => d.MaBldduyetNavigation).WithMany(p => p.PhieuDangKyMaBldduyetNavigations).HasConstraintName("Fk_PhieuDangKy_NhanVien_TongDuyet");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_KhachHang");

            entity.HasOne(d => d.ManvNhanMauNavigation).WithMany(p => p.PhieuDangKyManvNhanMauNavigations).HasConstraintName("Fk_PhieuDangKy_NhanVien_Nhanmau");

            entity.HasOne(d => d.ManvSoDuyetNavigation).WithMany(p => p.PhieuDangKyManvSoDuyetNavigations).HasConstraintName("Fk_PhieuDangKy_NhanVien_SoDuyet");

            entity.HasOne(d => d.TrangThai).WithMany(p => p.PhieuDangKies).HasConstraintName("Fk_PhieuDangKy_TrangThaiPhieuDK");
        });

        modelBuilder.Entity<PhieuDangKyMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDangKy_Mau__2725BF407E971016");

            entity.HasOne(d => d.MaDmMauNavigation).WithMany(p => p.PhieuDangKyMaus).HasConstraintName("FK_PhieuDangKy_Mau_Dm_Mau");

            entity.HasOne(d => d.MaLoaiDvNavigation).WithMany(p => p.PhieuDangKyMaus).HasConstraintName("FK_PhieuDangKy_Mau_LoaiDichVu");

            entity.HasOne(d => d.MaPhieuDangKyNavigation).WithMany(p => p.PhieuDangKyMaus).HasConstraintName("Fk_PhieuDangKy_Mau_PhieuDangKy");

            entity.HasOne(d => d.MaTieuChuanNavigation).WithMany(p => p.PhieuDangKyMaus).HasConstraintName("FK_PhieuDangKy_Mau_TieuChuan");

            entity.HasOne(d => d.ManvThucHienNavigation).WithMany(p => p.PhieuDangKyMaus).HasConstraintName("Fk_PhieuDangKy_Mau_NhanVien_ThucHien");
        });

        modelBuilder.Entity<PhieuDangKyMauHinhAnh>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDan__2725BF40655E648D");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.PhieuDangKyMauHinhAnhs).HasConstraintName("Fk_Mau_HinhAnh_Mau");
        });

        modelBuilder.Entity<PhieuDangKyPhuLieuHoaChat>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDan__2725BF40EA7B7BF4");

            entity.HasOne(d => d.MaPlhcNavigation).WithMany(p => p.PhieuDangKyPhuLieuHoaChats).HasConstraintName("FK_PhieuDangKy_PhuLieuHoaChat_Dm_PhuLieu_HoaChat");
        });

        modelBuilder.Entity<PhieuDeXuatMuaPlhc>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF402B722CB2");

            entity.HasOne(d => d.ManvDuyetNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcManvDuyetNavigations).HasConstraintName("Fk_PhieuDeXuatMuaPLHC_NhanVien_TuChoi");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.PhieuDeXuatMuaPlhcManvLapNavigations).HasConstraintName("Fk_PhieuDeXuatMuaPLHC_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuDeXuatPhongBan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDeX__2725BF4038EC5058");

            entity.HasOne(d => d.MaKhoaTiepNhanNavigation).WithMany(p => p.PhieuDeXuatPhongBans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Fk_PhieuDeXuatPhongBan_Khoa_TiepNhan");

            entity.HasOne(d => d.ManvDeXuatNavigation).WithMany(p => p.PhieuDeXuatPhongBanManvDeXuatNavigations).HasConstraintName("Fk_PhieuDeXuatPhongBan_NhanVien_DeXuat");

            entity.HasOne(d => d.ManvTiepNhanNavigation).WithMany(p => p.PhieuDeXuatPhongBanManvTiepNhanNavigations).HasConstraintName("Fk_PhieuDeXuatPhongBan_NhanVien_TiepNhan");
        });

        modelBuilder.Entity<PhieuDuTru>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuDuT__2725BF40C5A4E3AD");

            entity.Property(e => e.Active).HasDefaultValue(true);
            entity.Property(e => e.TrangThai).HasDefaultValue(0);

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_Khoa");

            entity.HasOne(d => d.MaPdkMauNavigation).WithMany(p => p.PhieuDuTrus).HasConstraintName("Fk_PhieuDuTru_PhieuDangKy_Mau");

            entity.HasOne(d => d.ManvDuyetNavigation).WithMany(p => p.PhieuDuTruManvDuyetNavigations).HasConstraintName("fk_PhieuDuTru_NhanVien");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuDuTruManvLapPhieuNavigations).HasConstraintName("Fk_PhieuDuTru_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuLuuMau>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuLuu__2725BF40CC5D3699");

            entity.HasOne(d => d.MaPdkMauNavigation).WithMany(p => p.PhieuLuuMaus).HasConstraintName("Fk_PhieuLuuMau_PhieuDanKy_Mau");

            entity.HasOne(d => d.ManvLuuNavigation).WithMany(p => p.PhieuLuuMaus).HasConstraintName("Fk_PhieuLuuMau_NhanVien_Luu");
        });

        modelBuilder.Entity<PhieuNhapKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuNha__2725BF407C46849A");

            entity.HasOne(d => d.MaHoaDonMuaPlhcNavigation).WithMany(p => p.PhieuNhapKhos).HasConstraintName("Fk_PhieuNhapKho_HoaDonMuaPLHC");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuNhapKhoManvLapPhieuNavigations).HasConstraintName("Fk_PhieuNhapKho_NhanVien_Lap");

            entity.HasOne(d => d.ManvNhapKhoNavigation).WithMany(p => p.PhieuNhapKhoManvNhapKhoNavigations).HasConstraintName("Fk_PhieuNhapKho_NhanVien_Nhap");
        });

        modelBuilder.Entity<PhieuNhapKhoChiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuNha__2725BF4034F8180F");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.PhieuNhapKhoChiTiets).HasConstraintName("Fk_PhieuNhapKhoChiTiet_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaPhieuNhapKhoNavigation).WithMany(p => p.PhieuNhapKhoChiTiets).HasConstraintName("Fk_PhieuNhapKhoChiTiet_PhieuNhapKho");
        });

        modelBuilder.Entity<PhieuPhanTichKetQua>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuPha__2725BF40D3ACB92A");

            entity.Property(e => e.Active).HasDefaultValue(true);

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.PhieuPhanTichKetQuas).HasConstraintName("Fk_PhieuPhanTichKetQua_Khoa");

            entity.HasOne(d => d.MaPdkMauNavigation).WithMany(p => p.PhieuPhanTichKetQuas).HasConstraintName("Fk_PhieuPhanTichKetQua_PhieuDangKy_Mau");

            entity.HasOne(d => d.MabldDuyetNavigation).WithMany(p => p.PhieuPhanTichKetQuaMabldDuyetNavigations).HasConstraintName("FK_PhieuPhanTichKetQua_NhanVien_BLDDuyet");

            entity.HasOne(d => d.ManvKiemTraNavigation).WithMany(p => p.PhieuPhanTichKetQuaManvKiemTraNavigations).HasConstraintName("Fk_PhieuPhanTichKetQua_NhanVien_KiemTra");

            entity.HasOne(d => d.ManvLapNavigation).WithMany(p => p.PhieuPhanTichKetQuaManvLapNavigations).HasConstraintName("Fk_PhieuPhanTichKetQua_NhanVien_Lap");
        });

        modelBuilder.Entity<PhieuPhanTichKetQuaChiTiet>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("fk_PhieuPhanTichKetQuaChiTiet");

            entity.Property(e => e.Active).HasDefaultValue(true);

            entity.HasOne(d => d.MaChiTieuNavigation).WithMany(p => p.PhieuPhanTichKetQuaChiTiets).HasConstraintName("Fk_PhieuPhanTichKetQuaChiTiet_ChiTieu");

            entity.HasOne(d => d.MaPhieuKetQuaNavigation).WithMany(p => p.PhieuPhanTichKetQuaChiTiets).HasConstraintName("Fk_PhieuPhanTichKetQuaChiTiet_PhieuPhanTichKetQua");
        });

        modelBuilder.Entity<PhieuThu>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuThu__2725BF40C8E34942");

            entity.HasOne(d => d.MaLienKetChungTuNavigation).WithMany(p => p.PhieuThus).HasConstraintName("Fk_PhieuThu_LKCT");

            entity.HasOne(d => d.ManvTaoNavigation).WithMany(p => p.PhieuThus).HasConstraintName("Fk_PhieuThu_NhanVien");
        });

        modelBuilder.Entity<PhieuTienDoLamViec>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuTie__2725BF40619E4D3B");

            entity.HasOne(d => d.MaPdkMauNavigation).WithMany(p => p.PhieuTienDoLamViecs).HasConstraintName("Fk_PhieuTienDoLamViec_PhieuDangKy_Mau");

            entity.HasOne(d => d.ManvKiemTraNavigation).WithMany(p => p.PhieuTienDoLamViecManvKiemTraNavigations).HasConstraintName("Fk_PhieuTienDoLamViec_NhanVien_KiemTra");

            entity.HasOne(d => d.ManvXuLyNavigation).WithMany(p => p.PhieuTienDoLamViecManvXuLyNavigations).HasConstraintName("Fk_PhieuTienDoLamViec_NhanVien_Lam");
        });

        modelBuilder.Entity<PhieuXuatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhieuXua__2725BF40BB97C370");

            entity.HasOne(d => d.MaPhieuDuTruNavigation).WithMany(p => p.PhieuXuatKhos).HasConstraintName("Fk_PhieuThu_NhanVien_PhieuDuTru");

            entity.HasOne(d => d.ManvGiaoVatTuNavigation).WithMany(p => p.PhieuXuatKhoManvGiaoVatTuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Xuat");

            entity.HasOne(d => d.ManvLapPhieuNavigation).WithMany(p => p.PhieuXuatKhoManvLapPhieuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Lap");

            entity.HasOne(d => d.ManvNhanVatTuNavigation).WithMany(p => p.PhieuXuatKhoManvNhanVatTuNavigations).HasConstraintName("Fk_PhieuThu_NhanVien_Nhan");
        });

        modelBuilder.Entity<PhuLieuHoaChatKho>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhuLieu___2725BF403457E6F2");

            entity.HasOne(d => d.MaDmPlhcNavigation).WithMany(p => p.PhuLieuHoaChatKhos).HasConstraintName("Fk_PhuLieu_HoaChat_Kho_Dm_PhuLieu_HoaChat");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.PhuLieuHoaChatKhos).HasConstraintName("Fk_PhuLieu_HoaChat_NhaCungCap");
        });

        modelBuilder.Entity<PhuongPhap>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__PhuongPh__2725BF406DEAB2AE");
        });

        modelBuilder.Entity<ThongBaoChoKhachHang>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF4016E7790A");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.ThongBaoChoKhachHangs).HasConstraintName("Fk_ThongBaoChoKhachHang_KhachHang");

            entity.HasOne(d => d.ManvGuiNavigation).WithMany(p => p.ThongBaoChoKhachHangs).HasConstraintName("Fk_ThongBaoChoKhachHang_NhanVien");
        });

        modelBuilder.Entity<ThongBaoChoTrungTam>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40CDF48EFE");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.ThongBaoChoTrungTams).HasConstraintName("Fk_ThongBaoChoTrungTam_KhachHang");
        });

        modelBuilder.Entity<ThongBaoChoTrungTamNhan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF405D8DFB1A");

            entity.HasOne(d => d.NhanVien).WithMany(p => p.ThongBaoChoTrungTamNhans).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhan_NhanVien");

            entity.HasOne(d => d.ThongBao).WithMany(p => p.ThongBaoChoTrungTamNhans).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhan_ThongBaoChoTrungTam");
        });

        modelBuilder.Entity<ThongBaoChoTrungTamNhom>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF402A6B463E");

            entity.HasOne(d => d.ThongBao).WithMany(p => p.ThongBaoChoTrungTamNhoms).HasConstraintName("Fk_ThongBaoChoTrungTam_Nhom_ThongBaoChoTrungTam");
        });

        modelBuilder.Entity<ThongBaoNoiBo>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40F0C2CCDC");

            entity.HasOne(d => d.ManvGuiNavigation).WithMany(p => p.ThongBaoNoiBos).HasConstraintName("Fk_ThongBaoNoiBo_NhanVien_Gui");
        });

        modelBuilder.Entity<ThongBaoNoiBoNhan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF401EBC2BF5");

            entity.HasOne(d => d.NhanVien).WithMany(p => p.ThongBaoNoiBoNhans).HasConstraintName("Fk_ThongBaoNoiBo_Nhan_NhanVien");

            entity.HasOne(d => d.ThongBaoNoiBo).WithMany(p => p.ThongBaoNoiBoNhans).HasConstraintName("Fk_ThongBaoNoiBo_Nhan_ThongBaoNoiBo");
        });

        modelBuilder.Entity<ThongBaoNoiBoNhom>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__ThongBao__2725BF40266AF9A4");

            entity.HasOne(d => d.ThongBaoNoiBo).WithMany(p => p.ThongBaoNoiBoNhoms).HasConstraintName("Fk_ThongBao_Nhom_ThongBaoNoiBo");
        });

        modelBuilder.Entity<TieuChuan>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TieuChua__2725BF407866DA4B");
        });

        modelBuilder.Entity<TrangThaiPhieuDk>(entity =>
        {
            entity.HasKey(e => e.MaId).HasName("PK__TrangTha__2725BF4048F83181");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
