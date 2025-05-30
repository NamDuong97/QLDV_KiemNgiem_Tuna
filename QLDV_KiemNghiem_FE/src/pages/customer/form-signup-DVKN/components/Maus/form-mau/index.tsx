import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ListImage from "./ListImage";
import yup from "../../../../../../configs/yup.custom";
import { FormMau } from "../../../../../../models/mau";
import { Inputs } from "../../../../../../components/Inputs";
import { Textarea } from "../../../../../../components/Textarea";
import InputSelectTenMau from "./InputSelectTenMau";
import PopupThemMau from "./PopupThemMau";
import InputSelectTieuChuan from "./InputSelectTieuChuan";
import InputSelectDichVu from "./InputSelectDichVu";
import InputSelectDonViTinhMau from "./InputSelectDonViTinhMau";

interface FormThongTinMauProps {
  handleRedirectDanhSachMau: () => void;
  settableBody: Dispatch<any>;
  dataEditMaus?: any;
  tableBody: any;
  handleRedirectTag2: () => void;
  setDataEditMaus: Dispatch<any>;
}

const dataMau = [
  {
    tenMau: "Sen Hạt",
  },
  {
    tenMau: "Sen",
  },
  {
    tenMau: "Hạt",
  },
];

const dataTieuChuan = [
  {
    maID: "Việt Nam 5",
    tenTieuChuan: "Việt Nam 5",
  },
  {
    maID: "Trung Quốc",
    tenTieuChuan: "Trung Quốc",
  },
  {
    maID: "Châu Âu",
    tenTieuChuan: "Châu Âu",
  },
];

const dataDichVu = [
  {
    maID: "DV001",
    tenDichVu: "Dịch vụ 1",
  },
  {
    maID: "DV002",
    tenDichVu: "Dịch vụ 2",
  },
  {
    maID: "DV003",
    tenDichVu: "Dịch vụ 3",
  },
];

const dataDonViTinh = [
  {
    maID: "DVT001",
    tenDonViTinh: "Kg",
  },
  {
    maID: "DVT002",
    tenDonViTinh: "gam",
  },
  {
    maID: "DVT003",
    tenDonViTinh: "Thùng",
  },
];

const FormThongTinMau = (props: FormThongTinMauProps) => {
  const {
    handleRedirectDanhSachMau,
    settableBody,
    dataEditMaus,
    tableBody,
    setDataEditMaus,
    handleRedirectTag2,
  } = props;

  const dataTest = sessionStorage.getItem("PhieuDangKy");
  const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;

  const [listImage, setListImage] = useState(() => {
    const dataImageTemp = sessionStorage.getItem("ImageTemp");
    return dataImageTemp ? JSON.parse(dataImageTemp) : [];
  });

  const [openPopupThemMau, setOpenPopupThemMau] = useState(false);
  const handleOpenPopupThemMau = () => setOpenPopupThemMau(true);
  const handleClosePopupThemMau = () => setOpenPopupThemMau(false);

  let schema = useMemo(() => {
    return yup.object().shape({
      TenMau: yup
        .string()
        .required("Yêu cầu nhập Tên Mẫu")
        .max(200, "Tên Mẫu nhập không quá 200 ký tự")
        .test("Trùng tên mẫu", "Tên mẫu đã tồn tại", (value) => {
          const isTrungLap = dataPhieuDangky?.Mau?.find(
            (item: any) => item.TenMau === value
          );
          return !isTrungLap ? true : false;
        })
        .test(
          "kiểm tra định dạng",
          "Tên Mẫu nhập phải bằng kiểu chữ a-zA-z và cuối số không được phép để khoảng trắng",
          (value) => {
            return /^[\p{L}]+(?: [\p{L}]+)*$/u.test(value);
          }
        ),
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
            (item: any) => item.SoLo === value
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

  // const TenMau = useWatch({ control, name: "TenMau" });
  // const TieuChuan = useWatch({ control, name: "TieuChuan" });
  // const DichVu = useWatch({ control, name: "DichVu" });

  const handleCreateMau = (data: FormMau) => {
    const PhieuDangKy = {
      ...dataPhieuDangky,
      Mau: [data, ...(dataPhieuDangky?.Mau || [])],
    };
    sessionStorage.setItem("PhieuDangKy", JSON.stringify(PhieuDangKy));
    sessionStorage.removeItem("ImageTemp");
    settableBody(PhieuDangKy?.Mau || []);
    handleRedirectDanhSachMau?.();
  };

  const handleEditMau = (data: FormMau) => {
    const index = dataPhieuDangky?.Mau.findIndex(
      (item: any) => item.TenMau === dataEditMaus?.TenMau
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
    setDataEditMaus(null);
    settableBody(updatedPhieuDangky.Mau);
    sessionStorage.setItem("PhieuDangKy", JSON.stringify(updatedPhieuDangky));
    sessionStorage.removeItem("ImageTemp");
    handleRedirectTag2?.();
  };

  useEffect(() => {
    if (dataEditMaus) {
      setListImage(dataEditMaus.Anh);
      reset({
        TenMau: dataEditMaus?.TenMau || "",
        TieuChuan: dataEditMaus?.TieuChuan || "",
        DichVu: dataEditMaus?.DichVu || "",
        ThoiGianTieuChuan: dataEditMaus?.ThoiGianTieuChuan || "",
        NgayDuKienTraKetQua: dataEditMaus?.NgayDuKienTraKetQua || "",
        SoLo: dataEditMaus?.SoLo || "",
        DonViSanXuat: dataEditMaus?.DonViSanXuat || "",
        NgaySanXuat: dataEditMaus?.NgaySanXuat || "",
        HanSuDung: dataEditMaus?.HanSuDung || "",
        SoLuong: dataEditMaus?.SoLuong || "",
        DonViTinh: dataEditMaus?.DonViTinh || "",
        YeuCauKiemNghiem: dataEditMaus?.YeuCauKiemNghiem || "",
        DieuKienBaoQuan: dataEditMaus?.DieuKienBaoQuan || "",
        LuuMau: dataEditMaus.LuuMau || 0,
        XuatKetQua: dataEditMaus.XuatKetQua || 0,
        TinhTrangMau: dataEditMaus?.TinhTrangMau || "",
        GhiChu: dataEditMaus?.GhiChu || "",
        Anh: dataEditMaus?.Anh || [],
      });
    } else
      reset({
        TenMau: "",
        TieuChuan: "",
        DichVu: "",
        ThoiGianTieuChuan: "",
        NgayDuKienTraKetQua: "",
        SoLo: "",
        DonViSanXuat: "",
        NgaySanXuat: "",
        HanSuDung: "",
        SoLuong: "",
        DonViTinh: "",
        YeuCauKiemNghiem: "",
        DieuKienBaoQuan: "",
        LuuMau: 0,
        XuatKetQua: 0,
        TinhTrangMau: "",
        GhiChu: "",
        Anh: [],
      });
  }, [tableBody, dataEditMaus]);

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
          <form
            onSubmit={
              dataEditMaus
                ? handleSubmit(handleEditMau)
                : handleSubmit(handleCreateMau)
            }
          >
            <Box className="grid gap-4 py-4">
              <Box className="gap-5 sm:gap-0 flex flex-wrap-reverse sm:flex-nowrap justify-end items-center">
                {dataEditMaus ? (
                  <button className="text-lg/6 font-bold text-center border border-solid border-yellow-500 text-yellow-500 px-4 py-1 lg:px-10 lg:py-2 hover:text-white rounded-md hover:bg-yellow-500 cursor-pointer">
                    Sửa Mẫu
                  </button>
                ) : (
                  <button className="text-base/6  sm:text-lg/6 font-bold text-center border border-solid border-blue-500 text-blue-500 px-4 py-1 lg:py-2 hover:text-white rounded-md hover:bg-blue-500 cursor-pointer">
                    Thêm Mẫu
                  </button>
                )}
              </Box>
              <hr className="text-gray-300" />
              <Box>
                <Box className="grid grid-cols-12 gap-[1px_24px]">
                  <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                    <InputSelectTenMau
                      title="Tên mẫu"
                      name="TenMau"
                      control={control}
                      data={dataMau}
                      placeholder={"Vui lòng chọn Tên Mẫu"}
                      errorMessage={(errors.TenMau as any)?.message}
                      handleOpenPopupThemMau={handleOpenPopupThemMau}
                    />
                  </Box>
                  <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                    <InputSelectTieuChuan
                      title="Tiêu chuẩn"
                      name="TieuChuan"
                      control={control}
                      data={dataTieuChuan}
                      placeholder="Vui lòng chọn Tiêu Chuẩn"
                      errorMessage={(errors.TieuChuan as any)?.message}
                    />
                  </Box>
                  <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                    <InputSelectDichVu
                      title="Dịch vụ"
                      name="DichVu"
                      control={control}
                      data={dataDichVu}
                      placeholder="Vui lòng chọn Dịch Vụ"
                      errorMessage={(errors.DichVu as any)?.message}
                    />
                  </Box>
                  <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                    <Inputs
                      title="Số lô"
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
                      title="Ngày sản xuất"
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
                  <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                    <Inputs
                      title="Thời gian tiêu chuẩn(Thời gian dự kiến)"
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
                      title="Hạn sử dụng"
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
                      title="Số lượng"
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
                    <InputSelectDonViTinhMau
                      title="Đơn vị tính"
                      placeholder="Nhập Đơn Vị Tính"
                      name="DonViTinh"
                      control={control}
                      data={dataDonViTinh}
                      errorMessage={errors.DonViTinh?.message}
                    />
                  </Box>
                  <Box className="col-span-12 md:col-span-6">
                    <Inputs
                      title="Điều kiện bảo quản"
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
                      title="Đơn vị sản xuất"
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
                  <Box className="col-span-12 md:col-span-6">
                    <Textarea
                      title="Tình trạng mãu"
                      placeholder="Nhập Tình Trạng Mãu"
                      name="TinhTrangMau"
                      inputRef={register("TinhTrangMau")}
                      errorMessage={errors.TinhTrangMau?.message}
                      className="max-h-[149px] min-h-[149px]"
                      height="h-[213px]"
                    />
                  </Box>
                  <Box className="col-span-12 md:col-span-6">
                    <Textarea
                      title="Yêu cầu kiểm nghiệm"
                      name="YeuCauKiemNghiem"
                      placeholder="Nhập Yêu Cầu Kiểm Nghiệm"
                      inputRef={register("YeuCauKiemNghiem")}
                      errorMessage={errors.YeuCauKiemNghiem?.message}
                      className="max-h-[149px] min-h-[149px]"
                      height="h-[213px]"
                    />
                  </Box>
                  <Box className="col-span-12 md:col-span-6 pb-6">
                    <p className="!font-semibold text-base/6 text-gray_80 mb-2">
                      Lưu mẫu
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
                      Xuất kết quả
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
                      title="Ghi chú"
                      placeholder="Nhập Ghi Chú"
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
              </Box>
            </Box>
          </form>
        </motion.div>
      </AnimatePresence>
      <PopupThemMau
        open={openPopupThemMau}
        handleClose={handleClosePopupThemMau}
      />
    </Box>
  );
};

export default FormThongTinMau;
