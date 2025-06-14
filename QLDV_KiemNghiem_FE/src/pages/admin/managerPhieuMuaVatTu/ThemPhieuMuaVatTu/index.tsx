import { Box, Pagination, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen, FaPlus } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import Inputs2 from "../../../../components/Inputs2";
import { useState } from "react";
import PopupThongBao from "./PopupThongBao";
import { Textarea2 } from "../../../../components/Textarea2";
import { MdDelete } from "react-icons/md";

const dataPhieuMuaVatTu = {
  nhanVienLap: "Nguyễn Văn An",
  ngayLap: "2025-06-05",
  ghiChu: "Mua vật tư cho dự án X",
  PhuLieuHoaChat: [
    {
      id: "plhc001",
      tenPhuLieuHoaChat: "Ethanol 96%",
      donViTinh: "lít",
      soLuong: 10,
      ghiChu: "Sử dụng trong thí nghiệm A",
    },
    {
      id: "plhc002",
      tenPhuLieuHoaChat: "Acid HCl 37%",
      donViTinh: "lít",
      soLuong: 5,
      ghiChu: "Cần cẩn thận khi sử dụng",
    },
    {
      id: "plhc003",
      tenPhuLieuHoaChat: "Nước cất",
      donViTinh: "lít",
      soLuong: 20,
      ghiChu: "Dùng để pha loãng",
    },
    {
      id: "plhc004",
      tenPhuLieuHoaChat: "Giấy lọc",
      donViTinh: "tờ",
      soLuong: 100,
      ghiChu: "Lọc cặn",
    },
    {
      id: "plhc005",
      tenPhuLieuHoaChat: "Ống nghiệm",
      donViTinh: "cái",
      soLuong: 50,
      ghiChu: "Chứa mẫu",
    },
  ],
};

const ThemPhieuMuaVatTu = () => {
  const navigate = useNavigate();

  const [openPopupThongBao, setOpenPopupThongBao] = useState(false);
  const handleClickOpenPopupThongBao = () => {
    setOpenPopupThongBao(true);
  };
  const handleClosePopupThongBao = () => {
    setOpenPopupThongBao(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = {
    data: dataPhieuMuaVatTu?.PhuLieuHoaChat?.slice(
      indexOfFirstItem,
      indexOfLastItem
    ),
    // isLoading: phieuDuTruData.isLoading,
  };

  const totalPages = Math.ceil(
    dataPhieuMuaVatTu?.PhuLieuHoaChat &&
      dataPhieuMuaVatTu?.PhuLieuHoaChat?.length / itemsPerPage
  );

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <motion.div
        key="ThemPhieuMuaVatTu"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-12 px-14 py-20"
      >
        <Box className="flex items-center justify-between bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Box className="flex items-center gap-4">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={() =>
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết Thêm phiếu Mua Vật Tư
            </h1>
          </Box>
          <Box>
            <button
              onClick={handleClickOpenPopupThongBao}
              className="px-3 py-[6px] rounded-md cursor-pointer hover:bg-sky-500 bg-sky-600 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              <span className="text-lg/6 font-semibold text-white">
                Lưu Phiếu
              </span>
            </button>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                thông tin phiếu Mua Vật Tư
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-6">
                <Inputs2
                  title="Nhân Viên Lập:"
                  placeholder="Nhập Tên Nhân Viên Lập..."
                  defaultValue={dataPhieuMuaVatTu.nhanVienLap}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Ngày Lập:"
                  type="date"
                  defaultValue={dataPhieuMuaVatTu.ngayLap}
                />
              </Box>
              <Box className="col-span-12">
                <Textarea2
                  title="Ghi chú"
                  placeholder="Nhập Ghi Chú"
                  className="max-h-[149px] min-h-[149px]"
                  height="h-auto"
                  defaultValue={dataPhieuMuaVatTu.ghiChu}
                />
              </Box>
            </Box>
          </Box>
          <Box className="grid gap-4">
            <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="text-lg/6 capitalize font-medium text-white">
                  thông tin chi tiết phiếu Mua Vật Tư
                </p>
              </Box>
              {currentItems.data.map((item: any) => (
                <Box key={item.id} className="grid grid-cols-12 gap-6 w-full">
                  <Box className="col-span-4">
                    <Inputs2
                      title="Tên Phụ liệu hóa chất:"
                      placeholder="Nhập Tên Phụ liệu hóa chất..."
                      defaultValue={item.tenPhuLieuHoaChat}
                    />
                  </Box>
                  <Box className="col-span-4">
                    <Inputs2
                      title="Số lượng:"
                      placeholder="Nhập Số lượng..."
                      defaultValue={item.soLuong}
                    />
                  </Box>
                  <Box className="col-span-4">
                    <Inputs2
                      title="Đơn vị tính:"
                      placeholder="Nhập Đơn vị tính..."
                      defaultValue={item.donViTinh}
                    />
                  </Box>
                  <Box className="col-span-12">
                    <Textarea2
                      title="Ghi chú"
                      placeholder="Nhập Ghi Chú"
                      className="max-h-[149px] min-h-[149px]"
                      height="h-auto"
                      defaultValue={item.ghiChu}
                      // inputRef={register("ghiChu")}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <div className="flex justify-between items-center">
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
                      border: "2px solid white",
                      color: "white",
                    },
                  "&.MuiPagination-root": {
                    backgroundColor: "#005f78",
                    padding: "12px 32px",
                    borderRadius: "6px",
                    border: "2px solid #d1d5dc",
                    boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                  },
                  button: {
                    color: "white",
                    border: "2px solid white",
                    boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                  },
                  "& .Mui-selected": {
                    border: "1px solid white",
                    backgroundColor: "white",
                    color: "#005f78",
                  },
                  "& .Mui-selected:hover": {
                    backgroundColor: "#d1d5dc",
                    color: "#005f78",
                  },
                }}
              />
              <Box className="flex gap-6 justify-center bg-cyan-800 px-8 py-3 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <Tooltip
                  title="Xóa"
                  placement="bottom"
                  arrow
                  disableInteractive
                >
                  <button className="p-1 rounded-full cursor-pointer hover:bg-red-400 bg-red-500 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <MdDelete className="w-6 h-6 text-white" />
                  </button>
                </Tooltip>
                <Tooltip
                  title="Thêm"
                  placement="bottom"
                  arrow
                  disableInteractive
                >
                  <button className="p-1 rounded-full cursor-pointer hover:bg-green-400 bg-green-500 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <FaPlus className="w-6 h-6 text-white" />
                  </button>
                </Tooltip>
              </Box>
            </div>
          </Box>
        </Box>
      </motion.div>
      <PopupThongBao
        open={openPopupThongBao}
        handleClose={handleClosePopupThongBao}
      />
    </Box>
  );
};

export default ThemPhieuMuaVatTu;
