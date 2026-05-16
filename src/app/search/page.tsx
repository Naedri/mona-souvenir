"use client";

import { useMemo, useState } from "react";

import { Button, InputGroup, Select } from "@cloudflare/kumo";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { trpc } from "@/trpc/client";

const museums = [
  {
    id: "louvre",
    name: "Musée du Louvre",
    supportsSearch: false
  },
  {
    id: "met",
    name: "Metropolitan Museum of Art",
    supportsSearch: true
  }
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const [museumId, setMuseumId] = useState("met");

  const selectedMuseum = useMemo(
    () => museums.find((museum) => museum.id === museumId),
    [museumId]
  );

  const searchQuery = trpc.museums.search.useQuery(
    {
      museumId,
      query
    },
    {
      enabled: false
    }
  );

  async function handleSearch() {
    if (!query.trim()) {
      return;
    }

    if (!selectedMuseum?.supportsSearch) {
      return;
    }

    await searchQuery.refetch();
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Search artworks</h1>

        <p className="text-sm text-neutral-500">Explore museum collections.</p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border p-6">
        <Select
          label="Museum"
          value={museumId}
          onValueChange={(value) => {
            if (value) {
              setMuseumId(value);
            }
          }}
          items={Object.fromEntries(
            museums.map((museum) => [
              museum.id,
              museum.supportsSearch
                ? museum.name
                : `${museum.name} (search unavailable)`
            ])
          )}
        />

        {!selectedMuseum?.supportsSearch && (
          <div className="rounded-xl border border-yellow-500 p-4 text-sm text-yellow-600">
            This museum does not currently support artwork search.
          </div>
        )}

        <InputGroup
          label="Search"
          description="Artwork title, artist, keyword..."
        >
          <InputGroup.Addon>
            <MagnifyingGlassIcon />
          </InputGroup.Addon>

          <InputGroup.Input
            placeholder="Picasso"
            value={query}
            disabled={!selectedMuseum?.supportsSearch}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void handleSearch();
              }
            }}
          />
        </InputGroup>

        <Button
          disabled={!selectedMuseum?.supportsSearch}
          loading={searchQuery.isFetching}
          onClick={() => void handleSearch()}
        >
          Search
        </Button>
      </div>

      {searchQuery.error && (
        <div className="rounded-xl border border-red-500 p-4 text-sm text-red-500">
          {searchQuery.error.message}
        </div>
      )}

      {searchQuery.data && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {searchQuery.data.map((artwork) => (
            <article
              key={artwork.id}
              className="overflow-hidden rounded-2xl border"
            >
              {artwork.imageUrl && (
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              )}

              <div className="space-y-2 p-4">
                <h2 className="text-lg font-semibold">{artwork.title}</h2>

                {artwork.author && (
                  <p className="text-sm text-neutral-500">{artwork.author}</p>
                )}

                {artwork.creationDate && (
                  <p className="text-xs text-neutral-400">
                    {artwork.creationDate}
                  </p>
                )}

                <p className="text-xs text-neutral-400">{artwork.museum}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
