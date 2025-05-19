import { Box } from "@mui/material";
import { ChangeEvent, Dispatch } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface InputSearchProps {
  name?: string;
  placeholder?: string;
  square?: boolean;
  width?: string;
  setValue: Dispatch<React.SetStateAction<any>>;
}

const InputSearch = (props: InputSearchProps) => {
  const { name, placeholder, square, width, setValue } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Box
      className={`gap-2 flex py-1 ${
        square ? "border-[1px] rounded-md px-2" : "border-b-[1px]"
      }  border-solid border-gray-300 cursor-pointer focus-within:border-blue-400 focus-within:duration-700 focus-within:ease-in-out`}
    >
      <Box className="cursor-pointer hover:bg-gray-300 rounded-full p-1">
        <SearchIcon />
      </Box>
      <input
        type="search"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={`focus:outline-none ${width ? width : "w-96"}`}
        autoComplete="off"
      />
    </Box>
  );
};

export default InputSearch;
