import type { ArtworkDto } from "./dto/artwork.dto";

import { museumRegistry } from "./registry/museum-registry";

import { debug } from "@/server/utils/debug";

export async function searchMuseumArtworks(
  museumId: string,
  query: string
): Promise<ArtworkDto[]> {
  debug.log("museum.service", "search request", { museumId, query });
  const provider = museumRegistry[museumId];

  if (!provider) {
    debug.warn("museum.service", "unknown provider", museumId);
    throw new Error(`Unknown museum provider: ${museumId}`);
  }

  return provider.searchArtworks({
    query
  });
}
