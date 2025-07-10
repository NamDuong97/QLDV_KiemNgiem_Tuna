import { Trash2 } from "react-feather";
import { DonViTinh } from "../../../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";
import InputSelectDonViTinh from "./InputSelectDonViTinh";

import InputSelectPLHC from "./InputSelectPLHC";

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
              Tên Phù liệu hóa chất
            </label>
            <InputSelectPLHC
              name={`${fieldNamePrefix}.Ten_PLHC`}
              control={control}
              data={dataDM_PhuLieuHoaChat}
              placeholder="VD: axit sunfuric 5%,..."
              errorMessage={errors?.Ten_PLHC?.message}
              handleOpenPopupThem={handleOpenPopupThemPLHC}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng
            </label>
            <input
              type="number"
              {...register(`${fieldNamePrefix}.soLuong`)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
              placeholder="Số lượng"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.soLuong?.message}
            </p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đơn vị tính
            </label>
            <InputSelectDonViTinh
              name={`${fieldNamePrefix}.donViTinh`}
              placeholder="Nhập ĐVT"
              data={DonViTinh}
              control={control}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors?.donViTinh?.message}
            </p>
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <input
            {...register(`${fieldNamePrefix}.ghiChu`)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
            placeholder="Ghi chú"
          />
          <p className="text-red-600 text-sm mt-1">{errors?.ghiChu?.message}</p>
        </div>
      </div>
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => onRemove && onRemove(index)}
          className="px-3 py-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-md"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Detail;
