import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputAutocompleteProps {
  control: any;
  name: string;
  label?: string;
  errorMessage?: string | null;
  data: any[];
  placeholder?: string;
  title?: string;
}

export default function InputAutocomplete({
  control,
  name,
  label,
  errorMessage,
  data,
  placeholder,
  title,
}: InputAutocompleteProps) {
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
            noOptionsText="Không tìm thấy"
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.maDmPlhc
            }
            value={
              data?.find((item) => item.tenDmPlhc === field.value) ||
              field.value ||
              ""
            }
            onChange={(_, newValue) => {
              if (typeof newValue === "string") {
                field.onChange(newValue);
              } else if (newValue && typeof newValue === "object") {
                field.onChange(newValue.tenDmPlhc);
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
