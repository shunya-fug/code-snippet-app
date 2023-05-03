import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import React from "react";

export type TextFieldProps = {} & MuiTextFieldProps;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <MuiTextField
        autoFocus
        type="text"
        size="small"
        fullWidth
        sx={{ my: 0 }}
        inputRef={ref}
        {...props}
      />
    );
  }
);

export default TextField;
