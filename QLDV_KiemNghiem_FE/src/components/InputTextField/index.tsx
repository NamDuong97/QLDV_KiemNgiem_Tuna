import {
  FormControl,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";

interface InputTextFieldProps {
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
  variant?: string;
}

export const InputTextField = (props: InputTextFieldProps) => {
  const {
    title,
    placeholder,
    name,
    type,
    value,
    defaultValue,
    inputRef,
    errorMessage,
    // isShowError,
    readOnly,
    // autocomplete,
    onFocus,
    disabled,
    className,
    sx,
    variant,
  } = props;

  const { ref: refInput, ...inputProps } = inputRef || { ref: null };

  return (
    <FormControl fullWidth className="gap-1 grid">
      <TextField
        type={type || "text"}
        variant={variant}
        label={title}
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
      />
      {errorMessage && (
        <Typography className="text-[#af1c10] !font-medium !text-xs/[140%]">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};
