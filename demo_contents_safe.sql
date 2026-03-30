-- =========================================================
-- 문화강국 AI홈페이지 / 문강 Media SSoT
-- demo_contents_safe.sql (통합본)
-- =========================================================

begin;

-- [PART 1: PEOPLE ROLES]
insert into public.people_roles (slug, name_ko, description) values
  ('author', '작성자', '콘텐츠를 작성한 주요 저자'),
  ('editor', '편집자', '콘텐츠를 기획하고 편집한 편집자'),
  ('reviewer', '검수자', '콘텐츠 내용을 검수한 검수자'),
  ('interviewer', '인터뷰어', '대담/초대석 진행자'),
  ('guest', '게스트', '초대 손님')
on conflict (slug) do nothing;

-- [PART 2: ANSWERS BULK]
-- =========================================================
-- 문화강국 AI홈페이지 / 문강 Media SSoT
-- answers_bulk_seed.sql
-- ---------------------------------------------------------
-- 목적:
--   1) answer 11건 일괄 upsert
--   2) primary topic / answer_topics 연결
--   3) tags 보강 및 answer_tags 연결
--   4) author / reviewer 엔티티 연결
--   5) content_reviews 생성
--   6) related-answer 그래프 생성
--
-- 전제:
--   - migration v1 또는 동등한 스키마가 이미 적용되어 있어야 함
--   - public.workflow_statuses / categories / boundary_types / topics /
--     tags / people / people_roles / answers / answer_topics /
--     answer_tags / content_people / content_reviews /
--     content_related_links 가 존재해야 함
--
-- 실행 권장 순서:
--   1) migration v1
--   2) people/stories seed
--   3) 이 answers_bulk_seed.sql
--
-- 메모:
--   - 이 파일은 draft 기준 적재본이다.
--   - 공개 전에는 workflow_status를 published로 변경하고 published_at을 채운다.
-- =========================================================



-- ---------------------------------------------------------
-- 0) safety checks (optional)
-- ---------------------------------------------------------
-- select 'answers' as table_name where exists (select 1 from information_schema.tables where table_schema='public' and table_name='answers');

-- ---------------------------------------------------------
-- 1) supporting people upsert
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
-- 2) supporting tags upsert
-- ---------------------------------------------------------
insert into public.tags (slug, name_ko, description, status)
values
  ('culture-power-network', '문화강국네트워크', '문화강국네트워크 관련 태그', 'active'),
  ('mungang-rio', '문강 RIO', '문강 RIO 관련 태그', 'active'),
  ('cultural-power', '문화강국', '문화강국 관련 태그', 'active'),
  ('cultural-policy-reform', '문화정책 구조개혁', '문화정책 구조개혁 관련 태그', 'active'),
  ('data-lab', 'Data Lab', 'Data Lab 관련 태그', 'active'),
  ('regional-culture-transition', '지역문화대전환', '지역문화대전환 관련 태그', 'active'),
  ('practical-tools', '실무도구', '브리프·데이터·실무도구 관련 태그', 'active'),
  ('philosophical-democracy', '철학적 민주주의', '철학적 민주주의 관련 태그', 'active'),
  ('culture-power-report', '문화강국 리포트', '문화강국 리포트/아젠다 관련 태그', 'active')
on conflict (slug) do update
set
  name_ko = excluded.name_ko,
  description = excluded.description,
  status = excluded.status,
  updated_at = now();

-- ---------------------------------------------------------
-- 3) answer upsert
-- ---------------------------------------------------------
with refs as (
  select
    (select id from public.workflow_statuses where slug = 'draft') as ws_draft,
    (select id from public.categories where slug = 'faq') as cat_faq,
    (select id from public.boundary_types where slug = 'official-description') as bt_official,
    (select id from public.boundary_types where slug = 'editorial-analysis') as bt_editorial,
    (select id from public.boundary_types where slug = 'policy-interpretation') as bt_policy,
    (select id from public.topics where slug = 'cultural-power-strategy') as tp_cultural_power,
    (select id from public.topics where slug = 'cultural-policy-governance') as tp_policy_gov,
    (select id from public.topics where slug = 'local-culture-autonomy') as tp_local,
    (select id from public.topics where slug = 'cultural-industry-tech-transition') as tp_industry_tech,
    (select id from public.topics where slug = 'practical-tools-opportunities') as tp_tools,
    (select id from public.topics where slug = 'k-civilization-cultural-philosophy') as tp_k_civ
),
upsert_answers as (
  insert into public.answers (
    slug,
    title,
    summary,
    answer_short,
    answer_long,
    body_json,
    body_text,
    primary_topic_id,
    category_id,
    boundary_type_id,
    workflow_status_id,
    faq_jsonld,
    published_at
  )
  values
  (
    'what-is-culture-power-network',
    '문화강국네트워크는 어떤 단체인가?',
    '문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 2025년 3월 설립된 문화정책 네트워크다. 문화정책 연구와 공론장 형성, 국내외 문화교류를 통해 지역과 시민 중심의 문화정책 발전에 기여하고, 지속가능한 문화강국 대한민국을 만드는 것을 목표로 활동한다.',
    '문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 설립된 문화정책 네트워크다.',
    '이 단체는 문화정책 연구, 공론장 형성, 국내외 문화교류를 통해 지역과 시민 중심의 문화정책 발전에 기여하고, 지속가능한 문화강국 대한민국을 만드는 것을 목표로 한다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 설립된 문화정책 네트워크다. 지역과 시민 중심의 문화정책 발전을 위해 연구, 공론장 형성, 문화교류를 함께 추진한다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"주요 역할"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화정책 연구와 의제 정리"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"토론회·간담회 등 공론장 형성"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"국내외 문화교류 네트워크 구축"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"이 답변의 범위"}]},
        {"type":"paragraph","content":[{"type":"text","text":"이 답변은 단체의 공식 소개와 목적을 요약한 것이다. 세부 조직 구성, 사업 일정, 개별 행사 내용은 별도 페이지에서 확인하는 것이 적절하다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 설립된 문화정책 네트워크다. 지역과 시민 중심의 문화정책 발전을 위해 연구, 공론장 형성, 문화교류를 함께 추진한다.

## 주요 역할
- 문화정책 연구와 의제 정리
- 토론회·간담회 등 공론장 형성
- 국내외 문화교류 네트워크 구축

## 이 답변의 범위
이 답변은 단체의 공식 소개와 목적을 요약한 것이다. 세부 조직 구성, 사업 일정, 개별 행사 내용은 별도 페이지에서 확인하는 것이 적절하다.$$,
    (select tp_cultural_power from refs),
    (select cat_faq from refs),
    (select bt_official from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"문화강국네트워크는 어떤 단체인가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"문화강국네트워크는 문화자치와 문화분권의 실현을 목표로 2025년 3월 설립된 문화정책 네트워크다. 문화정책 연구와 공론장 형성, 국내외 문화교류를 통해 지역과 시민 중심의 문화정책 발전에 기여하고, 지속가능한 문화강국 대한민국을 만드는 것을 목표로 활동한다.",
          "url":"https://culturepower.network/answers/what-is-culture-power-network"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-is-mungang-rio',
    '문강 RIO는 무엇인가?',
    '문강 RIO는 문화강국 의제를 정책 설계, 현장 증명, 실용 도구의 구조로 번역하는 정책형 웹진이자 Media SSoT다. Reform·Implementation·Outcomes의 프레임을 바탕으로 기사, 정답카드, 브리프, 데이터, 캘린더를 연결해 읽는 구조를 지향한다.',
    '문강 RIO는 문화강국 의제를 정책 설계, 현장 증명, 실용 도구로 번역하는 정책형 웹진이다.',
    '문강 RIO는 Reform·Implementation·Outcomes의 프레임을 따라 문화강국 관련 질문을 구조화하고, 기사·정답카드·브리프·데이터를 연결하는 Media SSoT 서브 허브로 설계된다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문강 RIO는 문화강국 의제를 단순 기사나 평론이 아니라, 정책 설계와 현장 연결, 실무 활용이 가능한 구조로 재편하는 정책형 웹진이다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"RIO의 뜻"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Reform: 무엇을 바꿀 것인가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Implementation: 어떻게 실행할 것인가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Outcomes: 무엇이 달라질 것인가"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"문강이 제공하는 것"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"정책형 웹진 기사"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"정답카드와 실무형 One-Pager"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Data Lab과 지원사업 캘린더"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"이 답변의 범위"}]},
        {"type":"paragraph","content":[{"type":"text","text":"이 답변은 문강 RIO의 편집적 정의를 요약한 초안이다. 실제 섹션 구성과 발행 정책은 운영 과정에서 보완될 수 있다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

문강 RIO는 문화강국 의제를 단순 기사나 평론이 아니라, 정책 설계와 현장 연결, 실무 활용이 가능한 구조로 재편하는 정책형 웹진이다.

## RIO의 뜻
- Reform: 무엇을 바꿀 것인가
- Implementation: 어떻게 실행할 것인가
- Outcomes: 무엇이 달라질 것인가

## 문강이 제공하는 것
- 정책형 웹진 기사
- 정답카드와 실무형 One-Pager
- Data Lab과 지원사업 캘린더

## 이 답변의 범위
이 답변은 문강 RIO의 편집적 정의를 요약한 초안이다. 실제 섹션 구성과 발행 정책은 운영 과정에서 보완될 수 있다.$$,
    (select tp_cultural_power from refs),
    (select cat_faq from refs),
    (select bt_official from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"문강 RIO는 무엇인가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"문강 RIO는 문화강국 의제를 정책 설계, 현장 증명, 실용 도구의 구조로 번역하는 정책형 웹진이자 Media SSoT다. Reform·Implementation·Outcomes의 프레임을 바탕으로 기사, 정답카드, 브리프, 데이터, 캘린더를 연결해 읽는 구조를 지향한다.",
          "url":"https://culturepower.network/answers/what-is-mungang-rio"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-is-cultural-power',
    '문화강국이란 무엇인가?',
    '문화강국은 단순히 문화콘텐츠가 많이 수출되는 나라를 뜻하지 않는다. 문화의 힘이 국가의 방향과 시민의 삶, 지역의 자율성, 국제적 상상력에 실질적으로 작동하는 상태를 가리키며, 문화가 국가 전략과 공공성의 핵심 축으로 자리 잡는 것을 뜻한다.',
    '문화강국은 문화의 힘이 국가 전략과 시민의 삶에 실질적으로 작동하는 상태를 뜻한다.',
    '이 개념은 문화 수출의 성과만이 아니라, 문화정책, 지역문화, 공공성, 국제적 위상까지 함께 작동하는 구조를 포함한다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문화강국은 문화콘텐츠의 흥행 성과만으로 설명되지 않는다. 문화가 공공성, 정책, 지역, 산업, 국제적 위상과 결합해 장기적인 국가 역량으로 작동할 때 비로소 문화강국이라 부를 수 있다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"문화강국의 핵심 요소"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화정책과 공론장의 축적"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"지역과 시민 중심의 문화 생태계"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화의 국제적 확장과 교류 능력"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 중요한가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문화강국은 문화가 주변적 장식이 아니라, 국가의 방향과 사회의 지속가능성을 조직하는 중심 자원이 될 수 있는가를 묻는 개념이다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

문화강국은 문화콘텐츠의 흥행 성과만으로 설명되지 않는다. 문화가 공공성, 정책, 지역, 산업, 국제적 위상과 결합해 장기적인 국가 역량으로 작동할 때 비로소 문화강국이라 부를 수 있다.

## 문화강국의 핵심 요소
- 문화정책과 공론장의 축적
- 지역과 시민 중심의 문화 생태계
- 문화의 국제적 확장과 교류 능력

## 왜 중요한가
문화강국은 문화가 주변적 장식이 아니라, 국가의 방향과 사회의 지속가능성을 조직하는 중심 자원이 될 수 있는가를 묻는 개념이다.$$,
    (select tp_cultural_power from refs),
    (select cat_faq from refs),
    (select bt_policy from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"문화강국이란 무엇인가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"문화강국은 단순히 문화콘텐츠가 많이 수출되는 나라를 뜻하지 않는다. 문화의 힘이 국가의 방향과 시민의 삶, 지역의 자율성, 국제적 상상력에 실질적으로 작동하는 상태를 가리키며, 문화가 국가 전략과 공공성의 핵심 축으로 자리 잡는 것을 뜻한다.",
          "url":"https://culturepower.network/answers/what-is-cultural-power"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-is-k-civilization',
    'K-문명이란 무엇인가?',
    'K-문명은 한국의 문화적 영향력이 커졌다는 사실을 반복하는 말이 아니라, 감정의 생산·기술의 정밀성·제도의 설계가 한 사회 안에서 얼마나 의식적으로 통합될 수 있는가를 가리키는 분석 개념이다. 이미 완성된 실체가 아니라, 한국이 어떤 장기적 질서를 설계할 수 있는지를 묻는 열린 질문에 가깝다.',
    'K-문명은 감정·기술·제도의 통합 가능성을 묻는 분석 개념이다.',
    '이 개념은 한국의 문화적 영향력만을 강조하는 말이 아니라, 세계 속 한국의 특수한 위치와 그 가능성, 그리고 아직 미완인 과제를 함께 설명하려는 시도다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"K-문명은 한국 문화의 우월성을 선언하는 구호가 아니다. 감정의 생산, 기술의 정밀성, 제도의 설계가 하나의 장기적 체계로 연결될 수 있는가를 설명하기 위한 분석적 이름이다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"무엇을 함께 보려는 개념인가"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"세계인의 공명을 끌어내는 문화적 영향력"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"반도체·배터리·조선 설계 같은 기술 네트워크의 위치"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"이 둘을 장기적 질서로 엮는 제도 설계의 가능성"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"중요한 주의점"}]},
        {"type":"paragraph","content":[{"type":"text","text":"K-문명은 승리의 선언이 아니라 질문이다. 한국의 문화적 에너지를 어떻게 다루고 어떤 질서로 연결할 것인가를 묻는 개념으로 이해해야 한다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

K-문명은 한국 문화의 우월성을 선언하는 구호가 아니다. 감정의 생산, 기술의 정밀성, 제도의 설계가 하나의 장기적 체계로 연결될 수 있는가를 설명하기 위한 분석적 이름이다.

## 무엇을 함께 보려는 개념인가
- 세계인의 공명을 끌어내는 문화적 영향력
- 반도체·배터리·조선 설계 같은 기술 네트워크의 위치
- 이 둘을 장기적 질서로 엮는 제도 설계의 가능성

## 중요한 주의점
K-문명은 승리의 선언이 아니라 질문이다. 한국의 문화적 에너지를 어떻게 다루고 어떤 질서로 연결할 것인가를 묻는 개념으로 이해해야 한다.$$,
    (select tp_k_civ from refs),
    (select cat_faq from refs),
    (select bt_editorial from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"K-문명이란 무엇인가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"K-문명은 한국의 문화적 영향력이 커졌다는 사실을 반복하는 말이 아니라, 감정의 생산·기술의 정밀성·제도의 설계가 한 사회 안에서 얼마나 의식적으로 통합될 수 있는가를 가리키는 분석 개념이다. 이미 완성된 실체가 아니라, 한국이 어떤 장기적 질서를 설계할 수 있는지를 묻는 열린 질문에 가깝다.",
          "url":"https://culturepower.network/answers/what-is-k-civilization"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'why-cultural-policy-structural-reform',
    '문화정책 구조개혁은 왜 필요한가?',
    '문화정책 구조개혁은 중앙집중형 체계에서 지역과 시민 중심 체계로 전환하고, 문화정책을 일회성 사업이 아니라 장기적 생태계와 제도 설계의 문제로 다루기 위해 필요하다. 정책의 방향, 재정, 거버넌스, 입법 지원을 함께 재정비하지 않으면 문화강국의 성취도 지속되기 어렵다.',
    '문화정책 구조개혁은 지역과 시민 중심의 문화정책 체계를 만들기 위해 필요하다.',
    '문화정책을 지속가능한 구조로 바꾸려면 중앙집중형 운영, 단기성과 중심 사업, 약한 공론장과 제도 기반을 함께 손봐야 한다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문화정책 구조개혁은 문화정책을 중앙 중심의 일회성 사업 체계에서 지역과 시민 중심의 장기 생태계 설계로 전환하기 위해 필요하다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 구조개혁이 필요한가"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화정책의 방향과 지속 가능성을 다시 설계해야 하기 때문"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"지역문화 기반의 정책 제안과 연구를 제도적으로 뒷받침해야 하기 때문"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"공론장, 입법 지원, 재정과 거버넌스를 함께 다뤄야 하기 때문"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"구조개혁의 방향"}]},
        {"type":"paragraph","content":[{"type":"text","text":"핵심은 중앙집중형 문화정책에서 지역과 시민 중심의 정책 체계로 이동하고, 문화정책을 지속가능한 국가 전략의 일부로 재배치하는 데 있다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

문화정책 구조개혁은 문화정책을 중앙 중심의 일회성 사업 체계에서 지역과 시민 중심의 장기 생태계 설계로 전환하기 위해 필요하다.

## 왜 구조개혁이 필요한가
- 문화정책의 방향과 지속 가능성을 다시 설계해야 하기 때문
- 지역문화 기반의 정책 제안과 연구를 제도적으로 뒷받침해야 하기 때문
- 공론장, 입법 지원, 재정과 거버넌스를 함께 다뤄야 하기 때문

## 구조개혁의 방향
핵심은 중앙집중형 문화정책에서 지역과 시민 중심의 정책 체계로 이동하고, 문화정책을 지속가능한 국가 전략의 일부로 재배치하는 데 있다.$$,
    (select tp_policy_gov from refs),
    (select cat_faq from refs),
    (select bt_policy from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"문화정책 구조개혁은 왜 필요한가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"문화정책 구조개혁은 중앙집중형 체계에서 지역과 시민 중심 체계로 전환하고, 문화정책을 일회성 사업이 아니라 장기적 생태계와 제도 설계의 문제로 다루기 위해 필요하다. 정책의 방향, 재정, 거버넌스, 입법 지원을 함께 재정비하지 않으면 문화강국의 성취도 지속되기 어렵다.",
          "url":"https://culturepower.network/answers/why-cultural-policy-structural-reform"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-does-data-lab-provide',
    'Data Lab은 무엇을 제공하는가?',
    'Data Lab은 문강 RIO 안에서 기사와 브리프를 뒷받침하는 공용 데이터 레이어다. 핵심 지표, 출처와 기준일이 명시된 데이터 카드, 간단한 차트와 해석 노트를 제공해 정책 브리핑과 실무 검토에 바로 인용할 수 있는 구조를 지향한다.',
    'Data Lab은 문강 기사와 브리프를 뒷받침하는 공용 데이터 레이어다.',
    '핵심 지표와 차트, 출처와 기준일, 해석 노트를 함께 제공해 기사·브리프·정답카드와 연결되는 인용 가능한 데이터 허브를 만드는 것이 목적이다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"Data Lab은 문강의 기사와 브리프를 뒷받침하는 공용 데이터 레이어다. 단순 차트 모음이 아니라, 핵심 지표와 출처, 기준일, 해석 노트를 함께 제시해 실무자가 바로 참고할 수 있도록 설계된다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"무엇을 제공하는가"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"핵심 지표 카드"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"간단한 차트와 해석 노트"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"출처와 기준일이 명시된 데이터 요약"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"기사·브리프·정답카드와 연결되는 참고 자료"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 중요한가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"정책형 웹진은 해설만으로는 충분하지 않다. Data Lab은 콘텐츠의 신뢰성과 활용성을 높이기 위해 숫자와 근거를 구조적으로 제공하는 역할을 맡는다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

Data Lab은 문강의 기사와 브리프를 뒷받침하는 공용 데이터 레이어다. 단순 차트 모음이 아니라, 핵심 지표와 출처, 기준일, 해석 노트를 함께 제시해 실무자가 바로 참고할 수 있도록 설계된다.

## 무엇을 제공하는가
- 핵심 지표 카드
- 간단한 차트와 해석 노트
- 출처와 기준일이 명시된 데이터 요약
- 기사·브리프·정답카드와 연결되는 참고 자료

## 왜 중요한가
정책형 웹진은 해설만으로는 충분하지 않다. Data Lab은 콘텐츠의 신뢰성과 활용성을 높이기 위해 숫자와 근거를 구조적으로 제공하는 역할을 맡는다.$$,
    (select tp_tools from refs),
    (select cat_faq from refs),
    (select bt_official from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"Data Lab은 무엇을 제공하는가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"Data Lab은 문강 RIO 안에서 기사와 브리프를 뒷받침하는 공용 데이터 레이어다. 핵심 지표, 출처와 기준일이 명시된 데이터 카드, 간단한 차트와 해석 노트를 제공해 정책 브리핑과 실무 검토에 바로 인용할 수 있는 구조를 지향한다.",
          "url":"https://culturepower.network/answers/what-does-data-lab-provide"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-can-you-get-from-mungang',
    '문강에서 무엇을 얻을 수 있는가?',
    '문강에서는 문화강국 의제를 이해하는 해설 기사, 핵심 질문에 답하는 정답카드, 실무자가 빠르게 참고할 수 있는 One-Pager, 데이터 요약, 지원사업·행사 정보까지 함께 얻을 수 있다. 단순 읽을거리보다 정책·현장·실무를 연결하는 구조화된 콘텐츠를 제공하는 것이 핵심이다.',
    '문강은 기사, 정답카드, 브리프, 데이터, 행사 정보를 함께 제공하는 정책형 웹진이다.',
    '독자는 문강을 통해 문화강국 의제를 깊이 읽고, 필요한 답을 빠르게 확인하며, 실제 현장과 정책 논의에 활용할 수 있는 자료까지 연결해 얻을 수 있다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문강은 단순한 기사 모음이 아니라, 문화강국 의제를 기사·정답카드·브리프·데이터·행사 정보로 연결해 제공하는 정책형 웹진이다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"문강에서 얻을 수 있는 것"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"정책과 이슈를 이해하는 해설 기사"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"핵심 질문에 바로 답하는 정답카드"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"실무형 One-Pager와 브리프"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Data Lab과 지원사업·행사 정보"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"누구에게 유용한가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"국회와 지자체, 연구자, 현장 실무자, 문화산업 관계자, 문화정책에 관심 있는 독자에게 유용하다. 깊이 읽고 싶은 사람과 빠르게 참고하고 싶은 사람 모두를 함께 고려한 구조다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

문강은 단순한 기사 모음이 아니라, 문화강국 의제를 기사·정답카드·브리프·데이터·행사 정보로 연결해 제공하는 정책형 웹진이다.

## 문강에서 얻을 수 있는 것
- 정책과 이슈를 이해하는 해설 기사
- 핵심 질문에 바로 답하는 정답카드
- 실무형 One-Pager와 브리프
- Data Lab과 지원사업·행사 정보

## 누구에게 유용한가
국회와 지자체, 연구자, 현장 실무자, 문화산업 관계자, 문화정책에 관심 있는 독자에게 유용하다. 깊이 읽고 싶은 사람과 빠르게 참고하고 싶은 사람 모두를 함께 고려한 구조다.$$,
    (select tp_cultural_power from refs),
    (select cat_faq from refs),
    (select bt_official from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"문강에서 무엇을 얻을 수 있는가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"문강에서는 문화강국 의제를 이해하는 해설 기사, 핵심 질문에 답하는 정답카드, 실무자가 빠르게 참고할 수 있는 One-Pager, 데이터 요약, 지원사업·행사 정보까지 함께 얻을 수 있다. 단순 읽을거리보다 정책·현장·실무를 연결하는 구조화된 콘텐츠를 제공하는 것이 핵심이다.",
          "url":"https://culturepower.network/answers/what-can-you-get-from-mungang"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-does-regional-culture-transition-mean',
    '지역문화대전환은 무엇을 말하는가?',
    '지역문화대전환은 지역문화를 중앙 정책의 하위 집행 단위가 아니라, 지역 스스로 설계하고 순환시키는 문화 생태계의 문제로 다시 보자는 제안이다. 문화 생태계 진단, 문화자치, 사람이 머무는 지역, 지역문화 진흥의 주요 과제를 연속적으로 논의하는 순회토론회 흐름도 이 문제의식을 보여준다.',
    '지역문화대전환은 지역이 스스로 문화정책과 생태계를 설계해야 한다는 문제의식을 말한다.',
    '이는 지역문화의 현장 진단에서 출발해, 문화자치와 정주, 콘텐츠 순환, 지역문화 진흥 과제를 하나의 정책 전환 흐름으로 묶는 관점이다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"지역문화대전환은 지역문화를 중앙의 지시를 수행하는 단위가 아니라, 지역이 스스로 설계하고 순환시키는 생태계로 이해하자는 전환의 언어다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"무엇을 함께 묻는가"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"지역문화 생태계를 어떻게 진단할 것인가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화자치는 누가 어떻게 만드는가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"사람이 머무는 지역과 콘텐츠 순환은 어떻게 연결되는가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"대전환 시대의 지역문화 진흥 과제는 무엇인가"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 중요한가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"지역문화대전환은 지역 사례를 단순 미담으로 소비하지 않고, 지역이 문화정책의 주체가 되는 구조를 어떻게 만들 것인가를 묻는 데 의미가 있다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

지역문화대전환은 지역문화를 중앙의 지시를 수행하는 단위가 아니라, 지역이 스스로 설계하고 순환시키는 생태계로 이해하자는 전환의 언어다.

## 무엇을 함께 묻는가
- 지역문화 생태계를 어떻게 진단할 것인가
- 문화자치는 누가 어떻게 만드는가
- 사람이 머무는 지역과 콘텐츠 순환은 어떻게 연결되는가
- 대전환 시대의 지역문화 진흥 과제는 무엇인가

## 왜 중요한가
지역문화대전환은 지역 사례를 단순 미담으로 소비하지 않고, 지역이 문화정책의 주체가 되는 구조를 어떻게 만들 것인가를 묻는 데 의미가 있다.$$,
    (select tp_local from refs),
    (select cat_faq from refs),
    (select bt_policy from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"지역문화대전환은 무엇을 말하는가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"지역문화대전환은 지역문화를 중앙 정책의 하위 집행 단위가 아니라, 지역 스스로 설계하고 순환시키는 문화 생태계의 문제로 다시 보자는 제안이다. 문화 생태계 진단, 문화자치, 사람이 머무는 지역, 지역문화 진흥의 주요 과제를 연속적으로 논의하는 순회토론회 흐름도 이 문제의식을 보여준다.",
          "url":"https://culturepower.network/answers/what-does-regional-culture-transition-mean"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-are-core-tasks-for-artist-welfare',
    '예술인 복지의 핵심 과제는 무엇인가?',
    '예술인 복지의 핵심 과제는 단기 실적 중심 지원을 넘어, 예술가가 지속적으로 창작하고 생활할 수 있는 국가 시스템을 구축하는 데 있다. 특히 기초예술 진흥과 예술인 복지는 별개의 문제가 아니라, 제도·재정·전문 행정 역량을 함께 설계해야 하는 구조적 과제로 다뤄져야 한다.',
    '예술인 복지의 핵심 과제는 기초예술 진흥과 생활·창작 조건을 함께 떠받치는 국가 시스템을 만드는 일이다.',
    '재정 지원과 제도 지원의 우선순위를 바로 세우고, 문화 관련 법규와 행정을 담당하는 주체의 전문성을 높이며, 장기적 관점에서 예술 생태계를 지원하는 체계가 필요하다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"예술인 복지는 단순한 보조금 문제가 아니라, 기초예술 진흥과 예술가의 생활·창작 조건을 함께 떠받치는 국가 시스템의 문제다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 과제"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"기초예술 분야에 대한 재정·제도 지원 병행"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"단기 실적 위주 지원 구조의 재정비"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화정책과 행정을 담당하는 주체의 전문성 강화"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"장기적 관점의 창작 생태계 지원"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 중요한가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"예술인 복지를 구조적으로 설계하지 않으면 개별 성취는 있어도 생태계는 약해진다. 예술인 복지는 문화강국의 뿌리와 직결된 문제다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

예술인 복지는 단순한 보조금 문제가 아니라, 기초예술 진흥과 예술가의 생활·창작 조건을 함께 떠받치는 국가 시스템의 문제다.

## 핵심 과제
- 기초예술 분야에 대한 재정·제도 지원 병행
- 단기 실적 위주 지원 구조의 재정비
- 문화정책과 행정을 담당하는 주체의 전문성 강화
- 장기적 관점의 창작 생태계 지원

## 왜 중요한가
예술인 복지를 구조적으로 설계하지 않으면 개별 성취는 있어도 생태계는 약해진다. 예술인 복지는 문화강국의 뿌리와 직결된 문제다.$$,
    (select tp_policy_gov from refs),
    (select cat_faq from refs),
    (select bt_policy from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"예술인 복지의 핵심 과제는 무엇인가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"예술인 복지의 핵심 과제는 단기 실적 중심 지원을 넘어, 예술가가 지속적으로 창작하고 생활할 수 있는 국가 시스템을 구축하는 데 있다. 특히 기초예술 진흥과 예술인 복지는 별개의 문제가 아니라, 제도·재정·전문 행정 역량을 함께 설계해야 하는 구조적 과제로 다뤄져야 한다.",
          "url":"https://culturepower.network/answers/what-are-core-tasks-for-artist-welfare"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'where-does-k-culture-power-come-from',
    'K-컬처의 힘은 어디에서 오는가?',
    'K-컬처의 힘은 단순한 상업적 성공이 아니라, 한국 사회가 오랫동안 경험한 결핍과 인정 욕망, 높은 감정 밀도, 그리고 이를 집단적 훈련과 형식으로 전환하는 능력에서 나온다. 세계성과 한국성의 긴장을 창조적으로 다루는 방식도 중요한 힘의 원천이다.',
    'K-컬처의 힘은 감정의 밀도, 인정 욕망, 그리고 이를 형식화하는 집단적 역량에서 나온다.',
    '한국 문화는 상처와 열망, 리듬과 규율, 세계성과 한국성의 긴장을 함께 조직해 왔고, 그 과정이 세계적 공명을 만들어냈다는 해석이 가능하다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"K-컬처의 힘은 단순히 잘 팔리는 콘텐츠를 만드는 능력만이 아니라, 강한 감정의 에너지와 집단적 훈련, 세계성과 한국성의 긴장을 형식으로 조직하는 데서 나온다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"주요 원천"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"세계적 인정에 대한 강한 욕망과 리스펙트의 에너지"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"감정의 밀도와 서사의 응축력"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"집단적 훈련과 높은 형식 완성도"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"세계성과 한국성의 긴장을 창조적으로 다루는 방식"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"주의할 점"}]},
        {"type":"paragraph","content":[{"type":"text","text":"이 힘을 국수주의나 자기찬양으로만 읽으면 오히려 좁아진다. 중요한 것은 세계와 만나는 방식 속에서 한국적 성취를 갱신하는 일이다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

K-컬처의 힘은 단순히 잘 팔리는 콘텐츠를 만드는 능력만이 아니라, 강한 감정의 에너지와 집단적 훈련, 세계성과 한국성의 긴장을 형식으로 조직하는 데서 나온다.

## 주요 원천
- 세계적 인정에 대한 강한 욕망과 리스펙트의 에너지
- 감정의 밀도와 서사의 응축력
- 집단적 훈련과 높은 형식 완성도
- 세계성과 한국성의 긴장을 창조적으로 다루는 방식

## 주의할 점
이 힘을 국수주의나 자기찬양으로만 읽으면 오히려 좁아진다. 중요한 것은 세계와 만나는 방식 속에서 한국적 성취를 갱신하는 일이다.$$,
    (select tp_industry_tech from refs),
    (select cat_faq from refs),
    (select bt_editorial from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"K-컬처의 힘은 어디에서 오는가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"K-컬처의 힘은 단순한 상업적 성공이 아니라, 한국 사회가 오랫동안 경험한 결핍과 인정 욕망, 높은 감정 밀도, 그리고 이를 집단적 훈련과 형식으로 전환하는 능력에서 나온다. 세계성과 한국성의 긴장을 창조적으로 다루는 방식도 중요한 힘의 원천이다.",
          "url":"https://culturepower.network/answers/where-does-k-culture-power-come-from"
        }
      }]
    }
    $$::jsonb,
    null
  ),
  (
    'what-is-philosophical-democracy-by-huh-kyung',
    '허경이 말하는 철학적 민주주의란 무엇인가?',
    '허경이 말하는 철학적 민주주의란 장르나 취향 사이에 객관적 우열을 설정하지 않으면서도, 각 장르와 각 개인의 방식 안에서 깊이의 차이를 읽어내는 태도다. 음악을 통해 그는 분류와 편견을 절대화하지 않고, 서로 다른 형식의 성취를 그 자체의 기준 속에서 바라보는 감각을 민주주의의 한 훈련으로 설명한다.',
    '철학적 민주주의는 장르 간 우열을 절대화하지 않고 각자의 성취를 그 고유한 방식 안에서 보는 태도다.',
    '이는 음악 감상의 문제를 넘어, 사람과 사유를 인위적 위계로 재단하지 않고 편견 없이 이해하려는 태도로 확장된다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"핵심 요약"}]},
        {"type":"paragraph","content":[{"type":"text","text":"허경에게 철학적 민주주의는 장르나 취향 사이에 절대적 위계를 세우지 않고, 각 장르와 각 개인의 고유한 방식 안에서 성취를 바라보는 태도다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"무엇을 뜻하는가"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"클래식의 잣대로 메탈을, 재즈의 기준으로 팝을 폄하하지 않는 태도"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"장르를 절대적 실체가 아니라 이해를 돕는 참고용 분류로 보는 인식"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"다양한 형식을 편견 없이 접하며 사유를 넓히는 훈련"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 중요한가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"철학적 민주주의는 음악 감상의 태도처럼 보이지만, 실제로는 사람과 문화, 사유를 위계와 편견 없이 이해하는 방법에 대한 제안이다."}]}
      ]
    }
    $$::jsonb,
    $$## 핵심 요약

허경에게 철학적 민주주의는 장르나 취향 사이에 절대적 위계를 세우지 않고, 각 장르와 각 개인의 고유한 방식 안에서 성취를 바라보는 태도다.

## 무엇을 뜻하는가
- 클래식의 잣대로 메탈을, 재즈의 기준으로 팝을 폄하하지 않는 태도
- 장르를 절대적 실체가 아니라 이해를 돕는 참고용 분류로 보는 인식
- 다양한 형식을 편견 없이 접하며 사유를 넓히는 훈련

## 왜 중요한가
철학적 민주주의는 음악 감상의 태도처럼 보이지만, 실제로는 사람과 문화, 사유를 위계와 편견 없이 이해하는 방법에 대한 제안이다.$$,
    (select tp_k_civ from refs),
    (select cat_faq from refs),
    (select bt_editorial from refs),
    (select ws_draft from refs),
    $$
    {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[{
        "@type":"Question",
        "name":"허경이 말하는 철학적 민주주의란 무엇인가?",
        "acceptedAnswer":{
          "@type":"Answer",
          "text":"허경이 말하는 철학적 민주주의란 장르나 취향 사이에 객관적 우열을 설정하지 않으면서도, 각 장르와 각 개인의 방식 안에서 깊이의 차이를 읽어내는 태도다. 음악을 통해 그는 분류와 편견을 절대화하지 않고, 서로 다른 형식의 성취를 그 자체의 기준 속에서 바라보는 감각을 민주주의의 한 훈련으로 설명한다.",
          "url":"https://culturepower.network/answers/what-is-philosophical-democracy-by-huh-kyung"
        }
      }]
    }
    $$::jsonb,
    null
  )
  on conflict (slug) do update
  set
    title = excluded.title,
    summary = excluded.summary,
    answer_short = excluded.answer_short,
    answer_long = excluded.answer_long,
    body_json = excluded.body_json,
    body_text = excluded.body_text,
    primary_topic_id = excluded.primary_topic_id,
    category_id = excluded.category_id,
    boundary_type_id = excluded.boundary_type_id,
    workflow_status_id = excluded.workflow_status_id,
    faq_jsonld = excluded.faq_jsonld,
    published_at = excluded.published_at,
    updated_at = now()
  returning id, slug, primary_topic_id
)
insert into public.answer_topics (answer_id, topic_id, is_primary)
select id, primary_topic_id, true
from upsert_answers
where primary_topic_id is not null
on conflict (answer_id, topic_id) do update
set is_primary = excluded.is_primary;

-- ---------------------------------------------------------
-- 4) answer_tags
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
tags as (
  select id, slug
  from public.tags
  where slug in (
    'culture-power-network',
    'mungang-rio',
    'cultural-power',
    'cultural-policy-reform',
    'data-lab',
    'regional-culture-transition',
    'artist-welfare',
    'k-culture',
    'k-civilization',
    'policy-design',
    'cultural-autonomy',
    'practical-tools',
    'philosophical-democracy',
    'recognition-struggle',
    'korean-identity',
    'ai-and-culture',
    'special-dialogue'
  )
),
pairs(answer_slug, tag_slug) as (
  values
    ('what-is-culture-power-network', 'culture-power-network'),
    ('what-is-culture-power-network', 'cultural-power'),
    ('what-is-culture-power-network', 'policy-design'),

    ('what-is-mungang-rio', 'mungang-rio'),
    ('what-is-mungang-rio', 'cultural-power'),
    ('what-is-mungang-rio', 'practical-tools'),

    ('what-is-cultural-power', 'cultural-power'),
    ('what-is-cultural-power', 'policy-design'),
    ('what-is-cultural-power', 'k-civilization'),

    ('what-is-k-civilization', 'k-civilization'),
    ('what-is-k-civilization', 'korean-identity'),
    ('what-is-k-civilization', 'policy-design'),

    ('why-cultural-policy-structural-reform', 'cultural-policy-reform'),
    ('why-cultural-policy-structural-reform', 'policy-design'),
    ('why-cultural-policy-structural-reform', 'cultural-autonomy'),

    ('what-does-data-lab-provide', 'data-lab'),
    ('what-does-data-lab-provide', 'practical-tools'),
    ('what-does-data-lab-provide', 'policy-design'),

    ('what-can-you-get-from-mungang', 'mungang-rio'),
    ('what-can-you-get-from-mungang', 'data-lab'),
    ('what-can-you-get-from-mungang', 'practical-tools'),

    ('what-does-regional-culture-transition-mean', 'regional-culture-transition'),
    ('what-does-regional-culture-transition-mean', 'cultural-autonomy'),
    ('what-does-regional-culture-transition-mean', 'policy-design'),

    ('what-are-core-tasks-for-artist-welfare', 'artist-welfare'),
    ('what-are-core-tasks-for-artist-welfare', 'cultural-policy-reform'),
    ('what-are-core-tasks-for-artist-welfare', 'policy-design'),

    ('where-does-k-culture-power-come-from', 'k-culture'),
    ('where-does-k-culture-power-come-from', 'recognition-struggle'),
    ('where-does-k-culture-power-come-from', 'korean-identity'),

    ('what-is-philosophical-democracy-by-huh-kyung', 'philosophical-democracy'),
    ('what-is-philosophical-democracy-by-huh-kyung', 'k-culture'),
    ('what-is-philosophical-democracy-by-huh-kyung', 'special-dialogue')
)
insert into public.answer_tags (answer_id, tag_id)
select a.id, t.id
from pairs p
join answers a on a.slug = p.answer_slug
join tags t on t.slug = p.tag_slug
on conflict (answer_id, tag_id) do nothing;

-- ---------------------------------------------------------
-- 5) content_people for answers
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
-- 6) content_reviews for answers
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

-- ---------------------------------------------------------
-- 7) related-answer graph
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
pairs(source_slug, target_slug, display_order) as (
  values
    ('what-is-culture-power-network', 'what-is-mungang-rio', 10),
    ('what-is-culture-power-network', 'what-is-cultural-power', 20),
    ('what-is-culture-power-network', 'why-cultural-policy-structural-reform', 30),

    ('what-is-mungang-rio', 'what-can-you-get-from-mungang', 10),
    ('what-is-mungang-rio', 'what-does-data-lab-provide', 20),
    ('what-is-mungang-rio', 'what-is-cultural-power', 30),

    ('what-is-cultural-power', 'why-cultural-policy-structural-reform', 10),
    ('what-is-cultural-power', 'what-does-regional-culture-transition-mean', 20),
    ('what-is-cultural-power', 'what-is-k-civilization', 30),

    ('what-is-k-civilization', 'where-does-k-culture-power-come-from', 10),
    ('what-is-k-civilization', 'what-is-philosophical-democracy-by-huh-kyung', 20),
    ('what-is-k-civilization', 'what-is-cultural-power', 30),

    ('where-does-k-culture-power-come-from', 'what-is-k-civilization', 10),
    ('where-does-k-culture-power-come-from', 'what-is-philosophical-democracy-by-huh-kyung', 20),
    ('where-does-k-culture-power-come-from', 'what-is-cultural-power', 30),

    ('what-is-philosophical-democracy-by-huh-kyung', 'where-does-k-culture-power-come-from', 10),
    ('what-is-philosophical-democracy-by-huh-kyung', 'what-is-k-civilization', 20),
    ('what-is-philosophical-democracy-by-huh-kyung', 'what-can-you-get-from-mungang', 30),

    ('why-cultural-policy-structural-reform', 'what-does-regional-culture-transition-mean', 10),
    ('why-cultural-policy-structural-reform', 'what-are-core-tasks-for-artist-welfare', 20),
    ('why-cultural-policy-structural-reform', 'what-is-cultural-power', 30),

    ('what-does-regional-culture-transition-mean', 'why-cultural-policy-structural-reform', 10),
    ('what-does-regional-culture-transition-mean', 'what-is-cultural-power', 20),
    ('what-does-regional-culture-transition-mean', 'what-can-you-get-from-mungang', 30),

    ('what-are-core-tasks-for-artist-welfare', 'why-cultural-policy-structural-reform', 10),
    ('what-are-core-tasks-for-artist-welfare', 'what-is-cultural-power', 20),
    ('what-are-core-tasks-for-artist-welfare', 'what-does-regional-culture-transition-mean', 30),

    ('what-does-data-lab-provide', 'what-is-mungang-rio', 10),
    ('what-does-data-lab-provide', 'what-can-you-get-from-mungang', 20),
    ('what-does-data-lab-provide', 'what-is-cultural-power', 30),

    ('what-can-you-get-from-mungang', 'what-is-mungang-rio', 10),
    ('what-can-you-get-from-mungang', 'what-does-data-lab-provide', 20),
    ('what-can-you-get-from-mungang', 'what-is-culture-power-network', 30)
),
dedup as (
  select distinct source_slug, target_slug, display_order
  from pairs
)
insert into public.content_related_links (
  source_content_type,
  source_content_id,
  target_content_type,
  target_content_id,
  relation_type,
  display_order
)
select
  'answer',
  s.id,
  'answer',
  t.id,
  'related-answer',
  d.display_order
from dedup d
join answers s on s.slug = d.source_slug
join answers t on t.slug = d.target_slug
where s.id <> t.id
  and not exists (
    select 1
    from public.content_related_links crl
    where crl.source_content_type = 'answer'
      and crl.source_content_id = s.id
      and crl.target_content_type = 'answer'
      and crl.target_content_id = t.id
      and crl.relation_type = 'related-answer'
  );




-- [PART 3: STORIES BULK]
-- =========================================================
-- 문화강국 AI홈페이지 / 문강 Media SSoT
-- stories_bulk_seed.sql
-- ---------------------------------------------------------
-- 목적:
--   1) story 4건 일괄 upsert
--   2) primary / secondary topic 연결
--   3) story_tags 연결
--   4) author / interviewer / guest / editor / reviewer 연결
--   5) content_reviews 생성
--   6) story ↔ answer / story ↔ story related graph 생성
--
-- 전제:
--   - migration v1 또는 동등한 스키마가 이미 적용되어 있어야 함
--   - stories / people / topics / sections / categories / boundary_types /
--     series / people_roles / media_assets / story_topics / story_tags /
--     content_people / content_reviews / content_related_links 존재
--   - answer 콘텐츠가 이미 적재되어 있으면 related-answer 링크까지 함께 생성됨
--
-- 메모:
--   - featured_image_asset_id, og_image_asset_id는 현재 null로 두고 후속 입력한다.
--   - body_json은 tiptap 편집 전 1차 draft 골격이다.
-- =========================================================



-- ---------------------------------------------------------
-- 1) supporting people upsert
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
    'kim-jaejun',
    '김재준',
    '경제학자, 문강 RIO 편집장',
    '문화와 국가 시스템, 문화정책 구조, 기술·감정·제도의 관계를 분석하는 필자이자 문강 RIO 편집장',
    'active'
  ),
  (
    'huh-kyung',
    '허경',
    '철학자',
    '프랑스 스트라스부르 대학에서 미셸 푸코 연구로 박사학위를 받았고, 철학학교 혜윰을 이끌며 철학과 음악, 민주주의의 접점을 탐구하는 철학자',
    'active'
  ),
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
-- 2) supporting tags upsert
-- ---------------------------------------------------------
insert into public.tags (slug, name_ko, description, status)
values
  ('k-culture', 'K-컬처', 'K-컬처 관련 태그', 'active'),
  ('k-civilization', 'K-문명', 'K-문명 관련 태그', 'active'),
  ('recognition-struggle', '인정투쟁', '인정/리스펙트 관련 태그', 'active'),
  ('korean-identity', '한국성', '한국성 관련 태그', 'active'),
  ('artist-welfare', '예술인 복지', '예술인 복지 관련 태그', 'active'),
  ('ai-and-culture', 'AI와 문화산업', 'AI와 문화산업 관련 태그', 'active'),
  ('cultural-autonomy', '문화자치', '문화자치 관련 태그', 'active'),
  ('policy-design', '정책 설계', '정책 설계 관련 태그', 'active'),
  ('special-dialogue', '특별 대담', '대담 특집 태그', 'active'),
  ('cultural-policy-reform', '문화정책 구조개혁', '문화정책 구조개혁 관련 태그', 'active'),
  ('regional-culture-transition', '지역문화대전환', '지역문화대전환 관련 태그', 'active'),
  ('culture-power', '문화강국', '문화강국 관련 태그', 'active')
on conflict (slug) do update
set
  name_ko = excluded.name_ko,
  description = excluded.description,
  status = excluded.status,
  updated_at = now();

-- ---------------------------------------------------------
-- 3) story upsert
-- ---------------------------------------------------------
with refs as (
  select
    (select id from public.workflow_statuses where slug = 'draft') as ws_draft,
    (select id from public.sections where slug = 'policy-insight') as sec_policy_insight,
    (select id from public.sections where slug = 'culture-people') as sec_culture_people,
    (select id from public.sections where slug = 'local-as-culture') as sec_local_as_culture,
    (select id from public.categories where slug = 'analysis') as cat_analysis,
    (select id from public.categories where slug = 'special-dialogue') as cat_special_dialogue,
    (select id from public.categories where slug = 'policy-insight') as cat_policy_insight,
    (select id from public.boundary_types where slug = 'editorial-analysis') as bt_editorial,
    (select id from public.boundary_types where slug = 'dialogue') as bt_dialogue,
    (select id from public.boundary_types where slug = 'policy-interpretation') as bt_policy,
    (select id from public.series where slug = 'k-civilization-debate') as ser_k_civ,
    (select id from public.series where slug = 'culture-people-dialogue') as ser_culture_people,
    (select id from public.series where slug = 'policy-forum-series') as ser_policy_forum,
    (select id from public.series where slug = 'regional-culture-transition') as ser_regional_transition,
    (select id from public.topics where slug = 'k-civilization-cultural-philosophy') as tp_k_civ,
    (select id from public.topics where slug = 'cultural-power-strategy') as tp_cultural_power,
    (select id from public.topics where slug = 'cultural-industry-tech-transition') as tp_industry_tech,
    (select id from public.topics where slug = 'people-field-artists') as tp_people,
    (select id from public.topics where slug = 'cultural-policy-governance') as tp_policy_gov,
    (select id from public.topics where slug = 'local-culture-autonomy') as tp_local
),
upsert_stories as (
  insert into public.stories (
    slug,
    title,
    subtitle,
    standfirst,
    summary,
    body_json,
    body_text,
    section_id,
    category_id,
    primary_topic_id,
    primary_series_id,
    featured_image_asset_id,
    author_display_name,
    meta_title,
    meta_description,
    canonical_url,
    og_title,
    og_description,
    og_image_asset_id,
    allow_indexing,
    include_in_llm,
    boundary_type_id,
    workflow_status_id,
    published_at
  )
  values
  (
    'k-civilization-possibility-culture-state-system',
    'K-문명의 가능성: 문화와 국가 시스템',
    '한국은 문화강국을 넘어 새로운 유형의 문명적 행위자가 될 수 있는가',
    '이 글은 K-문명을 한국 우월성의 선언이 아니라, 감정의 생산·기술의 정밀성·제도의 설계를 하나의 장기적 체계로 결합할 수 있는가를 묻는 분석 개념으로 제안한다.',
    'K-문명은 문화적 영향력의 확대를 반복하는 수사가 아니라, 한국이 감정·기술·제도를 하나의 지속 가능한 질서로 엮어낼 수 있는지를 묻는 분석적 질문이다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"질문의 출발점"}]},
        {"type":"paragraph","content":[{"type":"text","text":"이 글은 한국이 단지 문화 강국이나 제조 강국을 넘어, 새로운 유형의 문명적 행위자로 이해될 수 있는가를 묻는다. 핵심은 한국의 문화적 공명과 기술적 정밀성이 어떤 장기적 질서로 연결될 수 있는지에 있다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"문명과 문화의 구도 다시 보기"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문명은 규칙을 쓰고 문화는 특수를 주장한다는 오래된 이분법은 오늘 다시 검토될 필요가 있다. 한국은 규칙 설계의 중심에 있지 않으면서도 감정의 차원에서 세계인의 공명을 끌어낸 사회로 등장했다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"K-문명이라는 분석 개념"}]},
        {"type":"paragraph","content":[{"type":"text","text":"K-문명은 한국의 문화적 영향력이 커졌다는 사실의 반복이 아니다. 감정·기술·제도의 통합이 지속 가능한 질서로 발전할 수 있는가를 묻는 분석 개념이며, 소프트파워론이나 국가브랜딩론으로 환원되지 않는다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"감정의 수출과 기술의 이중 궤도"}]},
        {"type":"paragraph","content":[{"type":"text","text":"한국은 K-pop, 드라마, 웹툰 등으로 세계적 공명을 만들었고, 동시에 반도체·배터리·조선 설계 같은 기술 네트워크의 핵심 노드가 되었다. 이 병행성이야말로 한국 사례를 특별하게 만든다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"정직한 진단"}]},
        {"type":"paragraph","content":[{"type":"text","text":"그러나 한국은 아직 생산과 공명에서는 강하되, 규칙과 제도로 번역하는 단계에서는 중간에 머물러 있다. 속도는 있으나 깊이가 부족하고, 축적의 구조가 약하다는 점이 핵심 한계다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"정책적 과제"}]},
        {"type":"paragraph","content":[{"type":"text","text":"글은 교육의 재설계, 기초연구 장기 투자, 예술·건축·디자인의 중간 장치 구축, 감정 자산의 IP 생태계화, 기술 표준 참여를 핵심 과제로 제안한다. 통합을 설계하는 일이 한국의 다음 단계라는 것이 결론이다."}]}
      ]
    }
    $$::jsonb,
    $$## 질문의 출발점

이 글은 한국이 단지 문화 강국이나 제조 강국을 넘어, 새로운 유형의 문명적 행위자로 이해될 수 있는가를 묻는다. 핵심은 한국의 문화적 공명과 기술적 정밀성이 어떤 장기적 질서로 연결될 수 있는지에 있다.

## 문명과 문화의 구도 다시 보기

문명은 규칙을 쓰고 문화는 특수를 주장한다는 오래된 이분법은 오늘 다시 검토될 필요가 있다. 한국은 규칙 설계의 중심에 있지 않으면서도 감정의 차원에서 세계인의 공명을 끌어낸 사회로 등장했다.

## K-문명이라는 분석 개념

K-문명은 한국의 문화적 영향력이 커졌다는 사실의 반복이 아니다. 감정·기술·제도의 통합이 지속 가능한 질서로 발전할 수 있는가를 묻는 분석 개념이며, 소프트파워론이나 국가브랜딩론으로 환원되지 않는다.

## 감정의 수출과 기술의 이중 궤도

한국은 K-pop, 드라마, 웹툰 등으로 세계적 공명을 만들었고, 동시에 반도체·배터리·조선 설계 같은 기술 네트워크의 핵심 노드가 되었다. 이 병행성이야말로 한국 사례를 특별하게 만든다.

## 정직한 진단

그러나 한국은 아직 생산과 공명에서는 강하되, 규칙과 제도로 번역하는 단계에서는 중간에 머물러 있다. 속도는 있으나 깊이가 부족하고, 축적의 구조가 약하다는 점이 핵심 한계다.

## 정책적 과제

글은 교육의 재설계, 기초연구 장기 투자, 예술·건축·디자인의 중간 장치 구축, 감정 자산의 IP 생태계화, 기술 표준 참여를 핵심 과제로 제안한다. 통합을 설계하는 일이 한국의 다음 단계라는 것이 결론이다.$$,
    (select sec_policy_insight from refs),
    (select cat_analysis from refs),
    (select tp_k_civ from refs),
    (select ser_k_civ from refs),
    null,
    '김재준',
    'K-문명의 가능성: 한국은 문화강국을 넘어 문명적 행위자가 될 수 있는가',
    'K-문명은 한국 우월성의 선언이 아니라 감정·기술·제도의 통합 가능성을 묻는 분석 개념이다. 문화 수출, 기술 네트워크, 정책 설계를 함께 읽으며 한국의 다음 과제를 진단한다.',
    '/webzine/stories/k-civilization-possibility-culture-state-system',
    'K-문명의 가능성: 문화와 국가 시스템',
    '감정·기술·제도의 통합 가능성을 묻는 K-문명 분석 글',
    null,
    true,
    true,
    (select bt_editorial from refs),
    (select ws_draft from refs),
    null
  ),
  (
    'bts-music-philosophy-k-culture-special-dialogue',
    'BTS의 음악과 철학: K-컬처의 심연을 들여다보다',
    '허경·김재준 대담을 통해 K-컬처의 한국성, 인정, 혼종성, 비평 인프라를 다시 묻다',
    '이 대담은 BTS를 단순한 대중문화 현상이 아니라, 한국성이 어떻게 세계성과 만나는지, 음악적 실험과 인정투쟁이 어떤 방식으로 이어지는지, 그리고 K-컬처를 떠받칠 제도와 비평의 언어가 무엇인지를 묻는 텍스트다.',
    'BTS를 둘러싼 이 대담은 한국성, 인정, 혼종성, 제도와 비평의 문제를 통해 K-컬처의 성취와 한계를 함께 읽는다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"대담의 출발점"}]},
        {"type":"paragraph","content":[{"type":"text","text":"이 글은 철학자 허경과 문강 RIO 편집장 김재준의 대화를 통해 BTS의 음악과 K-컬처를 해설한다. 핵심은 BTS 자체를 평가하는 데 그치지 않고, 음악과 철학, 한국성과 세계성, 인정과 인프라의 문제를 함께 읽는 데 있다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"철학적 민주주의"}]},
        {"type":"paragraph","content":[{"type":"text","text":"허경은 음악을 통해 철학적 민주주의를 배웠다고 말한다. 장르 간 존재론적 우열은 없으며, 각 장르와 각 개인의 고유한 방식 안에서 성취를 봐야 한다는 태도가 그를 민주주의자로 만들었다는 설명이다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"BTS와 한국성"}]},
        {"type":"paragraph","content":[{"type":"text","text":"대담은 BTS의 아리랑 활용, 영어 가사, 미국 흑인음악 문법의 수용을 한국성의 상실로 보지 않는다. 오히려 세계성과 한국성의 긴장을 창조적으로 다루는 방식이 K-컬처의 강점이라는 해석을 제시한다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"리스펙트와 인정의 에너지"}]},
        {"type":"paragraph","content":[{"type":"text","text":"허경은 한국 문화의 동력으로 리스펙트, 곧 인정 욕망을 강조한다. 역사적 결핍과 오독, 폄하의 경험이 강한 에너지로 전환되었고, 그것이 세계적 공명의 중요한 배경이 되었다는 해석이다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"비평과 인프라의 과제"}]},
        {"type":"paragraph","content":[{"type":"text","text":"대담의 후반부는 K-컬처의 화려한 성취에 비해 이를 떠받칠 비평, 인문학, 제도적 인프라가 약하다는 점을 짚는다. '꽃은 피었으나 뿌리가 없다'는 은유는 문화강국 담론의 구조적 과제를 상징한다."}]}
      ]
    }
    $$::jsonb,
    $$## 대담의 출발점

이 글은 철학자 허경과 문강 RIO 편집장 김재준의 대화를 통해 BTS의 음악과 K-컬처를 해설한다. 핵심은 BTS 자체를 평가하는 데 그치지 않고, 음악과 철학, 한국성과 세계성, 인정과 인프라의 문제를 함께 읽는 데 있다.

## 철학적 민주주의

허경은 음악을 통해 철학적 민주주의를 배웠다고 말한다. 장르 간 존재론적 우열은 없으며, 각 장르와 각 개인의 고유한 방식 안에서 성취를 봐야 한다는 태도가 그를 민주주의자로 만들었다는 설명이다.

## BTS와 한국성

대담은 BTS의 아리랑 활용, 영어 가사, 미국 흑인음악 문법의 수용을 한국성의 상실로 보지 않는다. 오히려 세계성과 한국성의 긴장을 창조적으로 다루는 방식이 K-컬처의 강점이라는 해석을 제시한다.

## 리스펙트와 인정의 에너지

허경은 한국 문화의 동력으로 리스펙트, 곧 인정 욕망을 강조한다. 역사적 결핍과 오독, 폄하의 경험이 강한 에너지로 전환되었고, 그것이 세계적 공명의 중요한 배경이 되었다는 해석이다.

## 비평과 인프라의 과제

대담의 후반부는 K-컬처의 화려한 성취에 비해 이를 떠받칠 비평, 인문학, 제도적 인프라가 약하다는 점을 짚는다. '꽃은 피었으나 뿌리가 없다'는 은유는 문화강국 담론의 구조적 과제를 상징한다.$$,
    (select sec_culture_people from refs),
    (select cat_special_dialogue from refs),
    (select tp_people from refs),
    (select ser_culture_people from refs),
    null,
    '김재준',
    'BTS의 음악과 철학: K-컬처는 어떻게 세계성과 한국성을 함께 사유하는가',
    '허경과 김재준의 특별 대담을 통해 BTS의 음악, 한국성, 인정투쟁, 혼종성, 비평 인프라의 문제를 분석한다. BTS를 통해 K-컬처의 가능성과 한계를 함께 읽는 Culture People 대표 대담.',
    '/webzine/stories/bts-music-philosophy-k-culture-special-dialogue',
    'BTS의 음악과 철학: K-컬처의 심연을 들여다보다',
    '허경·김재준 대담으로 읽는 BTS와 K-컬처',
    null,
    true,
    true,
    (select bt_dialogue from refs),
    (select ws_draft from refs),
    null
  ),
  (
    'why-cultural-policy-structural-reform-is-needed',
    '문화정책 구조개혁은 왜 필요한가',
    '중앙집중형 문화정책에서 지역과 시민 중심의 장기 설계 체계로 전환해야 하는 이유',
    '이 글은 문화정책을 단기 사업의 묶음이 아니라 국가 전략과 지역 생태계, 공론장과 제도를 함께 설계하는 구조의 문제로 다시 본다. 문화강국을 말하려면 먼저 문화정책의 운영 방식과 재정, 거버넌스를 재배치해야 한다는 문제의식을 담고 있다.',
    '문화정책 구조개혁은 중앙 중심의 단기 사업 체계를 지역과 시민 중심의 장기 생태계 설계로 바꾸기 위해 필요하다. 문화정책의 방향, 재정, 공론장, 입법 지원을 함께 다뤄야 문화강국 담론도 실질적 기반을 가질 수 있다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 지금 문화정책 구조개혁인가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문화정책은 종종 개별 사업의 성과를 관리하는 행정 영역으로 다뤄져 왔다. 그러나 문화강국을 국가 비전으로 말하려면, 문화정책은 단기 성과를 넘어 지역과 시민 중심의 생태계를 설계하는 공공 전략으로 다시 정의되어야 한다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"중앙집중형 체계의 한계"}]},
        {"type":"paragraph","content":[{"type":"text","text":"중앙이 방향을 정하고 지역이 집행하는 구조에서는 지역의 특수성과 현장 문제를 충분히 반영하기 어렵다. 그 결과 문화정책은 일회성 사업 관리로 축소되고, 지역의 문화 생태계는 스스로 설계하고 순환할 힘을 갖기 어렵다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"구조개혁의 핵심 축"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화정책 공론장 조성 및 입법 지원"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"지역문화 기반의 정책 제안과 연구 강화"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"재정과 거버넌스의 지역·시민 중심 재설계"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"단기 실적 중심 구조를 넘어서는 장기 축적 체계"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"문화강국과 구조개혁의 관계"}]},
        {"type":"paragraph","content":[{"type":"text","text":"문화강국은 콘텐츠 몇 편의 흥행으로 성립하지 않는다. 문화정책이 공공성, 지역성, 산업, 교류를 함께 조직하는 장기 시스템으로 작동할 때 비로소 지속 가능한 문화강국의 기반이 생긴다."}]}
      ]
    }
    $$::jsonb,
    $$## 왜 지금 문화정책 구조개혁인가

문화정책은 종종 개별 사업의 성과를 관리하는 행정 영역으로 다뤄져 왔다. 그러나 문화강국을 국가 비전으로 말하려면, 문화정책은 단기 성과를 넘어 지역과 시민 중심의 생태계를 설계하는 공공 전략으로 다시 정의되어야 한다.

## 중앙집중형 체계의 한계

중앙이 방향을 정하고 지역이 집행하는 구조에서는 지역의 특수성과 현장 문제를 충분히 반영하기 어렵다. 그 결과 문화정책은 일회성 사업 관리로 축소되고, 지역의 문화 생태계는 스스로 설계하고 순환할 힘을 갖기 어렵다.

## 구조개혁의 핵심 축
- 문화정책 공론장 조성 및 입법 지원
- 지역문화 기반의 정책 제안과 연구 강화
- 재정과 거버넌스의 지역·시민 중심 재설계
- 단기 실적 중심 구조를 넘어서는 장기 축적 체계

## 문화강국과 구조개혁의 관계

문화강국은 콘텐츠 몇 편의 흥행으로 성립하지 않는다. 문화정책이 공공성, 지역성, 산업, 교류를 함께 조직하는 장기 시스템으로 작동할 때 비로소 지속 가능한 문화강국의 기반이 생긴다.$$,
    (select sec_policy_insight from refs),
    (select cat_policy_insight from refs),
    (select tp_policy_gov from refs),
    (select ser_policy_forum from refs),
    null,
    '김재준',
    '문화정책 구조개혁은 왜 필요한가: 문화강국을 위한 정책 설계의 전환',
    '문화정책 구조개혁은 중앙집중형 단기 사업 체계를 넘어 지역과 시민 중심의 장기 생태계 설계로 전환하기 위해 필요하다. 공론장, 입법 지원, 재정, 거버넌스를 함께 재배치해야 문화강국의 기반이 생긴다.',
    '/webzine/stories/why-cultural-policy-structural-reform-is-needed',
    '문화정책 구조개혁은 왜 필요한가',
    '문화강국을 위한 정책 구조 전환을 다루는 Policy Insight 기사',
    null,
    true,
    true,
    (select bt_policy from refs),
    (select ws_draft from refs),
    null
  ),
  (
    'how-regional-culture-transition-becomes-policy',
    '지역문화대전환은 어떻게 정책이 되는가',
    '현장 진단, 문화자치, 정주, 콘텐츠 순환, 진흥 과제를 하나의 정책 전환 흐름으로 묶는 법',
    '이 글은 지역문화대전환 순회토론회에서 제기된 네 개의 질문, 곧 지역문화 생태계 진단, 문화자치, 사람이 머무는 지역, 대전환 시대의 지역문화 진흥 과제를 하나의 정책 흐름으로 다시 읽는다. 지역 사례를 미담이 아니라 구조적 정책 자산으로 전환하는 길을 묻는다.',
    '지역문화대전환이 정책이 된다는 것은 지역문화를 중앙 지침의 하위 집행 단위가 아니라, 지역이 스스로 설계하고 순환시키는 생태계의 문제로 다시 보는 것이다. 현장 진단, 문화자치, 정주, 콘텐츠 순환, 진흥 과제를 하나의 전환 프레임으로 묶는 것이 핵심이다.',
    $$
    {
      "type":"doc",
      "content":[
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"지역문화대전환이라는 문제의식"}]},
        {"type":"paragraph","content":[{"type":"text","text":"지역문화대전환은 지역문화를 중앙 정책의 하위 집행 단위로 보는 시각에서 벗어나, 지역이 스스로 문화정책과 생태계를 설계할 수 있는 주체인가를 묻는 전환의 언어다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"순회토론회가 던진 네 가지 질문"}]},
        {"type":"bulletList","content":[
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"지역문화 생태계, 현장을 어떻게 진단할 것인가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"문화자치는 누가 만들고 어떻게 작동해야 하는가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"사람이 머무는 지역과 콘텐츠 순환은 어떻게 연결되는가"}]}]},
          {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"대전환 시대의 지역문화 진흥 과제는 무엇인가"}]}]}
        ]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"정책화의 핵심"}]},
        {"type":"paragraph","content":[{"type":"text","text":"지역문화 사례가 정책이 되려면, 개별 지역의 성취를 소개하는 데 그치지 않고 공통 구조와 제도적 조건을 추출해야 한다. 재정, 거버넌스, 문화자치, 정주, 교육, 콘텐츠 순환이 서로 연결된 하나의 정책 패키지로 재구성되어야 한다."}]},
        {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"왜 중요한가"}]},
        {"type":"paragraph","content":[{"type":"text","text":"지역문화대전환은 지역을 문화정책의 수혜 대상이 아니라 설계 주체로 다시 놓으려는 시도다. 문화강국은 중심의 집중만으로 성립하지 않으며, 지역이 문화가 되는 구조를 만들 때 더 두꺼운 기반을 갖게 된다."}]}
      ]
    }
    $$::jsonb,
    $$## 지역문화대전환이라는 문제의식

지역문화대전환은 지역문화를 중앙 정책의 하위 집행 단위로 보는 시각에서 벗어나, 지역이 스스로 문화정책과 생태계를 설계할 수 있는 주체인가를 묻는 전환의 언어다.

## 순회토론회가 던진 네 가지 질문
- 지역문화 생태계, 현장을 어떻게 진단할 것인가
- 문화자치는 누가 만들고 어떻게 작동해야 하는가
- 사람이 머무는 지역과 콘텐츠 순환은 어떻게 연결되는가
- 대전환 시대의 지역문화 진흥 과제는 무엇인가

## 정책화의 핵심

지역문화 사례가 정책이 되려면, 개별 지역의 성취를 소개하는 데 그치지 않고 공통 구조와 제도적 조건을 추출해야 한다. 재정, 거버넌스, 문화자치, 정주, 교육, 콘텐츠 순환이 서로 연결된 하나의 정책 패키지로 재구성되어야 한다.

## 왜 중요한가

지역문화대전환은 지역을 문화정책의 수혜 대상이 아니라 설계 주체로 다시 놓으려는 시도다. 문화강국은 중심의 집중만으로 성립하지 않으며, 지역이 문화가 되는 구조를 만들 때 더 두꺼운 기반을 갖게 된다.$$,
    (select sec_local_as_culture from refs),
    (select cat_analysis from refs),
    (select tp_local from refs),
    (select ser_regional_transition from refs),
    null,
    '김재준',
    '지역문화대전환은 어떻게 정책이 되는가: 현장 진단에서 지역 설계로',
    '지역문화대전환은 지역문화를 중앙 정책의 하위 집행 단위가 아니라, 지역이 스스로 설계하고 순환시키는 문화 생태계의 문제로 다시 보는 전환이다. 현장 진단, 문화자치, 정주, 콘텐츠 순환, 진흥 과제를 하나의 정책 흐름으로 묶는 것이 핵심이다.',
    '/webzine/stories/how-regional-culture-transition-becomes-policy',
    '지역문화대전환은 어떻게 정책이 되는가',
    '지역문화대전환 순회토론회 문제의식을 정책 흐름으로 재구성한 지역문화 대표 기사',
    null,
    true,
    true,
    (select bt_editorial from refs),
    (select ws_draft from refs),
    null
  )
  on conflict (slug) do update
  set
    title = excluded.title,
    subtitle = excluded.subtitle,
    standfirst = excluded.standfirst,
    summary = excluded.summary,
    body_json = excluded.body_json,
    body_text = excluded.body_text,
    section_id = excluded.section_id,
    category_id = excluded.category_id,
    primary_topic_id = excluded.primary_topic_id,
    primary_series_id = excluded.primary_series_id,
    author_display_name = excluded.author_display_name,
    meta_title = excluded.meta_title,
    meta_description = excluded.meta_description,
    canonical_url = excluded.canonical_url,
    og_title = excluded.og_title,
    og_description = excluded.og_description,
    allow_indexing = excluded.allow_indexing,
    include_in_llm = excluded.include_in_llm,
    boundary_type_id = excluded.boundary_type_id,
    workflow_status_id = excluded.workflow_status_id,
    updated_at = now()
  returning id, slug
)
select * from upsert_stories;

-- ---------------------------------------------------------
-- 4) story_topics
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
topics as (
  select id, slug
  from public.topics
  where slug in (
    'k-civilization-cultural-philosophy',
    'cultural-power-strategy',
    'cultural-industry-tech-transition',
    'people-field-artists',
    'cultural-policy-governance',
    'local-culture-autonomy'
  )
),
pairs(story_slug, topic_slug, is_primary) as (
  values
    ('k-civilization-possibility-culture-state-system', 'k-civilization-cultural-philosophy', true),
    ('k-civilization-possibility-culture-state-system', 'cultural-power-strategy', false),
    ('k-civilization-possibility-culture-state-system', 'cultural-industry-tech-transition', false),

    ('bts-music-philosophy-k-culture-special-dialogue', 'people-field-artists', true),
    ('bts-music-philosophy-k-culture-special-dialogue', 'k-civilization-cultural-philosophy', false),
    ('bts-music-philosophy-k-culture-special-dialogue', 'cultural-industry-tech-transition', false),

    ('why-cultural-policy-structural-reform-is-needed', 'cultural-policy-governance', true),
    ('why-cultural-policy-structural-reform-is-needed', 'cultural-power-strategy', false),

    ('how-regional-culture-transition-becomes-policy', 'local-culture-autonomy', true),
    ('how-regional-culture-transition-becomes-policy', 'cultural-policy-governance', false),
    ('how-regional-culture-transition-becomes-policy', 'cultural-power-strategy', false)
)
insert into public.story_topics (story_id, topic_id, is_primary)
select s.id, t.id, p.is_primary
from pairs p
join stories s on s.slug = p.story_slug
join topics t on t.slug = p.topic_slug
on conflict (story_id, topic_id) do update
set is_primary = excluded.is_primary;

-- ---------------------------------------------------------
-- 5) story_tags
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
tags as (
  select id, slug
  from public.tags
  where slug in (
    'k-civilization',
    'korean-identity',
    'ai-and-culture',
    'k-culture',
    'recognition-struggle',
    'special-dialogue',
    'cultural-policy-reform',
    'policy-design',
    'regional-culture-transition',
    'cultural-autonomy',
    'culture-power'
  )
),
pairs(story_slug, tag_slug) as (
  values
    ('k-civilization-possibility-culture-state-system', 'k-civilization'),
    ('k-civilization-possibility-culture-state-system', 'ai-and-culture'),
    ('k-civilization-possibility-culture-state-system', 'culture-power'),

    ('bts-music-philosophy-k-culture-special-dialogue', 'k-culture'),
    ('bts-music-philosophy-k-culture-special-dialogue', 'korean-identity'),
    ('bts-music-philosophy-k-culture-special-dialogue', 'recognition-struggle'),
    ('bts-music-philosophy-k-culture-special-dialogue', 'special-dialogue'),

    ('why-cultural-policy-structural-reform-is-needed', 'cultural-policy-reform'),
    ('why-cultural-policy-structural-reform-is-needed', 'policy-design'),
    ('why-cultural-policy-structural-reform-is-needed', 'culture-power'),

    ('how-regional-culture-transition-becomes-policy', 'regional-culture-transition'),
    ('how-regional-culture-transition-becomes-policy', 'cultural-autonomy'),
    ('how-regional-culture-transition-becomes-policy', 'policy-design')
)
insert into public.story_tags (story_id, tag_id)
select s.id, t.id
from pairs p
join stories s on s.slug = p.story_slug
join tags t on t.slug = p.tag_slug
on conflict (story_id, tag_id) do nothing;

-- ---------------------------------------------------------
-- 6) content_people for stories
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
    ('story', 'k-civilization-possibility-culture-state-system', 'kim-jaejun', 'author', 10),
    ('story', 'k-civilization-possibility-culture-state-system', 'mungang-editor-desk', 'editor', 20),
    ('story', 'k-civilization-possibility-culture-state-system', 'philosophy-reviewer-placeholder', 'reviewer', 30),

    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'kim-jaejun', 'interviewer', 10),
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'huh-kyung', 'guest', 20),
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'mungang-editor-desk', 'editor', 30),
    ('story', 'bts-music-philosophy-k-culture-special-dialogue', 'philosophy-reviewer-placeholder', 'reviewer', 40),

    ('story', 'why-cultural-policy-structural-reform-is-needed', 'kim-jaejun', 'author', 10),
    ('story', 'why-cultural-policy-structural-reform-is-needed', 'mungang-editor-desk', 'editor', 20),
    ('story', 'why-cultural-policy-structural-reform-is-needed', 'policy-reviewer-placeholder', 'reviewer', 30),

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
-- 7) content_reviews for stories
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
-- 8) related graph: story -> answer / story -> story
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
answers as (
  select id, slug
  from public.answers
  where slug in (
    'what-is-cultural-power',
    'what-is-k-civilization',
    'where-does-k-culture-power-come-from',
    'what-is-philosophical-democracy-by-huh-kyung',
    'why-cultural-policy-structural-reform',
    'what-does-regional-culture-transition-mean',
    'what-are-core-tasks-for-artist-welfare',
    'what-can-you-get-from-mungang'
  )
),
story_answer_pairs(source_story_slug, target_answer_slug, relation_type, display_order) as (
  values
    ('k-civilization-possibility-culture-state-system', 'what-is-k-civilization', 'related-answer', 10),
    ('k-civilization-possibility-culture-state-system', 'what-is-cultural-power', 'related-answer', 20),
    ('k-civilization-possibility-culture-state-system', 'where-does-k-culture-power-come-from', 'related-answer', 30),

    ('bts-music-philosophy-k-culture-special-dialogue', 'what-is-philosophical-democracy-by-huh-kyung', 'related-answer', 10),
    ('bts-music-philosophy-k-culture-special-dialogue', 'where-does-k-culture-power-come-from', 'related-answer', 20),
    ('bts-music-philosophy-k-culture-special-dialogue', 'what-is-k-civilization', 'related-answer', 30),

    ('why-cultural-policy-structural-reform-is-needed', 'why-cultural-policy-structural-reform', 'related-answer', 10),
    ('why-cultural-policy-structural-reform-is-needed', 'what-are-core-tasks-for-artist-welfare', 'related-answer', 20),
    ('why-cultural-policy-structural-reform-is-needed', 'what-is-cultural-power', 'related-answer', 30),

    ('how-regional-culture-transition-becomes-policy', 'what-does-regional-culture-transition-mean', 'related-answer', 10),
    ('how-regional-culture-transition-becomes-policy', 'why-cultural-policy-structural-reform', 'related-answer', 20),
    ('how-regional-culture-transition-becomes-policy', 'what-can-you-get-from-mungang', 'related-answer', 30)
),
story_story_pairs(source_story_slug, target_story_slug, relation_type, display_order) as (
  values
    ('k-civilization-possibility-culture-state-system', 'why-cultural-policy-structural-reform-is-needed', 'related-story', 10),
    ('k-civilization-possibility-culture-state-system', 'bts-music-philosophy-k-culture-special-dialogue', 'related-story', 20),
    ('why-cultural-policy-structural-reform-is-needed', 'how-regional-culture-transition-becomes-policy', 'related-story', 10),
    ('how-regional-culture-transition-becomes-policy', 'why-cultural-policy-structural-reform-is-needed', 'related-story', 10),
    ('bts-music-philosophy-k-culture-special-dialogue', 'k-civilization-possibility-culture-state-system', 'related-story', 10)
)
insert into public.content_related_links (
  source_content_type,
  source_content_id,
  target_content_type,
  target_content_id,
  relation_type,
  display_order
)
select
  'story',
  s.id,
  'answer',
  a.id,
  p.relation_type,
  p.display_order
from story_answer_pairs p
join stories s on s.slug = p.source_story_slug
join answers a on a.slug = p.target_answer_slug
where not exists (
  select 1
  from public.content_related_links crl
  where crl.source_content_type = 'story'
    and crl.source_content_id = s.id
    and crl.target_content_type = 'answer'
    and crl.target_content_id = a.id
    and crl.relation_type = p.relation_type
)
union all
select
  'story',
  s1.id,
  'story',
  s2.id,
  p.relation_type,
  p.display_order
from story_story_pairs p
join stories s1 on s1.slug = p.source_story_slug
join stories s2 on s2.slug = p.target_story_slug
where s1.id <> s2.id
  and not exists (
    select 1
    from public.content_related_links crl
    where crl.source_content_type = 'story'
      and crl.source_content_id = s1.id
      and crl.target_content_type = 'story'
      and crl.target_content_id = s2.id
      and crl.relation_type = p.relation_type
  );




commit;
