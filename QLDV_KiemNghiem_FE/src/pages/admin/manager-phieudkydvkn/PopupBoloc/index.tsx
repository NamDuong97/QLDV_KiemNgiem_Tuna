import { Box, Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
// import { FormBoLocPhieuDangKyChoXetDuyet } from "../../../../../../../models/PhieuDangKy";
// import { useForm } from "react-hook-form";
// import { useEffect, useMemo } from "react";
// import yup from "../../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import yup from "../../../../configs/yup.custom";
import { FormBoLocQuanLyPhieuDKyDVHN } from "../../../../models/PhieuDangKy";
import { Inputs } from "../../../../components/Inputs";
import InputCheckboxes from "../../../../components/InputCheckboxes";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const data = [
  {
    value: "Tiếng Anh",
    label: "Tiếng Anh",
  },
  {
    value: "Tiếng Việt",
    label: "Tiếng Việt",
  },
];

const PopupBoloc = (props: Props) => {
  const { open, handleClose } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      KetQua: yup.string(),
      NgayBatDau: yup.string(),
      NgayKetThuc: yup.string().when("NgayBatDau", ([NgayBatDau], schema) => {
        return schema
          .test(
            "validation NgayKetThuc",
            "Yêu cầu chọn ngày kết thúc",
            (NgayKetThuc) => {
              if (!NgayBatDau || NgayKetThuc) {
                return true;
              }
            }
          )
          .test(
            "lớn hơn và khác",
            "Ngày kết thúc phải khác và lớn hơn ngày bắt đầu",
            (NgayKetThuc) => {
              if (NgayBatDau && NgayKetThuc) {
                return NgayKetThuc > NgayBatDau && NgayKetThuc !== NgayBatDau;
              }
              return true;
            }
          );
      }),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormBoLocQuanLyPhieuDKyDVHN>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLoc = (data: FormBoLocQuanLyPhieuDKyDVHN) => {
    console.log("data", data);
  };

  useEffect(() => {
    reset({
      KetQua: "",
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
            <InputCheckboxes name="KetQua" options={data} control={control} title="Kết Quả:"/>
            <Inputs
              title="Ngày bắt đầu:"
              type="date"
              name="NgayBatDau"
              inputRef={register("NgayBatDau")}
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

export default PopupBoloc;
