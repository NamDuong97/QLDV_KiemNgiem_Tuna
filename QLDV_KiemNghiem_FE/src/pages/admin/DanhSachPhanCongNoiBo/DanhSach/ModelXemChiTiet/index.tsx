import { Dialog, Skeleton } from "@mui/material";
import {
  formatDate,
  renderTrangThaiPhanCongNoiBo,
} from "../../../../../configs/configAll";
import { queryPhanCongNoiBoByID } from "../../../../../hooks/personnels/queryPhanCongNoiBo";
import ImageGallery from "../../../../../components/ImageGallery";
import { getRoleGroup } from "../../../../../configs/Role";
import { role } from "../../../../../configs/parseJwt";
import { useEffect, useState } from "react";
import Timeline from "./Timeline";
import yup from "../../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePersonnel } from "../../../../../contexts/PersonelsProvider";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
  handleOpenModelSua: (id: string) => void;
}

interface FormGiaiDoanThucHien {
  tenGiaiDoanThucHien: string;
  ngayNhanMau: Date;
  thoiGianThucHienFrom: Date;
  thoiGianThucHienTo: Date;
  tongThoiGianThucHien: number;
  noiDungBaoCao: string;
  ghiChu: string;
}

const timelineEvents = [
  {
    title: "Tiếp nhận mẫu",
    time: "15/06/2023 08:00",
    description: "Mẫu đã được tiếp nhận và kiểm tra sơ bộ",
    handler: "Phạm Thị E",
    completed: true,
    active: false,
  },
  {
    title: "Chuẩn bị mẫu",
    time: "15/06/2023 09:15",
    description: "Mẫu đã được chuẩn bị theo quy trình",
    handler: "Nguyễn Văn B",
    completed: true,
    active: false,
  },
  {
    title: "Kiểm tra vi sinh",
    time: "15/06/2023 10:30",
    description: "Đang thực hiện kiểm tra các chỉ tiêu vi sinh",
    handler: "Nguyễn Văn B",
    completed: true,
    active: true,
  },
  {
    title: "Kiểm tra kết quả",
    time: "Chưa thực hiện",
    description: "Kiểm tra và xác nhận kết quả",
    completed: false,
  },
  {
    title: "Hoàn thành",
    time: "Chưa thực hiện",
    description: "Hoàn thành và báo cáo kết quả",
    completed: false,
  },
];

const ModelXemChiTiet = (props: Props) => {
  const { open, handleClose, dataID, handleOpenModelSua } = props;
  const [isMau, setIsMau] = useState(false);
  const [isThem, setIsThem] = useState(false);
  const { data, isLoading } = queryPhanCongNoiBoByID({
    queryKey: "queryPhanCongNoiBoByID",
    params: dataID,
  });

  const [isChiTietTienDo, setisChiTietTienDo] = useState(false);
  const [saveIdTienDo, setSaveIdTienDo] = useState(null);
  const { personnelInfo } = usePersonnel();

  const dataChiTietTienDo = timelineEvents.find(
    (item: any) => item.title === saveIdTienDo
  );

  const schema = yup.object().shape({
    tenGiaiDoanThucHien: yup
      .string()
      .required("Vui lòng nhập tên giai đoạn thực hiện")
      .max(200, "Tên giai đoạn thực hiện không được vượt quá 200 ký tự"),

    ngayNhanMau: yup
      .date()
      .transform((value, originalValue) =>
        originalValue ? new Date(originalValue) : value
      )
      .typeError("Vui lòng chọn ngày nhận mẫu")
      .required("Vui lòng chọn ngày nhận mẫu"),

    thoiGianThucHienFrom: yup
      .date()
      .transform((value, originalValue) =>
        originalValue ? new Date(originalValue) : value
      )
      .typeError("Vui lòng chọn thời gian bắt đầu")
      .required("Vui lòng chọn thời gian bắt đầu"),

    thoiGianThucHienTo: yup
      .date()
      .transform((value, originalValue) =>
        originalValue ? new Date(originalValue) : value
      )
      .typeError("Vui lòng chọn thời gian kết thúc")
      .min(yup.ref("thoiGianThucHienFrom"), "Kết thúc phải sau bắt đầu")
      .required("Vui lòng chọn thời gian kết thúc"),

    tongThoiGianThucHien: yup
      .number()
      .typeError("Vui lòng nhập tổng thời gian")
      .positive("Tổng thời gian phải lớn hơn 0")
      .required("Vui lòng nhập tổng thời gian"),

    noiDungBaoCao: yup.string().required("Vui lòng nhập nội dung báo cáo"),

    ghiChu: yup
      .string()
      .required("Vui lòng nhập ghi chú")
      .max(500, "Ghi chú không được vượt quá 500 ký tự"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormGiaiDoanThucHien>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormGiaiDoanThucHien) => {
    const {
      ngayNhanMau,
      tenGiaiDoanThucHien,
      thoiGianThucHienFrom,
      thoiGianThucHienTo,
      tongThoiGianThucHien,
      noiDungBaoCao,
      ghiChu,
    } = data;

    const params = {
      ngayNhanMau: ngayNhanMau, // hoặc format bạn muốn
      manvXuLy: personnelInfo?.maId,
      tenGiaiDoanThucHien,
      thoiGianTu: thoiGianThucHienFrom,
      thoiGianDen: thoiGianThucHienTo,
      tongThoiGianThucHien,
      noiDungBaoCao,
      ghiChu,
    };
    console.log("Data submit:", params);
  };

  const handleShowTienDo = (id: any) => {
    setisChiTietTienDo(true);
    setSaveIdTienDo(id);
  };

  useEffect(() => {
    reset({
      tenGiaiDoanThucHien: "",
      ngayNhanMau: undefined,
      thoiGianThucHienFrom: undefined,
      thoiGianThucHienTo: undefined,
      tongThoiGianThucHien: 0,
      noiDungBaoCao: "",
      ghiChu: "",
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
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
            <h3 className="text-xl font-semibold text-gray-800">
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
            <h3 className="text-gray-500 font-semibold text-lg/6">
              Thông tin phân công
            </h3>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2 mb-4">
              <div>
                <p className="text-sm text-gray-500">Thời gian làm</p>
                {isLoading ? (
                  <Skeleton variant="rounded" width={250} height={20} />
                ) : (
                  <p className="text-base font-medium text-gray-700">
                    {formatDate(data?.lamTu)}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Thời gian phân công</p>
                <p className="text-base font-medium text-gray-700">
                  {formatDate(data?.ngayTao)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nhân viên xử lý</p>
                <p className="text-base font-medium text-gray-700">
                  {data?.tennvXuly}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nhân viên phân công</p>
                <p className="text-base font-medium text-gray-700">
                  {data?.tennvPhanCong}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trạng thái phân công</p>
                {renderTrangThaiPhanCongNoiBo(data?.trangThai)}
              </div>
              <div>
                <p className="text-sm text-gray-500"> Thời gian trả kết quả</p>
                <p className="text-base font-medium text-gray-700">
                  {formatDate(data?.ngayTraKetQua)}
                </p>
              </div>
              {data?.nguoiSua && (
                <div>
                  <p className="text-sm text-gray-500">Người sửa</p>
                  <p className="text-base font-medium text-gray-700">
                    {data?.nguoiSua} - {formatDate(data?.ngaySua)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 font-semibold text-lg/6 flex items-center gap-2">
              Thông tin mẫu phân công
              {isMau ? (
                <span
                  className="font-medium text-sm/6 cursor-pointer hover:underline text-blue-600"
                  onClick={() => {
                    setIsMau(false);
                    setIsThem(false);
                  }}
                >
                  Thu gọn
                </span>
              ) : (
                <span
                  className="font-medium text-sm/6 cursor-pointer hover:underline text-blue-600"
                  onClick={() => {
                    setIsThem(false);
                    setIsMau(true);
                  }}
                >
                  Mở rộng
                </span>
              )}
            </h3>
            {isMau && (
              <>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Tên mẫu</p>
                    <p className="text-sm">sdfdsf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tiêu chuẩn</p>
                    <p className="text-sm">sdfdsf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dịch vụ</p>
                    <p className="text-sm">sdfds</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Số lô</p>
                    <p className="text-sm">sdf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ngày sản xuất</p>
                    <p className="text-sm">sdfsdf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Thời gian hoàn thành
                    </p>
                    <p className="text-sm">sdfsd ngày</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Ngày dự kiến trả kết quả
                    </p>
                    <p className="text-sm">sdfsdfds</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hạn sử dụng</p>
                    <p className="text-sm">sdfsdf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Số lượng</p>
                    <p className="text-sm">sdfsdf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Điều kiện bảo quản</p>
                    <p className="text-sm">sdfsdf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Đơn vị sản xuất</p>
                    <p className="text-sm">sdf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tình trạng mẫu</p>
                    <p className="text-sm">sdfsdf</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lưu mẫu</p>
                    <p className="text-sm">sdfsdfds</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Xuất kết quả</p>
                    <p className="text-sm">sdfsdfd</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-500">Yêu cầu kiểm nghiệm</p>
                  <p className="text-sm p-2 bg-blue-50 rounded">sdfsdfds</p>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-500">Ghi chú khách hàng</p>
                  <p className="text-sm p-2 bg-blue-50 rounded">sdfsdf</p>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-500">Ghi chú</p>
                  <p className="text-sm p-2 bg-blue-50 rounded">sdfsdfsd</p>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-500">Ảnh mẫu</p>
                  <ImageGallery images={[]} />
                </div>
              </>
            )}
          </div>
          <div className="mt-2">
            <h3 className="text-gray-500 font-semibold text-lg/6 flex items-center gap-2">
              Lịch sử tiến độ
              {data?.trangThai === true &&
                !isChiTietTienDo &&
                (isThem ? (
                  <span
                    className="font-medium text-sm/6 cursor-pointer hover:underline text-blue-600"
                    onClick={() => setIsThem(false)}
                  >
                    Hủy Tạo phiếu
                  </span>
                ) : (
                  <span
                    className="font-medium text-sm/6 cursor-pointer hover:underline text-blue-600"
                    onClick={() => {
                      setIsThem(true);
                      setIsMau(false);
                    }}
                  >
                    Tạo phiếu tiến độ
                  </span>
                ))}
            </h3>
            {isChiTietTienDo ? (
              <div className="mb-6">
                <h3 className="text-gray-500 font-medium text-bâse/6">
                  Thông tin giai đoạn {dataChiTietTienDo?.title}
                </h3>
                <div className="grid grid-cols-4 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Thời gian thực hiện</p>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={250} height={20} />
                    ) : (
                      <p className="text-base font-medium text-gray-700">
                        {dataChiTietTienDo?.time} - {dataChiTietTienDo?.time}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Thời gian nhận mẫu</p>
                    <p className="text-base font-medium text-gray-700">
                      {dataChiTietTienDo?.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nhân viên xử lý</p>
                    <p className="text-base font-medium text-gray-700">
                      {data?.tennvXuly}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Tổng thời gian thực hiện
                    </p>
                    <p className="text-base font-medium text-gray-700">
                      20 ngày
                    </p>
                  </div>
                  <div className="col-span-full">
                    <p className="text-sm text-gray-500">Nội dung báo cáo</p>
                    <p className="text-base font-medium text-gray-700">
                      {dataChiTietTienDo?.description}
                    </p>
                  </div>
                  <div className="col-span-full">
                    <p className="text-sm text-gray-500">Ghi chú</p>
                    <p className="text-base font-medium text-gray-700">
                      {dataChiTietTienDo?.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSaveIdTienDo(null);
                      setisChiTietTienDo(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            ) : isThem ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Tên giai đoạn thực hiện *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        {...register("tenGiaiDoanThucHien")}
                        className="w-full py-1 px-1 border border-gray-300 rounded focus-within:outline-1 focus-within:border-blue-600"
                      />
                    </div>
                    {errors.tenGiaiDoanThucHien && (
                      <p className="text-xs text-red-600">
                        {errors.tenGiaiDoanThucHien.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Ngày nhận mẫu *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        {...register("ngayNhanMau")}
                        className="w-full py-1 px-1 border border-gray-300 rounded focus-within:outline-1 focus-within:border-blue-600"
                      />
                    </div>
                    {errors.ngayNhanMau && (
                      <p className="text-xs text-red-600">
                        {errors.ngayNhanMau.message}
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
                        {...register("thoiGianThucHienFrom")}
                        className="w-full py-1 px-1 border border-gray-300 rounded focus-within:outline-1 focus-within:border-blue-600"
                      />
                      -
                      <input
                        type="date"
                        {...register("thoiGianThucHienTo")}
                        className="w-full py-1 px-1 border border-gray-300 rounded focus-within:outline-1 focus-within:border-blue-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        {errors.thoiGianThucHienFrom && (
                          <p className="text-xs text-red-600">
                            {errors.thoiGianThucHienFrom.message}
                          </p>
                        )}
                      </div>
                      <div className="ml-2">
                        {errors.thoiGianThucHienTo && (
                          <p className="text-xs text-red-600">
                            {errors.thoiGianThucHienTo.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Tổng thời gian thực hiện *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        {...register("tongThoiGianThucHien")}
                        className="w-full py-1 px-1 border border-gray-300 rounded focus-within:outline-1 focus-within:border-blue-600"
                      />
                    </div>
                    {errors.tongThoiGianThucHien && (
                      <p className="text-xs text-red-600">
                        {errors.tongThoiGianThucHien.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Nội dung báo cáo *
                  </label>
                  <div className="flex items-center gap-2">
                    <textarea
                      {...register("noiDungBaoCao")}
                      className="w-full border p-2 max-h-20 min-h-20 border-gray-300 rounded focus-within:outline-1 focus-within:border-blue-600"
                    />
                  </div>
                  {errors.noiDungBaoCao && (
                    <p className="text-xs text-red-600">
                      {errors.noiDungBaoCao.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Ghi chú *
                  </label>
                  <div className="flex items-center gap-2">
                    <textarea
                      {...register("ghiChu")}
                      className="w-full border p-2 max-h-20 min-h-20 border-gray-300 rounded focus-within:outline-1 focus-within:border-blue-600"
                    />
                  </div>
                  {errors.ghiChu && (
                    <p className="text-xs text-red-600">
                      {errors.ghiChu.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsThem(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer"
                  >
                    Hủy Tạo phiếu
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                    Tạo phiếu
                  </button>
                </div>
              </form>
            ) : (
              <Timeline
                events={timelineEvents}
                handleShowTienDo={handleShowTienDo}
              />
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-300">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            {getRoleGroup(role) === "KN" && data?.trangThai === true && (
              <button
                onClick={() => handleOpenModelSua(dataID)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModelXemChiTiet;
