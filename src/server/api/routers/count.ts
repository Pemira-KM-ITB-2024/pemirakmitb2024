import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCClientError } from "@trpc/client";

export const countRouter = createTRPCRouter({
  getVotes: publicProcedure
    .input(z.object({ tps: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { tps } = input;

      if (tps) {
        try {
          const votes = await ctx.db.voteK3M.count({
            where: {
              admin: {
                username: tps,
              },
            },
          });
          return votes;
        } catch (error) {
          throw new TRPCClientError("Failed to get votes");
        }
      }

      try {
        const votes = await ctx.db.voteK3M.count();
        return votes;
      } catch (error) {
        throw new TRPCClientError("Failed to get votes");
      }
    }),
  getQuickCount: publicProcedure
    .input(z.object({ tps: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const query = [
        `voter${Number(input.tps) * 2 - 1}`,
        `voter${Number(input.tps) * 2}`,
      ];

      const where = input.tps ? {
        OR: query.map((voter) => ({
          admin: {
            username: voter,
          }
        }))
      } : {};

      const pil_1 = await ctx.db.voteK3M.groupBy({
        by: ["pil_1"],
        where: where,
        _count: {
          pil_1: true
        }
      });
      const pil_2 = await ctx.db.voteK3M.groupBy({
        by: ["pil_2"],
        where: where,
        _count: {
          pil_2: true
        }
      });
      const pil_3 = await ctx.db.voteK3M.groupBy({
        by: ["pil_3"],
        where: where,
        _count: {
          pil_3: true
        }
      });
      const pil_4 = await ctx.db.voteK3M.groupBy({
        by: ["pil_4"],
        where: where,
        _count: {
          pil_4: true
        }
      });

      return {
        pil_1: {
          nabiel: pil_1.find((p) => p.pil_1 === "01")?._count.pil_1 ?? 0,
          fidela: pil_1.find((p) => p.pil_1 === "02")?._count.pil_1 ?? 0,
          daniel: pil_1.find((p) => p.pil_1 === "03")?._count.pil_1 ?? 0,
          kotakKosong: pil_1.find((p) => p.pil_1 === "04")?._count.pil_1 ?? 0,
          total: pil_1.map((p) => p._count.pil_1).reduce((a, b) => a + b, 0),
        },
        pil_2: {
          nabiel: pil_2.find((p) => p.pil_2 === "01")?._count.pil_2 ?? 0,
          fidela: pil_2.find((p) => p.pil_2 === "02")?._count.pil_2 ?? 0,
          daniel: pil_2.find((p) => p.pil_2 === "03")?._count.pil_2 ?? 0,
          kotakKosong: pil_2.find((p) => p.pil_2 === "04")?._count.pil_2 ?? 0,
          total: pil_2.map((p) => p._count.pil_2).reduce((a, b) => a + b, 0),
        },
        pil_3: {
          nabiel: pil_3.find((p) => p.pil_3 === "01")?._count.pil_3 ?? 0,
          fidela: pil_3.find((p) => p.pil_3 === "02")?._count.pil_3 ?? 0,
          daniel: pil_3.find((p) => p.pil_3 === "03")?._count.pil_3 ?? 0,
          kotakKosong: pil_3.find((p) => p.pil_3 === "04")?._count.pil_3 ?? 0,
          total: pil_3.map((p) => p._count.pil_3).reduce((a, b) => a + b, 0),
        },
        pil_4: {
          nabiel: pil_4.find((p) => p.pil_4 === "01")?._count.pil_4 ?? 0,
          fidela: pil_4.find((p) => p.pil_4 === "02")?._count.pil_4 ?? 0,
          daniel: pil_4.find((p) => p.pil_4 === "03")?._count.pil_4 ?? 0,
          kotakKosong: pil_4.find((p) => p.pil_4 === "04")?._count.pil_4 ?? 0,
          total: pil_4.map((p) => p._count.pil_4).reduce((a, b) => a + b, 0),
        },
      };
    }),
  getPilihan1: publicProcedure
    .input(z.object({ tps: z.string().optional() }))
    .query(async ({ ctx }) => {}),
});
