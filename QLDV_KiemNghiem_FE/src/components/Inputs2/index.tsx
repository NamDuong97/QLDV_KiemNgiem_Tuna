import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";
import clsx from "clsx";

interface Props {
  title: string;
  placeholder?: string;
  name?: string;
  type?: string;
  value?: string | number;
  defaultValue?: any;
  inputRef?: any;
  errorMessage?: string | null;
  className?: string;
  readOnly?: any;
  onFocus?: (e: any) => void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const Inputs2 = (props: Props) => {
  const {
    title,
    placeholder,
    name,
    type,
    value,
    defaultValue,
    inputRef,
    errorMessage,
    readOnly,
    onFocus,
    disabled,
    className,
    sx,
  } = props;

  const { ref: refInput, ...inputProps } = inputRef || { ref: null };
  return (
    <Box className="flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <p className="font-bold text-lg/6 capitalize">{title}</p>
      <input
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        value={value}
        className={clsx(
          "flex-grow bg-transparent focus:outline-none text-lg/6 capitalize",
          className
        )}
        {...inputProps}
        {...refInput}
        readOnly={readOnly}
        autoComplete="off"
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

export default Inputs2;
