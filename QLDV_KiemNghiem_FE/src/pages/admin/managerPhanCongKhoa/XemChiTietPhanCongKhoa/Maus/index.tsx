import { Box, Pagination } from "@mui/material";
import { useState } from "react";
import TableImages from "./TableImages";
// import { useGetLoaiDichVuAll, useGetTieuChuanAll } from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import { Inputs } from "../../../../../components/Inputs";
import { Textarea } from "../../../../../components/Textarea";
import { Align } from "../../../../../models/Table";

interface MausProps {
  dataMau?: any;
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

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = dataMau.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataMau && dataMau.length / itemsPerPage);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  // const { data: dataTC } = useGetTieuChuanAll({
  //   queryKey: "GetTieuChuanAll",
  // });
  // const { data: dataLDV } = useGetLoaiDichVuAll({
  //   queryKey: "GetLoaiDichVuAll",
  // });
  // const dataTieuChuan: any = dataTC;
  // const dataLoaiDV: any = dataLDV;

  return (
    <div className="p-6 grid gap-4">
      {/* {currentItems.map((item: any) => ( */}
      <Box
      // key={item?.maId}
      >
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
              // value={item.tenMau}
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
              // value={
              //   dataTieuChuan?.find(
              //     (itemTieuChuan: any) =>
              //       itemTieuChuan.maId === item.maTieuChuan
              //   ).tenTieuChuan
              // }
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
              // value={
              //   dataLoaiDV?.find(
              //     (itemLoaiDV: any) => itemLoaiDV.maLoaiDv === item.loaiDv
              //   ).tenDichVu
              // }
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
              // value={item.soLo}
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
              // value={item.ngaySanXuat}
            />
          </Box>
          <Box className="col-span-12 md:col-span-6 lg:col-span-4">
            <Inputs
              title="Thời gian hoàn thành"
              name="thoiGianTieuChuan"
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
              // value={item.thoiGianTieuChuan}
            />
          </Box>
          <Box className="col-span-12 md:col-span-6 lg:col-span-4">
            <Inputs
              title="Ngày dự kiến trả kết quả"
              name="ngayDuKienTraKetQua"
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
              // value={
              //   item.thoiGianTieuChuan * item?.loaiDv?.split("-")[1] > 0
              //     ? item.thoiGianTieuChuan * item?.loaiDv?.split("-")[1]
              //     : "Bàn giao ngay sau khi kiểm nghiệm"
              // }
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
              // value={item.hanSuDung}
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
              // value={item.soLuong}
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
              // value={item.donViTinh}
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
              // value={item.dieuKienBaoQuan}
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
              // value={item.donViSanXuat}
            />
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
              // value={item.tinhTrangMau}
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
              // value={item.yeuCauKiemNghiem}
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
              // value={item.ghiChu}
            />
          </Box>
          <Box className="col-span-12 md:col-span-6">
            <Inputs
              className="h-[42px]"
              sx={{
                input: {
                  padding: "9.5px 14px",
                },
                "& .Mui-disabled": {
                  WebkitTextFillColor: "black !important",
                },
              }}
              height="h-[76px]"
              disabled
              // value={item.luuMau ? "Có lưu mẫu" : "Không lưu mẫu"}
            />
          </Box>
          <Box className="col-span-12 md:col-span-6 gap-2">
            <Inputs
              name="xuatKetQua"
              className="h-[42px]"
              sx={{
                input: {
                  padding: "9.5px 14px",
                },
                "& .Mui-disabled": {
                  WebkitTextFillColor: "black !important",
                },
              }}
              height="h-[76px]"
              disabled
              // value={
              //   item.xuatKetQua ? "Có xuất kết quả" : "Không xuất kết quả"
              // }
            />
          </Box>
        </Box>
        <TableImages
          tableHead={tableHeadImages}
          // dataImage={item?.phieuDangKyMauHinhAnhs}
        />
      </Box>
      {/* ))} */}

      {/* {dataMau?.length > 0 && ( */}
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
      {/* )} */}
    </div>
  );
};

export default Maus;
