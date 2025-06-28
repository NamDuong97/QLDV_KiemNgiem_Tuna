import { Dialog, Skeleton } from "@mui/material";
import {
  formatDate,
  formatDateNotTime,
} from "../../../../../configs/configAll";
import { queryPhanCongNoiBoByID } from "../../../../../hooks/personnels/queryPhanCongNoiBo";
import ImageGallery from "../../../../../components/ImageGallery";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
  handleOpenModelSua: (id: string) => void;
}

export const employees = [
  { id: 1, name: "Nguyễn Văn A", avatar: "A", color: "bg-blue-500" },
  { id: 2, name: "Trần Thị B", avatar: "B", color: "bg-green-500" },
  { id: 3, name: "Lê Văn C", avatar: "C", color: "bg-yellow-500" },
  { id: 4, name: "Phạm Thị D", avatar: "D", color: "bg-pink-500" },
  { id: 5, name: "Đặng Văn E", avatar: "E", color: "bg-red-500" },
  { id: 6, name: "Võ Thị F", avatar: "F", color: "bg-purple-500" },
  { id: 7, name: "Hoàng Văn G", avatar: "G", color: "bg-teal-500" },
];

const ModelXemChiTiet = (props: Props) => {
  const { open, handleClose, dataID, handleOpenModelSua } = props;
  const { data, isLoading } = queryPhanCongNoiBoByID({
    queryKey: "queryPhanCongNoiBoByID",
    params: dataID,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Chi tiết phân công
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-gray-500 font-semibold text-sm/6">
              Thông tin phân công
            </h3>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2 mb-4">
              <div>
                <p className="text-xs text-gray-500">Thời gian làm</p>
                {isLoading ? (
                  <Skeleton variant="rounded" width={250} height={20} />
                ) : (
                  <p className="text-sm font-medium text-gray-700">
                    {formatDate(data?.lamTu)} - {formatDate(data?.lamToi)}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500">Thời gian phân công</p>
                <p className="text-sm font-medium text-gray-700">
                  {formatDate(data?.thoiGianPhanCong)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Nhân viên xử lý</p>
                <p className="text-sm font-medium text-gray-700">
                  {data?.manvXyLy}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Nhân viên phân công</p>
                <p className="text-sm font-medium text-gray-700">
                  {data?.tennvPhanCong}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Trạng thái phân công</p>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Đã duyệt
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phân công cho</p>
                <span className="text-sm font-medium text-red-600">
                  Nguyễn thị C
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 font-semibold text-sm/6">
              Thông tin mẫu phân công
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Tên mẫu</p>
              <p className="text-sm">sdfdsf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tiêu chuẩn</p>
              <p className="text-sm">sdfdsf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Dịch vụ</p>
              <p className="text-sm">sdfds</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số lô</p>
              <p className="text-sm">sdf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ngày sản xuất</p>
              <p className="text-sm">sdfsdf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Thời gian hoàn thành</p>
              <p className="text-sm">sdfsd ngày</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ngày dự kiến trả kết quả</p>
              <p className="text-sm">sdfsdfds</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Hạn sử dụng</p>
              <p className="text-sm">sdfsdf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số lượng</p>
              <p className="text-sm">sdfsdf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Điều kiện bảo quản</p>
              <p className="text-sm">sdfsdf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Đơn vị sản xuất</p>
              <p className="text-sm">sdf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tình trạng mẫu</p>
              <p className="text-sm">sdfsdf</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Lưu mẫu</p>
              <p className="text-sm">sdfsdfds</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Xuất kết quả</p>
              <p className="text-sm">sdfsdfd</p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Yêu cầu kiểm nghiệm</p>
            <p className="text-sm p-2 bg-blue-50 rounded">sdfsdfds</p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Ghi chú khách hàng</p>
            <p className="text-sm p-2 bg-blue-50 rounded">sdfsdf</p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Ghi chú</p>
            <p className="text-sm p-2 bg-blue-50 rounded">sdfsdfsd</p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Ảnh mẫu</p>
            <ImageGallery images={[]} />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={() => handleOpenModelSua(dataID)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Sửa
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModelXemChiTiet;
