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
          <MenuItem value={3}>Không có phòng ban nào tiếp nhận</MenuItem>
          <MenuItem value={4}>Khách hàng hủy</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
