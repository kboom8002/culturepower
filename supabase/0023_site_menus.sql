-- Migration to add site_menus table for fully dynamic GNB

DROP TABLE IF EXISTS public.site_menus CASCADE;

CREATE TABLE IF NOT EXISTS public.site_menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES public.site_menus(id) ON DELETE RESTRICT,
    label VARCHAR(255) NOT NULL,
    href VARCHAR(255) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_menus ENABLE ROW LEVEL SECURITY;

-- Public READ policy
CREATE POLICY "Enable read access for all users on site_menus"
    ON public.site_menus FOR SELECT
    USING (is_active = true);

-- Admin ALL policy (assuming authenticated users mapped to admin roles can bypass or a specific policy exists, here we keep it simple for service role or authenticated admins)
CREATE POLICY "Enable ALL for authenticated admins on site_menus"
    ON public.site_menus FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Seed initial GNB data
DO $$
DECLARE
    m1 UUID := uuid_generate_v4();
    m2 UUID := uuid_generate_v4();
    m3 UUID := uuid_generate_v4();
    m4 UUID := uuid_generate_v4();
    m5 UUID := uuid_generate_v4();
    m6 UUID := uuid_generate_v4();
    m7 UUID := uuid_generate_v4();
BEGIN
    -- 1. 문강 RIO
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m1, '문강 RIO', '/webzine/stories', 10);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m1, '문강 RIO 소개', '/webzine/about', 10),
        (m1, '문화정책', '/webzine/stories?topic=policy', 20),
        (m1, 'K-문명', '/webzine/stories?topic=k-civ', 30),
        (m1, '지역문화', '/webzine/stories?topic=local', 40),
        (m1, '행사/기록', '/webzine/stories?topic=event', 50);

    -- 2. 정답카드
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m2, '정답카드', '/answers', 20);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m2, '정답카드 소개', '/answers/about', 10),
        (m2, '문화정책', '/answers?topic=policy', 20),
        (m2, 'K-문명', '/answers?topic=k-civ', 30),
        (m2, '지역문화', '/answers?topic=local', 40),
        (m2, '행사/기록', '/answers?topic=event', 50);

    -- 3. 전문가 위원단
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m3, '전문가 위원단', '/experts', 30);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m3, '전문가 위원단 소개', '/experts/about', 10),
        (m3, '편집위원회', '/experts?role=editor', 20),
        (m3, '분야별 전문가 풀', '/experts', 30);

    -- 4. 행사·영상
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m4, '행사·영상', '/events', 40);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m4, '행사·영상 안내', '/events/about', 10),
        (m4, '문화정책', '/events?topic=policy', 20),
        (m4, 'K-문명', '/events?topic=k-civ', 30),
        (m4, '지역문화', '/events?topic=local', 40),
        (m4, '명사 영상', '/events?category=video', 50);

    -- 5. 데이터·자료
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m5, '데이터·자료', '/data', 50);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m5, '문화예술정보', '/data?category=info', 10),
        (m5, '주요 문화행사 / 일정', '/data?category=schedule', 20),
        (m5, '주요 문화공모사업', '/data?category=contest', 30),
        (m5, '문화정책 뉴스', '/data?category=news', 40),
        (m5, '기관/단체 정보', '/data?category=org', 50),
        (m5, '데이터 노트', '/data?category=note', 60),
        (m5, 'One-Pager / Brief', '/data?category=brief', 70);

    -- 6. 사단법인 소개
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m6, '사단법인 소개', '/network', 60);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m6, '설립 개요', '/network#about', 10),
        (m6, '이사장 인사말', '/network#greeting', 20),
        (m6, '비전 & 미션', '/network#vision', 30),
        (m6, '조직구성', '/network#organization', 40),
        (m6, '주요 연혁 및 협력기관', '/network#history', 50);

    -- 7. 참여·회원
    INSERT INTO public.site_menus (id, label, href, display_order) VALUES (m7, '참여·회원', '/join', 70);
    INSERT INTO public.site_menus (parent_id, label, href, display_order) VALUES
        (m7, '회원 소개', '/join/about', 10),
        (m7, '회원 혜택', '/join/benefits', 20),
        (m7, '가입 안내', '/join/guide', 30),
        (m7, '가입 신청', '/join/apply', 40),
        (m7, '뉴스레터 구독', '/join/newsletter', 50),
        (m7, '협력/제휴 문의', '/join/partnership', 60);

END $$;
