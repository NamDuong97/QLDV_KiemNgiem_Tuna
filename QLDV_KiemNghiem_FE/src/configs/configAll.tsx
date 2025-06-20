type TrangThai = {
  text: string;
  bgColor: string;
  textColor: string;
};

const trangThaiMap: Record<string, TrangThai> = {
  TT01: {
    text: "Chờ phòng KHĐT tiếp nhận xử lý",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  TT02: {
    text: "Phòng KHĐT đã duyệt và chờ BLĐ xét duyệt",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  TT03: {
    text: "Phòng KHĐT từ chối và chờ BLĐ quyết định",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
  TT04: {
    text: "BLĐ từ chối",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  TT05: {
    text: "BLD đã duyệt và chờ phân công phòng ban",
    bgColor: "bg-sky-100",
    textColor: "text-sky-800",
  },
  TT06: {
    text: "Các phòng ban đều từ chối",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  TT07: {
    text: "Đang kiểm nghiệm",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-800",
  },
  TT08: {
    text: "Đã hoàn thành kiểm nghiệm chờ duyệt phiếu phân tích",
    bgColor: "bg-teal-100",
    textColor: "text-teal-800",
  },
  TT09: {
    text: "Đã hoàn thành tất cả",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  TT10: {
    text: "Đã hủy kiểm nghiệm",
    bgColor: "bg-gray-200",
    textColor: "text-gray-700",
  },
  TT11: {
    text: "Đang kiểm tra lại",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  0: {
    text: "Kh đã hủy",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  1: {
    text: "Bị từ chối bởi phòng ban",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  2: {
    text: "Chờ phòng ban duyệt",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  3: {
    text: "Đã duyệt",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-800",
  },
};

export function renderTrangThai(trangThaiId: string) {
  const trangThai = trangThaiMap[trangThaiId] || {
    text: "Không xác định",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${trangThai.bgColor} ${trangThai.textColor}`}
    >
      {trangThai.text}
    </span>
  );
}

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
