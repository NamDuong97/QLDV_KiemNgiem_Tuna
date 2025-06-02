import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import { Inputs } from "../../../../../components/Inputs";
import { FormPhieuDeXuatPhongBan } from "../../../../../models/PhieuDeXuatPhongBan";
import yup from "../../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ListMauPhanCong from "./ListMauPhanCong";
import InputSelectKhoa from "./InputSelectKhoa";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const ListKhoa = [
  { maKhoa: "Khoa 1", tenKhoa: "Khoa Nội" },
  { maKhoa: "Khoa 2", tenKhoa: "Khoa Ngoại" },
];

const PopupPhanCongPhongCM = (props: Props) => {
  const { open, handleClose } = props;

  const [isPhanCong] = useState(false);

  let schema = useMemo(() => {
    return yup.object().shape({
      tenKhachHang: yup.string().required("Tên khách hàng không được để trống"),
      khoaTiepNhan: yup.string().required("Yêu cầu chọn khoa chuyên môn"),
      manvDeXuat: yup
        .string()
        .required("Yêu cầu nhập Mã Nhân viên đề xuất")
        .max(50, "Mã nhân viên đề xuất không được quá 50 ký tự"),
      // .test("không tồn tại mã nhân viên", "Mã nhân viên không tồn tại", (value) => {})
      manvTiepNhan: yup
        .string()
        .required("Yêu cầu nhập Mã Nhân viên tiếp nhận")
        .max(50, "Mã nhân viên tiếp nhận không được quá 50 ký tự"),
      thoiGianGiaoMau: yup.string().required("Yêu cầu chọn Thời Gian Giao Mẫu"),
      thoiGianThucHien: yup
        .string()
        .required("Yêu cầu chọn Thời Gian Thực Hiện"),
      maus: yup
        .array()
        .typeError("Yêu cầu chọn Mẫu phân công")
        .required("Yêu cầu chọn Mẫu phân công")
        .test("Anh", "Yêu cầu chọn Mẫu phân công", (value) => {
          return value && value.length > 0;
        }),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormPhieuDeXuatPhongBan>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handlePhanCong = (data: FormPhieuDeXuatPhongBan) => {
    console.log("data", data);
  };

  const handleEnterPhanCong = () => {
    switch (isPhanCong) {
      case true:
        return "Sơ duyệt thành công, vui lòng đợi BLĐ phê duyệt!";
      default:
        return (
          <form onSubmit={handleSubmit(handlePhanCong)}>
            <Box className="px-10 p-6 overflow-y-auto whitespace-nowrap h-[500px]">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <Inputs
                    title="Tên Khách Hàng"
                    inputRef={register("tenKhachHang")}
                    errorMessage={errors.tenKhachHang?.message}
                    name="tenKhachHang"
                    disabled
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <div className="col-span-1">
                  <InputSelectKhoa
                    title="Khoa Tiếp Nhận"
                    name="khoaTiepNhan"
                    control={control}
                    data={ListKhoa}
                    errorMessage={errors.khoaTiepNhan?.message}
                    placeholder="Chọn Khoa Chuyên Môn"
                  />
                </div>
                <div className="col-span-1">
                  <Inputs
                    title="Mã Nhân Viên Đề Xuất"
                    inputRef={register("manvDeXuat")}
                    name="manvDeXuat"
                    errorMessage={errors.manvDeXuat?.message}
                    placeholder="Nhập Mã Nhân Viên Đề Xuất"
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <div className="col-span-1">
                  <Inputs
                    title="Mã Nhân Viên Tiếp Nhận"
                    inputRef={register("manvTiepNhan")}
                    name="manvTiepNhan"
                    errorMessage={errors.manvTiepNhan?.message}
                    placeholder="Nhập Mã Nhân Viên Tiếp Nhận"
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <div className="col-span-1">
                  <Inputs
                    type="date"
                    title="Thời Gian Giao Mẫu"
                    inputRef={register("thoiGianGiaoMau")}
                    name="thoiGianGiaoMau"
                    errorMessage={errors.thoiGianGiaoMau?.message}
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <div className="col-span-1">
                  <Inputs
                    type="date"
                    title="Thời Gian Thực Hiện"
                    inputRef={register("thoiGianThucHien")}
                    name="thoiGianThucHien"
                    errorMessage={errors.thoiGianThucHien?.message}
                    sx={{
                      input: {
                        padding: "10px 14px",
                      },
                    }}
                  />
                </div>
                <ListMauPhanCong errorsMessage={errors.maus?.message} />
              </div>
            </Box>
            <Box className="flex justify-center items-center border-t border-gray-300 py-4">
              <button className="font-bold text-center text-white bg-[#0099f8] border-[2px] border-solid border-gray-300 px-10 py-2 rounded-md hover:bg-blue-500 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                Gửi
              </button>
            </Box>
          </form>
        );
    }
  };

  useEffect(() => {
    reset({
      tenKhachHang: "KH001",
      khoaTiepNhan: "",
      manvDeXuat: "",
      manvTiepNhan: "",
      thoiGianGiaoMau: "",
      thoiGianThucHien: "",
      maus: [],
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="PopupPhanCongPhongCM"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <Box className="w-auto md:w-[785px]">
            <Box className="py-3 flex justify-between items-center px-7 border-b border-gray-300">
              <h1 className="font-bold text-3xl flex-1 text-center">
                Phân Công Phòng Chuyên Môn
              </h1>
              <button
                className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
                onClick={handleClose}
              >
                <IoMdClose className="w-6 h-6 text-gray-300" />
              </button>
            </Box>
            {handleEnterPhanCong()}
          </Box>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupPhanCongPhongCM;
