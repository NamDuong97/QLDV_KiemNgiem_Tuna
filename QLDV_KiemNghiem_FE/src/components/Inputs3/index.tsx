import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import clsx from "clsx";

interface Props {
  title?: string;
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

const Inputs3 = (props: Props) => {
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
  return (
    <div className="grid gap-1 w-full">
      <label
        className={`flex gap-2 text-cyan-950 bg-white w-full ${
          title ? "px-4 py-2 rounded-md" : "py-1 px-2 rounded"
        } border-[2px] focus-within:border-blue-500 border-gray-300 cursor-text`}
      >
        {title && <p className="font-bold text-base/6 capitalize">{title}</p>}
        <input
          type={type || "text"}
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
          value={value}
          className={clsx(
            "flex-grow bg-transparent focus:outline-none text-base/6",
            className
          )}
          {...inputRef}
          readOnly={readOnly}
          autoComplete="off"
          onFocus={onFocus}
          sx={sx}
          disabled={disabled}
        />
      </label>
      {errorMessage && (
        <p className="text-[#af1c10] !font-medium !text-sm/[140%]">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Inputs3;
