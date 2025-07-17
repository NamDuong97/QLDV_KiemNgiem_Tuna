import { Box, Pagination } from "@mui/material";
import { motion } from "motion/react";
import { Align } from "../../../../../../../models/Table";
import { useState } from "react";
import { Inputs } from "../../../../../../../components/Inputs";
import { Textarea } from "../../../../../../../components/Textarea";
import TableImages from "./TableImages";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../../../../hooks/customers/usePhieuDKyDVKN";

interface MausProps {
  dataMau: any;
}

const tableHeadImages = [
  {
    id: "image",
    sort: false,
    label: "Ảnh",
    align: Align.Center,
  },
];

const Maus = (props: MausProps) => {
  const { dataMau } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataMau.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataMau && dataMau.length / itemsPerPage);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const { data: dataTC } = useGetTieuChuanAll({
    queryKey: "GetTieuChuanAll",
  });
  const { data: dataLDV } = useGetLoaiDichVuAll({
    queryKey: "GetLoaiDichVuAll",
  });
  const dataTieuChuan: any = dataTC;
  const dataLoaiDV: any = dataLDV;

  return (
    <motion.div
      key="form-signup-maus"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="border border-gray-300 rounded-br-[6px] rounded-bl-[6px] p-4 sm:p-10 grid gap-4"
    >
      {dataMau?.length > 0 ? (
        currentItems.map((item: any) => (
          <Box key={item?.maId} className="overflow-x-auto whitespace-nowrap">
            <Box className="grid grid-cols-12 gap-[1px_24px]">
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Tên mẫu"
                  name="tenMau"
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
                  value={item.tenMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Tiêu chuẩn"
                  name="tenTieuChuan"
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
                    dataTieuChuan?.find(
                      (itemTieuChuan: any) =>
                        itemTieuChuan.maId === item.maTieuChuan
                    ).tenTieuChuan
                  }
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Dịch vụ"
                  name="tenLoaiDichVu"
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
                    dataLoaiDV?.find(
                      (itemLoaiDV: any) => itemLoaiDV.maLoaiDv === item.loaiDv
                    )?.tenDichVu
                  }
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Số lô"
                  name="soLo"
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
                  value={item.soLo}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Ngày sản xuất"
                  name="ngaySanXuat"
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
                  value={item.ngaySanXuat}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Hạn sử dụng"
                  name="hanSuDung"
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
                  value={item.hanSuDung}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Số lượng"
                  name="soLuong"
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
                  value={item.soLuong}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Đơn vị tính"
                  className="h-[42px]"
                  name="donViTinh"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item.donViTinh}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Điều kiện bảo quản"
                  name="dieuKienBaoQuan"
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
                  value={item.dieuKienBaoQuan}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Đơn vị sản xuất"
                  name="donViSanXuat"
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
                  value={item.donViSanXuat}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4 h-[106px]">
                <Box className="grid gap-2">
                  <p className="!font-semibold text-base/6 text-gray_80 whitespace-normal text-cyan-950">
                    Lưu mẫu
                  </p>
                  <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[8px] px-4 w-full">
                    <Inputs
                      title="Lưu mẫu"
                      name="luuMau"
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
                      value={item.luuMau ? "Có lưu mẫu" : "Không lưu mẫu"}
                    />
                    <span className="text-base/6 font-medium">
                      Cho phép lưu mẫu
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="col-span-12 lg:col-span-6 xl:col-span-4 h-[106px]">
                <Box className="grid gap-2">
                  <p className="!font-semibold text-base/6 text-gray_80 whitespace-normal text-cyan-950">
                    Xuất kết quả
                  </p>
                  <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[8px] px-4 w-full">
                    <input type="checkbox" className="w-5 h-5" />
                    <span className="text-base/6 font-medium">
                      Cho phép xuất kết quả
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Textarea
                  title="Tình trạng mẫu"
                  name="tinhTrangMau"
                  className="max-h-[149px] min-h-[149px]"
                  height="h-[213px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item.tinhTrangMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Textarea
                  title="Yêu cầu kiểm nghiệm"
                  name="yeuCauKiemNghiem"
                  className="max-h-[149px] min-h-[149px]"
                  height="h-[213px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  value={item.yeuCauKiemNghiem}
                />
              </Box>
              <Box className="col-span-12 lg:col-span-4 pb-6 lg:pb-0">
                <Textarea
                  title="Ghi chú"
                  className="max-h-[149px] min-h-[149px]"
                  height="h-auto"
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
              <Box className="col-span-12 md:col-span-6"></Box>
              <Box className="col-span-12 md:col-span-6 gap-2">
                <Inputs
                  title="Xuất kết quả"
                  name="donViSanXuat"
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
                    item.xuatKetQua ? "Có xuất kết quả" : "Không xuất kết quả"
                  }
                />
              </Box>
            </Box>
            <Box className="">
              <TableImages
                tableHead={tableHeadImages}
                dataImage={item?.phieuDangKyMauHinhAnhs}
              />
            </Box>
          </Box>
        ))
      ) : (
        <Box className="text-center">
          <p>Không có dữ liệu</p>
        </Box>
      )}

      {dataMau?.length > 0 && (
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

export default Maus;
