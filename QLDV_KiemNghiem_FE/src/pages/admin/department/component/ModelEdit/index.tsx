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
import { FormDepartmentEdit } from "../../../../../models/department";

interface ModelEditProps {
  openCreateEdit: boolean;
  handleCloseCreateEdit: () => void;
  name?: string;
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

const ModelEdit = (props: ModelEditProps) => {
  const { openCreateEdit, handleCloseCreateEdit, name } = props;

  const [selectStatus, setSelectStatus] = useState("");

  const handleCloseModelCreateEdit = () => {
    handleCloseCreateEdit();
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setSelectStatus(event.target.value);
  };

  let schema = useMemo(() => {
    return yup.object().shape({
      departmentID: yup.string().required("Yêu cầu nhập mã khoa"),
      departmentName: yup.string().required("Yêu cầu nhập khoa"),
      userEdit: yup.string().required("Yêu cầu nhập mã người tạo"),
      statusDepartment: yup.string().required("Yêu cầu nhập chọn trạng thái"),
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDepartmentEdit>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormDepartmentEdit) => {
    // const form = new FormData();
    // form.append("email", data.email)
    // form.append("password", data.password)
    console.log(data);
  };

  useEffect(() => {
    reset({
      departmentID: "",
      departmentName: "",
      userEdit: "",
      statusDepartment: "",
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
          <p className="font-bold text-2xl/6">Cập Nhật Khoa</p>
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
                    placeholder="Nhập Mã Khoa"
                    title="Mã Khoa"
                    inputRef={register("departmentID")}
                    errorMessage={errors.departmentID?.message}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Nhập Tên Khoa"
                    title="Tên Khoa"
                    inputRef={register("departmentName")}
                    errorMessage={errors.departmentName?.message}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Nhập Mã Người Sửa"
                    title="Mã Người Sửa"
                    inputRef={register("userEdit")}
                    errorMessage={errors.userEdit?.message}
                  />
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
                      {errors.statusDepartment?.message}
                    </span>
                  </Box>
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
