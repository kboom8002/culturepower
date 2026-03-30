-- =========================================================
-- People seed + content_people + content_reviews append
-- 대상:
-- - story 4건
-- - answer 11건
-- 목적:
-- - 필자/인터뷰어/게스트/편집자/검수자 연결
-- - 검수 로그 생성
-- =========================================================

begin;

insert into public.people_roles (slug, name_ko, description) values
  ('author', '작성자', '콘텐츠를 작성한 주요 저자'),
  ('editor', '편집자', '콘텐츠를 기획하고 편집한 편집자'),
  ('reviewer', '검수자', '콘텐츠 내용을 검수한 검수자'),
  ('interviewer', '인터뷰어', '대담/초대석 진행자'),
  ('guest', '게스트', '초대 손님')
on conflict (slug) do nothing;


-- ---------------------------------------------------------
-- 1) people seed / upsert
-- ---------------------------------------------------------
insert into public.people (
  slug,
  name,
  headline,
  bio_short,
  status
)
values
  (
    'mungang-editor-desk',
    '문강 편집데스크',
    '문강 RIO 편집 운영',
    '문강 RIO 콘텐츠 편집, 품질 관리, 발행 운영을 담당하는 내부 편집 주체',
    'active'
  ),
  (
    'policy-reviewer-placeholder',
    '문화정책 검수자(가칭)',
    '문화정책·거버넌스 검수',
    '문화정책, 공론장, 입법 지원, 구조개혁 관련 콘텐츠의 정확성과 논리 구조를 점검하는 검수자 placeholder',
    'active'
  ),
  (
    'philosophy-reviewer-placeholder',
    '문화철학 검수자(가칭)',
    '문화철학·비평 검수',
    'K-문명, 한국성, 인정, 철학적 해석, 대담형 콘텐츠를 검수하는 검수자 placeholder',
    'active'
  ),
  (
    'local-culture-reviewer-placeholder',
    '지역문화 검수자(가칭)',
    '지역문화·문화자치 검수',
    '지역문화 생태계, 문화자치, 지역 사례의 정책화 관련 콘텐츠를 검수하는 검수자 placeholder',
    'active'
  )
on conflict (slug) do update
set
  name = excluded.name,
  headline = excluded.headline,
  bio_short = excluded.bio_short,
  status = excluded.status,
  updated_at = now();

-- ---------------------------------------------------------
-- 2) content_people for stories
-- ---------------------------------------------------------
with
stories as (
  select id, slug
  from public.stories
  where slug in (
    'k-civilization-possibility-culture-state-system',
    'bts-music-philosophy-k-culture-special-dialogue',
    'why-cultural-policy-structural-reform-is-needed',
    'how-regional-culture-transition-becomes-policy'
  )
),
people as (
  select id, slug
  from public.people
  where slug in (
    'kim-jaejun',
    'huh-kyung',
    'mungang-editor-desk',
    'policy-reviewer-placeholder',
    'philosophy-reviewer-placeholder',
    'local-culture-reviewer-placeholder'
  )
),
roles as (
  select id, slug
  from public.people_roles
  where slug in ('author', 'editor', 'reviewer', 'interviewer', 'guest')
),
pairs(content_type, story_slug, person_slug, role_slug, display_order) as (
  values
    -- 1) K-문명의 가능성
    ('story', 'k-civilization-possibility-culture-state-system', 'kim-jaejun', 'author', 10),
    ('story', 'k-civilization-possibility-culture-state-system', 'mungang-editor-desk', 'editor', 20),
    ('story', 'k-civilization-possibility-culture-state-system', 'philosophy-reviewer-placeholder', 'reviewer', 30),

    -- 2) BTS 대담
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'kim-jaejun', 'interviewer', 10),
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'huh-kyung', 'guest', 20),
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'mungang-editor-desk', 'editor', 30),
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'philosophy-reviewer-placeholder', 'reviewer', 40),

    -- 3) 문화정책 구조개혁
    ('story', 'why-cultural-policy-structural-reform-is-needed', 'kim-jaejun', 'author', 10),
    ('story', 'why-cultural-policy-structural-reform-is-needed', 'mungang-editor-desk', 'editor', 20),
    ('story', 'why-cultural-policy-structural-reform-is-needed', 'policy-reviewer-placeholder', 'reviewer', 30),

    -- 4) 지역문화대전환
    ('story', 'how-regional-culture-transition-becomes-policy', 'kim-jaejun', 'author', 10),
    ('story', 'how-regional-culture-transition-becomes-policy', 'mungang-editor-desk', 'editor', 20),
    ('story', 'how-regional-culture-transition-becomes-policy', 'local-culture-reviewer-placeholder', 'reviewer', 30)
)
insert into public.content_people (
  content_type,
  content_id,
  person_id,
  role_id,
  display_order
)
select
  p.content_type,
  s.id,
  pe.id,
  r.id,
  p.display_order
from pairs p
join stories s on s.slug = p.story_slug
join people pe on pe.slug = p.person_slug
join roles r on r.slug = p.role_slug
where not exists (
  select 1
  from public.content_people cp
  where cp.content_type = p.content_type
    and cp.content_id = s.id
    and cp.person_id = pe.id
    and cp.role_id = r.id
);

-- ---------------------------------------------------------
-- 3) content_people for answers
--    원칙:
--    - answer는 기본적으로 문강 편집데스크를 author로 연결
--    - 주제에 따라 reviewer를 분기
-- ---------------------------------------------------------
with
answers as (
  select id, slug
  from public.answers
  where slug in (
    'what-is-culture-power-network',
    'what-is-mungang-rio',
    'what-is-cultural-power',
    'what-is-k-civilization',
    'why-cultural-policy-structural-reform',
    'what-does-data-lab-provide',
    'what-can-you-get-from-mungang',
    'what-does-regional-culture-transition-mean',
    'what-are-core-tasks-for-artist-welfare',
    'where-does-k-culture-power-come-from',
    'what-is-philosophical-democracy-by-huh-kyung'
  )
),
people as (
  select id, slug
  from public.people
  where slug in (
    'mungang-editor-desk',
    'policy-reviewer-placeholder',
    'philosophy-reviewer-placeholder',
    'local-culture-reviewer-placeholder'
  )
),
roles as (
  select id, slug
  from public.people_roles
  where slug in ('author', 'reviewer')
),
pairs(content_type, answer_slug, person_slug, role_slug, display_order) as (
  values
    -- author 공통
    ('answer', 'what-is-culture-power-network', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-is-mungang-rio', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-is-cultural-power', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-is-k-civilization', 'mungang-editor-desk', 'author', 10),
    ('answer', 'why-cultural-policy-structural-reform', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-does-data-lab-provide', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-can-you-get-from-mungang', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-does-regional-culture-transition-mean', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-are-core-tasks-for-artist-welfare', 'mungang-editor-desk', 'author', 10),
    ('answer', 'where-does-k-culture-power-come-from', 'mungang-editor-desk', 'author', 10),
    ('answer', 'what-is-philosophical-democracy-by-huh-kyung', 'mungang-editor-desk', 'author', 10),

    -- reviewer
    ('answer', 'what-is-culture-power-network', 'policy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-is-mungang-rio', 'policy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-is-cultural-power', 'policy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-is-k-civilization', 'philosophy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'why-cultural-policy-structural-reform', 'policy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-does-data-lab-provide', 'policy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-can-you-get-from-mungang', 'policy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-does-regional-culture-transition-mean', 'local-culture-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-are-core-tasks-for-artist-welfare', 'policy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'where-does-k-culture-power-come-from', 'philosophy-reviewer-placeholder', 'reviewer', 20),
    ('answer', 'what-is-philosophical-democracy-by-huh-kyung', 'philosophy-reviewer-placeholder', 'reviewer', 20)
)
insert into public.content_people (
  content_type,
  content_id,
  person_id,
  role_id,
  display_order
)
select
  p.content_type,
  a.id,
  pe.id,
  r.id,
  p.display_order
from pairs p
join answers a on a.slug = p.answer_slug
join people pe on pe.slug = p.person_slug
join roles r on r.slug = p.role_slug
where not exists (
  select 1
  from public.content_people cp
  where cp.content_type = p.content_type
    and cp.content_id = a.id
    and cp.person_id = pe.id
    and cp.role_id = r.id
);

-- ---------------------------------------------------------
-- 4) content_reviews for stories
--    초기 데모용으로 approved 상태의 검수 로그를 넣음
-- ---------------------------------------------------------
with
stories as (
  select id, slug
  from public.stories
  where slug in (
    'k-civilization-possibility-culture-state-system',
    'bts-music-philosophy-k-culture-special-dialogue',
    'why-cultural-policy-structural-reform-is-needed',
    'how-regional-culture-transition-becomes-policy'
  )
),
reviewers as (
  select id, slug
  from public.people
  where slug in (
    'policy-reviewer-placeholder',
    'philosophy-reviewer-placeholder',
    'local-culture-reviewer-placeholder'
  )
),
pairs(content_type, story_slug, reviewer_slug, review_status, review_note) as (
  values
    ('story', 'k-civilization-possibility-culture-state-system', 'philosophy-reviewer-placeholder', 'approved', '초기 데모용 철학·개념 검수 완료'),
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'philosophy-reviewer-placeholder', 'approved', '초기 데모용 대담·개념 검수 완료'),
    ('story', 'why-cultural-policy-structural-reform-is-needed', 'policy-reviewer-placeholder', 'approved', '초기 데모용 정책 해설 검수 완료'),
    ('story', 'how-regional-culture-transition-becomes-policy', 'local-culture-reviewer-placeholder', 'approved', '초기 데모용 지역문화 관점 검수 완료')
)
insert into public.content_reviews (
  content_type,
  content_id,
  reviewer_person_id,
  review_status,
  review_note,
  reviewed_at
)
select
  p.content_type,
  s.id,
  r.id,
  p.review_status,
  p.review_note,
  now()
from pairs p
join stories s on s.slug = p.story_slug
join reviewers r on r.slug = p.reviewer_slug
where not exists (
  select 1
  from public.content_reviews cr
  where cr.content_type = p.content_type
    and cr.content_id = s.id
    and cr.reviewer_person_id = r.id
);

-- ---------------------------------------------------------
-- 5) content_reviews for answers
-- ---------------------------------------------------------
with
answers as (
  select id, slug
  from public.answers
  where slug in (
    'what-is-culture-power-network',
    'what-is-mungang-rio',
    'what-is-cultural-power',
    'what-is-k-civilization',
    'why-cultural-policy-structural-reform',
    'what-does-data-lab-provide',
    'what-can-you-get-from-mungang',
    'what-does-regional-culture-transition-mean',
    'what-are-core-tasks-for-artist-welfare',
    'where-does-k-culture-power-come-from',
    'what-is-philosophical-democracy-by-huh-kyung'
  )
),
reviewers as (
  select id, slug
  from public.people
  where slug in (
    'policy-reviewer-placeholder',
    'philosophy-reviewer-placeholder',
    'local-culture-reviewer-placeholder'
  )
),
pairs(content_type, answer_slug, reviewer_slug, review_status, review_note) as (
  values
    ('answer', 'what-is-culture-power-network', 'policy-reviewer-placeholder', 'approved', '초기 데모용 단체 정의 검수 완료'),
    ('answer', 'what-is-mungang-rio', 'policy-reviewer-placeholder', 'approved', '초기 데모용 플랫폼 정의 검수 완료'),
    ('answer', 'what-is-cultural-power', 'policy-reviewer-placeholder', 'approved', '초기 데모용 개념 정의 검수 완료'),
    ('answer', 'what-is-k-civilization', 'philosophy-reviewer-placeholder', 'approved', '초기 데모용 문화철학 검수 완료'),
    ('answer', 'why-cultural-policy-structural-reform', 'policy-reviewer-placeholder', 'approved', '초기 데모용 정책 구조 검수 완료'),
    ('answer', 'what-does-data-lab-provide', 'policy-reviewer-placeholder', 'approved', '초기 데모용 데이터 레이어 정의 검수 완료'),
    ('answer', 'what-can-you-get-from-mungang', 'policy-reviewer-placeholder', 'approved', '초기 데모용 서비스 정의 검수 완료'),
    ('answer', 'what-does-regional-culture-transition-mean', 'local-culture-reviewer-placeholder', 'approved', '초기 데모용 지역문화 관점 검수 완료'),
    ('answer', 'what-are-core-tasks-for-artist-welfare', 'policy-reviewer-placeholder', 'approved', '초기 데모용 정책 과제 검수 완료'),
    ('answer', 'where-does-k-culture-power-come-from', 'philosophy-reviewer-placeholder', 'approved', '초기 데모용 문화철학 검수 완료'),
    ('answer', 'what-is-philosophical-democracy-by-huh-kyung', 'philosophy-reviewer-placeholder', 'approved', '초기 데모용 개념 검수 완료')
)
insert into public.content_reviews (
  content_type,
  content_id,
  reviewer_person_id,
  review_status,
  review_note,
  reviewed_at
)
select
  p.content_type,
  a.id,
  r.id,
  p.review_status,
  p.review_note,
  now()
from pairs p
join answers a on a.slug = p.answer_slug
join reviewers r on r.slug = p.reviewer_slug
where not exists (
  select 1
  from public.content_reviews cr
  where cr.content_type = p.content_type
    and cr.content_id = a.id
    and cr.reviewer_person_id = r.id
);

commit;