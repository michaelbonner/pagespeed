CREATE TYPE "public"."strategy" AS ENUM(
    'mobile',
    'desktop'
);

--> statement-breakpoint
CREATE TABLE "pages"(
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name
        "pages_id_seq" INCREMENT BY 1
        MINVALUE 1
        MAXVALUE 2147483647 START WITH 1
        CACHE 1),
        "url" varchar(255) NOT NULL,
        "strategy" "strategy" NOT NULL,
        "performanceScore" numeric NOT NULL,
        "accessibilityScore" numeric NOT NULL,
        "bestPracticesScore" numeric NOT NULL,
        "seoScore" numeric NOT NULL,
        "createdAt" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE INDEX "url_strategy_index" ON "pages" USING btree("url", "strategy");

