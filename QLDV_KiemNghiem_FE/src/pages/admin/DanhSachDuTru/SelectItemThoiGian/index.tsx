import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  item?: any;
  setItem?: any;
  title?: any;
}

const dataThoiGian = [
  {
    maId: "1",
    name: "Hôm nay",
  },
  {
    maId: "2",
    name: "Tuần này",
  },
  {
    maId: "3",
    name: "Tháng này",
  },
  {
    maId: "4",
    name: "Năm này",
  },
];

export default function SelectItemThoiGian(props: Props) {
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
          {dataThoiGian?.map((option: any, index: any) => (
            <MenuItem key={index} value={option.maId}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
