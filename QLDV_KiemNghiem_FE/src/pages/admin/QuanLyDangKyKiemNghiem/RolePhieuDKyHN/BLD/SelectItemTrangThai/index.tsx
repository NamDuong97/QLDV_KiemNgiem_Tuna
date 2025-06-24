import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGetTrangThaiPhieuDkAll } from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import { keyTag } from "../../../../../../models/Account-Customer";

interface Props {
  item?: any;
  setItem?: any;
  title?: any;
  activeFilter?: string;
}

export default function SelectItemTrangThai(props: Props) {
  const { item, setItem, title, activeFilter } = props;

  const { data } = useGetTrangThaiPhieuDkAll({
    queryKey: "TrangThaiPhieuDkAll",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  const dataSelect =
    activeFilter === keyTag.Ban_Lanh_Dao_Duyet
      ? [
          { maId: "TT04", tenTt: "BLĐ từ chối" },
          { maId: "TT05", tenTt: "BLD đã duyệt và chờ phân công phòng ban" },
        ]
      : data;
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
          {dataSelect?.map((option: any, index: any) => (
            <MenuItem key={index} value={option.maId}>
              {option.tenTt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
