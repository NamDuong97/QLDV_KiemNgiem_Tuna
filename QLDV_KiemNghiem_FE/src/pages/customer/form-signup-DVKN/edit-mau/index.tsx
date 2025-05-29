import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import yup from "../../../../configs/yup.custom";
import { FormMau } from "../../../../models/mau";
import { Inputs } from "../../../../components/Inputs";
import InputSelect from "../../../../components/InputSelect";
import { Textarea } from "../../../../components/Textarea";
import { APP_ROUTES } from "../../../../constants/routers";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import ListImage from "./ListImage";

const dataLoaiMau = [
  {
    label: "Gấp 1 (G1)",
    value: "Gấp 1 (G1)",
  },
  {
    label: "Gấp 2 (G2)",
    value: "Gấp 2 (G2)",
  },
  {
    label: "Gấp 3 (G3)",
    value: "Gấp 3 (G3)",
  },
];

const dataTieuChuan = [
  {
    label: "Việt Nam 5",
    value: "Việt Nam 5",
  },
  {
    label: "Trung Quốc",
    value: "Trung Quốc",
  },
  {
    label: "Châu Âu",
    value: "Châu Âu",
  },
];

const dataDichVu = [
  {
    label: "ABC",
    value: "ABC",
  },
  {
    label: "ABC",
    value: "ABC",
  },
  {
    label: "ABC",
    value: "ABC",
  },
];

const EditMau = () => {
  const naginate = useNavigate();
  const id = decodeURIComponent(useLocation().pathname.split("/")[3]);

  const data = sessionStorage.getItem("PhieuDangKy");
  const dataPhieuDangky = data ? JSON.parse(data) : null;
  const dataSuaMau = data
    ? JSON.parse(data).Mau.find((item: any) => item.TenMau === id)
    : [];

  const [listImage, setListImage] = useState(() => {
    const dataImageTemp = sessionStorage.getItem("ImageTemp");
    return dataImageTemp ? JSON.parse(dataImageTemp) : [];
  });

  let schema = useMemo(() => {
    return yup.object().shape({
      TenMau: yup
        .string()
        .required("Yêu cầu nhập Tên Mẫu")
        .max(200, "Tên Mẫu nhập không quá 200 ký tự")
        .test("Trùng tên mẫu", "Tên mẫu đã tồn tại", (value) => {
          const isTrungLap = dataPhieuDangky?.Mau?.find(
            (item: any) =>
              item.TenMau === value && item.TenMau !== dataSuaMau.TenMau
          );
          return !isTrungLap ? true : false;
        }),
      LoaiMau: yup.string().required("Yêu cầu chọn Loại mẫu"),
      TieuChuan: yup.string().required("Yêu cầu chọn Tiêu chuẩn"),
      DichVu: yup.string().required("Yêu cầu chọn Dịch vụ"),
      ThoiGianTieuChuan: yup
        .string()
        .when("TieuChuan", ([TieuChuan], schema) => {
          return schema.test(
            "dữ liệu tiêu chuẩn phải có",
            "Yêu cầu chọn Tiêu chuẩn",
            () => {
              return TieuChuan;
            }
          );
        }),
      NgayDuKienTraKetQua: yup
        .string()
        .when(["DichVu", "TieuChuan"], ([DichVu], schema) => {
          return schema.test(
            "dữ liệu tiêu chuẩn và Dịch vụ phải có",
            "Yêu cầu chọn Tiêu chuẩn và Dịch vụ",
            () => {
              return DichVu;
            }
          );
        }),
      SoLo: yup
        .string()
        .required("Yêu cầu nhập Số lô")
        .max(50, "Số lô nhập không quá 50 ký tự")
        .test("Trùng tên Số lô", "Số lô đã tồn tại", (value) => {
          const isTrungLap = dataPhieuDangky?.Mau?.find(
            (item: any) => item.SoLo === value && item.SoLo !== dataSuaMau.SoLo
          );
          return !isTrungLap ? true : false;
        }),
      DonViSanXuat: yup
        .string()
        .required("Yêu cầu nhập Đơn vị sản xuất")
        .max(200, "Đơn vị sản xuất nhập không quá 200 ký tự"),
      NgaySanXuat: yup.string().required("Yêu cầu nhập Ngày sản xuất"),
      HanSuDung: yup.string().required("Yêu cầu nhập Hạn sử dụng"),
      SoLuong: yup
        .string()
        .typeError("Yêu cầu nhập Số lượng")
        .required("Yêu cầu nhập Số lượng")
        .max(18, "Số lượng nhập phải nhỏ hơn 18 số 9")
        .test("lớn hơn 0.01", "Số lượng nhập phải lớn hơn 0.01", (value) => {
          return Number(value) >= 0.01;
        })
        .test(
          "2 chữ số sau dấu thập phân",
          "Số lượng nhập phải lớn hơn 0.01",
          (value) => {
            if (typeof value !== "string") return false;
            const parts = Number(value).toString().split(".");
            return parts.length === 1 || parts[1].length <= 2;
          }
        ),
      DonViTinh: yup
        .string()
        .required("Yêu cầu nhập Đơn vị tính")
        .max(50, "Đơn vị tính nhập không quá 50 ký tự"),
      YeuCauKiemNghiem: yup
        .string()
        .required("Yêu cầu nhập Yêu cầu kiểm nghiệm"),
      TinhTrangMau: yup
        .string()
        .required("Yêu cầu nhập Tình trạng mẫu")
        .max(500, "Tình trạng mẫu nhập không quá 500 ký tự"),
      DieuKienBaoQuan: yup
        .string()
        .required("Yêu cầu nhập Điều kiện bảo quản")
        .max(200, "Điều kiện bảo quản nhập không quá 200 ký tự"),
      LuuMau: yup.number().transform((_, item) => (item ? 1 : 0)),
      XuatKetQua: yup.number().transform((_, item) => (item ? 1 : 0)),
      Anh: yup
        .array()
        .typeError("Yêu cầu thêm  Ảnh")
        .required("Yêu cầu thêm  Ảnh")
        .test("Anh", "Yêu cầu thêm  Ảnh", (value) => {
          return value && value.length > 0;
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormMau>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  //const TenMau = useWatch({ control, name: "TenMau" });
  // const TieuChuan = useWatch({ control, name: "TieuChuan" });
  // const DichVu = useWatch({ control, name: "DichVu" });

  const handleCreateMau = (data: FormMau) => {
    const index = dataPhieuDangky?.Mau.findIndex(
      (item: any) => item.TenMau === id
    );

    const updatedMau = [...dataPhieuDangky?.Mau];

    if (index !== -1) {
      updatedMau[index] = data;
    } else {
      updatedMau.unshift(data);
    }

    const updatedPhieuDangky = {
      ...dataPhieuDangky,
      Mau: updatedMau,
    };

    sessionStorage.setItem("PhieuDangKy", JSON.stringify(updatedPhieuDangky));
    sessionStorage.removeItem("ImageTemp");
    naginate(
      `${APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}?tuna=danh-sach-mau`
    );
  };

  useEffect(() => {
    setListImage(dataSuaMau.Anh);
    reset({
      TenMau: dataSuaMau.TenMau || "",
      LoaiMau: dataSuaMau.LoaiMau || "",
      TieuChuan: dataSuaMau.TieuChuan || "",
      DichVu: dataSuaMau.DichVu || "",
      ThoiGianTieuChuan: dataSuaMau.ThoiGianTieuChuan || "",
      NgayDuKienTraKetQua: dataSuaMau.ThoiGianTieuChuan || "",
      SoLo: dataSuaMau.SoLo || "",
      DonViSanXuat: dataSuaMau.DonViSanXuat || "",
      NgaySanXuat: dataSuaMau.NgaySanXuat || "",
      HanSuDung: dataSuaMau.HanSuDung || "",
      SoLuong: dataSuaMau.SoLuong || "",
      DonViTinh: dataSuaMau.DonViTinh || "",
      YeuCauKiemNghiem: dataSuaMau.YeuCauKiemNghiem || "",
      DieuKienBaoQuan: dataSuaMau.DieuKienBaoQuan || "",
      LuuMau: dataSuaMau.LuuMau || 0,
      XuatKetQua: dataSuaMau.XuatKetQua || 0,
      TinhTrangMau: dataSuaMau.TinhTrangMau || "",
      GhiChu: dataSuaMau.GhiChu || "",
      Anh: dataSuaMau.Anh || [],
    });
  }, []);

  useEffect(() => {
    setValue("Anh", listImage); // mỗi khi listImage thay đổi, cập nhật vào form
  }, [listImage, setValue]);

  return (
    <Box>
      <AnimatePresence mode="sync">
        <motion.div
          key="form-signup-dvkm"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <form onSubmit={handleSubmit(handleCreateMau)}>
            <Box className="grid gap-4 py-6 px-4 sm:px-6 lg:px-6">
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-2">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      sessionStorage.removeItem("ImageTemp");
                      naginate(
                        `${APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}`
                      );
                    }}
                  >
                    <FaRegArrowAltCircleLeft className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-gray-600" />
                  </button>
                  <p className="text-[22px]/6 lg:text-3xl/6 font-bold text-gray-800">
                    Sửa Mẫu{" "}
                  </p>
                </Box>
                <Box>
                  <button className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500">
                    <span className="text-base/6 md:text-lg/6 font-bold text-blue-500 group-hover:text-white">
                      Lưu
                    </span>
                  </button>
                </Box>
              </Box>
              <hr className="text-gray-300" />
              <Box className="border border-solid border-gray-300 rounded-[10px]">
                <motion.div
                  key="form-signup-dvkm-tag1"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box className="px-4 py-6 sm:px-6 lg:px-10 lg:py-7 grid grid-cols-12 gap-[1px_24px]">
                    <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                      <Inputs
                        title="Tên Mẫu"
                        placeholder="Nhập Tên Mẫu"
                        name="TenMau"
                        inputRef={register("TenMau")}
                        errorMessage={errors.TenMau?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                      <InputSelect
                        title="Loại Mẫu"
                        name="LoaiMau"
                        control={control}
                        options={dataLoaiMau}
                        selectProps={{
                          isSearchable: false,
                          placeholder: "Vui lòng chọn Loại Mẫu",
                        }}
                        errorMessage={(errors.LoaiMau as any)?.message}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                      <InputSelect
                        title="Tiêu Chuẩn"
                        name="TieuChuan"
                        control={control}
                        options={dataTieuChuan}
                        selectProps={{
                          isSearchable: false,
                          placeholder: "Vui lòng chọn Tiêu Chuẩn",
                        }}
                        errorMessage={(errors.TieuChuan as any)?.message}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                      <InputSelect
                        title="Dịch Vụ"
                        name="DichVu"
                        control={control}
                        options={dataDichVu}
                        selectProps={{
                          isSearchable: false,
                          placeholder: "Vui lòng chọn Dịch Vụ",
                        }}
                        errorMessage={(errors.DichVu as any)?.message}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                      <Inputs
                        title="Số Lô"
                        placeholder="Nhập Số Lô"
                        name="SoLo"
                        inputRef={register("SoLo")}
                        errorMessage={errors.SoLo?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                      <Inputs
                        title="Ngày Sản Xuất"
                        type="date"
                        name="NgaySanXuat"
                        inputRef={register("NgaySanXuat")}
                        errorMessage={errors.NgaySanXuat?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Thời gian tiêu chuẩn"
                        name="ThoiGianTieuChuan"
                        placeholder="Vui lòng Tiêu Chuẩn"
                        inputRef={register("ThoiGianTieuChuan")}
                        errorMessage={errors.ThoiGianTieuChuan?.message}
                        className="h-[42px]"
                        disabled
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Ngày dự kiến trả kết quả"
                        name="NgayDuKienTraKetQua"
                        placeholder="Vui lòng Tiêu Chuẩn và Dịch vụ"
                        inputRef={register("NgayDuKienTraKetQua")}
                        errorMessage={errors.NgayDuKienTraKetQua?.message}
                        className="h-[42px]"
                        disabled
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Hạn Sử Dụng"
                        type="date"
                        name="HanSD"
                        inputRef={register("HanSuDung")}
                        errorMessage={errors.HanSuDung?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Số Lượng"
                        placeholder="Nhập Số Lượng"
                        name="SoLuong"
                        type="number"
                        inputRef={register("SoLuong")}
                        errorMessage={errors.SoLuong?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                          '& input[type="number"]': {
                            MozAppearance: "textfield",
                          },
                          '& input[type="number"]::-webkit-outer-spin-button,& input[type="number"]::-webkit-inner-spin-button':
                            {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Đơn Vị Tính"
                        placeholder="Nhập Đơn Vị Tính"
                        name="DonViTinh"
                        inputRef={register("DonViTinh")}
                        errorMessage={errors.DonViTinh?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Tình Trạng Mãu"
                        placeholder="Nhập Tình Trạng Mãu"
                        name="TinhTrangMau"
                        inputRef={register("TinhTrangMau")}
                        errorMessage={errors.TinhTrangMau?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>

                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Điều Kiện Bảo Quản"
                        placeholder="Điều Kiện Bảo Quản"
                        name="DieuKienBaoQuan"
                        inputRef={register("DieuKienBaoQuan")}
                        errorMessage={errors.DieuKienBaoQuan?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Đơn Vị Sản Xuất"
                        placeholder="Nhập Đơn Vị Sản Xuất"
                        name="DonViSanXuat"
                        inputRef={register("DonViSanXuat")}
                        errorMessage={errors.DonViSanXuat?.message}
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-12">
                      <Textarea
                        title="Yêu Cầu Kiểm Nghiệm"
                        name="YeuCauKiemNghiem"
                        inputRef={register("YeuCauKiemNghiem")}
                        errorMessage={errors.YeuCauKiemNghiem?.message}
                        className="max-h-[149px] min-h-[149px]"
                        height="h-[213px]"
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6 pb-6">
                      <p className="!font-semibold text-base/6 text-gray_80 mb-2">
                        Lưu Mẫu
                      </p>
                      <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          {...register("LuuMau")}
                        />
                        <span className="text-base/6 font-medium">
                          (Nếu có vui lòng tích chọn)
                        </span>
                      </Box>
                    </Box>
                    <Box className="col-span-12 md:col-span-6 gap-2 pb-6">
                      <p className="!font-semibold text-base/6 text-gray_80 mb-2">
                        Xuất Kết Quả
                      </p>
                      <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full h-[42px]">
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          {...register("XuatKetQua")}
                        />
                        <span className="text-base/6 font-medium">
                          (Nếu có vui lòng tích chọn)
                        </span>
                      </Box>
                    </Box>
                    <Box className="col-span-12">
                      <Textarea
                        title="Ghi Chú"
                        className="max-h-[149px] min-h-[149px]"
                        height="h-auto"
                        inputRef={register("GhiChu")}
                      />
                    </Box>
                  </Box>
                  <ListImage
                    errorsMessage={errors.Anh?.message}
                    setListImage={setListImage}
                    listImage={listImage}
                  />
                </motion.div>
              </Box>
            </Box>
          </form>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default EditMau;
