-- 0016_extend_stories_schema.sql
-- TS(코드) 레벨의 Story 인터페이스와 맞지 않는 레거시 DB 테이블(stories)의 구조를 동기화합니다.
-- 누락된 메타데이터 컬럼들을 대거 추가하고, 상태(status) 열의 Enum 제약을 해제합니다.

-- 1. 누락된 컬럼(Metadata & Relations) 추가
ALTER TABLE public.stories 
ADD COLUMN IF NOT EXISTS section VARCHAR(100),
ADD COLUMN IF NOT EXISTS story_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS author_expert_id UUID REFERENCES public.experts(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS reviewer_id UUID,
ADD COLUMN IF NOT EXISTS featured_flag BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image_url TEXT, -- Base64 이미지가 최대 400KB 들어가므로 VARCHAR 대신 TEXT 사용
ADD COLUMN IF NOT EXISTS canonical_slug VARCHAR(255),
ADD COLUMN IF NOT EXISTS related_answers_meta JSONB;

-- 2. Status 컬럼 유연화 (enum -> Varchar)
-- 기존 ENUM 타입이 이미 접근성(RLS) 정책에 묶여있으므로, 의존성 정책을 임시 해제(Drop) 후 컬럼을 변환합니다.
DROP POLICY IF EXISTS "Public can view active stories" ON public.stories;
DROP POLICY IF EXISTS "Public can view active events" ON public.events;

ALTER TABLE public.stories ALTER COLUMN status TYPE VARCHAR(50) USING status::text;
ALTER TABLE public.events ALTER COLUMN status TYPE VARCHAR(50) USING status::text;

-- 3. 의존성 정책 복구
CREATE POLICY "Public can view active stories" ON public.stories FOR SELECT USING (status = 'Public');
CREATE POLICY "Public can view active events" ON public.events FOR SELECT USING (status = 'Public');
