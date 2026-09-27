import express from "express";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("railway.internal") ? false : { rejectUnauthorized: false },
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_state (
      id INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      actualizado TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT solo_una_fila CHECK (id = 1)
    );
  `);
  await pool.query(`
    INSERT INTO app_state (id, data) VALUES (1, '{}'::jsonb)
    ON CONFLICT (id) DO NOTHING;
  `);
}

const app = express();
app.use(express.json({ limit: "10mb" }));

app.get("/api/estado", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT data FROM app_state WHERE id = 1");
    res.json(rows[0]?.data ?? {});
  } catch (err) {
    console.error("Error al leer el estado:", err);
    res.status(500).json({ error: "No se pudo leer el estado" });
  }
});

app.put("/api/estado", async (req, res) => {
  try {
    await pool.query(
      "UPDATE app_state SET data = $1, actualizado = now() WHERE id = 1",
      [req.body ?? {}],
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("Error al guardar el estado:", err);
    res.status(500).json({ error: "No se pudo guardar el estado" });
  }
});

app.use(express.static(distDir));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

const port = process.env.PORT || 3000;

init()
  .then(() => {
    app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
  })
  .catch((err) => {
    console.error("No se pudo inicializar la base de datos:", err);
    process.exit(1);
  });
