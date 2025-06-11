import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputSelectTrangThaiProps {
  control: any;
  name: string;
  label?: string;
  errorMessage?: string | null;
  data: any[];
  placeholder?: string;
  title?: string;
}

export default function InputSelectHoTen({
  control,
  name,
  label,
  errorMessage,
  data,
  placeholder,
  title,
}: InputSelectTrangThaiProps) {
  return (
    <>
      {title && (
        <p className="!font-semibold text-base/6 text-gray_80">{title}</p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            freeSolo
            options={data}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.hoten
            }
            value={
              data.find((item) => item.hoten === field.value) ||
              field.value ||
              ""
            }
            onChange={(_, newValue) => {
              if (typeof newValue === "string") {
                field.onChange(newValue);
              } else if (newValue && typeof newValue === "object") {
                field.onChange(newValue.hoten);
              } else {
                field.onChange("");
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!errorMessage}
                placeholder={placeholder}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 42, // hoặc 48, tuỳ nhu cầu
                  },
                }}
              />
            )}
          />
        )}
      />
      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
