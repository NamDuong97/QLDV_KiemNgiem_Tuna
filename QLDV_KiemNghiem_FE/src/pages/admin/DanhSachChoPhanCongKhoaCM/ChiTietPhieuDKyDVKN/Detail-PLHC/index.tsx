import { Box, Pagination, Skeleton } from "@mui/material";
import { useState } from "react";
interface Props {
  dataPLHC: any;
  isLoading: boolean;
}
const DetailPLHCs = (props: Props) => {
  const { dataPLHC, isLoading } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataPLHC?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataPLHC && dataPLHC?.length / itemsPerPage);
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return isLoading ? (
    <Box className="p-5 space-y-4">
      <div className="space-y-2">
        <Skeleton width={150} height={24} />
        <div className="space-x-40 flex items-center">
          <div className="flex gap-2 items-center">
            <Skeleton width={60} height={24} />
            <Skeleton width={100} height={24} />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton width={90} height={24} />
            <Skeleton width={100} height={24} />
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <Skeleton width={200} height={24} />

        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
        </div>
      </div>
    </Box>
  ) : (
    <div className="grid gap-2 p-6">
      {currentItems?.length > 0 ? (
        currentItems?.map((item: any, index: any) => (
          <div key={index} className="space-y-1">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
              <div>
                <label className="text-base/6 text-gray-500">
                  Tên Phụ Liệu Hóa Chất
                </label>
                <p className="font-semibold text-base/6 text-gray-900">{item?.tenPlhc}</p>
              </div>

              <div>
                <label className="text-base/6 text-gray-500">Tên hiển thị</label>
                <p className="font-semibold text-base/6 text-gray-900">
                  {item?.tenHienThi}
                </p>
              </div>

              <div>
                <label className="text-base/6 text-gray-500">Số Lượng</label>
                <p className="font-semibold text-base/6 text-gray-900">
                  {item?.soLuong}
                  {item?.donViTinh}
                </p>
              </div>

              <div>
                <label className="text-base/6 text-gray-500">Số lô</label>
                <p className="font-semibold text-base/6 text-gray-900">{item?.soLo}</p>
              </div>

              <div>
                <label className="text-base/6 text-gray-500">
                  Tên nhà cung cấp
                </label>
                <p className="font-semibold text-base/6 text-gray-900">
                  {item?.tenNhaCungCap}
                </p>
              </div>

              <div>
                <label className="text-base/6 text-gray-500">Hạn sử dụng</label>
                <p className="font-semibold text-base/6 text-gray-900">
                  {new Date(item?.ngayHetHan).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <div className="col-span-2">
                <label className="text-base/6 text-gray-500">Ghi chú</label>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700 font-semibold text-base/6">{item?.ghiChu ? item?.ghiChu :"Không có ghi chú"}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p className="text-base/6 text-gray-500">Không có dữ liệu</p>
        </div>
      )}

      {currentItems?.length > 0 && (
        <Box className="px-4 pb-4 pt-2 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{
              '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
                {
                  backgroundColor: "#1976d21f",
                  border: "1px solid #1976d280",
                  color: "#1976d2",
                },
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default DetailPLHCs;
