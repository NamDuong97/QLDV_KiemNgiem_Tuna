import { Dialog } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import classes from "./style.module.scss";
import { queryMauByID } from "../../../../../hooks/personnels/queryMau";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../../hooks/customers/usePhieuDKyDVKN";
import { queryNhanVienALL } from "../../../../../hooks/personnels/queryNhanVien";
import { ListColors } from "../../../../../constants/colors";
import yup from "../../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatDateNotTime } from "../../../../../configs/configAll";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
  maKhoa: any;
  manv: string;
}

interface FormPhanCong {
  manvXyLy?: string | undefined;
  lamTu: Date;
  lamToi: Date;
  thoiGianPhanCong: Date;
}

const ModelPhanCong = (props: Props) => {
  const { open, handleClose, dataID, maKhoa, manv } = props;

  const { data } = queryMauByID({
    queryKey: "mauByID",
    params: dataID,
  });
  const { data: employees } = queryNhanVienALL({
    queryKey: "NhanVienAll",
    params: { getAll: true, maKhoa: maKhoa },
  });

  const sample = data;

  const [NhanVienID, setNhanVienID] = useState("");
  const { data: dataTieuChuan } = useGetTieuChuanAll({
    queryKey: "TieuChuanAll",
  });
  const { data: dataLoaiDV } = useGetLoaiDichVuAll({
    queryKey: "LoaiDichVuAll",
  });
  const dataLDV: any = dataLoaiDV;
  const dataTC: any = dataTieuChuan;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nhanVienSchema = yup.object().shape({
    manvXyLy: yup
      .string()
      .test(
        "required-when-nhanvienid",
        "Vui lòng chọn nhân viên xử lý",
        function (value) {
          if (NhanVienID) {
            return true;
          } else return !!value;
        }
      ),
    lamTu: yup
      .date()
      .typeError("Vui lòng chọn ngày bắt đầu")
      .required("Vui lòng chọn ngày bắt đầu")
      .min(today, "Ngày bắt đầu phải tính từ hôm nay trở đi"),
    lamToi: yup
      .date()
      .typeError("Vui lòng chọn ngày kết thúc")
      .required("Vui lòng chọn ngày kết thúc")
      .min(yup.ref("lamTu"), "Ngày kết thúc phải sau ngày bắt đầu"),
    thoiGianPhanCong: yup
      .date()
      .typeError("Vui lòng chọn thời gian phân công")
      .required("Vui lòng chọn thời gian phân công")
      .min(today, "Thời gian phân công phải tính từ hôm nay trở đi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FormPhanCong>(nhanVienSchema),
    defaultValues: {
      manvXyLy: "",
      lamTu: undefined,
      lamToi: undefined,
      thoiGianPhanCong: undefined,
    },
  });

  const onSubmit = (data: FormPhanCong) => {
    const params = {
      manvXyLy: data.manvXyLy || NhanVienID,
      lamTu: formatDateNotTime(data.lamTu),
      lamToi: formatDateNotTime(data.lamToi),
      thoiGianPhanCong: formatDateNotTime(data.thoiGianPhanCong),
      maPdkMau: sample?.maPdkMau,
      manvPhanCong: manv,
    };
    console.log("Submitted Data:", params);
  };

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
              Phân công mẫu
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">
                    Mã Mẫu:
                  </span>
                  <span className="text-sm font-medium text-indigo-600">
                    {sample?.maPdkMau}
                  </span>
                </div>
                <h4 className="font-medium text-gray-800 text-lg">
                  {sample?.tenMau}
                </h4>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Tiêu chuẩn</p>
              <p className="text-sm font-medium text-gray-700">
                {
                  dataTC?.find((item: any) => item.maId === sample?.maTieuChuan)
                    ?.tenTieuChuan
                }
              </p>
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Dịch vụ kiểm nghiệm</p>
              <p className="text-sm font-medium text-gray-700">
                {
                  dataLDV?.find((item: any) => item.maLoaiDv === sample?.loaiDv)
                    ?.tenDichVu
                }
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn nhân viên phân công
            </label>
            <div
              className={clsx(
                "space-y-2 max-h-40 overflow-y-auto pr-1",
                classes.scrollbar_thin
              )}
            >
              {employees?.length > 0 ? (
                employees?.map((employee: any, index: any) => {
                  const avatarColor = ListColors[index % ListColors.length];

                  return (
                    <div
                      key={index}
                      className={clsx(
                        "flex items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer",
                        {
                          "border-indigo-200 border bg-indigo-50":
                            employee?.maId === NhanVienID,
                        }
                      )}
                      onClick={() => setNhanVienID(employee?.maId)}
                    >
                      <div
                        className={`avatar w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium`}
                      >
                        {employee.hoTen.trim().split(" ").pop()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {employee.hoTen}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  Không tìm thấy nhân viên phù hợp với dịch vụ kiểm nghiệm này
                </div>
              )}
            </div>
            {errors.manvXyLy && (
              <p className="text-xs text-red-600 mt-1">
                {errors.manvXyLy.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Thời gian phân công *
            </label>
            <input
              type="date"
              {...register("thoiGianPhanCong")}
              className="w-full py-1 px-4 border border-gray-300 rounded"
            />
            {errors.thoiGianPhanCong?.message && (
              <p className="text-xs text-red-600">
                {errors.thoiGianPhanCong.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Thời gian thực hiện *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                {...register("lamTu")}
                className="w-full py-1 px-4 border border-gray-300 rounded"
              />
              <span> - </span>
              <input
                type="date"
                {...register("lamToi")}
                className="w-full py-1 px-4 border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {errors.lamTu && (
                  <p className="text-xs text-red-600">{errors.lamTu.message}</p>
                )}
              </div>
              <div>
                {errors.lamToi && (
                  <p className="text-xs text-red-600 ml-2">
                    {errors.lamToi.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ModelPhanCong;
