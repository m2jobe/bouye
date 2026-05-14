-- Bouye Supabase schema
-- Run this in the Supabase SQL editor for any project that powers bouye.ca
-- Tables required by /api/orders and /api/newsletter

-- ---------------------------------------------------------------------------
-- bouye_newsletter
-- Used by /api/newsletter (POST { email })
-- Upserts on email, so the email column must be unique.
-- ---------------------------------------------------------------------------
create table if not exists public.bouye_newsletter (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- bouye_orders
-- Used by /api/orders. The route inserts every column below.
-- items is a JSON array of { name, quantity, price } objects.
-- ---------------------------------------------------------------------------
create table if not exists public.bouye_orders (
  id                uuid primary key default gen_random_uuid(),
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text not null,
  order_type        text not null default 'pickup',
  delivery_address  text,
  delivery_fee      numeric(10, 2) not null default 0,
  items             jsonb not null,
  subtotal          numeric(10, 2) not null,
  total             numeric(10, 2) not null,
  notes             text,
  status            text not null default 'pending',
  created_at        timestamptz not null default now()
);

create index if not exists bouye_orders_created_at_idx
  on public.bouye_orders (created_at desc);
create index if not exists bouye_orders_status_idx
  on public.bouye_orders (status);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The API routes use the service_role key, which bypasses RLS, so enabling
-- RLS without policies is the safe default. Public reads/writes stay blocked.
-- ---------------------------------------------------------------------------
alter table public.bouye_newsletter enable row level security;
alter table public.bouye_orders     enable row level security;
