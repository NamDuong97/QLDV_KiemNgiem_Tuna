import { Box, Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { FormThemTieuChuanVaoDanhMuc } from "../../../../../../../../../models/PhieuDangKy";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import yup from "../../../../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "../../../../../../../../../components/Inputs";
import { useCreateTieuChuan } from "../../../../../../../../../hooks/customers/usePhieuDKyDVKN";
import { useQueryClient } from "@tanstack/react-query";
import HandleSnackbar from "../../../../../../../../../components/HandleSnackbar";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const PopupThemTieuChuan = (props: Props) => {
  const { open, handleClose } = props;
  const [isSuccess, setIsSuccess] = useState({
    open: false,
    message: "",
    status: 0,
  });
  const queryClient = useQueryClient();
  const dataTieuChuanAll: any = queryClient.getQueryData(["TieuChuanAll"]);

  let schema = useMemo(() => {
    return yup.object().shape({
      tenTieuChuan: yup
        .string()
        .required("Yêu cầu nhập Tiêu Chuẩn")
        .max(200, "Tiêu Chuẩn nhập không quá 200 ký tự")
        .test("Trùng Tiêu Chuẩn", "Tiêu Chuẩn đã tồn tại", (value) => {
          if (!value) return true;
          const trimmedValue = value.trim().toLowerCase();

          const isTrungLap = dataTieuChuanAll.find(
            (item: any) =>
              item.tenTieuChuan?.trim().toLowerCase() === trimmedValue
          );

          return !isTrungLap;
        }),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormThemTieuChuanVaoDanhMuc>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleOnSettled = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["TieuChuanAll"],
    });
  };

  const { mutate } = useCreateTieuChuan({
    queryKey: "CreateTieuChuan",
    onSuccess: (response) => {
      console.log("response", response);
      if (response.status === 200) {
        setIsSuccess({ open: true, message: "Thêm thành công", status: 200 });
        reset({
          tenTieuChuan: "",
        });
      }
    },
    onError: (errors) => {
      if (errors) {
        setIsSuccess({ open: true, message: "Thêm thất bại", status: 400 });
      }
    },
    onSettled: handleOnSettled,
  });

  const handleClosePopup = () => {
    setIsSuccess({ open: false, message: "", status: 0 });
    handleClose?.();
    reset({
      tenTieuChuan: "",
    });
  };

  const handleThem = (data: FormThemTieuChuanVaoDanhMuc) => {
    const dataFinal = {
      tenTieuChuan: data.tenTieuChuan,
      trangThai: true,
    };
    mutate(dataFinal);
  };

  useEffect(() => {
    reset({
      tenTieuChuan: "",
    });
  }, [reset]);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClosePopup}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "10px",
        },
      }}
    >
      <Box className="lg:w-[400px]">
        <Box className="px-4 py-4 border-b border-solid border-gray-300 flex justify-between items-center">
          <Box className="text-center flex-1 pl-[34px]">
            <p className="text-gray-80 font-bold text-2xl/6">Thêm Tiêu Chuẩn</p>
          </Box>
          <button
            onClick={handleClosePopup}
            className="p-1 rounded-full group hover:bg-blue-200"
          >
            <IoMdClose className="text-gray-500 group-hover:text-blue-800" />
          </button>
        </Box>
        <form
          onSubmit={handleSubmit(handleThem)}
          className="px-4 py-5 grid gap-6"
        >
          <Box className="grid gap-2">
            <Inputs
              title="Tên Tiêu Chuẩn"
              name="tenTieuChuan"
              inputRef={register("tenTieuChuan")}
              errorMessage={errors.tenTieuChuan?.message}
              placeholder="Yêu cầu chọn Tiêu Chuẩn"
              className="h-[42px]"
              sx={{
                input: {
                  padding: "9.5px 14px",
                },
              }}
            />
          </Box>
          <Box>
            <button className="w-full flex justify-center border border-solid border-blue-500 rounded-md px-3 py-[6px] text-blue-500 font-bold text-base/6 gap-2 cursor-pointer hover:bg-blue-500 hover:text-white">
              Thêm
            </button>
          </Box>
        </form>
      </Box>
      <HandleSnackbar isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </Dialog>
  );
};

export default PopupThemTieuChuan;
