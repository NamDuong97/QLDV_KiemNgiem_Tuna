namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhieuTienDoLamViecParam : RequestParameters
    {
        public string? MaID { get; set; }
        public string? MaMau { get; set; }
        public string? MaKhoa { get; set; }
        public string? ManvXuLy { get; set; }
        public string? TenGiaiDoanThucHien { get; set; }
        public string? ManvKiemTra { get; set; }
        public string? NgayTraKetQuaFrom { get; set; }
        public string? NgayTraKetQuaTo { get; set; }
        public int? TrangThai { get; set; }
    }
}
