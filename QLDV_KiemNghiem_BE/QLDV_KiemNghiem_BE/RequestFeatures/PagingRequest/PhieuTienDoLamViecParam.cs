namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhieuTienDoLamViecParam : RequestParameters
    {
        public string? MaKhoa { get; set; }
        public string? ManvXuLy { get; set; }
        public string? TenGiaiDoanThucHien { get; set; }
        public string? ManvKiemTra { get; set; }
        public string? NgayTraKetQuaFrom { get; set; }
        public string? NgayTraKetQuaTo { get; set; }
        public bool? TrangThai { get; set; } = true;
    }
}
