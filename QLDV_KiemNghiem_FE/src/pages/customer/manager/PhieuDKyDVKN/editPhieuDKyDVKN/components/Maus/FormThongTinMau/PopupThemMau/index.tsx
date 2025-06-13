import { Box, Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
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
        .required("Yêu cầu nhập Tên Mẫu")
        .max(200, "Tên Mẫu nhập không quá 200 ký tự")
        .test("Trùng tên mẫu", "Tên mẫu đã tồn tại", (value) => {
          if (!value) return true;
          const trimmedValue = value.trim().toLowerCase();

          const isTrungLap = dataDmMauAll.find(
            (item: any) => item.tenMau?.trim().toLowerCase() === trimmedValue
          );

          return !isTrungLap;
        }),
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
      <Box className="lg:w-[400px]">
        <Box className="px-4 py-4 border-b border-solid border-gray-300 flex justify-between items-center">
          <Box className="text-center flex-1 pl-[34px]">
            <p className="text-gray-80 font-bold text-2xl/6 flex gap-2 justify-center">
              Thêm Mẫu <GiTestTubes className="w-6 h-6 text-cyan-700" />
            </p>
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
