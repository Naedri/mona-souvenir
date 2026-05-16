import type { ArtworkDto } from "../dto/artwork.dto";
import type { SearchArtworksDto } from "../dto/search-artworks.dto";
import type { MuseumProvider } from "./museum-provider.interface";

import { searchLouvreApi } from "../clients/louvre.client";
import { mapLouvreArtwork } from "../mappers/louvre.mapper";

export class LouvreProvider implements MuseumProvider {
  readonly museumId = "louvre";

  async searchArtworks(input: SearchArtworksDto): Promise<ArtworkDto[]> {
    const response = await searchLouvreApi(input.query);

    return response.hits.map(mapLouvreArtwork);
  }
}
