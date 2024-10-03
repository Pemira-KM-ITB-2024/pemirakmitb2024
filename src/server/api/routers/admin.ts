import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getAdminPassword: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      return null
    }

    const pw = await ctx.db.admin.findUnique({
      where: {
        username: ctx.session.user.username,
      },
    });

    return pw?.passwordHash;
  }),
});
