import { createTRPCRouter } from "~/server/api/trpc";
import { inputNimRouter } from "~/server/api/routers/inputNim";
import { countRouter } from './routers/count';
import { adminRouter } from './routers/admin';
import { statistikRouter } from './routers/statistik';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  inputNim: inputNimRouter,
  count: countRouter,
  admin: adminRouter,
  stats: statistikRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
