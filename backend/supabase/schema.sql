create extension if not exists pgcrypto;

drop table if exists bookings cascade;
drop table if exists rfps cascade;
drop table if exists venues cascade;
drop table if exists app_users cascade;

create table app_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  role text not null default 'user'
    check (role in ('user', 'admin', 'exhibitor', 'event_planner')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  capacity integer not null check (capacity > 0),
  description text not null,
  amenities text[] not null default '{}',
  images text[] not null default '{}',
  price_per_day numeric(12, 2) not null check (price_per_day >= 0),
  status text not null default 'available'
    check (status in ('available', 'maintenance')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  venue_id uuid not null references venues(id) on delete restrict,
  event_name text not null,
  event_type text not null,
  expected_guests integer not null check (expected_guests > 0),
  start_date date not null,
  end_date date not null,
  catering boolean not null default false,
  av_support boolean not null default false,
  security boolean not null default false,
  total_amount numeric(12, 2) not null check (total_amount >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table rfps (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  attendee_count integer not null check (attendee_count > 0),
  preferred_dates text not null,
  budget_range text not null,
  requirements text,
  status text not null default 'submitted'
    check (status in ('submitted', 'reviewing', 'proposal_sent', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_app_users_updated_at
before update on app_users
for each row execute function set_updated_at();

create trigger set_venues_updated_at
before update on venues
for each row execute function set_updated_at();

create trigger set_bookings_updated_at
before update on bookings
for each row execute function set_updated_at();

create trigger set_rfps_updated_at
before update on rfps
for each row execute function set_updated_at();

alter table app_users enable row level security;
alter table venues enable row level security;
alter table bookings enable row level security;
alter table rfps enable row level security;
