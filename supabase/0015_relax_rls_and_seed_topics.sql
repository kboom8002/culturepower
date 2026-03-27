-- 1. Development RLS Bypass
-- Vercel 연동 시 기본적으로 관리자들의 JWT에 'super_admin' 롤이 즉시 할당되지 않아 
-- Insert(저장) 시 RLS 에러가 발생하는 문제를 임시 우회합니다.
-- (향후 설정 > 권한 관리 시스템이 도입되기 전까지 Admin의 자유로운 작성을 허용합니다)

DROP POLICY IF EXISTS "Super admin all access answers" ON public.answers;
DROP POLICY IF EXISTS "Super admin all access stories" ON public.stories;
DROP POLICY IF EXISTS "Super admin all access topics" ON public.content_topics;

-- Authenticated (로그인한) 사용자라면 누구나 읽고 쓸 수 있도록 허가합니다.
CREATE POLICY "Admin role bypass answers" ON public.answers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass stories" ON public.stories FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- content_topics 테이블은 RLS가 안 걸려있지만 호환성을 위해 추가합니다 (미래 대비)
ALTER TABLE public.content_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin role bypass topics" ON public.content_topics FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 2. Initial Topics Seeding (대주제 드롭다운 활성화용)
-- 대주제가 선택 불가능했던 이유는 DB에 등록된 대주제가 0개였기 때문입니다.
-- 원활한 테스트를 위해 임의의 대주제 3개를 삽입합니다.

INSERT INTO public.content_topics (name, slug, description)
VALUES 
  ('정책 인사이트 (Policy Insight)', 'policy-insight', '주요 문화 정책에 대한 심도 있는 분석과 해설'),
  ('현장 취재 (Field Report)', 'field-report', '문화예술 지원 사업 현장 및 인터뷰 등'),
  ('트렌드 리포트 (Trend Report)', 'trend-report', '최신 문화예술계 트렌드 및 통계 데이터 분석')
ON CONFLICT (slug) DO NOTHING;
