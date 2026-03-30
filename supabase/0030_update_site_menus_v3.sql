-- =========================================================
-- 0030_update_site_menus_v3.sql
-- 목적: ChatGPT의 리뷰 내용을 기반으로 SSoT 택소노미와 동적 웹 구조에 맞춘
--       GNB/LNB 메뉴의 최종 고도화 버전을 적용합니다.
-- =========================================================

begin;

-- =========================================================
-- 1) 기존 메뉴 데이터 (site_menus) 초기화
-- =========================================================
delete from public.site_menus;

-- =========================================================
-- 2) 최상위 GNB (Root Menus) 일괄 삽입
-- =========================================================
with
inserted_gnbs as (
  insert into public.site_menus (id, parent_id, label, href, display_order, is_active)
  values
    (gen_random_uuid(), null, '문강 RIO', '/webzine/stories', 10, true),
    (gen_random_uuid(), null, '정답카드', '/answers', 20, true),
    (gen_random_uuid(), null, '전문가 위원단', '/experts', 30, true),
    (gen_random_uuid(), null, '행사·영상', '/events', 40, true),
    (gen_random_uuid(), null, '실무·데이터', '/data', 50, true),
    (gen_random_uuid(), null, '사단법인 소개', '/network', 60, true),
    (gen_random_uuid(), null, '참여·회원', '/join/about', 70, true)
  returning id, label
)
-- =========================================================
-- 3) 2 Depth 하위 메뉴 (LNB) 삽입
-- =========================================================
insert into public.site_menus (parent_id, label, href, display_order, is_active)
select 
  gnb.id,
  sub.label,
  sub.href,
  sub.display_order,
  true
from inserted_gnbs gnb
join (
  values
    -- [GNB 1: 문강 RIO] -> 현재 SQL 유지 (최신 Taxonomy Slug 적용완료체제)
    ('문강 RIO', '문강 RIO 소개', '/webzine/about', 10),
    ('문강 RIO', '정책 해설·제안', '/webzine/stories?section=policy-insight', 20),
    ('문강 RIO', '사람과 현장', '/webzine/stories?section=culture-people', 30),
    ('문강 RIO', '지역이 문화다', '/webzine/stories?section=local-as-culture', 40),
    ('문강 RIO', '글로벌/트렌드', '/webzine/stories?section=global-and-trend', 50),
    ('문강 RIO', '문화강국 리포트', '/webzine/stories?section=culture-power-report', 60),

    -- [GNB 2: 정답카드] -> Topic 기반 유지
    ('정답카드', '정답카드 소개', '/answers/about', 10),
    ('정답카드', '문화강국 전략', '/answers?topic=cultural-power-strategy', 20),
    ('정답카드', '문화정책·거버넌스', '/answers?topic=cultural-policy-governance', 30),
    ('정답카드', '지역문화·문화자치', '/answers?topic=local-culture-autonomy', 40),
    ('정답카드', 'K-문명·문화철학', '/answers?topic=k-civilization-cultural-philosophy', 50),
    ('정답카드', '문화산업·기술 전환', '/answers?topic=cultural-industry-tech-transition', 60),
    ('정답카드', '사람·현장·예술가', '/answers?topic=people-field-artists', 70),

    -- [GNB 3: 전문가 위원단] -> Role 기반 분리 고도화
    ('전문가 위원단', '참여 필진', '/experts?role=author', 10),
    ('전문가 위원단', '인터뷰·대담 참여자', '/experts?role=guest', 20),
    ('전문가 위원단', '문강 편집데스크', '/experts?role=editor', 30),
    ('전문가 위원단', '전문 검수위원', '/experts?role=reviewer', 40),

    -- [GNB 4: 행사·영상] -> 카테고리/시리즈 위계 정리 강도 증대
    ('행사·영상', '전체 행사 아카이브', '/events', 10),
    ('행사·영상', '토론회 아카이브', '/events?category=forum-report', 20),
    ('행사·영상', '지역문화대전환 순회토론회', '/events?series=regional-culture-transition', 30),
    ('행사·영상', '주제별 행사', '/events/topics', 40),
    ('행사·영상', '지난 행사 / 결과 보기', '/events/archive', 50),

    -- [GNB 5: 실무·데이터] -> Brief, Report 등 독립 랜딩 페이지 할당
    ('실무·데이터', 'Data Lab', '/data?section=data-lab', 10),
    ('실무·데이터', '지원사업 캘린더', '/data?section=funding-calendar', 20),
    ('실무·데이터', 'One-Pager 브리프', '/briefs', 30),
    ('실무·데이터', '이슈 리포트', '/reports', 40),
    ('실무·데이터', '실무 가이드', '/guides', 50),

    -- [GNB 6: 사단법인 소개] -> 앵커/하위 문서 형태 (유지 확인)
    ('사단법인 소개', '설립 개요', '/network#overview', 10),
    ('사단법인 소개', '비전 & 미션', '/network#vision', 20),
    ('사단법인 소개', '조직구성', '/network#organization', 30),
    ('사단법인 소개', '연혁 및 협력기관', '/network#history', 40),

    -- [GNB 7: 참여·회원] -> 구체적 하위 랜딩 할당
    ('참여·회원', '회원 소개', '/join/about', 10),
    ('참여·회원', '회원 혜택', '/join/benefits', 20),
    ('참여·회원', '가입 및 후원', '/join/payment', 30),
    ('참여·회원', '자주 묻는 질문', '/join/faq', 40)
) as sub (gnb_label, label, href, display_order)
on gnb.label = sub.gnb_label;

commit;

