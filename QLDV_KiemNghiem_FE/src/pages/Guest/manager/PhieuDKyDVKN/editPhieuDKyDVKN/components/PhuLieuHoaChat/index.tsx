import { Box, Pagination } from "@mui/material";
import { motion } from "motion/react";
import { Align } from "../../../../../../../models/Table";
import TablePLHC from "./TablePLHC";
import { Dispatch, useContext, useEffect, useMemo, useState } from "react";
import yup from "../../../../../../../configs/yup.custom";
import { FormPhuLieuHoaChat } from "../../../../../../../models/PhuLieuHoaChat";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "../../../../../../../components/Textarea";
import { Inputs } from "../../../../../../../components/Inputs";
import InputSelectDM_PLHC from "./InputSelectDM_PLHC";
import {
  useCreateDmPhuLieuHoaChat,
  useGetDmPhuLieuHoaChatAll,
} from "../../../../../../../hooks/customers/usePhieuDKyDVKN";
import InputSelectDonViTinhPLHC from "./InputSelectDonViTinhPLHC";
import { DonViTinh } from "../Maus/FormThongTinMau";
import { useQueryClient } from "@tanstack/react-query";
import { StoreContext } from "../../../../../../../contexts/storeProvider";
import {
  formatDateNotTime2,
} from "../../../../../../../configs/configAll";

interface PhuLieuHoaChatProps {
  setData: Dispatch<any>;
}

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
  {
    id: "chucNang",
    sort: false,
    label: "Chức Năng",
    align: Align.Center,
  },
];

const PhuLieuHoaChat = (props: PhuLieuHoaChatProps) => {
  const { setData } = props;

  const { userInfo } = useContext(StoreContext);
  const dataTest = sessionStorage.getItem("sua-phieuDky");
  const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;
  const [isTag, setisTag] = useState(2);

  const [tableBody, settableBody] = useState(() => {
    return dataTest ? JSON.parse(dataTest).phieuDangKyPhuLieuHoaChats : [];
  });

  const [listCheckbox, setListCheckbox] = useState<any[]>([]);
  const [dataEditPLHC, setDataEditPLHC] = useState<any>();
  const [dataCopyPLHC, setDataCopyPLHC] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableBody?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableBody && tableBody.length / itemsPerPage);

  const { data: dataDM_PhuLieuHoaChat } = useGetDmPhuLieuHoaChatAll({
    queryKey: "DmPhuLieuHoaChatAll",
  });

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
        .max(100, "Số lượng nhập phải nhỏ hơn hoặc bằng 100")
        .min(0, "Yêu cầu nhập số nguyên lớn hơn 0"),
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
        }),
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
  const nongDo = useWatch({ control, name: "NongDo" });
  const donViNongDo = useWatch({ control, name: "DonViNongDo" });
  const TenHienThi = `${TenDM_PLHC} ${nongDo + donViNongDo}`;
  const queryClient = useQueryClient();

  const handleOnSettled = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["DmPhuLieuHoaChatAll"],
    });
  };

  const { mutate } = useCreateDmPhuLieuHoaChat({
    queryKey: "DmPhuLieuHoaChat",
    onSettled: handleOnSettled,
  });

  const createPLHC = (data: FormPhuLieuHoaChat) => {
    const maplhc = dataDM_PhuLieuHoaChat.find(
      (item: any) => item.maDmPlhc === data?.TenDM_PLHC
    ).maId;
    const datatest = dataDM_PhuLieuHoaChat.some(
      (item: any) =>
        item.tenHienThi?.trim().toLowerCase() ===
        data.TenHienThi?.trim().toLowerCase()
    );
    if (!datatest) {
      mutate({
        tenDmPlhc: data.TenDM_PLHC,
        trangThai: true,
        tenHienThi: data.TenHienThi,
        nongDo: data.NongDo,
        donViNongDo: data.DonViNongDo,
        dieuKienBaoQuan: data.DieuKienBaoQuan,
      });
    }

    const dataPLHC = {
      maId: "",
      maPhieuDangKy: "",
      maPlhc: maplhc,
      tenPlhc: data.TenPLHC,
      tenHienThi: data.TenHienThi,
      soLuong: data.SoLuong,
      donViTinh: data.DonViTinh,
      ghiChu: data.GhiChu,
      ngayHetHan: data.NgayHetHan,
      tenNhaCungCap: data.TenNhaCungCap,
      nongDo: data.NongDo,
      donViNongDo: data.DonViNongDo,
      dieuKienBaoQuan: data.DieuKienBaoQuan,
      soLo: data.SoLo,
      nguoiTao: userInfo?.maKh,
      nguoiSua: "",
      ngayTao: "",
      ngaySua: "",
    };

    const PhieuDangKy = {
      ...dataPhieuDangky,
      phieuDangKyPhuLieuHoaChats: [
        dataPLHC,
        ...(dataPhieuDangky?.phieuDangKyPhuLieuHoaChats || []),
      ],
    };
    setData(PhieuDangKy);
    settableBody(PhieuDangKy.phieuDangKyPhuLieuHoaChats);
    setDataCopyPLHC(null);
    sessionStorage.setItem("sua-phieuDky", JSON.stringify(PhieuDangKy));
    setisTag(2);
  };

  const editPLHC = (data: FormPhuLieuHoaChat) => {
    const index = dataPhieuDangky?.phieuDangKyPhuLieuHoaChats?.findIndex(
      (item: any) => item.tenPlhc === dataEditPLHC?.tenPlhc
    );
    const updatedPLHC = [...dataPhieuDangky?.phieuDangKyPhuLieuHoaChats];
    const maplhc = dataDM_PhuLieuHoaChat.find(
      (item: any) => item.tenDmPlhc === data.TenDM_PLHC
    )?.maId;
    console.log("dataEditPLHC", dataEditPLHC);
    console.log(
      " dataPhieuDangky?.phieuDangKyPhuLieuHoaChats",
      dataPhieuDangky?.phieuDangKyPhuLieuHoaChats
    );

    const isPLHC = dataPhieuDangky?.phieuDangKyPhuLieuHoaChats.some(
      (item: any) => item?.maId === dataEditPLHC?.maId && item?.maId !== ""
    );

    var dataPLHC: any = {
      maId: dataEditPLHC?.maId ?? "",
      maPhieuDangKy: "",
      maPlhc: maplhc,
      tenPlhc: data.TenPLHC,
      tenHienThi: data.TenHienThi,
      soLuong: data.SoLuong,
      donViTinh: data.DonViTinh,
      ghiChu: data.GhiChu,
      ngayHetHan: data.NgayHetHan,
      tenNhaCungCap: data.TenNhaCungCap,
      nongDo: data.NongDo,
      donViNongDo: data.DonViNongDo,
      dieuKienBaoQuan: data.DieuKienBaoQuan,
      soLo: data.SoLo,
      nguoiTao: userInfo?.maKh,
      nguoiSua: "",
      ngayTao: "",
      ngaySua: "",
    };
    if (isPLHC) {
      dataPLHC = {
        ...dataPLHC,
        isDel: false,
      };
    } else {
      dataPLHC = {
        ...dataPLHC,
      };
    }

    if (index !== -1) {
      updatedPLHC[index] = dataPLHC;
    } else {
      updatedPLHC.unshift(dataPLHC);
    }

    const updatedPhieuDangky = {
      ...dataPhieuDangky,
      phieuDangKyPhuLieuHoaChats: updatedPLHC,
    };
    setData(updatedPhieuDangky);
    setDataEditPLHC(null);
    settableBody(updatedPhieuDangky.phieuDangKyPhuLieuHoaChats);
    sessionStorage.setItem("sua-phieuDky", JSON.stringify(updatedPhieuDangky));
    setisTag(2);
  };

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const pushIfNotExist = (arr: any[], item: any) => {
    const exists = arr.some((x) => x.tenPlhc === item.tenPlhc);
    if (!exists) {
      arr.push(item);
    }
  };

  const handleXoaPLHC = () => {
    const data = tableBody.filter((item: any) => {
      return listCheckbox.some(
        (subitem: any) => subitem.tenPlhc === item.tenPlhc
      );
    });
    const dataNotRemove = tableBody.filter((item: any) => {
      return !listCheckbox.some(
        (subitem: any) => subitem.tenPlhc === item.tenPlhc
      );
    });
    let dataFinal: any = [];

    data.map((item: any) => {
      if (item.isDel !== undefined && item.isDel !== null) {
        pushIfNotExist(dataFinal, {
          maId: item.maId,
          maPhieuDangKy: item.maPhieuDangKy,
          maPlhc: item.maPlhc,
          tenPlhc: item.tenPlhc,
          tenHienThi: item.tenHienThi,
          soLuong: item.soLuong,
          donViTinh: item.donViTinh,
          ghiChu: item.ghiChu,
          ngayHetHan: item.ngayHetHan,
          tenNhaCungCap: item.tenNhaCungCap,
          nongDo: item.nongDo,
          donViNongDo: item.donViNongDo,
          dieuKienBaoQuan: item.dieuKienBaoQuan,
          soLo: item.soLo,
          nguoiTao: item.nguoiTao,
          nguoiSua: item.nguoiSua,
          ngayTao: item.ngayTao,
          ngaySua: item.ngaySua,
          isDel: true,
        });

        dataNotRemove.map((item: any) =>
          item.isDel !== undefined && item.isDel !== null
            ? pushIfNotExist(dataFinal, {
                maId: item.maId,
                maPhieuDangKy: item.maPhieuDangKy,
                maPlhc: item.maPlhc,
                tenPlhc: item.tenPlhc,
                tenHienThi: item.tenHienThi,
                soLuong: item.soLuong,
                donViTinh: item.donViTinh,
                ghiChu: item.ghiChu,
                ngayHetHan: item.ngayHetHan,
                tenNhaCungCap: item.tenNhaCungCap,
                nongDo: item.nongDo,
                donViNongDo: item.donViNongDo,
                dieuKienBaoQuan: item.dieuKienBaoQuan,
                soLo: item.soLo,
                nguoiTao: item.nguoiTao,
                nguoiSua: item.nguoiSua,
                ngayTao: item.ngayTao,
                ngaySua: item.ngaySua,
                isDel: item.isDel,
              })
            : pushIfNotExist(dataFinal, {
                maId: item.maId,
                maPhieuDangKy: item.maPhieuDangKy,
                maPlhc: item.maPlhc,
                tenPlhc: item.tenPlhc,
                tenHienThi: item.tenHienThi,
                soLuong: item.soLuong,
                donViTinh: item.donViTinh,
                ghiChu: item.ghiChu,
                ngayHetHan: item.ngayHetHan,
                tenNhaCungCap: item.tenNhaCungCap,
                nongDo: item.nongDo,
                donViNongDo: item.donViNongDo,
                dieuKienBaoQuan: item.dieuKienBaoQuan,
                soLo: item.soLo,
                nguoiTao: item.nguoiTao,
                nguoiSua: item.nguoiSua,
                ngayTao: item.ngayTao,
                ngaySua: item.ngaySua,
              })
        );
      } else {
        dataNotRemove.map((item: any) =>
          pushIfNotExist(dataFinal, {
            maId: item.maId,
            maPhieuDangKy: item.maPhieuDangKy,
            maPlhc: item.maPlhc,
            tenPlhc: item.tenPlhc,
            tenHienThi: item.tenHienThi,
            soLuong: item.soLuong,
            donViTinh: item.donViTinh,
            ghiChu: item.ghiChu,
            ngayHetHan: item.ngayHetHan,
            tenNhaCungCap: item.tenNhaCungCap,
            nongDo: item.nongDo,
            donViNongDo: item.donViNongDo,
            dieuKienBaoQuan: item.dieuKienBaoQuan,
            soLo: item.soLo,
            nguoiTao: item.nguoiTao,
            nguoiSua: item.nguoiSua,
            ngayTao: item.ngayTao,
            ngaySua: item.ngaySua,
            isDel: item.isDel,
          })
        );
      }
    });
    const dataTest = sessionStorage.getItem("sua-phieuDky");
    const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;
    const PhieuDangKy = {
      ...dataPhieuDangky,
      phieuDangKyPhuLieuHoaChats: dataFinal,
    };
    setData(PhieuDangKy);
    sessionStorage.setItem("sua-phieuDky", JSON.stringify(PhieuDangKy));

    settableBody(dataFinal);
    setListCheckbox([]);
  };

  const handleTagPLHC = () => {
    switch (isTag as number) {
      case 2:
        return (
          <Box className="sm:flex items-center overflow-x-auto whitespace-nowrap">
            <Box
              className="w-full px-2 py-4 text-center cursor-pointer border-b-[2px] border-gray-300 group hover:bg-gray-200 hover:rounded-tr hover:rounded-tl"
              onClick={() => setisTag(1)}
            >
              <p className="text-lg/4 font-semibold capitalize text-gray-700 group-hover:text-cyan-700">
                Thông tin Chi tiết Phụ Liệu Hóa Chất
              </p>
            </Box>
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-b-cyan-700 cursor-pointer hover:bg-gray-200 hover:rounded-tr hover:rounded-tl hover:transition-all hover:duration-200 hover:ease-in-out"
              onClick={() => setisTag(2)}
            >
              <p className="text-lg/4 font-semibold capitalize text-cyan-700">
                Danh sách Phụ Liệu Hóa Chất gửi
              </p>
            </Box>
          </Box>
        );
      default:
        return (
          <Box className="sm:flex items-center overflow-x-auto whitespace-nowrap">
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-b-cyan-700 cursor-pointer hover:bg-gray-200 hover:rounded-tr hover:rounded-tl hover:transition-all hover:duration-200 hover:ease-in-out"
              onClick={() => setisTag(1)}
            >
              <p className="text-lg/4 font-semibold capitalize text-cyan-700">
                Thông tin Chi tiết Phụ Liệu Hóa Chất
              </p>
            </Box>
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-gray-300 cursor-pointer group hover:bg-gray-200 hover:rounded-tr hover:rounded-tl"
              onClick={() => setisTag(2)}
            >
              <p className="text-lg/4 font-semibold capitalize text-gray-700 group-hover:text-cyan-700">
                Danh sách Phụ Liệu Hóa Chất gửi
              </p>
            </Box>
          </Box>
        );
    }
  };

  const handleShowTagPLHC = () => {
    switch (isTag as number) {
      case 2:
        return (
          <Box className="py-4">
            {listCheckbox.length > 0 && (
              <Box className="flex justify-end items-center mb-2">
                <button
                  onClick={handleXoaPLHC}
                  className="text-lg/6 font-bold text-center border border-solid border-red-500 text-red-500 px-4 py-1 lg:px-10 lg:py-2 hover:text-white rounded-md hover:bg-red-500 cursor-pointer"
                >
                  Xóa
                </button>
              </Box>
            )}
            <Box className="py-2">
              <TablePLHC
                tableHead={tableHead}
                setListCheckbox={setListCheckbox}
                listCheckbox={listCheckbox}
                tableBody={currentItems}
                setDataEditPLHC={setDataEditPLHC}
                dataEditPLHC={dataEditPLHC}
                setDataCopyPLHC={setDataCopyPLHC}
                dataCopyPLHC={dataCopyPLHC}
                handleRedirectTag1={() => setisTag(1)}
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
          </Box>
        );

      default:
        return (
          <Box className="pt-4">
            <form autoComplete="off" className="grid gap-4">
              <Box className="grid grid-cols-12 gap-1 lg:gap-[0px_24px]">
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputSelectDM_PLHC
                    title="Tên danh mục phụ liệu hóa chất"
                    name="TenDM_PLHC"
                    control={control}
                    data={dataDM_PhuLieuHoaChat}
                    placeholder="VD: axit sunfuric 5%,..."
                    errorMessage={(errors.TenDM_PLHC as any)?.message}
                  />
                </Box>
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                  <Inputs
                    title="Tên phụ liệu hóa chất"
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
                    disabled
                    sx={{
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                    errorMessage={errors.TenHienThi?.message}
                  />
                </Box>
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                  <Inputs
                    title="Số lượng"
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
                        MozAppearance: "textfield",
                      },
                      'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />
                </Box>
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputSelectDonViTinhPLHC
                    title="Đơn vị tính"
                    name="DonViTinh"
                    control={control}
                    data={DonViTinh}
                    placeholder="Nhập phù liệu hóa chất"
                    errorMessage={errors.DonViTinh?.message}
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
                    disabled
                    sx={{
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                      input: {
                        padding: "9.5px 14px",
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
                    disabled
                    sx={{
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                      input: {
                        padding: "9.5px 14px",
                      },
                    }}
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
                    disabled
                    placeholder="Nhập Điều kiện bảo quản"
                    sx={{
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                </Box>
                <Box className="col-span-12">
                  <Textarea
                    title="Ghi chú"
                    placeholder="Ghi Chú"
                    name="GhiChu"
                    className="h-[124px]"
                    height="h-[156px]"
                    inputRef={register("GhiChu")}
                  />
                </Box>
              </Box>
              <hr className="text-gray-300" />
              <Box className="gap-5 sm:gap-0 flex flex-wrap-reverse sm:flex-nowrap justify-end items-center">
                {dataEditPLHC ? (
                  <button
                    type="button"
                    onClick={handleSubmit(editPLHC)}
                    className="w-full text-lg/6 font-bold text-center bg-yellow-500 text-white border-[2px] border-solid border-gray-300 px-10 py-2 rounded-md hover:bg-yellow-600 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                  >
                    Sửa
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit(createPLHC)}
                    className="w-full text-lg/6 font-bold text-center bg-cyan-800 text-white border-[2px] border-solid border-gray-300 px-10 py-2 rounded-md hover:bg-cyan-700 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                  >
                    Thêm
                  </button>
                )}
              </Box>
            </form>
          </Box>
        );
    }
  };

  useEffect(() => {
    if (dataEditPLHC || dataCopyPLHC) {
      const tenDmPlhc = dataDM_PhuLieuHoaChat.find(
        (item: any) =>
          item.maId === dataEditPLHC?.maPlhc ||
          item.maId === dataCopyPLHC?.maPlhc
      ).tenDmPlhc;
      reset({
        TenDM_PLHC: tenDmPlhc,
        TenPLHC: dataEditPLHC?.tenPlhc || dataCopyPLHC?.tenPlhc,
        TenHienThi: dataEditPLHC?.tenHienThi || dataCopyPLHC?.tenHienThi,
        SoLuong: dataEditPLHC?.soLuong || dataCopyPLHC?.soLuong,
        DonViTinh: dataEditPLHC?.donViTinh || dataCopyPLHC?.donViTinh,
        SoLo: dataEditPLHC?.soLo || dataCopyPLHC?.soLo,
        TenNhaCungCap:
          dataEditPLHC?.tenNhaCungCap || dataCopyPLHC?.tenNhaCungCap,
        NongDo: dataEditPLHC?.nongDo || dataCopyPLHC?.nongDo,
        DonViNongDo: dataEditPLHC?.donViNongDo || dataCopyPLHC?.donViNongDo,
        NgayHetHan:
          formatDateNotTime2(dataEditPLHC?.ngayHetHan) ||
          formatDateNotTime2(dataCopyPLHC?.ngayHetHan),
        DieuKienBaoQuan:
          dataEditPLHC?.dieuKienBaoQuan || dataCopyPLHC?.dieuKienBaoQuan,
        GhiChu: dataEditPLHC?.ghiChu || dataCopyPLHC?.ghiChu,
      });
    } else
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
  }, [tableBody, dataEditPLHC, dataCopyPLHC]);

  useEffect(() => {
    if (TenDM_PLHC) {
      const matched = dataDM_PhuLieuHoaChat.find(
        (item: any) => item.tenDmPlhc === TenDM_PLHC
      );
      if (matched) {
        reset((prev) => ({
          ...prev,
          TenHienThi: matched.tenHienThi || "",
          TenDM_PLHC: matched.maDmPlhc || "",
          TenPLHC: matched.tenDmPlhc || "",
          DonViNongDo: matched.donViNongDo || "",
          NongDo: matched.nongDo || "",
          DieuKienBaoQuan: matched.dieuKienBaoQuan || "",
        }));
      }
    }
    if (TenHienThi) {
      reset((prev) => ({
        ...prev,
        TenHienThi: TenHienThi || "",
      }));
    }
  }, [TenDM_PLHC, dataDM_PhuLieuHoaChat, TenHienThi]);

  return (
    <motion.div
      key="PhuLieuHoaChat"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-300 rounded-br-[6px] rounded-bl-[6px] py-4 px-4 sm:px-12"
    >
      {handleTagPLHC()}
      {handleShowTagPLHC()}
    </motion.div>
  );
};

export default PhuLieuHoaChat;
