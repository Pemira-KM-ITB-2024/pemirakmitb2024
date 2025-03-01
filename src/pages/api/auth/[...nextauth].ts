import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pemirakmitb.com"
    : "http://localhost:3000";

export default NextAuth({
  debug: true,
  providers: [
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID ?? "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "",
      tenantId: process.env.MICROSOFT_TENANT_ID,
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Must be false in development
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Extract data from the NextAuth user object
        const email = user.email ?? "";
        const microsoftId = user.id;
        const name = user.name ?? user.id;

        // Upsert the Account record, including any linked User records
        const accountRecord = await prisma.account.upsert({
          where: { microsoftId },
          update: {
            email,
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
          },
          create: {
            email,
            microsoftId,
            name,
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
          },
          include: { User: true }, // include the associated User records
        });

        // Check if a User record already exists (array is empty if not)
        if (accountRecord.User.length === 0) {
          await prisma.user.create({
            data: {
              name,
              email,
              account: {
                connect: { id: accountRecord.id },
              },
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl: defaultUrl }) {
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const finalBaseUrl = `${protocol}://${baseUrl.replace(
        /^https?:\/\//,
        "",
      )}`;
      return url.startsWith("/") ? `${finalBaseUrl}${url}` : url;
    },
  },
});
