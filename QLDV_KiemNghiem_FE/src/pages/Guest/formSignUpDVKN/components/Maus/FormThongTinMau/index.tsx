import { Box } from "@mui/material";
import { Dispatch, useContext, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import ListImage from "./ListImage";
import yup from "../../../../../../configs/yup.custom";
import { FormMau } from "../../../../../../models/mau";
import { Inputs } from "../../../../../../components/Inputs";
import { Textarea } from "../../../../../../components/Textarea";
import InputSelectTenMau from "./InputSelectTenMau";
import PopupThemMau from "./PopupThemMau";
import InputSelectTieuChuan from "./InputSelectTieuChuan";
import InputSelectDichVu from "./InputSelectDichVu";
import {
  useGetDmMauAll,
  useGetLoaiDichVuAll,
  useGetThoiGianTieuChuan,
  useGetTieuChuanAll,
} from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import PopupThemTieuChuan from "./PopupThemTieuChuan";
import InputSelectDonViTinhMau from "./InputSelectDonViTinhMau";
import { StoreContext } from "../../../../../../contexts/storeProvider";

interface FormThongTinMauProps {
  handleRedirectDanhSachMau: () => void;
  settableBody: Dispatch<any>;
  dataEditMaus?: any;
  tableBody: any;
  handleRedirectTag2: () => void;
  setDataEditMaus: Dispatch<any>;
  setData: Dispatch<any>;
  dataCopyMaus?: any;
  setDataCopyMaus: Dispatch<any>;
}

export const DonViTinh = [
  { value: "mg" },
  { value: "g" },
  { value: "kg" },
  { value: "µg" },
  { value: "mg/kg" },
  { value: "µg/kg" },
  { value: "% w/w" },
  { value: "%" },
  { value: "mL" },
  { value: "L" },
  { value: "µL" },
  { value: "mg/L" },
  { value: "µg/L" },
  { value: "ppm" },
  { value: "ppb" },
  { value: "mol/L" },
  { value: "mmol/L" },
  { value: "µmol/L" },
  { value: "% v/v" },
  { value: "CFU/g" },
  { value: "CFU/mL" },
  { value: "MPN/g" },
  { value: "MPN/mL" },
  { value: "Log CFU/g" },
  { value: "spores/g" },
  { value: "yeast/mL" },
  { value: "cells/mL" },
  { value: "pH" },
  { value: "NTU" },
  { value: "Brix" },
  { value: "IU" },
  { value: "kcal" },
  { value: "kJ" },
  { value: "mẫu" },
  { value: "gói" },
  { value: "chai" },
  { value: "ống" },
  { value: "hộp" },
  { value: "bình" },
];

const FormThongTinMau = (props: FormThongTinMauProps) => {
  const {
    handleRedirectDanhSachMau,
    settableBody,
    dataEditMaus,
    tableBody,
    setDataEditMaus,
    handleRedirectTag2,
    setData,
    dataCopyMaus,
    setDataCopyMaus,
  } = props;

  const dataTest = sessionStorage.getItem("PhieuDangKy");
  const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;
  const { userInfo } = useContext(StoreContext);

  const [listImage, setListImage] = useState(() => {
    const dataImageTemp = sessionStorage.getItem("ImageTemp");
    return dataImageTemp !== undefined &&
      dataImageTemp !== "undefined" &&
      dataImageTemp !== null
      ? JSON.parse(dataImageTemp)
      : [];
  });

  const [openPopupThemMau, setOpenPopupThemMau] = useState(false);
  const [openPopupThemTieuChuan, setOpenPopupThemTieuChuan] = useState(false);
  const handleOpenPopupThemMau = () => setOpenPopupThemMau(true);
  const handleOpenPopupThemTieuChuan = () => setOpenPopupThemTieuChuan(true);
  const handleClosePopupThemMau = () => setOpenPopupThemMau(false);
  const handleClosePopupThemTieuChuan = () => setOpenPopupThemTieuChuan(false);

  const { data: dataDMMau } = useGetDmMauAll({ queryKey: "DmMauAll" });
  const { data: TieuChuanAll } = useGetTieuChuanAll({
    queryKey: "TieuChuanAll",
    options: {
      enabled: true,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  });
  const dataTieuChuanAll = TieuChuanAll as Array<any>;

  const { data: dataLoaiDichVuAll } = useGetLoaiDichVuAll({
    queryKey: "LoaiDichVuAll",
  });

  let schema = useMemo(() => {
    return yup.object().shape({
      tenMau: yup
        .string()
        .required("Yêu cầu chọn Tên Mẫu")
        .test("Trùng tên mẫu", "Tên mẫu đã tồn tại", (value) => {
          const isTrungLap = dataPhieuDangky?.Maus?.find(
            (item: any) =>
              item.tenMau === value && item.tenMau !== dataEditMaus?.tenMau
          );
          return !isTrungLap ? true : false;
        }),
      tenTieuChuan: yup.string().required("Yêu cầu chọn Tiêu chuẩn"),
      tenLoaiDichVu: yup.string().required("Yêu cầu chọn Dịch vụ"),
      soLo: yup
        .string()
        .required("Yêu cầu nhập Số lô")
        .max(50, "Số lô nhập không quá 50 ký tự")
        .test("Trùng tên Số lô", "Số lô đã tồn tại", (value) => {
          const isTrungLap = dataPhieuDangky?.Maus?.find(
            (item: any) =>
              item.soLo === value && item.soLo !== dataEditMaus?.soLo
          );
          return !isTrungLap ? true : false;
        }),
      donViSanXuat: yup
        .string()
        .required("Yêu cầu nhập Đơn vị sản xuất")
        .max(200, "Đơn vị sản xuất nhập không quá 200 ký tự"),
      ngaySanXuat: yup
        .string()
        .required("Yêu cầu nhập Ngày sản xuất")
        .test(
          "ngày sản xuất bắt đầu vào năm 2000",
          "Ngày sản xuất được tính từ 01/01/2000 đến năm nay",
          (value) => {
            const namHienTai = new Date().getFullYear();
            return (
              value >= "2000-01-01" && Number(value.split("-")[0]) <= namHienTai
            );
          }
        ),
      hanSuDung: yup
        .string()
        .required("Yêu cầu nhập Hạn sử dụng")
        .when("ngaySanXuat", ([ngaySanXuat], schema) => {
          return schema
            .test(
              "validation Hạn sử dụng",
              "Yêu cầu chọn Hạn sử dụng",
              (hanSuDung) => {
                if (!ngaySanXuat || hanSuDung) {
                  return true;
                }
              }
            )
            .test(
              "lớn hơn và khác",
              "Hạn sử dụng phải khác và lớn hơn Ngày sản xuất",
              (hanSuDung) => {
                if (ngaySanXuat && hanSuDung) {
                  return hanSuDung > ngaySanXuat && hanSuDung !== ngaySanXuat;
                }
                return true;
              }
            )
            .test(
              "Hạn sử dụng tính sau 20 năm",
              "Hạn sử dụng không được vượt mức từ năm nay đến 20 năm sau",
              (value) => {
                const namHienTai = new Date().getFullYear();
                return Number(value.split("-")[0]) <= namHienTai + 20;
              }
            );
        }),
      soLuong: yup
        .number()
        .typeError("Yêu cầu nhập Số lượng")
        .required("Yêu cầu nhập Số lượng")
        .min(0, "Yêu cầu nhập số nguyên lớn hơn 0"),
      donViTinh: yup
        .string()
        .required("Yêu cầu nhập Đơn vị tính")
        .max(50, "Đơn vị tính nhập không quá 50 ký tự"),
      yeuCauKiemNghiem: yup
        .string()
        .required("Yêu cầu nhập Yêu cầu kiểm nghiệm"),
      tinhTrangMau: yup
        .string()
        .required("Yêu cầu nhập Tình trạng mẫu")
        .max(500, "Tình trạng mẫu nhập không quá 500 ký tự"),
      dieuKienBaoQuan: yup
        .string()
        .required("Yêu cầu nhập Điều kiện bảo quản")
        .max(200, "Điều kiện bảo quản nhập không quá 200 ký tự"),
      luuMau: yup.boolean().transform((_, item) => (item ? true : false)),
      xuatKetQua: yup.boolean().transform((_, item) => (item ? true : false)),
      phieuDangKyMauHinhAnhs: yup
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

  const TenMau = useWatch({ control, name: "tenMau" });
  const tenTieuChuan = useWatch({ control, name: "tenTieuChuan" });
  const tenLoaiDichVu = useWatch({ control, name: "tenLoaiDichVu" });

  const MaDm_Mau_Id = useMemo(() => {
    return dataDMMau?.find((item: any) => item.tenMau === TenMau)?.maId;
  }, [dataDMMau, TenMau]);

  const MaTieuChuan_Id = useMemo(() => {
    return dataTieuChuanAll?.find(
      (item: any) => item.tenTieuChuan === tenTieuChuan
    )?.maId;
  }, [dataTieuChuanAll, tenTieuChuan]);

  const MaLoaiDV = useMemo(() => {
    return dataLoaiDichVuAll?.find(
      (item: any) => item.tenDichVu === tenLoaiDichVu
    )?.maLoaiDv;
  }, [dataLoaiDichVuAll, tenLoaiDichVu]);

  const { data: dataThoiGianTieuChuan } = useGetThoiGianTieuChuan({
    queryKey: "ThoiGianTieuChuan",
    maDmMau: MaDm_Mau_Id,
    maTieuChuan: MaTieuChuan_Id,
  });

  const handleCreateMau = (data: FormMau) => {
    const MaDm_Mau = dataDMMau?.find(
      (item: any) => item.tenMau === data.tenMau
    ).maId;
    const maTieuChuan = dataTieuChuanAll?.find(
      (item: any) => item.tenTieuChuan === data.tenTieuChuan
    ).maId;
    const maLoaidv = dataLoaiDichVuAll?.find(
      (item: any) => item.tenDichVu === data.tenLoaiDichVu
    ).maId;
    const dataImage: any[] = [];

    listImage.map((item: any) =>
      dataImage.push({
        base64: item.base64,
        ghiChu: item.ghiChu,
        image: item?.image as File,
        ten: item.ten,
      })
    );

    const dataMau = {
      maId: "",
      maDmMau: MaDm_Mau,
      tenMau: data.tenMau,
      maTieuChuan: maTieuChuan,
      maPhieuDangKy: "",
      manvThucHien: "",
      madv: "DV001",
      soLo: data.soLo,
      donViSanXuat: data.donViSanXuat,
      ngaySanXuat: data.ngaySanXuat,
      hanSuDung: data.hanSuDung,
      donViTinh: data.donViTinh,
      soLuong: data.soLuong,
      yeuCauKiemNghiem: data.yeuCauKiemNghiem,
      tinhTrangMau: data.tinhTrangMau,
      dieuKienBaoQuan: data.dieuKienBaoQuan,
      luuMau: data.luuMau,
      xuatKetQua: data.xuatKetQua,
      trangThaiNhanMau: "",
      ghiChu: data.ghiChu,
      nguoiTao: userInfo.maId,
      thoiGianTieuChuan: dataThoiGianTieuChuan?.data,
      maPdkMau: null,
      loaiDv: MaLoaiDV,
      maLoaiDV: maLoaidv,
      phieuDangKyMauHinhAnhs: dataImage,
    };

    const PhieuDangKy = {
      ...dataPhieuDangky,
      Maus: [dataMau, ...(dataPhieuDangky?.Maus || [])],
    };

    sessionStorage.setItem("PhieuDangKy", JSON.stringify(PhieuDangKy));
    setData(PhieuDangKy);
    setDataCopyMaus(null);
    sessionStorage.removeItem("ImageTemp");
    settableBody(PhieuDangKy?.Maus || []);
    handleRedirectDanhSachMau?.();
  };

  const handleEditMau = (data: FormMau) => {
    const index = dataPhieuDangky?.Maus.findIndex(
      (item: any) => item.TenMau === dataEditMaus?.TenMau
    );

    const updatedMau = [...dataPhieuDangky?.Maus];
    const MaDm_Mau = dataDMMau.find(
      (item: any) => item.tenMau === data.tenMau
    ).maId;
    const maLoaidv = dataLoaiDichVuAll.find(
      (item: any) => item.tenDichVu === data.tenLoaiDichVu
    ).maId;

    const maTieuChuan = dataTieuChuanAll.find(
      (item: any) => item.tenTieuChuan === data.tenTieuChuan
    ).maId;

    const dataImage: any[] = [];
    listImage.map((item: any) =>
      dataImage.push({
        base64: item.base64,
        ghiChu: item.ghiChu,
        image: item?.image as File,
        ten: item.ten,
      })
    );

    const dataMau = {
      maId: "",
      maDmMau: MaDm_Mau,
      tenMau: data.tenMau,
      maTieuChuan: maTieuChuan,
      maPhieuDangKy: "",
      manvThucHien: "",
      madv: "DV001",
      soLo: data.soLo,
      donViSanXuat: data.donViSanXuat,
      ngaySanXuat: data.ngaySanXuat,
      hanSuDung: data.hanSuDung,
      donViTinh: data.donViTinh,
      soLuong: data.soLuong,
      yeuCauKiemNghiem: data.yeuCauKiemNghiem,
      tinhTrangMau: data.tinhTrangMau,
      dieuKienBaoQuan: data.dieuKienBaoQuan,
      luuMau: data.luuMau,
      xuatKetQua: data.xuatKetQua,
      trangThaiNhanMau: "",
      ghiChu: data.ghiChu,
      thoiGianTieuChuan: dataThoiGianTieuChuan?.data,
      maPdkMau: null,
      loaiDv: MaLoaiDV,
      maLoaiDV: maLoaidv,
      phieuDangKyMauHinhAnhs: dataImage,
    };

    if (index !== -1) {
      updatedMau[index] = dataMau;
    } else {
      updatedMau.unshift(dataMau);
    }

    const updatedPhieuDangky = {
      ...dataPhieuDangky,
      Maus: updatedMau,
    };
    setData(updatedPhieuDangky);
    setDataEditMaus(null);
    settableBody(updatedPhieuDangky.Maus);
    sessionStorage.setItem("PhieuDangKy", JSON.stringify(updatedPhieuDangky));
    sessionStorage.removeItem("ImageTemp");
    handleRedirectTag2?.();
  };

  useEffect(() => {
    if (dataEditMaus || dataCopyMaus) {
      const tenTieuChuan = dataTieuChuanAll.find(
        (item: any) =>
          item.maId === dataEditMaus?.maTieuChuan ||
          item.maId === dataCopyMaus?.maTieuChuan
      ).tenTieuChuan;
      const tenDichVu = dataLoaiDichVuAll.find(
        (item: any) =>
          item.maLoaiDv === dataEditMaus?.loaiDv ||
          item.maLoaiDv === dataCopyMaus?.loaiDv
      ).tenDichVu;
      setListImage(
        dataCopyMaus?.phieuDangKyMauHinhAnhs ||
          dataEditMaus?.phieuDangKyMauHinhAnhs
      );

      reset({
        tenMau: dataEditMaus?.tenMau || dataCopyMaus?.tenMau || "",
        tenTieuChuan: tenTieuChuan || "",
        tenLoaiDichVu: tenDichVu || "",
        soLo: dataEditMaus?.soLo || dataCopyMaus?.soLo || "",
        donViSanXuat: dataEditMaus?.donViSanXuat || dataCopyMaus?.soLo || "",
        ngaySanXuat:
          dataEditMaus?.ngaySanXuat || dataCopyMaus?.ngaySanXuat || "",
        hanSuDung: dataEditMaus?.hanSuDung || dataCopyMaus?.hanSuDung || "",
        soLuong: dataEditMaus?.soLuong || dataCopyMaus?.soLuong || "",
        donViTinh: dataEditMaus?.donViTinh || dataCopyMaus?.donViTinh || "",
        yeuCauKiemNghiem:
          dataEditMaus?.yeuCauKiemNghiem ||
          dataCopyMaus?.yeuCauKiemNghiem ||
          "",
        dieuKienBaoQuan:
          dataEditMaus?.dieuKienBaoQuan || dataCopyMaus?.dieuKienBaoQuan || "",
        luuMau: dataEditMaus?.luuMau || dataCopyMaus?.luuMau || false,
        xuatKetQua:
          dataEditMaus?.xuatKetQua || dataCopyMaus?.xuatKetQua || false,
        tinhTrangMau:
          dataEditMaus?.tinhTrangMau || dataCopyMaus?.tinhTrangMau || "",
        ghiChu: dataEditMaus?.ghiChu || dataCopyMaus?.ghiChu || "",
        phieuDangKyMauHinhAnhs:
          dataEditMaus?.phieuDangKyMauHinhAnhs ||
          dataCopyMaus?.phieuDangKyMauHinhAnhs ||
          [],
      });
    } else
      reset({
        tenMau: "",
        tenTieuChuan: "",
        tenLoaiDichVu: "",
        soLo: "",
        donViSanXuat: "",
        ngaySanXuat: "",
        hanSuDung: "",
        soLuong: 0,
        donViTinh: "",
        yeuCauKiemNghiem: "",
        dieuKienBaoQuan: "",
        luuMau: false,
        xuatKetQua: false,
        tinhTrangMau: "",
        ghiChu: "",
        phieuDangKyMauHinhAnhs: [],
      });
  }, [tableBody, dataEditMaus, dataCopyMaus, reset]);

  useEffect(() => {
    setValue("phieuDangKyMauHinhAnhs", listImage);
  }, [listImage, setValue]);

  return (
    <Box>
      <form
        onSubmit={
          dataEditMaus
            ? handleSubmit(handleEditMau)
            : handleSubmit(handleCreateMau)
        }
      >
        <Box className="grid gap-4 py-4">
          <Box>
            <Box className="grid grid-cols-12 gap-[1px_24px]">
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <InputSelectTenMau
                  title="Tên mẫu"
                  name="tenMau"
                  control={control}
                  data={dataDMMau}
                  placeholder={"Vui lòng chọn Tên Mẫu"}
                  errorMessage={(errors.tenMau as any)?.message}
                  handleOpenPopupThemMau={handleOpenPopupThemMau}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <InputSelectTieuChuan
                  title="Tiêu chuẩn"
                  name="tenTieuChuan"
                  control={control}
                  data={dataTieuChuanAll}
                  placeholder="Vui lòng chọn Tiêu Chuẩn"
                  errorMessage={(errors.tenTieuChuan as any)?.message}
                  handleOpen={handleOpenPopupThemTieuChuan}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <InputSelectDichVu
                  title="Dịch vụ"
                  name="tenLoaiDichVu"
                  control={control}
                  data={dataLoaiDichVuAll}
                  placeholder="Vui lòng chọn Dịch Vụ"
                  errorMessage={(errors.tenLoaiDichVu as any)?.message}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <Inputs
                  title="Số lô"
                  placeholder="Nhập Số Lô"
                  name="soLo"
                  inputRef={register("soLo")}
                  errorMessage={errors.soLo?.message}
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                  }}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <Inputs
                  title="Ngày sản xuất"
                  type="date"
                  name="ngaySanXuat"
                  inputRef={register("ngaySanXuat")}
                  errorMessage={errors.ngaySanXuat?.message}
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                  }}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <Inputs
                  title="Hạn sử dụng"
                  type="date"
                  name="hanSuDung"
                  inputRef={register("hanSuDung")}
                  errorMessage={errors.hanSuDung?.message}
                  className="h-[42px]"
                  placeholder="dd/mm/yyyy"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                  }}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <Inputs
                  title="Số lượng"
                  placeholder="Nhập Số Lượng"
                  name="soLuong"
                  type="number"
                  inputRef={register("soLuong")}
                  errorMessage={errors.soLuong?.message}
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
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <InputSelectDonViTinhMau
                  title="Đơn vị tính"
                  placeholder="Nhập Đơn Vị Tính"
                  name="donViTinh"
                  errorMessage={errors.donViTinh?.message}
                  control={control}
                  data={DonViTinh}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <Inputs
                  title="Điều kiện bảo quản"
                  placeholder="Điều Kiện Bảo Quản"
                  name="dieuKienBaoQuan"
                  inputRef={register("dieuKienBaoQuan")}
                  errorMessage={errors.dieuKienBaoQuan?.message}
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                  }}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4">
                <Inputs
                  title="Đơn vị sản xuất"
                  placeholder="Nhập Đơn Vị Sản Xuất"
                  name="donViSanXuat"
                  inputRef={register("donViSanXuat")}
                  errorMessage={errors.donViSanXuat?.message}
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                  }}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4 h-[106px]">
                <Box className="grid gap-2">
                  <p className="!font-semibold text-base/6 text-gray_80 whitespace-normal text-cyan-950">
                    Lưu mẫu
                  </p>
                  <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[8px] px-4 w-full">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      {...register("luuMau")}
                    />
                    <span className="text-base/6 font-medium">
                      Cho phép lưu mẫu
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4 h-[106px]">
                <Box className="grid gap-2">
                  <p className="!font-semibold text-base/6 text-gray_80 whitespace-normal text-cyan-950">
                    Xuất kết quả
                  </p>
                  <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[8px] px-4 w-full">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      {...register("xuatKetQua")}
                    />
                    <span className="text-base/6 font-medium">
                      Cho phép xuất kết quả
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="col-span-12 lg:col-span-6">
                <Textarea
                  title="Tình trạng mẫu"
                  placeholder="Nhập Tình Trạng Mẫu"
                  name="tinhTrangMau"
                  inputRef={register("tinhTrangMau")}
                  errorMessage={errors.tinhTrangMau?.message}
                  className="max-h-[149px] min-h-[149px]"
                  height="h-[213px]"
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6">
                <Textarea
                  title="Yêu cầu kiểm nghiệm"
                  name="yeuCauKiemNghiem"
                  placeholder="Nhập Yêu Cầu Kiểm Nghiệm"
                  inputRef={register("yeuCauKiemNghiem")}
                  errorMessage={errors.yeuCauKiemNghiem?.message}
                  className="max-h-[149px] min-h-[149px]"
                  height="h-[213px]"
                />
              </Box>

              <Box className="col-span-12">
                <Textarea
                  title="Ghi chú"
                  placeholder="Nhập Ghi Chú"
                  className="max-h-[149px] min-h-[149px]"
                  height="h-auto"
                  inputRef={register("ghiChu")}
                />
              </Box>
            </Box>
            <ListImage
              errorsMessage={errors.phieuDangKyMauHinhAnhs?.message}
              setListImage={setListImage}
              listImage={listImage}
            />
          </Box>
          <hr className="text-gray-300" />
          <Box className="gap-5 sm:gap-0 flex flex-wrap-reverse sm:flex-nowrap justify-end items-center">
            {dataEditMaus ? (
              <button className="w-full text-lg/6 font-bold text-center bg-yellow-500 text-white border-[2px] border-solid border-gray-300 px-10 py-2 rounded-md hover:bg-yellow-600 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                Sửa Mẫu
              </button>
            ) : (
              <button className="w-full text-base/6 sm:text-lg/6 font-bold bg-cyan-800 text-white text-center border-[2px] border-solid border-gray-300 px-10 py-2 rounded-md hover:bg-cyan-700 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                Thêm Mẫu
              </button>
            )}
          </Box>
        </Box>
      </form>
      <PopupThemMau
        open={openPopupThemMau}
        handleClose={handleClosePopupThemMau}
      />
      <PopupThemTieuChuan
        open={openPopupThemTieuChuan}
        handleClose={handleClosePopupThemTieuChuan}
      />
    </Box>
  );
};

export default FormThongTinMau;
