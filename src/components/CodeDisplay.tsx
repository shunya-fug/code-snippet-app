import SyntaxHighlighter from "react-syntax-highlighter";

import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import type { CodeSnippet } from "@/generated/schemas/orval";

interface Props {
  snippet: CodeSnippet;
}

/**
 * スニペットのコードをシンタックスハイライトして表示する
 */
  return (
    <SyntaxHighlighter
      language={snippet.language || "plain"}
      style={monokaiSublime}
      customStyle={{ marginTop: 0, marginBottom: 0 }}
      showLineNumbers
    >
      {snippet.code}
    </SyntaxHighlighter>
  );
};

