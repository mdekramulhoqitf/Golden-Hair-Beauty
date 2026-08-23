// One-time setup: creates tables/RLS/storage bucket, creates the admin auth user,
// and seeds existing local JSON content into Supabase.
// Required env vars (pass inline, never commit them):
//   SUPABASE_DB_HOST, SUPABASE_DB_PORT, SUPABASE_DB_NAME, SUPABASE_DB_USER, SUPABASE_DB_PASSWORD
//   SUPABASE_URL, SUPABASE_SECRET_KEY, ADMIN_EMAIL
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const {
  SUPABASE_DB_HOST,
  SUPABASE_DB_PORT,
  SUPABASE_DB_NAME,
  SUPABASE_DB_USER,
  SUPABASE_DB_PASSWORD,
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  ADMIN_EMAIL,
} = process.env;

for (const [key, value] of Object.entries({
  SUPABASE_DB_HOST,
  SUPABASE_DB_PORT,
  SUPABASE_DB_NAME,
  SUPABASE_DB_USER,
  SUPABASE_DB_PASSWORD,
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  ADMIN_EMAIL,
})) {
  if (!value) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}

function generatePassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%*";
  const bytes = crypto.randomBytes(20);
  let out = "";
  for (let i = 0; i < 20; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

async function runSchema() {
  const client = new pg.Client({
    host: SUPABASE_DB_HOST,
    port: Number(SUPABASE_DB_PORT),
    database: SUPABASE_DB_NAME,
    user: SUPABASE_DB_USER,
    password: SUPABASE_DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const sql = await fs.readFile(path.join(ROOT, "supabase/schema.sql"), "utf8");
    await client.query(sql);
    console.log("Schema applied (tables, RLS, storage bucket).");
  } finally {
    await client.end();
  }
}

async function createAdminUser() {
  const password = generatePassword();
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: ADMIN_EMAIL, password, email_confirm: true }),
  });
  const body = await res.json();
  if (!res.ok) {
    if (body.error_code === "email_exists" || body.msg?.includes("already been registered")) {
      console.log(`Admin user ${ADMIN_EMAIL} already exists — leaving password unchanged.`);
      return null;
    }
    throw new Error(`Failed to create admin user: ${JSON.stringify(body)}`);
  }
  console.log("Admin auth user created.");
  return password;
}

async function seed() {
  const client = new pg.Client({
    host: SUPABASE_DB_HOST,
    port: Number(SUPABASE_DB_PORT),
    database: SUPABASE_DB_NAME,
    user: SUPABASE_DB_USER,
    password: SUPABASE_DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const packages = JSON.parse(
      await fs.readFile(path.join(ROOT, "src/data/store/landing-packages.json"), "utf8")
    );
    for (const [index, pkg] of packages.entries()) {
      await client.query(
        `insert into public.landing_packages (id, name, volume, price, old_price, image_url, sort_order)
         values ($1, $2, $3, $4, $5, $6, $7)
         on conflict (id) do update set
           name = excluded.name, volume = excluded.volume, price = excluded.price,
           old_price = excluded.old_price, image_url = excluded.image_url,
           sort_order = excluded.sort_order, updated_at = now()`,
        [pkg.id, pkg.name, pkg.volume, pkg.price, pkg.oldPrice ?? null, pkg.images?.[0] ?? null, index]
      );
    }
    console.log(`Seeded ${packages.length} packages.`);

    const { rows: existing } = await client.query("select count(*)::int as count from public.landing_reviews");
    if (existing[0].count > 0) {
      console.log("landing_reviews already has rows — skipping review seed to avoid duplicates.");
      return;
    }

    const reviews = JSON.parse(
      await fs.readFile(path.join(ROOT, "src/data/store/landing-reviews.json"), "utf8")
    );
    for (const [index, rv] of reviews.entries()) {
      const mediaType = rv.media?.type || "none";
      await client.query(
        `insert into public.landing_reviews (name, location, rating, verified, review, media_type, media_url, sort_order)
         values ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [rv.name, rv.location, rv.rating, rv.verified, rv.review ?? null, mediaType, rv.media?.src ?? null, index]
      );
    }
    console.log(`Seeded ${reviews.length} reviews.`);
  } finally {
    await client.end();
  }
}

await runSchema();
const password = await createAdminUser();
await seed();

console.log("\nDone.");
if (password) {
  console.log(`Admin login — email: ${ADMIN_EMAIL}  password: ${password}`);
  console.log("Save this password now — it will not be shown again.");
}
