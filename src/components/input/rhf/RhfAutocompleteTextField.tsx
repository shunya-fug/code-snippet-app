import { FieldValues, useController } from "react-hook-form";

import RhfProps from "@/types/RhfProps";

import AutoCompleteTextField, {
  AutoCompleteTextFieldProps,
} from "../base/AutocompleteTextField";

export type RhfAutocompleteTextFieldProps<
  T extends FieldValues,
  U
> = RhfProps<T> & AutoCompleteTextFieldProps<U>;

// react-hook-form と zod でバリデーションを行う
const RhfAutocompleteTextField = <T extends FieldValues, U>({
  name,
  control,
  options,
  textFieldProps,
  autocompleteProps,
}: RhfAutocompleteTextFieldProps<T, U>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <AutoCompleteTextField
      {...field}
      options={options}
      autocompleteProps={{ ...autocompleteProps }}
      textFieldProps={{
        error: invalid,
        helperText: error?.message,
        ...textFieldProps,
      }}
      ref={field.ref}
    />
  );
};

export default RhfAutocompleteTextField;
