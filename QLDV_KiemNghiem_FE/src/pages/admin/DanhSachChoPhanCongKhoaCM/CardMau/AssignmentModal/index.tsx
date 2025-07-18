import { Dialog } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { MauPhanCong } from "../../../../../models/mau";
import yup from "../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { maNhanVien } from "../../../../../configs/parseJwt";
import { createPhieuPhanCongKhoa } from "../../../../../hooks/personnels/phanCongKhoa";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { KhoaKiemNghiem } from "../../../../../constants/khoa";

interface Props {
  samples: MauPhanCong[];
  isOpen: boolean;
  onClose: () => void;
  selectedSamples: any;
  departments: any;
  setSamples: React.Dispatch<React.SetStateAction<MauPhanCong[]>>;
  handleSelectedSamples: () => void;
}
interface FormPhanCong {
  ghiChu: {
    [tenMau: string]: {
      noiDung: string;
      ngayThucHienKiemNghiem: string;
    };
  };
  thoiGianGiaoMau: string;
}

const AssignmentModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    selectedSamples,
    departments,
    handleSelectedSamples,
  } = props;
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [timeGiaoMau, setTimeGiaoMau] = useState<any>(null);

  // Handle department selection
  const handleDepartmentSelect = (departmentId: any) => {
    setSelectedDepartment(departmentId);
  };

  const sampleList = selectedSamples?.map((sample: any) => sample.tenMau);

  const buildGhiChuSchema = (
    listTenMau: string[],
    thoiGianGiaoMau?: string
  ) => {
    const shape: Record<string, yup.ObjectSchema<any>> = {};
    listTenMau?.forEach((tenMau) => {
      shape[tenMau] = yup.object().shape({
        noiDung: yup.string().required(`Nhập ghi chú cho ${tenMau}`),
        ngayThucHienKiemNghiem: yup
          .string()
          .required(`Chọn ngày cho ${tenMau}`)
          .test(
            "is-date",
            "Yêu cầu chọn ngày thực hiện",
            (value) => !isNaN(Date.parse(value || ""))
          )
          .test(
            "is-after-giao-mau",
            "Thời gian thực hiện phải tính từ thời gian giao mẫu trở đi",
            function (value) {
              if (!value || !thoiGianGiaoMau) return true;
              const thucHien = new Date(value);
              const giaoMau = new Date(thoiGianGiaoMau);

              thucHien.setHours(0, 0, 0, 0);
              giaoMau.setHours(0, 0, 0, 0);

              return thucHien.getTime() >= giaoMau.getTime();
            }
          ),
      });
    });
    return yup.object().shape(shape);
  };
  const shema = useMemo(() => {
    return yup.object().shape({
      thoiGianGiaoMau: yup
        .string()
        .required("Yêu cầu chọn Thời Gian Giao Mẫu")
        .test(
          "Thời gian giao mẫu phải từ thời điểm hiện tại trở đi",
          "Thời gian giao mẫu phải từ thời điểm hiện tại trở đi",
          (value) => {
            if (!value) return false;
            const now = new Date();
            const inputDate = new Date(value);
            // Xóa thời gian để chỉ so sánh theo ngày
            now.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);
            return now <= inputDate;
          }
        ),
      ghiChu: buildGhiChuSchema(sampleList, timeGiaoMau || undefined),
    });
  }, [timeGiaoMau, sampleList]);

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FormPhanCong>(shema),
  });

  const thoiGianGiaoMau = useWatch({ control, name: "thoiGianGiaoMau" });

  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const handleSettled = async () => {
    await queryClient.refetchQueries({ queryKey: ["AllDanhSachMau"] });
  };

  const { mutate } = createPhieuPhanCongKhoa({
    queryKey: "createPhieuPhanCongKhoa",
    onSuccess: (res: any) => {
      const { status, response } = res;
      if (status !== 200) {
        showNotification({
          message:
            response?.data?.message ||
            "Phân công mẫu cho phòng ban thất bại. Vui lòng thử lại.",
          status: status,
        });
        return;
      }
      showNotification({
        message: "Phân công mẫu cho phòng ban thành công",
        status: 200,
      });
      handleSelectedSamples();
      onClose();
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        "Phân công mẫu cho phòng ban thất bại. Vui lòng thử lại.";
      showNotification({ message: msg, status: err?.response?.status || 500 });
    },
    onSettled: handleSettled,
  });

  const handleAssignSubmit = (data: FormPhanCong) => {
    const chiTietPhieuDeXuatPhongBans = selectedSamples?.map((sample: any) => ({
      maPdkMau: sample.maId,
      ghiChu: data.ghiChu?.[sample.tenMau]?.noiDung || "",
      ngayThucHienKiemNghiem:
        data.ghiChu?.[sample.tenMau]?.ngayThucHienKiemNghiem || "",
      maPhieuDeXuat: "",
    }));
    const phanCong = {
      maKhoaTiepNhan: selectedDepartment,
      maNVDeXuat: maNhanVien,
      thoiGianGiaoMau: data.thoiGianGiaoMau,
      chiTietPhieuDeXuatPhongBans,
    };
    mutate(phanCong);
  };

  useEffect(() => {
    reset({
      ghiChu: {},
      thoiGianGiaoMau: "",
    });
  }, []);

  useEffect(() => {
    setTimeGiaoMau(thoiGianGiaoMau);
  }, [thoiGianGiaoMau]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <form
        onSubmit={handleSubmit(handleAssignSubmit)}
        className="bg-white rounded-lg shadow-xl"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">
            Phân công mẫu cho phòng ban
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
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
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="flex space-x-2 items-center">
            <label className="text-base font-medium text-gray-700">
              Chọn thời gian giao mẫu *
            </label>
            <input
              type="date"
              {...register("thoiGianGiaoMau")}
              className="cursor-pointer py-1 px-4 border border-gray-300 rounded"
            />
            {errors.thoiGianGiaoMau?.message && (
              <p className="text-sm/4 font-medium text-red-600">
                {errors.thoiGianGiaoMau?.message}
              </p>
            )}
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-700 mb-2">
              Đã chọn {selectedSamples?.length} mẫu
            </h4>

            <ul className="space-y-4 overflow-y-auto max-h-[300px]">
              {selectedSamples?.map((sample: any) => (
                <li
                  key={sample.maId}
                  className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg"
                >
                  <p className="text-gray-700">
                    Tên mẫu:{" "}
                    <span className="text-violet-500">
                      {sample.tenMau}({sample.soLo})
                    </span>
                  </p>
                  <div>
                    <div className="mb-4">
                      <textarea
                        placeholder="Ghi chú..."
                        {...register(
                          `ghiChu.${sample.tenMau}.noiDung` as const
                        )}
                        className="border border-gray-200 p-2 rounded w-full max-h-20 min-h-20 focus-within:outline-1 focus-within:border focus-within:!border-blue-500"
                      />
                      {errors?.ghiChu?.[sample.tenMau]?.noiDung && (
                        <p className="text-xs/4 font-medium text-red-600 mt-1">
                          {errors.ghiChu[sample.tenMau]?.noiDung?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <div className="flex space-x-2 items-center">
                        <label className="text-sm font-medium text-gray-700">
                          Chọn thời gian thực hiện *
                        </label>
                        <input
                          type="date"
                          {...register(
                            `ghiChu.${sample.tenMau}.ngayThucHienKiemNghiem`
                          )}
                          className="cursor-pointer py-1 px-4 border border-gray-300 rounded"
                        />
                      </div>
                      {errors?.ghiChu?.[sample.tenMau]
                        ?.ngayThucHienKiemNghiem && (
                        <p className="text-xs/4 font-medium text-red-600 mt-1">
                          {
                            errors.ghiChu[sample.tenMau]?.ngayThucHienKiemNghiem
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Chọn phòng ban *
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {departments
                ?.filter((item: any) => KhoaKiemNghiem.includes(item?.id))
                .map((department: any) => (
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
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
