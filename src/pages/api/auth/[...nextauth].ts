import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID ?? "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "",
      tenantId: process.env.MICROSOFT_TENANT_ID, // Optional: Specify your tenant ID
      authorization: {
        params: {
          scope: "openid profile email", // Required scopes
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment
  callbacks: {
    async signIn({ user, account, profile }) {
      // Optional: Add any additional sign-in logic here
      return true;
    },
  },
});
