export interface MetSearchResponse {
  total: number;

  objectIDs: number[] | null;
}

export interface MetObjectResponse {
  objectID: number;

  title: string;

  primaryImage: string;

  artistDisplayName: string;

  objectDate: string;
}
