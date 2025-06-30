namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhieuDangKyMauParam : RequestParameters
    {
        public string? MaLoaiMau { get; set; }
        public string? MaKhoa { get; set; }
        public string ? ManvThucHien { get; set; }
        public int TrangThaiPhanCong { get; set; }
        public string ? NgayTraKetQuaFrom {  get; set; }
        public string? NgayTraKetQuaTo { get; set; }

        public bool ? LuuMau {  get; set; } = true;
    }
}
