**21\_Admin IA·메뉴 구조 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console의 **전체 메뉴 구조, 상위 정보구조, 작업 흐름 기준, 화면 그룹핑 원칙**을 확정하는 데 있다.

이 문서는 다음 질문에 답해야 한다.

*   운영자는 어디서 무엇을 시작하는가
*   콘텐츠 작성/검수/공개/보강/수정은 어떤 메뉴 흐름으로 이동하는가
*   행사·자료·영상은 어떤 운영 그룹으로 묶는가
*   회원·뉴스레터·행사 신청은 어떤 참여 관리 메뉴로 묶는가
*   KPI·Fix-It은 어떤 위치에 있어야 하는가
*   Admin Console 메뉴는 퍼블릭 사이트 IA와 어디서 같고 어디서 달라야 하는가

즉, 이 문서는 “관리자 메뉴 이름”을 정하는 문서가 아니라,  
**문화강국네트워크 운영팀이 실제로 덜 헷갈리고 더 빠르게 일하도록 만드는 운영 정보구조 문서**다.

**2\. Admin IA 설계의 최상위 원칙**

**2.1 퍼블릭 IA를 그대로 복제하지 않는다**

퍼블릭 사이트는 사용자를 위한 구조이고, Admin Console은 운영자를 위한 구조다.  
따라서 퍼블릭 GNB의 문강 RIO / 정답카드 / 행사·영상 / 네트워크 / 참여·회원을 그대로 복제하면 안 된다. Admin IA는 **작업 중심**이어야 한다.

**2.2 운영 루프를 메뉴 구조에 반영한다**

Admin IA는 아래 순서를 반영해야 한다.

*   질문이 들어온다
*   정답/해설 후보가 된다
*   초안이 만들어진다
*   검수로 간다
*   공개된다
*   반응을 본다
*   수정 티켓이 생긴다
*   다시 공개된다

이건 B-SSoT의 운영 루프를 메뉴 구조로 번역한 것이다.

**2.3 객체 중심으로 묶고, 작업 큐를 그 위에 얹는다**

핵심 객체는 TopicSummary / AnswerCard / Story / Event / Video / ArchiveDocument / Expert / Membership 이다.  
하지만 메뉴는 객체만 나열하면 안 되고,  
Inbox / Review / Publishing / Observatory / Fix-It 같은 **운영 큐 메뉴**가 반드시 있어야 한다.

**2.4 역할별 진입점이 있어야 한다**

운영 총괄, 에디터, 리서치, 검수자, 이벤트 운영자, 회원 운영자, 기술 운영자는 모두 보는 우선 화면이 다르다.  
따라서 Dashboard와 Queue 중심 진입이 필요하다. hanjunho 문서가 역할을 분리하고 상태값을 엄격히 관리하라고 한 이유도 여기에 있다.

**2.5 “보는 메뉴”와 “일하는 메뉴”를 구분한다**

*   보드/대시보드/모니터링 = 보는 메뉴
*   생성/수정/검수/배포 = 일하는 메뉴  
    이 두 층을 나눠야 운영자가 덜 혼란스럽다.

**3\. 권장 Admin IA의 전체 구조**

문화강국네트워크 Admin Console의 상위 메뉴는 아래 10개 그룹으로 정의한다.

1.  Dashboard
2.  Inbox
3.  Content
4.  Archive
5.  Participation
6.  Review
7.  Publishing
8.  Observatory
9.  Fix-It
10.  Settings

이 구조는 퍼블릭 사이트의 메뉴를 반영한 것이 아니라,  
문화강국네트워크가 실제로 해야 하는 운영 작업 순서를 반영한 것이다.  
홈에서 웹진·행사·회원·문화예술정보를 함께 운영해야 하고, 단체 섹션 안에 발제문·행사 기록이 들어가야 하므로, 관리자 화면도 콘텐츠와 기록과 참여를 분리된 운영 그룹으로 다루는 편이 맞다.

**4\. 상위 메뉴별 역할 정의**

**4.1 Dashboard**

역할: **오늘 무엇을 해야 하는지 한눈에 보여주는 시작 화면**

이 화면은 운영 총괄과 실무자가 가장 먼저 들어오는 화면이다.

핵심 구성:

*   오늘 확인할 Review 대기 건수
*   Publish 예정 건수
*   Event completion 경고
*   회원/문의 신규 인입
*   KPI strip
*   긴급 Fix-It 티켓
*   최근 수정 로그

**Dashboard가 먼저여야 하는 이유**

운영자는 “어디서 글을 쓰지?”보다 먼저  
“지금 뭐가 밀려 있지?”를 확인해야 한다.  
질문 회수, 검수, 공개, 수정이 함께 굴러가야 하기 때문이다. 이건 B-SSoT 운영 루프의 프런트 게이트다.

**4.2 Inbox**

역할: **질문·제안·정정·행사 문의·회원 문의의 인입 허브**

이 메뉴는 Question Capture 를 담당한다.

권장 하위 메뉴:

*   전체 인입
*   질문
*   제안
*   정정 요청
*   행사 문의
*   회원/협력 문의

핵심 기능:

*   유형 분류
*   중요도 태그
*   반복도 태그
*   담당자 지정
*   AnswerCard 후보 전환
*   Story 보강 후보 전환
*   Correction workflow 전환

**Inbox가 필요한 이유**

질문이 메일함과 폼, 행사 후속 문의로 흩어지면 Question Capital이 축적되지 않는다.  
따라서 Inbox는 단순 문의함이 아니라 **질문 자산 수집 화면**이어야 한다.

**4.3 Content**

역할: **정답과 해설, 전문가와 파트너를 생성·수정하는 핵심 제작 허브**

권장 하위 메뉴:

*   Topics
*   Answers
*   Stories
*   Experts
*   Partners
*   Resources

**Topics**

TopicSummary 관리  
예: 문화강국 / K-문명 / 지역문화 / 문화정책 / 참여·회원

**Answers**

AnswerCard 관리  
질문 기반 정답 객체를 관리한다.

**Stories**

문강 RIO Story 관리  
기사형 해설, 인터뷰, 브리프, 리뷰를 관리한다.

**Experts**

이사장, 편집장, 필자, 검수자, 연사 관리

**Partners**

협력기관 / 후원기관 / 파트너 관리

**Resources**

문화예술정보, 기관정보, 실무 정보 항목 관리

**Content가 분리되어야 하는 이유**

hanjunho CMS 사전도 정본 페이지와 해설 페이지를 분리하고, Profiles를 신뢰 주체 컬렉션으로 분리합니다. 문화강국네트워크도 같은 구조가 필요하다.

**4.4 Archive**

역할: **행사·영상·발제문·자료집·사진 기록을 운영하는 기록 허브**

권장 하위 메뉴:

*   Events
*   Videos
*   Documents
*   Galleries
*   Completion Board

**Events**

토론회, 포럼, 캠페인, 문화행사 관리

**Videos**

행사 다시보기, 명사 영상, 인터뷰 영상 관리

**Documents**

발제문, 자료집, 보도자료, 행사 기록 PDF 관리

**Galleries**

사진 기록 관리

**Completion Board**

행사 종료 후

*   발제문 업로드됨?
*   사진 있음?
*   영상 연결됨?
*   후속 Story 있음?  
    을 확인하는 보드

**Archive가 별도 메뉴여야 하는 이유**

문화강국네트워크는 구성안 자체가 토론회 개요 및 발제문 아카이빙, 문화행사 사진 기록을 별도 요구합니다. 따라서 이 영역은 Content의 하위가 아니라 **독립 운영 그룹**이 되는 편이 맞다.

**4.5 Participation**

역할: **회원·뉴스레터·행사 신청·협력 문의를 처리하는 참여 운영 허브**

권장 하위 메뉴:

*   Member Applications
*   Newsletter
*   Event Registrations
*   Partnership Inquiries
*   Segments / Tags

**Member Applications**

회원 신청 상태 관리

**Newsletter**

구독자 관리, 동의 상태, 구독 소스, 발송 연계

**Event Registrations**

행사 신청자/참석 상태 관리

**Partnership Inquiries**

협력 제안, 제휴 문의 처리

**Segments / Tags**

회원/구독자/문의자 태그 관리

**Participation이 별도 메뉴여야 하는 이유**

퍼블릭 사이트의 참여·회원은 CTA지만, 운영자 입장에서는 **간단한 CRM** 이다.  
Media 패밀리에서 전환이 구독/행사/협업 구조이므로, 콘텐츠 메뉴 안에 묻히면 안 된다.

**4.6 Review**

역할: **검수와 승인 흐름을 다루는 작업 큐**

권장 하위 메뉴:

*   Needs Review
*   My Reviews
*   Returned / Rejected
*   Approved Today
*   Review Rules

핵심 기능:

*   검수 요청
*   Reviewer 지정
*   코멘트
*   반려
*   재제출
*   승인 로그

**Review가 독립 메뉴여야 하는 이유**

Draft → Review → Public 흐름은 운영 핵심이므로, 개별 객체 화면 안에만 숨어 있으면 안 된다.  
hanjunho 문서도 Review 단계를 공개 직전 필수 단계로 고정합니다.

**4.7 Publishing**

역할: **공개 상태, 메타, Feed, sitemap, 링크 상태를 제어하는 배포 허브**

권장 하위 메뉴:

*   Publish Queue
*   Scheduled
*   Featured Control
*   Feed Status
*   Sitemap Status
*   Link Check

**Publish Queue**

곧 공개될 객체 목록

**Scheduled**

예약 발행

**Featured Control**

홈 Featured Answer / Story / Event 제어

**Feed Status**

Answer Feed 포함 여부, 오류, 최근 생성 시간

**Sitemap Status**

answers/stories/events sitemap 상태

**Link Check**

깨진 링크, 누락 이미지, invalid URL 점검

**Publishing이 필요한 이유**

hanjunho 운영 문서가 Featured on Home, 메타 보완, 링크 점검, 발행 후 수정 반영을 운영자의 핵심 업무로 둔 만큼, 문화강국네트워크도 배포 화면이 필요하다.

**4.8 Observatory**

역할: **KPI와 객체 건강도를 보는 관측 허브**

권장 하위 메뉴:

*   KPI Overview
*   Object Health
*   Question Coverage
*   Trust Health
*   Archive Health
*   Conversion Health

핵심 구성:

*   Coverage
*   Claim Capture
*   Evidence Align
*   Contradiction
*   TTI
*   Membership / Event 전환

**Observatory가 필요한 이유**

B-SSoT는 Publish 뒤에 반드시 Measure가 와야 한다.  
따라서 Observatory는 분석 부가기능이 아니라 상위 운영 모듈이다.

**4.9 Fix-It**

역할: **문제를 티켓으로 바꾸고 수정 상태를 추적하는 허브**

권장 하위 메뉴:

*   P0
*   P1
*   P2
*   By Root Cause
*   By Owner
*   Release Log

핵심 Root Cause:

*   Schema / Feed
*   Content Shape
*   Evidence / Trust
*   Link Graph
*   Tone / Framing
*   Archive Completion
*   Conversion Mapping

**Fix-It이 독립 메뉴여야 하는 이유**

측정만 있고 수정 티켓이 없으면 운영 루프가 닫히지 않는다.  
B-SSoT와 AIO-PR의 공통 논리상, Measure 다음은 Root Cause와 Fix-It이다.

**4.10 Settings**

역할: **운영 체계, 권한, 공통 규칙, 시스템 상태를 관리하는 허브**

권장 하위 메뉴:

*   Users & Roles
*   Workflow Rules
*   Taxonomies
*   CTA Defaults
*   Schema / Meta Rules
*   Integrations
*   Audit Log

**Users & Roles**

RBAC 관리

**Workflow Rules**

Draft / Review / Public 전이 규칙

**Taxonomies**

Section, Story Type, Pillar, Document Type, Event Type 관리

**CTA Defaults**

뉴스레터, 회원가입, 협력 문의 기본 목적지

**Integrations**

메일, 폼, analytics, feed/sitemap, video source 연결

**Audit Log**

누가 무엇을 바꿨는지 기록

**5\. 추천 좌측 메뉴 구조**

Dashboard

Inbox

\- All

\- Questions

\- Suggestions

\- Corrections

\- Participation Inquiries

Content

\- Topics

\- Answers

\- Stories

\- Experts

\- Partners

\- Resources

Archive

\- Events

\- Videos

\- Documents

\- Galleries

\- Completion Board

Participation

\- Member Applications

\- Newsletter

\- Event Registrations

\- Partnership Inquiries

\- Segments

Review

\- Needs Review

\- My Reviews

\- Returned

\- Approved

Publishing

\- Publish Queue

\- Scheduled

\- Featured Control

\- Feed Status

\- Sitemap Status

\- Link Check

Observatory

\- KPI Overview

\- Object Health

\- Question Coverage

\- Trust Health

\- Archive Health

\- Conversion Health

Fix-It

\- P0

\- P1

\- P2

\- Root Cause Board

\- Release Log

Settings

\- Users & Roles

\- Workflow Rules

\- Taxonomies

\- CTA Defaults

\- Integrations

\- Audit Log

**6\. 역할별 추천 기본 랜딩 화면**

**운영 총괄**

기본 랜딩: Dashboard

**콘텐츠 기획·편집**

기본 랜딩: Inbox 또는 Content > Answers

**리서치/자료 담당**

기본 랜딩: Archive > Completion Board

**검수자**

기본 랜딩: Review > My Reviews

**이벤트 운영자**

기본 랜딩: Archive > Events

**회원/참여 운영자**

기본 랜딩: Participation > Member Applications

**기술 운영자**

기본 랜딩: Publishing > Feed Status 또는 Settings > Integrations

이렇게 해야 역할별로 가장 자주 쓰는 화면에 바로 들어갈 수 있다.

**7\. 퍼블릭 IA와 Admin IA의 대응표**

**퍼블릭 문강 RIO**

→ Admin Content > Stories

**퍼블릭 정답카드**

→ Admin Content > Answers

**퍼블릭 3 Pillars**

→ Admin Content > Topics + Settings > Taxonomies

**퍼블릭 행사·영상**

→ Admin Archive > Events / Videos / Documents

**퍼블릭 데이터·자료**

→ Admin Content > Resources + Archive > Documents

**퍼블릭 네트워크**

→ Admin Content > Experts / Partners

**퍼블릭 참여·회원**

→ Admin Participation

즉, 퍼블릭은 사용자 탐색 구조이고, Admin은 객체와 운영 기능 중심 구조다.

**8\. 1차 MVP 메뉴 권장안**

초기에는 너무 많은 메뉴를 한 번에 다 열지 않는 것이 좋다.  
1차 MVP에서는 아래 메뉴만 먼저 강하게 구현해도 충분하다.

*   Dashboard
*   Inbox
*   Content
    *   Topics
    *   Answers
    *   Stories
    *   Experts
*   Archive
    *   Events
    *   Documents
    *   Videos
*   Participation
    *   Member Applications
    *   Event Registrations
*   Review
*   Publishing
*   Observatory
*   Fix-It
*   Settings

Partners, Resources, Galleries, Newsletter Segments 같은 세부 메뉴는 2차에서 확장해도 된다.

**9\. 이 구조가 좋은 이유**

이 IA는 세 가지 문제를 동시에 해결한다.

첫째, **퍼블릭 사이트 구조를 억지로 복제하지 않는다.**  
둘째, **질문 수집 → 제작 → 검수 → 공개 → 측정 → 수정** 운영 루프를 메뉴 구조로 반영한다.  
셋째, **문화강국네트워크 특유의 행사/발제문/사진/영상/회원 흐름**을 독립 운영 그룹으로 다룬다.

hanjunho 레퍼런스에서 운영 역할, 상태값, Featured, 메타, 링크 점검이 별도 운영 업무로 분리되어 있는 점을 보면, 이 정도 수준의 Admin IA 분리는 충분히 정당하다.

**10\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크 Admin Console은 퍼블릭 사이트 메뉴를 복제한 관리자 화면이 아니라, **Dashboard / Inbox / Content / Archive / Participation / Review / Publishing / Observatory / Fix-It / Settings**의 10개 상위 운영 그룹으로 설계하는 것이 가장 적합합니다. 이렇게 해야 문화강국네트워크가 요구하는 문강 RIO 운영, 정답카드 생산, 토론회·발제문·사진·영상 아카이브, 회원가입과 행사 신청, 검수와 공개 상태 관리, KPI와 Fix-It 루프가 하나의 운영 시스템으로 연결됩니다. 이는 문화강국네트워크 실제 홈페이지 요구와 B-SSoT 운영 루프, 그리고 hanjunho 운영 플레이북의 역할/상태/Featured/검수 구조를 함께 반영한 결과입니다.