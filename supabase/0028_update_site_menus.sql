-- =========================================================
-- 0028_update_site_menus.sql
-- 목적: 기존의 가짜/하드코딩 된 GNB/LNB를 
--       최신 텍소노미(주제, 섹션, 롤)의 실제 슬러그(slug)로 전면 교체
-- =========================================================

TRUNCATE TABLE public.site_menus CASCADE;

DO $$
DECLARE
    m1 UUID := gen_random_uuid();
    m2 UUID := gen_random_uuid();
    m3 UUID := gen_random_uuid();
    m4 UUID := gen_random_uuid();
    m5 UUID := gen_random_uuid();
    m6 UUID := gen_random_uuid();
    m7 UUID := gen_random_uuid();
BEGIN
    -- 1. 문강 RIO (스토리/매거진 성격이므로 '섹션(Section)' 기준으로 LNB 분기)
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m1, '문강 RIO', '/webzine/stories', 10);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m1, '문강 RIO 소개', '/webzine/about', 10),
        (m1, '정책 해설·제안', '/webzine/stories?section=policy-insight', 20),
        (m1, '사람과 현장', '/webzine/stories?section=culture-people', 30),
        (m1, '지역이 문화다', '/webzine/stories?section=local-as-culture', 40),
        (m1, '글로벌/트렌드', '/webzine/stories?section=global-and-trend', 50),
        (m1, '문화강국 리포트', '/webzine/stories?section=culture-power-report', 60);

    -- 2. 정답카드 (개념 사전 성격이므로 '핵심 주제축(Topic)' 기준으로 LNB 분기)
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m2, '정답카드', '/answers', 20);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m2, '정답카드 소개', '/answers/about', 10),
        (m2, '문화강국 전략', '/answers?topic=cultural-power-strategy', 20),
        (m2, '문화정책·거버넌스', '/answers?topic=cultural-policy-governance', 30),
        (m2, '지역문화·문화자치', '/answers?topic=local-culture-autonomy', 40),
        (m2, 'K-문명·문화철학', '/answers?topic=k-civilization-cultural-philosophy', 50),
        (m2, '문화산업·기술 전환', '/answers?topic=cultural-industry-tech-transition', 60),
        (m2, '사람·현장·예술가', '/answers?topic=people-field-artists', 70);

    -- 3. 전문가 위원단 (People Role 기준으로 LNB 분기)
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m3, '전문가 위원단', '/experts', 30);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m3, '참여 필진 / 인터뷰이', '/experts?role=author', 10),
        (m3, '문강 편집데스크', '/experts?role=editor', 20),
        (m3, '전문 검수위원', '/experts?role=reviewer', 30);

    -- 4. 행사·영상 (카테고리 및 시리즈 기준으로 LNB 분기)
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m4, '행사·영상', '/events', 40);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m4, '행사 모아보기', '/events', 10),
        (m4, '포럼/현장', '/events?category=event-record', 20),
        (m4, 'K-문명 논의(시리즈)', '/events?series=k-civilization-debate', 30),
        (m4, '문화정책 구조개혁(시리즈)', '/events?series=policy-forum-series', 40);

    -- 5. 실무·데이터 (데이터 특화 섹션 및 브리프 기준으로 LNB 분기)
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m5, '실무·데이터', '/data', 50);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m5, 'Data Lab', '/data?section=data-lab', 10),
        (m5, '지원사업 캘린더', '/data?section=funding-calendar', 20),
        (m5, 'One-Pager 브리프', '/data?category=data-brief', 30),
        (m5, '이슈 리포트/리뷰', '/data?category=issue-report', 40);

    -- 6. 네크워크/법인 소개 (앵커 태그 활용)
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m6, '사단법인 소개', '/network', 60);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m6, '설립 개요', '/network#about', 10),
        (m6, '비전 & 미션', '/network#vision', 20),
        (m6, '조직구성', '/network#organization', 30),
        (m6, '연혁 및 협력기관', '/network#history', 40);

    -- 7. 참여·회원 (기존 유지)
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m7, '참여·회원', '/join', 70);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m7, '회원 소개', '/join/about', 10),
        (m7, '회원 혜택', '/join/benefits', 20),
        (m7, '가입 및 후원', '/join/payment', 30);
END $$;
