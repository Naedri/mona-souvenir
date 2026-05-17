import type { LouvreSearchResponse } from "../types/louvre-api.types";

import { debug } from "@/server/utils/debug";

const LOUVRE_API_URL = "https://collections.louvre.fr/api/search";

export async function searchLouvreApi(
  query: string
): Promise<LouvreSearchResponse> {
  debug.log("louvre.client", "search query", query);

  const url = new URL(LOUVRE_API_URL);

  url.searchParams.set("q", query);

  debug.log("louvre.client", "request url", url.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json"
    },
    next: {
      revalidate: 3600
    }
  });

  debug.log("louvre.client", "response status", response.status);

  if (!response.ok) {
    debug.error("louvre.client", "request failed", {
      status: response.status,
      statusText: response.statusText
    });

    throw new Error("Failed to fetch Louvre API");
  }

  const data: unknown = await response.json();

  debug.log("louvre.client", "response payload", data);

  return data as LouvreSearchResponse;
}
