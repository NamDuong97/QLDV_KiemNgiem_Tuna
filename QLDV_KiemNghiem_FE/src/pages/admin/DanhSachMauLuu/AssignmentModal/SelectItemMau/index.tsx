import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  item?: any;
  setItem?: any;
  title?: any;
  data?: any;
}

export default function SelectItemMau(props: Props) {
  const { item, setItem, title, data } = props;

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
            PaperProps: {
              sx: {
                height: 250,
                maxHeight: 250,
              },
            },
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
          <MenuItem value="">Chọn {title}</MenuItem>
          {data?.map((option: any, index: any) => (
            <MenuItem key={index} value={option?.maId}>
              {option.tenMau}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
