import { Box, IconButton, Pagination } from "@mui/material";
import { motion } from "motion/react";
import TableMau from "./TableMau";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Align } from "../../../../../../models/Table";
import removeVietnameseTones from "../../../../../../configs/removeVietnameseTones";
import InputSearch from "../../../../../../components/InputSearch";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import PopupXoaMau from "./PopupXoaMau";

interface ListMauProps {
  dataListMau?: any[];
}

const tableHead = [
  {
    id: "TenMau",
    sort: false,
    label: "Tên Mẫu",
    align: Align.Left,
  },
  {
    id: "LoaiMau",
    sort: false,
    label: "Loại Mẫu",
    align: Align.Center,
  },
  {
    id: "TieuChuan",
    sort: false,
    label: "TieuChuan",
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
    label: "Số lượng",
    align: Align.Center,
  },
];

const ListMau = (props: ListMauProps) => {
  const { dataListMau } = props;

  const [valueSearch, setValueSearch] = useState("");
  const [tableBody, settableBody] = useState(() => {
    return dataListMau ? dataListMau : [];
  });
  const [listCheckbox, setListCheckbox] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const url = useLocation().pathname;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableBody?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableBody && tableBody.length / itemsPerPage);
  const [openPopupXoaMau, setOpenPopupXoaMau] = useState(false);

  useEffect(() => {
    const dataTableBody = dataListMau ? dataListMau : [];

    if (valueSearch.trim()) {
      const search = valueSearch.trim().toLowerCase();
      const keywords = removeVietnameseTones(search).split(/\s+/);

      const filtered = dataTableBody.filter((item: any) => {
        const target = removeVietnameseTones(item.TenMau.toLowerCase());
        return keywords.every((keyword) => target.includes(keyword));
      });
      settableBody(filtered);
    } else {
      settableBody(dataTableBody);
    }
  }, [valueSearch]);

  const handlePageChange = (event: any, value: number) => {
    console.log("event", event);

    setCurrentPage(value);
  };

  return (
    <motion.div
      key="danh-sach-mau"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 pt-6 pb-12 px-6"
    >
      <Box className="flex justify-between items-center">
        <Box className="flex items-center gap-2">
          <IconButton
            className="cursor-pointer !rounded !p-1"
            onClick={() => {
              navigate(`${url}?tuna=phieu-dang-ky`);
            }}
          >
            <IoArrowBackCircleOutline className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-blue-600" />
          </IconButton>

          <p className="text-[22px]/6 lg:text-3xl/6 font-bold text-gray-800">
            Danh sách Mẫu
          </p>
        </Box>
        <Box className="hidden sm:block">
          <button
            type="button"
            onClick={() => navigate(`${url}?tuna=danh-sach-phu-lieu-hoa-chat`)}
            className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500"
          >
            <span className="text-base/6 md:text-lg/6 font-bold text-blue-500 group-hover:text-white">
              Tiếp
            </span>
          </button>
        </Box>
      </Box>
      <hr className="text-gray-300" />
      <Box className="sm:border sm:border-solid sm:border-gray-300 sm:rounded-[10px] overflow-x-auto whitespace-nowrap">
        <Box className="gap-5 sm:gap-0 flex flex-wrap-reverse sm:flex-nowrap justify-end sm:justify-between items-center py-2 sm:py-4 sm:px-4">
          <Box className="w-full sm:w-auto">
            <InputSearch
              placeholder="Tìm kiếm Tên mẫu..."
              square={true}
              width="w-full md:w-[284px]"
              setValue={setValueSearch}
            />
          </Box>
          <Box className={`flex justify-end gap-6`}>
            {listCheckbox.length > 0 && (
              <button
                className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-red-500 text-red-500 group hover:bg-red-500"
                onClick={() => setOpenPopupXoaMau(true)}
              >
                <span className="text-base/4 lg:text-lg/6 font-bold text-red-500 group-hover:text-white">
                  Xóa Mẫu
                </span>
              </button>
            )}

            <button
              className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500"
              onClick={() => navigate(`${url}/them-thong-tin-mau`)}
            >
              <span className="text-base/4 lg:text-lg/6 font-bold text-blue-500 group-hover:text-white">
                Thêm Mẫu
              </span>
            </button>
          </Box>
        </Box>
        <Box className="sm:px-4 py-2">
          <TableMau
            tableHead={tableHead}
            setListCheckbox={setListCheckbox}
            listCheckbox={listCheckbox}
            tableBody={currentItems}
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
        <Box className="block sm:hidden pt-6">
          <button
            type="button"
            onClick={() => navigate(`${url}?tuna=danh-sach-phu-lieu-hoa-chat`)}
            className="py-2 w-full rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500"
          >
            <span className="text-base/6 md:text-lg/6 font-bold text-blue-500 group-hover:text-white">
              Tiếp
            </span>
          </button>
        </Box>
      </Box>
      <PopupXoaMau
        open={openPopupXoaMau}
        handleClose={() => setOpenPopupXoaMau(false)}
        listCheckbox={listCheckbox}
      />
      ;
    </motion.div>
  );
};

export default ListMau;
