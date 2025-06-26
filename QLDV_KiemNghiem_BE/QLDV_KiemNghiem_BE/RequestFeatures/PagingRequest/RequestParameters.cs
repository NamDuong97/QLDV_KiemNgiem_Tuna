namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public abstract class RequestParameters
    { 
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize =3;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
        public bool GetAll { get; set; } = false;
    }
}

// Chứa các thuộc tính phân trang để class khác kế thừa và mở rộng
