import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { queryKhoaAll } from "../../../../hooks/personnels/queryKhoa";

interface Props {
  item?: any;
  setItem?: any;
  title?: any;
}

export default function SelectItemKhoa(props: Props) {
  const { item, setItem, title } = props;

  const { data } = queryKhoaAll({
    queryKey: "KhoaAll",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  return (
    <Box
      sx={{ minWidth: 350, maxWidth: 350, ".MuiSelect-select": { padding: 1 } }}
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
          {data?.map((option: any, index: any) => (
            <MenuItem key={index} value={option.maId}>
              {option.tenKhoa}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
