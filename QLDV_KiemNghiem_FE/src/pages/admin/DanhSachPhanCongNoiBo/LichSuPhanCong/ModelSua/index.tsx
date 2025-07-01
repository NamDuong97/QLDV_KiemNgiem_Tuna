import { Dialog } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  // dataID: any;
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

const ModelSua = (props: Props) => {
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
              Sửa phân công
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
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800 text-lg">Mẫu A</h4>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Thời gian phân công *
            </label>
            <input
              type="date"
              //   {...register("thoiGianLuu")}
              className="w-full py-1 px-4 border border-gray-300 rounded"
            />
            {/* {errors.thoiGianLuu && (
              <p className="text-xs text-red-600">
                {errors.thoiGianLuu.message}
              </p>
            )} */}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Thời gian thực hiện *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                // {...register("luuDenNgay")}
                className="w-full py-1 px-4 border border-gray-300 rounded"
              />
              <span> - </span>
              <input
                type="date"
                // {...register("luuDenNgay")}
                className="w-full py-1 px-4 border border-gray-300 rounded"
              />
            </div>
            {/* {errors.luuDenNgay && (
              <p className="text-xs text-red-600">
                {errors.luuDenNgay.message}
              </p>
            )} */}
            {/* {errors.luuDenNgay && (
              <p className="text-xs text-red-600">
                {errors.luuDenNgay.message}
              </p>
            )} */}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModelSua;
