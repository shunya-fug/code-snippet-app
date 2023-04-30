import { Chip } from "@mui/material";

// 自作コンポーネント等
import AutoCompleteTextField, {
  AutoCompleteTextFieldProps,
} from "./AutocompleteTextField";

export type TagInputProps<T extends string> = AutoCompleteTextFieldProps<T>;

const TagInput = <T extends string>({
  textFieldProps,
  options,
  autocompleteProps,
}: TagInputProps<T>) => {
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
        ...autocompleteProps,
      }}
      textFieldProps={{ ...textFieldProps }}
    />
  );
};

export default TagInput;
