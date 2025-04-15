import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const strategyEnum = pgEnum("strategy", ["mobile", "desktop"]);

export const pagesTable = pgTable(
  "pages",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: varchar({ length: 255 }).notNull(),
    strategy: strategyEnum("strategy").notNull(),
    performanceScore: numeric().notNull(),
    accessibilityScore: numeric().notNull(),
    bestPracticesScore: numeric().notNull(),
    seoScore: numeric().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    index("url_strategy_index").on(table.url, table.strategy),
    index("url_index").on(table.url),
  ]
);
