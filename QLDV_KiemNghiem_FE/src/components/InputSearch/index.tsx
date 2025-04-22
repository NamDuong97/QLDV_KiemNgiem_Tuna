import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface InputSearchProps {
  name?: string;
  placeholder?: string;
}

const InputSearch = (props: InputSearchProps) => {
  const { name, placeholder } = props;
  return (
    <Box className="gap-2 flex py-1 border-b-[1px] border-solid border-gray-300 cursor-pointer focus-within:border-blue-400 focus-within:duration-700 focus-within:ease-in-out">
      <Box className="cursor-pointer hover:bg-gray-300 rounded-full p-1" >
        <SearchIcon />
      </Box>
      <input
        type="search"
        name={name}
        placeholder={placeholder}
        className={`focus:outline-none w-96`}
        autoComplete="off"
      />
    </Box>
  );
};

export default InputSearch;
