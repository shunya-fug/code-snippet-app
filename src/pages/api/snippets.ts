import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { Snippet } from "@/generated/schemas/orval/components-schemas-Snippet";

import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const snippets = await prisma.snippet.findMany();
    res.status(200).json(snippets);
  } else if (req.method === "POST") {
    // セッション確認
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).send("Unauthorized");
      return;
    }

    const { title, description, code, language, tags }: Snippet = req.body;
    const snippet = await prisma.snippet.create({
      data: {
        userId: session.user?.id || "",
        title,
        language,
        code,
        description,
        tags,
      },
    });
    res.status(200).json(snippet);
  } else {
    res.status(404).send("Not found");
  }
}
