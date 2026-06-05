create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.care_spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  public_read boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.care_members (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.care_spaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  unique (space_id, user_id)
);

create table if not exists public.access_requests (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.care_spaces(id) on delete cascade,
  requester_id uuid not null references auth.users(id) on delete cascade,
  requested_role text not null default 'viewer' check (requested_role in ('editor', 'viewer')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  message text,
  decided_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  unique (space_id, requester_id, status)
);

create table if not exists public.medicines (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.care_spaces(id) on delete cascade,
  name text not null,
  dose text not null,
  days integer not null check (days between 1 and 365),
  times text[] not null,
  note text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.dose_logs (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.care_spaces(id) on delete cascade,
  medicine_id uuid not null references public.medicines(id) on delete cascade,
  dose_date date not null,
  dose_time text not null,
  taken_by uuid references auth.users(id) on delete set null,
  taken_at timestamptz not null default now(),
  unique (medicine_id, dose_date, dose_time)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do update
  set email = excluded.email,
      display_name = coalesce(public.profiles.display_name, excluded.display_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_space_member(target_space uuid, allowed_roles text[] default array['owner','admin','editor','viewer'])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.care_members cm
    where cm.space_id = target_space
      and cm.user_id = auth.uid()
      and cm.role = any(allowed_roles)
  );
$$;

create or replace function public.can_read_space(target_space uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.care_spaces cs
    where cs.id = target_space
      and (cs.public_read or public.is_space_member(target_space))
  );
$$;

create or replace function public.ensure_default_space()
returns public.care_spaces
language plpgsql
security definer
set search_path = public
as $$
declare
  existing public.care_spaces;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select cs.*
  into existing
  from public.care_spaces cs
  join public.care_members cm on cm.space_id = cs.id
  where cm.user_id = auth.uid()
  order by cs.created_at asc
  limit 1;

  if existing.id is not null then
    return existing;
  end if;

  insert into public.care_spaces (name, owner_id, public_read)
  values ('Solar + Nguyet Care Space', auth.uid(), true)
  returning * into existing;

  insert into public.care_members (space_id, user_id, role)
  values (existing.id, auth.uid(), 'owner')
  on conflict (space_id, user_id) do nothing;

  return existing;
end;
$$;

alter table public.profiles enable row level security;
alter table public.care_spaces enable row level security;
alter table public.care_members enable row level security;
alter table public.access_requests enable row level security;
alter table public.medicines enable row level security;
alter table public.dose_logs enable row level security;

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
on public.profiles for select
to authenticated
using (true);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "care_spaces_select_public_or_member" on public.care_spaces;
create policy "care_spaces_select_public_or_member"
on public.care_spaces for select
to anon, authenticated
using (public_read or public.is_space_member(id));

drop policy if exists "care_spaces_insert_owner" on public.care_spaces;
create policy "care_spaces_insert_owner"
on public.care_spaces for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "care_spaces_update_admin" on public.care_spaces;
create policy "care_spaces_update_admin"
on public.care_spaces for update
to authenticated
using (public.is_space_member(id, array['owner','admin']))
with check (public.is_space_member(id, array['owner','admin']));

drop policy if exists "care_spaces_delete_owner" on public.care_spaces;
create policy "care_spaces_delete_owner"
on public.care_spaces for delete
to authenticated
using (owner_id = auth.uid());

drop policy if exists "care_members_select_readable" on public.care_members;
create policy "care_members_select_readable"
on public.care_members for select
to anon, authenticated
using (public.can_read_space(space_id));

drop policy if exists "care_members_insert_admin" on public.care_members;
create policy "care_members_insert_admin"
on public.care_members for insert
to authenticated
with check (public.is_space_member(space_id, array['owner','admin']));

drop policy if exists "care_members_update_admin" on public.care_members;
create policy "care_members_update_admin"
on public.care_members for update
to authenticated
using (public.is_space_member(space_id, array['owner','admin']))
with check (public.is_space_member(space_id, array['owner','admin']));

drop policy if exists "care_members_delete_admin" on public.care_members;
create policy "care_members_delete_admin"
on public.care_members for delete
to authenticated
using (public.is_space_member(space_id, array['owner','admin']));

drop policy if exists "access_requests_select_related" on public.access_requests;
create policy "access_requests_select_related"
on public.access_requests for select
to authenticated
using (requester_id = auth.uid() or public.is_space_member(space_id, array['owner','admin']));

drop policy if exists "access_requests_insert_self" on public.access_requests;
create policy "access_requests_insert_self"
on public.access_requests for insert
to authenticated
with check (requester_id = auth.uid());

drop policy if exists "access_requests_update_admin" on public.access_requests;
create policy "access_requests_update_admin"
on public.access_requests for update
to authenticated
using (public.is_space_member(space_id, array['owner','admin']))
with check (public.is_space_member(space_id, array['owner','admin']));

drop policy if exists "medicines_select_readable" on public.medicines;
create policy "medicines_select_readable"
on public.medicines for select
to anon, authenticated
using (public.can_read_space(space_id));

drop policy if exists "medicines_insert_editor" on public.medicines;
create policy "medicines_insert_editor"
on public.medicines for insert
to authenticated
with check (public.is_space_member(space_id, array['owner','admin','editor']));

drop policy if exists "medicines_update_editor" on public.medicines;
create policy "medicines_update_editor"
on public.medicines for update
to authenticated
using (public.is_space_member(space_id, array['owner','admin','editor']))
with check (public.is_space_member(space_id, array['owner','admin','editor']));

drop policy if exists "medicines_delete_editor" on public.medicines;
create policy "medicines_delete_editor"
on public.medicines for delete
to authenticated
using (public.is_space_member(space_id, array['owner','admin','editor']));

drop policy if exists "dose_logs_select_readable" on public.dose_logs;
create policy "dose_logs_select_readable"
on public.dose_logs for select
to anon, authenticated
using (public.can_read_space(space_id));

drop policy if exists "dose_logs_insert_editor" on public.dose_logs;
create policy "dose_logs_insert_editor"
on public.dose_logs for insert
to authenticated
with check (public.is_space_member(space_id, array['owner','admin','editor']));

drop policy if exists "dose_logs_delete_editor" on public.dose_logs;
create policy "dose_logs_delete_editor"
on public.dose_logs for delete
to authenticated
using (public.is_space_member(space_id, array['owner','admin','editor']));

create index if not exists medicines_space_id_idx on public.medicines(space_id);
create index if not exists dose_logs_space_date_idx on public.dose_logs(space_id, dose_date);
create index if not exists care_members_user_id_idx on public.care_members(user_id);
create index if not exists access_requests_space_status_idx on public.access_requests(space_id, status);
