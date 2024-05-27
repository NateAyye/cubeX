import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const usersRouter = createTRPCRouter({
  getSessionId: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user.currentSessionId;
  }),
  getSessionIdByUserId: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findFirst({ where: eq(users.id, input) });
    }),
  updateCurrentSessionId: protectedProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(users)
        .set({ currentSessionId: input })
        .where(eq(users.id, ctx.session.user.id))
        .returning();
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        currentSessionId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(users)
        .set(input)
        .where(eq(users.id, input.id))
        .returning();
    }),
});
