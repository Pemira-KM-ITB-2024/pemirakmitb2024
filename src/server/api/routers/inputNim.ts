import { adminProcedure, createTRPCRouter, protectedProcedure, votingProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCClientError } from "@trpc/client";

export const inputNimRouter = createTRPCRouter({
  createMahasiswa: protectedProcedure
    .input(z.object({ nim: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.mahasiswa.create({
        data: {
          nim: input.nim,
          token: Math.random().toString(36).substring(7),
        },
      });
    }),

  getInfoMahasiswa: protectedProcedure
    .input(z.object({ nim: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.mahasiswa.findFirst({
        where: {
          nim: input.nim,
        },
      });
    }),

  isValid: protectedProcedure
    .input(z.object({ nim: z.string(), token: z.string() }))
    .query(async ({ ctx, input }) => {
      const mahasiswa = await ctx.db.mahasiswa.findFirst({
        where: {
          nim: input.nim,
          token: input.token,
        },
      });

      if (!mahasiswa) {
        return {
          nim: "",
          activated: false,
        };
      }

      if (mahasiswa.state) {
        return {
          nim: mahasiswa.nim,
          activated: mahasiswa.state,
        };
      }

      return {
        nim: input.nim,
        activated: false,
      };
    }),

  changeState: adminProcedure
    .input(z.object({ nim: z.string(), state: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const mahasiswa = await ctx.db.mahasiswa.findFirst({
          where: {
            nim: input.nim,
          },
        });

        if (!mahasiswa) {
          throw new TRPCClientError("Mahasiswa tidak ditemukan!");
        }

        return ctx.db.mahasiswa.update({
          where: {
            nim: input.nim,
          },
          data: {
            state: input.state,
          },
        });
      } catch (e) {
        throw new TRPCClientError("Gagal mengubah state mahasiswa!");
      }
    }),

  changeToken: adminProcedure
    .input(z.object({ nim: z.string() }))
    .mutation(async ({ ctx, input }) => {
      
      const mahasiswa = await ctx.db.mahasiswa.findFirst({
        where: {
          nim: input.nim,
        },
      });

      const token = Math.random().toString(36).substring(7).toUpperCase();

      if (!mahasiswa) {
        try {
          const create = await ctx.db.mahasiswa.create({
            data: {
              nim: input.nim,
              token: token,
              state: true,
            },
          });

          return {
            nim: create.nim,
            token: create.token,
          };
        } catch (e) {
          throw new TRPCClientError("Gagal mendaftarkan mahasiswa!");
        }
      }

      try {
        const update = await ctx.db.mahasiswa.update({
          where: {
            nim: input.nim,
          },
          data: {
            token: token,
            state: true,
          },
        });

        return {
          nim: update.nim,
          token: update.token,
        };
      } catch (e) {
        throw new TRPCClientError("Gagal mengubah token!");
      }
    }),

  vote: votingProcedure
    .input(
      z.object({
        nim: z.string(),
        pil_1: z.string(),
        pil_2: z.string().optional(),
        pil_3: z.string().optional(),
        pil_4: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mahasiswa = await ctx.db.mahasiswa.findFirst({
        where: {
          nim: input.nim,
        },
      });

      if (!input.pil_1) {
        throw new TRPCClientError("Pilihan 1 tidak boleh kosong!");
      }

      if (mahasiswa?.state === false) {
        throw new TRPCClientError("Mahasiswa belum diaktivasi!");
      }

      if (mahasiswa?.voted) {
        throw new TRPCClientError("Mahasiswa sudah memilih!");
      }

      try {
        const vote = await ctx.db.voteK3M.create({
          data: {
            pil_1: input.pil_1,
            pil_2: input.pil_2,
            pil_3: input.pil_3,
            pil_4: input.pil_4,
            adminId: ctx.session.user.id,
          },
        });

        if (!vote) {
          throw new TRPCClientError("Gagal melakukan vote!");
        }

        return ctx.db.mahasiswa.update({
          where: {
            nim: input.nim,
          },
          data: {
            voted: true,
            state: false,
            token: Math.random().toString(36).substring(7).toUpperCase(),
          },
        });
      } catch (e) {
        throw new TRPCClientError("Gagal mengupdate data mahasiswa!");
      }
    }),
});
