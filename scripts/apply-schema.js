const fs = require("fs");
const { Client } = require("pg");

async function main() {
  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE || "postgres",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  await client.query(fs.readFileSync("supabase-schema.sql", "utf8"));

  const result = await client.query(`
    select table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_name in ('access_requests', 'care_members', 'care_spaces', 'dose_logs', 'medicines', 'profiles')
    order by table_name
  `);

  console.log(JSON.stringify({ ok: true, tables: result.rows.map((row) => row.table_name) }));
  await client.end();
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, code: error.code, message: error.message }));
  process.exit(1);
});
