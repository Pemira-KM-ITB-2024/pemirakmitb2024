import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface VoteData {
  email: string;
  isOneK3M: boolean;
  isOneMWAWM: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, isOneK3M, isOneMWAWM }: VoteData = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.hasVoted) {
      return res.status(400).json({ error: "User has already voted" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await prisma.voteK3M.create({
      data: { isOne: isOneK3M },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await prisma.voteMWAWM.create({
      data: { isOne: isOneMWAWM },
    });

    await prisma.user.update({
      where: { email },
      data: { hasVoted: true },
    });

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
