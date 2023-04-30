import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";

export type CodeEditorProps = ReactCodeMirrorProps;

const CodeEditor = (props: CodeEditorProps) => {
  return <CodeMirror theme={vscodeDark} {...props} />;
};

export default CodeEditor;
