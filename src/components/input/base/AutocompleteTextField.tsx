import { Autocomplete, AutocompleteProps } from "@mui/material";

// 自作コンポーネント等
import TextField, { TextFieldProps } from "./TextField";

export type AutoCompleteTextFieldProps<T> = {
  textFieldProps?: TextFieldProps;
  options: T[];
  autocompleteProps?: Omit<
    AutocompleteProps<T, true, false, true>,
    "renderInput" | "options"
  >;
};

const AutoCompleteTextField = <T,>({
  options,
  textFieldProps,
  autocompleteProps,
}: AutoCompleteTextFieldProps<T>) => {
  return (
    <Autocomplete
      freeSolo
      size="small"
      options={options}
      renderInput={(params) => (
        <TextField {...params} autoFocus {...textFieldProps} />
      )}
      {...autocompleteProps}
    />
  );
};

export default AutoCompleteTextField;
