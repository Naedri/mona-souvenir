import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { debug } from "@/server/utils/debug";

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
      try {
        debug.log("museums.search", "input", input);
        const artworks = await searchMuseumArtworks(
          input.museumId,
          input.query
        );
        debug.log("museums.search", "artworks", artworks);
        return artworks;
      } catch (error) {
        debug.error("museums.search", "query failed", error);
        throw error;
      }
    })
});
