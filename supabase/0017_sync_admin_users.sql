-- 0017_sync_admin_users.sql
-- Vercel(Supabase Auth) 기반의 로그인 유저 정보를 내부 'admin_users' 테이블과 영구적으로 일치/동기화 시킵니다.
-- 담당자 할당(Reviewer ID) 등에서 발생하는 외래키(Foreign Key) 제약 조건 에러를 원천 차단합니다.

-- 1. 신규 유저 가입 시 자동으로 admin_users 테이블에 추가해주는 트리거 함수 생성
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- auth.users 의 고유 ID를 admin_users 의 id 로 그대로 복사합니다 (외래키 무결성 유지)
  INSERT INTO public.admin_users (id, auth_user_id, email, name, role)
  VALUES (
    new.id, 
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), 
    'Super Admin' -- MVP 단계이므로 가입 즉시 슈퍼관리자 권한 부여
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. 트리거 부착 (auth.users 에 INSERT 가 일어날 때마다 작동)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. 이전에 이미 가입해버린 현재 사용자(대표님 계정)들을 위해 일괄 동기화(Backfill) 실행
-- (에러 방지용: 과거 테스트 중 수동으로 생성되어 랜덤 ID를 가진 동일 이메일의 껍데기 계정들을 먼저 청소합니다)
DELETE FROM public.admin_users 
WHERE email IN (SELECT email FROM auth.users) 
AND id NOT IN (SELECT id FROM auth.users);

-- 정상 UUID로 다시 일괄 삽입/업데이트
INSERT INTO public.admin_users (id, auth_user_id, email, name, role)
SELECT 
    id, 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)), 
    'Super Admin'
FROM auth.users
ON CONFLICT (id) DO UPDATE 
SET 
    auth_user_id = EXCLUDED.auth_user_id,
    email = EXCLUDED.email,
    role = 'Super Admin';
