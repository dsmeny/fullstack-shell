import express from "express";
import { db } from "./db.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.get("/api/hello", async (req, res) => {
  try {
    const result = await db.execute("SELECT 'Hello from Turso' AS message");
    res.json({ message: result.rows[0].message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await db.execute(
      "SELECT id, name, email, created_at FROM users ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  try {
    const result = await db.execute({
      sql: "INSERT INTO users (name, email) VALUES (?, ?) RETURNING id, name, email, created_at",
      args: [name, email],
    });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT" || /UNIQUE/.test(err.message)) {
      return res.status(409).json({ error: "email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
