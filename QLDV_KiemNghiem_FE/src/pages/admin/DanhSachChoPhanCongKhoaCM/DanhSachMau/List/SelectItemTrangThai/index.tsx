import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  item?: any;
  setItem?: any;
  title?: any;
}

const data = [
  {
    maTrangThai: 1,
    tenTrangThai: "Chờ phân công",
  },
  {
    maTrangThai: 2,
    tenTrangThai: "Đang kiểm nghiệm",
  },
  {
    maTrangThai: 3,
    tenTrangThai: "Đã bị huỷ bởi khoa chuyên môn",
  },
  {
    maTrangThai: 4,
    tenTrangThai: "Đã bị huỷ bởi khách",
  },
  {
    maTrangThai: 5,
    tenTrangThai: "Đã hoàn thành",
  },
  {
    maTrangThai: 6,
    tenTrangThai: "Đã phân công chờ duyệt",
  },
  {
    maTrangThai: 7,
    tenTrangThai: "Đã phân công nội bộ",
  },
  {
    maTrangThai: 8,
    tenTrangThai: "Đã hoàn thành kiểm nghiệm",
  },
];

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
          {data?.map((option: any, index: any) => (
            <MenuItem key={index} value={option.maTrangThai}>
              {option.tenTrangThai}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
