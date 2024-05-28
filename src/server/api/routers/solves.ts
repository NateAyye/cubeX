import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { cubeSessions, solves } from "~/server/db/schema";
import { CUBING_EVENTS } from "~/types";

export const solvesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        time: z.number(),
        scramble: z.string(),
        cubingEvent: z.enum(CUBING_EVENTS),
        ao5: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await ctx.db.insert(solves).values({
        cubeSessionId: ctx.session.user.currentSessionId,
        time: input.time,
        scramble: input.scramble,
        cubingEvent: input.cubingEvent,
        ao5: input.ao5,
      });
    }),
  getCurrentSessionSolves: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.solves.findMany({
      where: (solves, { eq }) =>
        eq(solves.cubeSessionId, ctx.session.user.currentSessionId),
    });
  }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(cubeSessions).where(eq(cubeSessions.id, input));
    }),
});
