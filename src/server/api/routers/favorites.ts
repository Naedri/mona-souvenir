import { z } from "zod";

import {
  addFavorite,
  getUserFavorites,
  removeFavorite
} from "@/server/services/favorites";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const favoritesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUserFavorites(ctx.session.user.id);
  }),

  add: protectedProcedure
    .input(
      z.object({
        museumId: z.string(),

        artworkId: z.string(),

        title: z.string(),

        imageUrl: z.string().optional(),

        author: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return addFavorite(ctx.session.user.id, input);
    }),

  remove: protectedProcedure
    .input(
      z.object({
        artworkId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return removeFavorite(ctx.session.user.id, input.artworkId);
    })
});
