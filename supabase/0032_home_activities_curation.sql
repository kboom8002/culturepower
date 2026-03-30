-- =========================================================
-- 0032_home_activities_curation.sql
-- 목적: 홈페이지 섹션 4 "주요 활동 하이라이트"에 들어갈 
--       어드민 큐레이션용 5개의 고정/순환 카드 정보를 담는 테이블
-- =========================================================

begin;

create table if not exists public.home_activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,               -- "문화정책 연구와 공론장 형성" 등
  subtitle text,                     -- 부제목 또는 간략 설명
  image_url text,                    -- 배너/대표 썸네일 이미지 링크
  link_url text,                     -- 클릭 시 이동할 URL (예: /events?series=...)
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS (Row Level Security) 설정
alter table public.home_activities enable row level security;

-- 누구나 읽기 가능
create policy "Enable read access for all users on home_activities"
  on public.home_activities for select
  using (is_active = true);

-- 권한을 가진 관리자만 삽입/수정 가능 (기본 MVP All 허용)
create policy "Enable ALL for authenticated admins on home_activities"
  on public.home_activities for all
  to authenticated
  using (true)
  with check (true);

-- =========================================================
-- 기본 데이터 5건 시드 적재
-- =========================================================
insert into public.home_activities (title, link_url, display_order)
values
  ('문화정책 연구와 공론장 형성', '/answers?topic=cultural-policy-governance', 10),
  ('지역문화대전환 순회토론회', '/events?series=regional-culture-transition', 20),
  ('문화산업·AI·K-푸드·기초예술 토론회', '/events?category=forum-report', 30),
  ('광복 80주년 미술 전시회', '/events', 40),
  ('문화교류 및 네트워크 구축', '/network', 50)
on conflict do nothing;

commit;
