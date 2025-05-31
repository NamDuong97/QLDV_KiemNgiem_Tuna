import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputSelectLoaiMauProps {
  control: any;
  name: string;
  label?: string;
  errorMessage?: string | null;
  data: any[];
  placeholder?: string;
  title?: string;
}

export default function InputSelectLoaiMau({
  control,
  name,
  label,
  errorMessage,
  data,
  placeholder,
  title,
}: InputSelectLoaiMauProps) {
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
            options={data}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.tenLoaiMau
            }
            value={
              data.find((item) => item.maID === field.value) ||
              field.value ||
              ""
            }
            onChange={(_, newValue) => {
              if (typeof newValue === "string") {
                field.onChange(newValue);
              } else if (newValue && typeof newValue === "object") {
                field.onChange(newValue.maID);
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
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 42,
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
