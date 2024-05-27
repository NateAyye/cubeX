import * as z from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { cubeSessions } from "~/server/db/schema";
import { CUBING_EVENTS } from "~/types";

export const cubeSessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        event: z.enum(CUBING_EVENTS),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const newSession = await ctx.db
        .insert(cubeSessions)
        .values({
          name: input.name,
          userId: input.userId,
          cubingEvent: input.event,
        })
        .returning();
      return newSession;
    }),
  getUserSessions: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.cubeSessions.findMany({
      where: (sessions, { eq }) => eq(sessions.userId, ctx.session.user.id),
      orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
    });
  }),
});
