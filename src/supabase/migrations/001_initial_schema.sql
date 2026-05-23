-- ============================================================
-- THE CASKET — initial schema
-- Run this in Supabase SQL Editor or via supabase db push
-- ============================================================


-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";


-- ============================================================
-- ENUMS
-- ============================================================
create type bottle_status as enum ('sealed', 'open', 'finished');


-- ============================================================
-- PROFILES
-- Linked 1:1 to auth.users (Supabase managed auth)
-- ============================================================
create table profiles (
  id              uuid primary key default uuid_generate_v4(),
  auth_user_id    uuid not null unique references auth.users(id) on delete cascade,
  username        text not null unique,
  display_name    text,
  avatar_url      text,
  created_at      timestamptz not null default now(),

  constraint username_length check (char_length(username) between 3 and 30),
  constraint username_format check (username ~ '^[a-z0-9_]+$')
);

-- Auto-create a profile row when a user signs up
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  base_username text;
  final_username text;
begin
  base_username := lower(regexp_replace(
    substring(split_part(new.email, '@', 1) from 1 for 24),
    '[^a-z0-9_]', '_', 'g'
  ));
  -- Ensure minimum length of 3
  if char_length(base_username) < 3 then
    base_username := base_username || repeat('_', 3 - char_length(base_username));
  end if;
  final_username := base_username;

  -- On conflict, append a random suffix
  loop
    begin
      insert into profiles (auth_user_id, username, display_name)
      values (
        new.id,
        final_username,
        new.raw_user_meta_data->>'full_name'
      );
      exit; -- success
    exception when unique_violation then
      final_username := substring(base_username from 1 for 24)
        || '_' || substring(gen_random_uuid()::text from 1 for 5);
    end;
  end loop;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();


-- ============================================================
-- WHISKIES
-- Shared catalogue — seeded from dataset, never user-owned
-- ============================================================
create table whiskies (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  distillery   text not null,
  region       text,
  country      text not null,
  style        text,         -- single malt, blended, bourbon, etc.
  age          smallint,     -- null = NAS (no age statement)
  abv          numeric(4,1), -- e.g. 46.0
  description  text,
  image_url    text,
  created_at   timestamptz not null default now(),

  constraint abv_range check (abv between 0 and 100)
);

-- Full-text search index (search by name or distillery)
create index whiskies_fts_idx
  on whiskies
  using gin(to_tsvector('english', name || ' ' || distillery));

-- Fast lookup by distillery and country
create index whiskies_distillery_idx on whiskies (distillery);
create index whiskies_country_idx    on whiskies (country);


-- ============================================================
-- COLLECTION BOTTLES
-- A user's personal inventory — one row per bottle instance
-- ============================================================
create table collection_bottles (
  id           uuid primary key default uuid_generate_v4(),
  profile_id   uuid not null references profiles(id) on delete cascade,
  whisky_id    uuid not null references whiskies(id) on delete restrict,
  status       bottle_status not null default 'sealed',
  quantity     smallint not null default 1,
  notes        text,           -- private freeform notes
  rating       smallint,       -- 1–100, personal overall score
  price_paid   numeric(10,2),  -- optional, in user's local currency
  added_at     timestamptz not null default now(),
  opened_at    timestamptz,
  finished_at  timestamptz,

  constraint quantity_positive check (quantity >= 0),
  constraint rating_range      check (rating between 1 and 100)
);

create index collection_bottles_profile_idx on collection_bottles (profile_id);
create index collection_bottles_status_idx  on collection_bottles (profile_id, status);


-- ============================================================
-- TASTING NOTES
-- Multiple notes per bottle over time
-- ============================================================
create table tasting_notes (
  id           uuid primary key default uuid_generate_v4(),
  bottle_id    uuid not null references collection_bottles(id) on delete cascade,
  profile_id   uuid not null references profiles(id) on delete cascade,
  nose         text,
  palate       text,
  finish       text,
  score        smallint,       -- 1–100 for this specific tasting
  tasted_at    timestamptz not null default now(),

  constraint score_range check (score between 1 and 100)
);

create index tasting_notes_bottle_idx  on tasting_notes (bottle_id);
create index tasting_notes_profile_idx on tasting_notes (profile_id);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Every table is locked down — users only touch their own data
-- ============================================================

-- profiles
alter table profiles enable row level security;

create policy "Users can read their own profile"
  on profiles for select
  using (auth.uid() = auth_user_id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = auth_user_id);

-- whiskies (public read, no user writes — only seed data + admin)
alter table whiskies enable row level security;

create policy "Anyone can read whiskies"
  on whiskies for select
  using (true);

-- collection_bottles
alter table collection_bottles enable row level security;

create policy "Users can read their own bottles"
  on collection_bottles for select
  using (profile_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Users can insert their own bottles"
  on collection_bottles for insert
  with check (profile_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Users can update their own bottles"
  on collection_bottles for update
  using (profile_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Users can delete their own bottles"
  on collection_bottles for delete
  using (profile_id = (select id from profiles where auth_user_id = auth.uid()));

-- tasting_notes
alter table tasting_notes enable row level security;

create policy "Users can read their own tasting notes"
  on tasting_notes for select
  using (profile_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Users can insert their own tasting notes"
  on tasting_notes for insert
  with check (profile_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Users can update their own tasting notes"
  on tasting_notes for update
  using (profile_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Users can delete their own tasting notes"
  on tasting_notes for delete
  using (profile_id = (select id from profiles where auth_user_id = auth.uid()));