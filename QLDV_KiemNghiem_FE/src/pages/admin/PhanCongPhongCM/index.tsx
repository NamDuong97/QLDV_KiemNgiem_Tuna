import { Box, Pagination } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ListMauPhanCong from "./ListMauPhanCong";
import InputSelectKhoa from "./InputSelectKhoa";
import yup from "../../../configs/yup.custom";
import { FormPhieuDeXuatPhongBan } from "../../../models/PhieuDeXuatPhongBan";
import { Inputs } from "../../../components/Inputs";
import { MdDoorBack } from "react-icons/md";
import InputSelectNVTiepNhan from "./InputSelectNVTiepNhan";
import TablePhanCongPhongCM from "./TablePhanCongPhongCM";
import { Align } from "../../../models/Table";
import PopupThoatForm from "./PopupThoatForm";
import PopupThongBaoGui from "./PopupThongBaoGui";

interface Props {}

const ListKhoa = [
  { maKhoa: "Khoa 1", tenKhoa: "Khoa Nội" },
  { maKhoa: "Khoa 2", tenKhoa: "Khoa Ngoại" },
];

const ListNhanVien = [
  { maNV: "NV001", tenNV: "Nhân viên 1" },
  { maNV: "NV002", tenNV: "Nhân viên 2" },
];

const tableHead = [
  {
    id: "tenKH",
    sort: false,
    label: "Tên khách hàng",
    align: Align.Left,
  },
  {
    id: "khoaTiepNhan",
    sort: false,
    label: "Khoa Tiếp Nhận",
    align: Align.Center,
  },
  {
    id: "maNV",
    sort: false,
    label: "Nhân viên tiếp nhận",
    align: Align.Center,
  },
  {
    id: "timeGiaoMau",
    sort: false,
    label: "Thời Gian Giao Mẫu",
    align: Align.Center,
  },
  {
    id: "lienketnhanh",
    sort: false,
    label: "Liên Kết Nhanh",
    align: Align.Center,
  },
];

const PhanCongPhongCM = (props: Props) => {
  const {} = props;
  const [isTag, setisTag] = useState(1);
  const [openPopupThoatForm, setOpenPopupThoatForm] = useState(false);
  const [openPopupThongBao, setOpenPopupThongBao] = useState(false);

  const handleClickOpenPopupThoatForm = () => {
    setOpenPopupThoatForm(true);
  };

  const handleClickOpenPopupThongBao = () => {
    setOpenPopupThongBao(true);
  };

  const handleClosePopupThoatForm = () => {
    setOpenPopupThoatForm(false);
  };

  const handleClosePopupThongBao = () => {
    setOpenPopupThongBao(false);
  };

  let schema = useMemo(() => {
    return yup.object().shape({
      tenKhachHang: yup.string().required("Tên khách hàng không được để trống"),
      khoaTiepNhan: yup.string().required("Yêu cầu chọn khoa chuyên môn"),
      manvDeXuat: yup
        .string()
        .required("Yêu cầu nhập Mã Nhân viên đề xuất")
        .max(50, "Mã nhân viên đề xuất không được quá 50 ký tự"),
      // .test("không tồn tại mã nhân viên", "Mã nhân viên không tồn tại", (value) => {})
      manvTiepNhan: yup
        .string()
        .required("Yêu cầu nhập Mã Nhân viên tiếp nhận")
        .max(50, "Mã nhân viên tiếp nhận không được quá 50 ký tự"),
      thoiGianGiaoMau: yup
        .string()
        .required("Yêu cầu chọn Thời Gian Giao Mẫu")
        .test(
          "Thời gian giao mẫu phải lớn hơn thời điểm hiện tại.",
          "Thời gian giao mẫu phải lớn hơn thời điểm hiện tại.",
          (value: any) => {
            const namHienTai = new Date().getFullYear();
            const ngayHienTai = new Date().getDate();
            const thangHienTai = new Date().getMonth() + 1;
            return value.split("-")[0] >= namHienTai &&
              value.split("-")[1] >= thangHienTai &&
              value.split("-")[2] > ngayHienTai
              ? true
              : false;
          }
        )
        .test(
          "Thời gian giao mẫu không được vượt quá 7 ngày",
          "Thời gian giao mẫu không được vượt quá 7 ngày",
          (value: any) => {
            const namHienTai = new Date().getFullYear();
            const ngayHienTai = new Date().getDate();
            const thangHienTai = new Date().getMonth() + 1;
            return value.split("-")[0] >= namHienTai &&
              value.split("-")[1] >= thangHienTai &&
              value.split("-")[2] <= ngayHienTai + 7
              ? true
              : false;
          }
        ),
      maus: yup
        .array()
        .typeError("Yêu cầu chọn Mẫu phân công")
        .required("Yêu cầu chọn Mẫu phân công")
        .test("Anh", "Yêu cầu chọn Mẫu phân công", (value) => {
          return value && value.length > 0;
        }),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormPhieuDeXuatPhongBan>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handlePhanCong = (data: FormPhieuDeXuatPhongBan) => {
    handleClickOpenPopupThongBao();
    console.log("data", data);
  };

  const handleTagPhanCong = () => {
    switch (isTag as number) {
      case 2:
        return (
          <Box className="sm:flex items-center overflow-x-auto whitespace-nowrap">
            <Box
              className="w-full px-2 py-4 text-center cursor-pointer border-b-[2px] border-gray-300 group hover:bg-gray-200 hover:rounded-tr hover:rounded-tl"
              onClick={() => setisTag(1)}
            >
              <p className="text-lg/4 font-semibold capitalize text-gray-700 group-hover:text-cyan-700">
                Thông tin Chi tiết Phân Công
              </p>
            </Box>
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-b-cyan-700 cursor-pointer hover:bg-gray-200 hover:rounded-tr hover:rounded-tl hover:transition-all hover:duration-200 hover:ease-in-out"
              onClick={() => setisTag(2)}
            >
              <p className="text-lg/4 font-semibold capitalize text-cyan-700">
                Danh sách Phân Công
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
                Thông tin Chi tiết Phân Công
              </p>
            </Box>
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-gray-300 cursor-pointer group hover:bg-gray-200 hover:rounded-tr hover:rounded-tl"
              onClick={() => setisTag(2)}
            >
              <p className="text-lg/4 font-semibold capitalize text-gray-700 group-hover:text-cyan-700">
                Danh sách Phân Công
              </p>
            </Box>
          </Box>
        );
    }
  };

  const handleShowTagPhanCong = () => {
    switch (isTag as number) {
      case 2:
        return (
          <Box className="py-4">
            {/* {listCheckbox.length > 0 && ( */}
            <Box className="flex justify-start items-center mb-2">
              <button
                // onClick={handleXoaPLHC}
                className="text-lg/6 font-bold text-center border border-solid border-red-500 text-red-500 px-4 py-1 lg:px-10 lg:py-2 hover:text-white rounded-md hover:bg-red-500 cursor-pointer"
              >
                Xóa
              </button>
            </Box>
            {/* )} */}
            <Box className="py-2">
              <TablePhanCongPhongCM
                tableHead={tableHead}
                // setListCheckbox={setListCheckbox}
                // listCheckbox={listCheckbox}
                // tableBody={currentItems}
                // setDataEditPLHC={setDataEditPLHC}
                // dataEditPLHC={dataEditPLHC}
                // setDataCopyPLHC={setDataCopyPLHC}
                // dataCopyPLHC={dataCopyPLHC}
                // handleRedirectTag1={() => setisTag(1)}
              />
            </Box>
            {/* {tableBody?.length > 0 && ( */}
            <Box className="px-4 py-2 flex justify-center">
              <Pagination
                count={5}
                // page={currentPage}
                // onChange={handlePageChange}
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
            {/* )} */}
          </Box>
        );

      default:
        return (
          <form onSubmit={handleSubmit(handlePhanCong)} className="grid gap-4">
            <div className="flex justify-end">
              <button className="font-bold text-center text-white bg-cyan-700 border-[2px] border-solid border-gray-300 px-10 py-2 rounded-md hover:bg-cyan-800 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                Phân Công
              </button>
            </div>
            <hr className="text-gray-300" />
            <Box className="pb-6">
              <div className="grid grid-cols-6 gap-[0_20px]">
                <div className="col-span-2">
                  <Inputs
                    title="Tên Khách Hàng"
                    inputRef={register("tenKhachHang")}
                    errorMessage={errors.tenKhachHang?.message}
                    name="tenKhachHang"
                    disabled
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <InputSelectKhoa
                    title="Khoa Tiếp Nhận"
                    name="khoaTiepNhan"
                    control={control}
                    data={ListKhoa}
                    errorMessage={errors.khoaTiepNhan?.message}
                    placeholder="Chọn Khoa Chuyên Môn"
                  />
                </div>
                <div className="col-span-2">
                  <Inputs
                    title="Mã Nhân Viên Đề Xuất"
                    inputRef={register("manvDeXuat")}
                    name="manvDeXuat"
                    errorMessage={errors.manvDeXuat?.message}
                    placeholder="Nhập Mã Nhân Viên Đề Xuất"
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <div className="col-span-3">
                  <InputSelectNVTiepNhan
                    title="Nhân Viên Tiếp Nhận"
                    control={control}
                    name="manvTiepNhan"
                    data={ListNhanVien}
                    errorMessage={errors.manvTiepNhan?.message}
                    placeholder="Nhập Mã Nhân Viên Tiếp Nhận"
                  />
                </div>
                <div className="col-span-3">
                  <Inputs
                    type="date"
                    title="Thời Gian Giao Mẫu"
                    inputRef={register("thoiGianGiaoMau")}
                    name="thoiGianGiaoMau"
                    errorMessage={errors.thoiGianGiaoMau?.message}
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <div className="col-span-6 pt-10">
                  <ListMauPhanCong errorsMessage={errors.maus?.message} />
                </div>
              </div>
            </Box>
          </form>
        );
    }
  };

  useEffect(() => {
    reset({
      tenKhachHang: "KH001",
      khoaTiepNhan: "",
      manvDeXuat: "",
      manvTiepNhan: "",
      thoiGianGiaoMau: "",
      maus: [],
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="PhanCongPhongCM"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="px-10 py-20 grid gap-4"
      >
        <div className="flex justify-between items-center bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Box className="flex items-center gap-2 sm:gap-4 ">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
              onClick={handleClickOpenPopupThoatForm}
            >
              <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
            </button>
            <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
              Phân Công Phòng chuyên môn
            </h1>
          </Box>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClickOpenPopupThongBao}
              className="px-6 py-3 text-base/4 font-medium bg-[#0099f8] text-white hover:bg-blue-500 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              Gửi
            </button>
          </div>
        </div>
        <Box className="grid gap-4 border-[2px] border-cyan-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-6 rounded-2xl">
          {handleTagPhanCong()}
          {handleShowTagPhanCong()}
        </Box>
      </motion.div>
      <PopupThoatForm
        open={openPopupThoatForm}
        handleClose={handleClosePopupThoatForm}
      />
      <PopupThongBaoGui
        open={openPopupThongBao}
        handleClose={handleClosePopupThongBao}
      />
    </AnimatePresence>
  );
};

export default PhanCongPhongCM;
