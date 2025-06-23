namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhieuDangKyParam : RequestParameters
    {
        public string MaKH { get; set; } = string.Empty;
        public string MaTrangThaiID { get; set; } = string.Empty;
        public string TimeFrom { get; set; } = string.Empty;
        public string TimeTo { get; set; } = string.Empty;
        public string ManvDuyet { get; set; } = string.Empty;
        public string MaBldDuyet { get; set; } = string.Empty;
    }
}
