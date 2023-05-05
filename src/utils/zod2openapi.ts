import { generateSchema } from "@anatine/zod-openapi";

import { SnippetCreateManyInputSchema } from "@/generated/schemas/zod";

const openApiSchema = generateSchema(SnippetCreateManyInputSchema);
console.log(openApiSchema);
