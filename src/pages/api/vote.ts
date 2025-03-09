import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

interface VoteData {
  email: string;
  isOneK3M: boolean;
  isOneMWAWM: boolean;
}

const VOTE_DEADLINE = "2025-03-09T23:59:59.999+07:00"; 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const now = new Date();
  const deadline = new Date(VOTE_DEADLINE);
  
  if (now > deadline) {
    return res.status(403).json({ 
      error: "Voting period has ended",
      serverTime: now.toISOString(),
      deadline: VOTE_DEADLINE 
    });
  }

  const origin = req.headers.origin;
  if (
    process.env.NODE_ENV === "production" &&
    origin !== "https://pemirakmitb.com"
  ) {
    return res.status(403).json({ error: "Unauthorized origin" });
  }

  const csrfToken = req.headers["x-csrf-token"];
  if (!csrfToken) {
    return res.status(403).json({ error: "Missing CSRF token" });
  }

  const session = await getToken({ req });

  if (!session || !session?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { email, isOneK3M, isOneMWAWM }: VoteData = req.body;
  if (email !== session.email) {
    return res.status(403).json({ error: "Email mismatch" });
  }

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

    await prisma.voteK3M.create({
      data: { isOne: isOneK3M },
    });
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
