import { FormControl, SxProps, Theme, Typography } from "@mui/material";
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
  isShowError?: boolean;
  className?: string;
  readOnly?: any;
  onFocus?: (e: any) => void;
  autocomplete?: any;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  height?: string;
}

export const Textarea = (props: InputsProps) => {
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
    <FormControl
      fullWidth
      className={`gap-2 grid ${height ? height : "h-[106px]"}`}
    >
      {title && (
        <p className="!font-semibold text-base/6 text-gray_80">{title}</p>
      )}
      <textarea
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        value={value}
        className={clsx(
          className,
          "border border-solid border-gray-300 rounded text-lg/6 px-[14px] py-[9.5px] focus-within:outline-1  focus-within:border  focus-within:border-blue-300"
        )}
        {...inputRef}
        readOnly={readOnly}
        onFocus={onFocus}
        sx={sx}
        disabled={disabled}
      />
      {errorMessage && (
        <Typography className="text-[#af1c10] font-medium text-xs/[140%]">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};
