import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { Snippet } from "@/generated/prisma";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const snippets = await prisma.codeSnippet.findMany();
    res.status(200).json(snippets);
  } else if (req.method === "POST") {
    const { title, description, code, language, tags } = req.body;
    const snippet = await prisma.codeSnippet.create({
      data: <Snippet>{ title, description, code, language, tags },
    });
    res.status(200).json(snippet);
  } else {
    res.status(404).send("Not found");
  }
}
