import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { cubeSessions } from "~/server/db/schema";

export const cubeSessionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await ctx.db.insert(cubeSessions).values({
        name: input.name,
        userId: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.cubeSessions.findFirst({
      orderBy: (cubeSessions, { desc }) => [desc(cubeSessions.createdAt)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
