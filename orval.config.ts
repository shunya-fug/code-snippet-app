import { defineConfig } from "orval";

export default defineConfig({
  CodeSnippet: {
    input: {
      target: "./docs/openapi/openapi.yaml",
    },
    output: {
      mode: "tags-split",
      target: "./src/generated/api/CodeSnippet.ts",
      schemas: "./src/generated/schemas/orval",
      client: "react-query",
      mock: true,
    },
  },
});
