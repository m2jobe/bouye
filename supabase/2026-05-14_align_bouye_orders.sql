-- Bring prod bouye_orders in line with what /api/orders inserts.
-- Diff vs current prod table:
--   + order_type        (text, default 'pickup')
--   + delivery_address  (text, nullable)
--   + delivery_fee      (numeric(10,2), default 0)
--   + subtotal          (numeric(10,2))
-- Safe to re-run.

alter table public.bouye_orders
  add column if not exists order_type       text           not null default 'pickup',
  add column if not exists delivery_address text,
  add column if not exists delivery_fee     numeric(10, 2) not null default 0,
  add column if not exists subtotal         numeric(10, 2);

-- Force PostgREST to reload its schema cache so the new columns are
-- visible immediately instead of after the periodic refresh.
notify pgrst, 'reload schema';
