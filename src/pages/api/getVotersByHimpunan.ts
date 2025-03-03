import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { himpunan } = req.query;

  if (!himpunan || typeof himpunan !== "string") {
    return res.status(400).json({
      error: "Himpunan query parameter is required and must be a string",
    });
  }

  try {
    const voters = await prisma.user.findMany({
      where: { himpunan, hasVoted: true },
    });

    return res.status(200).json(voters);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
