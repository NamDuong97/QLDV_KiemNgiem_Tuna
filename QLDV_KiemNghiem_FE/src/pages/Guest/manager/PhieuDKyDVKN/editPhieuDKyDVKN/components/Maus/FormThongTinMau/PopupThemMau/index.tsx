import { Box, Dialog } from "@mui/material";
import { FormThemMauVaoDanhMuc } from "../../../../../../../../../models/PhieuDangKy";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import yup from "../../../../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "../../../../../../../../../components/Inputs";
import InputSelectLoaiMau from "./InputSelectLoaiMau";
import {
  useCreateDmMau,
  useGetLoaiMauAll,
} from "../../../../../../../../../hooks/customers/usePhieuDKyDVKN";
import { useQueryClient } from "@tanstack/react-query";
import { GiTestTubes } from "react-icons/gi";
import { useStoreNotification } from "../../../../../../../../../configs/stores/useStoreNotification";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const PopupThemMau = (props: Props) => {
  const { open, handleClose } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  const queryClient = useQueryClient();
  const dataDmMauAll: any = queryClient.getQueryData(["DmMauAll"]);

  let schema = useMemo(() => {
    return yup.object().shape({
      tenMau: yup
        .string()
        .test("Trùng tên mẫu", "Tên mẫu đã tồn tại", (value: any) => {
          if (!value) return true; // tránh lỗi khi value null
          console.log("dataDmMauAll dataDmMauAll", dataDmMauAll);

          const isTrungLap = dataDmMauAll?.find(
            (item: any) =>
              item.tenMau?.trim().toLowerCase() === value.trim().toLowerCase()
          );

          return !isTrungLap;
        })
        .required("Yêu cầu nhập Tên Mẫu")
        .max(200, "Tên Mẫu nhập không quá 200 ký tự"),
      maID: yup.string().required("Yêu cầu chọn Loại mẫu"),
    });
  }, [dataDmMauAll]);

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

  const { data: LoaiMau } = useGetLoaiMauAll({
    queryKey: "GetLoaiMauAll",
    options: {
      enabled: true,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  });
  const dataLoaiMau = LoaiMau as Array<any>;

  const handleOnSettled = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["DmMauAll"],
    });
  };

  const { mutate } = useCreateDmMau({
    queryKey: "CreateDmMau",
    onSuccess: (response) => {
      if (response.status === 200) {
        showNotification({ message: "Thêm thành công", status: 200 });
        reset({
          tenMau: "",
          maID: "",
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
      tenMau: "",
      maID: "",
    });
  };

  const handleThem = (data: FormThemMauVaoDanhMuc) => {
    const dataFinal = {
      tenMau: data.tenMau,
      maLoaiMau: data.maID,
      trangThai: true,
    };
    mutate(dataFinal);
  };

  useEffect(() => {
    reset({
      tenMau: "",
      maID: "",
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
      <Box className="w-auto sm:w-[600px]">
        <Box className="px-4 pt-8 text-center">
          <Box className="grid gap-2">
            <Box className="flex justify-center">
              <GiTestTubes className="w-10 h-10 sm:w-[70px] sm:h-[70px] text-cyan-700" />
            </Box>

            <p className="text-gray-80 font-bold text-xl/4 sm:text-[28px]/6">
              Thêm Mẫu
            </p>
          </Box>
        </Box>
        <form
          onSubmit={handleSubmit(handleThem)}
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

export default PopupThemMau;
