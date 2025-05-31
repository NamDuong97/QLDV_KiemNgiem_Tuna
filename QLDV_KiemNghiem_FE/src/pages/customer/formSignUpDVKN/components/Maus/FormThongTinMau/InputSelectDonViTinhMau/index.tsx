import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface InputSelectDonViTinhMauProps {
  control: any;
  name: string;
  label?: string;
  errorMessage?: string | null;
  data: any[];
  placeholder?: string;
  title?: string;
  height?: string;
}

export default function InputSelectDonViTinhMau({
  control,
  name,
  label,
  errorMessage,
  data,
  placeholder,
  title,
  height,
}: InputSelectDonViTinhMauProps) {
  const [inputValue, setInputValue] = useState("");
  const handleThemDonViTinhMau = () => {
    console.log("currentValue", inputValue); // đưa vao api thêm tên tiêu chuẩn vào bảng tiêu chuẩn
  };
  return (
    <div className={clsx(height ? height : "h-[106px]")}>
      {title && (
        <p className="!font-semibold text-base/6 text-gray_80 pb-2">{title}</p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const currentValue = field.value ?? "";
          const filteredOptions = data.filter((item) =>
            item.tenDonViTinh.toLowerCase().includes(currentValue.toLowerCase())
          );

          const showAddNewOption = currentValue && filteredOptions.length === 0;
          const extendedOptions = showAddNewOption
            ? [
                ...data,
                {
                  tenDonViTinh: currentValue,
                  isAddNew: true,
                },
              ]
            : data;

          return (
            <Autocomplete
              options={extendedOptions}
              noOptionsText={
                <Box
                  component="li"
                  className="flex justify-between items-center px-4 py-2"
                >
                  <span>Không tìm thấy.</span>
                  <button
                    onClick={handleThemDonViTinhMau}
                    className="text-sm/6 font-bold text-center border border-solid border-blue-500 text-blue-500 px-3 py-1 hover:text-white rounded-md hover:bg-blue-500 cursor-pointer"
                  >
                    Thêm
                  </button>
                </Box>
              }
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.tenDonViTinh
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
              onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
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
          );
        }}
      />
      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}
