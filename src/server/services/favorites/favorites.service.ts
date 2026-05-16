import type { AddFavoriteDto } from "./dto/add-favorite.dto";

import {
  createFavorite,
  deleteFavorite,
  findFavoritesByUserId
} from "./repositories/favorites.repository";

export async function addFavorite(userId: string, input: AddFavoriteDto) {
  return createFavorite(userId, input);
}

export async function getUserFavorites(userId: string) {
  return findFavoritesByUserId(userId);
}

export async function removeFavorite(userId: string, artworkId: string) {
  return deleteFavorite(userId, artworkId);
}
