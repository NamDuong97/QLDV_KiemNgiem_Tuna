namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhanCongNoiBoParam : RequestParameters
    {
        public string? ManvPhanCong { get; set; }
        public string? ManvXuLy { get; set; }
        public string? TrangThai { get; set; }
        public string? NgayTraKetQuaFrom { get; set; }
        public string? NgayTraKetQuaTo { get; set; }
    }
}
