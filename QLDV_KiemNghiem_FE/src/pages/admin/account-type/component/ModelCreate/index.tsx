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
import { FormAccountTypeCreate } from "../../../../../models/Account-Type";

interface ModelCreateProps {
  openCreateEdit: boolean;
  handleCloseCreateEdit: () => void;
  name?: string;
}

const status = [
  {
    name: "Hoạt Động",
  },
  {
    name: "Đang Chờ",
  },
];

const ModelCreate = (props: ModelCreateProps) => {
  const { openCreateEdit, handleCloseCreateEdit, name } = props;

  const [selectStatus, setSelectStatus] = useState("");

  const handleCloseModelCreate = () => {
    handleCloseCreateEdit();
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setSelectStatus(event.target.value);
  };

  let schema = useMemo(() => {
    return yup.object().shape({
      accountTypeID: yup.string().required("Yêu cầu nhập mã loại tài khoản"),
      accountTypeName: yup.string().required("Yêu cầu nhập loại tài khoản"),
      userCreate: yup.string().required("Yêu cầu nhập mã người tạo"),
      statusAccountType: yup.string().required("Yêu cầu nhập chọn trạng thái"),
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormAccountTypeCreate>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormAccountTypeCreate) => {
    // const form = new FormData();
    // form.append("email", data.email)
    // form.append("password", data.password)
    console.log(data);
  };

  useEffect(() => {
    reset({
      accountTypeID: "",
      accountTypeName: "",
      userCreate: "",
      statusAccountType: "",
    });
  }, []);

  return (
    <Dialog
      open={openCreateEdit}
      maxWidth="lg"
      onClose={handleCloseModelCreate}
      aria-labelledby="alert-dialog-position-manager-create"
      aria-describedby="alert-dialog-description-position-manager-create"
    >
      <Box className="flex justify-between items-center p-9 ">
        <Box>
          <p className="font-bold text-2xl/6">
            {name === "create" && " Thêm Bộ Phận"}
            {name === "edit" && "Cập Nhật Bộ Phận"}
          </p>
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
        <Box className="border-[1px] border-solid border-gray-300 rounded-md py-6 gap-8 grid">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={4} className="px-6">
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Nhập Mã Loại Tài Khoản"
                    title="Mã Loại Tài Khoản"
                    inputRef={register("accountTypeID")}
                    errorMessage={errors.accountTypeID?.message}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Nhập Tên Loại Tài Khoản"
                    title="Tên Loại Tài Khoản"
                    inputRef={register("accountTypeName")}
                    errorMessage={errors.accountTypeName?.message}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6} className="flex items-center">
                <Box className="flex gap-6 items-center w-full">
                  <Inputs
                    placeholder="Nhập Mã Người Tạo"
                    title="Mã Người Tạo"
                    inputRef={register("userCreate")}
                    errorMessage={errors.userCreate?.message}
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
                      {errors.statusAccountType?.message}
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

export default ModelCreate;
