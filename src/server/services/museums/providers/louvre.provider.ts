import type { ArtworkDto } from "../dto/artwork.dto";
import type { SearchArtworksDto } from "../dto/search-artworks.dto";
import type { MuseumProvider } from "./museum-provider.interface";

import { debug } from "@/server/utils/debug";

export class LouvreProvider implements MuseumProvider {
  readonly museumId = "louvre";

  displayName = "Musée du Louvre";

  supportsSearch = false;

  supportsArtworkDetails = true;

  async searchArtworks(input: SearchArtworksDto): Promise<ArtworkDto[]> {
    debug.warn("louvre.provider", "search unsupported", input);

    return [];
  }
}
