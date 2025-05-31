import { Box, Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { FormThemMauVaoDanhMuc } from "../../../../../../../../../models/PhieuDangKy";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import yup from "../../../../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "../../../../../../../../../components/Inputs";
import InputSelectLoaiMau from "./InputSelectLoaiMau";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const dataLoaiMau = [
  {
    maID: "L001",
    tenLoaiMau: "Loại 1",
  },
  {
    maID: "L002",
    tenLoaiMau: "Loại 2",
  },
  {
    maID: "L003",
    tenLoaiMau: "Loại 3",
  },
];

const PopupThemMau = (props: Props) => {
  const { open, handleClose } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      tenMau: yup
        .string()
        .required("Yêu cầu nhập Tên Mẫu")
        .max(200, "Tên Mẫu nhập không quá 200 ký tự"),
      // .test("Trùng tên mẫu", "Tên mẫu đã tồn tại", (value) => {
      //   const isTrungLap = dataPhieuDangky?.Mau?.find(
      //     (item: any) => item.TenMau === value
      //   );
      //   return !isTrungLap ? true : false;
      // })
      maID: yup.string().required("Yêu cầu chọn Loại mẫu"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormThemMauVaoDanhMuc>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLoc = (data: FormThemMauVaoDanhMuc) => {
    console.log("data", data);
  };

  useEffect(() => {
    reset({
      tenMau: "",
      maID: "",
    });
  }, []);

  return (
    <Dialog open={open} maxWidth="lg" onClose={handleClose}>
      <Box className="w-[500px]">
        <Box className="px-4 py-4 border-b border-solid border-gray-300 flex justify-between items-center">
          <Box className="text-center flex-1 pl-[34px]">
            <p className="text-gray-80 font-bold text-2xl/6">Thêm Mẫu</p>
          </Box>
          <button
            onClick={handleClose}
            className="p-1 rounded-full group hover:bg-blue-200"
          >
            <IoMdClose className="text-gray-500 group-hover:text-blue-800" />
          </button>
        </Box>
        <form
          onSubmit={handleSubmit(handleLoc)}
          className="px-4 py-5 grid gap-6"
        >
          <Box className="grid gap-2">
            <Inputs
              title="Tên Mẫu"
              name="tenMau"
              inputRef={register("tenMau")}
              errorMessage={errors.tenMau?.message}
              placeholder="Yêu cầu chọn Tên Mẫu"
              className="h-[42px]"
              sx={{
                input: {
                  padding: "9.5px 14px",
                },
              }}
            />
            <InputSelectLoaiMau
              title="Loại Mẫu:"
              name="maID"
              control={control}
              errorMessage={errors.maID?.message}
              data={dataLoaiMau}
              placeholder="Yêu cầu chọn Loại Mẫu"
            />
          </Box>
          <Box>
            <button className="w-full flex justify-center border border-solid border-blue-500 rounded-md px-3 py-[6px] text-blue-500 font-bold text-base/6 gap-2 cursor-pointer hover:bg-blue-500 hover:text-white">
              Thêm
            </button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default PopupThemMau;
