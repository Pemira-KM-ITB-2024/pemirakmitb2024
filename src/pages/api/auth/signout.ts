import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const signOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  const isProduction = process.env.NODE_ENV === "production";
  const secure = isProduction ? "Secure;" : "";

  if (token) {
    res.setHeader("Set-Cookie", [
      // Production cookies
      `__Secure-next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${secure} SameSite=Lax`,
      `__Host-next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${secure} SameSite=Lax`,
      // Development cookies
      `next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
      `next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
      // Callback URL cookie
      `next-auth.callback-url=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${secure} SameSite=Lax`,
    ]);
    res.status(200).json({ message: "Signed out successfully" });
  } else {
    res.status(401).json({ message: "No active session" });
  }
};

export default signOutHandler;