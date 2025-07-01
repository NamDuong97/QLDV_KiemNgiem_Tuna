import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  label?: string;
  errorMessage?: string;
  data: { maId: number | string; tenChiTieu: string }[];
  index: number;
  setValue: any;
}

export default function SelectItemChiTieu({
  control,
  name,
  label,
  errorMessage,
  data,
  index,
  setValue,
}: Props) {
  return (
    <>
      <FormControl fullWidth size="small" error={!!errorMessage}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              displayEmpty
              onChange={(e) => {
                field.onChange(e);
                const selected = data.find(
                  (c) => String(c.maId) === String(e.target.value)
                );
                if (selected) {
                  setValue(
                    `chiTietPhanTichKetQuas.${index}.tenChiTieu`,
                    selected.tenChiTieu,
                    {
                      shouldValidate: true,
                    }
                  );
                } else {
                  setValue(`chiTietPhanTichKetQuas.${index}.tenChiTieu`, "", {
                    shouldValidate: true,
                  });
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 200,
                  },
                },
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                transformOrigin: { vertical: "top", horizontal: "right" },
              }}
            >
              <MenuItem value="">
                <em>Chọn {label?.toLowerCase() || ""}</em>
              </MenuItem>
              {data?.map((option, index) => (
                <MenuItem key={index} value={option.maId}>
                  {option.tenChiTieu}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
