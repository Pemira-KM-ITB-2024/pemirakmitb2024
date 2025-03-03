import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { jurusan } = req.query;

  if (!jurusan || typeof jurusan !== "string") {
    return res.status(400).json({
      error: "Jurusan query parameter is required and must be a string",
    });
  }

  try {
    const voters = await prisma.user.findMany({
      where: { jurusan, hasVoted: true },
    });

    return res.status(200).json(voters);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
