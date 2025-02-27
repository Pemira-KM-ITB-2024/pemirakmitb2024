import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pemirakmitb.com"
    : "http://localhost:3000";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID ?? "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "",
      tenantId: process.env.MICROSOFT_TENANT_ID,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl: defaultBaseUrl }) {
      return url.startsWith("/") ? `${baseUrl}${url}` : url;
    },
  },
});
