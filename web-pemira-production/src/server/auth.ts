import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
import { compare } from "bcrypt-ts";
import { TRPCError } from "@trpc/server";
import { type Role } from '@prisma/client';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
      role?: Role;
      passwordHash?: string;
    };
  }

  interface User {
    id: string;
    username: string;
    role?: Role;
    passwordHash?: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    updateAge: 0, // always update the session
    maxAge: 12 * 60 * 60, // 12 hours
  },
  jwt: {
    maxAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        username: token.username,
        role: token.role,
        passwordHash: token.passwordHash,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.passwordHash = user.passwordHash;
      }
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Credentials tidak ditemukan",
          });
        }
        const { username, password } = credentials;

        if (!username || !password) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username dan password tidak ditemukan",
          });
        }

        const user = await prisma.admin.findUnique({
          where: {
            username: username,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Akun tidak ditemukan",
          });
        }

        const isValid = await compare(password, user.passwordHash);

        if (!isValid) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Password salah",
          });
        }

        return {
          id: user.id,
          username: user.username,
          role: user.role,
          passwordHash: user.passwordHash,
        };
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
