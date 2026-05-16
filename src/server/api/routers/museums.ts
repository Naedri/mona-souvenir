import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { searchMuseumArtworks } from "@/server/services/museums/museum.service";

export const museumsRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        museumId: z.string(),
        query: z.string().min(1)
      })
    )
    .query(async ({ input }) => {
      return searchMuseumArtworks(input.museumId, input.query);
    })
});
