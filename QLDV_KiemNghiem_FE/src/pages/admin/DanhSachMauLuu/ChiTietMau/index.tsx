import { Dialog, Skeleton } from "@mui/material";
import { getMauLuuByID } from "../../../../hooks/personnels/queryMauLuu";
import { formatDate } from "../../../../configs/configAll";
import { getInforNhanVien } from "../../../../hooks/personnels/access/useAccess";
import ImageGallery from "../../../../components/ImageGallery";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ChiTietMau = (props: Props) => {
  const { open, handleClose } = props;
  const dataSession = sessionStorage.getItem("chi-tiet-mau");
  const id = dataSession ? JSON.parse(dataSession) : "";

  const { data, isLoading } = getMauLuuByID({
    queryKey: "getMauLuuByID",
    params: id,
  });

  const { data: dataNhanVien } = getInforNhanVien({
    queryKey: "getInforNhanVien",
    params: data?.manvLuu,
  });

  const handleClosePopup = () => {
    sessionStorage.removeItem("chi-tiet-mau");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={handleClosePopup}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <div className="bg-white w-2xl">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Chi tiết mẫu</h3>
          <button
            id="closeViewModal"
            onClick={handleClosePopup}
            className="text-gray-400 hover:text-gray-500 cursor-pointer p-1 hover:bg-gray-300 rounded-full"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">
              Mẫu kiểm tra chất lượng thuốc B
            </h4>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Mẫu #1
              </span>
              Đã duyệt
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            <div>
              <p className="text-xs text-gray-500">Tiêu chuẩn</p>
              <p className="text-sm">f75f70d2-08bc-4b9a-af9d-cfa6b7bc1987</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Dịch vụ</p>
              <p className="text-sm">DVG03-90</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số lô</p>
              <p className="text-sm">GDFGDFgGDF</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ngày sản xuất</p>
              <p className="text-sm">2025-06-26</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Thời gian hoàn thành</p>
              <p className="text-sm">64 ngày</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ngày dự kiến trả kết quả</p>
              <p className="text-sm">26/6/2025</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Hạn sử dụng</p>
              <p className="text-sm">12/7/2025</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số lượng</p>
              <p className="text-sm">2 %</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Điều kiện bảo quản</p>
              <p className="text-sm">bảo quànge</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Đơn vị sản xuất</p>
              <p className="text-sm">GDFGDFg</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tình trạng mẫu</p>
              <p className="text-sm">gdfg</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Lưu mẫu</p>
              <p className="text-sm">Mẫu không lưu lại</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Xuất kết quả</p>
              <p className="text-sm">Xuất ra kết quả</p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Yêu cầu kiểm nghiệm</p>
            <p className="text-sm p-2 bg-blue-50 rounded">
              dfgdfgdf
            </p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Ghi chú khách hàng</p>
            <p className="text-sm p-2 bg-blue-50 rounded">gdfgdf</p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Ghi chú</p>
            <p className="text-sm p-2 bg-blue-50 rounded">jh</p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Ảnh mẫu</p>
            <ImageGallery
              images={[]}
              // onImageClick={onImageClick}
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleClosePopup}
            className="cursor-pointer px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
          >
            Đóng
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChiTietMau;
