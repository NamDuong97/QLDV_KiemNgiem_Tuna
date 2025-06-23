import { Calendar, CheckCircle, User } from "react-feather";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

interface Props {
  icon: any;
  label: any;
  value: any;
}

const CardInfoItem = (props: Props) => {
  const { icon, label, value } = props;
  const icons: any = {
    calendar: <Calendar className="h-5 w-5 text-gray-400 mr-2" />,
    user: <User className="h-5 w-5 text-gray-400 mr-2" />,
    building: (
      <HiOutlineOfficeBuilding className="h-5 w-5 text-gray-400 mr-2" />
    ),
    result: <CheckCircle className="h-5 w-5 text-gray-400 mr-2" />,
  };

  return (
    <div className="flex">
      {icons[icon]}
      <div>
        <span className="text-xs font-medium text-gray-500 block">{label}</span>
        <span className="text-sm text-gray-900">{value}</span>
      </div>
    </div>
  );
};

export default CardInfoItem;
