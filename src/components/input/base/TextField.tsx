import React from "react";

import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

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

TextField.displayName = "TextField";

export default TextField;
