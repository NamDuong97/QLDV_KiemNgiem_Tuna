import { Controller } from "react-hook-form";
import { Box, Typography } from "@mui/material";

interface Option {
  label: string;
  value: string;
}

interface InputCheckboxesProps {
  control?: any;
  name: string;
  errorMessage?: any;
  title?: string;
  options: Option[];
}

const InputCheckboxes = (props: InputCheckboxesProps) => {
  const { control, name, errorMessage, title, options } = props;
  return (
    <div className="space-y-2">
      {title && (
        <p className="!font-semibold text-base/6 text-gray_80">{title}</p>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const handleChange = (lang: string) => {
            const current = field.value || [];
            if (current.includes(lang)) {
              field.onChange(current.filter((v: string) => v !== lang));
            } else {
              field.onChange([...current, lang]);
            }
          };

          return (
            <Box className="flex gap-4">
              {options.map((lang: any) => (
                <Box
                  key={lang.value}
                  className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={field.value?.includes(lang.value)}
                    onChange={() => handleChange(lang.value)}
                  />
                  <span className="text-base/6 font-medium">{lang.label}</span>
                </Box>
              ))}
            </Box>
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

export default InputCheckboxes;
