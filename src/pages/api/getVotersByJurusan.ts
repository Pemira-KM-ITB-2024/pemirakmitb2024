import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { jurusan, fakultas, himpunan, angkatan } = req.query;

  const filters: any = { hasVoted: true };
  if (jurusan && typeof jurusan === "string") filters.jurusan = jurusan;
  if (fakultas && typeof fakultas === "string") filters.fakultas = fakultas;
  if (himpunan && typeof himpunan === "string") filters.himpunan = himpunan;

  try {
    if (!angkatan) {
      const count = await prisma.user.count({
        where: filters,
      });
      return res.status(200).json({ count });
    }
    const users = await prisma.user.findMany({
      where: filters,
      select: {
        email: true,
      }
    });
    
    let filteredUsers;
    
    if (angkatan === "Other") {
      filteredUsers = users.filter(user => {
        const email = user.email;
        if (!email || !email.includes("@mahasiswa.itb.ac.id") || email.length < 5) return false;
        
        const yearCode = email.substring(3, 5);
        return !["20", "21", "22", "23", "24"].includes(yearCode);
      });
    } else {
      filteredUsers = users.filter(user => {
        const email = user.email;
        if (!email || !email.includes("@mahasiswa.itb.ac.id") || email.length < 5) return false;
        
        return email.substring(3, 5) === angkatan;
      });
    }
    
    return res.status(200).json({ count: filteredUsers.length });
    
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}