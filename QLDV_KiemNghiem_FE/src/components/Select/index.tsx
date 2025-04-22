import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  data?: any;
  dataDefault?: string;
  errors?: any;
  title?: string;
  height?: string;
}

const SelectComponent = (props: Props) => {
  const { data, errors, title, height, dataDefault } = props;

  const [selectGender, setSelectGender] = useState("");
  const handleChangeGender = (event: SelectChangeEvent) => {
    setSelectGender(event.target.value);
  };
  return (
    <Box className={`w-full ${height ? height : "h-[106px]"}`}>
      {title && (
        <p className="!font-semibold text-base/6 text-gray_80 mb-2">{title}</p>
      )}
      <Box>
        <FormControl sx={{ width: "100%" }}>
          <Select
            value={selectGender}
            onChange={handleChangeGender}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="h-[42px] mb-2"
          >
            <MenuItem value="">{dataDefault}</MenuItem>
            {data.map((item: any, index: any) => (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors && (
          <Typography className="text-[#af1c10] font-medium text-xs/[140%]">
            {errors}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SelectComponent;
