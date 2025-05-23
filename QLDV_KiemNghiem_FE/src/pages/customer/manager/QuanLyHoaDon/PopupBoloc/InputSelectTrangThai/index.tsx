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

export default function InputSelectTrangThai({
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
        <p className="!font-semibold text-base/6 text-gray_80 pb-2">{title}</p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            freeSolo
            options={data}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.TrangThai
            }
            value={
              data.find((item) => item.TrangThai === field.value) ||
              field.value ||
              ""
            }
            onChange={(_, newValue) => {
              if (typeof newValue === "string") {
                field.onChange(newValue);
              } else if (newValue && typeof newValue === "object") {
                field.onChange(newValue.TrangThai);
              } else {
                field.onChange("");
              }
            }}
            onInputChange={(_, newInputValue, reason) => {
              if (reason === "input") {
                field.onChange(newInputValue);
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
