import { createClient } from '@libsql/client'

// Requires TURSO_DATABASE_URL + TURSO_AUTH_TOKEN in server/.env (see .env.example).
const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env
if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  throw new Error(
    'Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in server/.env',
  )
}

export const db = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
})

// Create tables on startup if they don't exist yet.
await db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)
