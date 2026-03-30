-- =========================================================
-- 0029_publish_demo_content.sql
-- 목적: Draft(초안) 상태로 적재된 데모 데이터들을 Published(발행) 상태로 변경하여,
--       RLS(Row Level Security) 정책을 통과하고 웹페이지에 정상 노출되도록 조치
-- =========================================================

BEGIN;

-- 1. Answers 전체 발행 처리
UPDATE public.answers
SET 
  workflow_status_id = (SELECT id FROM public.workflow_statuses WHERE slug = 'published'),
  published_at = NOW()
WHERE workflow_status_id = (SELECT id FROM public.workflow_statuses WHERE slug = 'draft')
   OR published_at IS NULL;

-- 2. Stories 전체 발행 처리
UPDATE public.stories
SET 
  workflow_status_id = (SELECT id FROM public.workflow_statuses WHERE slug = 'published'),
  published_at = NOW()
WHERE workflow_status_id = (SELECT id FROM public.workflow_statuses WHERE slug = 'draft')
   OR published_at IS NULL;

COMMIT;
