import { Dialog } from "@mui/material";
import { useState } from "react";
import SelectItemTrangThai from "./SelectItemTrangThai";
import { useHuyMau } from "../../../../../hooks/personnels/queryMau";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { colorPresets } from "..";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}
const AssignmentDeleteModal = (props: Props) => {
  const { isOpen, onClose, data } = props;
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectTrangThai, setSelectTrangThai] = useState(3);

  // Handle Mẫu selection
  const handleDepartmentSelect = (departmentId: any) => {
    setSelectedDepartment(departmentId);
  };

  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const handleSettled = async () => {
    await queryClient.refetchQueries({ queryKey: ["AllDanhSachMau"] });
  };

  const handleClose = () => {
    onClose();
    setSelectedDepartment(null);
  };

  const { mutate } = useHuyMau({
    queryKey: "useHuyMau",
    onSettled: handleSettled,
    onSuccess: (res: any) => {
      const { status, response } = res;
      if (status !== 200) {
        showNotification({
          message:
            response?.data?.message || "Hủy mẫu thất bại. Vui lòng thử lại.",
          status: status,
        });
        return;
      }
      showNotification({ message: "Hủy mẫu thành công", status: 200 });
      handleClose();
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message || "Hủy mẫu thất bại. Vui lòng thử lại.";
      showNotification({ message: msg, status: err?.response?.status || 500 });
    },
  });

  const handleAssignSubmit = () => {
    console.log("data", data);
    const param = {
      maId: selectedDepartment,
      message:
        selectTrangThai === 4
          ? "Khách hàng hủy"
          : "Không có phòng ban nào tiếp nhận",
      typeCancel: selectTrangThai,
    };
    mutate(param);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
      fullWidth
    >
      <form className="bg-white rounded-lg shadow-xl">
        <div className="py-4 pl-6 pr-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">
            Hủy mẫu kiểm nghiệm
          </h3>
          <button
            onClick={handleClose}
            type="button"
            className="text-gray-400 hover:text-gray-500 cursor-pointer rounded-full p-[2px] hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

        {/* Modal content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Chọn mẫu hủy *
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.map((department: any, index: any) => (
                <div
                  key={department.maId}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    colorPresets[index % colorPresets.length]
                  } ${
                    selectedDepartment === department.maId
                      ? "ring-2 ring-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleDepartmentSelect(department.maId)}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{department.tenMau}</h5>
                    {selectedDepartment === department.maId && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Lý do hủy *
            </label>
            <SelectItemTrangThai
              setItem={setSelectTrangThai}
              item={selectTrangThai}
            />
          </div>
        </div>

        {/* Modal footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleAssignSubmit}
            disabled={!selectedDepartment}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${
                !selectedDepartment
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Gửi
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignmentDeleteModal;
