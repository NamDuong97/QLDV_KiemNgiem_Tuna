import { tagDanhSachPhieuChoPhanCongKhoaCM } from "../CardMau";

interface Props {
  setIsTag: React.Dispatch<React.SetStateAction<string>>;
  isTag: string;
}

const TagPhanCong = (props: Props) => {
  const { setIsTag, isTag } = props;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`px-3 py-1.5 cursor-pointer text-base font-medium rounded-md ${
          isTag === tagDanhSachPhieuChoPhanCongKhoaCM.phancong
            ? "bg-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() => setIsTag(tagDanhSachPhieuChoPhanCongKhoaCM.phancong)}
      >
        {tagDanhSachPhieuChoPhanCongKhoaCM.phancong}
      </button>
      <button
        className={`px-3 py-1.5 cursor-pointer text-base font-medium rounded-md ${
          isTag === tagDanhSachPhieuChoPhanCongKhoaCM.duyetmautuchoi
            ? "bg-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() =>
          setIsTag(tagDanhSachPhieuChoPhanCongKhoaCM.duyetmautuchoi)
        }
      >
        {tagDanhSachPhieuChoPhanCongKhoaCM.duyetmautuchoi}
      </button>
      <button
        className={`px-3 py-1.5 cursor-pointer text-base font-medium rounded-md ${
          isTag === tagDanhSachPhieuChoPhanCongKhoaCM.tatca
            ? "bg-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() => setIsTag(tagDanhSachPhieuChoPhanCongKhoaCM.tatca)}
      >
        {tagDanhSachPhieuChoPhanCongKhoaCM.tatca}
      </button>
    </div>
  );
};

export default TagPhanCong;
