-- =========================================================
-- 0031_enhance_events_schema.sql
-- 목적: 문화강국 플랫폼의 행사(Event) 객체를 단순 뷰어에서 
--       메타데이터 허브형 CMS로 고도화 (시리즈, 상태, 연사 세부 프로그램 포함)
--       (event_poster_upload.sql의 데이터 구조와 완벽 동기화)
-- =========================================================

begin;

-- 1) events 테이블 컬럼 확장
alter table public.events
  add column if not exists round_no integer,
  add column if not exists event_status text check (event_status in ('upcoming', 'ongoing', 'ended', 'archived')),
  add column if not exists registration_status text check (registration_status in ('open', 'closed', 'unknown')),
  add column if not exists registration_url text,
  add column if not exists city_name text,
  add column if not exists venue_detail text,
  add column if not exists has_result_assets boolean not null default false;

-- 2) event_series 다대다(N:M) 연결 테이블 신설
create table if not exists public.event_series (
  event_id uuid not null references public.events(id) on delete cascade,
  series_id uuid not null references public.series(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (event_id, series_id)
);

alter table public.event_series enable row level security;
create policy "Enable read access for all users on event_series"
  on public.event_series for select using (true);
create policy "Enable ALL for authenticated admins on event_series"
  on public.event_series for all to authenticated using (true) with check (true);

-- 3) event_program_items 테이블 신설 (상세 세션/연사 패널 렌더링용)
create table if not exists public.event_program_items (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  
  -- MVP 단계 정책: 외래키가 아닌 직관적 텍스트로 역할(Role) 입력 허용 
  -- ('chair', 'presenter', 'panelist', 'keynote', 'moderator' 등)
  segment_type text not null, 
  
  person_name_raw text not null,
  affiliation text,
  presentation_title text,
  note text,
  display_order integer not null default 0,
  
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- event_program_items 권한/RLS (Row Level Security) 설정
alter table public.event_program_items enable row level security;

-- 누구나 조회 가능 (public)
create policy "Enable read access for all users on event_program_items"
  on public.event_program_items for select
  using (true);

-- 관리자(authenticated)은 전체 권한 허용 (MVP)
create policy "Enable ALL for authenticated admins on event_program_items"
  on public.event_program_items for all
  to authenticated
  using (true)
  with check (true);

commit;
