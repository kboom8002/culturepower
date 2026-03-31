-- 0035_added_event_poster.sql
-- 이벤트의 상세 페이지 원본 세로형 포스터를 위한 이미지 식별자 컬럼 확장 추가

BEGIN;

ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS poster_image_asset_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL;

COMMIT;
