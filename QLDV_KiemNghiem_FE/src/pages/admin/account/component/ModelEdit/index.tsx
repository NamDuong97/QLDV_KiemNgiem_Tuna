import {
  Box,
  Dialog,
  FormControl,
  Grid2,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FaRegSave } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../configs/yup.custom";
import { Inputs } from "../../../../../components/Inputs";
import { FormAccount } from "../../../../../models/Account";

interface ModelEditProps {
  openCreateEdit: boolean;
  handleCloseCreateEdit: () => void;
}

const status = [
  {
    name: "Hoạt Động",
  },
  {
    name: "Đã Hủy",
  },
  {
    name: "Đang Chờ",
  },
];
const positionName = [
  {
    name: "Giám Đốc",
  },
  {
    name: "Phó Giám Đốc",
  },
  {
    name: "Nhân Viên",
  },
];
const departmentName = [
  {
    name: "Khoa Kinh Tế",
  },
  {
    name: "Khoa Nhiệt",
  },
];
const divisionName = [
  {
    name: "Bộ Phận Kiểm Nghiệm",
  },
  {
    name: "Bộ Phận Kế Toán",
  },
];
const fullname = [
  {
    name: "Nguyễn Văn A",
  },
  {
    name: "Nguyễn Văn B",
  },
  {
    name: "Nguyễn Văn C",
  },
];
const ModelEdit = (props: ModelEditProps) => {
  const { openCreateEdit, handleCloseCreateEdit } = props;

  const [selectStatus, setSelectStatus] = useState("");
  const [selectPositionName, setSelectPositionName] = useState("");
  const [selectDepartmentName, setSelectDepartmentName] = useState("");
  const [selectDivisionName, setSelectDivisionName] = useState("");
  const [selectFullname, setSelectFullname] = useState("");

  const handleCloseModelCreateEdit = () => {
    handleCloseCreateEdit();
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setSelectStatus(event.target.value);
  };

  const handleChangePositionName = (event: SelectChangeEvent) => {
    setSelectPositionName(event.target.value);
  };

  const handleChangeDepartmentName = (event: SelectChangeEvent) => {
    setSelectDepartmentName(event.target.value);
  };

  const handleChangeDivisionName = (event: SelectChangeEvent) => {
    setSelectDivisionName(event.target.value);
  };

  const handleChangeFullname = (event: SelectChangeEvent) => {
    setSelectFullname(event.target.value);
  };

  let schema = useMemo(() => {
    return yup.object().shape({
      accountName: yup.string().required("Yêu cầu nhập tên tài khoản"),
      password: yup.string().required("Yêu cầu nhập mật khẩu"),
      positionName: yup.string().required("Yêu cầu chọn tên chức vụ"),
      departmentName: yup.string().required("Yêu cầu chọn tên khoa"),
      divisionName: yup.string().required("Yêu cầu chọn tên bộ phận"),
      fullname: yup.string().required("Yêu cầu chọn họ tên nhân viên"),
      statusAccount: yup.string().required("Yêu cầu chọn trạng thái"),
      passwordDateUpdated: yup.string().required("Yêu cầu chọn ngày cập nhật"),
      passwordDateExpired: yup.string().required("Yêu cầu chọn ngày hết hạn"),
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormAccount>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormAccount) => {
    // const form = new FormData();
    // form.append("email", data.email)
    // form.append("password", data.password)
    console.log(data);
  };

  useEffect(() => {
    reset({
      accountName: "",
      password: "",
      positionName: "",
      departmentName: "",
      divisionName: "",
      fullname: "",
      statusAccount: "",
      passwordDateUpdated: "",
      passwordDateExpired: "",
    });
  }, []);

  return (
    <Dialog
      open={openCreateEdit}
      maxWidth="lg"
      onClose={handleCloseModelCreateEdit}
      aria-labelledby="alert-dialog-position-manager-create"
      aria-describedby="alert-dialog-description-position-manager-create"
    >
      <Box className="flex justify-between items-center p-9 ">
        <Box>
          <p className="font-bold text-2xl/6">Cập Nhật Loại Tài Khoản</p>
        </Box>
        <Box>
          <IconButton
            className="!bg-gray-200 hover:!bg-gray-300"
            onClick={handleCloseModelCreateEdit}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className="px-9 pb-9 gap-8 grid">
        <Box className="border-[1px] border-solid border-gray-300 rounded-md py-6 gap-8 grid">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={4} className="px-6">
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Nhập Tên Tài Khoản"
                    title="Tên Tài Khoản"
                    inputRef={register("accountName")}
                    errorMessage={errors.accountName?.message}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Nhập Mật Khẩu"
                    title="Mật Khẩu"
                    type="password"
                    inputRef={register("password")}
                    errorMessage={errors.password?.message}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="w-full">
                  <p className="font-semibold text-base/6 text-gray_80 mb-2">
                    Chức Vụ
                  </p>
                  <Box>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={selectPositionName}
                        onChange={handleChangePositionName}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Vui lòng chọn chức vụ</MenuItem>
                        {positionName.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <span className="text-red-500">
                      {errors.positionName?.message}
                    </span>
                  </Box>
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="w-full">
                  <p className="font-semibold text-base/6 text-gray_80 mb-2">
                    Khoa
                  </p>
                  <Box>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={selectDepartmentName}
                        onChange={handleChangeDepartmentName}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Vui lòng chọn trạng thái</MenuItem>
                        {departmentName.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <span className="text-red-500">
                      {errors.departmentName?.message}
                    </span>
                  </Box>
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="w-full">
                  <p className="font-semibold text-base/6 text-gray_80 mb-2">
                    Bộ Phận
                  </p>
                  <Box>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={selectDivisionName}
                        onChange={handleChangeDivisionName}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Vui lòng chọn trạng thái</MenuItem>
                        {divisionName.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <span className="text-red-500">
                      {errors.divisionName?.message}
                    </span>
                  </Box>
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="w-full">
                  <p className="font-semibold text-base/6 text-gray_80 mb-2">
                    Họ Tên Nhân Viên
                  </p>
                  <Box>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={selectFullname}
                        onChange={handleChangeFullname}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Vui lòng chọn trạng thái</MenuItem>
                        {fullname.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <span className="text-red-500">
                      {errors.fullname?.message}
                    </span>
                  </Box>
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="w-full">
                  <p className="font-semibold text-base/6 text-gray_80 mb-2">
                    Trạng Thái
                  </p>
                  <Box>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={selectStatus}
                        onChange={handleChangeStatus}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Vui lòng chọn trạng thái</MenuItem>
                        {status.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <span className="text-red-500">
                      {errors.statusAccount?.message}
                    </span>
                  </Box>
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Chọn Ngày Cập Nhật Mật Khẩu"
                    title="Ngày Cập Nhật Mật Khẩu"
                    type="date"
                    sx={{ input: {cursor: 'pointer'} }}
                    inputRef={register("passwordDateUpdated")}
                    errorMessage={errors.passwordDateUpdated?.message}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Chọn Ngày Hết Hạn Mật Khẩu"
                    title="Chọn Ngày Hết Hạn Mật Khẩu"
                    type="date"
                    sx={{ input: {cursor: 'pointer'} }}
                    inputRef={register("passwordDateExpired")}
                    errorMessage={errors.passwordDateExpired?.message}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </form>
        </Box>
        <Box className="flex justify-end">
          <button
            className="px-5 py-3 border-[1px] border-solid border-gray-300 rounded-md flex gap-4 items-center font-medium hover:bg-blue-500 hover:text-white hover:shadow-md cursor-pointer"
            // onClick={handleNextTabForm}
          >
            <FaRegSave className="w-6 h-6" />
            Lưu
          </button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ModelEdit;
