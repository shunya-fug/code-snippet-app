import theme from "@/theme";
import { Typography } from "@mui/material";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism.css";
import { useRef } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import Editor from "react-simple-code-editor";

type CodeEditorProps = {
  language?: string;
  code: string;
  onCodeChange: UseFormSetValue<FieldValues>;
  fieldState: ControllerFieldState;
} & ControllerRenderProps<FieldValues, "code">;

const CodeEditor = ({
  language = "plain",
  code,
  onCodeChange,
  fieldState,
  ...rest
}: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCodeChange = (newCode: string) => {
    onCodeChange("code", newCode);
  };

  return (
    <div ref={editorRef}>
      <Editor
        {...rest}
        value={code}
        onValueChange={handleCodeChange}
        highlight={(code) =>
          highlight(code, languages[language], language as string)
        }
        padding={10}
        style={{
          fontFamily: theme.typography.fontFamily,
          fontSize: 16,
          border: "1px solid #ddd",
          borderRadius: 5,
        }}
        placeholder="Enter your code here..."
      />
      {fieldState.invalid && (
        <Typography>{fieldState.error?.message}</Typography>
      )}
    </div>
  );
};

export default CodeEditor;
