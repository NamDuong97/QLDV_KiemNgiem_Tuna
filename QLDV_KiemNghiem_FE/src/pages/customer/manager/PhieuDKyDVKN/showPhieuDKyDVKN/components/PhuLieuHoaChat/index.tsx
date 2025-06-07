import { Box, Pagination } from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";
import { Textarea } from "../../../../../../../components/Textarea";
import { Inputs } from "../../../../../../../components/Inputs";
import { useGetDmPhuLieuHoaChatAll } from "../../../../../../../hooks/customers/usePhieuDKyDVKN";

interface PhuLieuHoaChatsProps {
  dataPhuLieuHoaChat: any;
}

const PhuLieuHoaChat = (props: PhuLieuHoaChatsProps) => {
  const { dataPhuLieuHoaChat } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataPhuLieuHoaChat?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    dataPhuLieuHoaChat && dataPhuLieuHoaChat.length / itemsPerPage
  );

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };
  const { data: dataDMPLHC } = useGetDmPhuLieuHoaChatAll({
    queryKey: "GetDmPhuLieuHoaChatAll",
  });
  const dataDMPLHChat: any = dataDMPLHC;
  console.log("dataPhuLieuHoaChat", currentItems, dataDMPLHChat);

  return (
    <motion.div
      key="PhuLieuHoaChat"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="border border-gray-300 rounded-br-[6px] rounded-bl-[6px] py-4 px-4 sm:px-12"
    >
      {currentItems?.length > 0 ? (
        currentItems?.map((item: any, index: any) => (
          <Box key={item?.id || index}>
            <Box className="grid grid-cols-12 gap-1 lg:gap-[0px_24px]">
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Tên danh mục phụ liệu hóa chất"
                  name="TenDM_PLHC"
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
                  value={item?.maPlhc}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Tên phụ liệu hóa chất"
                  className="h-[42px]"
                  name="TenPLHC"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item?.tenPlhc}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Tên hiển thị"
                  className="h-[42px]"
                  name="TenHienThi"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item?.tenHienThi}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Số lượng"
                  className="h-[42px]"
                  name="SoLuong"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item?.soLuong}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Đơn vị tính"
                  name="DonViTinh"
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
                  value={item?.donViTinh}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Số lô"
                  name="SoLo"
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
                  value={item?.soLo}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Tên nhà cung cấp"
                  name="TenNhaCungCap"
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
                  value={item?.tenNhaCungCap}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Nồng độ"
                  name="NongDo"
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
                  value={
                    dataDMPLHChat?.find(
                      (itemPLHC: any) => itemPLHC.maId === item.maPlhc
                    ).nongDo
                  }
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Đơn vị nồng độ"
                  name="DonViNongDo"
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
                  value={
                    dataDMPLHChat?.find(
                      (itemPLHC: any) => itemPLHC.maId === item.maPlhc
                    ).donViNongDo
                  }
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
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item.ngayHetHan.split("T")[0]}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6">
                <Inputs
                  title="Điều kiện bảo quản"
                  name="DieuKienBaoQuan"
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
                  value={
                    dataDMPLHChat?.find(
                      (itemPLHC: any) => itemPLHC.maId === item.maPlhc
                    ).dieuKienBaoQuan
                  }
                />
              </Box>
              <Box className="col-span-12">
                <Textarea
                  title="Ghi chú"
                  name="GhiChu"
                  className="h-[124px]"
                  height="h-[156px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item.ghiChu}
                />
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box className="text-center">
          <p>Không có dữ liệu</p>
        </Box>
      )}

      {currentItems?.length > 0 && (
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
    </motion.div>
  );
};

export default PhuLieuHoaChat;
