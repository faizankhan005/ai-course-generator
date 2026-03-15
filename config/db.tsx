// import { drizzle } from 'drizzle-orm/neon-http';

// const db = drizzle(process.env.DATABASE_URL);
// export default db;

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env");
}

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql);

export default db;