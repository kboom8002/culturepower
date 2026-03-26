**19\_Observatory·KPI·Fix-It 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지를 공개한 뒤,  
**무엇을 측정할지**,  
**문제가 생기면 어떤 원인 체계로 진단할지**,  
**어떤 단위로 수정 티켓을 만들고 재배포할지**를 고정하는 데 있다.

이 문서는 단순 분석 리포트 문서가 아니다.  
이 문서는 문화강국네트워크를 **운영형 정답 인프라**로 만들기 위한 관측·진단·수정 기준서다. B-SSoT는 애초에 “사이트를 열어두는 것”이 아니라, 질문을 회수하고, 정답을 만들고, 신뢰를 보강하고, 전환을 연결하고, 지속적으로 수정하는 구조라고 정의됩니다.

**2\. Observatory의 한 줄 정의**

**문화강국네트워크 Observatory는 질문-정답-해설-기록-참여 구조가 실제로 채택·이해·인용·전환되는지 관측하고, 원인을 분류해 Fix-It 티켓으로 전환하는 운영 계기판이다.**

AIO-PR가 Observatory를 **관측·진단 레이어**로 두고, KPI6와 Fix-It 루프를 함께 설계하는 이유가 바로 여기에 있다.

**3\. 최상위 운영 철학**

**3.1 페이지뷰가 아니라 “정답 채택”을 본다**

전통 홈페이지는 페이지뷰, 세션, 체류시간을 먼저 봤지만, AI홈페이지는 그보다 **정답이 보였는가, 인용되었는가, 관련 구조로 이어졌는가**를 먼저 봐야 한다. B-SSoT 공통 프레임도 전통 홈페이지와 AI홈페이지의 차이를 **페이지뷰 KPI → 정답 채택/전환/신뢰 KPI**로 설명합니다.

**3.2 문화강국네트워크는 Media 패밀리 기준으로 본다**

문화강국네트워크는 Media 패밀리이므로, KPI도 단순 쇼핑 전환이나 예약 전환이 아니라

*   주제 허브 이해
*   Story 해설 소비
*   Event 기록 소비
*   Evidence chain 활용
*   구독/행사/협업 전환  
    구조로 봐야 한다. Media 패밀리의 전환 구조는 **구독/행사/협업/브랜드 영향력**으로 정의됩니다.

**3.3 수치만 보지 말고 “원인 분류 가능성”을 같이 본다**

좋은 Observatory는 숫자를 많이 보여주는 대시보드가 아니라,  
“왜 이 KPI가 약한가”를 바로 연결할 수 있어야 한다.  
AIO-PR 가이드도 Observatory 다음 단계에 바로 **Diagnostics & Fix-It**을 두고, 원인 분류를 자동화/티켓화/A-B로 연결합니다.

**4\. 문화강국네트워크 Observatory의 관측 층**

문화강국네트워크 Observatory는 아래 4층으로 운영한다.

**4.1 질문 자산 관측층**

*   어떤 질문이 많이 들어오는가
*   어떤 질문은 아직 정답카드가 없는가
*   어떤 질문군이 Story로만 있고 AnswerCard가 없는가
*   어떤 질문은 Event/자료로만 있고 정답화가 안 되었는가

이는 B-SSoT의 Question Capture → Canonicalization 단계와 직접 연결된다.

**4.2 정본 채택 관측층**

*   대표 AnswerCard가 얼마나 노출·소비되는가
*   TopicSummary가 허브 역할을 하고 있는가
*   문강 RIO Story가 AnswerCard를 서사적으로 잘 확장하는가
*   Event가 기록 정본으로 소비되는가

**4.3 신뢰 관측층**

*   Reviewer / UpdatedAt / Evidence가 실제로 보이는가
*   citation/evidence 연결이 약한 페이지는 어디인가
*   contradiction 가능성이 높은 페이지는 무엇인가
*   ChangeLog가 필요한 수정이 누락된 페이지는 어디인가

**4.4 전환 관측층**

*   뉴스레터 구독
*   회원가입
*   행사 신청
*   협력 문의  
    가 어떤 질문·정답·Story·Event에서 유입되는가

문화강국네트워크 구성안이 회원가입, 행사, 웹진, 자료, 단체 소개를 동시에 요구하므로, 이 4층을 함께 봐야 전체 운영이 맞다.

**5\. 핵심 KPI 체계**

**5.1 KPI 1 — Coverage**

정의:  
대표 질문 세트(QAMS)에서 문화강국네트워크의 정답이 실제 검색/AI/내부 탐색에서 얼마나 포착되는가.

AIO-PR 정의:  
**대표 쿼리에서 AI 오버뷰/답변 생성 비율**.

문화강국네트워크형 해석:

*   홈 퀵 질문
*   정답카드 검색어
*   문강 RIO 대표 질문
*   토론회/행사 관련 대표 질문
*   회원가입/참여 관련 질문  
    에 대해 정답 구조가 얼마나 잘 깔려 있는가를 보는 지표다.

권장 세분화:

*   Coverage\_QA: AnswerCard 존재 여부
*   Coverage\_SERP: 검색 노출 여부
*   Coverage\_AI: AI 답변 채택 여부
*   Coverage\_Internal: 내부 검색 결과 적합도

**5.2 KPI 2 — SSoT Citation**

정의:  
AI나 외부 요약, 또는 내부 추천 흐름에서 문화강국네트워크의 SSoT 도메인/정본 객체가 얼마나 인용·참조되는가.

AIO-PR 정의:  
**답변 내 SSoT 도메인 인용 비중**.

문화강국네트워크형 해석:

*   정답카드가 Story에서 얼마나 참조되는가
*   Story가 Event/자료와 얼마나 연결되는가
*   Event가 발제문/영상/후속 글로 얼마나 연결되는가
*   외부 요약에서 문화강국네트워크 URL/정답이 얼마나 등장하는가

**5.3 KPI 3 — Claim Capture**

정의:  
문화강국네트워크가 말하고 싶은 핵심 주장/정의/질문 구조가 실제 AnswerCard/Story/TopicSummary에 얼마나 제대로 잡혀 있는가.

AIO-PR 정의:  
**답변 문장이 ClaimGraph를 의미 함의하는 정도**.

문화강국네트워크형 해석:

*   “문화강국이란 무엇인가”
*   “K-문명이란 무엇인가”
*   “지역문화는 왜 중요한가”
*   “문화정책의 핵심 과제는 무엇인가”
*   “회원이 되면 무엇을 할 수 있는가”  
    같은 질문이 अस्पष्ट하지 않고 정답 객체에 제대로 고정되어 있는가를 본다.

**5.4 KPI 4 — Evidence Align**

정의:  
정답과 해설, 기록 페이지에서 제시한 주장과 근거 자료가 실제로 잘 맞물리는가.

AIO-PR 정의:  
**인용 URL ↔ EvidenceGraph 매칭률**.

문화강국네트워크형 해석:

*   AnswerCard의 Direct Answer에 근거 자료가 실제로 있는가
*   Story의 Based On Answers / 관련 자료가 실질적 근거로 작동하는가
*   Event에 발제문/영상/사진/자료가 실제로 붙어 있는가
*   ArchiveDocument가 고립돼 있지 않은가

**5.5 KPI 5 — Contradiction**

정의:  
정답카드, Story, TopicSummary, Event, 자료 사이에서 서술이 서로 어긋나거나 모순되는 비율.

AIO-PR 정의:  
**답변 문장 ↔ ClaimGraph 모순 비율**.

문화강국네트워크형 해석:

*   AnswerCard와 Story의 개념 정의가 다르지 않은가
*   Event 요약과 Story 해설이 충돌하지 않는가
*   Membership 안내와 실제 폼/안내가 다르지 않은가
*   K-문명 같은 민감 개념이 페이지마다 다른 뜻으로 쓰이지 않는가

**5.6 KPI 6 — TTI (Time-to-Inclusion)**

정의:  
새로 발행한 정답/해설/기록이 실제 탐색과 참조 구조 안에 포함되기까지 걸리는 시간.

AIO-PR 정의:  
**게시 → AI 인용까지 소요일수**.

문화강국네트워크형 해석:

*   새 AnswerCard가 홈, 정답카드 인덱스, Feed, sitemap에 반영되기까지의 시간
*   새 Story가 문강 RIO 허브와 관련 카드에 연결되기까지의 시간
*   Event 종료 후 자료/영상/후속 Story가 붙기까지의 시간

**6\. 보조 KPI 체계**

AIO-PR의 KPI6를 중심으로 보되, 문화강국네트워크 운영에는 아래 보조 KPI도 함께 둔다.

**6.1 Answer Adoption Rate**

*   대표 질문 클릭 후 AnswerCard 상세 진입률
*   AnswerCard 상세에서 Related Story 이동률

**6.2 Story Depth Rate**

*   Story에서 Deck 이후 본문 50% 이상 도달률
*   Story → 관련 AnswerCard / Event / Archive 이동률

**6.3 Archive Completion Rate**

*   Event 중 자료/영상/사진/후속 Story 중 최소 1개 이상이 붙은 비율
*   토론회 종료 후 발제문 반영률

구성안이 토론회 발제문 아카이빙과 문화행사 기록을 핵심 요구로 두므로, 이 보조 KPI는 매우 중요하다.

**6.4 Trust Visibility Rate**

*   Reviewer 노출 페이지 비율
*   UpdatedAt 노출 페이지 비율
*   근거 자료 블록 노출 페이지 비율
*   ChangeLog 링크 노출 비율

**6.5 Participation Conversion Rate**

*   Story → 뉴스레터 구독 전환
*   AnswerCard → 회원가입 전환
*   Event → 행사 신청 / 뉴스레터 구독 전환
*   Network → 협력 문의 전환

Media 패밀리의 전환이 구독/행사/협업/브랜드 영향력이라는 점을 고려하면, 이 지표는 필수 보조 KPI다.

**7\. KPI 기준선과 목표값**

AIO-PR는 12주 권장 SLO를  
**Coverage ≥60% / SSoT Citation ≥35% / Claim Capture ≥70% / Evidence Align ≥60% / Contradiction ≤5% / TTI ≤14일**  
로 제안합니다.

문화강국네트워크 1차 권장 목표는 아래처럼 둔다.

**7.1 1차 12주 기준선**

*   Coverage ≥ 50%
*   SSoT Citation ≥ 30%
*   Claim Capture ≥ 70%
*   Evidence Align ≥ 65%
*   Contradiction ≤ 7%
*   TTI ≤ 14일

**7.2 이유**

문화강국네트워크는 의료/YMYL처럼 외부 근거 규정이 극단적으로 엄격한 분야는 아니지만, Media 패밀리로서 **편집권·취재·전문성·출처 체인**이 중요하므로 Claim Capture와 Evidence Align의 기준을 높게 두는 것이 적절하다. 반면 런칭 초기에 Coverage와 SSoT Citation은 다소 보수적으로 시작해도 된다.

**8\. 관측 단위**

Observatory는 페이지별이 아니라 **객체별**로 본다. 이는 B-SSoT의 객체 중심 원칙과 동일하다.

**8.1 1차 객체 단위**

*   AnswerCard
*   Story
*   TopicSummary
*   Event
*   Video
*   ArchiveDocument
*   MembershipPlan

**8.2 객체군 단위**

*   정답군 (AnswerCard)
*   해설군 (Story)
*   기록군 (Event / Video / Archive)
*   신뢰군 (Expert / Evidence / ChangeLog)
*   전환군 (Membership / Newsletter / Event Signup)

**8.3 허브 단위**

*   Home
*   문강 RIO
*   정답카드 인덱스
*   행사·영상 허브
*   데이터·자료 허브
*   네트워크
*   참여·회원

이렇게 3단으로 봐야, “카드 하나의 문제인지”, “객체군의 문제인지”, “허브 설계의 문제인지”를 분리할 수 있다.

**9\. Root Cause 분류 체계**

AIO-PR는 Fix-It 전 단계에서 원인을 **스키마/콘텐츠/링크/톤/EEAT**로 자동 분류한다고 설명합니다.  
문화강국네트워크는 이를 아래 7개 root cause bucket으로 확장하는 것이 좋다.

**9.1 Schema / Feed / Sitemap 문제**

예:

*   FAQPage와 화면 Direct Answer 불일치
*   Article dateModified 누락
*   answers feed 누락
*   sitemap lastmod 불일치

**9.2 Content Shape 문제**

예:

*   AnswerCard는 있으나 질문이 모호함
*   Story에 Why This Matters 없음
*   TopicSummary가 카테고리 설명문 수준에 머묾
*   Event 요약이 빈약함

**9.3 Evidence / Trust 문제**

예:

*   Reviewer 없음
*   근거 자료 부실
*   UpdatedAt 누락
*   ChangeLog 필요하지만 없음

**9.4 Link Graph 문제**

예:

*   AnswerCard에 Related Story 0개
*   Story에 Based On Answers 0개
*   Event에 자료/영상/후속 Story 없음
*   Membership CTA 고립

**9.5 Tone / Framing 문제**

예:

*   문강 RIO가 해설형이 아니라 홍보문처럼 보임
*   K-문명 글이 선언형/우월성 문구로 오해됨
*   Join 페이지가 판매 랜딩처럼 보임

**9.6 Archive Completion 문제**

예:

*   행사는 공개됐지만 발제문·사진·영상 반영이 안 됨
*   Event가 일정 게시물처럼만 존재
*   ArchiveDocument가 고립

**9.7 Conversion Mapping 문제**

예:

*   Story에서 뉴스레터로 안 이어짐
*   Event에서 행사 신청/후속 행동이 안 보임
*   정답카드에서 참여 CTA가 없음

**10\. Fix-It 티켓 구조**

Fix-It은 “수정해 주세요” 수준이 아니라, **원인-조치-검증이 묶인 운영 티켓**이어야 한다. AIO-PR도 Fix-It을 자동 분류→티켓화→배포→A/B→리프트 기록으로 봅니다.

권장 티켓 포맷:

**10.1 기본 필드**

*   티켓 ID
*   객체 유형
*   객체 ID / URL
*   문제 설명
*   KPI 영향
*   Root Cause 분류
*   우선순위
*   담당자
*   마감일
*   수정안
*   검수자
*   배포일
*   결과 측정

**10.2 예시**

Ticket ID: FX-ANS-014

Object Type: AnswerCard

Object ID: ans:k-civilisation-001

Issue: Direct Answer는 명확하지만 관련 Story 연결이 없음

KPI Impact: SSoT Citation, Claim Capture, No Dead-end

Root Cause: Link Graph

Priority: P1

Owner: 콘텐츠 기획·편집

Reviewer: 편집장

Fix Plan:

\- Related Story 2개 연결

\- 관련 Event 1개 연결

\- CTA를 뉴스레터 구독에서 관련 행사 보기로 보완

Validation:

\- 상세 하단 관련 블록 노출 확인

\- 2주 후 클릭률 재측정

**11\. Fix-It 우선순위 규칙**

**P0**

즉시 조치가 필요한 항목

*   Reviewer / UpdatedAt 누락
*   FAQPage / Direct Answer 불일치
*   핵심 질문군 정답카드 없음
*   Feed / sitemap 오류
*   Event 자료 링크 깨짐
*   Membership/문의 폼 고장

**P1**

1주 내 조치 권장

*   Related Story / Related Answer 부족
*   Story의 Why This Matters 약함
*   TopicSummary 대표 객체 부족
*   홈 Featured 정렬 문제
*   Event 기록 보강 지연

**P2**

다음 스프린트 반영

*   검색 힌트 개선
*   카드 문구 미세 개선
*   추천 로직 보강
*   ChangeLog UI 고도화
*   Archive filter UX 개선

**12\. 운영 주기**

**12.1 주간 루프**

B-SSoT와 AIO-PR가 공통으로 요구하는 최소 운영 단위는 **주간 루프**다.

주간 회의 안건:

*   KPI6 변화
*   movers ±3
*   새 반복 질문
*   Fix-It 티켓 3개 이상
*   Event/Archive completion 점검
*   정정/수정 요청 현황
*   다음 주 Featured 교체 여부

**12.2 월간 루프**

월간 점검 항목:

*   TopicSummary 건강도
*   고립 AnswerCard/Story/Event 수
*   Archive completeness
*   Membership conversion 흐름
*   톤 일관성
*   Feed / sitemap / schema lint 누적

**12.3 분기 루프**

AIO-PR도 분기 게이트 리뷰를 권장합니다.

분기 점검 항목:

*   KPI 목표 대비 갭
*   대표 질문군 재정의 필요 여부
*   신규 TopicSummary 필요 여부
*   Answer Feed 확장 여부
*   다국어 / locale 필요 여부
*   구조 변경 여부

**13\. Observatory 화면 권장 구조**

문화강국네트워크 내부 운영 대시보드는 아래 5개 섹션으로 구성하는 것이 좋다.

**13.1 Executive Strip**

*   Coverage
*   SSoT Citation
*   Claim Capture
*   Evidence Align
*   Contradiction
*   TTI

**13.2 Object Health**

*   AnswerCard health
*   Story health
*   Event health
*   Archive completeness
*   Membership mapping health

**13.3 Root Cause Board**

*   Schema
*   Content
*   Evidence
*   Link Graph
*   Tone
*   Archive
*   Conversion

**13.4 Fix-It Queue**

*   P0 / P1 / P2
*   담당자
*   마감일
*   검수 상태

**13.5 Release & Re-Publish Log**

*   이번 주 수정 객체
*   업데이트일 변경
*   Feed/sitemap 반영 여부
*   리프트 확인

**14\. 문화강국네트워크 적용 예시**

**14.1 K-문명 질문군**

관측 대상:

*   K-문명이란 무엇인가 AnswerCard
*   K-문명의 가능성 Story
*   관련 토론회 Event
*   관련 발제문 ArchiveDocument

봐야 할 것:

*   카드와 Story의 정의가 일치하는가
*   Story가 선언형 문구로 오해되지 않는가
*   Event/자료 연결이 충분한가
*   CTA가 구독/행사/관련 해설로 잘 이어지는가

실제 원고가 K-문명을 우월성 선언이 아니라 분석적 이름으로 제한하고, 감정·기술·제도의 통합 가능성을 묻는 구조를 가지므로, 이 질문군은 Claim Capture, Contradiction, Tone의 대표 테스트 세트가 될 수 있다.

**14.2 토론회 아카이브 질문군**

관측 대상:

*   Event 상세
*   발제문 PDF
*   후속 Story
*   관련 정답카드

봐야 할 것:

*   Event가 단순 일정 페이지가 아닌가
*   발제문/자료집/사진/영상이 붙었는가
*   후속 Story가 있는가
*   관련 TopicSummary 또는 AnswerCard로 이어지는가

문화강국네트워크 구성안이 토론회 개요와 발제문 아카이빙을 명시하므로, 이 질문군은 Archive Completion, Evidence Align, Link Graph의 핵심 테스트 세트다.

**14.3 참여 전환 질문군**

관측 대상:

*   회원가입 AnswerCard
*   참여·회원 허브
*   뉴스레터 CTA
*   Event 신청 CTA

봐야 할 것:

*   설명 후 CTA 구조가 지켜지는가
*   Story/Answer/Event에서 Join으로 자연스럽게 이어지는가
*   구독/회원/협력 문의가 과도하게 판매형으로 보이지 않는가

**15\. 최종 결론**

이 명세서의 핵심은 단순합니다.  
문화강국네트워크 AI홈페이지의 Observatory는 페이지뷰 대시보드가 아니라, **질문-정답-해설-기록-참여가 실제로 채택·이해·인용·전환되는지**를 보는 운영 계기판이어야 합니다. AIO-PR가 KPI6를 **Coverage / SSoT Citation / Claim Capture / Evidence Align / Contradiction / TTI**로 제시하고, 그 다음 단계에 바로 **Diagnostics & Fix-It**을 붙이며, B-SSoT가 모든 도메인에서 **질문 자산 → 정본 → 측정 → 원인 → 조치** 프레임을 유지하라고 요구한다는 점을 종합하면, 문화강국네트워크도 이 6개 KPI를 중심으로 보고, root cause를 **Schema / Content / Evidence / Link Graph / Tone / Archive / Conversion**으로 나눠 Fix-It 티켓으로 운영하는 것이 가장 적합합니다. 이렇게 해야 문강 RIO, 정답카드, 행사·영상, 발제문 아카이브, 회원 참여가 하나의 Media SSoT형 운영 시스템으로 닫힙니다.