-- 0022_fix_enum_constraints.sql
-- Answers 및 Events, 기타 아카이브 테이블들의 status 컬럼이 과거에 정의된 content_status ENUM 타입을 
-- 계속 참조하고 있어서 "Scheduled" 등의 새 상태값을 넣거나 조회할 때 22P02 에러(invalid input)가 
-- 발생하는 치명적 버그를 해결합니다. Stories 테이블과 동일하게 VARCHAR(50)으로 유연하게 해제합니다.

-- 1. 기존에 status 컬럼에 의존하던 조회 정책(Policy)들을 임시로 삭제합니다.
-- PostgreSQL에서는 컬럼 타입 변경 시 해당 컬럼을 참조하는 뷰나 정책이 있으면 "0A000: cannot alter type of a column used in a policy" 에러를 발생시킵니다.
DROP POLICY IF EXISTS "Public can view active answers" ON public.answers;
DROP POLICY IF EXISTS "Public can view active events" ON public.events;
DROP POLICY IF EXISTS "Public can view active stories" ON public.stories;

-- 2. 테이블들의 status 컬럼 타입을 단순 텍스트로 변경합니다.
ALTER TABLE public.answers ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.events ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.videos ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.documents ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.galleries ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;

-- 3. 삭제했던 정책들을 다시 복구하되, 예약 발행("Scheduled")된 상태의 레코드도 조회 권한을 획득하도록 기능을 확장합니다.
CREATE POLICY "Public can view active answers" ON public.answers FOR SELECT USING (status = 'Public' OR status = 'Scheduled');
CREATE POLICY "Public can view active events" ON public.events FOR SELECT USING (status = 'Public' OR status = 'Scheduled');
CREATE POLICY "Public can view active stories" ON public.stories FOR SELECT USING (status = 'Public' OR status = 'Scheduled');

-- 4. Schema 캐시 즉각 재부팅 (API 에러 즉각 해제용)
NOTIFY pgrst, 'reload schema';
