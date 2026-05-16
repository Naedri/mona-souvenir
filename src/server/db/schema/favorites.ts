import { text, timestamp, uuid, unique } from "drizzle-orm/pg-core";
import { createTable } from "./utils";
import { users } from "./auth";

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
  (table) => ({
    uniqueFavorite: unique().on(table.userId, table.museum, table.artworkId)
  })
);
