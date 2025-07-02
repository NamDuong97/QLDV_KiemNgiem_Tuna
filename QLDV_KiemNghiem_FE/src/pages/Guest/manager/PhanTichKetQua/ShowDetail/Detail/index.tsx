const Detail = ({ detail, index }: any) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0">
      <div className="font-medium">Định tính</div>
      <div>Kết quả 43 mg/L</div>
      <div>mg/L</div>
      <div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium `}
          //${
          //   detail?.trangThai === "Đạt"
          //     ? "bg-green-100 text-green-800"
          //     : detail.quality === "Không đạt"
          //     ? "bg-red-100 text-red-800"
          //     : detail.quality === "Cần kiểm tra lại"
          //     ? "bg-yellow-100 text-yellow-800"
          //     : "bg-gray-100 text-gray-800"
          // }
        >
          {`>= 80%`}
        </span>
      </div>
      <div className="text-sm text-gray-600">Ghi chú Định tính</div>
    </div>
  );
};

export default Detail;
