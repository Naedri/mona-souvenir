import { and, desc, eq } from "drizzle-orm";

import { db } from "@/server/db";

import { favorites } from "@/server/db/schema";

import type { AddFavoriteDto } from "../dto/add-favorite.dto";

export async function createFavorite(userId: string, input: AddFavoriteDto) {
  const [favorite] = await db
    .insert(favorites)
    .values({
      userId,

      museum: input.museumId,

      artworkId: input.artworkId,

      title: input.title,

      imageUrl: input.imageUrl,

      author: input.author
    })
    .returning();

  return favorite;
}

export async function findFavoritesByUserId(userId: string) {
  return db.query.favorites.findMany({
    where: eq(favorites.userId, userId),

    orderBy: desc(favorites.createdAt)
  });
}

export async function deleteFavorite(userId: string, artworkId: string) {
  return db
    .delete(favorites)
    .where(
      and(eq(favorites.userId, userId), eq(favorites.artworkId, artworkId))
    );
}
