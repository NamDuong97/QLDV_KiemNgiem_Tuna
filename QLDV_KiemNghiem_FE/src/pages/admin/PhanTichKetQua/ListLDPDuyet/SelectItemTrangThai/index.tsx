import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { trangThaiPhanTichKetQua } from "../../../../../configs/configAll";

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
    <Box
      sx={{ minWidth: 300, maxWidth: 300, ".MuiSelect-select": { padding: 1 } }}
    >
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
          {Object.entries(trangThaiPhanTichKetQua)
            .filter(([key]) => key !== "2" && key !== "3")
            .map(([key, option]) => (
              <MenuItem key={key} value={key}>
                {option.text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
