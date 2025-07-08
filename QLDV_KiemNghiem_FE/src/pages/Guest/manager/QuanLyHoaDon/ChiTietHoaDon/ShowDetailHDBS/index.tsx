import { Dialog } from "@mui/material";
import { MdOutlineReceipt } from "react-icons/md";
interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
}

const ShowDetailHDBS = (props: Props) => {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
              Chi tiết hóa đơn bổ sung
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
        <div className="space-y-4 py-2 px-4">
          <div className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MdOutlineReceipt className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cam thảo</h3>
                </div>
              </div>
              <div>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800`}
                >
                  Đã thanh toán
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Số lượng</p>
                <p className="font-medium">1 lọ</p>
              </div>
              <div>
                <p className="text-gray-600">Đơn giá</p>
                <p className="font-medium">99000.00</p>
              </div>
              <div>
                <p className="text-gray-600">Thành tiền</p>
                <p className="font-semibold text-lg text-red-600">99000.00</p>
              </div>
            </div>
          </div>
          <div className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MdOutlineReceipt className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cam thảo</h3>
                </div>
              </div>
              <div>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800`}
                >
                  Đã thanh toán
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Số lượng</p>
                <p className="font-medium">1 lọ</p>
              </div>
              <div>
                <p className="text-gray-600">Đơn giá</p>
                <p className="font-medium">99000.00</p>
              </div>
              <div>
                <p className="text-gray-600">Thành tiền</p>
                <p className="font-semibold text-lg text-red-600">99000.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6 border-t border-gray-300">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ShowDetailHDBS;
