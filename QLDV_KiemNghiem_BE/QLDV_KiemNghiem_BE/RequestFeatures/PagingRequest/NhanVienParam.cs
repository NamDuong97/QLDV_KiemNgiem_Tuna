namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class NhanVienParam : RequestParameters
    {
        public string HoTen {  get; set; }  = string.Empty; 
        public string MaKhoa {  get; set; } = string.Empty;
        public string MaBoPhan {  get; set; } = string.Empty;   
        public string MaChucVu {  get; set; } = string.Empty;   
        public bool TrangThai { get; set; } = true;
    }
}

// Kế thừa những thuộc tính để phân trang từ RequestParameters, đồng thời có thêm các thuộc tính để lọc NhanVien

