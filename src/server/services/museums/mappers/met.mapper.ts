import type { ArtworkDto } from "../dto/artwork.dto";

import type { MetObjectResponse } from "../types/met-api.types";

export function mapMetArtwork(artwork: MetObjectResponse): ArtworkDto {
  return {
    id: artwork.objectID.toString(),

    museum: "met",

    title: artwork.title,

    imageUrl: artwork.primaryImage,

    author: artwork.artistDisplayName,

    creationDate: artwork.objectDate
  };
}
