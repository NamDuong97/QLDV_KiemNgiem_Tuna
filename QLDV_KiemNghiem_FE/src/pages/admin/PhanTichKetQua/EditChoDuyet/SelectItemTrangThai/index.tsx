import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  item?: any;
  setItem?: any;
}

export default function SelectItemTrangThai(props: Props) {
  const { item, setItem } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  return (
    <Box
      sx={{ minWidth: 300, maxWidth: 300, ".MuiSelect-select": { padding: 1 } }}
    >
      <FormControl fullWidth>
        <Select
          value={item || ""} // fallback tránh lỗi undefined
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
          <MenuItem value="Đạt">Đạt</MenuItem>
          <MenuItem value="Chưa đạt">Chưa đạt</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
