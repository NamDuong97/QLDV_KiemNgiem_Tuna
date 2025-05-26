import { Box, Pagination } from "@mui/material";
import { motion } from "motion/react";
import TableMau from "./TableMau";
import { APP_ROUTES } from "../../../../../constants/routers";
import { Align } from "../../../../../models/Table";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import InputSearch from "../../../../../components/InputSearch";
import removeVietnameseTones from "../../../../../configs/removeVietnameseTones";

interface ListMauProps {
  handleRedirectTag1?: () => void;
  handleRedirectTag3?: () => void;
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
  const { handleRedirectTag1, handleRedirectTag3 } = props;

  const [valueSearch, setValueSearch] = useState("");
  const [tableBody, settableBody] = useState(() => {
    const data = sessionStorage.getItem("PhieuDangKy");
    return data ? JSON.parse(data).Mau : [];
  });

  const [listCheckbox, setListCheckbox] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const naginate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableBody?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableBody && tableBody.length / itemsPerPage);

  useEffect(() => {
    const data = sessionStorage.getItem("PhieuDangKy");
    const dataTableBody = data ? JSON.parse(data).Mau : [];

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
    console.log('event',event);
    
    setCurrentPage(value);
  };

  const handleXoaMau = () => {
    const data = tableBody.filter((item: any) => {
      return !listCheckbox.some(
        (subitem: any) => subitem.TenMau === item.TenMau
      );
    });
    const dataTest = sessionStorage.getItem("PhieuDangKy");
    const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;
    const PhieuDangKy = {
      ...dataPhieuDangky,
      Mau: data,
    };
    sessionStorage.setItem("PhieuDangKy", JSON.stringify(PhieuDangKy));
    settableBody(data);
    setListCheckbox([]);
  };

  return (
    <Box>
      <motion.div
        key="tag2"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        
      >
        <Box className="gap-5 sm:gap-0 flex flex-wrap-reverse sm:flex-nowrap justify-end sm:justify-between items-center py-2 sm:py-4 px-4">
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
                onClick={handleXoaMau}
              >
                <span className="text-base/4 lg:text-lg/6 font-bold text-red-500 group-hover:text-white">
                  Xóa Mẫu
                </span>
              </button>
            )}

            <button
              className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500"
              onClick={() => naginate(APP_ROUTES.TUNA_CUSTOMER.CREATE_MAU.to)}
            >
              <span className="text-base/4 lg:text-lg/6 font-bold text-blue-500 group-hover:text-white">
                Thêm Mẫu
              </span>
            </button>
          </Box>
        </Box>
        <Box className="px-4 py-2">
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
      </motion.div>
      <Box
        className={`border-t border-solid border-gray-300 py-4 px-4 flex justify-between`}
      >
        <motion.div
          key="btn_back"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="bg-amber-400  px-3 py-1 lg:px-6 lg:py-2 rounded cursor-pointer hover:bg-amber-500 shadow-[inset_0_0_6px_rgba(0,0,0,0.2)] hover:shadow-none"
            onClick={handleRedirectTag1}
          >
            <span className="text-lg/6 font-bold text-amber-50">Quay lại</span>
          </button>
        </motion.div>

        <motion.div
          key="btn_next_2"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className={`bg-blue-500 px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer hover:bg-blue-400 shadow-[inset_0_0_6px_rgba(0,0,0,0.2)] hover:shadow-none ${
              tableBody?.length <= 0 &&
              "disabled:bg-blue-300 hover:cursor-no-drop"
            }`}
            disabled={tableBody?.length <= 0 && true}
            onClick={handleRedirectTag3}
          >
            <span className="text-lg/6 font-bold text-amber-50">Tiếp</span>
          </button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ListMau;
