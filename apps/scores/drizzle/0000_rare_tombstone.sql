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
	"lyrics_bg" text,
	"lyrics_de" text,
	"lyrics_en" text,
	"lyrics_fr" text,
	"create_date" date,
	"creation_date" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"price" numeric(10, 2),
	"payment_id" text,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "uploads" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"original_file_name" varchar(255) NOT NULL,
	"interpret_name" varchar(255) NOT NULL,
	"arrangement_name" varchar(255) NOT NULL,
	"album_name" varchar(255) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"category" text,
	"file_size" integer NOT NULL,
	"s3_key" text NOT NULL,
	"s3_bucket" varchar(100) NOT NULL,
	"s3_url" text NOT NULL,
	"uploaded_by" integer,
	"score_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uploads_file_name_unique" UNIQUE("file_name"),
	CONSTRAINT "uploads_s3_key_unique" UNIQUE("s3_key")
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
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_score_id_scores_id_fk" FOREIGN KEY ("score_id") REFERENCES "public"."scores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;