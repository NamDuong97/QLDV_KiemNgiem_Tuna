import {
  FormControl,
  OutlinedInput,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

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

export const Inputs = (props: InputsProps) => {
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
    height,
  } = props;

  const { ref: refInput, ...inputProps } = inputRef || { ref: null };

  return (
    <FormControl
      fullWidth
      className={`gap-2 grid  ${height ? height : "h-[106px]"}`}
    >
      {title && (
        <p className="!font-semibold text-base/6 text-gray_80 whitespace-normal text-cyan-950">{title}</p>
      )}
      <OutlinedInput
        type={type || "text"}
        placeholder={placeholder}
        fullWidth
        name={name}
        defaultValue={defaultValue}
        value={value}
        className={className}
        {...inputProps}
        inputRef={refInput}
        readOnly={readOnly}
        autoComplete="off"
        onFocus={onFocus}
        sx={sx}
        disabled={disabled}
        inputProps={{
          step: "0.01",
          min: "0",
        }}
      />
      {errorMessage && (
        <Typography className="text-[#af1c10] !font-medium !text-sm/[140%]">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};
