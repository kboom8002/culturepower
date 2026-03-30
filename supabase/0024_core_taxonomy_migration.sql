BEGIN;
DROP TABLE IF EXISTS public.workflow_statuses CASCADE;
DROP TABLE IF EXISTS public.sections CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.series CASCADE;
DROP TABLE IF EXISTS public.boundary_types CASCADE;
DROP TABLE IF EXISTS public.people_roles CASCADE;
DROP TABLE IF EXISTS public.media_asset_types CASCADE;
DROP TABLE IF EXISTS public.topics CASCADE;
DROP TABLE IF EXISTS public.tags CASCADE;
DROP TABLE IF EXISTS public.people CASCADE;
DROP TABLE IF EXISTS public.media_assets CASCADE;
DROP TABLE IF EXISTS public.stories CASCADE;
DROP TABLE IF EXISTS public.answers CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.briefs CASCADE;
DROP TABLE IF EXISTS public.pages CASCADE;
DROP TABLE IF EXISTS public.story_topics CASCADE;
DROP TABLE IF EXISTS public.answer_topics CASCADE;
DROP TABLE IF EXISTS public.event_topics CASCADE;
DROP TABLE IF EXISTS public.brief_topics CASCADE;
DROP TABLE IF EXISTS public.story_tags CASCADE;
DROP TABLE IF EXISTS public.answer_tags CASCADE;
DROP TABLE IF EXISTS public.event_tags CASCADE;
DROP TABLE IF EXISTS public.brief_tags CASCADE;
DROP TABLE IF EXISTS public.content_people CASCADE;
DROP TABLE IF EXISTS public.content_media_assets CASCADE;
DROP TABLE IF EXISTS public.content_related_links CASCADE;
DROP TABLE IF EXISTS public.content_reviews CASCADE;
DROP TABLE IF EXISTS public.change_logs CASCADE;
DROP TABLE IF EXISTS public.correction_requests CASCADE;
DROP TABLE IF EXISTS public.content_topics CASCADE;
COMMIT;

-- =========================================================
-- 문화강국 AI홈페이지 / 문강 Media SSoT
-- Supabase SQL migration v1
-- Scope:
-- 1) Core Taxonomy
-- 2) Core Content Objects
-- 3) Core Relation Layer
-- 4) Minimal Trust / Workflow Layer
-- 5) Minimal public-read RLS for published content
-- =========================================================

begin;

-- ---------------------------------------------------------
-- 0. Extensions
-- ---------------------------------------------------------
create extension if not exists pgcrypto;

-- ---------------------------------------------------------
-- 1. Utility functions
-- ---------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------
-- 2. Core Taxonomy Tables
-- ---------------------------------------------------------

create table if not exists public.workflow_statuses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  name_en text,
  description text,
  sort_order int not null default 0,
  status text not null default 'active' check (status in ('active', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description text,
  status text not null default 'active' check (status in ('active', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.series (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description text,
  sort_order int not null default 0,
  status text not null default 'active' check (status in ('active', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.boundary_types (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.people_roles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_asset_types (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  name_en text,
  parent_topic_id uuid null references public.topics(id) on delete set null,
  level int not null default 1 check (level between 1 and 3),
  description text,
  editorial_scope text,
  sample_questions jsonb not null default '[]'::jsonb,
  preferred_sections jsonb not null default '[]'::jsonb,
  status text not null default 'active' check (status in ('active', 'deprecated')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description text,
  parent_topic_id uuid null references public.topics(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- 3. Core Entity Tables
-- ---------------------------------------------------------

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  name_en text,
  headline text,
  bio_short text,
  bio_long text,
  status text not null default 'active' check (status in ('active', 'inactive', 'archived')),
  profile_image_asset_id uuid,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text,
  public_url text,
  asset_type_id uuid not null references public.media_asset_types(id) on delete restrict,
  title text,
  alt_text text,
  caption text,
  width int,
  height int,
  mime_type text,
  credit_text text,
  is_public boolean not null default true,
  status text not null default 'active' check (status in ('active', 'inactive', 'archived')),
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.people
  add constraint people_profile_image_asset_fk
  foreign key (profile_image_asset_id)
  references public.media_assets(id)
  on delete set null;

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  standfirst text,
  summary text,
  body_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  body_text text,
  section_id uuid references public.sections(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  primary_topic_id uuid references public.topics(id) on delete set null,
  primary_series_id uuid references public.series(id) on delete set null,
  featured_image_asset_id uuid references public.media_assets(id) on delete set null,
  author_display_name text,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image_asset_id uuid references public.media_assets(id) on delete set null,
  allow_indexing boolean not null default true,
  include_in_llm boolean not null default true,
  boundary_type_id uuid references public.boundary_types(id) on delete set null,
  workflow_status_id uuid references public.workflow_statuses(id) on delete restrict,
  published_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  answer_short text,
  answer_long text,
  body_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  body_text text,
  primary_topic_id uuid references public.topics(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  boundary_type_id uuid references public.boundary_types(id) on delete set null,
  workflow_status_id uuid references public.workflow_statuses(id) on delete restrict,
  faq_jsonld jsonb,
  published_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  summary text,
  body_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  body_text text,
  start_at timestamptz,
  end_at timestamptz,
  location_name text,
  host_org text,
  event_date_label text,
  featured_image_asset_id uuid references public.media_assets(id) on delete set null,
  primary_topic_id uuid references public.topics(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  boundary_type_id uuid references public.boundary_types(id) on delete set null,
  workflow_status_id uuid references public.workflow_statuses(id) on delete restrict,
  published_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  core_question text,
  one_line_answer text,
  top_points jsonb not null default '[]'::jsonb,
  body_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  body_text text,
  pdf_asset_id uuid references public.media_assets(id) on delete set null,
  featured_image_asset_id uuid references public.media_assets(id) on delete set null,
  primary_topic_id uuid references public.topics(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  boundary_type_id uuid references public.boundary_types(id) on delete set null,
  workflow_status_id uuid references public.workflow_statuses(id) on delete restrict,
  published_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  body_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  body_text text,
  boundary_type_id uuid references public.boundary_types(id) on delete set null,
  workflow_status_id uuid references public.workflow_statuses(id) on delete restrict,
  published_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- 4. Relation Tables
-- ---------------------------------------------------------

create table if not exists public.story_topics (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (story_id, topic_id)
);

create table if not exists public.answer_topics (
  id uuid primary key default gen_random_uuid(),
  answer_id uuid not null references public.answers(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (answer_id, topic_id)
);

create table if not exists public.event_topics (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (event_id, topic_id)
);

create table if not exists public.brief_topics (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid not null references public.briefs(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (brief_id, topic_id)
);

create table if not exists public.story_tags (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (story_id, tag_id)
);

create table if not exists public.answer_tags (
  id uuid primary key default gen_random_uuid(),
  answer_id uuid not null references public.answers(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (answer_id, tag_id)
);

create table if not exists public.event_tags (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (event_id, tag_id)
);

create table if not exists public.brief_tags (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid not null references public.briefs(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (brief_id, tag_id)
);

create table if not exists public.content_people (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('story','answer','event','brief','page')),
  content_id uuid not null,
  person_id uuid not null references public.people(id) on delete cascade,
  role_id uuid not null references public.people_roles(id) on delete restrict,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.content_media_assets (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('story','answer','event','brief','page')),
  content_id uuid not null,
  media_asset_id uuid not null references public.media_assets(id) on delete cascade,
  asset_type_id uuid not null references public.media_asset_types(id) on delete restrict,
  placement_key text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.content_related_links (
  id uuid primary key default gen_random_uuid(),
  source_content_type text not null check (source_content_type in ('story','answer','event','brief','page')),
  source_content_id uuid not null,
  target_content_type text not null check (target_content_type in ('story','answer','event','brief','page')),
  target_content_id uuid not null,
  relation_type text not null check (
    relation_type in (
      'related-answer',
      'related-story',
      'related-event',
      'related-brief',
      'further-reading'
    )
  ),
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- 5. Minimal Trust / Workflow Tables
-- ---------------------------------------------------------

create table if not exists public.content_reviews (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('story','answer','event','brief','page')),
  content_id uuid not null,
  reviewer_person_id uuid not null references public.people(id) on delete restrict,
  review_status text not null check (review_status in ('pending', 'approved', 'changes-requested')),
  review_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.change_logs (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('story','answer','event','brief','page')),
  content_id uuid not null,
  change_summary text not null,
  change_reason text,
  changed_by uuid,
  changed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.correction_requests (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('story','answer','event','brief','page')),
  content_id uuid not null,
  requester_name text,
  requester_email text,
  request_note text not null,
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'resolved', 'dismissed')),
  submitted_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- ---------------------------------------------------------
-- 6. Indexes
-- ---------------------------------------------------------

create index if not exists idx_topics_parent_topic_id on public.topics(parent_topic_id);
create index if not exists idx_tags_parent_topic_id on public.tags(parent_topic_id);

create index if not exists idx_stories_section_id on public.stories(section_id);
create index if not exists idx_stories_category_id on public.stories(category_id);
create index if not exists idx_stories_primary_topic_id on public.stories(primary_topic_id);
create index if not exists idx_stories_workflow_status_id on public.stories(workflow_status_id);
create index if not exists idx_stories_published_at on public.stories(published_at desc);

create index if not exists idx_answers_primary_topic_id on public.answers(primary_topic_id);
create index if not exists idx_answers_category_id on public.answers(category_id);
create index if not exists idx_answers_workflow_status_id on public.answers(workflow_status_id);
create index if not exists idx_answers_published_at on public.answers(published_at desc);

create index if not exists idx_events_primary_topic_id on public.events(primary_topic_id);
create index if not exists idx_events_category_id on public.events(category_id);
create index if not exists idx_events_workflow_status_id on public.events(workflow_status_id);
create index if not exists idx_events_published_at on public.events(published_at desc);

create index if not exists idx_briefs_primary_topic_id on public.briefs(primary_topic_id);
create index if not exists idx_briefs_category_id on public.briefs(category_id);
create index if not exists idx_briefs_workflow_status_id on public.briefs(workflow_status_id);
create index if not exists idx_briefs_published_at on public.briefs(published_at desc);

create index if not exists idx_story_topics_story_id on public.story_topics(story_id);
create index if not exists idx_story_topics_topic_id on public.story_topics(topic_id);

create index if not exists idx_answer_topics_answer_id on public.answer_topics(answer_id);
create index if not exists idx_answer_topics_topic_id on public.answer_topics(topic_id);

create index if not exists idx_event_topics_event_id on public.event_topics(event_id);
create index if not exists idx_event_topics_topic_id on public.event_topics(topic_id);

create index if not exists idx_brief_topics_brief_id on public.brief_topics(brief_id);
create index if not exists idx_brief_topics_topic_id on public.brief_topics(topic_id);

create index if not exists idx_story_tags_story_id on public.story_tags(story_id);
create index if not exists idx_story_tags_tag_id on public.story_tags(tag_id);

create index if not exists idx_answer_tags_answer_id on public.answer_tags(answer_id);
create index if not exists idx_answer_tags_tag_id on public.answer_tags(tag_id);

create index if not exists idx_event_tags_event_id on public.event_tags(event_id);
create index if not exists idx_event_tags_tag_id on public.event_tags(tag_id);

create index if not exists idx_brief_tags_brief_id on public.brief_tags(brief_id);
create index if not exists idx_brief_tags_tag_id on public.brief_tags(tag_id);

create index if not exists idx_content_people_content on public.content_people(content_type, content_id);
create index if not exists idx_content_media_assets_content on public.content_media_assets(content_type, content_id);
create index if not exists idx_content_related_links_source on public.content_related_links(source_content_type, source_content_id);
create index if not exists idx_content_reviews_content on public.content_reviews(content_type, content_id);
create index if not exists idx_change_logs_content on public.change_logs(content_type, content_id);
create index if not exists idx_correction_requests_content on public.correction_requests(content_type, content_id);

-- ---------------------------------------------------------
-- 7. Updated_at triggers
-- ---------------------------------------------------------

create trigger trg_workflow_statuses_updated_at
before update on public.workflow_statuses
for each row execute function public.touch_updated_at();

create trigger trg_sections_updated_at
before update on public.sections
for each row execute function public.touch_updated_at();

create trigger trg_categories_updated_at
before update on public.categories
for each row execute function public.touch_updated_at();

create trigger trg_series_updated_at
before update on public.series
for each row execute function public.touch_updated_at();

create trigger trg_boundary_types_updated_at
before update on public.boundary_types
for each row execute function public.touch_updated_at();

create trigger trg_people_roles_updated_at
before update on public.people_roles
for each row execute function public.touch_updated_at();

create trigger trg_media_asset_types_updated_at
before update on public.media_asset_types
for each row execute function public.touch_updated_at();

create trigger trg_topics_updated_at
before update on public.topics
for each row execute function public.touch_updated_at();

create trigger trg_tags_updated_at
before update on public.tags
for each row execute function public.touch_updated_at();

create trigger trg_people_updated_at
before update on public.people
for each row execute function public.touch_updated_at();

create trigger trg_media_assets_updated_at
before update on public.media_assets
for each row execute function public.touch_updated_at();

create trigger trg_stories_updated_at
before update on public.stories
for each row execute function public.touch_updated_at();

create trigger trg_answers_updated_at
before update on public.answers
for each row execute function public.touch_updated_at();

create trigger trg_events_updated_at
before update on public.events
for each row execute function public.touch_updated_at();

create trigger trg_briefs_updated_at
before update on public.briefs
for each row execute function public.touch_updated_at();

create trigger trg_pages_updated_at
before update on public.pages
for each row execute function public.touch_updated_at();

create trigger trg_content_reviews_updated_at
before update on public.content_reviews
for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------
-- 8. Seed: workflow statuses
-- ---------------------------------------------------------

insert into public.workflow_statuses (slug, name_ko, description, sort_order)
values
  ('draft', '초안', '작성 중 상태', 10),
  ('in-review', '검토 중', '편집/검수 중 상태', 20),
  ('approved', '승인 완료', '발행 준비 완료 상태', 30),
  ('scheduled', '발행 예정', '예약 발행 상태', 40),
  ('published', '발행', '공개 발행 상태', 50),
  ('archived', '보관', '보관 상태', 60),
  ('needs-update', '업데이트 필요', '수정/보강 필요 상태', 70),
  ('rejected', '반려', '반려 상태', 80)
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 9. Seed: sections
-- ---------------------------------------------------------

insert into public.sections (slug, name_ko, name_en, description, sort_order, status)
values
  ('policy-insight', 'Policy Insight', 'Policy Insight', '정책 해설·제안 섹션', 10, 'active'),
  ('culture-power-report', 'Culture Power Report', 'Culture Power Report', '포럼/행사/정책 리포트 섹션', 20, 'active'),
  ('local-as-culture', '지역이 문화가 되다', 'Local as Culture', '지역 사례와 문화자치 섹션', 30, 'active'),
  ('culture-people', 'Culture People', 'Culture People', '인터뷰·대담 섹션', 40, 'active'),
  ('global-and-trend', 'Global & Trend', 'Global & Trend', '국제 비교·트렌드 섹션', 50, 'active'),
  ('funding-calendar', '지원사업 캘린더', 'Funding Calendar', '지원사업/기회 정보 섹션', 60, 'active'),
  ('data-lab', 'Data Lab', 'Data Lab', '데이터·지표 허브', 70, 'active')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 10. Seed: categories
-- ---------------------------------------------------------

insert into public.categories (slug, name_ko, description, status)
values
  ('analysis', '해설/분석', '해설형 분석 기사', 'active'),
  ('policy-insight', '정책 제안형 해설', '정책 제안 중심의 해설', 'active'),
  ('interview', '인터뷰', '인터뷰 기사', 'active'),
  ('special-dialogue', '대담', '대담형 콘텐츠', 'active'),
  ('forum-report', '포럼/간담회 리포트', '행사 요약·리포트', 'active'),
  ('case-study', '사례 분석', '사례 중심 분석 콘텐츠', 'active'),
  ('trend-brief', '트렌드 브리핑', '짧은 트렌드 브리프', 'active'),
  ('archive', '기록/아카이브', '기록 목적 콘텐츠', 'active'),
  ('explainer', '개념 설명', '설명형 콘텐츠', 'active'),
  ('faq', '직답형 FAQ', '질문-직답형 정답카드', 'active'),
  ('guide', '실무 가이드', '실무 활용 가이드', 'active')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 11. Seed: series
-- ---------------------------------------------------------

insert into public.series (slug, name_ko, description, sort_order, status)
values
  ('culture-people-dialogue', '컬쳐 피플 대담', 'Culture People 대담 시리즈', 10, 'active'),
  ('k-civilization-debate', 'K-문명 논의', 'K-문명 논의 시리즈', 20, 'active'),
  ('regional-culture-transition', '지역문화대전환', '지역문화대전환 연속 기획', 30, 'active'),
  ('policy-forum-series', '정책 포럼 시리즈', '정책 포럼/간담회 연속 기획', 40, 'active')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 12. Seed: boundary types
-- ---------------------------------------------------------

insert into public.boundary_types (slug, name_ko, description)
values
  ('official-description', '협회 공식 설명', '협회 공식 소개/설명'),
  ('editorial-analysis', '편집 해설', '편집부 해설/분석'),
  ('policy-interpretation', '정책 해석', '정책 해석 및 제안'),
  ('event-record', '행사 기록', '행사/토론회 기록'),
  ('interview', '인터뷰', '인터뷰 콘텐츠'),
  ('dialogue', '대담', '대담형 콘텐츠'),
  ('data-brief', '데이터 브리프', '데이터 중심 브리프'),
  ('guide', '안내/가이드', '이용 안내 또는 가이드')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 13. Seed: people roles
-- ---------------------------------------------------------

insert into public.people_roles (slug, name_ko, description)
values
  ('author', '필자', '글 작성자'),
  ('editor', '편집자', '편집 책임자'),
  ('reviewer', '검수자', '검수 책임자'),
  ('interviewer', '인터뷰어', '인터뷰 진행자'),
  ('guest', '게스트', '대담/인터뷰 게스트'),
  ('moderator', '진행자', '행사 진행자'),
  ('translator', '번역자', '번역자'),
  ('photographer', '사진', '사진/촬영 기여자')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 14. Seed: media asset types
-- ---------------------------------------------------------

insert into public.media_asset_types (slug, name_ko, description)
values
  ('featured-image', '대표 이미지', '대표/썸네일 이미지'),
  ('inline-image', '삽입 이미지', '본문 삽입 이미지'),
  ('portrait', '인물 이미지', '인물 프로필 이미지'),
  ('event-photo', '행사 사진', '행사 사진'),
  ('chart-image', '차트 이미지', '차트/인포그래픽'),
  ('video-thumbnail', '영상 썸네일', '영상 대표 이미지'),
  ('document-cover', '문서 표지', '문서/PDF 표지'),
  ('social-share-image', '공유 이미지', 'OG/SNS 공유용 이미지')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 15. Seed: topics
-- ---------------------------------------------------------

insert into public.topics (
  slug, name_ko, name_en, level, description, editorial_scope, sample_questions, preferred_sections, status, sort_order
)
values
  (
    'cultural-power-strategy',
    '문화강국 전략',
    'Cultural Power Strategy',
    1,
    '문화강국의 정의, 국가 문화전략, 문화의 국가적 역할과 장기 비전을 다루는 최상위 주제축',
    '문화강국 개념, 국가 전략, 문화와 국가 시스템',
    '["문화강국이란 무엇인가?", "문화강국은 왜 국가 전략의 문제인가?", "문화의 힘은 어떻게 국가 경쟁력과 연결되는가?"]'::jsonb,
    '["policy-insight", "global-and-trend"]'::jsonb,
    'active',
    10
  ),
  (
    'cultural-policy-governance',
    '문화정책·거버넌스',
    'Cultural Policy & Governance',
    1,
    '문화정책 실행, 거버넌스, 재정, 분권, 제도 개편, 입법 지원을 다루는 주제축',
    '정책 구조, 재정, 분권, 입법, 공론장',
    '["문화정책 구조개혁은 왜 필요한가?", "문화재정의 분권과 자율성은 어떻게 설계해야 하는가?", "문화정책 공론장은 왜 중요한가?"]'::jsonb,
    '["policy-insight", "culture-power-report"]'::jsonb,
    'active',
    20
  ),
  (
    'local-culture-autonomy',
    '지역문화·문화자치',
    'Local Culture & Autonomy',
    1,
    '지역 기반 문화 생태계, 문화자치, 생활문화, 지역 실험과 지역문화 정책화를 다루는 주제축',
    '지역문화 생태계, 문화자치, 지역 사례',
    '["지역문화 생태계는 왜 중요한가?", "문화자치는 어떻게 작동해야 하는가?", "지역 사례는 어떻게 정책 자산이 되는가?"]'::jsonb,
    '["local-as-culture", "culture-power-report"]'::jsonb,
    'active',
    30
  ),
  (
    'cultural-industry-tech-transition',
    '문화산업·기술 전환',
    'Cultural Industry & Tech Transition',
    1,
    'AI, 플랫폼, K-콘텐츠, 기술 표준, 산업 구조, 디지털 전환을 다루는 주제축',
    'AI와 문화산업, 플랫폼, 기술 표준',
    '["AI는 문화산업의 구조를 어떻게 바꾸는가?", "K-컬처의 확장은 기술과 어떻게 연결되는가?", "플랫폼과 표준은 왜 중요한가?"]'::jsonb,
    '["global-and-trend", "policy-insight"]'::jsonb,
    'active',
    40
  ),
  (
    'people-field-artists',
    '사람·현장·예술가',
    'People, Field & Artists',
    1,
    '예술가, 기획자, 실무자, 현장 활동가, 인터뷰와 대담을 다루는 주제축',
    '인터뷰, 대담, 현장 증언',
    '["현장 실무자는 지금 무엇을 문제로 느끼는가?", "예술가와 기획자의 조건은 어떻게 바뀌고 있는가?", "사람의 목소리는 정책에 어떤 통찰을 주는가?"]'::jsonb,
    '["culture-people"]'::jsonb,
    'active',
    50
  ),
  (
    'global-comparison-exchange',
    '글로벌·비교·교류',
    'Global, Comparison & Exchange',
    1,
    '해외 사례, 국제 비교, 문화교류 네트워크, 글로벌 흐름과 한국의 위치를 다루는 주제축',
    '국제 비교, 해외 사례, 문화교류',
    '["해외 문화정책은 어떻게 움직이는가?", "한국은 세계 속에서 어떤 위치에 있는가?", "국제 비교는 국내 정책에 무엇을 주는가?"]'::jsonb,
    '["global-and-trend"]'::jsonb,
    'active',
    60
  ),
  (
    'practical-tools-opportunities',
    '실무도구·기회',
    'Practical Tools & Opportunities',
    1,
    'One-Pager, Data Lab, 지원사업, 실무형 브리프와 기회 정보를 다루는 주제축',
    '브리프, 데이터, 지원사업, 실무 도구',
    '["지금 참고할 원페이지 브리프는 무엇인가?", "어떤 지원사업이 열려 있는가?", "실무자는 어떤 데이터를 바로 활용할 수 있는가?"]'::jsonb,
    '["funding-calendar", "data-lab"]'::jsonb,
    'active',
    70
  ),
  (
    'k-civilization-cultural-philosophy',
    'K-문명·문화철학',
    'K-Civilization & Cultural Philosophy',
    1,
    'K-문명, 한국성, 인정투쟁, 철학적 민주주의, 혼종성, 문화의 뿌리와 구조를 다루는 주제축',
    'K-문명, 한국성, 인정, 철학적 해석',
    '["K-문명이란 무엇인가?", "한국성은 무엇으로 설명될 수 있는가?", "문화강국의 성취를 지탱할 뿌리는 무엇인가?"]'::jsonb,
    '["policy-insight", "culture-people", "global-and-trend"]'::jsonb,
    'active',
    80
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 16. Seed: tags
-- ---------------------------------------------------------

insert into public.tags (slug, name_ko, description, status)
values
  ('k-culture', 'K-컬처', 'K-컬처 관련 태그', 'active'),
  ('k-civilization', 'K-문명', 'K-문명 관련 태그', 'active'),
  ('recognition-struggle', '인정투쟁', '인정/리스펙트 관련 태그', 'active'),
  ('korean-identity', '한국성', '한국성 관련 태그', 'active'),
  ('artist-welfare', '예술인 복지', '예술인 복지 관련 태그', 'active'),
  ('ai-and-culture', 'AI와 문화산업', 'AI와 문화산업 관련 태그', 'active'),
  ('cultural-autonomy', '문화자치', '문화자치 관련 태그', 'active'),
  ('policy-design', '정책 설계', '정책 설계 관련 태그', 'active'),
  ('special-dialogue', '특별 대담', '대담 특집 태그', 'active')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 17. RLS
-- ---------------------------------------------------------

alter table public.workflow_statuses enable row level security;
alter table public.sections enable row level security;
alter table public.categories enable row level security;
alter table public.series enable row level security;
alter table public.boundary_types enable row level security;
alter table public.people_roles enable row level security;
alter table public.media_asset_types enable row level security;
alter table public.topics enable row level security;
alter table public.tags enable row level security;
alter table public.people enable row level security;
alter table public.media_assets enable row level security;
alter table public.stories enable row level security;
alter table public.answers enable row level security;
alter table public.events enable row level security;
alter table public.briefs enable row level security;
alter table public.pages enable row level security;

-- public read for reference vocab tables
create policy "public can read workflow_statuses"
on public.workflow_statuses for select
to anon, authenticated
using (true);

create policy "public can read sections"
on public.sections for select
to anon, authenticated
using (true);

create policy "public can read categories"
on public.categories for select
to anon, authenticated
using (true);

create policy "public can read series"
on public.series for select
to anon, authenticated
using (true);

create policy "public can read boundary_types"
on public.boundary_types for select
to anon, authenticated
using (true);

create policy "public can read people_roles"
on public.people_roles for select
to anon, authenticated
using (true);

create policy "public can read media_asset_types"
on public.media_asset_types for select
to anon, authenticated
using (true);

create policy "public can read topics"
on public.topics for select
to anon, authenticated
using (status = 'active');

create policy "public can read tags"
on public.tags for select
to anon, authenticated
using (status = 'active');

create policy "public can read active people"
on public.people for select
to anon, authenticated
using (status = 'active');

create policy "public can read public active assets"
on public.media_assets for select
to anon, authenticated
using (is_public = true and status = 'active');

-- public read for published content
create policy "public can read published stories"
on public.stories for select
to anon, authenticated
using (
  workflow_status_id = (
    select id from public.workflow_statuses where slug = 'published'
  )
);

create policy "public can read published answers"
on public.answers for select
to anon, authenticated
using (
  workflow_status_id = (
    select id from public.workflow_statuses where slug = 'published'
  )
);

create policy "public can read published events"
on public.events for select
to anon, authenticated
using (
  workflow_status_id = (
    select id from public.workflow_statuses where slug = 'published'
  )
);

create policy "public can read published briefs"
on public.briefs for select
to anon, authenticated
using (
  workflow_status_id = (
    select id from public.workflow_statuses where slug = 'published'
  )
);

create policy "public can read published pages"
on public.pages for select
to anon, authenticated
using (
  workflow_status_id = (
    select id from public.workflow_statuses where slug = 'published'
  )
);

commit;