import { Dialog } from "@mui/material";
import { dsMauDaPhanCong } from "..";
import { formatDateNotTime } from "../../../../../configs/configAll";
import { queryPhanCongNoiBoByID } from "../../../../../hooks/personnels/queryPhanCongNoiBo";

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

  console.log("data", data);

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
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                fsdfsdf
              </span>
              <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                fsdfsdf
              </span>
            </div>
            <h4 className="font-medium text-gray-800 text-lg mb-3">sdfsdf</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
              <div>
                <p className="text-xs text-gray-500">Tiêu chuẩn áp dụng</p>
                <p className="text-sm font-medium text-gray-700">sfdsd</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dịch vụ kiểm nghiệm</p>
                <p className="text-sm font-medium text-gray-700">sdfsd</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Số lô</p>
                <p className="text-sm font-medium text-gray-700">sdfsdf</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Số lượng</p>
                <p className="text-sm font-medium text-gray-700">sdfsdf</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 mb-2">Phân công cho</p>
            <div className="flex items-center">
              <div
                className={`avatar w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium`}
              >
                C
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">
                  Nguyễn C
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Ngày phân công</p>
              <p className="text-sm font-medium text-gray-800">
               fdfd
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Hạn sử dụng mẫu</p>
              <p className="text-sm font-medium text-gray-800">
              dfdf
              </p>
            </div>
          </div>
          {/* $
          {assignment.notes
            ? `
                            <div className="mb-6">
                                <p className="text-xs text-gray-500 mb-1">Ghi chú</p>
                                <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4">${assignment.notes}</p>
                            </div>
                        `
            : ""} */}
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
