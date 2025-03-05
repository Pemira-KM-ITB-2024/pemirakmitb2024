import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const signOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  const isProduction = process.env.NODE_ENV === "production";
  const domain = isProduction ? "pemirakmitb.com" : "localhost";
  const secure = isProduction ? "Secure;" : "";

  if (token) {
    res.setHeader("Set-Cookie", [
      `__Secure-next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; ${secure} SameSite=Lax; Domain=${domain}`,
      `__Host-next-auth.csrf-token=; Path=/; Max-Age=0; HttpOnly; ${secure} SameSite=Lax; Domain=${domain}`,
      `next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Domain=${domain}`,
      `next-auth.csrf-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Domain=${domain}`,
    ]);
    res.status(200).json({ message: "Signed out successfully" });
  } else {
    res.status(401).json({ message: "No active session" });
  }
};

export default signOutHandler;