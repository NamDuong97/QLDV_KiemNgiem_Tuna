import { Trash2 } from "react-feather";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";

const Detail = ({
  index,
  register,
  errors,
  fieldNamePrefix,
  onRemove,
  isEditable = true,
  control,
  detail,
  dataDMPLHC,
}: any) => {
  if (!isEditable) {
    return (
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0">
        <div className="font-medium col-span-1">{dataDMPLHC?.find((item: any) => item?.maId === detail?.maDmPlhc)?.tenDmPlhc}</div>
        <div className="col-span-1">
          {detail?.soLuong} {detail?.donViTinh}
        </div>
        <div className="col-span-3">{detail?.ghiChu}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid gap-4 w-full">
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Phù liệu hóa chất
            </label>
            <input
              {...register(`${fieldNamePrefix}.Ten_PLHC`)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
              placeholder="Nhập phụ liệu hóa chất"
            />
            {errors?.Ten_PLHC && (
              <p className="text-red-600 text-sm mt-1">
                {errors.Ten_PLHC.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng
            </label>
            <input
              type="text"
              {...register(`${fieldNamePrefix}.soLuong`)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
              placeholder="Số lượng"
            />
            {errors?.soLuong && (
              <p className="text-red-600 text-sm mt-1">
                {errors.soLuong.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đơn vị tính
            </label>
            <InputSelectDonViTinh
              control={control}
              name={`${fieldNamePrefix}.donViTinh`}
              data={DonViTinh}
              placeholder="Nhập ĐVT"
              errorMessage={errors?.donViTinh?.message}
            />
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
          {errors?.ghiChu && (
            <p className="text-red-600 text-sm mt-1">{errors.ghiChu.message}</p>
          )}
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
