import React from "react";
import { Chip } from "@mui/material";

import AutoCompleteTextField, {
  AutoCompleteTextFieldProps,
} from "./AutocompleteTextField";

export type TagInputProps<T extends string> = AutoCompleteTextFieldProps<T>;

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps<any>>(
  ({ textFieldProps, options, autocompleteProps }, ref) => {
    return (
      <AutoCompleteTextField
        options={options}
        autocompleteProps={{
          multiple: true,
          renderTags: (value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                size="small"
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            )),
          ref: ref,
          ...autocompleteProps,
        }}
        textFieldProps={{ ...textFieldProps }}
      />
    );
  }
);

export default TagInput;
