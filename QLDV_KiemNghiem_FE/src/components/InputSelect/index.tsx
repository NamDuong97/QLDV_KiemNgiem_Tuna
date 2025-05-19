import { Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}

interface InputSelectProps {
  control: any;
  title?: string;
  selectProps?: any;
  name: string;
  errorMessage?: string | null;
  options: Option[];
}

const InputSelect = (props: InputSelectProps) => {
  const { control, title, selectProps, name, errorMessage, options } = props;
  const isMulti = selectProps?.isMulti;

  return (
    <div className="h-[106px]">
      {title && (
        <p className="!font-semibold text-base/6 text-gray_80 pb-2">{title}</p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = isMulti
            ? options.filter((opt) => field.value?.includes(opt.value))
            : options.find((opt) => opt.value === field.value) || null;

          const handleChange = (selected: any) => {
            if (isMulti) {
              field.onChange(selected ? selected.map((opt: Option) => opt.value) : []);
            } else {
              field.onChange(selected?.value || null);
            }
          };

          return (
            <Select
              {...selectProps}
              options={options}
              isMulti={isMulti}
              value={value}
              onChange={handleChange}
              onBlur={field.onBlur}
              name={field.name}
              inputRef={field.ref}
            />
          );
        }}
      />
      {errorMessage && (
        <Typography className="text-[#af1c10] !font-medium !text-sm/[140%] pt-2">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default InputSelect;
