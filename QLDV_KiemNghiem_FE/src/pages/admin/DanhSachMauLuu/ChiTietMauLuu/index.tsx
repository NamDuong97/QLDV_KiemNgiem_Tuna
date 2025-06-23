import { Box, Dialog, Skeleton } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ChiTietMauLuu = (props: Props) => {
  const { open, handleClose } = props;
  // const dataSession = sessionStorage.getItem("phieu-xem-chi-tiet");
  // const id = dataSession ? JSON.parse(dataSession) : "";

  // const { data, isLoading } = xemChitietPhieuDKKM({
  //   queryKey: "xemChitietPhieuDKKM",
  //   params: id,
  // });

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <div className="bg-white max-w-lg w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Chi tiết mẫu lưu
          </h3>
          <button
            id="closeViewModal"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Tên mẫu
              </h4>
              <p id="viewSampleName" className="text-sm text-gray-900">
                Mẫu nước uống đóng chai
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Số lô</h4>
              <p id="viewLotNumber" className="text-sm text-gray-900">
                LO-12345
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Khối lượng mẫu lưu
              </h4>
              <p id="viewSampleWeight" className="text-sm text-gray-900">
                2 chai
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Thời gian lưu
              </h4>
              <p id="viewExpiryDate" className="text-sm text-gray-900">
                10/05/2024
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Lưu đến ngày
              </h4>
              <p id="viewExpiryDate" className="text-sm text-gray-900">
                12/05/2024
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Điều kiện bảo quản
              </h4>
              <p id="viewStorageCondition" className="text-sm text-gray-900">
                Nhiệt độ phòng, tránh ánh nắng trực tiếp
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Tên người lưu mẫu
              </h4>
              <p id="viewPersonName" className="text-sm text-gray-900">
                Nguyễn Văn A
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleClose}
            className="cursor-pointer px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
          >
            Đóng
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChiTietMauLuu;
