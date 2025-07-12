import { Dialog, Skeleton } from "@mui/material";
import {
  formatDate,
  formatDateNotTime,
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
import {
  useMutationCreatePhieuTienDo,
  useMutationDeletePhieuTienDo,
  useMutationNhanXetPhieuTienDo,
  useQueryPhieuTienDoAll,
  useQueryPhieuTienDoByID,
} from "../../../../../hooks/personnels/queryTienDo";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../../lib/reactQuery";
import FormNhanXet from "./FormNhanXet";
import ConfirmationModal from "../../../../../components/ConfirmationModal";
import { TypeConformation } from "../../../../../constants/typeConfirmation";
import {
  queryCheckMau,
  queryMauByID,
} from "../../../../../hooks/personnels/queryMau";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../../hooks/customers/usePhieuDKyDVKN";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
  handleOpenModelSua: (id: string) => void;
  setIsThem: React.Dispatch<React.SetStateAction<boolean>>;
  isThem: boolean;
}

interface FormGiaiDoanThucHien {
  tenGiaiDoanThucHien: string;

  thoiGianThucHienFrom: Date;
  thoiGianThucHienTo: Date;

  noiDungBaoCao: string;
  ghiChu: string;
}

const ModelXemChiTiet = (props: Props) => {
  const { open, handleClose, dataID, handleOpenModelSua, setIsThem, isThem } =
    props;
  const [isMau, setIsMau] = useState(false);
  const [isChiTietTienDo, setisChiTietTienDo] = useState(false);
  const [saveIdTienDo, setSaveIdTienDo] = useState<any>(null);
  const [isPhanHoi, setIsPhanHoi] = useState(false);
  const [openModelXoa, setOpenModelXoa] = useState(false);

  const { data, isLoading } = queryPhanCongNoiBoByID({
    queryKey: "queryPhanCongNoiBoByID",
    params: dataID,
  });
  const { data: dataMau } = queryMauByID({
    queryKey: "queryMauByID",
    params: data?.maPdkMau,
  });
  const { data: dataTienDo, isLoading: isLoadingTienDo } =
    useQueryPhieuTienDoAll({
      queryKey: "useQueryPhieuTienDoAll",
      params: { MaMau: data?.maPdkMau, getAll: true },
    });

  const { data: dataShowTienDoID, isLoading: isLoadingTienDoID } =
    useQueryPhieuTienDoByID({
      queryKey: "useQueryPhieuTienDoByID",
      params: saveIdTienDo,
    });
  const { data: dataTC } = useGetTieuChuanAll({
    queryKey: "GetTieuChuanAll",
  });
  const { data: dataLDV } = useGetLoaiDichVuAll({
    queryKey: "GetLoaiDichVuAll",
  });
  const dataTieuChuan: any = dataTC;
  const dataLoaiDV: any = dataLDV;
  const { data: dataCheckMau } = queryCheckMau({
    queryKey: "queryCheckMau",
    params: data?.maPdkMau,
  });

  const handleSettled = async (response: any) => {
    if (response?.status === 200 || response?.status === 204) {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["useQueryPhieuTienDoAll"],
        }),
        queryClient.refetchQueries({
          queryKey: ["useQueryPhieuTienDoByID"],
        }),
      ]);
      setIsPhanHoi(false);
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate: mutateNhanXet } = useMutationNhanXetPhieuTienDo({
    queryKey: "useMutationNhanXetPhieuTienDo",
    onSuccess: (data: any) => {
      console.log("Thao tác thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Thao tác thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Thao tác thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Thao tác thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const { mutate: mutateCreate } = useMutationCreatePhieuTienDo({
    queryKey: "useMutationCreatePhieuTienDo",
    onSuccess: (data: any) => {
      console.log("Thao tác thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Thao tác thành công",
          status: 200,
        });
        reset();
        setIsThem(false);
        return;
      } else {
        showNotification({
          message: "Thao tác thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Thao tác thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const { mutate: mutateDelete } = useMutationDeletePhieuTienDo({
    queryKey: "useMutationDeletePhieuTienDo",
    onSuccess: (data: any) => {
      console.log("Thao tác thành công:", data);
      if (data.status === 204) {
        showNotification({
          message: "Thao tác thành công",
          status: 200,
        });
        setOpenModelXoa(false);
        setisChiTietTienDo(false);
        return;
      } else {
        showNotification({
          message: "Thao tác thất bại",
          status: 400,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Thao tác thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handleDelete = () => {
    mutateDelete(saveIdTienDo);
    // console.log("saveIdTienDo", saveIdTienDo);
  };

  const schema = yup.object().shape({
    tenGiaiDoanThucHien: yup
      .string()
      .required("Vui lòng nhập tên giai đoạn thực hiện")
      .max(200, "Tên giai đoạn thực hiện không được vượt quá 200 ký tự"),
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

  const onSubmit = (dataGiaiDoanThucHien: FormGiaiDoanThucHien) => {
    const {
      tenGiaiDoanThucHien,
      thoiGianThucHienFrom,
      thoiGianThucHienTo,
      noiDungBaoCao,
      ghiChu,
    } = dataGiaiDoanThucHien;

    const params = {
      tenGiaiDoanThucHien: tenGiaiDoanThucHien,
      thoiGianTu: thoiGianThucHienFrom,
      thoiGianDen: thoiGianThucHienTo,
      noiDungBaoCao: noiDungBaoCao,
      ghiChu: ghiChu,
      maPDK_Mau: data?.maPdkMau,
    };
    mutateCreate(params);
  };

  const handleShowTienDo = (id: any) => {
    setisChiTietTienDo(true);
    setSaveIdTienDo(id);
  };

  const OnClose = () => {
    setSaveIdTienDo(null);
    setisChiTietTienDo(false);
    setIsPhanHoi(false);
    setIsMau(false);
    setIsThem(false);
    handleClose();
    setOpenModelXoa(false);
  };

  useEffect(() => {
    reset({
      tenGiaiDoanThucHien: "",
      thoiGianThucHienFrom: undefined,
      thoiGianThucHienTo: undefined,
      noiDungBaoCao: "",
      ghiChu: "",
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={OnClose}
      maxWidth="xl"
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
              Chi tiết phân công mẫu ({data?.tenMau})
            </h3>
            <button
              onClick={OnClose}
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
          <div className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-blue-500 font-semibold text-xl/6 mb-4">
              Thông tin phân công
            </h3>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2 mb-4">
              <div>
                <p className="text-base text-gray-500">Thời gian làm</p>
                {isLoading ? (
                  <Skeleton variant="rounded" width={250} height={20} />
                ) : (
                  <p className="text-base font-bold text-gray-700">
                    {formatDate(data?.lamTu)}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base text-gray-500">Thời gian phân công</p>
                <p className="text-base font-bold text-gray-700">
                  {formatDate(data?.ngayTao)}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-500">Nhân viên xử lý</p>
                <p className="text-base font-bold text-gray-700">
                  {data?.tennvXuly}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-500">Nhân viên phân công</p>
                <p className="text-base font-bold text-gray-700">
                  {data?.tennvPhanCong}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-500">Trạng thái phân công</p>
                {renderTrangThaiPhanCongNoiBo(data?.trangThai)}
              </div>
              <div>
                <p className="text-base text-gray-500">
                  {" "}
                  Thời gian trả kết quả
                </p>
                <p className="text-base font-medium text-gray-700">
                  {formatDate(data?.ngayTraKetQua)}
                </p>
              </div>
              {data?.nguoiSua && (
                <div>
                  <p className="text-base text-gray-500">Người sửa</p>
                  <p className="text-base font-bold text-gray-700">
                    {data?.nguoiSua} - {formatDate(data?.ngaySua)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border border-gray-300 rounded-lg">
            <div
              className={`flex justify-between items-center ${isMau && "mb-4"}`}
              onClick={() => {
                setIsMau(!isMau);
                setIsThem(false);
              }}
            >
              <h3 className="text-blue-500 font-semibold text-xl/6 flex items-center gap-2">
                Thông tin mẫu kiểm nghiệm
              </h3>
              <span className="p-1 hover:bg-gray-300 cursor-pointer">
                {isMau ? (
                  <IoIosArrowUp className="w-5 h-5" />
                ) : (
                  <IoIosArrowDown className="w-5 h-5" />
                )}
              </span>
            </div>
            {isMau && (
              <>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <p className="text-base text-gray-500">Tên mẫu</p>
                    <p className="text-base font-bold">{dataMau?.tenMau}</p>
                  </div>
                  <div className="col-span-4">
                    <p className="text-base text-gray-500">Tiêu chuẩn</p>
                    <p className="text-base font-bold">
                      {
                        dataTieuChuan?.find(
                          (item: any) => item.maId === dataMau?.maTieuChuan
                        )?.tenTieuChuan
                      }
                    </p>
                  </div>
                  <div className="col-span-4">
                    <p className="text-base text-gray-500">Dịch vụ</p>
                    <p className="text-base font-bold">
                      {
                        dataLoaiDV?.find(
                          (item: any) => item.maLoaiDv === dataMau?.loaiDv
                        )?.tenDichVu
                      }
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Số lô</p>
                    <p className="text-base font-bold">{dataMau?.soLo}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Ngày sản xuất</p>
                    <p className="text-base font-bold">
                      {formatDateNotTime(dataMau?.ngaySanXuat)}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">
                      Thời gian hoàn thành
                    </p>
                    <p className="text-base font-bold">
                      {dataMau?.thoiGianTieuChuan} ngày
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">
                      Ngày dự kiến trả kết quả
                    </p>
                    <p className="text-base font-bold">
                      {dataMau?.ngayTraKetQua
                        ? formatDateNotTime(dataMau?.ngayTraKetQua)
                        : "Đến khi hoàn thành"}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Hạn sử dụng</p>
                    <p className="text-base font-bold">
                      {formatDateNotTime(dataMau?.hanSuDung)}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Số lượng</p>
                    <p className="text-base font-bold">{`${dataMau?.soLuong} ${dataMau?.donViTinh}`}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">
                      Điều kiện bảo quản
                    </p>
                    <p className="text-base font-bold">
                      {dataMau?.dieuKienBaoQuan}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Đơn vị sản xuất</p>
                    <p className="text-base font-bold">
                      {dataMau?.donViSanXuat}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Tình trạng mẫu</p>
                    <p className="text-base font-bold">
                      {dataMau?.tinhTrangMau}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Lưu mẫu</p>
                    <p className="text-base font-bold">
                      {dataMau?.luuMau ? "Có lưu mẫu" : "Không lưu mẫu"}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-base text-gray-500">Xuất kết quả</p>
                    <p className="text-base font-bold">
                      {dataMau?.xuatKetQua
                        ? "Có xuất kết quả"
                        : "Không xuất kết quả"}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-base text-gray-500">Yêu cầu kiểm nghiệm</p>
                  <p className="text-base font-bold p-2 bg-blue-50 rounded">
                    {dataMau?.yeuCauKiemNghiem}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-base text-gray-500">Ghi chú khách hàng</p>
                  <p className="text-base font-bold p-2 bg-blue-50 rounded">
                    {dataMau?.ghiChu ? dataMau?.ghiChu : "Không có ghi chú"}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-base text-gray-500">Ảnh mẫu</p>
                  <ImageGallery images={[]} />
                </div>
              </>
            )}
          </div>
          <div className="mt-2 p-4 border border-gray-300 rounded-lg">
            <div className="flex items-center justify-between pr-2">
              <h3 className="text-blue-500 font-semibold text-xl/6 flex items-center gap-2 mb-4">
                Báo cáo tiến độ
              </h3>
              {dataCheckMau?.complete === 0 &&
                data?.trangThai === true &&
                !isChiTietTienDo &&
                (isThem ? (
                  <span
                    className="font-medium text-sm/6 cursor-pointer px-4 rounded bg-yellow-600 text-white"
                    onClick={() => setIsThem(false)}
                  >
                    Hủy Tạo phiếu
                  </span>
                ) : (
                  <span
                    className="font-medium text-sm/6 cursor-pointer px-4 rounded bg-green-600 text-white"
                    onClick={() => {
                      setIsThem(true);
                      setIsMau(false);
                    }}
                  >
                    Tạo phiếu tiến độ
                  </span>
                ))}
            </div>
            {isChiTietTienDo ? (
              <div className="mb-6">
                <h3 className="text-gray-600 font-semibold text-lg/6 flex gap-2">
                  Thông tin chi tiết giai đoạn{" "}
                  {isLoadingTienDoID ? (
                    <Skeleton variant="rounded" className="w-32" height={24} />
                  ) : (
                    dataShowTienDoID?.tenGiaiDoanThucHien
                  )}
                </h3>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-base text-gray-500">
                      Thời gian thực hiện
                    </p>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={250} height={20} />
                    ) : (
                      <p className="text-base font-bold text-gray-700">
                        {formatDate(dataShowTienDoID?.thoiGianTu)} -{" "}
                        {formatDate(dataShowTienDoID?.thoiGianDen)}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-base text-gray-500">Nhân viên xử lý</p>
                    {isLoadingTienDoID ? (
                      <Skeleton
                        variant="rounded"
                        className="w-full"
                        height={24}
                      />
                    ) : (
                      <p className="text-base font-bold text-gray-700">
                        {dataShowTienDoID?.tennvXyLy}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-base text-gray-500">Ngày trả kết quả</p>
                    {isLoadingTienDoID ? (
                      <Skeleton
                        variant="rounded"
                        className="w-full"
                        height={24}
                      />
                    ) : (
                      <p className="text-base font-bold text-gray-700">
                        {formatDateNotTime(dataShowTienDoID?.ngayTraKetQua)}
                      </p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <p className="text-base text-gray-500">Nội dung báo cáo</p>
                    {isLoadingTienDoID ? (
                      <Skeleton
                        variant="rounded"
                        className="w-full"
                        height={24}
                      />
                    ) : (
                      <p className="text-base font-bold text-gray-700 p-4 bg-blue-100 rounded-lg">
                        {dataShowTienDoID?.noiDungBaoCao}
                      </p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <p className="text-base text-gray-500">Ghi chú</p>
                    {isLoadingTienDoID ? (
                      <Skeleton
                        variant="rounded"
                        className="w-full"
                        height={24}
                      />
                    ) : (
                      <p className="text-base font-bold text-gray-700 p-4 bg-blue-100 rounded-lg">
                        {dataShowTienDoID?.ghiChu}
                      </p>
                    )}
                  </div>
                  {dataShowTienDoID?.noiDungDanhGia && (
                    <div className="col-span-full">
                      <p className="text-base text-gray-500">
                        Nội dung đánh giá
                      </p>
                      {isLoadingTienDoID ? (
                        <Skeleton
                          variant="rounded"
                          className="w-full"
                          height={24}
                        />
                      ) : (
                        <p className="text-base font-bold text-gray-700 p-4 bg-blue-100 rounded-lg">
                          {dataShowTienDoID?.noiDungDanhGia}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {isPhanHoi ? (
                  <FormNhanXet
                    onCancel={() => setIsPhanHoi(false)}
                    mutateNhanXet={mutateNhanXet}
                    saveIdTienDo={saveIdTienDo}
                  />
                ) : (
                  <div className="flex justify-end gap-4">
                    {dataCheckMau?.complete === 0 && (
                      <>
                        {(role === "KN_L" || role === "KN_P") && (
                          <button
                            onClick={() => setIsPhanHoi(true)}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            {dataShowTienDoID?.noiDungDanhGia
                              ? "Sửa phản hồi"
                              : "Phản hồi"}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setOpenModelXoa(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                        >
                          Xóa
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setSaveIdTienDo(null);
                        setisChiTietTienDo(false);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                )}
              </div>
            ) : isThem ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 border border-gray-300 bg-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-4"
              >
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
            ) : dataTienDo?.length > 0 ? (
              <Timeline
                events={dataTienDo}
                isLoading={isLoadingTienDo}
                handleShowTienDo={handleShowTienDo}
              />
            ) : (
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-gray-500">
                  Chưa có phiếu tiến độ nào được cập nhật
                </p>
                <button
                  onClick={() => setIsThem(true)}
                  className="cursor-pointer mt-4 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all"
                >
                  Tạo phiếu tiến độ
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-300">
            <button
              onClick={OnClose}
              className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            {getRoleGroup(role) === "KN" &&
              data?.trangThai === true &&
              dataCheckMau?.complete === 0 &&
              role !== "KN" && (
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
      <ConfirmationModal
        isOpen={openModelXoa}
        onClose={() => setOpenModelXoa(false)}
        onConfirm={handleDelete}
        title={"Xác nhận hủy?"}
        message={"Bạn có chắc chắn muốn hủy?"}
        type={TypeConformation.Error}
      />
    </Dialog>
  );
};

export default ModelXemChiTiet;
