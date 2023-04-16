import { useRef } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism.css";

type CodeEditorProps = {
  language?: string;
  code: string;
  onCodeChange: (code: string) => void;
};

const CodeEditor = ({
  language = "plain",
  code,
  onCodeChange,
}: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCodeChange = (newCode: string) => {
    onCodeChange(newCode);
  };

  return (
    <div ref={editorRef}>
      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={(code) =>
          highlight(code, languages[language], language as string)
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          border: "1px solid #ddd",
          borderRadius: 5,
        }}
      />
    </div>
  );
};

export default CodeEditor;
