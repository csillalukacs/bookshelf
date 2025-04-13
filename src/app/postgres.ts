import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var globalPool: Pool | undefined;
}

// Ensure the pool is created only once
export const pool =
  global.globalPool ||
  new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

if (process.env.NODE_ENV !== "production") global.globalPool = pool;

console.log("Pool total count, idle count, waiting count: ",
   pool.totalCount, pool.idleCount, pool.waitingCount)
