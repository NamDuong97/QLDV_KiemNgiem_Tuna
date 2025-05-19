import { Box, Pagination, SelectChangeEvent } from "@mui/material";
import { motion } from "motion/react";
import { Align } from "../../../../../models/Table";
import TablePLHC from "./TablePLHC";
import { useEffect, useMemo, useState } from "react";
import yup from "../../../../../configs/yup.custom";
import { FormPhuLieuHoaChat } from "../../../../../models/PhuLieuHoaChat";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "../../../../../components/Textarea";
import { Inputs } from "../../../../../components/Inputs";
import InputSelectDM_PLHC from "./InputSelectDM_PLHC";
import InputSearch from "../../../../../components/InputSearch";
import removeVietnameseTones from "../../../../../configs/removeVietnameseTones";

interface ListPLHCProps {
  handleRedirectTag2?: () => void;
  handleClickOpenPopupNofitication?: () => void;
}

const dataDM_PLHC = [
  {
    TenDM_PLHC: "axit sunfuric 5%",
  },
  {
    TenDM_PLHC: "axit sunfuric 25%",
  },
  {
    TenDM_PLHC: "axit sunfuric 54%",
  },
];

const dataDM_PhuLieuHoaChat = [
  {
    TenDM_PLHC: "axit sunfuric 5%",
    NongDo: "5",
    DonViNongDo: "%",
    TenHienThi: "H2SO4 5%",
    DieuKienBaoQuan: "Bảo quản lạnh",
  },
  {
    TenDM_PLHC: "axit sunfuric 7%",
    NongDo: "7",
    DonViNongDo: "%",
    TenHienThi: "H2SO4 7%",
    DieuKienBaoQuan: "Bảo quản lạnh",
  },
  {
    TenDM_PLHC: "axit sunfuric 25%",
    NongDo: "25",
    DonViNongDo: "%",
    TenHienThi: "H2SO4 25%",
    DieuKienBaoQuan: "Bảo quản lạnh",
  },
  {
    TenDM_PLHC: "axit sunfuric 54%",
    NongDo: "54",
    DonViNongDo: "%",
    TenHienThi: "H2SO4 54%",
    DieuKienBaoQuan: "Bảo quản lạnh",
  },
];

const tableHead = [
  {
    id: "TenPhuLieu_HC",
    sort: false,
    label: "Tên Phụ Liệu Hóa Chất",
    align: Align.Left,
  },
  {
    id: "TenHienThi",
    sort: false,
    label: "Tên hiển thị",
    align: Align.Center,
  },
  {
    id: "SoLuong",
    sort: false,
    label: "Số Lượng",
    align: Align.Center,
  },
  {
    id: "DonViTinh",
    sort: false,
    label: "Đơn Vị Tính",
    align: Align.Center,
  },
  {
    id: "DieuKienBaoQuan",
    sort: false,
    label: "Điều kiện bảo quản",
    align: Align.Center,
  },
];

const ListPLHC = (props: ListPLHCProps) => {
  const { handleRedirectTag2, handleClickOpenPopupNofitication } = props;

  const dataTest = sessionStorage.getItem("PhieuDangKy");
  const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;

  const [valueSearch, setValueSearch] = useState("");
  const [tableBody, settableBody] = useState(() => {
    return dataTest ? JSON.parse(dataTest).PLHC : [];
  });

  const [listCheckbox, setListCheckbox] = useState<any[]>([]);
  const [dataEditPLHC, setDataEditPLHC] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); //Số dòng hiển thị

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableBody?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableBody && tableBody.length / itemsPerPage);

  let schema = useMemo(() => {
    return yup.object().shape({
      TenDM_PLHC: yup
        .string()
        .required("Yêu cầu nhập Tên danh mục phụ liệu hóa chất")
        .max(200, "Tên danh mục phù liệu hóa chất nhập không quá 200 ký tự")
        .test(
          "Trùng Tên danh mục phụ liệu hóa chất",
          "Tên danh mục phụ liệu hóa chất đã tồn tại",
          (value) => {
            if (dataEditPLHC) {
              const isTrungLap = dataPhieuDangky?.PLHC?.find(
                (item: any) =>
                  item.TenDM_PLHC === value &&
                  item.TenDM_PLHC !== dataEditPLHC?.TenDM_PLHC
              );
              return !isTrungLap ? true : false;
            } else {
              const isTrungLap = dataPhieuDangky?.PLHC?.find(
                (item: any) => item.TenDM_PLHC === value
              );
              return !isTrungLap ? true : false;
            }
          }
        ),
      TenPLHC: yup
        .string()
        .required("Yêu cầu nhập Tên phù liệu hóa chất")
        .max(200, "Tên phù liệu hóa chất nhập không quá 200 ký tự")
        .test(
          "Trùng Tên phù liệu hóa chất",
          "Tên phù liệu hóa chất đã tồn tại",
          (value) => {
            if (dataEditPLHC) {
              const isTrungLap = dataPhieuDangky?.PLHC?.find(
                (item: any) =>
                  item.TenPLHC === value &&
                  item.TenPLHC !== dataEditPLHC?.TenPLHC
              );
              return !isTrungLap ? true : false;
            } else {
              const isTrungLap = dataPhieuDangky?.PLHC?.find(
                (item: any) => item.TenPLHC === value
              );
              return !isTrungLap ? true : false;
            }
          }
        ),
      TenHienThi: yup
        .string()
        .required("Yêu cầu nhập Tên hiển thị")
        .max(200, "Tên hiển thị nhập không quá 200 ký tự")
        .test("Trùng Tên hiển thị", "Tên hiển thị đã tồn tại", (value) => {
          if (dataEditPLHC) {
            const isTrungLap = dataPhieuDangky?.PLHC?.find(
              (item: any) =>
                item.TenHienThi === value &&
                item.TenHienThi !== dataEditPLHC?.TenHienThi
            );
            return !isTrungLap ? true : false;
          } else {
            const isTrungLap = dataPhieuDangky?.PLHC?.find(
              (item: any) => item.TenHienThi === value
            );
            return !isTrungLap ? true : false;
          }
        }),
      SoLuong: yup
        .number()
        .typeError("Yêu cầu nhập Số lượng")
        .required("Yêu cầu nhập Số lượng")
        .min(1, "Số lượng nhập phải lớn hơn 0"),
      DonViTinh: yup
        .string()
        .required("Yêu cầu nhập Đơn vị tính")
        .max(50, "Đơn vị tính nhập không quá 50 ký tự"),
      SoLo: yup
        .string()
        .required("Số lô nhập không quá 50 ký tự")
        .max(50, "Yêu cầu nhập Số lô"),
      TenNhaCungCap: yup
        .string()
        .max(200, "Tên nhà cung cấp nhập không quá 200 ký tự"),
      NongDo: yup
        .string()
        .typeError("Yêu cầu nhập Nồng độ")
        .required("Yêu cầu nhập Nồng độ")
        .max(18, "Nồng độ nhập phải nhỏ hơn 18 số 9")
        .test("lớn hơn 0.01", "Nồng độ nhập phải lớn hơn 0.01", (value) => {
          return Number(value) >= 0.01;
        })
        .test(
          "2 chữ số sau dấu thập phân",
          "Nồng độ nhập phải lớn hơn 0.01",
          (value) => {
            if (typeof value !== "string") return false;
            const parts = Number(value).toString().split(".");
            return parts.length === 1 || parts[1].length <= 2;
          }
        ),
      DonViNongDo: yup
        .string()
        .required("Yêu cầu nhập Đơn vị nồng độ")
        .max(50, "Đơn vị nồng độ nhập không quá 50 ký tự"),
      DieuKienBaoQuan: yup
        .string()
        .required("Yêu cầu nhập Điều kiện bảo quản")
        .max(200, "Điều kiện bảo quản nhập không quá 200 ký tự"),
      NgayHetHan: yup.string().required("Yêu cầu chọn Ngày hết hạn"),
      GhiChu: yup.string(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormPhuLieuHoaChat>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const TenDM_PLHC = useWatch({ control, name: "TenDM_PLHC" });

  const createPLHC = (data: FormPhuLieuHoaChat) => {
    const PhieuDangKy = {
      ...dataPhieuDangky,
      PLHC: [data, ...(dataPhieuDangky?.PLHC || [])],
    };
    settableBody(PhieuDangKy.PLHC);
    sessionStorage.setItem("PhieuDangKy", JSON.stringify(PhieuDangKy));
  };

  const editPLHC = (data: FormPhuLieuHoaChat) => {
    const index = dataPhieuDangky?.PLHC.findIndex(
      (item: any) => item.TenPLHC === dataEditPLHC?.TenPLHC
    );

    const updatedPLHC = [...dataPhieuDangky?.PLHC];

    if (index !== -1) {
      updatedPLHC[index] = data;
    } else {
      updatedPLHC.unshift(data);
    }

    const updatedPhieuDangky = {
      ...dataPhieuDangky,
      PLHC: updatedPLHC,
    };

    setDataEditPLHC(null);
    settableBody(updatedPhieuDangky.PLHC);
    sessionStorage.setItem("PhieuDangKy", JSON.stringify(updatedPhieuDangky));
  };

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  const handleXoaPLHC = () => {
    const data = tableBody.filter((item: any) => {
      return !listCheckbox.some(
        (subitem: any) => subitem.TenPLHC === item.TenPLHC
      );
    });
    const dataTest = sessionStorage.getItem("PhieuDangKy");
    const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;
    const PhieuDangKy = {
      ...dataPhieuDangky,
      PLHC: data,
    };

    sessionStorage.setItem("PhieuDangKy", JSON.stringify(PhieuDangKy));

    settableBody(data);
    setListCheckbox([]);
  };

  const handleGuiPhieu = () => {
    sessionStorage.setItem(
      "DataPhieuDangKy",
      JSON.stringify([dataPhieuDangky])
    );
    sessionStorage.removeItem("PhieuDangKy");
    handleClickOpenPopupNofitication?.();
  };

  useEffect(() => {
    if (dataEditPLHC)
      reset({
        TenDM_PLHC: dataEditPLHC?.TenDM_PLHC,
        TenPLHC: dataEditPLHC?.TenPLHC,
        TenHienThi: dataEditPLHC?.TenHienThi,
        SoLuong: dataEditPLHC?.SoLuong,
        DonViTinh: dataEditPLHC?.DonViTinh,
        SoLo: dataEditPLHC?.SoLo,
        TenNhaCungCap: dataEditPLHC?.TenNhaCungCap,
        NongDo: dataEditPLHC?.NongDo,
        DonViNongDo: dataEditPLHC?.DonViNongDo,
        NgayHetHan: dataEditPLHC?.NgayHetHan,
        DieuKienBaoQuan: dataEditPLHC?.DieuKienBaoQuan,
        GhiChu: dataEditPLHC?.GhiChu,
      });
    else
      reset({
        TenDM_PLHC: "",
        TenPLHC: "",
        TenHienThi: "",
        SoLuong: 0,
        DonViTinh: "",
        SoLo: "",
        TenNhaCungCap: "",
        NongDo: "",
        DonViNongDo: "",
        NgayHetHan: "",
        DieuKienBaoQuan: "",
        GhiChu: "",
      });
  }, [tableBody, dataEditPLHC]);

  useEffect(() => {
    const data = sessionStorage.getItem("PhieuDangKy");
    const dataTableBody = data ? JSON.parse(data).PLHC : [];

    if (valueSearch.trim()) {
      const search = valueSearch.trim().toLowerCase();
      const keywords = removeVietnameseTones(search).split(/\s+/);

      const filtered = dataTableBody.filter((item: any) => {
        const target = removeVietnameseTones(item.TenPLHC.toLowerCase());
        return keywords.every((keyword) => target.includes(keyword));
      });
      settableBody(filtered);
    } else {
      settableBody(dataTableBody);
    }
  }, [valueSearch]);

  useEffect(() => {
    if (TenDM_PLHC) {
      const matched = dataDM_PhuLieuHoaChat.find(
        (item) => item.TenDM_PLHC === TenDM_PLHC
      );

      if (matched) {
        reset((prev) => ({
          ...prev,
          TenHienThi: matched.TenHienThi || "",
          TenDM_PLHC: matched.TenDM_PLHC || "",
          DonViNongDo: matched.DonViNongDo || "",
          NongDo: matched.NongDo || "",
          DieuKienBaoQuan: matched.DieuKienBaoQuan || "",
        }));
      }
    }
  }, [TenDM_PLHC, dataDM_PhuLieuHoaChat]);

  return (
    <motion.div
      key="form-signup-dvkm-tag2"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box className="px-4 pt-6">
        <form
          autoComplete="off"
          onSubmit={
            dataEditPLHC ? handleSubmit(editPLHC) : handleSubmit(createPLHC)
          }
          className="grid gap-12"
        >
          <Box className="grid grid-cols-12 gap-1 lg:gap-[0px_24px]">
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <InputSelectDM_PLHC
                title="Tên danh mục Phụ Liệu Hóa Chất"
                name="TenDM_PLHC"
                control={control}
                data={dataDM_PLHC}
                placeholder="VD: axit sunfuric 5%,..."
                errorMessage={(errors.TenDM_PLHC as any)?.message}
              />
            </Box>
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Tên Phụ Liệu Hóa Chất"
                className="h-[42px]"
                placeholder="Nhập Tên Phụ Liệu Hóa Chất"
                name="TenPLHC"
                inputRef={register("TenPLHC")}
                errorMessage={errors.TenPLHC?.message}
              />
            </Box>
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Tên hiển thị"
                className="h-[42px]"
                placeholder="Nhập Tên hiển thị"
                name="TenHienThi"
                inputRef={register("TenHienThi")}
                errorMessage={errors.TenHienThi?.message}
              />
            </Box>
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Số Lượng"
                type="number"
                className="h-[42px]"
                name="SoLuong"
                inputRef={register("SoLuong")}
                errorMessage={errors.SoLuong?.message}
                placeholder="Nhập Số Lượng"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                  'input[type="number"]': {
                    "-moz-appearance": "textfield",
                  },
                  'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
                    {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                }}
              />
            </Box>
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Đơn Vị Tính"
                name="DonViTinh"
                inputRef={register("DonViTinh")}
                errorMessage={errors.DonViTinh?.message}
                className="h-[42px]"
                placeholder="Nhập Đơn Vị Tính"
              />
            </Box>
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Số lô"
                name="SoLo"
                inputRef={register("SoLo")}
                errorMessage={errors.SoLo?.message}
                className="h-[42px]"
                placeholder="Nhập Số lô"
              />
            </Box>
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Tên nhà cung cấp"
                name="TenNhaCungCap"
                inputRef={register("TenNhaCungCap")}
                errorMessage={errors.TenNhaCungCap?.message}
                className="h-[42px]"
                placeholder="Nhập Tên nhà cung cấp"
              />
            </Box>
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Nồng độ"
                name="NongDo"
                type="number"
                inputRef={register("NongDo")}
                errorMessage={errors.NongDo?.message}
                className="h-[42px]"
                placeholder="Nhập Nồng độ"
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
            <Box className="col-span-12 md:col-span-6 lg:col-span-4">
              <Inputs
                title="Đơn vị nồng độ"
                name="DonViNongDo"
                inputRef={register("DonViNongDo")}
                errorMessage={errors.DonViNongDo?.message}
                className="h-[42px]"
                placeholder="Nhập Đơn vị nồng độ"
              />
            </Box>
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Ngày hết hạn"
                type="date"
                name="NgayHetHan"
                inputRef={register("NgayHetHan")}
                errorMessage={errors.NgayHetHan?.message}
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
                title="Điều kiện bảo quản"
                name="DieuKienBaoQuan"
                inputRef={register("DieuKienBaoQuan")}
                errorMessage={errors.DieuKienBaoQuan?.message}
                className="h-[42px]"
                placeholder="Nhập Điều kiện bảo quản"
              />
            </Box>
            <Box className="col-span-12">
              <Textarea
                title="Ghi Chú"
                placeholder="Ghi Chú"
                name="GhiChu"
                className="h-[124px]"
                height="h-[156px]"
                inputRef={register("GhiChu")}
              />
            </Box>
          </Box>
          <Box className="gap-5 sm:gap-0 flex flex-wrap-reverse sm:flex-nowrap justify-end sm:justify-between items-center">
            <Box className="w-full sm:w-auto">
              <InputSearch
                placeholder="Tìm kiếm Tên phù liệu hóa chất..."
                square={true}
                width="w-full md:w-[284px]"
                setValue={setValueSearch}
              />
            </Box>
            <Box className="flex justify-between gap-6">
              {listCheckbox.length > 0 && (
                <button
                  onClick={handleXoaPLHC}
                  className="text-lg/6 font-bold text-center border border-solid border-red-500 text-red-500 px-4 py-1 lg:px-10 lg:py-2 hover:text-white rounded-md hover:bg-red-500 cursor-pointer"
                >
                  Xóa
                </button>
              )}

              {dataEditPLHC ? (
                <button className="text-lg/6 font-bold text-center border border-solid border-yellow-500 text-yellow-500 px-4 py-1 lg:px-10 lg:py-2 hover:text-white rounded-md hover:bg-yellow-500 cursor-pointer">
                  Sửa
                </button>
              ) : (
                <button className="text-lg/6 font-bold text-center border border-solid border-blue-500 text-blue-500 px-4 py-1 lg:px-10 lg:py-2 hover:text-white rounded-md hover:bg-blue-500 cursor-pointer">
                  Thêm
                </button>
              )}
            </Box>
          </Box>
        </form>
      </Box>
      <Box className="px-4 py-2">
        <TablePLHC
          tableHead={tableHead}
          setListCheckbox={setListCheckbox}
          listCheckbox={listCheckbox}
          tableBody={currentItems}
          setDataEditPLHC={setDataEditPLHC}
          dataEditPLHC={dataEditPLHC}
        />
      </Box>
      {tableBody?.length > 0 && (
        <Box className="px-4 py-2 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{
              '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
                {
                  backgroundColor: "#1976d21f",
                  border: "1px solid #1976d280",
                  color: "#1976d2",
                },
            }}
          />
        </Box>
      )}
      <Box
        className={`border-t border-solid border-gray-300 py-4 px-4 sm:px-12 flex justify-between`}
      >
        <motion.div
          key="btn_back"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="bg-amber-400  px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer hover:bg-amber-500 shadow-[inset_0_0_6px_rgba(0,0,0,0.2)] hover:shadow-none"
            onClick={handleRedirectTag2}
          >
            <span className="text-lg/6 font-bold text-amber-50">Quay lại</span>
          </button>
        </motion.div>

        <motion.div
          key="btn_next_2"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="bg-blue-500 px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer hover:bg-blue-600 shadow-[inset_0_0_6px_rgba(0,0,0,0.2)] hover:shadow-none"
            onClick={handleGuiPhieu}
          >
            <span className="text-lg/6 font-bold text-amber-50">Gửi</span>
          </button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default ListPLHC;
