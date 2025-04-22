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
import React, { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MdEdit } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Account,
  FormAccount,
} from "../../../../../models/Account";
import yup from "../../../../../configs/yup.custom";
import { Inputs } from "../../../../../components/Inputs";

interface ModelCreateProps {
  openCreate: boolean;
  handleCloseCreate: () => void;
  tableBody: Account[];
  onDrop: (acceptedFiles: any) => void;
  setDataUrl: React.Dispatch<React.SetStateAction<string>>;
  dataUrl?: string;
}

const stepper = [
  {
    name: "Hồ Sơ",
  },
  {
    name: "Chức Vụ và Tài Khoản",
  },
  {
    name: "Xem Trước",
  },
];

const gender = [
  {
    name: "Nam",
  },
  {
    name: "Nữ",
  },
  {
    name: "Khác",
  },
];

const dataDepartment = [
  {
    id: "01",
    name: "Khoa Kiểm Thử",
  },
  {
    id: "02",
    name: "Khoa Y Dược",
  },
  {
    id: "03",
    name: "Khoa Y Khoa",
  },
  {
    id: "04",
    name: "Khoa Diều Dưỡng",
  },
];

const dataRole = [
  {
    id: "01",
    name: "Trưởng Phòng",
  },
  {
    id: "02",
    name: "Phó Phòng",
  },
  {
    id: "03",
    name: "Nhân viên",
  },
  {
    id: "04",
    name: "Tổ Trưởng",
  },
];

const ModelCreate = (props: ModelCreateProps) => {
  const {
    openCreate,
    handleCloseCreate,
    tableBody,
    onDrop,
    setDataUrl,
    dataUrl,
  } = props;

  const [selectGender, setSelectGender] = useState("");

  const [selectDepartment, setSelectDepartment] = useState("");

  const [selectRole, setSelectRole] = useState("");

  const [isTabForm, setIsTabForm] = useState(1);

  const [isUploadFile, setIsUploadFile] = useState(null);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  // const uploadFile = acceptedFiles[0];
  // console.log("uploadFile", uploadFile, dataUrl);

  const handleCloseModelCreate = () => {
    handleCloseCreate();
    setIsTabForm(1);
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setSelectGender(event.target.value);
  };

  const handleChangeDepartment = (event: SelectChangeEvent) => {
    setSelectDepartment(event.target.value);
  };

  const handleChangeRole = (event: SelectChangeEvent) => {
    setSelectRole(event.target.value);
  };

  const handleNextTabForm = () => {
    setIsTabForm(isTabForm + 1);
  };

  const handleBackTabForm = () => {
    setIsTabForm(isTabForm - 1);
  };

  const handleRemoveUpload = (event: any) => {
    event.preventDefault();
    setDataUrl("");
  };

  const handleIDAccount = () => {
    var department = dataDepartment.find(
      (item) => item.name === selectDepartment
    );
    var role = dataRole.find((item) => item.name === selectRole);
    var idAccount =
      "TN" +
      `${department?.id === undefined ? "00" : department.id}` +
      `${role?.id === undefined ? "00" : role.id}` +
      `0${tableBody.length}`;
    return idAccount;
  };

  let schema = useMemo(() => {
    return yup.object().shape({
      fullname: yup.string().required("Yêu cầu nhập họ tên"),
      CCCD: yup.string().required("Yêu cầu nhập căn cước công dân"),
      gender: yup.string().required("Yêu cầu chọn giới tính"),
      phoneNumber: yup.string().required("Yêu cầu nhập số điện thoại"),
      address: yup.string().required("Yêu cầu nhập địa chỉ"),
      department: yup.string().required("Yêu cầu chọn Khoa"),
      role: yup.string().required("Yêu cầu chọn Chức vụ"),
      idPersonCreate: yup.string().required("Yêu cầu nhập Mã người tạo"),
      expirationTime: yup.string().required("Yêu cầu chọn thời gian hết hạn"),
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

  const handleSwitchForm = (value: any) => {
    switch (value) {
      case 1:
        return (
          <Grid2 container spacing={4} className="px-6">
            <Grid2 size={12}>
              <Box className="flex items-center gap-10">
                <Box className="flex-1/4">
                  <p className="py-2 font-semibold">Hình Ảnh</p>
                </Box>
                <Box className="flex gap-6 items-center cursor-pointer flex-11/12">
                  {dataUrl ? (
                    <Box
                      className="flex gap-4 items-center relative"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <span className="border-2 border-solid border-gray-400 bg-gray-300 rounded-full">
                        <img
                          src={dataUrl}
                          className="w-[108px] h-[108px] text-white rounded-full"
                        />
                      </span>
                      <span className="absolute bottom-0 right-2 p-1 border-2 border-solid bg-white border-gray-400 rounded-full shadow-2xl group hover:bg-blue-400 hover:border-blue-400 cursor-pointer">
                        <MdEdit className="!w-4 !h-4 text-gray-500 group-hover:text-white" />
                      </span>
                    </Box>
                  ) : (
                    <Box
                      className="flex gap-4 items-center relative"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <span className="p-5 border-2 border-solid border-gray-400 bg-gray-300 rounded-full">
                        <FaUserAlt className="w-16 h-16 text-white" />
                      </span>

                      <span className="absolute bottom-0 right-2 p-1 border-2 border-solid bg-white border-gray-400 rounded-full shadow-2xl group hover:bg-blue-400 hover:border-blue-400 cursor-pointer">
                        <MdEdit className="!w-4 !h-4 text-gray-500 group-hover:text-white" />
                      </span>
                    </Box>
                  )}

                  <button
                    className="flex gap-2 items-center py-2 px-3 border-[1px] border-solid border-gray-300 rounded-md hover:shadow-md group hover:bg-blue-400 cursor-pointer"
                    onClick={handleRemoveUpload}
                  >
                    <MdDelete className="w-5 h-5 group-hover:text-white" />
                    <span className="font-medium group-hover:text-white">
                      Xóa
                    </span>
                  </button>
                </Box>
              </Box>
            </Grid2>

            <Grid2 size={7} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs
                  placeholder="Nhập Họ Tên"
                  title="Họ Tên"
                  inputRef={register("fullname")}
                  errorMessage={errors.fullname?.message}
                />
              </Box>
            </Grid2>

            <Grid2 size={5} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs
                  placeholder="Nhập Số Căn Cước Công Dân"
                  title="Số Căn Cước Công Dân"
                  inputRef={register("CCCD")}
                  errorMessage={errors.CCCD?.message}
                />
              </Box>
            </Grid2>

            <Grid2 size={3} className="flex items-center">
              <Box className="w-full">
                <p className="font-semibold text-base/6 text-gray_80 mb-2">
                  Giới Tính
                </p>
                <Box>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={selectGender}
                      onChange={handleChangeGender}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        Vui lòng chọn giới tính
                      </MenuItem>
                      {gender.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <span className="text-red-500">{errors.gender?.message}</span>
                </Box>
              </Box>
            </Grid2>

            <Grid2 size={9} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs
                  type="tel"
                  placeholder="Nhập Số Điện Thoại"
                  title="Số Điện Thoại"
                />
              </Box>
            </Grid2>

            <Grid2 size={12} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs placeholder="Nhập Địa Chỉ" title="Địa Chỉ" />
              </Box>
            </Grid2>
          </Grid2>
        );
      case 2:
        return (
          <Grid2 container spacing={4} className="px-6">
            <Grid2 size={6} className="flex items-center">
              <Box className="w-full">
                <p className="font-semibold text-base/6 text-gray_80 mb-2">
                  Khoa
                </p>
                <Box>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={selectDepartment}
                      onChange={handleChangeDepartment}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        Vui lòng chọn Khoa
                      </MenuItem>
                      {dataDepartment.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid2>

            <Grid2 size={6} className="flex items-center">
              <Box className="w-full">
                <p className="font-semibold text-base/6 text-gray_80 mb-2">
                  Chức Vụ (Vai Trò)
                </p>
                <Box>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={selectRole}
                      onChange={handleChangeRole}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        Vui lòng chọn Chức Vụ
                      </MenuItem>
                      {dataRole.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid2>

            <Grid2 size={6} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs
                  title="Tên Tài Khoản"
                  defaultValue={handleIDAccount()}
                  disabled={true}
                />
              </Box>
            </Grid2>

            <Grid2 size={6} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs
                  type="password"
                  placeholder="Nhập Mật Khẩu"
                  title="Mật Khẩu"
                  autocomplete="off"
                />
              </Box>
            </Grid2>

            <Grid2 size={6} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs placeholder="Nhập Mã Người Tạo" title="Mã Người Tạo" />
              </Box>
            </Grid2>

            <Grid2 size={6} className="flex items-center">
              <Box className="flex gap-6 items-center w-full">
                <Inputs
                  type="date"
                  title="Thời Gian Hết Hạn Mật Khẩu"
                  className="cursor-pointer"
                />
              </Box>
            </Grid2>
          </Grid2>
        );
      case 3:
        return (
          <Grid2 container spacing={3} className="px-6">
            <Grid2 size={12}>
              <Box className="flex items-center justify-center bg-blue-300 rounded-lg h-28 relative">
                {dataUrl ? (
                  <span className="border-2 border-solid border-gray-400 bg-gray-300 rounded-full absolute bottom-[-25px] shadow-md">
                    <img
                      src={dataUrl}
                      className="w-[108px] h-[108px] text-white rounded-full"
                    />
                  </span>
                ) : (
                  <span className="p-5 border-2 border-solid border-gray-400 bg-gray-300 rounded-full absolute bottom-[-25px] shadow-md">
                    <FaUserAlt className="w-16 h-16 text-white" />
                  </span>
                )}
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Họ Tên:</p>
                <p>Nguyễn Văn A</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Chứng Minh Nhân Dân:</p>
                <p>079461934...</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Giới Tính:</p>
                <p>Nam</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Số Điện Thoại:</p>
                <p>0794619345</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Địa Chỉ:</p>
                <p>69 Lê Lợi, Phường 1, Quận 1, Thành Phố Hồ Chí Minh</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Khoa:</p>
                <p>Khoa Kiểm Thử</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Chức Vụ:</p>
                <p>Nhân Viên</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Tên Tài Khoản:</p>
                <p>TN010101</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Mật Khẩu:</p>
                <p>123</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">Mã Người Tạo:</p>
                <p>TN000001</p>
              </Box>
            </Grid2>
            <Grid2 size={6} className="pl-16">
              <Box className="flex items-center gap-4">
                <p className="font-medium text-base/4">
                  Thời Gian Hết Hạn Mật Khẩu:
                </p>
                <p>16/01/2027</p>
              </Box>
            </Grid2>
          </Grid2>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={openCreate}
      maxWidth="lg"
      onClose={handleCloseModelCreate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box className="flex justify-between items-center p-9 ">
        <Box>
          <p className="font-bold text-2xl/6">Thêm Nhân Viên</p>
        </Box>
        <Box>
          <IconButton
            className="!bg-gray-200 hover:!bg-gray-300"
            onClick={handleCloseModelCreate}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className="px-9 pb-9 gap-8 grid">
        <Box className="flex justify-between px-2 py-1 border-[1px] border-solid border-gray-300  rounded-md">
          <Grid2 container spacing={{ xs: 2, md: 5 }} className="w-full">
            {stepper.map((item, index) => (
              <Grid2
                size={4}
                className={`flex gap-3 items-center py-2 justify-center rounded-md ${
                  isTabForm >= index + 1 && "text-blue-500"
                }`}
                key={index}
              >
                <p
                  className={`p-4 border-[1px] border-solid border-gray-500 rounded-full w-4 h-4 flex items-center justify-center ${
                    isTabForm >= index + 1 &&
                    "!border-white bg-blue-500 text-white"
                  }`}
                >
                  {index + 1}
                </p>
                <p className="font-medium text-lg/6">{item.name}</p>
              </Grid2>
            ))}
          </Grid2>
        </Box>
        <Box className="border-[1px] border-solid border-gray-300 rounded-md py-6 gap-8 grid">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {handleSwitchForm(isTabForm)}
          </form>
        </Box>
        <Box
          className={`flex ${
            isTabForm > 1 ? "justify-between" : "justify-end"
          }`}
        >
          {isTabForm > 1 && (
            <Box>
              <button
                className="px-5 py-3 border-[1px] border-solid border-gray-300 rounded-md flex gap-4 items-center font-medium hover:bg-amber-300 hover:text-white hover:shadow-md cursor-pointer"
                onClick={handleBackTabForm}
              >
                <FaArrowAltCircleLeft className="w-6 h-6" />
                Trở về
              </button>
            </Box>
          )}
          {isTabForm < 3 ? (
            <Box>
              <button
                className="px-5 py-3 border-[1px] border-solid border-gray-300 rounded-md flex gap-4 items-center font-medium hover:bg-blue-500 hover:text-white hover:shadow-md cursor-pointer"
                onClick={handleNextTabForm}
              >
                Tiếp
                <FaArrowAltCircleRight className="w-6 h-6" />
              </button>
            </Box>
          ) : (
            <Box>
              <button
                className="px-5 py-3 border-[1px] border-solid border-gray-300 rounded-md flex gap-4 items-center font-medium hover:bg-blue-500 hover:text-white hover:shadow-md cursor-pointer"
                // onClick={handleNextTabForm}
              >
                <FaRegSave className="w-6 h-6" />
                Lưu
              </button>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ModelCreate;
