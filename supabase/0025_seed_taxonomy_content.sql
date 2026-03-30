-- =========================================================
-- 문화강국 SSoT: MVP Seed Data Import (Phase 2)
-- 목적: 새 Taxonomy 스키마 연동 테스트를 위한 가상 데이터 
-- =========================================================

BEGIN;

-- 1. Variables (빠른 조회를 위한 변수 세팅)
DO $$
DECLARE
  v_pub_status UUID;
  v_topic_policy UUID;
  v_topic_kciv UUID;
  v_topic_local UUID;
  v_topic_industry UUID;
  v_topic_people UUID;
BEGIN
  SELECT id INTO v_pub_status FROM public.workflow_statuses WHERE slug = 'published' LIMIT 1;
  SELECT id INTO v_topic_policy FROM public.topics WHERE slug = 'cultural-policy-governance' LIMIT 1;
  SELECT id INTO v_topic_kciv FROM public.topics WHERE slug = 'k-civilization-cultural-philosophy' LIMIT 1;
  SELECT id INTO v_topic_local FROM public.topics WHERE slug = 'local-culture-autonomy' LIMIT 1;
  SELECT id INTO v_topic_industry FROM public.topics WHERE slug = 'cultural-industry-tech-transition' LIMIT 1;
  SELECT id INTO v_topic_people FROM public.topics WHERE slug = 'people-field-artists' LIMIT 1;

  -- 2. Seed Stories (웹진/아티클용)
  INSERT INTO public.stories (slug, title, subtitle, summary, body_text, primary_topic_id, workflow_status_id, published_at, allow_indexing)
  VALUES 
    ('story-policy-1', '미래 문화예술행정의 10년 비전', '문화재정 분권화 전략', '지역문화 자치를 위한 차세대 예산과 행정조직 개편안의 분석', '문화정책 구조개혁은 왜 필요한가?에 대한 심층...', v_topic_policy, v_pub_status, NOW(), true),
    ('story-kciv-1', '대한민국 국가 경쟁력과 문화의 힘', 'K-문명의 글로벌 스탠다드', 'K-POP을 넘어 K-문명으로 나아가는 글로벌 문화 매력 국가의 비전', '...', v_topic_kciv, v_pub_status, NOW() - interval '2 days', true),
    ('story-local-1', '사라지는 지방, 부활하는 커뮤니티', '지역소멸과 거점 정책', '지역문화를 생존의 무기로 활용한 성공 사례들 집중 해부', '...', v_topic_local, v_pub_status, NOW() - interval '5 days', true)
  ON CONFLICT (slug) DO NOTHING;

  -- 3. Seed Answers (정답카드/SSoT용)
  INSERT INTO public.answers (slug, title, summary, answer_short, answer_long, primary_topic_id, workflow_status_id, published_at)
  VALUES
    ('ans-policy-gov-1', '문화재정 5% 시대, 어떻게 준비할 것인가?', '문체부 예산 확보 및 기금 조성안', '투자 우선순위 재조정과 민관매칭 펀드가 핵심', '...', v_topic_policy, v_pub_status, NOW()),
    ('ans-kciv-1', 'K-문명이란 무엇인가요?', '한국적 혼종성과 철학적 민주주의', '전통문화의 보존이 아닌, 인류 보편의 문제를 해결하는 한국적 대안이자 사상적 매력망입니다.', '...', v_topic_kciv, v_pub_status, NOW())
  ON CONFLICT (slug) DO NOTHING;

  -- 4. Seed Events (행사/기록/아카이브용)
  INSERT INTO public.events (slug, title, subtitle, summary, location_name, start_at, end_at, primary_topic_id, workflow_status_id, published_at)
  VALUES
    ('evt-network-launch', '문화강국네트워크 발기인 총회', '초대 이사장 취임식', '새로운 문화 정책의 지평을 여는 500인 위원회의 첫 출범 행사', '한국프레스센터 20층 국제회의장', NOW(), NOW() + interval '2 hours', v_topic_policy, v_pub_status, NOW()),
    ('evt-k-culture-forum', '2026 문화 산업 글로벌 포럼', 'K-콘텐츠 플랫폼의 미래', 'AI와 K콘텐츠의 융합 전략에 대해 국내외 1위 플랫폼 사업자들이 토론합니다.', '코엑스 그랜드볼룸', NOW() + interval '7 days', NOW() + interval '7 days 8 hours', v_topic_industry, v_pub_status, NOW()),
    ('evt-local-symposium', '제1회 지역문화 자치 심포지엄', '현장 실무자 네트워크 선포', '생존을 베팅하는 지역 문화인들의 치열한 릴레이 대담과 데이터 공유', '부산 벡스코', NOW() - interval '14 days', NOW() - interval '13 days', v_topic_local, v_pub_status, NOW())
  ON CONFLICT (slug) DO NOTHING;

END $$;

COMMIT;
