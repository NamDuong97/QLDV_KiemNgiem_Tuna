const Detail = ({ detail }: any) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0">
      <div className="font-medium">{detail?.tenChiTieu}</div>
      <div>{detail?.ketQua}</div>
      <div>{detail?.donVi}</div>
      <div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}
        >
          {detail?.mucChatLuong}
        </span>
      </div>
      <div className="text-sm text-gray-600">{detail?.ghiChu}</div>
    </div>
  );
};

export default Detail;
