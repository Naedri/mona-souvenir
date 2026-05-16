import type { ArtworkDto } from "../dto/artwork.dto";
import type { SearchArtworksDto } from "../dto/search-artworks.dto";

export interface MuseumProvider {
  readonly museumId: string;

  searchArtworks(input: SearchArtworksDto): Promise<ArtworkDto[]>;
}
