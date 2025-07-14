import { Box, Dialog } from "@mui/material";
import { FormThemTieuChuanVaoDanhMuc } from "../../../../../../../../../models/PhieuDangKy";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import yup from "../../../../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "../../../../../../../../../components/Inputs";
import { useCreateTieuChuan } from "../../../../../../../../../hooks/customers/usePhieuDKyDVKN";
import { useQueryClient } from "@tanstack/react-query";
import { useStoreNotification } from "../../../../../../../../../configs/stores/useStoreNotification";
import { FaBookOpen } from "react-icons/fa";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const PopupThemTieuChuan = (props: Props) => {
  const { open, handleClose } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
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

          const isTrungLap = dataTieuChuanAll?.find(
            (item: any) =>
              item.tenTieuChuan?.trim().toLowerCase() === trimmedValue
          );

          return !isTrungLap;
        }),
    });
  }, [dataTieuChuanAll]);

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
        showNotification({
          message: "Thêm thành công",
          status: 200,
        });
        reset({
          tenTieuChuan: "",
        });
      }
    },
    onError: (errors) => {
      if (errors) {
        showNotification({ message: "Thêm thất bại", status: 400 });
      }
    },
    onSettled: handleOnSettled,
  });

  const handleClosePopup = () => {
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
      <Box className="lg:w-[500px]">
        <Box className="px-4 pt-8 text-center">
          <Box className="grid gap-2">
            <Box className="flex justify-center">
              <FaBookOpen className="w-10 h-10 sm:w-[70px] sm:h-[70px] text-cyan-700" />
            </Box>

            <p className="text-gray-80 font-bold text-xl/4 sm:text-[28px]/6">
              Thêm Mẫu
            </p>
          </Box>
        </Box>
        <form onSubmit={handleSubmit(handleThem)} className="px-4 py-5">
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
          <Box className="flex gap-6 justify-center">
            <button
              type="button"
              onClick={handleClosePopup}
              className="flex justify-center border border-solid border-indigo-600 rounded-md px-12 py-[6px] text-indigo-600 font-bold text-base/6 gap-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
            >
              Tắt
            </button>
            <button className="flex justify-center border border-solid border-cyan-700 rounded-md px-10 py-[6px] text-cyan-700 font-bold text-base/6 gap-2 cursor-pointer hover:bg-cyan-700 hover:text-white">
              Thêm
            </button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default PopupThemTieuChuan;
