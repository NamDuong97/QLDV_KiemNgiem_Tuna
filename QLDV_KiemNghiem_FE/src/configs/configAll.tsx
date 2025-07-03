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

const trangThaiMauMap: Record<string, TrangThai> = {
  1: {
    text: "Chờ phân công",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  2: {
    text: "Đang kiểm nghiệm",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  3: {
    text: "Đã bị huỷ bởi khoa chuyên môn",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  4: {
    text: "Đã bị huỷ bởi khách",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-800",
  },
  5: {
    text: "Đã hoàn thành",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  6: {
    text: "Đã phân công chờ duyệt",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  7: {
    text: "Đã phân công nội bộ",
    bgColor: "bg-violet-100",
    textColor: "text-violet-800",
  },
  8: {
    text: "Đã hoàn thành kiểm nghiệm",
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-800",
  },
};

const trangThaiChiTietPhieuDeXuatPhongBan: Record<string, TrangThai> = {
  0: {
    text: "Khách hàng đã hủy",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
  1: {
    text: "Phòng ban từ chối – chờ BLĐ duyệt",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  2: {
    text: "Chờ phòng ban duyệt",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  3: {
    text: "Đã duyệt",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  4: {
    text: "Phòng ban từ chối – chờ phân công lại",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
  5: {
    text: "Hủy do không có phòng ban tiếp nhận",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
};

const trangThaiPhieuDeXuatPhongBan: Record<string, TrangThai> = {
  0: {
    text: "Đã Hủy",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  1: {
    text: "Chờ phòng ban duyệt",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  2: {
    text: "Đã duyệt",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
};

const trangThaiPhanCongNoiBo: Record<string, TrangThai> = {
  false: {
    text: "Đã Hủy",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  true: {
    text: "Đã phân công",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
};

export const trangThaiPhanTichKetQua: Record<string, TrangThai> = {
  1: {
    text: "Chờ lãnh đạo phòng duyệt",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  2: {
    text: "Chờ BLĐ duyệt",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  3: {
    text: "BLĐ đã duyệt",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  4: {
    text: "BLĐ đã từ chối",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  5: {
    text: "LDP từ chối",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
};

const trangThaiDuTru: Record<string, TrangThai> = {
  0: {
    text: "Đã hủy",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  1: {
    text: "Chờ duyệt",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  2: {
    text: "Đã Duyệt",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
};

export const getStatusClass = (status: any) => {
  switch (status) {
    case "Hoàn thành":
      return "bg-green-100 text-green-800";
    case "Đang kiểm tra":
      return "bg-blue-100 text-blue-800";
    case "Đang xử lý":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
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

export function renderTrangThaiMau(trangThaiId: string) {
  const trangThai = trangThaiMauMap[trangThaiId] || {
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

export function renderTrangThaiChiTietPhieuDeXuatPhongBan(trangThaiId: string) {
  const trangThai = trangThaiChiTietPhieuDeXuatPhongBan[trangThaiId] || {
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

export function renderTrangThaiPhieuDeXuatPhongBan(trangThaiId: string) {
  const trangThai = trangThaiPhieuDeXuatPhongBan[trangThaiId] || {
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

export function renderTrangThaiPhanCongNoiBo(trangThaiId: string) {
  const trangThai = trangThaiPhanCongNoiBo[trangThaiId] || {
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

export function renderTrangThaiDuTru(trangThaiId: string) {
  const trangThai = trangThaiDuTru[trangThaiId] || {
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

export function renderTrangThaiPhanTichKetQua(trangThaiId: string) {
  const trangThai = trangThaiPhanTichKetQua[trangThaiId] || {
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

export const formatDateNotTime = (dateString: any) => {
  const date = new Date(dateString).toLocaleDateString("vi-VN");
  return date;
};

export const formatDateNotTime2 = (date?: string | Date) => {
  if (!date) return undefined;
  const d = new Date(date);
  return d.toLocaleDateString("sv-SE");
};

export const getQualityClass = (quality: any) => {
  switch (quality) {
    case "Đạt":
      return "bg-green-100 text-green-800";
    case "Không đạt":
      return "bg-red-100 text-red-800";
    case "Cần kiểm tra lại":
      return "bg-yellow-100 text-yellow-800";
    case "Chưa xác định":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusIcon = (status: any) => {
  switch (status) {
    case "Hoàn thành":
      return "✅";
    case "Đang kiểm tra":
      return "🔍";
    case "Đang xử lý":
      return "⏳";
    default:
      return "📋";
  }
};
