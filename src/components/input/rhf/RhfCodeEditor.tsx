import { FieldValues, useController } from "react-hook-form";

import { FormHelperText } from "@mui/material";

import RhfProps from "@/types/RhfProps";

import CodeEditor, { CodeEditorProps } from "../base/CodeEditor";

export type RhfCodeEditorProps<T extends FieldValues> = RhfProps<T> &
  CodeEditorProps;

// react-hook-form と zod でバリデーションを行う
const RhfCodeEditor = <T extends FieldValues>({
  name,
  control,
  lang,
  ...rest
}: RhfCodeEditorProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <>
      <CodeEditor {...field} {...rest} />
      <FormHelperText error={invalid} sx={{ textAlign: "right" }}>
        {error?.message}
      </FormHelperText>
    </>
  );
};

export default RhfCodeEditor;
