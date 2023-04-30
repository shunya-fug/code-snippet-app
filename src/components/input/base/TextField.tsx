import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export type TextFieldProps = {} & MuiTextFieldProps;

const TextField = ({ ...rest }: TextFieldProps) => {
  return (
    <MuiTextField
      autoFocus
      type="text"
      size="small"
      fullWidth
      sx={{ my: 0 }}
      {...rest}
    />
  );
};

export default TextField;
