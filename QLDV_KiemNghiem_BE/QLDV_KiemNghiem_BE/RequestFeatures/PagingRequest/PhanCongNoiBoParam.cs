namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhanCongNoiBoParam : RequestParameters
    {
        public string? ManvPhanCong { get; set; } = string.Empty;
        public string? ManvXuLy { get; set; } = string.Empty;
        public string? TrangThai { get; set; } = string.Empty;
        public string? NgayTraKetQuaFrom { get; set; } = string.Empty;
        public string? NgayTraKetQuaTo { get; set; } = string.Empty;
        public string? MaKhoa { get; set; } = string.Empty;
    }
}
