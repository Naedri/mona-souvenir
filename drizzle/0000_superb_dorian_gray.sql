CREATE TABLE "mona_souvenir_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mona_souvenir_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	CONSTRAINT "mona_souvenir_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "mona_souvenir_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mona_souvenir_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "mona_souvenir_verifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mona_souvenir_favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"museum" text NOT NULL,
	"artwork_id" text NOT NULL,
	"title" text NOT NULL,
	"image_url" text,
	"author" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_user_artwork_unique" UNIQUE("user_id","museum","artwork_id")
);
--> statement-breakpoint
ALTER TABLE "mona_souvenir_accounts" ADD CONSTRAINT "mona_souvenir_accounts_user_id_mona_souvenir_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."mona_souvenir_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mona_souvenir_sessions" ADD CONSTRAINT "mona_souvenir_sessions_user_id_mona_souvenir_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."mona_souvenir_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mona_souvenir_favorites" ADD CONSTRAINT "mona_souvenir_favorites_user_id_mona_souvenir_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."mona_souvenir_users"("id") ON DELETE cascade ON UPDATE no action;