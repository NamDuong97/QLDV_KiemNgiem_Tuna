﻿using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Data
{
    public partial class DataContext
    {
        public virtual DbSet<NhanVienProcedure> NhanVienProcedures { get; set; }
        public virtual DbSet<ThoiGianTieuChuan> ThoiGianTieuChuans { get; set; }
        public virtual DbSet<ThanhTienTungMau> ThanhTienTungMaus { get; set; }
        public virtual DbSet<UserIdNhanVien> UserIdNhanViens { get; set; }
        public virtual DbSet<CheckAllSamplesApproved_PDXPB> CheckAllSamplesApproved_PDXPBs { get; set; }
        public virtual DbSet<CheckAllSamplesCancel_PDXPB> CheckAllSamplesCancel_PDXPBs { get; set; }
        public virtual DbSet<CheckPhanCongAllMauInPDK> CheckPhanCongAllMauInPDKs { get; set; }
        public virtual DbSet<PhieuDangKyMauProcedure> PhieuDangKyMauProcedures { get; set; }
        public virtual DbSet<PhieuDangKyMauThongKeDto> PhieuDangKyMauThongKeDtos { get; set; }
        public virtual DbSet<PhieuPhanTichKetQuaProcedure> PhieuPhanTichKetQuaProcedures { get; set; }
        public virtual DbSet<PhieuTienDoLamViecProcedure> PhieuTienDoLamViecProcedures { get; set; }
        public virtual DbSet<HoaDonThuBoSungProcedure> HoaDonThuBoSungProcedures { get; set; }
        public virtual DbSet<PhieuDuTruProcedure> PhieuDuTruProcedures { get; set; }
        public virtual DbSet<HoaDonThuProcedure> HoaDonThuProcedures { get; set; }
        public virtual DbSet<ThongKePhieuDangKyProcedure> ThongKePhieuDangKyProcedures { get; set; }
        public virtual DbSet<PhieuDangKyMauThongKeProcedure> PhieuDangKyMauThongKeProcedures { get; set; }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
       
            modelBuilder.Entity<NhanVienProcedure>().HasNoKey();
            modelBuilder.Entity<ThoiGianTieuChuan>().HasNoKey();
            modelBuilder.Entity<ThanhTienTungMau>().HasNoKey();
            modelBuilder.Entity<UserIdNhanVien>().HasNoKey();
            modelBuilder.Entity<CheckAllSamplesApproved_PDXPB>().HasNoKey();
            modelBuilder.Entity<CheckAllSamplesCancel_PDXPB>().HasNoKey();
            modelBuilder.Entity<CheckPhanCongAllMauInPDK>().HasNoKey();
            modelBuilder.Entity<PhieuDangKyMauProcedure>().HasNoKey();
            modelBuilder.Entity<PhieuDangKyMauThongKeDto>().HasNoKey();
            modelBuilder.Entity<PhieuPhanTichKetQuaProcedure>().HasNoKey();
            modelBuilder.Entity<PhieuTienDoLamViecProcedure>().HasNoKey();
            modelBuilder.Entity<HoaDonThuBoSungProcedure>().HasNoKey();
            modelBuilder.Entity<PhieuDuTruProcedure>().HasNoKey();
            modelBuilder.Entity<HoaDonThuProcedure>().HasNoKey();
            modelBuilder.Entity<ThongKePhieuDangKyProcedure>().HasNoKey();
            modelBuilder.Entity<PhieuDangKyMauThongKeProcedure>().HasNoKey();
        }
    }

}

// Đây là phần mở rộng của DbContext lưu lại những DbSet người dùng tự thêm, để tránh bị mất khi thực hiện scanfold
// Tạo các dbset custom để hứng việc gọi thủ tục csdl, phải có virtual nếu k sẽ không thể hứng dc.