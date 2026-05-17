import type { ArtworkDto } from "../dto/artwork.dto";
import type { SearchArtworksDto } from "../dto/search-artworks.dto";
import type { MuseumProvider } from "./museum-provider.interface";

import { searchLouvreApi } from "../clients/louvre.client";
import { mapLouvreArtwork } from "../mappers/louvre.mapper";

import { debug } from "@/server/utils/debug";

export class LouvreProvider implements MuseumProvider {
  readonly museumId = "louvre";

  async searchArtworks(input: SearchArtworksDto): Promise<ArtworkDto[]> {
    debug.log("louvre.provider", "search artworks", input);
    const response = await searchLouvreApi(input.query);
    debug.log("louvre.provider", "api response", response);
    if (!response.hits) {
      debug.warn("louvre.provider", "missing hits array", response);
      return [];
    }
    const artworks = response.hits.map(mapLouvreArtwork);
    debug.log("louvre.provider", "mapped artworks", artworks);
    return artworks;
  }
}
