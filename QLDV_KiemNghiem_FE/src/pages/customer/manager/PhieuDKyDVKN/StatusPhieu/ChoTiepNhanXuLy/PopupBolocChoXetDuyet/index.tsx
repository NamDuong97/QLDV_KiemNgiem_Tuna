import { Box, Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { FormBoLocPhieuDangKyChoXetDuyet } from "../../../../../../../models/PhieuDangKy";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import yup from "../../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "../../../../../../../components/Inputs";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const PopupBolocChoXetDuyet = (props: Props) => {
  const { open, handleClose } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      NgayBatDau: yup.string().required("Yêu cầu chọn ngày bắt đầu"),
      NgayKetThuc: yup
        .string()
        .required("Yêu cầu chọn ngày kết thúc")
        .when("NgayBatDau", ([NgayBatDau], schema) => {
          return schema.test(
            "lớn hơn và khác",
            "Ngày kết thúc phải khác và lớn hơn ngày bắt đầu",
            (NgayKetThuc) => {
              return NgayBatDau < NgayKetThuc && NgayBatDau !== NgayKetThuc;
            }
          );
        }),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormBoLocPhieuDangKyChoXetDuyet>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLoc = (data: FormBoLocPhieuDangKyChoXetDuyet) => {
    console.log("data", data);
  };

  useEffect(() => {
    reset({
      NgayBatDau: "",
      NgayKetThuc: "",
    });
  }, []);

  return (
    <Dialog open={open} maxWidth="lg" onClose={handleClose}>
      <Box className="w-[500px]">
        <Box className="px-4 py-2 border-b border-solid border-gray-300 flex justify-between items-center">
          <Box className="text-center flex-1 pl-[34px]">
            <p className="text-gray-80 font-bold text-2xl/6">Bộ Lọc</p>
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
              title="Ngày bắt đầu:"
              type="date"
              name="NgayBatDau"
              inputRef={register("NgayBatDau")}
              errorMessage={errors.NgayBatDau?.message}
              className="h-[42px]"
              sx={{
                input: {
                  padding: "9.5px 14px",
                },
              }}
            />
            <Inputs
              title="Ngày kết thúc:"
              type="date"
              name="NgayKetThuc"
              inputRef={register("NgayKetThuc")}
              errorMessage={errors.NgayKetThuc?.message}
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
              Lọc
            </button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default PopupBolocChoXetDuyet;
