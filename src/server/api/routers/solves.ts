import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { cubeSessions } from "~/server/db/schema";

export const solvesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        time: z.number(),
        scramble: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await ctx.db.insert(cubeSessions).values({
        name: input.name,
        userId: ctx.session.user.id,
      });
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(cubeSessions).where(eq(cubeSessions.id, input));
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.cubeSessions.findFirst({
      orderBy: (cubeSessions, { desc }) => [desc(cubeSessions.createdAt)],
    });
  }),
});
