import { useLocation } from "react-router";
import PhieuDKyDVKNForm from "./PhieuDKyDVKNForm";
import ListMau from "./ListMau";
import ListPLHC from "./ListPLHC";

type Props = {};

const Edit_PhieuDKyDVKN = (props: Props) => {
  const url = useLocation();
  const id = decodeURIComponent(url.pathname.split("/")[2]);

  const data = sessionStorage.getItem("DataPhieuDangKy");
  const dataSuaPhieuDangKy = data
    ? JSON.parse(data).find((item: any) => item.NguoiGuiMau === id)
    : [];
  const queryParams = new URLSearchParams(url.search);
  const isTag = queryParams.get("tuna");

  const handleSuaTheoTag = () => {
    switch (isTag) {
      case "phieu-dang-ky":
        return <PhieuDKyDVKNForm dataPhieuDangKy={dataSuaPhieuDangKy} />;
      case "danh-sach-mau":
        return <ListMau dataListMau={dataSuaPhieuDangKy?.Mau} />;
      case "danh-sach-phu-lieu-hoa-chat":
        return <ListPLHC dataListPLHC={dataSuaPhieuDangKy?.PLHC} />;
    }
  };

  return <div>{handleSuaTheoTag()}</div>;
};

export default Edit_PhieuDKyDVKN;
