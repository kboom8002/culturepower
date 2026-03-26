**09\_Answer Card·Story·TopicSummary 콘텐츠 계약서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지의 핵심 정본 객체인 **AnswerCard, Story, TopicSummary**가 무엇을 반드시 가져야 하는지, 무엇이 빠지면 공개하면 안 되는지, 그리고 서로 어떤 관계를 가져야 하는지를 **콘텐츠 계약서** 수준으로 고정하는 데 있다.  
즉, 이 문서는 “어떤 글을 잘 쓸 것인가”가 아니라, **어떤 객체가 어떤 최소 요건을 충족해야 문화강국네트워크의 공식 정본으로 인정되는가**를 정하는 문서다. 이는 B-SSoT 최소 정답 단위 정의와 hanjunho.ai의 Answer Card/기사형 해설 구분 원칙을 그대로 이어받는 방식이다.

이 문서는 다음을 해결해야 한다.

*   AnswerCard의 최소 구성은 무엇인가
*   Story는 단순 블로그 글이 아니라 어떤 정답 계약을 가져야 하는가
*   TopicSummary는 카테고리 소개문이 아니라 어떤 상위 정본 허브가 되어야 하는가
*   각 객체가 반드시 가져야 할 신뢰 필드는 무엇인가
*   객체들 사이의 관계는 어떻게 연결되는가
*   공개 전 어떤 lint 규칙을 통과해야 하는가

**2\. 콘텐츠 계약의 최상위 원칙**

**2-1. 콘텐츠는 페이지가 아니라 객체다**

문화강국네트워크 AI홈페이지에서 핵심은 “페이지를 채우는 글”이 아니라 **객체와 관계**다. 상세 페이지는 객체의 표현일 뿐이며, 진짜 핵심은 AnswerCard, Story, TopicSummary, Evidence, Reviewer, ChangeLog의 관계 구조다. 이는 B-SSoT의 객체 중심 사고 원칙과 동일하다.

**2-2. Answer-first를 계약 수준에서 강제한다**

모든 핵심 객체는 첫 화면에서 **질문과 핵심 답** 또는 **문제의식과 핵심 논지**가 보여야 한다. B-SSoT는 질문-정답-근거-검수-전환 구조를 중심으로 하고, hanjunho.ai도 상세 페이지 상단에 질문, 답, 요약, 쟁점이 먼저 보이도록 설계했습니다.

**2-3. 신뢰 필드는 선택이 아니라 필수다**

Reviewer, Evidence, Last Updated, Boundary, ChangeLog는 장식이 아니라 **계약 필드**다. Media 패밀리의 신뢰 방식이 편집권, 취재, 전문성, 출처 체인에 있기 때문이다. 따라서 이들 필드가 비어 있으면 공개하지 않는 것을 기본 원칙으로 둔다.

**2-4. Story는 정답의 확장이어야 한다**

Story는 독립 칼럼이 아니라 최소 1개 이상의 AnswerCard 또는 TopicSummary를 기반으로 해야 한다. hanjunho.ai에서 이슈브리핑이 기사형 해설 정본으로서 관련 정책 카드와 연결되도록 설계된 것과 같은 원리다.

**2-5. TopicSummary는 상위 의미 허브여야 한다**

TopicSummary는 단순 카테고리 설명문이 아니라, 대표 질문, 대표 정답, 대표 해설, 대표 행사·자료가 연결된 **상위 정본 허브**여야 한다. 이는 Media 패밀리의 topic summary 객체와 3 Pillars 기반 아젠다 허브 설계 원칙을 반영한 것이다.

**3\. 공통 콘텐츠 계약 구조**

세 객체 모두 아래 공통 필드를 우선적으로 가진다.

*   Title / Name
*   Primary Question or Core Thesis
*   Summary or Direct Answer
*   Evidence
*   Author / Editor / Reviewer
*   Last Updated
*   Related Objects
*   CTA
*   ChangeLog Reference

이 공통 구조는 B-SSoT의 최소 정답 단위와 hanjunho.ai의 상세 템플릿 구조를 문화강국네트워크형으로 일반화한 것이다.

**4\. AnswerCard 콘텐츠 계약**

**4-1. 객체 정의**

AnswerCard는 문화강국네트워크가 특정 질문에 대해 가장 압축적이고 공식적인 답을 제공하는 **정답 정본 객체**다.  
예를 들면 “문화강국이란 무엇인가”, “K-문명이란 무엇인가”, “문화강국네트워크는 어떤 단체인가”, “회원이 되면 무엇을 할 수 있는가” 같은 질문에 대응한다. B-SSoT 최소 정답 단위가 그대로 이 객체에 구현된다.

**4-2. 필수 필드**

*   Question
*   Official Answer
*   Snippet / Direct Answer
*   Category
*   Pillar
*   Evidence
*   Reviewer
*   Last Updated
*   CTA
*   Related Stories
*   ChangeLog Reference

AIO-PR 가이드도 Answer Card에 acceptedAnswer.text(≤120자), dateModified, citation|isBasedOn, reviewedBy, about(@id)가 필수라고 정리합니다. 또한 AC 규격을 “직답(≤120자) → Steps → Caution → Evidence → CTA”로 둡니다.

**4-3. 권장 필드**

*   Action Point 1~3
*   Context & Impact
*   Boundary Note
*   Related Events
*   Related Videos
*   Related TopicSummary
*   Confidence or Status

**4-4. 상단 구조 계약**

AnswerCard 상세 첫 화면에는 반드시 아래가 보여야 한다.

1.  질문
2.  2~3문장 직답
3.  Reviewer
4.  Last Updated
5.  Category / Pillar

hanjunho.ai Answer Card 상세가 “질문 → 3문장 답 → 실행 방안 → 근거 → 관련 카드” 흐름을 표준으로 잡았으므로, 문화강국네트워크도 이 구조를 유지하는 것이 가장 안정적이다.

**4-5. 길이 규칙**

*   Question: 한 문장, 자연어 중심
*   Direct Answer: 2~3문장, 120자 내외 요약 우선
*   Action Point: 항목당 1~2문장
*   Context & Impact: 길게 쓰되, 첫 2문단 안에 핵심이 보여야 함

**4-6. 공개 금지 조건**

아래 중 하나라도 비어 있으면 Public 금지로 본다.

*   Question 없음
*   Direct Answer 없음
*   Reviewer 없음
*   Last Updated 없음
*   최소 1개 이상의 Evidence 없음
*   CTA 없음

**4-7. 예시 적용**

예를 들어 “K-문명이란 무엇인가” 카드라면, 이 카드는 K-문명을 한국의 위대함을 선언하는 구호가 아니라, 감정·기술·제도의 통합이 지속 가능한 질서로 발전할 수 있는지를 묻는 **분석 개념**으로 정의해야 한다. 실제 원고가 이 정의를 분명히 제공하므로, 카드도 그 제한성을 그대로 반영해야 한다.

**5\. Story 콘텐츠 계약**

**5-1. 객체 정의**

Story는 문강 RIO에서 발행되는 기사형 해설 객체다.  
단순 소식이나 공지, 일반 칼럼이 아니라, 특정 질문이나 쟁점에 대해 개념·맥락·근거·정책 과제를 설명하는 **기사형 해설 정본**이다. 이는 hanjunho.ai의 “이슈브리핑 = 기사형 해설 정본 페이지” 원칙과 동일한 위치다.

**5-2. 필수 필드**

*   Title
*   Deck
*   Story Type
*   Section
*   Why This Matters
*   Primary Question or Core Thesis
*   Body
*   Based On Answers
*   Author
*   Reviewer
*   Last Updated
*   CTA

**5-3. 권장 필드**

*   Primary TopicSummary
*   Related Events
*   Related Videos
*   Related ArchiveDocuments
*   Boundary Note
*   Primary Source
*   Additional Sources
*   Pull Quote

**5-4. 상단 구조 계약**

Story 상세 첫 화면에는 반드시 아래가 보여야 한다.

1.  Section
2.  Story Type
3.  Title
4.  Deck
5.  Author / Reviewer / Last Updated
6.  Why This Matters
7.  Based On AnswerCard 최소 1개

hanjunho.ai 이슈브리핑 상세가 기사 출처, 요약, 핵심 쟁점, 해설 본문, 관련 정책 카드 구조를 가졌던 것처럼, 문강 RIO Story도 **질문/논지 → 요약 → 중요성 → 해설 → 관련 정답** 흐름을 상단부터 가져야 한다.

**5-5. 본문 구조 계약**

권장 본문 순서는 아래다.

*   질문 또는 문제의식
*   개념 정의
*   배경/역사/사례
*   현재 쟁점
*   과제 또는 열린 결론
*   관련 정답 / 관련 행사 / 자료 / 참여

실제 「K-문명의 가능성」은 바로 이 구조를 보여준다. 질문으로 시작해, 문명과 문화의 분석 구도를 정리하고, K-문명을 제한된 분석 개념으로 정의하며, 역사적·기술적·정책적 층위를 거쳐 “한국은 감정·기술·제도의 장기적 결합을 설계할 수 있는가”라는 열린 질문으로 닫습니다.

**5-6. 길이 규칙**

*   Deck: 2~3문장
*   Why This Matters: 2~4문장
*   본문: Story Type에 따라 가변, 단 첫 3문단 안에 질문·핵심 요지·맥락이 보여야 함

**5-7. 공개 금지 조건**

아래 중 하나라도 비어 있으면 Public 금지로 본다.

*   Deck 없음
*   Why This Matters 없음
*   Based On Answers 없음
*   Reviewer 없음
*   Last Updated 없음
*   CTA 없음

**5-8. Story와 AnswerCard의 차이**

*   AnswerCard는 **공식 답의 압축**
*   Story는 **공식 답의 서사적 확장**

즉 같은 질문군에 속할 수는 있지만, 역할은 다르다. AnswerCard가 정답을 먼저 보여주고, Story는 왜 그런 답이 필요한지 설명한다. 이 차이는 문화강국네트워크의 Media SSoT 구조를 안정적으로 운영하는 핵심 계약이다.

**6\. TopicSummary 콘텐츠 계약**

**6-1. 객체 정의**

TopicSummary는 상위 아젠다를 정리하는 허브형 정본 객체다.  
예: 문화강국, K-문명, 지역문화, 문화정책, 행사·기록, 참여·회원. Media 패밀리의 topic summary를 그대로 반영한다.

**6-2. 필수 필드**

*   Topic Name
*   One-line Definition
*   Summary Body
*   Primary Questions
*   Representative AnswerCards
*   Representative Stories
*   Pillar
*   Editor or Owner
*   Last Updated

**6-3. 권장 필드**

*   Representative Events
*   Representative Videos
*   Representative Experts
*   Boundary Note
*   Glossary Terms
*   Related Topics

**6-4. 상단 구조 계약**

TopicSummary 첫 화면에는 반드시 아래가 보여야 한다.

1.  Topic Name
2.  One-line Definition
3.  Primary Questions 3~5개
4.  Representative AnswerCards
5.  Last Updated

**6-5. 역할 계약**

TopicSummary는 아래 기능을 함께 수행해야 한다.

*   이 주제가 무엇인지 정의한다
*   이 주제에서 자주 던지는 질문을 보여준다
*   가장 먼저 봐야 할 AnswerCard를 연결한다
*   대표 Story, Event, Video로 확장한다
*   참여 또는 뉴스레터 CTA로 연결한다

즉 TopicSummary는 “카테고리 소개문”이 아니라, 정답카드·Story·행사·자료·참여를 연결하는 **상위 의미 허브**다. 이는 사용자의 Graph, not tree 원칙과 정확히 맞는다.

**6-6. 공개 금지 조건**

*   One-line Definition 없음
*   Primary Questions 없음
*   Representative AnswerCards 없음
*   Representative Stories 없음
*   Last Updated 없음

**7\. 세 객체의 관계 계약**

**7-1. 기본 관계**

*   TopicSummary는 여러 AnswerCard와 Story를 가진다.
*   AnswerCard는 최소 1개 이상의 Story와 연결된다.
*   Story는 최소 1개 이상의 AnswerCard를 기반으로 한다.
*   Story와 AnswerCard는 Event, Video, ArchiveDocument, Expert와 연결될 수 있다.
*   TopicSummary는 필요 시 MembershipPlan 또는 Newsletter CTA로 이어진다.

**7-2. 금지 관계**

*   Story가 어떤 AnswerCard와도 연결되지 않은 상태
*   TopicSummary가 대표 AnswerCard 없이 존재하는 상태
*   AnswerCard가 어떤 Story나 TopicSummary와도 연결되지 않은 상태

**7-3. 연결 우선순위**

1.  TopicSummary ↔ AnswerCard
2.  AnswerCard ↔ Story
3.  Story ↔ Event / Video / Archive
4.  TopicSummary / Story / AnswerCard ↔ Membership CTA

이 우선순위는 질문 허브 → 정답 → 해설 → 기록 → 행동이라는 공통 UX 원칙을 반영한다.

**8\. 신뢰 계약**

세 객체 모두 아래 trust layer 필드를 갖는다.

*   Author
*   Reviewer
*   Last Updated
*   Evidence
*   Boundary
*   ChangeLog Reference

**AnswerCard**

*   최소 1개 이상의 Evidence 필수
*   Reviewer 필수
*   Direct Answer와 Evidence가 직접 연결되어야 함

**Story**

*   Based On Answers 필수
*   직접 Evidence 또는 관련 자료 연결 필수
*   담론형 글은 Boundary Note 권장

**TopicSummary**

*   Editor 또는 Owner 필수
*   Representative object를 통해 신뢰를 간접 구성
*   Last Updated 필수

사용자의 AI홈페이지 공통 원칙은 Reviewer, Evidence, UpdatedAt, Boundary, ChangeLog를 핵심 신뢰 신호로 본다. 따라서 이 신뢰 계약은 콘텐츠 계약의 일부이지 부록이 아니다.

**9\. 메타·요약 계약**

hanjunho.ai AEO·SEO·Schema 문서는 허브 페이지는 범위를 잘 요약해야 하고, Answer Card 상세는 Snippet, 기사형 해설 상세는 Briefing Summary가 메타 설명의 핵심이라고 정리합니다.  
문화강국네트워크도 같은 원칙을 따른다.

**AnswerCard**

*   메타 설명은 Direct Answer / Snippet 재사용
*   질문형 요약 유지

**Story**

*   메타 설명은 Deck 재사용
*   기사형 해설 요약 유지

**TopicSummary**

*   메타 설명은 One-line Definition + Summary 1문장 조합
*   허브형 범위 요약 유지

핵심은 “메타가 본문을 대체하는 것”이 아니라, 이미 잘 만들어진 상단 요약을 메타에 재사용하는 방식이다.

**10\. 콘텐츠 lint 규칙**

공개 전 자동 또는 수동으로 아래를 점검한다.

**AnswerCard lint**

*   Question 없음
*   Direct Answer 0자
*   Reviewer 없음
*   Last Updated 없음
*   Evidence 없음
*   Category/Pillar 없음
*   Related Story 0개

**Story lint**

*   Deck 없음
*   Why This Matters 없음
*   Based On Answers 0개
*   Reviewer 없음
*   Last Updated 없음
*   CTA 없음
*   Section/Story Type 없음

**TopicSummary lint**

*   One-line Definition 없음
*   Primary Questions 0개
*   Representative AnswerCards 0개
*   Representative Stories 0개
*   Pillar 없음
*   Last Updated 없음

이런 lint 규칙이 있어야 “샘플 콘텐츠”, “임시 공개”, “고립 페이지”가 생기지 않는다. hanjunho.ai 문서도 공개 상태 관리와 상단 구조 점검을 매우 중요하게 다뤘다.

**11\. 예시 적용**

**11-1. AnswerCard 예시**

질문: **K-문명이란 무엇인가**  
직답: **K-문명은 한국의 위대함을 선언하는 구호가 아니라, 감정·기술·제도의 통합이 지속 가능한 질서로 발전할 수 있는지를 묻는 분석 개념이다.**  
근거: 문강 RIO 대표 글, 관련 토론회, 관련 자료  
CTA: 관련 해설 보기 / 관련 행사 보기 / 뉴스레터 구독  
이 정의는 실제 원고의 핵심 문장을 그대로 정답 객체에 맞게 압축한 것이다.

**11-2. Story 예시**

제목: **K-문명의 가능성: 문화와 국가 시스템**  
구조: 질문의 출발점 → 문명과 문화의 구도 → 문화가 문명이 되려 했을 때의 위험 → 한국의 독특한 위치 → 규칙 쓰기의 문제 → 열린 결론  
이 구조는 문강 RIO의 대표 Story가 어떤 계약을 가져야 하는지 보여주는 기준 사례다.

**11-3. TopicSummary 예시**

주제: **문화강국**  
One-line Definition: **문화강국은 문화의 인기를 넘어, 질문·정답·기록·정책·참여 구조까지 함께 설계하는 장기적 문화 질서의 과제다.**  
대표 질문: 문화강국이란 무엇인가 / 왜 지금 중요한가 / 어떤 정책 과제가 필요한가  
대표 객체: 관련 AnswerCard, 문강 RIO 대표 해설, 토론회 아카이브

**12\. 최종 결론**

이 콘텐츠 계약서의 핵심은 단순합니다.  
문화강국네트워크 AI홈페이지에서 **AnswerCard는 공식 정답의 최소 단위**, **Story는 그 정답의 기사형 해설 확장**, **TopicSummary는 상위 아젠다 정본 허브**여야 합니다. 그리고 이 세 객체는 모두 **Question, Answer or Thesis, Evidence, Reviewer, UpdatedAt, CTA, Related Objects**를 공유해야 합니다. 홈페이지 구성안이 웹진·행사·단체·회원 구조를 함께 요구하고, B-SSoT가 최소 정답 단위를 질문+정답+근거+책임+행동으로 정의하며, hanjunho.ai가 카드 상세와 기사형 해설 상세를 역할 분리해 설계한 점을 종합하면, 문화강국네트워크도 이 세 객체를 느슨한 게시물이 아니라 **계약된 정본 객체**로 운영하는 것이 가장 적합합니다.