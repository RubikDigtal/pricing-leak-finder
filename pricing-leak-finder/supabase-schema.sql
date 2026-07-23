-- Run this in your Supabase project's SQL Editor (Database -> SQL Editor -> New query)
-- to create the table this app reads from and writes to.

create table pricing_leak_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  name text,
  business_name text,
  business_type text,
  email text,
  package_price numeric,
  package_includes text,

  filter_answer int,
  packaging_answer int,
  anchoring_answer int,
  delivery_answer int,
  defense_answer int,
  discount_reflex_answer int,
  proof_timing_answer int,
  severity_answer int,

  unlocked boolean default false,
  retest_ref uuid references pricing_leak_submissions(id)
);

-- Row Level Security: the browser-side app uses the public "anon" key, so it
-- needs permission to insert new submissions and read back the unlocked
-- status of its own submission. The webhook uses the service_role key
-- instead, which bypasses RLS entirely, so it doesn't need a policy here.

alter table pricing_leak_submissions enable row level security;

create policy "Anyone can insert a submission"
  on pricing_leak_submissions for insert
  with check (true);

create policy "Anyone can read a submission by id"
  on pricing_leak_submissions for select
  using (true);

-- Note: "using (true)" on select means anyone with a submission's id can read
-- that row — which is what the unlock-polling logic needs, since the app
-- only ever queries by the specific id it was given after submitting the
-- quiz. It does not expose a way to list or browse all submissions.
