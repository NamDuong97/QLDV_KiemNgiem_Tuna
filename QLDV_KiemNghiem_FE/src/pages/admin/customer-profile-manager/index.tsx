import { Box, Pagination, Popover, Stack } from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import DoneIcon from "@mui/icons-material/Done";
// import InputSearch from "../../../components/InputSearch";
import EmployeeListFilter from "../../../components/Popup/Filter/EmployeeListFilter";
// import { statusPosition } from "../../../models/Position";
// import Table from "./component/Table";

// const tableHead = [
//   {
//     id: "id",
//     sort: false,
//     label: "ID",
//   },
//   {
//     id: "chucvu",
//     sort: false,
//     label: "Chức Vụ",
//   },
//   {
//     id: "trangthai",
//     sort: false,
//     label: "Trạng Thái",
//   },
// ];

// const tableBody = [
//   {
//     id: "001",
//     position: "Giám Đốc",
//     status: statusPosition.activity,
//   },
//   {
//     id: "002",
//     position: "Phó Giám Đốc",
//     status: statusPosition.activity,
//   },
//   {
//     id: "003",
//     position: "Trường Phòng",
//     status: statusPosition.canceled,
//   },
//   {
//     id: "004",
//     position: "Nhân viên",
//     status: statusPosition.activity,
//   },
// ];

const numberRow = [
  {
    number: 5,
  },
  {
    number: 10,
  },
  {
    number: 20,
  },
  {
    number: 50,
  },
];

const CustomerProfileManager = () => {
  const [selectNumberRow, 
    // setSelectNumberRow

  ] = useState(numberRow[0]);
  // const [sort, setSort] = useState<string | null>(null);
  // const [openCreate, setOpenCreate] = useState(false);
  // const handleOpenCreate = () => setOpenCreate(true);
  // const handleCloseCreate = () => setOpenCreate(false);
  // const [anchorElSelectNumberRow, setAnchorElSelectNumberRow] =
  //   useState<HTMLButtonElement | null>(null);
  const [anchorElFilter, setAnchorElFilter] =
    useState<HTMLButtonElement | null>(null);
  // const openSelectNumberRow = Boolean(anchorElSelectNumberRow);
  const openFilter = Boolean(anchorElFilter);

  const handleClickSelectNumberRow = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log('event',event);
    
    // setAnchorElSelectNumberRow(event.currentTarget);
  };
  const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElFilter(event.currentTarget);
  };

  // const handleCloseSelectNumberRow = () => {
  //   // setAnchorElSelectNumberRow(null);
  // };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };

  // const handleSort = (value: string) => {
  //   setSort(sort === value ? null : value);
  // };

  // const handleSelectNumberRow = (value: any) => {
  //   setSelectNumberRow(value);
  //   handleCloseSelectNumberRow();
  // };

  return (
    <Box className="p-6">
      <Box className="flex justify-between py-6">
        <h2 className="font-semibold text-2xl">Danh Sách Hồ Sơ Đăng Ký</h2>
      </Box>
      <hr className="text-gray-200" />
      <Box className="py-6">
        <Box className="border-[1px] border-solid border-gray-300 shadow-2xs rounded-2xl bg-gray-50">
          <Box className="p-4 border-b-[1px] border-solid border-gray-300 shadow-2xs flex justify-between">
            <Box>
              {/* <InputSearch
                name="searchManagerAccount"
                placeholder="Tìm Kiếm..."
              /> */}
            </Box>
            <Box className="flex items-center relative">
              <button
                className="flex items-center gap-2 px-4 py-2 border-[1px] border-solid border-gray-300 rounded-md hover:bg-gray-300 cursor-pointer hover:shadow-md hover:ease-in-out hover:duration-500"
                onClick={handleClickFilter}
              >
                <FilterListIcon />
                <p>Bộ lọc</p>
                <p className="bg-gray-50 rounded-full text-sm w-5 h-5 flex items-center justify-center">
                  2
                </p>
              </button>
              <Popover
                open={openFilter}
                anchorEl={anchorElFilter}
                onClose={handleCloseFilter}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <EmployeeListFilter />
              </Popover>
              {/* 
              /> */}
            </Box>
          </Box>
          {/* <Box>
            <Table
              tableHead={tableHead}
              tableBody={tableBody}
              handleSort={handleSort}
              sort={sort}
            />
          </Box> */}
          <Box className="px-4 pt-5 pb-5 border-t-[1px] border-b-0 border-solid border-gray-300 shadow-2xs rounded-bl-2xl rounded-br-2xl flex">
            <Box className="flex-1 flex gap-2">
              <p>Hiển thị:</p>
              <Box className="relative">
                <button
                  className="flex cursor-pointer"
                  onClick={handleClickSelectNumberRow}
                >
                  <p className="w-6 h-6">{selectNumberRow.number}</p>
                  <KeyboardArrowDownIcon />
                </button>
                {/* <Popover
                  open={openSelectNumberRow}
                  // anchorEl={anchorElSelectNumberRow}
                  onClose={handleCloseSelectNumberRow}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  sx={{
                    ".MuiPaper-root": {
                      border: "1px solid #d1d5dc",
                      padding: "2px 0",
                      boxShadow: 0,
                    },
                  }}
                >
                  {numberRow.map((item, index) => (
                    <Box
                      key={index}
                      className="px-2 py-[2px] hover:bg-blue-200"
                    >
                      <button
                        className="flex gap-4 justify-between w-full cursor-pointer"
                        onClick={() => handleSelectNumberRow(item)}
                      >
                        <span className="w-5 h-5 text-start text-sm">
                          {item.number}
                        </span>
                        {selectNumberRow.number === item.number && (
                          <DoneIcon className="!w-4 !h-4 text-blue-700" />
                        )}
                      </button>
                    </Box>
                  ))}
                </Popover> */}
              </Box>
              <p>trong số 24</p>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Pagination
                  count={5}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerProfileManager;
