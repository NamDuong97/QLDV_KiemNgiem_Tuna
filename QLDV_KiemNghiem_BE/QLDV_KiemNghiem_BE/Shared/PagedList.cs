namespace QLDV_KiemNghiem_BE.Shared
{
    public class PagedList<T> : List<T>
    {
        public Pagination Pagination { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize, int totalPages)
        {
            Pagination = new Pagination
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber > totalPages ? totalPages : pageNumber,
                TotalPages = totalPages,
            };

            AddRange(items);
        }

        public static PagedList<T> ToPagedList(IEnumerable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var toTalPages = (int)Math.Ceiling(count / (double)pageSize);
            // Nếu pageNumber mà ng dùng gọi lớn hơn số page mà kết quả trả về thì sẽ lấy page cuối cùng trả ra kết quả
            var items = pageNumber > toTalPages ? source.Skip((toTalPages - 1) * pageSize).Take(pageSize).ToList() :
                source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new PagedList<T>(items, count, pageNumber, pageSize, toTalPages);
        }
    }
}
// Form chung xử lý phân trang cho mọi Entity sử dụng
// Gọi function ToPagedList ở các service để tiến hành phần trang
// Truyền vào dữ liệu từ repo và số trang hiện tại, số phần tử 1 trang > hàm ToPagedList sẽ trả về:
// 1 đối tượng PagedList<T> sau khi đã tính được tổng số trang, rồi list phần tử sau khi phân trang, trang hiện tại, và số pt 1 trang
