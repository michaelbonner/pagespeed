import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";

export const db =
  process.env.IS_USING_NEON === "false"
    ? drizzlePg(process.env.DATABASE_URL!)
    : drizzle(process.env.DATABASE_URL!);
