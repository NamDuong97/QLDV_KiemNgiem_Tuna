import { Trash2 } from "react-feather";
import InputSelectPLHC from "./InputSelectPLHC";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";

const Detail = ({
  index,
  control,
  register,
  errors,
  onRemove,
  fieldNamePrefix,
  dataDM_PhuLieuHoaChat,
  handleOpenPopupThemPLHC,
}: any) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid gap-4 w-full">
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Phụ liệu hóa chất <span className="text-red-500">*</span>
            </label>
            <InputSelectPLHC
              name={`${fieldNamePrefix}.maDM_PLHC`}
              control={control}
              data={dataDM_PhuLieuHoaChat}
              placeholder="VD: axit sunfuric 5%,..."
              errorMessage={errors?.maDM_PLHC?.message}
              handleOpenPopupThem={handleOpenPopupThemPLHC}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register(`${fieldNamePrefix}.soLuong`)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Số lượng"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.soLuong?.message}
            </p>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đơn vị tính <span className="text-red-500">*</span>
            </label>
            <InputSelectDonViTinh
              name={`${fieldNamePrefix}.donViTinh`}
              control={control}
              data={DonViTinh}
              placeholder="Đơn vị tính"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.donViTinh?.message}
            </p>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đơn giá <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register(`${fieldNamePrefix}.donGia`)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Đơn giá"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.donGia?.message}
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default Detail;
