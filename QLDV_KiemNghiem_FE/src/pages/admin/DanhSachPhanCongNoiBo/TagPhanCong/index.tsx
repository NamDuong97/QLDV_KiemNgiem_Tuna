import { tagPhanCong } from "..";
import { role } from "../../../../configs/parseJwt";

interface Props {
  setIsTag: React.Dispatch<React.SetStateAction<string>>;
  isTag: string;
}

const TagPhanCong = (props: Props) => {
  const { setIsTag, isTag } = props;

  return (
    <div className="flex flex-wrap gap-2">
      {role !== "KN" && (
        <button
          className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
            isTag === tagPhanCong.Phan_Cong
              ? "bg-indigo-100 text-indigo-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setIsTag(tagPhanCong.Phan_Cong)}
        >
          Phân công nhân viên
        </button>
      )}

      <button
        className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
          isTag === tagPhanCong.Danh_Sach
            ? "bg-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() => setIsTag(tagPhanCong.Danh_Sach)}
      >
        Danh Sách phân công
      </button>
      {role !== "KN" && (
        <button
          className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
            isTag === tagPhanCong.Lich_Su_Phan_Cong
              ? "bg-indigo-100 text-indigo-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setIsTag(tagPhanCong.Lich_Su_Phan_Cong)}
        >
          Lịch sử phân công
        </button>
      )}
    </div>
  );
};

export default TagPhanCong;
