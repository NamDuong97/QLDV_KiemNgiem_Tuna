import { Box, Checkbox, Popover } from "@mui/material";
import { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";

const status = [
  {
    name: "Hoạt động",
    colorIcon: "text-green-400",
  },
  {
    name: "Đã Nghỉ",
    colorIcon: "text-yellow-300",
  },
];

const EmployeeListFilter = () => {
  const [selectStatus, setSelectStatus] = useState(status[0]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectStatus = (item: any) => {
    setSelectStatus(item);
    handleClose();
  };

  return (
    <Box className="p-4 gap-4 grid">
      <Box>
        <p className="font-medium text-base/6">Vai trò</p>
        <Box className="gap-5 flex">
          <Box className="flex items-center">
            <Checkbox />
            <p>Tất cả</p>
          </Box>
          <Box className="flex items-center">
            <Checkbox />
            <p>Nhân viên</p>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className="gap-2 grid">
          <p>Trạng thái</p>
          <Box>
            <button
              className="gap-6 flex items-center p-2 border-[1px] border-gray-200 rounded-md cursor-pointer hover:bg-blue-100"
              onClick={handleClick}
            >
              <Box className="gap-2 flex items-center">
                <FiberManualRecordIcon
                  className={`!w-3 !h-3 ${selectStatus.colorIcon}`}
                />
                <p>{selectStatus.name}</p>
              </Box>
              <KeyboardArrowDownIcon
                className={`${anchorEl && "rotate-180"}`}
              />
            </button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                ".MuiPaper-root ": {
                  border: "1px solid #d1d5dc",
                  borderRadius: "4px",
                  boxShadow: "none",
                  padding: "2px 0",
                },
              }}
            >
              {status.map((item, index) => (
                <Box
                  key={index}
                  className={`flex gap-3 cursor-pointer items-center justify-between hover:bg-gray-100 py-3 px-4 rounded-md ${
                    selectStatus.name === item.name && "bg-gray-100"
                  }`}
                  onClick={() => handleSelectStatus(item)}
                >
                  <Box className="flex gap-2 items-center">
                    <FiberManualRecordIcon
                      className={`!w-3 !h-3 ${item.colorIcon}`}
                    />
                    <p>{item.name}</p>
                  </Box>
                  <Box
                    className={`${
                      selectStatus.name === item.name ? "block" : "hidden"
                    } text-blue-500`}
                  >
                    <DoneIcon />
                  </Box>
                </Box>
              ))}
            </Popover>
          </Box>
        </Box>
      </Box>
      <Box>
        <button className="gap-2 flex items-center p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-400 w-full justify-center">
          Áp dụng
        </button>
      </Box>
    </Box>
  );
};

export default EmployeeListFilter;
