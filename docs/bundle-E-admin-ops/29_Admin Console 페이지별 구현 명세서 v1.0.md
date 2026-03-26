**29\_Admin Console 페이지별 구현 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console의 주요 페이지를 **실제 구현 가능한 화면 단위**로 정의하는 데 있다.

이 문서는 다음을 고정한다.

*   어떤 상위 메뉴 아래 어떤 페이지가 존재하는가
*   각 페이지의 목적은 무엇인가
*   어떤 위젯/테이블/폼/필터/액션이 필요한가
*   어떤 역할이 접근하고 어떤 액션을 실행할 수 있는가
*   어떤 페이지는 보기용이고, 어떤 페이지는 작업용인가
*   페이지들 사이의 이동과 drill-down은 어떻게 연결되는가

즉, 이 문서는 Admin Console의 **페이지 설계서이자 개발 구현 기준서**다.

**2\. 페이지 설계의 최상위 원칙**

**2.1 페이지는 객체보다 “운영 작업”을 기준으로 나눈다**

퍼블릭 사이트는 Topic, Answer, Story, Event 중심으로 보이지만, Admin은

*   Dashboard
*   Inbox
*   Review
*   Publishing
*   Participation
*   Fix-It  
    같은 운영 작업 중심으로 나뉘어야 한다.

**2.2 상세 페이지는 항상 “정보 + 액션” 구조를 가진다**

Admin 상세 페이지는 읽기 전용 문서 뷰가 아니라,

*   상태값
*   owner / reviewer
*   lint
*   related objects
*   publish readiness
*   fix-it  
    을 함께 보여줘야 한다.

**2.3 어떤 페이지에서도 다음 작업이 있어야 한다**

B-SSoT의 No dead-end, Graph, not tree 원칙은 Admin에도 적용된다.  
예:

*   Question 상세 → Answer 후보 생성
*   Story 상세 → Review 요청
*   Event 상세 → 자료 업로드
*   KPI 카드 → Fix-It 티켓 생성  
    으로 이어져야 한다.

**2.4 리스트와 상세를 모두 설계한다**

실무 운영에서는 리스트가 중요하다.  
따라서 모든 핵심 객체는

*   List page
*   Detail page
*   Create/Edit form  
    3종을 기본으로 본다.

**3\. 전체 페이지 맵**

권장 전체 페이지 맵은 아래와 같다.

**Dashboard**

*   Dashboard Home

**Inbox**

*   Inbox List
*   Inbox Detail

**Content**

*   Topics List / Detail / Edit
*   Answers List / Detail / Edit
*   Stories List / Detail / Edit
*   Experts List / Detail / Edit
*   Partners List / Detail / Edit
*   Resources List / Detail / Edit

**Archive**

*   Events List / Detail / Edit
*   Videos List / Detail / Edit
*   Documents List / Detail / Edit
*   Galleries List / Detail / Edit
*   Completion Board

**Participation**

*   Member Applications List / Detail
*   Newsletter Subscribers List / Detail
*   Event Registrations List / Detail
*   Partnership Inquiries List / Detail
*   Segments / Tags

**Review**

*   Needs Review
*   My Reviews
*   Review Detail

**Publishing**

*   Publish Queue
*   Scheduled
*   Featured Control
*   Feed Status
*   Sitemap Status
*   Link & Meta Check

**Observatory**

*   KPI Overview
*   Question Coverage
*   Object Health
*   Trust Health
*   Archive Health
*   Conversion Health

**Fix-It**

*   P0 Queue
*   P1 Queue
*   P2 Queue
*   Ticket Detail
*   Release Log

**Settings**

*   Users & Roles
*   Workflow Rules
*   Taxonomies
*   CTA Defaults
*   Integrations
*   Audit Log

이 구조는 문화강국네트워크가 실제로 운영해야 하는 웹진, 행사, 회원, 자료, 검수, 배포, 측정 구조를 반영한 것이다.

**4\. 공통 페이지 프레임 규격**

모든 Admin 페이지는 아래 공통 레이아웃을 가진다.

**4.1 상단 영역**

*   페이지 제목
*   설명문
*   현재 위치 breadcrumb
*   primary action
*   secondary actions

**4.2 필터/검색 바**

*   키워드 검색
*   상태 필터
*   타입 필터
*   owner/reviewer 필터
*   date range
*   saved view (2차)

**4.3 본문 영역**

페이지 유형에 따라 아래 중 하나:

*   card dashboard
*   table list
*   split view
*   form layout
*   detail + side panel

**4.4 우측 보조 패널(권장)**

상세형 페이지에는 우측 패널에 아래를 고정한다.

*   상태
*   owner
*   reviewer
*   last updated
*   related objects
*   publish risk
*   quick actions

**4.5 하단 로그 / 관련 객체**

*   recent changes
*   audit trail
*   related tasks
*   related Fix-It

**5\. Dashboard Home 페이지 명세**

**5.1 목적**

운영자가 로그인 후 가장 먼저 보는 화면으로, 오늘의 작업 우선순위와 핵심 경고를 보여준다.

**5.2 핵심 위젯**

*   Executive Strip
*   My Work Queue
*   Content & Review Alerts
*   Archive & Event Alerts
*   Participation & Inbox Alerts
*   Quick Actions
*   Recent Changes

**5.3 주요 액션**

*   Review queue 이동
*   P0 Fix-It 이동
*   새 AnswerCard 만들기
*   새 Story 만들기
*   Event completion 점검
*   Member/Registration 처리

**5.4 접근 권한**

*   전 역할 접근 가능
*   카드 내용은 역할별로 다르게 노출

**6\. Inbox List 페이지 명세**

**6.1 목적**

질문, 제안, 정정, 회원 문의, 행사 문의, 협력 문의를 한곳에서 triage하는 리스트 화면

**6.2 기본 테이블 컬럼**

*   Intake Type
*   Subject
*   Sender Name
*   Email
*   Source Channel
*   Linked Object
*   Status
*   Priority
*   Owner
*   Created At
*   Updated At

**6.3 필터**

*   intake type
*   priority
*   owner
*   status
*   source channel
*   has linked object?
*   repeated question?

**6.4 주요 액션**

*   assign owner
*   mark triaged
*   convert to Answer candidate
*   convert to Story backlog
*   convert to Correction
*   close

**6.5 접근 권한**

*   운영 총괄
*   콘텐츠 편집
*   회원 운영
*   이벤트 운영
*   일부 기술 운영(제한 읽기)

**7\. Inbox Detail 페이지 명세**

**7.1 목적**

단일 인입 항목을 읽고, 분류하고, 후속 작업으로 전환하는 상세 화면

**7.2 화면 구조**

좌측:

*   sender info
*   original message
*   source info
*   attachments/links

우측:

*   status
*   owner
*   priority
*   type
*   linked object
*   mapped action
*   notes
*   action buttons

**7.3 주요 액션**

*   type 변경
*   priority 변경
*   owner 지정
*   AnswerCard 후보 생성
*   Story 후보 생성
*   CorrectionRequest 생성
*   Membership follow-up 전환
*   Event follow-up 전환
*   close / archive

**7.4 특별 규칙**

Correction 후보일 경우 우측에 별도 Correction Panel을 띄운다.

**8\. Topics List / Detail / Edit 페이지 명세**

**8.1 Topics List 목적**

TopicSummary 전체를 보고, 허브 건강도를 관리

**주요 컬럼**

*   Topic Name
*   Pillar
*   Primary Questions Count
*   AnswerCards Count
*   Stories Count
*   Events Count
*   Reviewer
*   Status
*   Updated At

**주요 액션**

*   create topic
*   open detail
*   filter incomplete topics
*   review request

**8.2 Topic Detail 목적**

해당 주제 허브의 현재 정합성과 연결 구조를 확인

**상세 블록**

*   기본 정보
*   One-line Definition
*   Primary Questions
*   Representative Answers
*   Representative Stories
*   Related Events
*   Related Experts
*   Trust / Reviewer / UpdatedAt
*   Coverage hints
*   quick links to related objects

**8.3 Topic Edit 목적**

TopicSummary 편집 폼

**필수 필드**

*   topic name
*   slug
*   pillar
*   one-line definition
*   summary
*   primary questions
*   representative objects
*   reviewer
*   status
*   last updated

**9\. Answers List / Detail / Edit 페이지 명세**

**9.1 Answers List 목적**

정답카드 전체를 리스트로 보고, 필터·완성도·공개 상태를 관리

**9.2 리스트 컬럼**

*   Answer ID
*   Title
*   Question
*   Category
*   Pillar
*   Reviewer
*   Evidence Count
*   Related Story Count
*   Status
*   Feed Included
*   Featured
*   Updated At

**9.3 주요 필터**

*   pillar
*   category
*   reviewer missing
*   evidence missing
*   related story missing
*   feed eligible
*   featured
*   stale cards

**9.4 Answer Detail 목적**

정답카드 한 장의 완성도와 배포 상태를 통합 점검

**상세 섹션**

*   Basic Info
*   Question / Direct Answer
*   Action Points
*   Context & Impact
*   Evidence
*   Reviewer / UpdatedAt / ChangeLog
*   Related Stories / Events / Topic
*   Publish Readiness
*   Feed / Sitemap / Meta snapshot
*   Recent Fix-It / Audit Log

**9.5 Answer Edit 목적**

정답카드 편집 폼

**필수 필드**

*   title
*   question
*   direct answer
*   category
*   pillar
*   evidence
*   reviewer
*   CTA
*   related topic
*   status
*   updated at

**보조 필드**

*   related stories
*   related events
*   feed confidence
*   meta override
*   og image
*   canonical slug

이 구조는 Answer Card를 1급 정답 객체로 보고, 질문·정답·근거·검수·행동까지 한 객체 안에 담아야 한다는 B-SSoT 원칙과 맞다.

**10\. Stories List / Detail / Edit 페이지 명세**

**10.1 Stories List 목적**

문강 RIO 기사형 해설을 편집·검수·연결 기준으로 관리

**10.2 리스트 컬럼**

*   Story Title
*   Section
*   Story Type
*   Author
*   Reviewer
*   Based On Answers Count
*   Related Event Count
*   Status
*   Featured
*   Updated At

**10.3 Story Detail 목적**

기사형 해설 객체의 해설 품질과 연결 구조를 점검

**상세 섹션**

*   Basic Info
*   Deck
*   Why This Matters
*   Body
*   Based On Answers
*   Related Event / Archive / Video
*   Author / Reviewer
*   Publish Readiness
*   Meta / Article preview
*   recent audit / fix-it

**10.4 Story Edit 목적**

Story 편집 폼

**필수 필드**

*   title
*   section
*   story type
*   deck
*   why this matters
*   body
*   based on answers
*   reviewer
*   CTA
*   status

**공개 금지 lint**

*   related answer 0개
*   reviewer 없음
*   why this matters 없음
*   deck 없음

hanjunho 운영 문서도 기사형 해설은 Related Cards 최소 1개, 기사 출처/요약/검수 구조가 맞지 않으면 Public 금지로 봅니다. 문화강국네트워크 Story도 같은 수준으로 구현하는 것이 맞습니다.

**11\. Experts / Partners / Resources 페이지 명세**

**11.1 Experts List / Detail / Edit**

역할:

*   이사장, 편집장, 필자, 검수자, 연사 관리

**주요 필드**

*   name
*   role
*   short summary
*   profile image
*   authority type
*   linked answers/stories/events
*   public status

**11.2 Partners List / Detail / Edit**

역할:

*   협력기관/후원기관 관리

**주요 필드**

*   organization name
*   type
*   relation summary
*   linked event/topic
*   status

**11.3 Resources List / Detail / Edit**

역할:

*   문화예술정보, 기관/단체 정보, 실무 정보 관리

**주요 필드**

*   resource type
*   title
*   summary
*   related topic
*   link/file
*   updated at
*   status

**12\. Events List / Detail / Edit 페이지 명세**

**12.1 Events List 목적**

행사/토론회/캠페인 전체를 일정 + 기록 completion 관점에서 관리

**12.2 리스트 컬럼**

*   Event Name
*   Event Type
*   Start Date
*   Status
*   Registration Count
*   Document Count
*   Video Count
*   Follow-up Story Count
*   Owner
*   Completion Score

**12.3 Event Detail 목적**

단일 행사의 전체 기록 상태와 연결 구조를 관리

**상세 섹션**

*   Basic Info
*   Schedule / Venue / Status
*   Event Summary
*   Program
*   Speakers
*   Registrations summary
*   Documents
*   Videos
*   Gallery
*   Related Story / Answer / Topic
*   Completion Checklist
*   Publish / Archive Controls

**12.4 Event Edit 목적**

행사 생성·수정 폼

**필수 필드**

*   name
*   type
*   summary
*   start date
*   venue
*   status
*   CTA
*   related topic or answer

**completion 체크 필드**

*   summary ready
*   document ready
*   video ready
*   gallery ready
*   follow-up story ready

문화강국네트워크 요구안이 토론회 개요, 발제문 아카이빙, 문화행사 사진 기록을 핵심으로 두므로, Event 상세는 일반 일정 관리 화면이 아니라 **기록 completion 화면**이어야 합니다.

**13\. Videos / Documents / Galleries / Completion Board 페이지 명세**

**13.1 Videos List / Detail / Edit**

역할:

*   시청 객체 관리

**핵심 필드**

*   title
*   summary
*   source url / embed
*   related event/story
*   speaker
*   duration
*   status

**13.2 Documents List / Detail / Edit**

역할:

*   발제문, 자료집, 보도자료, 행사 기록 문서 관리

**핵심 필드**

*   title
*   document type
*   file/url
*   related event/story/topic
*   summary
*   updated at
*   status

**13.3 Galleries List / Detail / Edit**

역할:

*   사진 기록 관리

**핵심 필드**

*   gallery title
*   related event
*   photo count
*   caption summary
*   status

**13.4 Completion Board 목적**

이 화면은 문화강국네트워크에서 매우 중요하다.  
행사 종료 후 아래가 비어 있는 Event를 한눈에 보여준다.

*   document 없음
*   video 없음
*   gallery 없음
*   follow-up story 없음

**보드 컬럼**

*   event
*   ended at
*   docs
*   video
*   gallery
*   follow-up story
*   owner
*   action

**14\. Participation 페이지군 명세**

**14.1 Member Applications List / Detail**

**리스트 컬럼**

*   name
*   email
*   application status
*   source channel
*   interest topics
*   owner
*   submitted at

**상세 블록**

*   applicant info
*   application body / motivation
*   consent flags
*   linked source object
*   notes
*   status history
*   related event/answer/story
*   action buttons

**액션**

*   move to screening
*   approve
*   reject
*   put on hold
*   create follow-up

**14.2 Newsletter Subscribers List / Detail**

**리스트 컬럼**

*   email
*   name
*   subscription status
*   source CTA
*   segment
*   interest topics
*   subscribed at

**액션**

*   update segment
*   suppress
*   unsubscribe
*   inspect source

**14.3 Event Registrations List / Detail**

**리스트 컬럼**

*   event
*   name
*   email
*   registration status
*   attendance type
*   checked in?
*   source page
*   created at

**액션**

*   confirm
*   waitlist
*   cancel
*   mark attended
*   mark no show

**14.4 Partnership Inquiries List / Detail**

**리스트 컬럼**

*   organization
*   contact name
*   inquiry type
*   status
*   owner
*   latest contact
*   linked event/topic

**액션**

*   assign owner
*   mark replied
*   mark qualified
*   close

**15\. Review 페이지군 명세**

**15.1 Needs Review 페이지**

역할:

*   검수 대기 객체 전체 큐

**컬럼**

*   object type
*   title
*   reviewer
*   owner
*   submitted at
*   missing fields
*   priority
*   status

**액션**

*   open review
*   assign reviewer
*   return to draft
*   approve

**15.2 My Reviews 페이지**

역할:

*   로그인한 검수자 기준 개인 검수 큐

**15.3 Review Detail 페이지**

역할:

*   검수 실행 상세 화면

**섹션**

*   object preview
*   required fields check
*   reviewer checklist
*   comments
*   change requests
*   approval history
*   approve / reject / return

Review Detail은 Draft→Review→Public 장벽을 실제로 구현하는 핵심 화면이다. hanjunho 레퍼런스가 Review를 공개 직전 필수 단계로 두는 이유와 같다.

**16\. Publishing Center 페이지군 명세**

**16.1 Publish Queue**

이미 27 문서에서 정의한 대로 구현  
핵심은 review 승인 후 publish readiness 확인

**16.2 Scheduled**

예약 발행/예약 archive 관리

**16.3 Featured Control**

Home / 문강 RIO / Answers / Events의 대표 슬롯 제어

**16.4 Feed Status**

Answer Feed 포함/누락/오류 확인

**16.5 Sitemap Status**

answers/stories/events/videos/resources sitemap 상태

**16.6 Link & Meta Check**

title/meta/OG/canonical/broken links/CTA 검사

AIO-PR가 Answer Feed, sitemap-answers, ETag, lastmod 정합성을 운영 규격으로 명시하므로, Publishing Center는 반드시 독립 화면군을 가져야 합니다.

**17\. Observatory 페이지군 명세**

**17.1 KPI Overview**

*   Coverage
*   SSoT Citation
*   Claim Capture
*   Evidence Align
*   Contradiction
*   TTI

**17.2 Question Coverage**

*   unanswered questions
*   repeated questions
*   topic coverage gaps

**17.3 Object Health**

*   answers health
*   stories health
*   topics health
*   events health
*   archive health

**17.4 Trust Health**

*   reviewer visibility
*   updatedAt visibility
*   evidence block presence
*   correction pending

**17.5 Archive Health**

*   closed events with no docs
*   no video
*   no gallery
*   no follow-up story
*   orphan docs/videos

**17.6 Conversion Health**

*   story → newsletter
*   answer → membership
*   event → registration
*   partnership inquiries

Dashboard가 오늘 할 일을 보여준다면, Observatory는 구조 건강도를 진단하는 화면군이다. 이 분리는 앞선 26\_Admin Dashboard·Observatory 문서와 그대로 맞는다.

**18\. Fix-It 페이지군 명세**

**18.1 P0 / P1 / P2 Queue**

역할:

*   심각도별 작업 큐

**컬럼**

*   ticket id
*   object type
*   object title
*   root cause
*   severity
*   owner
*   due date
*   status

**18.2 Ticket Detail**

**섹션**

*   issue summary
*   KPI impact
*   root cause
*   proposed fix
*   related objects
*   reviewer
*   publish implications
*   resolution log

**18.3 Release Log**

역할:

*   어떤 Fix-It이 어떤 배포에 반영됐는지 추적

**19\. Settings 페이지군 명세**

**19.1 Users & Roles**

*   user list
*   role assignment
*   active/inactive
*   last login

**19.2 Workflow Rules**

*   allowed transitions
*   required fields by object
*   publish blockers

**19.3 Taxonomies**

*   pillar
*   category
*   section
*   story type
*   event type
*   document type
*   inquiry type

**19.4 CTA Defaults**

*   newsletter CTA
*   membership CTA
*   partnership CTA
*   event apply CTA

**19.5 Integrations**

*   email
*   form
*   analytics
*   video source
*   feed/sitemap jobs

**19.6 Audit Log**

*   actor
*   action
*   object
*   before/after
*   reason
*   timestamp

**20\. 공통 액션 패턴**

모든 페이지는 아래 액션 패턴을 공통으로 쓴다.

**기본 액션**

*   Create
*   Edit
*   Duplicate
*   Send to Review
*   Approve
*   Publish
*   Hide
*   Archive

**보조 액션**

*   Assign Owner
*   Assign Reviewer
*   Link Related Object
*   Generate Fix-It
*   Open in Public Preview
*   Open Audit Trail

**보호 액션**

아래는 confirm modal + reason 입력 권장

*   Publish
*   Hide
*   Archive
*   Export
*   Role Change
*   Feed Regenerate
*   Sitemap Regenerate

**21\. 페이지별 권한 적용 원칙**

**콘텐츠 편집**

*   Content pages full edit
*   Review 요청 가능
*   Publish 불가 권장

**검수자**

*   Review pages 중심
*   approve/reject 가능
*   Content edit 제한

**이벤트 운영**

*   Archive pages 중심
*   Event/Document/Gallery edit 가능
*   Feed/Sitemap 불가

**회원 운영**

*   Participation pages 중심
*   콘텐츠 편집 불가

**기술 운영**

*   Publishing / Settings / Audit Log 중심
*   PII 상세 제한

**운영 총괄**

*   전체 가시성
*   publish/fix-it/featured 최종 제어

이 권한 원칙은 앞서 잠근 RBAC 문서와 그대로 연결된다.

**22\. 1차 MVP 구현 범위**

초기에는 아래 페이지까지만 강하게 구현해도 충분하다.

**반드시 구현**

*   Dashboard Home
*   Inbox List / Detail
*   Topics List / Detail / Edit
*   Answers List / Detail / Edit
*   Stories List / Detail / Edit
*   Events List / Detail / Edit
*   Documents List / Detail / Edit
*   Member Applications List / Detail
*   Event Registrations List / Detail
*   Needs Review / Review Detail
*   Publish Queue
*   Featured Control
*   Feed Status
*   Sitemap Status
*   KPI Overview
*   Object Health
*   Fix-It Queue / Ticket Detail
*   Users & Roles
*   Audit Log

**2차 확장**

*   Galleries
*   Newsletter segments
*   Scheduled
*   Link & Meta Check full version
*   Conversion Health advanced
*   Release Log advanced
*   Integrations detail

**23\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크 Admin Console은 단순 CRUD 관리자 화면이 아니라, **질문을 회수하고, 정답과 해설을 만들고, 행사와 자료를 기록으로 완성하고, 회원·행사 신청을 처리하고, 검수·배포·Feed·Sitemap·KPI·Fix-It까지 연결하는 운영 시스템**이어야 합니다. 따라서 페이지도 퍼블릭 사이트 메뉴를 복제하는 방식이 아니라, Dashboard / Inbox / Content / Archive / Participation / Review / Publishing / Observatory / Fix-It / Settings의 운영 그룹 아래 리스트·상세·편집·보드·큐 화면으로 설계하는 것이 가장 적합합니다. 이는 문화강국네트워크 구성안이 웹진·행사·자료·회원 구조를 함께 요구하고, B-SSoT가 Question Capture에서 Re-Publish까지의 운영 루프를 핵심으로 두며, hanjunho 운영 문서가 상태값·Featured·Review·메타·링크·공개 후 수정 반영까지를 실무 운영의 중심에 두기 때문입니다.