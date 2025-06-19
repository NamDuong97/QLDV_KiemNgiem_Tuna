import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { MauPhanCong } from "../../../../models/mau";
import yup from "../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { queryClient } from "../../../../lib/reactQuery";
import { createPhieuPhanCongKhoa } from "../../../../hooks/personnels/phanCongKhoa";

interface Props {
  samples: MauPhanCong[];
  isOpen: boolean;
  onClose: () => void;
  selectedSamples: any;
  departments: any;
  setSamples: React.Dispatch<React.SetStateAction<MauPhanCong[]>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormPhanCong {
  ghiChu: {
    [tenMau: string]: string;
  };
}

const AssignmentModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    selectedSamples,
    departments,
    samples,
    setSamples,
    setSuccessMessage,
    setShowSuccessMessage,
  } = props;
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Handle department selection
  const handleDepartmentSelect = (departmentId: any) => {
    setSelectedDepartment(departmentId);
  };

  const shema = yup.object().shape({
    ghiChu: yup.object(),
  });

  const { reset, register, handleSubmit } = useForm({
    resolver: yupResolver<FormPhanCong>(shema),
  });

  const handleSettled = async () => {
    await queryClient.refetchQueries({ queryKey: ["ChitietPhieuDKKM"] });
  };

  const { mutate } = createPhieuPhanCongKhoa({
    queryKey: "createPhieuPhanCongKhoa",
    onSettled: handleSettled,
  });

  const handleAssignSubmit = (data: FormPhanCong) => {
    if (!selectedDepartment || selectedSamples.length === 0) {
      return;
    }

    const department = departments.find(
      (dept: any) => dept.id === selectedDepartment
    );
    console.log("department", department);

    const maus = selectedSamples?.map((sample: any) => ({
      tenMau: sample.tenMau,
      ghiChu: data.ghiChu?.[sample.tenMau] || "",
    }));
    const phanCong = {
      tenKH: "",
      maKhoa: selectedDepartment,
      maNVDeXuat: "",
      maNVTiepNhan: "",
      thoiGianGiaoMau: "",
      thoiGianThucHien: "",
      maus,
    };
    console.log("phanCong", phanCong);

    const updatedSamples = samples.map((sample: MauPhanCong) => {
      if (selectedSamples.includes(sample.maId as string)) {
        return {
          ...sample,
          assignedDepartment: department,
          status: "Đã phân công",
        };
      }
      return sample;
    });
    // console.log("updatedSamples", updatedSamples);

    // setSamples(updatedSamples);
    // setSuccessMessage(
    //   `Đã phân công ${selectedSamples.length} mẫu cho ${department.name}`
    // );

    // setShowSuccessMessage(true);
    // onClose();

    // // Hide success message after 3 seconds
    // setTimeout(() => {
    //   setShowSuccessMessage(false);
    // }, 3000);
  };

  useEffect(() => {
    reset({
      ghiChu: {},
    });
  }, []);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xl">
      <form
        onSubmit={handleSubmit(handleAssignSubmit)}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">
            Phân công mẫu cho phòng ban
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
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
        <div className="flex-grow overflow-y-auto p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Đã chọn {selectedSamples?.length} mẫu
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <ul className="list-disc pl-5 space-y-1">
                {selectedSamples?.map((sample: any) => (
                  <li key={sample.maId} className="text-sm text-gray-600">
                    <p>
                      {sample.tenMau}
                      <span className="text-gray-400">({sample.soLo})</span>
                    </p>
                    <div>
                      <textarea
                        placeholder="Ghi chú..."
                        {...register(`ghiChu.${sample.tenMau}` as const)}
                        className="border border-gray-200 p-2 rounded w-full max-h-20 min-h-20 focus-within:outline-1 focus-within:border focus-within:!border-blue-500"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Chọn phòng ban
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((department: any) => (
                <div
                  key={department.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    department.color
                  } ${
                    selectedDepartment === department.id
                      ? "ring-2 ring-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleDepartmentSelect(department.id)}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{department.name}</h5>
                    {selectedDepartment === department.id && (
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
                  <p className="text-sm mt-1">{department.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Hủy
          </button>
          <button
            disabled={!selectedDepartment || selectedSamples.length === 0}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              !selectedDepartment || selectedSamples.length === 0
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Phân công
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignmentModal;
