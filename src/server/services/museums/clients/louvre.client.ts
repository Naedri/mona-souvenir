import type { LouvreSearchResponse } from "../types/louvre-api.types";

const LOUVRE_API_URL = "https://collections.louvre.fr/api/search";

export async function searchLouvreApi(
  query: string
): Promise<LouvreSearchResponse> {
  const url = new URL(LOUVRE_API_URL);

  url.searchParams.set("q", query);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json"
    },
    next: {
      revalidate: 3600
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Louvre API");
  }

  const data: unknown = await response.json();

  return data as LouvreSearchResponse;
}
