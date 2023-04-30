import { Control, FieldPath, FieldValues } from "react-hook-form";

type RhfProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
};

export default RhfProps;
