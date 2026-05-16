import { text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

import { users } from "./auth";
import { createTable } from "./utils";

export const favorites = createTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade"
      }),

    museum: text("museum").notNull(),

    artworkId: text("artwork_id").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true
    })
      .defaultNow()
      .notNull()
  },
  (table) => [
    unique("favorites_user_artwork_unique").on(
      table.userId,
      table.museum,
      table.artworkId
    )
  ]
);
