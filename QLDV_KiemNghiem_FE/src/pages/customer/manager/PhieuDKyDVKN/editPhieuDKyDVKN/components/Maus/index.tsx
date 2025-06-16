import { Box, Pagination } from "@mui/material";
import { motion } from "motion/react";
import TableMau from "./TableMau";
import { Dispatch, useState } from "react";
import FormThongTinMau from "./FormThongTinMau";
import { Align } from "../../../../../../../models/Table";

interface MausProps {
  setData: Dispatch<any>;
}

const tableHead = [
  {
    id: "TenMau",
    sort: false,
    label: "Tên Mẫu",
    align: Align.Left,
  },
  {
    id: "DichVu",
    sort: false,
    label: "Dịch Vụ",
    align: Align.Center,
  },
  {
    id: "TieuChuan",
    sort: false,
    label: "Tiêu Chuẩn",
    align: Align.Center,
  },
  {
    id: "Solo",
    sort: false,
    label: "Số Lô",
    align: Align.Center,
  },
  {
    id: "SoLuong",
    sort: false,
    label: "Số Lượng",
    align: Align.Center,
  },
  {
    id: "chucNang",
    sort: false,
    label: "Chức Năng",
    align: Align.Center,
  },
];

const Maus = (props: MausProps) => {
  const { setData } = props;

  const [tableBody, settableBody] = useState(() => {
    const data = sessionStorage.getItem("sua-phieuDky");
    return data ? JSON.parse(data).maus : [];
  });

  const [dataEditMaus, setDataEditMaus] = useState<any>();
  const [dataCopyMaus, setDataCopyMaus] = useState<any>();
  const [listCheckbox, setListCheckbox] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [isTag, setisTag] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableBody?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableBody && tableBody.length / itemsPerPage);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const pushIfNotExist = (arr: any[], item: any) => {
    const exists = arr.some((x) => x.tenMau === item.tenMau);
    if (!exists) {
      arr.push(item);
    }
  };

  const handleXoaMau = () => {
    const data = tableBody.filter((item: any) => {
      return listCheckbox.some(
        (subitem: any) => subitem.tenMau === item.tenMau
      );
    });
    const dataNotRemove = tableBody.filter((item: any) => {
      return !listCheckbox.some(
        (subitem: any) => subitem.tenMau === item.tenMau
      );
    });
    let dataFinal: any = [];

    data.map((item: any) => {
      if (item.isDel !== undefined && item.isDel !== null) {
        const dataImage: any[] = [];
        item.phieuDangKyMauHinhAnhs.map((item: any) =>
          dataImage.push({
            maId: "",
            maMau: "",
            ten: item.ten,
            dinhDang: "",
            ghiChu: item.ghiChu,
            loaiAnh: "",
            trangThai: "",
            nguoiTao: item.nguoiTao,
            nguoiSua: "",
            ngayTao: "",
            ngaySua: "",
            isDel: true,
          })
        );
        pushIfNotExist(dataFinal, {
          maId: item.maId,
          maDmMau: item.maDmMau,
          tenMau: item.tenMau,
          maTieuChuan: item.maTieuChuan,
          maPhieuDangKy: item.maPhieuDangKy,
          manvThucHien: item.manvThucHien,
          madv: item.madv,
          soLo: item.soLo,
          donViSanXuat: item.donViSanXuat,
          ngaySanXuat: item.ngaySanXuat,
          hanSuDung: item.hanSuDung,
          donViTinh: item.donViTinh,
          soLuong: item.soLuong,
          yeuCauKiemNghiem: item.yeuCauKiemNghiem,
          tinhTrangMau: item.tinhTrangMau,
          dieuKienBaoQuan: item.dieuKienBaoQuan,
          luuMau: item.luuMau,
          xuatKetQua: item.xuatKetQua,
          trangThaiNhanMau: item.trangThaiNhanMau,
          ghiChu: item.ghiChu,
          nguoiTao: item.nguoiTao,
          nguoiSua: item.nguoiSua,
          ngayTao: item.ngayTao,
          ngaySua: item.ngaySua,
          thoiGianTieuChuan: item.thoiGianTieuChuan,
          maPdkMau: item.maPdkMau,
          loaiDv: item.loaiDv,
          maLoaiDV: item.maLoaiDV,
          isDel: true,
          phieuDangKyMauHinhAnhs: dataImage,
        });

        dataNotRemove.map((item: any) => {
          if (item.isDel !== undefined && item.isDel !== null) {
            const dataImage: any[] = [];
            item.phieuDangKyMauHinhAnhs.map((item: any) =>
              dataImage.push({
                maId: "",
                maMau: "",
                ten: item.ten,
                dinhDang: "",
                ghiChu: item.ghiChu,
                loaiAnh: "",
                trangThai: "",
                nguoiTao: item.nguoiTao,
                nguoiSua: "",
                ngayTao: "",
                ngaySua: "",
                isDel: item.isDel,
              })
            );
            pushIfNotExist(dataFinal, {
              maId: item.maId,
              maDmMau: item.maDmMau,
              tenMau: item.tenMau,
              maTieuChuan: item.maTieuChuan,
              maPhieuDangKy: item.maPhieuDangKy,
              manvThucHien: item.manvThucHien,
              madv: item.madv,
              soLo: item.soLo,
              donViSanXuat: item.donViSanXuat,
              ngaySanXuat: item.ngaySanXuat,
              hanSuDung: item.hanSuDung,
              donViTinh: item.donViTinh,
              soLuong: item.soLuong,
              yeuCauKiemNghiem: item.yeuCauKiemNghiem,
              tinhTrangMau: item.tinhTrangMau,
              dieuKienBaoQuan: item.dieuKienBaoQuan,
              luuMau: item.luuMau,
              xuatKetQua: item.xuatKetQua,
              trangThaiNhanMau: item.trangThaiNhanMau,
              ghiChu: item.ghiChu,
              nguoiTao: item.nguoiTao,
              nguoiSua: item.nguoiSua,
              ngayTao: item.ngayTao,
              ngaySua: item.ngaySua,
              thoiGianTieuChuan: item.thoiGianTieuChuan,
              maPdkMau: item.maPdkMau,
              loaiDv: item.loaiDv,
              maLoaiDV: item.maLoaiDV,
              isDel: item.isDel,
              phieuDangKyMauHinhAnhs: dataImage,
            });
          } else {
            const dataImage: any[] = [];
            item.phieuDangKyMauHinhAnhs.map((item: any) =>
              dataImage.push({
                maId: "",
                maMau: "",
                ten: item.ten,
                dinhDang: "",
                ghiChu: item.ghiChu,
                loaiAnh: "",
                trangThai: "",
                nguoiTao: item.nguoiTao,
                nguoiSua: "",
                ngayTao: "",
                ngaySua: "",
              })
            );
            pushIfNotExist(dataFinal, {
              maId: item.maId,
              maDmMau: item.maDmMau,
              tenMau: item.tenMau,
              maTieuChuan: item.maTieuChuan,
              maPhieuDangKy: item.maPhieuDangKy,
              manvThucHien: item.manvThucHien,
              madv: item.madv,
              soLo: item.soLo,
              donViSanXuat: item.donViSanXuat,
              ngaySanXuat: item.ngaySanXuat,
              hanSuDung: item.hanSuDung,
              donViTinh: item.donViTinh,
              soLuong: item.soLuong,
              yeuCauKiemNghiem: item.yeuCauKiemNghiem,
              tinhTrangMau: item.tinhTrangMau,
              dieuKienBaoQuan: item.dieuKienBaoQuan,
              luuMau: item.luuMau,
              xuatKetQua: item.xuatKetQua,
              trangThaiNhanMau: item.trangThaiNhanMau,
              ghiChu: item.ghiChu,
              nguoiTao: item.nguoiTao,
              nguoiSua: item.nguoiSua,
              ngayTao: item.ngayTao,
              ngaySua: item.ngaySua,
              thoiGianTieuChuan: item.thoiGianTieuChuan,
              maPdkMau: item.maPdkMau,
              loaiDv: item.loaiDv,
              maLoaiDV: item.maLoaiDV,
              phieuDangKyMauHinhAnhs: dataImage,
            });
          }
        });
      } else {
        dataNotRemove.map((item: any) => {
          const dataImage: any[] = [];
          item.phieuDangKyMauHinhAnhs.map((item: any) =>
            dataImage.push({
              maId: "",
              maMau: "",
              ten: item.ten,
              dinhDang: "",
              ghiChu: item.ghiChu,
              loaiAnh: "",
              trangThai: "",
              nguoiTao: item.nguoiTao,
              nguoiSua: "",
              ngayTao: "",
              ngaySua: "",
              isDel: item.isDel,
            })
          );
          pushIfNotExist(dataFinal, {
            maId: item.maId,
            maDmMau: item.maDmMau,
            tenMau: item.tenMau,
            maTieuChuan: item.maTieuChuan,
            maPhieuDangKy: item.maPhieuDangKy,
            manvThucHien: item.manvThucHien,
            madv: item.madv,
            soLo: item.soLo,
            donViSanXuat: item.donViSanXuat,
            ngaySanXuat: item.ngaySanXuat,
            hanSuDung: item.hanSuDung,
            donViTinh: item.donViTinh,
            soLuong: item.soLuong,
            yeuCauKiemNghiem: item.yeuCauKiemNghiem,
            tinhTrangMau: item.tinhTrangMau,
            dieuKienBaoQuan: item.dieuKienBaoQuan,
            luuMau: item.luuMau,
            xuatKetQua: item.xuatKetQua,
            trangThaiNhanMau: item.trangThaiNhanMau,
            ghiChu: item.ghiChu,
            nguoiTao: item.nguoiTao,
            nguoiSua: item.nguoiSua,
            ngayTao: item.ngayTao,
            ngaySua: item.ngaySua,
            thoiGianTieuChuan: item.thoiGianTieuChuan,
            maPdkMau: item.maPdkMau,
            loaiDv: item.loaiDv,
            maLoaiDV: item.maLoaiDV,
            isDel: item.isDel,
            phieuDangKyMauHinhAnhs: dataImage,
          });
        });
      }
    });
    const dataTest = sessionStorage.getItem("sua-phieuDky");
    const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;
    const PhieuDangKy = {
      ...dataPhieuDangky,
      maus: dataFinal,
    };
    setData(PhieuDangKy);
    sessionStorage.setItem("sua-phieuDky", JSON.stringify(PhieuDangKy));
    settableBody(dataFinal);
    setListCheckbox([]);
  };

  const handleTagMau = () => {
    switch (isTag as number) {
      case 2:
        return (
          <Box className="sm:flex items-center overflow-x-auto whitespace-nowrap">
            <Box
              className="w-full px-2 py-4 text-center cursor-pointer border-b-[2px] border-gray-300 group  hover:rounded-tr hover:rounded-tl"
              onClick={() => setisTag(1)}
            >
              <p className="text-lg/4 font-semibold capitalize text-gray-700 group-hover:text-cyan-700">
                Thông tin Chi tiết Mẫu
              </p>
            </Box>
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-b-cyan-700 cursor-pointer hover:rounded-tr hover:rounded-tl hover:transition-all hover:duration-200 hover:ease-in-out bg-gray-100"
              onClick={() => setisTag(2)}
            >
              <p className="text-lg/4 font-semibold capitalize text-cyan-700">
                Danh sách mẫu gửi
              </p>
            </Box>
          </Box>
        );
      default:
        return (
          <Box className="sm:flex items-center overflow-x-auto whitespace-nowrap">
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-b-cyan-700 cursor-pointer hover:rounded-tr hover:rounded-tl hover:transition-all hover:duration-200 hover:ease-in-out  bg-gray-100"
              onClick={() => setisTag(1)}
            >
              <p className="text-lg/4 font-semibold capitalize text-cyan-700">
                Thông tin Chi tiết Mẫu
              </p>
            </Box>
            <Box
              className="w-full px-2 py-4 text-center border-b-[2px] border-gray-300 cursor-pointer group  hover:rounded-tr hover:rounded-tl"
              onClick={() => setisTag(2)}
            >
              <p className="text-lg/4 font-semibold capitalize text-gray-700 group-hover:text-cyan-700">
                Danh sách mẫu gửi
              </p>
            </Box>
          </Box>
        );
    }
  };

  const handleShowTagMau = () => {
    switch (isTag as number) {
      case 2:
        return (
          <motion.div
            key={"tag2"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {listCheckbox.length > 0 && (
              <div className="flex items-center justify-end pt-4">
                <button
                  className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-red-500 text-red-500 group hover:bg-red-500"
                  onClick={handleXoaMau}
                >
                  <span className="text-base/4 lg:text-lg/6 font-bold text-red-500 group-hover:text-white">
                    Xóa Mẫu
                  </span>
                </button>
              </div>
            )}
            <Box className="py-4">
              <TableMau
                tableHead={tableHead}
                setListCheckbox={setListCheckbox}
                listCheckbox={listCheckbox}
                tableBody={currentItems}
                setDataEditMaus={setDataEditMaus}
                dataEditMaus={dataEditMaus}
                dataCopyMaus={dataCopyMaus}
                setDataCopyMaus={setDataCopyMaus}
                handleRedirectTag1={() => setisTag(1)}
              />
            </Box>
            {tableBody?.length > 0 && (
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
      default:
        return (
          <motion.div
            key={"tag1"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FormThongTinMau
              handleRedirectDanhSachMau={() => setisTag(2)}
              settableBody={settableBody}
              dataEditMaus={dataEditMaus}
              setDataEditMaus={setDataEditMaus}
              dataCopyMaus={dataCopyMaus}
              setDataCopyMaus={setDataCopyMaus}
              tableBody={tableBody}
              handleRedirectTag2={() => setisTag(2)}
              setData={setData}
            />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      key="form-signup-maus"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-300 rounded-br-[6px] rounded-bl-[6px] py-4 px-4 sm:px-10"
    >
      {handleTagMau()}
      {handleShowTagMau()}
    </motion.div>
  );
};

export default Maus;
