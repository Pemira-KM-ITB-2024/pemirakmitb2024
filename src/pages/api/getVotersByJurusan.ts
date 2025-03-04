import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { jurusan, fakultas, himpunan } = req.query;

  const filters: any = { hasVoted: true };
  if (jurusan && typeof jurusan === "string") filters.jurusan = jurusan;
  if (fakultas && typeof fakultas === "string") filters.fakultas = fakultas;
  if (himpunan && typeof himpunan === "string") filters.himpunan = himpunan;

  try {
    const count = await prisma.user.count({
      where: filters,
    });

    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}