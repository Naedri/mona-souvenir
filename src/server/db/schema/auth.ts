import { boolean, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createTable } from "./utils";

export const users = createTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name"),

  email: text("email").notNull().unique(),

  emailVerified: boolean("email_verified").default(false).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull()
});

export const sessions = createTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  token: text("token").notNull().unique(),

  expiresAt: timestamp("expires_at", {
    withTimezone: true
  }).notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade"
    }),

  createdAt: timestamp("created_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),

  ipAddress: text("ip_address"),

  userAgent: text("user_agent")
});

export const accounts = createTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),

  accountId: text("account_id").notNull(),

  providerId: text("provider_id").notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade"
    }),

  accessToken: text("access_token"),

  refreshToken: text("refresh_token"),

  idToken: text("id_token"),

  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true
  }),

  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    withTimezone: true
  }),

  scope: text("scope"),

  password: text("password"),

  createdAt: timestamp("created_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull()
});

export const verifications = createTable("verifications", {
  id: uuid("id").defaultRandom().primaryKey(),

  identifier: text("identifier").notNull(),

  value: text("value").notNull(),

  expiresAt: timestamp("expires_at", {
    withTimezone: true
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull()
});
