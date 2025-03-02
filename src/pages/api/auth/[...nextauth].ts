import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaClient } from "@prisma/client";
import { jurusan } from "~/lib/constant/jurusan";

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
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const email = user.email ?? "";
        const microsoftId = user.id;
        const name = user.name ?? user.id;

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

        // Extract jurusan code from email and match with the list
        const jurusanCode = email.substring(0, 3);
        const numericJurusanCode = parseInt(jurusanCode, 10);

        // Find matching department or default to "Pascasarjana"
        const matchedJurusan =
          jurusan.find((j) => j.kode === numericJurusanCode)?.nama ??
          "Pascasarjana";

        // Check if a User record already exists (array is empty if not)
        if (accountRecord.User.length === 0) {
          await prisma.user.create({
            data: {
              name,
              email,
              jurusan: matchedJurusan,
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
