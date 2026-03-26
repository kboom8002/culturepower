-- `supabase/seed.sql`
-- 초기 로컬 프론트엔드/백엔드 테스트를 위한 픽스처(Fixture) 모음.

-- 1. 완벽하게 준비된 Public 정답카드 (모든 가드 통과 기준)
INSERT INTO public.answers (id, title, direct_answer, context, status, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', '지역소멸 방어를 위한 문화 정책은 무엇인가?', '자생력 확보가 최우선입니다.', '단순 행사 예산을 넘어 장기 체류형 인프라에 투자합니다.', 'Public', NOW(), NOW());

-- 증거 자료 맵핑 (Guard 통과용)
INSERT INTO public.evidences (id, target_entity_type, target_entity_id, file_url, created_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'answers', '00000000-0000-0000-0000-000000000001', 'https://culturepower.org/docs/policy-2026.pdf', NOW());

-- 2. Edge Case: 퍼블리싱 대기열 블로킹 테스트용 (Review 상태이나 증거 없음)
INSERT INTO public.answers (id, title, direct_answer, context, status, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'K-문명의 기원', '작성 중', '상세 해설 없음', 'Review', NOW(), NOW());

-- 3. Edge Case: 자료가 업로드되지 않은 종료된 행사 (Archived or Closed)
INSERT INTO public.events (id, title, summary, event_type, status, start_date, created_at)
VALUES 
  ('22222222-2222-2222-2222-222222222222', '과거 지역 네트워킹 행사', '자료가 유실된 과거 행사입니다.', '세미나', 'Closed', NOW() - INTERVAL '30 days', NOW());
