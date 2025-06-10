import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import { useState } from "react";

const phieuDuTruData = {
  maPhieuDuTru: "PDT-HC-20250611-001",
  tenNhanVienLap: "Trần Văn Dũng",
  tenMau: "Hóa chất Axit Sulfuric",
  ngayTao: "2025-06-11",
  khoa: "Khoa Hóa Sinh",
  chiTietPhieu: [
    {
      id: "PLHC_001",
      tenPhuLieuHoaChat: "Dung môi Acetone",
      soLuong: 10,
      donViTinh: "Lít",
      ghiChu: "Sử dụng cho pha loãng mẫu",
    },
    {
      id: "PLHC_002",
      tenPhuLieuHoaChat: "Thuốc thử Nessler",
      soLuong: 2,
      donViTinh: "Chai (500ml)",
      ghiChu: "Kiểm tra Amoniac",
    },
    {
      id: "PLHC_003",
      tenPhuLieuHoaChat: "Giấy lọc định tính Whatman No.1",
      soLuong: 5,
      donViTinh: "Hộp",
      ghiChu: "Đường kính 125mm",
    },
    {
      id: "PLHC_004",
      tenPhuLieuHoaChat: "Chất chuẩn Glucose (C6H12O6)",
      soLuong: 500,
      donViTinh: "Gram",
      ghiChu: "Độ tinh khiết 99.9%",
    },
    {
      id: "PLHC_005",
      tenPhuLieuHoaChat: "Axít Sulfuric đậm đặc",
      soLuong: 1,
      donViTinh: "Bình (1L)",
      ghiChu: "Dùng cho phân tích COD",
    },
  ],
};

const XemChiTietPhieuDuTru = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = {
    data: phieuDuTruData?.chiTietPhieu?.slice(
      indexOfFirstItem,
      indexOfLastItem
    ),
    // isLoading: phieuDuTruData.isLoading,
  };

  const totalPages = Math.ceil(
    phieuDuTruData?.chiTietPhieu &&
      phieuDuTruData?.chiTietPhieu?.length / itemsPerPage
  );

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <motion.div
        key="XemChiTietPhieuDuTru"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-12 px-14 py-20"
      >
        <Box className="flex items-center justify-between bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Box className="flex items-center gap-4 w-full">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={() =>
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="flex-1 text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết phiếu dự trù
            </h1>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                thông tin phiếu dự trù
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Mã Phiếu Dự Trù:
                </p>
                <p className="capitalize">{phieuDuTruData.maPhieuDuTru}</p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Tên Nhân Viên Lập:
                </p>
                <p className="capitalize">{phieuDuTruData.tenNhanVienLap}</p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Tên Mẫu:</p>
                <p className="capitalize">{phieuDuTruData.tenMau}</p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Tạo:</p>
                <p className="capitalize">{phieuDuTruData.ngayTao}</p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Khoa:</p>
                <p className="capitalize">{phieuDuTruData.khoa}</p>
              </Box>
            </Box>
          </Box>
          <Box className="grid gap-4">
            <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="text-lg/6 capitalize font-medium text-white">
                  thông tin chi tiết phiếu dự trù
                </p>
              </Box>
              {currentItems.data.map((item: any) => (
                <Box key={item.id} className="grid grid-cols-12 gap-6 w-full">
                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">
                      Tên Phụ liệu hóa chất:
                    </p>
                    <p className="capitalize">{item.tenPhuLieuHoaChat}</p>
                  </Box>

                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">Số lượng:</p>
                    <p className="capitalize">{item.soLuong}</p>
                  </Box>

                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">
                      Đơn vị tính:
                    </p>
                    <p className="capitalize">{item.donViTinh}</p>
                  </Box>

                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">Ghi chú:</p>
                    <p className="capitalize">{item.ghiChu}</p>
                  </Box>
                </Box>
              ))}
            </Box>
            <div className="px-4 py-2 flex justify-center">
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
                  ".MuiPagination-ul": {
                    justifyContent: "center",
                  },
                }}
              />
            </div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietPhieuDuTru;
