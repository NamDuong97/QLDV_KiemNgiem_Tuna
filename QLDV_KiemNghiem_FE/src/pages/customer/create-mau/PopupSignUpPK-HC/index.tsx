import { Box, Dialog, SelectChangeEvent } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Inputs } from "../../../../components/Inputs";
import SelectComponent from "../../../../components/Select";
import { Textarea } from "../../../../components/Textarea";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { FormPhuLieuHoaChat } from "../../../../models/PhuLieuHoaChat";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../../configs/yup.custom";

interface Props {
  openPopupSignUpPKHC: boolean;
  handleClosePopupSignUpPKHC?: () => void;
  setListPLHC: Dispatch<any>;
  listPLHC: any;
}

const dataLoaiPKHC = [
  {
    name: "Item 1",
  },
  {
    name: "Item 2",
  },
  {
    name: "Item 3",
  },
];

const PopupSignUpPKHC = (props: Props) => {
  const { openPopupSignUpPKHC, handleClosePopupSignUpPKHC, listPLHC } = props;

  const [selectLoaiPLHC, setSelectLoaiPLHC] = useState("");
  const handleChangeLoaiPLHC = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    setSelectLoaiPLHC(value);
  };

  let schema = useMemo(() => {
    return yup.object().shape({
      TenPhuLieu_HC: yup
        .string()
        .required("Vui lòng nhập Tên phụ liệu hóa chất")
        .max(500, "Ký tự nhập không quá 500 ký tự"),
      SoLuongCungCap: yup
        .number()
        .min(1, "Vui lòng nhập Số lượng cung cấp lớn hơn 0"),
      DonViTinh: yup
        .string()
        .required("Vui lòng nhập đơn vị tính")
        .max(50, "Ký tự nhập không quá 50 ký tự"),
      MaLoaiPhuLieu_HC: yup
        .string()
        .required("Vui lòng chọn loại phù liệu hóa chất"),
      GhiChu: yup.string(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormPhuLieuHoaChat>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const _onSubmit = (data: FormPhuLieuHoaChat) => {
    listPLHC.push({
      TenPhuLieu_HC: data.TenPhuLieu_HC,
      SoLuongCungCap: data.SoLuongCungCap,
      MaLoaiPhuLieu_HC: data.MaLoaiPhuLieu_HC,
      GhiChu: data.GhiChu,
      DonViTinh: data.DonViTinh,
    });
    sessionStorage.setItem("PLHCTemp", JSON.stringify(listPLHC));
    setSelectLoaiPLHC(listPLHC);

    reset({
      TenPhuLieu_HC: "",
      SoLuongCungCap: 0,
      DonViTinh: "",
      MaLoaiPhuLieu_HC: "",
      GhiChu: "",
    });
    handleClosePopupSignUpPKHC?.();
  };

  useEffect(() => {
    reset({
      TenPhuLieu_HC: "",
      SoLuongCungCap: 0,
      DonViTinh: "",
      MaLoaiPhuLieu_HC: "",
      GhiChu: "",
    });
  }, []);

  useEffect(() => {
    setValue("MaLoaiPhuLieu_HC", selectLoaiPLHC);
  }, [selectLoaiPLHC, setValue]);

  return (
    <Dialog
      open={openPopupSignUpPKHC}
      maxWidth="lg"
      onClose={handleClosePopupSignUpPKHC}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box className="relative px-7 py-6 w-auto md:w-[785px]">
        <Box className="absolute top-2 right-5">
          <button
            className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
            onClick={handleClosePopupSignUpPKHC}
          >
            <IoMdClose className="w-6 h-6 text-gray-300" />
          </button>
        </Box>

        <motion.div
          key="SignUpPKHC"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box className="grid gap-6">
            <Box className="py-2">
              <h1 className="font-bold text-3xl">
                Thêm Thông Tin Phụ Kiện Hóa Chất
              </h1>
            </Box>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(_onSubmit)}
              className="grid gap-6"
            >
              <Box className="grid gap-1">
                <Box className="grid sm:flex sm:gap-10">
                  <Inputs
                    title="Tên Phụ Liệu Hóa Chất"
                    className="h-[42px]"
                    placeholder="Nhập Tên Phụ Liệu Hóa Chất"
                    name="TenPhuLieu_HC"
                    inputRef={register("TenPhuLieu_HC")}
                    errorMessage={errors.TenPhuLieu_HC?.message}
                  />
                  <Inputs
                    title="Số Lượng Cung Cấp"
                    name="SoLuongCungCap"
                    type="number"
                    inputRef={register("SoLuongCungCap")}
                    errorMessage={errors.SoLuongCungCap?.message}
                    className="h-[42px]"
                    placeholder="Nhập Số Lượng Cung Cấp"
                    sx={{
                      '& input[type="number"]': {
                        MozAppearance: "textfield",
                      },
                      '& input[type="number"]::-webkit-outer-spin-button,& input[type="number"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />
                </Box>
                <Inputs
                  title="Đơn Vị Tính"
                  name="DonViTinh"
                  inputRef={register("DonViTinh")}
                  errorMessage={errors.DonViTinh?.message}
                  className="h-[42px]"
                  placeholder="Nhập Đơn Vị Tính"
                />
                <SelectComponent
                  title="Loại Phụ Liệu Hóa Chất"
                  data={dataLoaiPKHC}
                  select={selectLoaiPLHC}
                  name="MaLoaiPhuLieu_HC"
                  errors={errors.MaLoaiPhuLieu_HC?.message}
                  handleChange={handleChangeLoaiPLHC}
                  dataDefault="Vui Lòng Chọn Loại Phụ Liệu Hóa Chất"
                />
                <Textarea
                  title="Ghi Chú"
                  placeholder="Ghi Chú"
                  name="GhiChu"
                  inputRef={register("GhiChu")}
                />
              </Box>
              <Box>
                <button
                  type="submit"
                  className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer"
                >
                  Thêm
                </button>
              </Box>
            </form>
          </Box>
        </motion.div>
      </Box>
    </Dialog>
  );
};

export default PopupSignUpPKHC;
