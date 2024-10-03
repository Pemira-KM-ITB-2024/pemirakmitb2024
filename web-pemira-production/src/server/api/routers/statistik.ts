import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCClientError } from "@trpc/client";

export const statistikRouter = createTRPCRouter({
  getCampusVotes: publicProcedure.query(async ({ ctx }) => {
    const votes = await ctx.db.voteK3M.findMany({
      select: {
        admin: true,
      },
    });
    const ganesha = votes.filter((vote) =>
      [
        "voter1",
        "voter2",
        "voter3",
        "voter4",
        "voter5",
        "voter6",
        "voter7",
        "voter8",
        "voter9",
        "voter10",
        "voter11",
        "voter12",
        "voter13",
        "voter14",
        "voter15",
        "voter16",
        "voter17",
        "voter18",
      ].includes(vote.admin.username),
    );
    const jatinangor = votes.filter((vote) =>
      [
        "voter19",
        "voter20",
        "voter21",
        "voter22",
        "voter23",
        "voter24",
        "voter25",
        "voter26",
      ].includes(vote.admin.username),
    );
    const cirebon = votes.filter((vote) =>
      ["voter27", "voter28"].includes(vote.admin.username),
    );

    return {
      jatinangor: jatinangor.length,
      ganesha: ganesha.length,
      cirebon: cirebon.length,
      total: votes.length,
    };
  }),
  getFacultyVotes: publicProcedure
    .input(z.object({ nims: z.array(z.number()) }))
    .query(async ({ ctx, input }) => {
      const { nims } = input;
      const arrayOfNIM = nims.map((nim) => nim.toString());
      const votes = await ctx.db.mahasiswa.findMany({
        where: {
          voted: true,
        },
      });

      const arrayOfVotes = arrayOfNIM.map((nim) => ({
        nim: nim,
        votes: votes.filter((vote) => vote.nim.substring(0, 3) === nim).length,
      }));

      return arrayOfVotes;
    }),
});
