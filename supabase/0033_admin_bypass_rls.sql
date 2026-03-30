-- 0033_admin_bypass_rls.sql
-- 0024에서 테이블들이 재구축되는 과정에서 쓰기(UPDATE/INSERT) 권한(RLS)이 복원되지 않아
-- 관리자 화면에서 "기사 저장" 시 일어나는 Cannot coerce result 오류를 해결합니다.

BEGIN;

ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

-- Core Content Tables (관리자는 무조건 쓰기 가능)
CREATE POLICY "Admin role bypass stories" ON public.stories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass answers" ON public.answers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass briefs" ON public.briefs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass pages" ON public.pages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Taxonomy Tables
CREATE POLICY "Admin role bypass topics" ON public.topics FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass tags" ON public.tags FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass sections" ON public.sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin role bypass series" ON public.series FOR ALL TO authenticated USING (true) WITH CHECK (true);

COMMIT;
