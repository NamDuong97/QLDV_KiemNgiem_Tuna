namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhieuPhanTichKetQuaParam : RequestParameters
    {
        public string? MaId { get; set; } = string.Empty;
        public string? MaKhoa { get; set; } = string.Empty;

        public string? DonViSanXuat { get; set; } = string.Empty;

        public string? ManvLap { get; set; } = string.Empty;

        public string? ManvKiemTra { get; set; } = string.Empty;

        public string? MabldDuyet { get; set; } = string.Empty;

        public string? DonViGuiMau { get; set; } = string.Empty;

        public string? NgayTraKetQuaFrom { get; set; } = string.Empty;
        public string? NgayTraKetQuaTo { get; set; } = string.Empty;
        public string? TrangThai { get; set; } = string.Empty;
        public string? Active { get; set; } = string.Empty;
    }
}
