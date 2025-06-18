import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Inputs } from "../../../../components/Inputs";
import DetailMaus from "./Detail-Maus";
import DetailPLHCs from "./Detail-PLHC";
import PopupHuyPhieu from "./PopupHuyPhieu";
import PopupDuyetBo from "./PopupDuyetBo";
import PopupTuChoiPhongKHDT from "./PopupTuChoiPhongKHDT";
import { APP_ROUTES } from "../../../../constants/routers";
import { MdDoorBack } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdScience } from "react-icons/md";
import {
  useDanhGiaBLD,
  useDanhGiaNhanVien,
  xemChitietPhieuDKKM,
} from "../../../../hooks/personnels/quanLyPhieuDKKM";
import { queryClient } from "../../../../lib/reactQuery";
import { PersonnelContext } from "../../../../contexts/PersonelsProvider";

const ChiTietPhieuDKyDVKN = () => {
  const [isTag, setIsTag] = useState(1);
  const { personnelInfo } = useContext(PersonnelContext);
  const dataSession = sessionStorage.getItem("phieu-DKKN-xem-chi-tiet");
  const id = dataSession ? JSON.parse(dataSession) : "";
  const { data, isLoading } = xemChitietPhieuDKKM({
    queryKey: "xemChitietPhieuDKKM",
    params: id,
  });

  const handleOnSettled = async () => {
    await queryClient.refetchQueries({
      queryKey: ["quanLyPhieuDKKM"],
    });
  };

  const { mutate: mutateBLD } = useDanhGiaBLD({
    queryKey: "useDanhGiaBLD",
    onSettled: handleOnSettled,
  });

  const { mutate: mutateNhanVien } = useDanhGiaNhanVien({
    queryKey: "DanhGiaNhanVienDuyet",
    onSettled: handleOnSettled,
  });

  const [openPopupHuyPhieu, setOpenPopupHuyPhieu] = useState(false);
  const [openPopupDuyetBo, setOpenPopupDuyetBo] = useState(false);
  const [openPopupTuChoiPhongKHDT, setOpenPopupTuChoiPhongKHDT] =
    useState(false);
  const navigate = useNavigate();

  const handleClickOpenPopupHuyPhieu = () => {
    setOpenPopupHuyPhieu(true);
  };

  const handleClickOpenPopupDuyetBo = () => {
    setOpenPopupDuyetBo(true);
  };

  const handleClickOpenPopupTuChoiPhongKHDT = () => {
    setOpenPopupTuChoiPhongKHDT(true);
  };

  const handleClosePopupDuyetBo = () => {
    setOpenPopupDuyetBo(false);
  };

  const handleClosePopupHuyPhieu = () => {
    setOpenPopupHuyPhieu(false);
  };

  const handleClosePopupTuChoiPhongKHDT = () => {
    setOpenPopupTuChoiPhongKHDT(false);
  };

  const handleDuyetSoBoNhanVien = () => {
    const params = {
      maPhieuDangKy: id,
      message: "",
      action: true,
    };
    mutateNhanVien(params);
    handleClickOpenPopupDuyetBo();
  };

  const handleBLDDuyet = () => {
    const params = {
      maPhieuDangKy: id,
      message: "",
      action: true,
    };
    mutateBLD(params);
    handleClickOpenPopupDuyetBo();
  };

  const handleShowByUserName = () => {
    switch (personnelInfo?.maLoaiTk as string) {
      case "KHTH": {
        switch (data?.trangThaiId as string) {
          case "TT01":
            return (
              <div className="flex justify-between items-center">
                <Box className="flex items-center gap-2 sm:gap-4">
                  <button
                    className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
                    onClick={() =>
                      navigate(
                        APP_ROUTES.TUNA_ADMIN
                          .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                      )
                    }
                  >
                    <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
                  </button>
                  <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
                    Số ĐKPT:{data?.soDkpt}
                  </h1>
                </Box>
                <div className="flex gap-4">
                  <button
                    onClick={handleClickOpenPopupHuyPhieu}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-yellow-400 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-yellow-500 cursor-pointer"
                  >
                    Từ chối tiếp nhận
                  </button>
                  <button
                    onClick={handleDuyetSoBoNhanVien}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-blue-500 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-blue-600 cursor-pointer"
                  >
                    Duyệt sơ bộ
                  </button>
                </div>
              </div>
            );
          case "TT02":
            return (
              <div className="flex justify-between items-center">
                <Box className="flex items-center gap-2 sm:gap-4">
                  <button
                    className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
                    onClick={() =>
                      navigate(
                        APP_ROUTES.TUNA_ADMIN
                          .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                      )
                    }
                  >
                    <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
                  </button>
                  <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
                    Số ĐKPT: {data?.soDkpt}
                  </h1>
                </Box>
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      navigate(
                        APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.to,
                        {
                          state:
                            APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.to,
                        }
                      )
                    }
                    className="px-6 py-3 text-base/4 font-medium bg-teal-600 text-white hover:bg-teal-700 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
                  >
                    Phân Công Phòng Chuyên Môn
                  </button>
                </div>
              </div>
            );
          default:
            return (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl/6 font-bold text-white">
                    {data?.soDkpt}
                  </p>
                </div>
              </div>
            );
        }
      }
      case "BLD": {
        switch (data?.trangThaiId as string) {
          case "TT02":
            return (
              <div className="flex justify-between items-center">
                <Box className="flex items-center gap-2 sm:gap-4">
                  <button
                    className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
                    onClick={() =>
                      navigate(
                        APP_ROUTES.TUNA_ADMIN
                          .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                      )
                    }
                  >
                    <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
                  </button>
                  <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
                    Số ĐKPT:{data?.soDkpt}
                  </h1>
                </Box>
                <div className="flex gap-4">
                  <button
                    onClick={handleClickOpenPopupTuChoiPhongKHDT}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-green-400 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-green-500 cursor-pointer"
                  >
                    Thông báo từ chối
                  </button>
                  <button
                    onClick={handleClickOpenPopupHuyPhieu}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-yellow-400 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-yellow-500 cursor-pointer"
                  >
                    Từ chối tiếp nhận
                  </button>
                  <button
                    onClick={handleBLDDuyet}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-blue-500 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-blue-600 cursor-pointer"
                  >
                    Phê duyệt
                  </button>
                </div>
              </div>
            );
          default:
            return (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl/6 font-bold text-white">
                    {data?.soDkpt}
                  </p>
                </div>
              </div>
            );
        }
      }
    }
  };

  const handleTag = () => {
    switch (isTag) {
      case 2: {
        return (
          <div className="px-1 py-1 bg-[#e9ecf1] flex gap-4 justify-between rounded-[8px] ">
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />{" "}
                Thông Tin Chung
              </p>
            </div>

            <div
              className="flex items-center justify-center py-2 border border-solid border-gray-300 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdScience className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-orange-300" />
                Phụ Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
      case 3: {
        return (
          <div className="px-1 py-1 bg-[#e9ecf1] flex gap-4 justify-between rounded-[8px] ">
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />{" "}
                Thông Tin Chung
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu
              </p>
            </div>

            <div
              className="flex items-center justify-center py-2 border border-solid border-gray-300 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 font-bold flex gap-2 items-center leading-6">
                <MdScience className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-orange-300" />
                Phụ Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className="px-1 py-1 bg-[#e9ecf1] flex gap-4 justify-between rounded-[8px] ">
            <div
              className="flex items-center justify-center py-2 border border-solid border-gray-300 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />
                Thông Tin Chung
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />
                Mẫu
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-base/6 sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdScience className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-orange-300" />{" "}
                Phụ Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
    }
  };

  const handleShowByTag = () => {
    switch (isTag) {
      case 2: {
        return <DetailMaus dataMaus={data?.maus} isLoading={isLoading} />;
      }
      case 3: {
        return (
          <DetailPLHCs
            dataPLHC={data?.phieuDangKyPhuLieuHoaChats}
            isLoading={isLoading}
          />
        );
      }
      default: {
        return (
          <motion.div
            key="form-signup-thongtinchung"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-gray-300 rounded-xl"
          >
            <Box className="p-5 grid grid-cols-12 gap-1 md:gap-[0px_24px]">
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Người gửi mẫu"
                  className="h-[42px]"
                  name="NguoiGuiMau"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.nguoiGuiMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Đơn vị gửi mẫu"
                  className="h-[42px]"
                  name="DonViGuiMau"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.donViGuiMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Email"
                  name="Email"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.email}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Số điện thoại"
                  className="h-[42px]"
                  name="SoDienThoai"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.soDienThoai}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Hình thức gửi mẫu"
                  name="HinhThucGuiMau"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.hinhThucGuiMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Hình thức trả kết quả"
                  name="HinhThucTraKQ"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.hinhThucTraKq}
                />
              </Box>
              {data?.diaChiGiaoMau && (
                <Box className="col-span-12">
                  <Inputs
                    title="Địa chỉ giao mẫu"
                    name="DiaChiGiaoMau"
                    className="h-[42px]"
                    sx={{
                      input: {
                        padding: "9.5px 14px",
                      },
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "black !important",
                      },
                    }}
                    disabled
                    defaultValue={data?.diaChiGiaoMau}
                  />
                </Box>
              )}
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Ngày giao mẫu"
                  name="NgayGiaoMau"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.ngayGiaoMau.split("T")[0]}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Địa chỉ liên hệ"
                  name="DiaChiLienHe"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={data?.diaChiLienHe}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Kết quả"
                  name="ketQuaTiengAnh"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  defaultValue={
                    data?.ketQuaTiengAnh ? "Tiếng Anh" : "Tiếng Việt"
                  }
                />
              </Box>
            </Box>
          </motion.div>
        );
      }
    }
  };

  return (
    <motion.div
      key="QuanLyPhieuDKyDVHN"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 py-20 grid gap-4"
    >
      <Box className="bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {handleShowByUserName()}
      </Box>
      <div className="grid gap-2 p-6 rounded-2xl border-[2px] border-cyan-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {handleTag()}
        {handleShowByTag()}
      </div>
      <PopupHuyPhieu
        open={openPopupHuyPhieu}
        handleClose={handleClosePopupHuyPhieu}
        id={id}
        roll={personnelInfo?.maLoaiTk}
      />
      <PopupDuyetBo
        open={openPopupDuyetBo}
        handleClose={handleClosePopupDuyetBo}
        maLoaiTk={personnelInfo?.maLoaiTk}
      />
      <PopupTuChoiPhongKHDT
        open={openPopupTuChoiPhongKHDT}
        handleClose={handleClosePopupTuChoiPhongKHDT}
      />
    </motion.div>
  );
};

export default ChiTietPhieuDKyDVKN;
