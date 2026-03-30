-- =========================================================
-- bulk seed for event posters 1~11
-- 이미지 미업로드 상태 기준
-- =========================================================

begin;

-- ---------------------------------------------------------
-- 0) tags 보강
-- ---------------------------------------------------------
insert into public.tags (slug, name_ko, description, status)
values
  ('regional-culture-transition', '지역문화대전환', '지역문화대전환 시리즈 태그', 'active'),
  ('k-food', 'K-푸드', 'K-푸드 관련 태그', 'active'),
  ('cultural-policy-reform', '문화정책 구조개혁', '문화정책 구조개혁 태그', 'active'),
  ('forum-archive', '토론회 아카이브', '토론회 아카이브 태그', 'active')
on conflict (slug) do nothing;

-- ---------------------------------------------------------
-- 1) events upsert
-- ---------------------------------------------------------
with refs as (
  select
    (select id from public.workflow_statuses where slug = 'published') as ws_published,
    (select id from public.categories where slug = 'forum-report') as cat_forum,
    (select id from public.boundary_types where slug = 'event-record') as bt_event,
    (select id from public.topics where slug = 'cultural-policy-governance') as tp_policy,
    (select id from public.topics where slug = 'cultural-power-strategy') as tp_strategy,
    (select id from public.topics where slug = 'cultural-industry-tech-transition') as tp_industry,
    (select id from public.topics where slug = 'local-culture-autonomy') as tp_local,
    (select id from public.topics where slug = 'people-field-artists') as tp_people
),
upsert_events as (
  insert into public.events (
    slug,
    title,
    subtitle,
    summary,
    body_json,
    body_text,
    start_at,
    end_at,
    location_name,
    venue_detail,
    city_name,
    host_org,
    event_date_label,
    featured_image_asset_id,
    primary_topic_id,
    category_id,
    boundary_type_id,
    workflow_status_id,
    published_at,
    round_no,
    event_status,
    registration_status,
    registration_url,
    has_result_assets
  )
  values
  (
    'forum-01-crisis-of-cultural-industry-and-cultural-policy',
    '[1차] 문화산업의 위기, 문화정책의 위기',
    '문화강국을 위한 대화',
    '문화산업의 위기와 문화정책의 위기를 함께 진단하고, 한국 문화정책의 역사적 쟁점과 향후 과제를 논의하는 국회토론회.',
    '{"type":"doc","content":[]}'::jsonb,
    '문화산업의 위기와 문화정책의 위기를 함께 진단하고, 한국 문화정책의 역사적 쟁점과 향후 과제를 논의하는 국회토론회.',
    '2025-03-07T16:00:00+09:00',
    '2025-03-07T18:00:00+09:00',
    '국회의원회관',
    '제8간담회의실',
    '서울',
    '국회 문화체육관광위원회 국회의원 전재수·임오경·김윤덕·민형배·박수현·이기헌·강유정·양문석·조계원·김재원 / (준)문화강국네트워크',
    '2025년 3월 7일 금요일 오후 4시~6시',
    null,
    (select tp_policy from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    1,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'forum-02-direction-and-sustainability-of-cultural-policy',
    '[2차] 대한민국 문화정책의 방향과 지속가능성',
    '문화강국을 위한 대화',
    '문화정책의 원리와 지속가능성을 중심으로 대한민국 문화정책의 방향을 논의하는 국회토론회.',
    '{"type":"doc","content":[]}'::jsonb,
    '문화정책의 원리와 지속가능성을 중심으로 대한민국 문화정책의 방향을 논의하는 국회토론회.',
    '2025-04-07T10:00:00+09:00',
    '2025-04-07T12:00:00+09:00',
    '국회의원회관',
    '제2세미나실',
    '서울',
    '더불어민주당 문화예술특별위원회 / 국회 문화체육관광위원회 / 문화강국네트워크',
    '2025년 4월 7일 월요일 10:00~12:00',
    null,
    (select tp_policy from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    2,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'forum-03-cultural-industry-cultural-value-k-daum',
    '[3차] 문화산업과 문화의 가치, K-다움',
    '문화강국을 위한 세번째 대화',
    '문화산업의 가치와 창의 생태계, 그리고 K-다움의 의미를 논의하는 국회토론회.',
    '{"type":"doc","content":[]}'::jsonb,
    '문화산업의 가치와 창의 생태계, 그리고 K-다움의 의미를 논의하는 국회토론회.',
    '2025-05-07T14:00:00+09:00',
    '2025-05-07T16:00:00+09:00',
    '국회의원회관',
    '제2간담회의실',
    '서울',
    '더불어민주당 문화예술특별위원회 / 국회 문화체육관광위원회 / 문화강국네트워크',
    '2025년 5월 7일 수요일 오후 2시~4시',
    null,
    (select tp_strategy from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    3,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'forum-04-ai-and-the-cultural-industry',
    '[4차] 인공지능과 문화산업의 현장',
    '문화강국네트워크 제4차 정책토론회',
    '인공지능이 문화산업의 현장에서 어떻게 작동하고 있는지, 기술과 창작의 경계를 논의하는 정책토론회.',
    '{"type":"doc","content":[]}'::jsonb,
    '인공지능이 문화산업의 현장에서 어떻게 작동하고 있는지, 기술과 창작의 경계를 논의하는 정책토론회.',
    '2025-07-08T14:30:00+09:00',
    '2025-07-08T17:30:00+09:00',
    '부천아트센터',
    '소공연장',
    '부천',
    '부천시 / BIFAN / 문화강국네트워크',
    '2025년 7월 8일 화요일 14:30~17:30',
    null,
    (select tp_industry from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    4,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'forum-05-natural-intelligence-vs-ai-citizen-creators',
    '[5차] 자연지능 VS 인공지능 시대, 시민 창작가의 등장',
    '문화강국네트워크 제5차 정책토론회',
    'AI 시대의 문화정책 재구성과 시민 미디어 리터러시, 지역미디어센터의 역할을 논의하는 정책토론회.',
    '{"type":"doc","content":[]}'::jsonb,
    'AI 시대의 문화정책 재구성과 시민 미디어 리터러시, 지역미디어센터의 역할을 논의하는 정책토론회.',
    '2025-09-03T14:00:00+09:00',
    '2025-09-03T17:00:00+09:00',
    '국회의원회관',
    '제1간담회의실',
    '서울',
    '문화강국네트워크 / 전국미디어센터협의회',
    '2025년 9월 3일 수요일 14:00~17:00',
    null,
    (select tp_industry from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    5,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'regional-culture-transition-01-diagnosing-local-ecosystem',
    '[6차] 지역문화대전환 순회토론회 I',
    '지역문화 생태계, 현장을 진단하다',
    '고흥에서 열린 지역문화대전환 첫 순회토론회. 지역문화 생태계의 현황과 과제를 진단하는 데 초점을 둔다.',
    '{"type":"doc","content":[]}'::jsonb,
    '고흥에서 열린 지역문화대전환 첫 순회토론회. 지역문화 생태계의 현황과 과제를 진단하는 데 초점을 둔다.',
    '2025-10-24T14:00:00+09:00',
    '2025-10-24T16:30:00+09:00',
    '고흥군 분청문화박물관',
    null,
    '고흥',
    '고흥군 / 문화강국네트워크 / 더불어민주당 문화예술특별위원회 / 문금주·조계원 의원실',
    '2025년 10월 24일 금요일 14:00~16:30',
    null,
    (select tp_local from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    6,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'regional-culture-transition-02-cultural-autonomy-made-by-regions',
    '[7차] 지역문화대전환 순회토론회 II',
    '문화자치, 지역이 만든다',
    '전북에서 열린 지역문화대전환 두 번째 토론회. 문화자치의 주체와 실행 구조를 논의한다.',
    '{"type":"doc","content":[]}'::jsonb,
    '전북에서 열린 지역문화대전환 두 번째 토론회. 문화자치의 주체와 실행 구조를 논의한다.',
    '2025-11-19T14:00:00+09:00',
    '2025-11-19T16:30:00+09:00',
    '전북테크비즈센터',
    '대회의실',
    '전북',
    '전북특별자치도 콘텐츠융합진흥원 / 문화강국네트워크 / 더불어민주당 문화예술특별위원회 / 국회의원 김준혁·이기헌·정을호·조계원',
    '2025년 11월 19일 수요일 14:00~16:30',
    null,
    (select tp_local from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    7,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'regional-culture-transition-03-content-circulation-and-settlement',
    '[8차] 지역문화대전환 순회토론회 III',
    '사람이 머무는 지역, 콘텐츠로 순환하는 국가',
    '거제에서 열린 지역문화대전환 세 번째 토론회. 제3차 지역문화진흥기본계획의 주요 이슈와 과제를 논의한다.',
    '{"type":"doc","content":[]}'::jsonb,
    '거제에서 열린 지역문화대전환 세 번째 토론회. 제3차 지역문화진흥기본계획의 주요 이슈와 과제를 논의한다.',
    '2025-12-05T15:00:00+09:00',
    null,
    '거제시청',
    '중회의실',
    '거제',
    '거제시 / 국회의원 김준혁·이기헌·정을호·조계원 / 문화강국네트워크',
    '2025년 12월 5일 금요일 오후 15:00',
    null,
    (select tp_local from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    8,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'regional-culture-transition-04-major-agendas-of-local-culture-promotion',
    '[9차] 지역문화대전환 순회토론회 IV',
    '대전환의 시대, 지역문화 진흥의 주요 과제',
    '제주에서 열린 지역문화대전환 네 번째 토론회. 대전환 시대의 지역문화 진흥 과제를 논의한다.',
    '{"type":"doc","content":[]}'::jsonb,
    '제주에서 열린 지역문화대전환 네 번째 토론회. 대전환 시대의 지역문화 진흥 과제를 논의한다.',
    '2025-12-17T15:00:00+09:00',
    null,
    '제주문학관',
    '대강당',
    '제주',
    '제주특별자치도 / 국회의원 조계원 / 문화강국네트워크',
    '2025년 12월 17일 수요일 오후 15:00',
    null,
    (select tp_local from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    9,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'forum-10-kfood-and-national-competitiveness',
    '[10차] 한식의 세계화, K-푸드가 이끄는 국가 경쟁력',
    'National competitiveness led by K-Food',
    '지속 가능한 K-푸드 세계화와 정책 개선, 국립 한식 아카데미, 무형유산 관점의 확장 가능성, 미식관광을 함께 논의하는 정책토론회.',
    '{"type":"doc","content":[]}'::jsonb,
    '지속 가능한 K-푸드 세계화와 정책 개선, 국립 한식 아카데미, 무형유산 관점의 확장 가능성, 미식관광을 함께 논의하는 정책토론회.',
    '2026-02-06T15:00:00+09:00',
    '2026-02-06T17:40:00+09:00',
    '국회의원회관',
    '제1소회의실',
    '서울',
    '문화강국네트워크 / 한국음식문화재단 / 국회의원 문금주·이기헌·김준혁·정을호',
    '2026년 2월 6일 금요일 15:00~17:40',
    null,
    (select tp_strategy from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    10,
    'ended',
    'closed',
    null,
    false
  ),
  (
    'forum-11-foundational-arts-and-artist-welfare',
    '[11차] 기초예술 진흥과 예술인 복지 - 국가 시스템 구축',
    '문화강국네트워크 제11차 정책토론회',
    '기초예술 진흥과 예술인 복지를 국가 시스템 구축의 문제로 다루는 정책토론회.',
    '{"type":"doc","content":[]}'::jsonb,
    '기초예술 진흥과 예술인 복지를 국가 시스템 구축의 문제로 다루는 정책토론회.',
    '2026-04-01T15:00:00+09:00',
    '2026-04-01T17:30:00+09:00',
    '국회의원회관',
    '제8간담회의실',
    '서울',
    '국무총리비서실 시민사회비서관실 / 국회의원 김문수·김준혁·이기헌 / 문화강국네트워크',
    '2026년 4월 1일 수요일 오후 15:00~17:30',
    null,
    (select tp_people from refs),
    (select cat_forum from refs),
    (select bt_event from refs),
    (select ws_published from refs),
    now(),
    11,
    'upcoming',
    'open',
    null,
    false
  )
  on conflict (slug) do update
  set
    title = excluded.title,
    subtitle = excluded.subtitle,
    summary = excluded.summary,
    body_text = excluded.body_text,
    start_at = excluded.start_at,
    end_at = excluded.end_at,
    location_name = excluded.location_name,
    venue_detail = excluded.venue_detail,
    city_name = excluded.city_name,
    host_org = excluded.host_org,
    event_date_label = excluded.event_date_label,
    primary_topic_id = excluded.primary_topic_id,
    category_id = excluded.category_id,
    boundary_type_id = excluded.boundary_type_id,
    workflow_status_id = excluded.workflow_status_id,
    round_no = excluded.round_no,
    event_status = excluded.event_status,
    registration_status = excluded.registration_status,
    registration_url = excluded.registration_url,
    has_result_assets = excluded.has_result_assets,
    updated_at = now()
  returning id, slug
)
select * from upsert_events;

-- ---------------------------------------------------------
-- 2) event_topics
-- ---------------------------------------------------------
with
events_ref as (
  select id, slug from public.events
  where slug in (
    'forum-01-crisis-of-cultural-industry-and-cultural-policy',
    'forum-02-direction-and-sustainability-of-cultural-policy',
    'forum-03-cultural-industry-cultural-value-k-daum',
    'forum-04-ai-and-the-cultural-industry',
    'forum-05-natural-intelligence-vs-ai-citizen-creators',
    'regional-culture-transition-01-diagnosing-local-ecosystem',
    'regional-culture-transition-02-cultural-autonomy-made-by-regions',
    'regional-culture-transition-03-content-circulation-and-settlement',
    'regional-culture-transition-04-major-agendas-of-local-culture-promotion',
    'forum-10-kfood-and-national-competitiveness',
    'forum-11-foundational-arts-and-artist-welfare'
  )
),
topics_ref as (
  select id, slug from public.topics
  where slug in (
    'cultural-policy-governance',
    'cultural-power-strategy',
    'cultural-industry-tech-transition',
    'local-culture-autonomy',
    'people-field-artists'
  )
),
pairs(event_slug, topic_slug, is_primary) as (
  values
    ('forum-01-crisis-of-cultural-industry-and-cultural-policy', 'cultural-policy-governance', true),
    ('forum-01-crisis-of-cultural-industry-and-cultural-policy', 'cultural-industry-tech-transition', false),

    ('forum-02-direction-and-sustainability-of-cultural-policy', 'cultural-policy-governance', true),
    ('forum-02-direction-and-sustainability-of-cultural-policy', 'cultural-power-strategy', false),

    ('forum-03-cultural-industry-cultural-value-k-daum', 'cultural-power-strategy', true),
    ('forum-03-cultural-industry-cultural-value-k-daum', 'cultural-industry-tech-transition', false),

    ('forum-04-ai-and-the-cultural-industry', 'cultural-industry-tech-transition', true),
    ('forum-05-natural-intelligence-vs-ai-citizen-creators', 'cultural-industry-tech-transition', true),

    ('regional-culture-transition-01-diagnosing-local-ecosystem', 'local-culture-autonomy', true),
    ('regional-culture-transition-02-cultural-autonomy-made-by-regions', 'local-culture-autonomy', true),
    ('regional-culture-transition-03-content-circulation-and-settlement', 'local-culture-autonomy', true),
    ('regional-culture-transition-04-major-agendas-of-local-culture-promotion', 'local-culture-autonomy', true),

    ('forum-10-kfood-and-national-competitiveness', 'cultural-power-strategy', true),
    ('forum-11-foundational-arts-and-artist-welfare', 'people-field-artists', true),
    ('forum-11-foundational-arts-and-artist-welfare', 'cultural-policy-governance', false)
)
insert into public.event_topics (event_id, topic_id, is_primary)
select e.id, t.id, p.is_primary
from pairs p
join events_ref e on e.slug = p.event_slug
join topics_ref t on t.slug = p.topic_slug
on conflict (event_id, topic_id) do update
set is_primary = excluded.is_primary;

-- ---------------------------------------------------------
-- 3) event_tags
-- ---------------------------------------------------------
with
events_ref as (
  select id, slug from public.events
),
tags_ref as (
  select id, slug from public.tags
  where slug in (
    'forum-archive',
    'cultural-policy-reform',
    'regional-culture-transition',
    'cultural-autonomy',
    'ai-and-culture',
    'k-food',
    'artist-welfare'
  )
),
pairs(event_slug, tag_slug) as (
  values
    ('forum-01-crisis-of-cultural-industry-and-cultural-policy', 'forum-archive'),
    ('forum-01-crisis-of-cultural-industry-and-cultural-policy', 'cultural-policy-reform'),

    ('forum-02-direction-and-sustainability-of-cultural-policy', 'forum-archive'),
    ('forum-02-direction-and-sustainability-of-cultural-policy', 'cultural-policy-reform'),

    ('forum-03-cultural-industry-cultural-value-k-daum', 'forum-archive'),

    ('forum-04-ai-and-the-cultural-industry', 'forum-archive'),
    ('forum-04-ai-and-the-cultural-industry', 'ai-and-culture'),

    ('forum-05-natural-intelligence-vs-ai-citizen-creators', 'forum-archive'),
    ('forum-05-natural-intelligence-vs-ai-citizen-creators', 'ai-and-culture'),

    ('regional-culture-transition-01-diagnosing-local-ecosystem', 'forum-archive'),
    ('regional-culture-transition-01-diagnosing-local-ecosystem', 'regional-culture-transition'),

    ('regional-culture-transition-02-cultural-autonomy-made-by-regions', 'forum-archive'),
    ('regional-culture-transition-02-cultural-autonomy-made-by-regions', 'regional-culture-transition'),
    ('regional-culture-transition-02-cultural-autonomy-made-by-regions', 'cultural-autonomy'),

    ('regional-culture-transition-03-content-circulation-and-settlement', 'forum-archive'),
    ('regional-culture-transition-03-content-circulation-and-settlement', 'regional-culture-transition'),

    ('regional-culture-transition-04-major-agendas-of-local-culture-promotion', 'forum-archive'),
    ('regional-culture-transition-04-major-agendas-of-local-culture-promotion', 'regional-culture-transition'),

    ('forum-10-kfood-and-national-competitiveness', 'forum-archive'),
    ('forum-10-kfood-and-national-competitiveness', 'k-food'),

    ('forum-11-foundational-arts-and-artist-welfare', 'forum-archive'),
    ('forum-11-foundational-arts-and-artist-welfare', 'artist-welfare')
)
insert into public.event_tags (event_id, tag_id)
select e.id, t.id
from pairs p
join events_ref e on e.slug = p.event_slug
join tags_ref t on t.slug = p.tag_slug
on conflict (event_id, tag_id) do nothing;

-- ---------------------------------------------------------
-- 4) event_series
-- ---------------------------------------------------------
with
events_ref as (
  select id, slug from public.events
),
series_ref as (
  select id, slug from public.series
  where slug in (
    'policy-forum-series',
    'regional-culture-transition'
  )
),
pairs(event_slug, series_slug) as (
  values
    ('forum-01-crisis-of-cultural-industry-and-cultural-policy', 'policy-forum-series'),
    ('forum-02-direction-and-sustainability-of-cultural-policy', 'policy-forum-series'),
    ('forum-03-cultural-industry-cultural-value-k-daum', 'policy-forum-series'),
    ('forum-04-ai-and-the-cultural-industry', 'policy-forum-series'),
    ('forum-05-natural-intelligence-vs-ai-citizen-creators', 'policy-forum-series'),
    ('regional-culture-transition-01-diagnosing-local-ecosystem', 'regional-culture-transition'),
    ('regional-culture-transition-02-cultural-autonomy-made-by-regions', 'regional-culture-transition'),
    ('regional-culture-transition-03-content-circulation-and-settlement', 'regional-culture-transition'),
    ('regional-culture-transition-04-major-agendas-of-local-culture-promotion', 'regional-culture-transition'),
    ('forum-10-kfood-and-national-competitiveness', 'policy-forum-series'),
    ('forum-11-foundational-arts-and-artist-welfare', 'policy-forum-series')
)
insert into public.event_series (event_id, series_id, is_primary)
select e.id, s.id, true
from pairs p
join events_ref e on e.slug = p.event_slug
join series_ref s on s.slug = p.series_slug
on conflict (event_id, series_id) do update
set is_primary = excluded.is_primary;

-- ---------------------------------------------------------
-- 5) event_program_items
-- 포스터에서 읽을 수 있는 범위만 우선 입력
-- ---------------------------------------------------------
with events_ref as (
  select id, slug from public.events
)
insert into public.event_program_items (
  event_id, segment_type, display_order, person_name_raw, affiliation, presentation_title, note
)
select e.id, x.segment_type, x.display_order, x.person_name_raw, x.affiliation, x.presentation_title, x.note
from (
  values
  -- 1회
  ('forum-01-crisis-of-cultural-industry-and-cultural-policy','chair',10,'김재범','경희대 문화예술경영학과 교수',null,null),
  ('forum-01-crisis-of-cultural-industry-and-cultural-policy','presenter',20,'정종은','부산대학교 예술문화영상학과 교수','한국문화정책의 역사적 쟁점과 향후 과제',null),
  ('forum-01-crisis-of-cultural-industry-and-cultural-policy','panelist',30,'고영재','인디플러그 대표',null,null),
  ('forum-01-crisis-of-cultural-industry-and-cultural-policy','panelist',40,'윤일상','작곡가',null,null),
  ('forum-01-crisis-of-cultural-industry-and-cultural-policy','panelist',50,'서이레','웹툰 작가',null,null),
  ('forum-01-crisis-of-cultural-industry-and-cultural-policy','panelist',60,'박문성','스포츠 해설가',null,null),
  ('forum-01-crisis-of-cultural-industry-and-cultural-policy','panelist',70,'강승진','전 순천문화도시센터장',null,null),

  -- 2회
  ('forum-02-direction-and-sustainability-of-cultural-policy','chair',10,'최준호','한국예술종합학교 명예교수',null,null),
  ('forum-02-direction-and-sustainability-of-cultural-policy','keynote',20,'강유정','더불어민주당 문화예술특별위원회 위원장',null,'기조연설'),
  ('forum-02-direction-and-sustainability-of-cultural-policy','presenter',30,'김현환','한국외국어대학교 교수 / 전 문화체육관광부 제1차관','문화정책의 원리',null),
  ('forum-02-direction-and-sustainability-of-cultural-policy','presenter',40,'이원재','경희사이버대학교 교수','문화정책의 지속가능성',null),
  ('forum-02-direction-and-sustainability-of-cultural-policy','panelist',50,'박성일','음악감독',null,'드라마 폭싹 속았수다'),
  ('forum-02-direction-and-sustainability-of-cultural-policy','panelist',60,'고동현','연세대 사회발전연구소 전문연구원',null,null),
  ('forum-02-direction-and-sustainability-of-cultural-policy','panelist',70,'소홍삼','전 의정부문화재단 본부장',null,null),

  -- 3회
  ('forum-03-cultural-industry-cultural-value-k-daum','chair',10,'유홍준','전 문화재청장 / 명지대학교 석좌교수',null,null),
  ('forum-03-cultural-industry-cultural-value-k-daum','moderator',15,'임철빈','(사)문화강국네트워크 사무총장',null,null),
  ('forum-03-cultural-industry-cultural-value-k-daum','presenter',20,'김재준','국민대학교 교수','문화예술의 가치와 창의 생태계',null),
  ('forum-03-cultural-industry-cultural-value-k-daum','panelist',30,'이승우','한국예술종합학교 영상원 영화과 교수',null,null),
  ('forum-03-cultural-industry-cultural-value-k-daum','panelist',40,'전홍준','주식회사 어트랙트 대표 / 프로듀서',null,null),
  ('forum-03-cultural-industry-cultural-value-k-daum','panelist',50,'신대철','바른음원협동조합 대표 / 기타리스트',null,null),
  ('forum-03-cultural-industry-cultural-value-k-daum','panelist',60,'장원석','㈜비에이엔터테인먼트 대표 / 제작자',null,null),

  -- 4회
  ('forum-04-ai-and-the-cultural-industry','chair',10,'임문영','미래전환 대표',null,null),
  ('forum-04-ai-and-the-cultural-industry','presenter',20,'이승무','교수',null,null),
  ('forum-04-ai-and-the-cultural-industry','panelist',30,'신철','부천국제판타스틱영화제 집행위원장',null,null),
  ('forum-04-ai-and-the-cultural-industry','panelist',40,'정원모','피카디 대표',null,null),
  ('forum-04-ai-and-the-cultural-industry','panelist',50,'이주영','문화칼럼니스트',null,null),
  ('forum-04-ai-and-the-cultural-industry','panelist',60,'최양현','작가',null,null),
  ('forum-04-ai-and-the-cultural-industry','panelist',70,'이태린','연출가',null,null),
  ('forum-04-ai-and-the-cultural-industry','panelist',80,'김성수','음악감독',null,null),
  ('forum-04-ai-and-the-cultural-industry','panelist',90,'송경원','씨네21 편집장',null,null),

  -- 5회
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','chair',10,'손동혁','한국문화정책연구소 이사장',null,null),
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','presenter',20,'최도인','메타기획컨설팅 CBO/본부장','AI 시대 문화정책의 재구성: 나로부터 확장되는 세계',null),
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','presenter',30,'김아미','디지털 미디어 리터러시 연구자','AI 시대 시민 리터러시: 비판적 상상력과 공감 능력을 갖춘 시민의 양성',null),
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','presenter',40,'허경','전국미디어센터협의회 정책센터장','문화체육관광부의 디지털미디어리터러시 정책: AI 시대 지역미디어센터의 역할과 도전',null),
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','panelist',50,'윤광식','성동문화재단 이사장',null,null),
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','panelist',60,'노희섭','보헤미안로보틱스 부대표',null,null),
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','panelist',70,'김정선','한국문화교육학회 이사',null,null),
  ('forum-05-natural-intelligence-vs-ai-citizen-creators','panelist',80,'송경진','이화사회과학원 연구원',null,null),

  -- 6회
  ('regional-culture-transition-01-diagnosing-local-ecosystem','chair',10,'김도일','교수',null,null),
  ('regional-culture-transition-01-diagnosing-local-ecosystem','moderator',20,'임철빈','(사)문화강국네트워크 사무총장',null,null),
  ('regional-culture-transition-01-diagnosing-local-ecosystem','presenter',30,'강승진','어셈블리퍼블릭 대표','지역문화 기반현황 및 과제분석',null),
  ('regional-culture-transition-01-diagnosing-local-ecosystem','panelist',40,'정지예','해남문화관광재단 총괄팀장',null,null),
  ('regional-culture-transition-01-diagnosing-local-ecosystem','panelist',50,'이우석','놀고먹기연구소 소장',null,null),
  ('regional-culture-transition-01-diagnosing-local-ecosystem','panelist',60,'천윤희','독립기획/연구자',null,null),
  ('regional-culture-transition-01-diagnosing-local-ecosystem','panelist',70,'신미라','순천문화재단 팀장',null,null),

  -- 7회
  ('regional-culture-transition-02-cultural-autonomy-made-by-regions','chair',10,'김도일','전 예술경영지원센터 대표',null,null),
  ('regional-culture-transition-02-cultural-autonomy-made-by-regions','presenter',20,'이원재','문화연대 집행위원장',null,null),
  ('regional-culture-transition-02-cultural-autonomy-made-by-regions','panelist',30,'손동혁','한국문화정책연구소 이사장',null,null),
  ('regional-culture-transition-02-cultural-autonomy-made-by-regions','panelist',40,'오준교','전북콘텐츠융합진흥원 팀장',null,null),
  ('regional-culture-transition-02-cultural-autonomy-made-by-regions','panelist',50,'김재범','경희대학교 겸임교수',null,null),
  ('regional-culture-transition-02-cultural-autonomy-made-by-regions','panelist',60,'최지만','삼지대연구소 소장',null,null),
  ('regional-culture-transition-02-cultural-autonomy-made-by-regions','panelist',70,'김주희','전주문화재단 팀장',null,null),

  -- 8회
  ('regional-culture-transition-03-content-circulation-and-settlement','chair',10,'김도일','전 예술경영지원센터 대표',null,null),
  ('regional-culture-transition-03-content-circulation-and-settlement','presenter',20,'양혜원','한국문화관광연구원 문화연구본부장','제3차 지역문화진흥기본계획, 주요 이슈와 과제',null),
  ('regional-culture-transition-03-content-circulation-and-settlement','panelist',30,'노민호','지방분권전국회의 공동대표',null,null),
  ('regional-culture-transition-03-content-circulation-and-settlement','panelist',40,'이선철','감자꽃스튜디오 대표',null,null),
  ('regional-culture-transition-03-content-circulation-and-settlement','panelist',50,'김재준','국민대학교 교수',null,null),
  ('regional-culture-transition-03-content-circulation-and-settlement','panelist',60,'김영실','거제극단 예도 부대표',null,null),

  -- 9회
  ('regional-culture-transition-04-major-agendas-of-local-culture-promotion','chair',10,'김도일','전 예술경영지원센터 대표',null,null),
  ('regional-culture-transition-04-major-agendas-of-local-culture-promotion','presenter',20,'이원재','문화연대 집행위원장',null,null),
  ('regional-culture-transition-04-major-agendas-of-local-culture-promotion','panelist',30,'이재곤','경기대 교수',null,null),
  ('regional-culture-transition-04-major-agendas-of-local-culture-promotion','panelist',40,'김재준','국민대 교수',null,null),
  ('regional-culture-transition-04-major-agendas-of-local-culture-promotion','panelist',50,'김석윤','제주문화예술재단 이사장',null,null),
  ('regional-culture-transition-04-major-agendas-of-local-culture-promotion','panelist',60,'이우석','놀고먹기연구소 소장',null,null),
  ('regional-culture-transition-04-major-agendas-of-local-culture-promotion','panelist',70,'고선영','제주연구원 연구원',null,null),

  -- 10회
  ('forum-10-kfood-and-national-competitiveness','keynote',10,'정혜경','호서대 명예교수','지속 가능한 K-푸드의 세계화 방안 모색',null),
  ('forum-10-kfood-and-national-competitiveness','presenter',20,'김경은','한식문화연구소 소장','K-푸드 정책의 개선을 위한 현실적 방안 제언',null),
  ('forum-10-kfood-and-national-competitiveness','presenter',30,'박미영','한국음식문화재단 이사장','국립 한식 아카데미 설립의 필요성',null),
  ('forum-10-kfood-and-national-competitiveness','presenter',40,'오세미나','전북대 무형유산정보연구소 연구교수','유네스코 인류무형유산 관점에서 본 한식의 문화적 가치와 확장 가능성',null),
  ('forum-10-kfood-and-national-competitiveness','presenter',50,'최지아','미식관광협회 부회장','미식관광이 견인하는 한식 세계화의 새로운 흐름',null),
  ('forum-10-kfood-and-national-competitiveness','chair',60,'김태희','경희대 Hospitality 경영학과 교수',null,'지정 토론 좌장'),
  ('forum-10-kfood-and-national-competitiveness','special-guest',70,'박찬일','셰프',null,'스페셜 게스트'),

  -- 11회
  ('forum-11-foundational-arts-and-artist-welfare','chair',10,'김도일','전 예술경영지원센터 대표',null,null),
  ('forum-11-foundational-arts-and-artist-welfare','keynote',20,'김재준','국민대 명예교수 / 웹진 문강 편집장','문화예술과 국가시스템',null),
  ('forum-11-foundational-arts-and-artist-welfare','presenter',30,'방현석','소설 범도 외 다수 집필','기초예술 진흥 방안 모색',null),
  ('forum-11-foundational-arts-and-artist-welfare','panelist',40,'박영정','한국예술경영학회 부회장',null,null),
  ('forum-11-foundational-arts-and-artist-welfare','panelist',50,'박철웅','목원대 교수 / 사회대개혁위원회 문화예술체육특위',null,null),
  ('forum-11-foundational-arts-and-artist-welfare','panelist',60,'이소영','국악인',null,null),
  ('forum-11-foundational-arts-and-artist-welfare','panelist',70,'최선영','문화예술기획자',null,null),
  ('forum-11-foundational-arts-and-artist-welfare','panelist',80,'현시원','연세대 커뮤니케이션대학원 교수',null,null)
) as x(event_slug, segment_type, display_order, person_name_raw, affiliation, presentation_title, note)
join events_ref e on e.slug = x.event_slug
on conflict do nothing;

commit;