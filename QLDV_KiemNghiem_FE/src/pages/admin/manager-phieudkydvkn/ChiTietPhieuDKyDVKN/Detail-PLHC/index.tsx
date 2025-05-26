import { Box, Pagination } from "@mui/material";
import { motion } from "motion/react";
import { Textarea } from "../../../../../components/Textarea";
import { Inputs } from "../../../../../components/Inputs";

const DetailPLHCs = () => {
  return (
    <motion.div
      key="form-signup-dvkm-tag2"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-solid border-gray-300 rounded-[10px] grid gap-2"
    >
      <Box className="grid grid-cols-12 gap-1 lg:gap-[0px_24px] p-6">
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Tên danh mục Phụ Liệu Hóa Chất"
            name="TenDM_PLHC"
            className="h-[42px]"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs title="Tên Phụ Liệu Hóa Chất" className="h-[42px]" disabled />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Tên hiển thị"
            className="h-[42px]"
            name="TenHienThi"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Số Lượng"
            className="h-[42px]"
            name="SoLuong"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Đơn Vị Tính"
            name="DonViTinh"
            className="h-[42px]"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs title="Số lô" name="SoLo" className="h-[42px]" disabled />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Tên nhà cung cấp"
            name="TenNhaCungCap"
            className="h-[42px]"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs title="Nồng độ" name="NongDo" className="h-[42px]" disabled />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Đơn vị nồng độ"
            name="DonViNongDo"
            className="h-[42px]"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6">
          <Inputs
            title="Ngày hết hạn"
            name="NgayHetHan"
            className="h-[42px]"
            sx={{
              input: {
                padding: "9.5px 14px",
              },
            }}
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6">
          <Inputs
            title="Điều kiện bảo quản"
            name="DieuKienBaoQuan"
            className="h-[42px]"
            disabled
          />
        </Box>
        <Box className="col-span-12">
          <Textarea
            title="Ghi Chú"
            name="GhiChu"
            className="h-[124px]"
            height="h-[156px]"
            disabled
          />
        </Box>
      </Box>
      <hr className="text-gray-300" />
      <Box className="px-4 pb-4 pt-2 flex justify-center">
        <Pagination
          count={10}
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
    </motion.div>
  );
};

export default DetailPLHCs;
