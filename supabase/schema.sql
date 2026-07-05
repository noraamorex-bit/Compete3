-- Compete cloud sync schema.
-- Run this once in the Supabase SQL editor (SQL → New query → paste → Run).

create table if not exists public.competitions (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists competitions_user_idx on public.competitions (user_id);

alter table public.competitions enable row level security;

create policy "select own rows" on public.competitions
  for select using (auth.uid() = user_id);

create policy "insert own rows" on public.competitions
  for insert with check (auth.uid() = user_id);

create policy "update own rows" on public.competitions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "delete own rows" on public.competitions
  for delete using (auth.uid() = user_id);
