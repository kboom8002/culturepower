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

begin;

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

commit;
