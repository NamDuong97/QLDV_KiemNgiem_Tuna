import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { trangThaiData } from "../../../../../../models/trangjThaiPhieuDKy";

interface Props {
  item?: any;
  setItem?: any;
  title?: any;
}

export default function SelectItemTrangThai(props: Props) {
  const { item, setItem, title } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  return (
    <Box sx={{ ".MuiSelect-select": { padding: 1 } }}>
      <FormControl fullWidth>
        <Select
          value={item}
          displayEmpty
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }}
        >
          <MenuItem value="">Tất cả {title}</MenuItem>
          {trangThaiData?.map((option: any, index: any) => (
            <MenuItem key={index} value={option.maId}>
              {option.tenTt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
