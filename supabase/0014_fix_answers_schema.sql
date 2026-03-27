-- 1. 기존 잘못된 외래키 제약조건 삭제 (topics 테이블 참조 해제)
ALTER TABLE public.answers DROP CONSTRAINT IF EXISTS answers_topic_id_fkey;

-- 2. 이전 버전의 불필요한 Not Null 컬럼 제거
ALTER TABLE public.answers 
  DROP COLUMN IF EXISTS direct_answer CASCADE,
  DROP COLUMN IF EXISTS context CASCADE;

-- 3. v0008 명세서에 맞는 새로운 컬럼들 추가
ALTER TABLE public.answers 
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS content_body TEXT,
  ADD COLUMN IF NOT EXISTS expert_id UUID REFERENCES public.experts(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS author_id UUID;

-- 4. 올바른 content_topics 테이블을 향하는 외래키 제약조건 재설정
ALTER TABLE public.answers
  ADD CONSTRAINT answers_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.content_topics(id) ON DELETE SET NULL;
