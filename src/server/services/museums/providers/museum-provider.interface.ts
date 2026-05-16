import type { ArtworkDto } from "../dto/artwork.dto";
import type { SearchArtworksDto } from "../dto/search-artworks.dto";

export interface MuseumProvider {
  readonly museumId: string;

  displayName: string;

  supportsSearch: boolean;

  supportsArtworkDetails: boolean;

  searchArtworks(input: SearchArtworksDto): Promise<ArtworkDto[]>;
}
