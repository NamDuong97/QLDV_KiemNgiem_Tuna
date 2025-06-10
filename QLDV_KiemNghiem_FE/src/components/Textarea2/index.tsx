import { Box, SxProps, Theme } from "@mui/material";
import clsx from "clsx";

interface InputsProps {
  title?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  value?: string | number;
  defaultValue?: string;
  inputRef?: any;
  errorMessage?: string | null;
  className?: string;
  readOnly?: any;
  onFocus?: (e: any) => void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  height?: string;
}

export const Textarea2 = (props: InputsProps) => {
  const {
    title,
    placeholder,
    name,
    value,
    defaultValue,
    inputRef,
    errorMessage,
    readOnly,
    onFocus,
    disabled,
    className,
    sx,
    height,
  } = props;

  return (
    <Box
      className={`flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${
        height || "h-[106px]"
      }`}
    >
      <p className="font-bold text-lg/6 capitalize">{title}</p>
      <textarea
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        value={value}
        className={clsx(
          "flex-grow bg-transparent focus:outline-none text-lg/6 capitalize",
          className
        )}
        {...inputRef}
        readOnly={readOnly}
        onFocus={onFocus}
        sx={sx}
        disabled={disabled}
      />
      {errorMessage && (
        <p className="text-[#af1c10] !font-medium !text-sm/[140%]">
          {errorMessage}
        </p>
      )}
    </Box>
  );
};
