**26\_Admin Dashboard·Observatory 화면 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console에서 사용될 **Dashboard** 와 **Observatory** 화면의 역할, 정보구조, 카드 구성, KPI 배치, 경고 규칙, drill-down 흐름을 정의하는 데 있다.

이 문서는 다음을 고정한다.

*   운영자가 Admin Console에 처음 들어왔을 때 무엇을 먼저 봐야 하는가
*   Dashboard와 Observatory는 어떻게 다른가
*   어떤 KPI를 Executive Strip에 놓을 것인가
*   어떤 카드가 콘텐츠 운영, 아카이브, 참여, 신뢰, Fix-It 상태를 보여줘야 하는가
*   어떤 항목은 단순 정보가 아니라 클릭 시 작업 큐로 연결되어야 하는가

즉, 이 문서는 문화강국네트워크 운영 콘솔의 **시작 화면과 관측 화면 설계서**다.

**2\. Dashboard와 Observatory의 역할 구분**

**2.1 Dashboard의 역할**

Dashboard는 **“오늘 무엇을 해야 하는가”** 를 보여주는 화면이다.  
즉 운영자의 일일 작업 우선순위, 대기 중인 리뷰, 행사 보강, 새 인입, 긴급 수정, 참여 데이터의 병목을 빠르게 보여줘야 한다.

**2.2 Observatory의 역할**

Observatory는 **“시스템이 지금 어떤 건강 상태인가”** 를 보여주는 화면이다.  
즉 KPI, 객체 건강도, root cause 분포, 질문 커버리지, 신뢰 구조, 전환 구조를 구조적으로 관측해야 한다.

**2.3 둘을 분리해야 하는 이유**

*   Dashboard는 **작업 시작점**
*   Observatory는 **진단과 전략 판단**  
    이다.  
    AIO-PR가 KPI6를 보여주고, 그다음 단계로 Diagnostics & Fix-It을 붙이는 이유도 이 분리를 전제로 합니다.

**3\. 최상위 설계 원칙**

**3.1 숫자보다 행동이 먼저 보여야 한다**

Dashboard 첫 화면에서 단순 pageview나 방문자 수보다,

*   Review 대기
*   Event completion 누락
*   회원 신청 대기
*   Correction 처리 필요
*   Fix-It P0  
    같은 **운영 행동 항목**이 먼저 보여야 한다.

**3.2 KPI는 Fix-It으로 이어져야 한다**

Observatory에서 Coverage가 낮다는 사실만 보여주면 부족하다.  
그 아래에

*   어떤 Topic이 비어 있는지
*   어떤 AnswerCard가 없는지
*   어떤 Story가 Related Answer 없이 고립됐는지
*   어떤 Event가 아카이브가 비었는지  
    를 바로 보여줘야 한다.

**3.3 문화강국네트워크는 콘텐츠형 KPI와 기록형 KPI를 같이 본다**

문화강국네트워크는 문강 RIO와 정답카드만 있는 사이트가 아니라, 행사·영상·발제문·사진 기록과 회원/뉴스레터/신청 흐름이 같이 있기 때문에, Dashboard/Observatory도 **Content + Archive + Participation** 3축을 함께 가져야 한다.

**3.4 Trust Layer는 별도 관측 축으로 봐야 한다**

Reviewer, UpdatedAt, Evidence, ChangeLog는 B-SSoT의 핵심 신뢰 신호이므로, 별도 Trust Health 카드가 있어야 한다.

**4\. Admin Dashboard 전체 구조**

문화강국네트워크 Admin Dashboard의 1차 권장 구조는 아래 6개 섹션으로 정의한다.

1.  Executive Strip
2.  My Work Queue
3.  Content & Review Alerts
4.  Archive & Event Alerts
5.  Participation & Inbox Alerts
6.  Quick Actions / Recent Changes

이 구조는 “오늘 뭘 해야 하지?”라는 실무 흐름에 맞춰 구성한 것이다.

**5\. Dashboard 상세 구성**

**5.1 Executive Strip**

역할: 상단에서 오늘의 핵심 운영 상태를 한 줄로 요약

권장 카드:

*   Review Pending
*   Publish Today
*   P0 Fix-It
*   New Inbox
*   Event Completion Missing
*   Member/Registration Pending

**예시**

*   검수 대기 7
*   오늘 공개 예정 3
*   P0 수정 2
*   새 인입 11
*   자료 미완료 행사 4
*   회원/행사 신청 대기 9

**클릭 동작**

각 숫자는 반드시 작업 큐로 이동해야 한다.

*   Review Pending → Review > Needs Review
*   P0 Fix-It → Fix-It > P0
*   Event Completion Missing → Archive > Completion Board

Dashboard는 정적 대시보드가 아니라 **action board** 여야 한다.

**5.2 My Work Queue**

역할: 로그인한 사용자 기준 개인 할당 작업 큐

권장 탭:

*   Assigned to Me
*   Waiting for My Review
*   Returned to Me
*   Due Soon

카드 예시:

*   Story 검수 요청
*   Event 자료 연결 필요
*   Membership 문의 응답 필요
*   Fix-It 티켓 due tomorrow

**표시 필드**

*   객체 유형
*   제목
*   현재 상태
*   due date
*   priority
*   owner / reviewer

**왜 필요한가**

운영 총괄, 편집자, 검수자, 이벤트 운영자, 참여 운영자는 시작점이 다르다.  
따라서 개인 큐가 있어야 Admin Console이 실제 업무 도구가 된다.

**5.3 Content & Review Alerts**

역할: 정답/해설 운영에서 즉시 눈에 띄어야 할 문제를 보여줌

권장 카드:

*   Reviewer 없는 Review 객체
*   Related Answer 없는 Public Story
*   Evidence 없는 Public AnswerCard
*   UpdatedAt 180일 초과 핵심 카드
*   Featured 후보 부족
*   TopicSummary 대표 객체 부족

**예시 카드**

**Reviewer 누락**

*   Public 직전인데 reviewer가 비어 있는 객체 목록

**고립 Story**

*   Based On Answers 0개 또는 Related Answer 0개인 Story 목록

**오래된 정답**

*   Public 상태지만 180일 이상 갱신되지 않은 핵심 AnswerCard

이 섹션은 Trust Health와 Content Shape 문제를 일일 운영 큐로 끌어오는 역할을 한다. B-SSoT가 Reviewer/Evidence/UpdatedAt을 핵심 신뢰 신호로 보기 때문에 필수다.

**5.4 Archive & Event Alerts**

역할: 행사·영상·발제문·사진 기록의 completion 상태를 보여줌

권장 카드:

*   Upcoming Events needing publish review
*   Closed Events with no document
*   Closed Events with no video
*   Events with no follow-up Story
*   Orphan Documents
*   Videos with no related Event/Story

**예시**

*   자료 없는 종료 행사 3
*   영상 없는 종료 행사 2
*   후속 Story 없는 행사 5
*   고립 자료 7

이 섹션은 문화강국네트워크 구성안의 **토론회 개요 및 발제문 아카이빙**, **문화행사 사진 기록** 요구를 운영 경고로 바꾸는 화면이다.

**5.5 Participation & Inbox Alerts**

역할: 회원/뉴스레터/행사 신청/문의 흐름의 병목과 새 인입을 보여줌

권장 카드:

*   New Questions
*   New Corrections
*   Member Applications Pending
*   Event Registrations Pending
*   Partnership Inquiries New
*   Repeated Questions This Week

**예시**

*   새 질문 6
*   정정 요청 2
*   회원 신청 대기 4
*   행사 신청 확인 필요 5
*   이번 주 반복 질문 3

**반복 질문 카드는 중요**

이 카드는 단순 문의 수가 아니라 **Question Capital 후보**를 보여준다.  
B-SSoT가 Question Capture를 운영 루프의 첫 단계로 두는 이유를 시각화하는 카드다.

**5.6 Quick Actions / Recent Changes**

역할: 자주 쓰는 작업과 최근 변경 내역을 보여줌

권장 Quick Actions:

*   새 AnswerCard 만들기
*   새 Story 만들기
*   새 Event 만들기
*   새 MembershipPlan 만들기
*   질문을 Answer 후보로 전환
*   Event completion 점검

권장 Recent Changes:

*   최근 공개 5개
*   최근 Hidden 5개
*   최근 Archived 5개
*   최근 ChangeLog 5개

**왜 필요한가**

운영자는 대시보드에서 바로 작업을 시작할 수 있어야 하고,  
최근 변경 로그를 봐야 충돌을 줄일 수 있다.

**6\. Observatory 전체 구조**

문화강국네트워크 Observatory의 1차 권장 구조는 아래 7개 섹션으로 정의한다.

1.  KPI Executive Strip
2.  Question Coverage
3.  Object Health
4.  Trust Health
5.  Archive Health
6.  Conversion Health
7.  Root Cause & Fix-It

이 구조는 앞서 정의한 19\_Observatory·KPI·Fix-It 명세서를 그대로 화면화한 것이다. AIO-PR가 KPI6와 Diagnostics & Fix-It을 한 루프로 설명하는 구조와도 맞다.

**7\. Observatory 상세 구성**

**7.1 KPI Executive Strip**

역할: 핵심 KPI6를 한 줄로 보여줌

권장 카드:

*   Coverage
*   SSoT Citation
*   Claim Capture
*   Evidence Align
*   Contradiction
*   TTI

AIO-PR가 제시한 KPI6를 그대로 반영한다.

**예시 표시**

*   Coverage 52%
*   SSoT Citation 31%
*   Claim Capture 74%
*   Evidence Align 67%
*   Contradiction 5%
*   TTI 11일

**카드 클릭 시**

각 KPI는 원인 drill-down 페이지로 이동해야 한다.

**7.2 Question Coverage**

역할: 대표 질문 세트(QAMS) 기준으로 정답 커버리지를 보여줌

권장 뷰:

*   Topic별 Coverage
*   unanswered question list
*   repeated question list
*   Answer-only / Story-only / Event-only 질문 분포

**예시 테이블**

**질문**

**Topic**

**AnswerCard**

**Story**

**Event/Archive**

**상태**

문화강국이란?

문화강국

O

O

△

covered

지난 토론회 발제문은?

행사·자료

△

X

O

partially covered

**활용**

*   unanswered 질문 → Inbox / Content backlog
*   repeated 질문 → AnswerCard 우선 후보

**7.3 Object Health**

역할: 객체군별 건강도를 보여줌

권장 카드:

*   Answer Health
*   Story Health
*   Topic Health
*   Event Health
*   Video Health
*   Archive Health

**Answer Health 예시 지표**

*   Evidence 1개 이상 비율
*   Reviewer 존재 비율
*   Related Story 존재 비율
*   UpdatedAt 180일 이내 비율

**Story Health 예시 지표**

*   Based On Answers 존재 비율
*   Why This Matters 존재 비율
*   Related Event/Archive 연결 비율

Object Health는 “무슨 객체군이 구조적으로 약한가”를 보는 핵심 보드다.

**7.4 Trust Health**

역할: 신뢰 구조가 제대로 노출되고 연결되는지 관측

권장 카드:

*   Reviewer visibility rate
*   UpdatedAt visibility rate
*   Evidence block presence rate
*   ChangeLog-linked object rate
*   Correction pending count

**예시**

*   Reviewer 노출 88%
*   UpdatedAt 노출 94%
*   근거 블록 존재 71%
*   정정 대기 3

이 섹션은 B-SSoT의 Reviewer / Evidence / UpdatedAt / ChangeLog 구조를 그대로 시각화한 것이다.

**7.5 Archive Health**

역할: 행사 기록과 자료 아카이브의 완성도를 관측

권장 카드:

*   Closed Events with documents
*   Closed Events with video
*   Closed Events with gallery
*   Closed Events with follow-up Story
*   Orphan documents
*   Orphan videos

**왜 중요하나**

문화강국네트워크는 행사/토론회/발제문/사진이 핵심 자산이므로, Archive Health는 일반 CMS에서는 없어도 되지만 여기서는 필수다. 구성안이 바로 이 아카이브 축을 요구합니다.

**7.6 Conversion Health**

역할: 콘텐츠 → 참여 전환 구조가 실제로 작동하는지 관측

권장 카드:

*   Story → Newsletter
*   AnswerCard → Membership
*   Event → Registration
*   Join page completion rate
*   Partnership inquiry conversion

**예시**

*   문강 RIO → 뉴스레터 전환 2.8%
*   정답카드 → 회원가입 전환 1.4%
*   행사 상세 → 신청 완료 7.2%

Media 패밀리의 전환이 구독/행사/협업 구조라는 점을 반영한 보드다.

**7.7 Root Cause & Fix-It**

역할: 관측 결과를 root cause bucket과 Fix-It 큐로 연결

권장 root cause bucket:

*   Schema / Feed
*   Content Shape
*   Evidence / Trust
*   Link Graph
*   Tone / Framing
*   Archive Completion
*   Conversion Mapping

이 구조는 앞선 19\_Observatory 문서와 정확히 맞춘다.

**화면 구성**

좌측:

*   root cause 분포 차트  
    우측:
*   관련 Fix-It 티켓 리스트  
    하단:
*   최근 해결 / 미해결 / overdue 티켓

**8\. 역할별 Dashboard/Observatory 기본 랜딩 차이**

**운영 총괄**

첫 화면:

*   Executive Strip
*   P0 Fix-It
*   New Inbox
*   Publish Today
*   KPI strip

**콘텐츠 편집**

첫 화면:

*   My Work Queue
*   Content & Review Alerts
*   repeated questions
*   Topic coverage gaps

**검수자**

첫 화면:

*   Waiting for My Review
*   trust health warnings
*   corrections pending

**이벤트 운영자**

첫 화면:

*   Upcoming Events
*   completion missing
*   registrations pending
*   orphan documents/videos

**회원·참여 운영자**

첫 화면:

*   Member Applications Pending
*   Event Registrations Pending
*   Partnership Inquiries New
*   repeated participation questions

**기술 운영자**

첫 화면:

*   Feed/Sitemap status
*   schema/feed alerts
*   broken link count
*   publish failures

같은 시스템이라도 시작 화면이 다르면 실제 운영 속도가 훨씬 좋아진다.

**9\. Drill-down 원칙**

모든 카드가 drill-down을 가져야 하는 것은 아니지만, 아래는 반드시 drill-down이 있어야 한다.

*   KPI 카드 → 상세 진단 화면
*   Review Pending → Review queue
*   P0 Fix-It → P0 티켓 목록
*   Member Pending → member application list
*   Event completion missing → event completion board
*   Coverage gap → unanswered question list
*   Evidence gap → answer/story filter results

즉 Dashboard와 Observatory는 종착점이 아니라 **작업 큐 입구**다.

**10\. 경고·알림 설계 원칙**

권장 alert severity:

*   Critical
*   Warning
*   Info

**Critical 예시**

*   feed generation failure
*   reviewer 없는 public answer
*   broken event registration form
*   핵심 Event 일정 오류 correction pending

**Warning 예시**

*   related story 없는 public answer
*   180일 이상 update 없는 핵심 카드
*   closed event with no document

**Info 예시**

*   반복 질문 증가
*   membership interest surge
*   newsletter growth

**11\. 1차 MVP 화면 범위 권장안**

1차에서는 아래 화면만 강하게 구현해도 충분하다.

**Dashboard MVP**

*   Executive Strip
*   My Work Queue
*   Review Pending
*   Event Completion Alerts
*   Member/Registration Pending
*   Quick Actions

**Observatory MVP**

*   KPI Strip
*   Object Health
*   Trust Health
*   Archive Health
*   Root Cause Board
*   Fix-It Queue

2차에서 추가할 수 있는 것:

*   advanced trend charts
*   per-topic coverage heatmap
*   segment-based conversion dashboards
*   experiment / A-B log
*   monthly health snapshots

**12\. UI 설계 권장 원칙**

Dashboard/Observatory는 일반 CMS 표처럼만 보이면 안 된다.  
앞서 정의한 문화강국네트워크 디자인 시스템을 admin에도 일부 계승하되, 운영 효율을 우선한다.

권장 원칙:

*   상단 strip는 카드형
*   경고는 색상보다 label과 count를 분명히
*   표는 정렬/필터 우선
*   긴 텍스트보다 상태와 due date 우선
*   chart는 적게, queue는 많이
*   “보기 좋은 분석 화면”보다 “바로 일할 수 있는 운영 화면”을 우선

**13\. 이 화면 명세가 해결하는 문제**

이 구조를 적용하면 아래 문제가 줄어든다.

*   운영자가 처음 들어와서 어디서 시작할지 모르는 문제
*   KPI를 봐도 실제 수정 작업으로 연결되지 않는 문제
*   Event completion 누락이 방치되는 문제
*   회원/행사 신청이 콘텐츠 운영과 따로 노는 문제
*   반복 질문이 Question Capital로 승격되지 않는 문제
*   Review, Correction, Fix-It이 숨은 하위 기능으로 방치되는 문제

**14\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크 Admin Console의 Dashboard는 **오늘 해야 할 운영 작업을 행동 중심으로 보여주는 시작 화면**, Observatory는 **정답·해설·기록·신뢰·전환이 얼마나 건강하게 작동하는지 보여주는 진단 화면**이어야 합니다. AIO-PR가 Observatory를 KPI6와 Diagnostics & Fix-It이 이어지는 계기판으로 정의하고, B-SSoT가 운영 루프를 Question Capture에서 Fix-It·Re-Publish까지 닫힌 구조로 보며, 문화강국네트워크 구성안이 웹진·행사·자료·회원을 함께 운영하도록 요구한다는 점을 종합하면, Admin Dashboard·Observatory는 단순 통계 페이지가 아니라 **작업 큐와 KPI, Archive completion, Participation 흐름, Root Cause 보드가 함께 있는 운영 계기판**으로 설계하는 것이 가장 적합합니다.