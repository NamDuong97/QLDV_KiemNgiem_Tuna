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
import { Inputs } from "../../../../components/Inputs";
import InputSelectTrangThai from "./InputSelectTrangThai";
import InputSelectMaKH from "./InputSelectMaKH";
import { IoColorFilterSharp } from "react-icons/io5";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const dataTrangThai = [
  {
    tenTT: "Chờ tiếp nhận xử lý",
  },
  {
    tenTT: "Chờ BLĐ xét duyệt",
  },
  {
    tenTT: "Bị từ chối bởi phòng KHĐT",
  },
];

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
      <Box className="w-[650px]">
        <Box className="px-4 pb-2 pt-6 text-center">
          <Box className="grid gap-2">
            <div className="flex justify-center">
              <IoColorFilterSharp className="w-[70px] h-[70px] text-cyan-700" />
            </div>
            <p className="text-cyan-900 font-bold text-2xl/6">Bộ Lọc</p>
          </Box>
        </Box>
        <form onSubmit={handleSubmit(handleLoc)} className="px-8 py-5">
          <Box className="grid gap-6 grid-cols-12">
            <Box className="col-span-6">
              <InputSelectTrangThai
                name="trangThai"
                data={dataTrangThai}
                control={control}
                title="Trạng thái:"
              />
            </Box>
            <Box className="col-span-6">
              <InputSelectMaKH
                name="maKH"
                data={dataMaKH}
                control={control}
                title="Mã Khách Hàng:"
              />
            </Box>
            <Box className="col-span-6">
              <Inputs
                title="Ngày bắt đầu:"
                type="date"
                name="NgayBatDau"
                inputRef={register("ngayBatDau")}
                className="h-[42px]"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
              />
            </Box>
            <Box className="col-span-6">
              <Inputs
                title="Ngày kết thúc:"
                type="date"
                name="NgayKetThuc"
                inputRef={register("ngayKetThuc")}
                errorMessage={errors.ngayKetThuc?.message}
                className="h-[42px]"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
              />
            </Box>
          </Box>
          <Box className="flex justify-center gap-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex justify-center border-[2px] border-solid border-gray-300 bg-yellow-500 rounded-md px-16 py-[6px] text-white font-bold text-base/6 gap-2 cursor-pointer hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-yellow-400"
            >
              Tắt
            </button>
            <button className="flex justify-center border-[2px] border-solid border-gray-300 bg-cyan-700 rounded-md px-16 py-[6px] text-white font-bold text-base/6 gap-2 cursor-pointer  hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-cyan-600">
              Lọc
            </button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default PopupBoloc;
