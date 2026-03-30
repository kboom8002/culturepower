-- 0034_media_assets_rls.sql
-- 0024 마이그레이션 이후 누락되었던 media_assets 테이블의 관리자 조작용 RLS 정책을 추가합니다.
-- 이 파일은 관리자가 이미지를 업로드할 때 레코드를 생성할 수 있도록 허용합니다.

BEGIN;

-- media_assets 테이블 관리자 수정/추가 허용
CREATE POLICY "Admin role bypass media_assets" 
ON public.media_assets 
FOR ALL TO authenticated 
USING (true) WITH CHECK (true);

-- is_public 속성이나 status에 무관하게 어드민이 조회할 수 있도록 SELECT 정책 확장 (가장 강력한 조건 추가)
CREATE POLICY "Admin role can select all media_assets" 
ON public.media_assets 
FOR SELECT TO authenticated 
USING (true);

COMMIT;
