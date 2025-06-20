import { ImSearch } from "react-icons/im";

interface Props {
  endButton?: any;
  placeholder?: string;
  value?: any;
  onChange?: (e: any) => void;
}

const InputSearch2 = (props: Props) => {
  const { endButton, placeholder, value, onChange } = props;

  return (
    <label className="border border-gray-300 flex py-1 px-4 rounded-md group focus-within:border-blue-500 cursor-text w-full">
      <div className="py-[2px] flex gap-2 items-center flex-1">
        <ImSearch className="text-gray-500" />
        <input
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="focus:outline-none w-full bg-transparent"
        />
      </div>
      {endButton}
    </label>
  );
};

export default InputSearch2;
