import { Box } from "@mui/material";
import { motion } from "motion/react";
import ListImage from "./ListImage";
import { Inputs } from "../../../../../../components/Inputs";
import { Textarea } from "../../../../../../components/Textarea";

// const dataLoaiMau = [
//   {
//     label: "Gấp 1 (G1)",
//     value: "Gấp 1 (G1)",
//   },
//   {
//     label: "Gấp 2 (G2)",
//     value: "Gấp 2 (G2)",
//   },
//   {
//     label: "Gấp 3 (G3)",
//     value: "Gấp 3 (G3)",
//   },
// ];

// const dataTieuChuan = [
//   {
//     label: "Việt Nam 5",
//     value: "Việt Nam 5",
//   },
//   {
//     label: "Trung Quốc",
//     value: "Trung Quốc",
//   },
//   {
//     label: "Châu Âu",
//     value: "Châu Âu",
//   },
// ];

// const dataDichVu = [
//   {
//     label: "ABC",
//     value: "ABC",
//   },
//   {
//     label: "ABC",
//     value: "ABC",
//   },
//   {
//     label: "ABC",
//     value: "ABC",
//   },
// ];

const FormMaus = () => {
  return (
    <motion.div
      key="FormMaus"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Box className="p-6 grid grid-cols-12 gap-[1px_24px]">
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Tên Mẫu"
            name="TenMau"
            className="h-[42px]"
            sx={{
              input: {
                padding: "9.5px 14px",
              },
            }}
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Loại Mẫu"
            name="LoaiMau"
            className="h-[42px]"
            sx={{
              input: {
                padding: "9.5px 14px",
              },
            }}
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Tiêu Chuẩn"
            name="TieuChuan"
            className="h-[42px]"
            sx={{
              input: {
                padding: "9.5px 14px",
              },
            }}
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Dịch Vụ"
            name="DichVu"
            className="h-[42px]"
            sx={{
              input: {
                padding: "9.5px 14px",
              },
            }}
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Số Lô"
            name="SoLo"
            className="h-[42px]"
            sx={{
              input: {
                padding: "9.5px 14px",
              },
            }}
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 lg:col-span-4">
          <Inputs
            title="Ngày Sản Xuất"
            name="NgaySanXuat"
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
            title="Hạn Sử Dụng"
            name="HanSD"
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
            title="Số Lượng"
            name="SoLuong"
            className="h-[42px]"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6">
          <Inputs
            title="Đơn Vị Tính"
            name="DonViTinh"
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
            title="Tình Trạng Mãu"
            name="TinhTrangMau"
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
            title="Điều Kiện Bảo Quản"
            name="DieuKienBaoQuan"
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
            title="Đơn Vị Sản Xuất"
            name="DonViSanXuat"
            className="h-[42px]"
            sx={{
              input: {
                padding: "9.5px 14px",
              },
            }}
            disabled
          />
        </Box>
        <Box className="col-span-12">
          <Textarea
            title="Yêu Cầu Kiểm Nghiệm"
            name="YeuCauKiemNghiem"
            className="max-h-[149px] min-h-[149px]"
            height="h-[213px]"
            disabled
          />
        </Box>
        <Box className="col-span-12 md:col-span-6 pb-6">
          <p className="!font-semibold text-base/6 text-gray_80 mb-2">
            Lưu Mẫu
          </p>
          <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
            <input type="checkbox" className="w-5 h-5" disabled />
            <span className="text-base/6 font-medium">
              (Khách hàng tích chọn)
            </span>
          </Box>
        </Box>
        <Box className="col-span-12 md:col-span-6 gap-2 pb-6">
          <p className="!font-semibold text-base/6 text-gray_80 mb-2">
            Xuất Kết Quả
          </p>
          <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full h-[42px]">
            <input type="checkbox" className="w-5 h-5" disabled />
            <span className="text-base/6 font-medium">
              (Khách hàng tích chọn)
            </span>
          </Box>
        </Box>
        <Box className="col-span-12">
          <Textarea
            title="Ghi Chú"
            className="max-h-[149px] min-h-[149px]"
            height="h-auto"
            disabled
          />
        </Box>
      </Box>
      <ListImage />
    </motion.div>
  );
};

export default FormMaus;
