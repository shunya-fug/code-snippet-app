import { FieldValues, useController } from "react-hook-form";

import TextField, { TextFieldProps } from "@/components/input/base/TextField";

import RhfProps from "@/types/RhfProps";

export type RhfTextFieldProps<T extends FieldValues> = RhfProps<T> &
  TextFieldProps;

const RhfTextField = <T extends FieldValues>({
  name,
  control,
  ...rest
}: RhfTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <TextField
      {...field}
      {...rest}
      error={invalid}
      helperText={error?.message}
      ref={field.ref}
    />
  );
};

export default RhfTextField;
