// AutoCompleteTextField.tsx
import React from "react";
import { Autocomplete, AutocompleteProps } from "@mui/material";
import TextField, { TextFieldProps } from "./TextField";

export type AutoCompleteTextFieldProps<T> = {
  textFieldProps?: TextFieldProps;
  options: T[];
  autocompleteProps?: Omit<
    AutocompleteProps<T, true, false, true>,
    "renderInput" | "options"
  >;
};

const AutoCompleteTextField = React.forwardRef<
  HTMLInputElement,
  AutoCompleteTextFieldProps<any>
>(({ options, textFieldProps, autocompleteProps }, ref) => {
  return (
    <Autocomplete
      freeSolo
      size="small"
      options={options}
      renderInput={(params) => (
        <TextField {...params} autoFocus {...textFieldProps} ref={ref} /> // inputRef を追加
      )}
      {...autocompleteProps}
    />
  );
});

export default AutoCompleteTextField;
