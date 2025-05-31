import { useState } from "react";
import { Inputs } from "../../../../../../components/Inputs";
import { Align } from "../../../../../../models/Table";
import TableDanhSachMaus from "./Table";

interface Props {
  errorsMessage?: string;
}

const tableHeads = [
  {
    id: "name",
    label: "Tên Mẫu",
    align: Align.Center,
  },
  {
    id: "name",
    label: "Ghi Chú",
    align: Align.Center,
  },
];

const tableBodys = [
  {
    TenMau: "Mẫu 1",
    GhiChu: "Ghi chú mẫu 1",
  },
  {
    TenMau: "Mẫu 2",
    GhiChu: "Ghi chú mẫu 2",
  },
];

const ListMauPhanCong = (props: Props) => {
  const { errorsMessage } = props;
  const [listCheckbox, setListCheckbox] = useState<any[]>([]);

  return (
    <div className="col-span-2 grid gap-4">
      <p className="text-[22px]/6 font-semibold text-center">Danh sách Mẫu</p>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <Inputs
            title="Tên Mẫu"
            // inputRef={register("maus.0.tenMau")}
            name="tenMau"
            // errorMessage={errors.tenMau?.message}
            placeholder="Nhập Tên Mẫu"
            sx={{
              input: {
                padding: "10px 14px",
              },
            }}
          />
        </div>
        <div className="col-span-1">
          <Inputs
            title="Ghi Chú"
            // inputRef={register("ghiChu")}
            name="ghiChu"
            // errorMessage={errors.ghiChu?.message}
            placeholder="Nhập Ghi Chú"
            sx={{
              input: {
                padding: "10px 14px",
              },
            }}
          />
        </div>
        <div className="col-span-2 flex justify-center items-center gap-6">
          {listCheckbox.length > 0 && (
            <button className="font-bold text-center text-white bg-rose-500 border-[2px] border-solid border-gray-300 px-12 py-1 rounded-md hover:bg-rose-600 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              Xóa
            </button>
          )}
          <button className="font-bold text-center text-white bg-emerald-500 border-[2px] border-solid border-gray-300 px-10 py-1 rounded-md hover:bg-emerald-600 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Thêm
          </button>
        </div>
        <div className="col-span-2">
          <TableDanhSachMaus
            tableBody={tableBodys}
            tableHead={tableHeads}
            setListCheckbox={setListCheckbox}
            listCheckbox={listCheckbox}
          />
        </div>
      </div>
      {errorsMessage && (
        <p color="error" className="mt-1 text-rose-700">
          {errorsMessage}
        </p>
      )}
    </div>
  );
};

export default ListMauPhanCong;
