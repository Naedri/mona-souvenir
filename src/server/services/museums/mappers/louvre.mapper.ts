import type { ArtworkDto } from "../dto/artwork.dto";
import type { LouvreArtwork } from "../types/louvre-api.types";

export function mapLouvreArtwork(artwork: LouvreArtwork): ArtworkDto {
  return {
    id: artwork.objectid,

    museum: "louvre",

    title: artwork.title ?? "Untitled",

    imageUrl: artwork.image,

    author: artwork.author,

    creationDate: artwork.date
  };
}
