import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const geoJsonRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.geoJsonData.findMany();
  }),

  create: publicProcedure
    .input(z.object({ geoJson: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      if (!input.geoJson) {
        throw new Error("geoJson is required");
      }

      return await ctx.prisma.geoJsonData.create({
        data: {
          geoJson: input.geoJson,
        },
      });
    }),
});
