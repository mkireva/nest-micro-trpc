CREATE TABLE "scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"composer" text,
	"lyricist" text,
	"location" text,
	"description" text,
	"genre" text,
	"category" text,
	"key" text,
	"color" text,
	"lyrics" text,
	"create_date" date,
	"creation_date" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"price" numeric(10, 2),
	"payment_id" text,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"age" integer,
	"biography" text,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "scores" ADD CONSTRAINT "scores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;