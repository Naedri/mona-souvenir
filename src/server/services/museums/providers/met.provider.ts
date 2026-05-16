import type { ArtworkDto } from "../dto/artwork.dto";

import type { SearchArtworksDto } from "../dto/search-artworks.dto";

import type { MuseumProvider } from "./museum-provider.interface";

import { fetchMetObject, searchMetObjects } from "../clients/met.client";

import { mapMetArtwork } from "../mappers/met.mapper";

import { debug } from "@/server/utils/debug";

export class MetProvider implements MuseumProvider {
  readonly museumId = "met";

  displayName = "Metropolitan Museum of Art";

  supportsSearch = true;

  supportsArtworkDetails = true;

  async searchArtworks(input: SearchArtworksDto): Promise<ArtworkDto[]> {
    debug.log("met.provider", "search artworks", input);

    const objectIds = await searchMetObjects(input.query);

    debug.log("met.provider", "object ids", objectIds);

    const limitedIds = objectIds.slice(0, 10);

    const artworks = await Promise.all(
      limitedIds.map(async (objectId) => {
        const artwork = await fetchMetObject(objectId);

        return mapMetArtwork(artwork);
      })
    );

    return artworks;
  }
}
