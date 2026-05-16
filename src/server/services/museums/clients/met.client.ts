import type {
  MetObjectResponse,
  MetSearchResponse
} from "../types/met-api.types";

import { debug } from "@/server/utils/debug";

const MET_API_BASE_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

export async function searchMetObjects(query: string): Promise<number[]> {
  const url = new URL(`${MET_API_BASE_URL}/search`);

  url.searchParams.set("q", query);

  debug.log("met.client", "search url", url.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    debug.error("met.client", "search failed", response.status);

    throw new Error("Failed to search MET API");
  }

  const data = (await response.json()) as MetSearchResponse;

  return data.objectIDs ?? [];
}

export async function fetchMetObject(
  objectId: number
): Promise<MetObjectResponse> {
  const url = `${MET_API_BASE_URL}/objects/${objectId}`;

  debug.log("met.client", "object url", url);

  const response = await fetch(url);

  if (!response.ok) {
    debug.error("met.client", "object fetch failed", response.status);

    throw new Error("Failed to fetch MET object");
  }

  return (await response.json()) as MetObjectResponse;
}
