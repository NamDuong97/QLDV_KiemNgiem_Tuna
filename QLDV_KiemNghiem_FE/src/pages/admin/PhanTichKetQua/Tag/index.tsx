import { List } from "react-feather";
import { role } from "../../../../configs/parseJwt";

interface Props {
  activeTab: any;
  onTabChange: any;
}

const Tag = (props: Props) => {
  const { activeTab, onTabChange } = props;

  const tabs = [
    {
      id: "listChoDuyet",
      label: "Danh sách phiếu chờ duyệt",
      icon: List,
    },
    {
      id: "ListLDPDuyet",
      label: "Danh sách phiếu lãnh đạo phòng duyệt",
      icon: List,
    },
    {
      id: "listBLDDuyet",
      label: "Danh sách phiếu ban lãnh đạo duyệt",
      icon: List,
    },
  ];

  return (
    <nav className="flex space-x-8 mb-8">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 cursor-pointer ${
            activeTab === id
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-blue-100"
          }`}
        >
          <Icon size={16} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Tag;
