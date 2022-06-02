import express, { Request, Response } from "express";
import pg from "pg";

const app = express();
const client = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

client
  .connect()
  .then(() => {
    console.log("Postgres was connected");
  })
  .catch(() => {
    console.log("Postgres connection failed");
  });

client.query(
  `CREATE TABLE IF NOT EXISTS Items (
        id SERIAL PRIMARY KEY,
        name varchar,
        age integer
    );`
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ success: "ok" });
});

app.get("/items", async (req: Request, res: Response) => {
  console.log("one");

  const items = await client.query("Select * From items");
  res.send(items.rows);
});

app.post("/items", async (req: Request, res: Response) => {
  const item = await client.query(
    `Insert Into Items(name, age) Values('Peter', 33) Returning *`
  );
  res.send(item.rows[0]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
