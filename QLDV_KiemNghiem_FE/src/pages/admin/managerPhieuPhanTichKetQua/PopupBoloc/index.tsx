import { Box, Dialog } from "@mui/material";
// import { FormBoLocPhieuDangKyChoXetDuyet } from "../../../../../../../models/PhieuDangKy";
// import { useForm } from "react-hook-form";
// import { useEffect, useMemo } from "react";
// import yup from "../../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import yup from "../../../../configs/yup.custom";
import { FormBoLocQuanLyPhieuDKyDVHN } from "../../../../models/PhieuDangKy";
import { IoClose, IoColorFilterSharp } from "react-icons/io5";
import InputSelectKhoa from "./InputSelectKhoa";
import InputSelectPhieuLuuMau from "./InputSelectPhieuLuuMau";
import InputSelectTenMau from "./InputSelectTenMau";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const dataMaKH = [
  {
    maKH: "KH001",
  },
  {
    maKH: "KH002",
  },
  {
    maKH: "KH003",
  },
];

const PopupBoloc = (props: Props) => {
  const { open, handleClose } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      trangThai: yup.string(),
      maKH: yup.string(),
      ngayBatDau: yup.string(),
      ngayKetThuc: yup.string().when("ngayBatDau", ([ngayBatDau], schema) => {
        return schema
          .test(
            "validation NgayKetThuc",
            "Yêu cầu chọn ngày kết thúc",
            (NgayKetThuc) => {
              if (!ngayBatDau || NgayKetThuc) {
                return true;
              }
            }
          )
          .test(
            "lớn hơn và khác",
            "Ngày kết thúc phải khác và lớn hơn ngày bắt đầu",
            (NgayKetThuc) => {
              if (ngayBatDau && NgayKetThuc) {
                return NgayKetThuc > ngayBatDau && NgayKetThuc !== ngayBatDau;
              }
              return true;
            }
          );
      }),
    });
  }, []);

  const {
    // register,
    handleSubmit,
    reset,
    control,
    // formState: { errors },
  } = useForm<FormBoLocQuanLyPhieuDKyDVHN>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLoc = (data: FormBoLocQuanLyPhieuDKyDVHN) => {
    console.log("data", data);
  };

  useEffect(() => {
    reset({
      trangThai: "",
      maKH: "",
      ngayBatDau: "",
      ngayKetThuc: "",
    });
  }, []);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <Box className="w-[550px]">
        <Box className="px-24 pb-4 pt-6">
          <Box className="grid gap-2 text-center">
            <div className="flex justify-center">
              <IoColorFilterSharp className="w-[70px] h-[70px] text-cyan-700" />
            </div>
            <p className="text-cyan-900 font-bold text-2xl/6">Bộ Lọc</p>
          </Box>
        </Box>
        <form
          onSubmit={handleSubmit(handleLoc)}
          className="px-8 py-5 grid gap-6"
        >
          <Box className="grid gap-6 grid-cols-12">
            <Box className="col-span-6">
              <InputSelectPhieuLuuMau
                name="maKH"
                data={dataMaKH}
                control={control}
                title="Mã phiếu kết quả:"
              />
            </Box>
            <Box className="col-span-6">
              <InputSelectKhoa
                name="tenMau"
                data={dataMaKH}
                control={control}
                title="Tên mẫu:"
              />
            </Box>
          </Box>
          <Box className="flex justify-center gap-6">
            <button
              onClick={handleClose}
              className="flex justify-center border-[2px] border-solid border-gray-300 bg-yellow-500 rounded-md px-6 py-[6px] text-white font-bold text-base/6 gap-2 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-yellow-300"
            >
              Tắt thông báo
            </button>
            <button className="flex justify-center border-[2px] border-solid border-gray-300 bg-cyan-700 rounded-md px-16 py-[6px] text-white font-bold text-base/6 gap-2 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-cyan-600">
              Lọc
            </button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default PopupBoloc;
