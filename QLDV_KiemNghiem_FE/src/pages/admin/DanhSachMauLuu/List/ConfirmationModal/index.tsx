import { Dialog } from "@mui/material";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { deleteMauLuu } from "../../../../../hooks/personnels/queryMauLuu";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dataId: any;
  trangThai: any;
}

const ConfirmationModal = (props: Props) => {
  const { isOpen, onClose, dataId, trangThai } = props;
  console.log("dataId", dataId, trangThai);

  const handleSettled = async (response: any) => {
    if (response?.status === 204) {
      await queryClient.refetchQueries({
        queryKey: ["queryMauLuuAll"],
      });
      onClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = deleteMauLuu({
    queryKey: "deleteMauLuu",
    onSuccess: (data: any) => {
      console.log("data", data);

      if (data.status === 204) {
        showNotification({
          message: "Xóa thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Xóa thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Xóa thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handleXoaCung = () => {
    const params = {
      maPhieuLuuMau: dataId,
      isDel: true,
    };
    mutate(params);
  };

  const handleXoaMem = () => {
    const params = {
      maPhieuLuuMau: dataId,
      isDel: false,
    };
    mutate(params);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
      fullWidth
    >
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Xác nhận xóa
            </h3>
            <button
              onClick={onClose}
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
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-12 h-12 rounded-full bg-red-100 flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 text-red-600`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-center text-gray-500 text-lg mb-6 grid">
            Hành động này không thể hoàn tác.
            <span className="text-sm">
              Xóa vĩnh viễn sẽ xóa khỏi dữ liệu đã lưu trước đó.
            </span>
            {trangThai !== "no active" && (
              <span className="text-sm">
                Xóa sẽ thay đổi trạng thái của phiếu.
              </span>
            )}
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleXoaCung}
              className={`px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer`}
            >
              Xóa vĩnh viễn
            </button>
            {trangThai !== "no active" && (
              <button
                onClick={handleXoaMem}
                className={`px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer`}
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
