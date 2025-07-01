import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import { typeConformationColor } from "../../../../../constants/typeConfirmation";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { getRoleGroup } from "../../../../../configs/Role";
import { role } from "../../../../../configs/parseJwt";
import { typeConfirmation } from "../../../PhanTichKetQua/ShowDetailChoDuyet";
import { duyetDuTru } from "../../../../../hooks/personnels/queryDuTru";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: any;
  message?: any;
  type?: any;
  dataID: any;
  typeConform: string;
}

const FormLyDoTuChoi = (props: Props) => {
  const { isOpen, onClose, title, message, type, dataID, typeConform } = props;

  const tyleConfirmationModal = typeConformationColor[type];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      note: "",
    },
  });

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["DuTruByID"],
        }),
        queryClient.refetchQueries({
          queryKey: ["queryDuTruAll"],
        }),
      ]);
      handleClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = duyetDuTru({
    queryKey: "duyetDuTru",
    onSuccess: (data: any) => {
      if (data.status === 200) {
        showNotification({
          message: `${
            typeConform === typeConfirmation.TuChoi ? "Từ chối" : "Duyệt phiếu"
          } thành công`,
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: `${
            typeConform === typeConfirmation.TuChoi ? "Từ chối" : "Duyệt phiếu"
          } thất bại`,
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);
      showNotification({
        message: `${
          typeConform === typeConfirmation.TuChoi ? "Từ chối" : "Duyệt phiếu"
        } thất bại`,
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: { note: string }) => {
    if (typeConform === typeConfirmation.TuChoi) {
      const params = {
        maPhieuDuTru: dataID,
        message: data.note,
        action: false,
      };
      mutate(params);
      console.log("params từ chối", params);
    } else {
      const params = {
        maPhieuDuTru: dataID,
        message: data.note,
        action: true,
      };
      mutate(params);
      console.log("params duyệt", params);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      sx={{ ".MuiPaper-root": { borderRadius: 4 } }}
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <button
                type="button"
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
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-12 h-12 rounded-full ${tyleConfirmationModal.bgIconColor} flex items-center justify-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${tyleConfirmationModal.textIconColor}`}
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
            <h4 className="text-center text-lg font-medium text-gray-800 mb-2">
              {message}
            </h4>
            <p className="text-center text-gray-500 text-sm mb-4">
              Hành động này không thể hoàn tác.
            </p>

            <textarea
              {...register("note", { required: "Vui lòng nhập lý do" })}
              rows={3}
              placeholder="Nhập lý do..."
              className={`w-full border rounded-md p-2 max-h-32 min-h-32 text-sm focus:outline-none focus:ring-2 ${
                errors.note
                  ? "border-blue-500 focus:ring-blue-300"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.note && (
              <p className="text-xs text-red-600 mt-1">{errors.note.message}</p>
            )}

            <div className="flex justify-center space-x-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${tyleConfirmationModal.textColor} ${tyleConfirmationModal.bgColor} rounded-lg hover:${tyleConfirmationModal.hoverTextColor} transition-colors cursor-pointer`}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default FormLyDoTuChoi;
