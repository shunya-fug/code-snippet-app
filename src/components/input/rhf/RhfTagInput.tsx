import { FieldValues, useController } from "react-hook-form";

// 自作コンポーネント等
import RhfProps from "@/types/RhfProps";

import TagInput, { TagInputProps } from "../base/TagInput";

export type RhfTagInputProps<
  T extends FieldValues,
  U extends string
> = RhfProps<T> & TagInputProps<U>;

// react-hook-form と zod でバリデーションを行う
const RhfTagInput = <T extends FieldValues, U extends string>({
  name,
  control,
  options,
  textFieldProps,
  autocompleteProps,
}: RhfTagInputProps<T, U>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <TagInput
      {...field}
      options={options}
      autocompleteProps={{
        value: field.value || [],
        onChange: (_, value) => field.onChange(value),
        ...autocompleteProps,
      }}
      textFieldProps={{
        error: invalid,
        helperText: error?.message,
        ...textFieldProps,
      }}
      ref={field.ref}
    />
  );
};

export default RhfTagInput;
