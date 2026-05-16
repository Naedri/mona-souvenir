export interface LouvreSearchResponse {
  hits: LouvreArtwork[];
}

export interface LouvreArtwork {
  objectid: string;

  title?: string;

  image?: string;

  author?: string;

  date?: string;
}
