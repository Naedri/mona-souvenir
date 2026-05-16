export interface FavoriteDto {
  id: number;

  userId: string;

  artworkId: string;

  museumId: string;

  title: string;

  imageUrl?: string;

  author?: string;

  createdAt: Date;
}
