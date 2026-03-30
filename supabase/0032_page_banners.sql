-- =========================================================
-- 0032_page_banners.sql
-- 목적: 홈페이지 "주요 활동" 및 각 GNB 메인의 전사적 
--       커스텀 배너/갤러리 큐레이션을 담당하는 통합 스키마 
--       (직접 이미지 첨부 및 텍스트/링크 연동형 뷰어용)
-- =========================================================

begin;

create table if not exists public.page_banners (
  id uuid primary key default gen_random_uuid(),
  page_route text not null,          -- 예: 'home', 'webzine', 'events'
  slot_name text not null,           -- 예: 'main-activities', 'hero-banner'
  
  title text not null,               -- 커스텀 카드 배너의 주 제목
  subtitle text,                     -- 부가 설명 (옵션)
  image_url text,                    -- Supabase Storage 업로드된 이미지 퍼블릭 URL
  link_url text,                     -- 클릭 시 이동할 URL 
  
  display_order int not null default 0,
  is_active boolean not null default true,
  
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS (Row Level Security)
alter table public.page_banners enable row level security;

create policy "Enable read access for all users on page_banners"
  on public.page_banners for select
  using (is_active = true);

-- 권한을 가진 관리자만 삽입/수정 가능 (기본 MVP All 허용)
create policy "Enable ALL for authenticated admins on page_banners"
  on public.page_banners for all
  to authenticated
  using (true)
  with check (true);

-- =========================================================
-- Supabase Storage 신규 버킷: "curation_assets" (이미지 덤프용)
-- =========================================================
insert into storage.buckets (id, name, public) 
values ('curation_assets', 'curation_assets', true)
on conflict (id) do nothing;

create policy "Public Access to curation_assets"
  on storage.objects for select
  using ( bucket_id = 'curation_assets' );

create policy "Admin Insert to curation_assets"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'curation_assets' );

create policy "Admin Update to curation_assets"
  on storage.objects for update
  to authenticated
  using ( bucket_id = 'curation_assets' );

create policy "Admin Delete to curation_assets"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'curation_assets' );

-- =========================================================
-- 기본 데이터 5건 시드 적재 (홈페이지 섹션 4 - 주요 활동)
-- =========================================================
insert into public.page_banners (page_route, slot_name, title, link_url, display_order)
values
  ('home', 'home-activities', '문화정책 연구와 공론장 형성', '/answers?topic=cultural-policy-governance', 10),
  ('home', 'home-activities', '지역문화대전환 순회토론회', '/events?series=regional-culture-transition', 20),
  ('home', 'home-activities', '문화산업·AI·K-푸드·기초예술 토론회', '/events?category=forum-report', 30),
  ('home', 'home-activities', '광복 80주년 미술 전시회', '/events', 40),
  ('home', 'home-activities', '문화교류 및 네트워크 구축', '/network', 50)
on conflict do nothing;

commit;
