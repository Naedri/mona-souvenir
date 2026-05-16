import type { ArtworkDto } from "./dto/artwork.dto";

import { museumRegistry } from "./registry/museum-registry";

export async function searchMuseumArtworks(
  museumId: string,
  query: string
): Promise<ArtworkDto[]> {
  const provider = museumRegistry[museumId];

  if (!provider) {
    throw new Error(`Unknown museum provider: ${museumId}`);
  }

  return provider.searchArtworks({
    query
  });
}
