-- Goldenhair landing page content schema.
-- Safe to re-run: every statement is idempotent.

create table if not exists public.landing_packages (
  id text primary key,
  name text not null,
  volume text,
  price numeric not null default 0,
  old_price numeric,
  image_url text,
  sort_order int not null default 0,
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.landing_packages add column if not exists available boolean not null default true;

create table if not exists public.landing_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  rating int not null default 5 check (rating between 1 and 5),
  verified boolean not null default true,
  review text,
  media_type text not null default 'none' check (media_type in ('none', 'image', 'video')),
  media_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.landing_packages enable row level security;
alter table public.landing_reviews enable row level security;

drop policy if exists "public read packages" on public.landing_packages;
create policy "public read packages" on public.landing_packages
  for select using (true);

drop policy if exists "admin write packages" on public.landing_packages;
create policy "admin write packages" on public.landing_packages
  for all to authenticated using (true) with check (true);

drop policy if exists "public read reviews" on public.landing_reviews;
create policy "public read reviews" on public.landing_reviews
  for select using (true);

drop policy if exists "admin write reviews" on public.landing_reviews;
create policy "admin write reviews" on public.landing_reviews
  for all to authenticated using (true) with check (true);

-- Storage bucket for uploaded package/review images & videos.
insert into storage.buckets (id, name, public)
values ('landing-media', 'landing-media', true)
on conflict (id) do update set public = true;

-- storage.objects already has RLS enabled by Supabase; the postgres role can't
-- ALTER that table's RLS flag directly, only manage policies on it.

drop policy if exists "public read landing-media" on storage.objects;
create policy "public read landing-media" on storage.objects
  for select using (bucket_id = 'landing-media');

drop policy if exists "authenticated insert landing-media" on storage.objects;
create policy "authenticated insert landing-media" on storage.objects
  for insert to authenticated with check (bucket_id = 'landing-media');

drop policy if exists "authenticated update landing-media" on storage.objects;
create policy "authenticated update landing-media" on storage.objects
  for update to authenticated using (bucket_id = 'landing-media');

drop policy if exists "authenticated delete landing-media" on storage.objects;
create policy "authenticated delete landing-media" on storage.objects
  for delete to authenticated using (bucket_id = 'landing-media');

-- Orders placed through the landing page order form.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  package_id text,
  package_name text not null,
  quantity int not null default 1,
  unit_price numeric not null default 0,
  subtotal numeric not null default 0,
  delivery_fee numeric not null default 0,
  total numeric not null default 0,
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  customer_district text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'delivered', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "public create orders" on public.orders;
create policy "public create orders" on public.orders
  for insert to public with check (true);

drop policy if exists "admin read orders" on public.orders;
create policy "admin read orders" on public.orders
  for select to authenticated using (true);

drop policy if exists "admin update orders" on public.orders;
create policy "admin update orders" on public.orders
  for update to authenticated using (true) with check (true);

drop policy if exists "admin delete orders" on public.orders;
create policy "admin delete orders" on public.orders
  for delete to authenticated using (true);

-- Generic key/value store for editable site images and the hero video link.
create table if not exists public.site_media (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_media enable row level security;

drop policy if exists "public read site_media" on public.site_media;
create policy "public read site_media" on public.site_media
  for select using (true);

drop policy if exists "admin write site_media" on public.site_media;
create policy "admin write site_media" on public.site_media
  for all to authenticated using (true) with check (true);
