-- 0022_fix_enum_constraints.sql
-- Answers 및 Events, 기타 아카이브 테이블들의 status 컬럼이 과거에 정의된 content_status ENUM 타입을 
-- 계속 참조하고 있어서 "Scheduled" 등의 새 상태값을 넣거나 조회할 때 22P02 에러(invalid input)가 
-- 발생하는 치명적 버그를 해결합니다. Stories 테이블과 동일하게 VARCHAR(50)으로 유연하게 해제합니다.

-- 1. 테이블들의 status 컬럼 타입을 단순 텍스트로 변경합니다.
-- 참고: PostgreSQL에서 ENUM을 VARCHAR로 캐스팅하며 변경하려면 USING 문을 써야 합니다.

ALTER TABLE public.answers ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.events ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.videos ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.documents ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.galleries ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;
ALTER TABLE public.content_resources ALTER COLUMN status TYPE VARCHAR(50) USING status::VARCHAR;

-- 2. Schema 캐시 즉각 재부팅 (API 에러 즉각 해제용)
NOTIFY pgrst, 'reload schema';
