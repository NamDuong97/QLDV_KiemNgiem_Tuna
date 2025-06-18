using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Data
{
    public partial class DataContext
    {
        public DbSet<NhanVienProcedure> NhanVienProcedures { get; set; }
        public DbSet<ThoiGianTieuChuan> ThoiGianTieuChuans { get; set; }
        public DbSet<ThanhTienTungMau> ThanhTienTungMaus { get; set; }
        public DbSet<UserIdNhanVien> UserIdNhanViens { get; set; }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NhanVienProcedure>().HasNoKey();
            modelBuilder.Entity<ThoiGianTieuChuan>().HasNoKey();
            modelBuilder.Entity<ThanhTienTungMau>().HasNoKey();
            modelBuilder.Entity<UserIdNhanVien>().HasNoKey();
        }
    }

}

// Đây là phần mở rộng của DbContext lưu lại những DbSet người dùng tự thêm, để tránh bị mất khi thực hiện scanfold