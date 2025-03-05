import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const signOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (token) {
    res.setHeader("Set-Cookie", [
      `__Secure-next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
      `__Host-next-auth.csrf-token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
      `next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
      `next-auth.csrf-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
    ]);
    res.status(200).json({ message: "Signed out successfully" });
  } else {
    res.status(401).json({ message: "No active session" });
  }
};

export default signOutHandler;
