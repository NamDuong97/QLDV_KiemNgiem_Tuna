import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import { useState } from "react";

const dataPhieuXuatKho = {
  maPhieuXuatKho: "PXK001",
  nhanVienLapPhieu: "Nguyễn Minh",
  nhanVienGiaoVatTu: "Trần Văn A",
  thoiGianXuatKho: "2024-06-10 09:00:00",
  nhanVienNhanVatTu: "Lê Thị B",
  lyDoXuatKho: "Xuất cho dự án X",
  noiGiaoVatTu: "Phòng Thí Nghiệm 1",
  maPhieuDuTru: "PDT001",
  PhuLieuHoaChat: [
    {
      id: "plhc001",
      tenPhuLieuHoaChat: "Ethanol 96%",
      donViTinh: "lít",
      soLuong: 10,
      donGia: 25000,
      thanhTien: 250000,
      ghiChu: "Sử dụng trong thí nghiệm A",
    },
    {
      id: "plhc002",
      tenPhuLieuHoaChat: "Acid HCl 37%",
      donViTinh: "lít",
      soLuong: 5,
      donGia: 18000,
      thanhTien: 90000,
      ghiChu: "Cần cẩn thận khi sử dụng",
    },
    {
      id: "plhc003",
      tenPhuLieuHoaChat: "Nước cất",
      donViTinh: "lít",
      soLuong: 20,
      donGia: 5000,
      thanhTien: 100000,
      ghiChu: "Dùng để pha loãng",
    },
    {
      id: "plhc004",
      tenPhuLieuHoaChat: "Giấy lọc",
      donViTinh: "tờ",
      soLuong: 100,
      donGia: 1000,
      thanhTien: 100000,
      ghiChu: "Lọc cặn",
    },
    {
      id: "plhc005",
      tenPhuLieuHoaChat: "Ống nghiệm",
      donViTinh: "cái",
      soLuong: 50,
      donGia: 3000,
      thanhTien: 150000,
      ghiChu: "Chứa mẫu",
    },
  ],
};

const XemChiTietPhieuXuatKho = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = {
    data: dataPhieuXuatKho?.PhuLieuHoaChat?.slice(
      indexOfFirstItem,
      indexOfLastItem
    ),
    // isLoading: phieuDuTruData.isLoading,
  };

  const totalPages = Math.ceil(
    dataPhieuXuatKho?.PhuLieuHoaChat &&
      dataPhieuXuatKho?.PhuLieuHoaChat?.length / itemsPerPage
  );

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <motion.div
        key="XemChiTietPhieuXuatKho"
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
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="flex-1 text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết phiếu xuất kho
            </h1>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                thông tin phiếu xuất kho
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Mã Phiếu Xuất Kho:
                </p>
                <p className="capitalize">{dataPhieuXuatKho.maPhieuXuatKho}</p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nhân Viên Lập Phiếu:
                </p>
                <p className="capitalize">
                  {dataPhieuXuatKho.nhanVienLapPhieu}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nhân Viên Giao Vật Tư:
                </p>
                <p className="capitalize">
                  {dataPhieuXuatKho.nhanVienGiaoVatTu}
                </p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Xuất Kho:</p>
                <p className="capitalize">{dataPhieuXuatKho.thoiGianXuatKho}</p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nhân Viên Nhận Vật Tư:
                </p>
                <p className="capitalize">
                  {dataPhieuXuatKho.nhanVienNhanVatTu}
                </p>
              </Box>

              <Box className="col-span-12 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Lý Do Xuất Kho:
                </p>
                <p className="capitalize">{dataPhieuXuatKho.lyDoXuatKho}</p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nơi Giao Vật Tư:
                </p>
                <p className="capitalize">{dataPhieuXuatKho.noiGiaoVatTu}</p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Mã Phiếu Dự Trù:
                </p>
                <p className="capitalize">{dataPhieuXuatKho.maPhieuDuTru}</p>
              </Box>
            </Box>
          </Box>
          <Box className="grid gap-4">
            <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="text-lg/6 capitalize font-medium text-white">
                  thông tin chi tiết phiếu xuất kho
                </p>
              </Box>
              {currentItems.data.map((item: any) => (
                <Box key={item.id} className="grid grid-cols-12 gap-6 w-full">
                  <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">
                      Tên Phụ liệu hóa chất:
                    </p>
                    <p className="capitalize">{item.tenPhuLieuHoaChat}</p>
                  </Box>

                  <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">Số lượng:</p>
                    <p className="capitalize">{item.soLuong}</p>
                  </Box>

                  <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">
                      Đơn vị tính:
                    </p>
                    <p className="capitalize">{item.donViTinh}</p>
                  </Box>
                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">Đơn giá:</p>
                    <p className="capitalize">{item.donGia}</p>
                  </Box>
                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">
                      Thành tiền:
                    </p>
                    <p className="capitalize">{item.thanhTien}VND</p>
                  </Box>

                  <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
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
            </div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietPhieuXuatKho;
