**23\_Content Workflow 상태 전이 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console에서 모든 핵심 운영 객체가 어떤 상태를 거쳐 생성·검수·공개·보류·수정·보존되는지 **상태 전이 규격**으로 고정하는 데 있다.

이 문서는 다음을 해결해야 한다.

*   어떤 객체가 어떤 기본 상태 집합을 갖는가
*   상태 전이는 어떤 순서로만 허용되는가
*   어떤 역할이 어떤 상태 전이를 실행할 수 있는가
*   공개 전 필수 검증 조건은 무엇인가
*   공개 후 수정은 어떤 방식으로 처리되는가
*   Hidden / Archived는 언제 쓰는가
*   Fix-It과 Re-Publish는 상태 전이상 어떻게 반영되는가

즉, 이 문서는 문화강국네트워크의 콘텐츠 운영 문장을 상태 머신 규격으로 바꾸는 문서다.

**2\. 워크플로 설계의 최상위 원칙**

**2.1 상태값은 운영 루프를 반영해야 한다**

문화강국네트워크의 상태값은 단순 CMS 편의 기능이 아니라,  
질문 수집 → 정답 생산 → 검수 → 공개 → 측정 → 수정 → 재배포라는 B-SSoT 루프를 운영 화면에 반영하는 장치여야 한다.

**2.2 Draft에서 바로 Public으로 가면 안 된다**

Reviewer, Evidence, UpdatedAt, CTA, Related Object가 중요한 시스템이므로,  
초안 작성자가 직접 Public으로 넘기는 흐름은 금지한다.  
hanjunho 운영 문서도 Draft → Review → Public을 실무 기본값으로 두고, 공개 상태 엄격 관리를 핵심 원칙으로 둡니다.

**2.3 Hidden과 Archived는 목적이 다르다**

*   Hidden은 **잠시 내림 / 실수 방지 / 재검토용**
*   Archived는 **보존 / 탐색 제외 / 운영 종료용**  
    으로 구분해야 한다.

**2.4 객체별로 같은 상태 집합을 쓰되, 가드 조건은 다르게 둔다**

모든 객체에 별도 상태 체계를 만들면 운영이 복잡해진다.  
따라서 기본 상태는 공통으로 두고, AnswerCard / Story / Event / Membership별 공개 가드만 다르게 두는 편이 좋다.

**2.5 상태 전이에는 이유(reason)가 남아야 한다**

특히 아래 전이는 이유 로그가 필요하다.

*   Review 반려
*   Public → Hidden
*   Public → Archived
*   Hidden → Review
*   Re-Publish
*   Membership 신청 거절

**3\. 적용 대상 객체**

이 문서의 상태 전이는 아래 객체에 적용한다.

**퍼블릭 콘텐츠 객체**

*   TopicSummary
*   AnswerCard
*   Story
*   Event
*   Video
*   ArchiveDocument
*   Expert
*   Partner
*   ResourceItem
*   MembershipPlan
*   NewsletterIssue

**운영 객체**

*   QuestionIntake
*   CorrectionRequest
*   FixItTicket

**참여 객체**

*   MemberApplication
*   NewsletterSubscriber
*   EventRegistration
*   PartnershipInquiry

**4\. 공통 기본 상태 집합**

문화강국네트워크의 퍼블릭 콘텐츠 객체는 아래 5개 기본 상태를 공통으로 사용한다.

1.  Draft
2.  Review
3.  Public
4.  Hidden
5.  Archived

이 상태 집합은 hanjunho 운영 플레이북의 권장 상태값과 동일하며, 문화강국네트워크에도 가장 안정적이다.

**4.1 Draft**

정의: 초안 작성 상태  
특징:

*   외부 공개 대상 아님
*   필드 일부 비어 있을 수 있음
*   Evidence, Reviewer, Related Object가 완성되지 않았을 수 있음

**4.2 Review**

정의: 내부 검토/검수 대기 상태  
특징:

*   공개 직전 점검 상태
*   카피, 메타, 연결, Evidence, Reviewer를 확인
*   반려 가능

**4.3 Public**

정의: 대외 공개 상태  
특징:

*   검색/AI/내부 탐색 대상
*   Feed/sitemap 대상이 될 수 있음
*   Featured 후보가 될 수 있음

**4.4 Hidden**

정의: 공개 중단 상태  
특징:

*   삭제는 아님
*   퍼블릭 탐색/추천/색인 대상에서 제외
*   재검토 후 Review 또는 Archived로 전환 가능

**4.5 Archived**

정의: 보존 상태  
특징:

*   운영상 종료
*   탐색에서 원칙적으로 제외
*   기록 보존은 유지
*   일반적으로 다시 Public으로 복귀시키지 않음  
    복귀가 필요하면 새 검토를 거쳐 새 객체 또는 복원 정책을 적용

**5\. 공통 상태 전이 규칙**

**5.1 허용 전이**

기본 허용 전이는 아래와 같다.

*   Draft → Review
*   Review → Draft
*   Review → Public
*   Public → Hidden
*   Hidden → Review
*   Hidden → Archived
*   Public → Archived

**5.2 제한 전이**

원칙적으로 금지하거나 예외 승인만 허용하는 전이:

*   Draft → Public 금지
*   Draft → Archived 금지
*   Review → Archived 금지
*   Archived → Public 원칙적 금지
*   Archived → Draft 원칙적 금지

**예외 규칙**

Archived → Review는 운영 총괄 승인 하에 예외적으로 허용할 수 있다.  
단, 이 경우 재공개 전 전체 검수 루프를 다시 거쳐야 한다.

**6\. 상태 전이 다이어그램(공통)**

Draft

└─(검수 요청)→ Review

Review

├─(반려)→ Draft

└─(승인)→ Public

Public

├─(임시 비노출/문제 발견)→ Hidden

└─(운영 종료/보존)→ Archived

Hidden

├─(재검토 필요)→ Review

└─(보존 전환)→ Archived

Archived

└─(예외 승인 시)→ Review

**7\. 상태별 필수 조건**

**7.1 Draft 진입 조건**

없음.  
단, 최소한 객체 타입과 제목 또는 임시 식별자는 있어야 한다.

**7.2 Review 진입 조건**

Review로 넘기려면 최소 아래가 필요하다.

**공통**

*   Title/Name 있음
*   Slug 있음
*   Owner 있음
*   Last Updated 초안값 있음
*   CTA 초안 있음

**권장**

*   Related Object 1개 이상
*   Meta 초안
*   Featured 여부 명시

**7.3 Public 진입 조건**

Public은 가장 엄격하다.

**공통 필수**

*   Reviewer 있음
*   Last Updated 있음
*   상태 전이 reason 또는 approval log 있음
*   퍼블릭 URL 생성 가능
*   치명적 빈칸 없음

**추가 필수**

객체 유형별 가드 조건은 아래 별도 정의

**7.4 Hidden 진입 조건**

다음 중 하나 이상이면 Hidden으로 전환 가능하다.

*   오류 발견
*   샘플/테스트 성격 확인
*   관련성 부족
*   재검토 필요
*   정책 변경으로 임시 비노출 필요

**7.5 Archived 진입 조건**

*   더 이상 운영 노출할 필요가 없음
*   보존 가치만 남음
*   중복/폐기 대상이나 기록상 유지 필요
*   이벤트 종료 후 장기 보존 전환
*   오래된 MembershipPlan/문의 템플릿 종료

**8\. 객체별 Public 가드 조건**

**8.1 TopicSummary**

Public 가드:

*   One-line Definition 있음
*   Primary Questions 있음
*   Representative AnswerCard 최소 1개
*   Representative Story 최소 1개
*   Pillar 있음
*   Last Updated 있음

**8.2 AnswerCard**

Public 가드:

*   Question 있음
*   Direct Answer 있음
*   Category 있음
*   Pillar 있음
*   Reviewer 있음
*   Evidence 최소 1개
*   CTA 있음
*   Related Story 최소 1개 권장
*   샘플/테스트 흔적 없음

이 규칙은 B-SSoT 최소 정답 단위와 hanjunho 카드 공개 승인 기준을 문화강국네트워크형으로 적용한 것이다.

**8.3 Story**

Public 가드:

*   Title 있음
*   Deck 있음
*   Section 있음
*   Story Type 있음
*   Why This Matters 있음
*   Based On Answers 최소 1개
*   Reviewer 있음
*   Last Updated 있음
*   CTA 있음
*   범용/무관 일반론 아님

hanjunho 운영 문서도 기사형 해설은 Related Cards 최소 1개와 검수, 출처, 요약이 맞지 않으면 Public 금지 대상으로 봅니다.

**8.4 Event**

Public 가드:

*   Event Name 있음
*   Event Summary 있음
*   Event Date Start 있음
*   Event Status 있음
*   Topic 또는 Answer 연결 있음
*   CTA 있음

**Archived Event의 추가 권장**

*   발제문/자료집/사진/영상/후속 Story 중 최소 1개 이상 연결

문화강국네트워크 구성안이 토론회 개요 및 발제문 아카이빙, 문화행사 사진 기록을 요구하므로, Event는 일정만 있는 상태로 장기 운영되면 안 된다.

**8.5 Video**

Public 가드:

*   Video Title 있음
*   Summary 있음
*   Embed URL 또는 원출처 URL 있음
*   Event 또는 Story 연결 최소 1개
*   Last Updated 있음

**8.6 ArchiveDocument**

Public 가드:

*   Title 있음
*   Document Type 있음
*   File 또는 URL 있음
*   Event / Story / Topic 연결 최소 1개
*   Last Updated 있음

**8.7 Expert**

Public 가드:

*   Name 있음
*   Role 있음
*   Short Summary 있음
*   연결된 Story/Event/Answer 최소 1개
*   프로필 페이지용 대표 설명 있음

**8.8 MembershipPlan**

Public 가드:

*   Plan Name 있음
*   Plan Type 있음
*   Short Benefit Summary 있음
*   CTA URL 있음
*   관련 Answer/Story/Event 중 최소 1개 연결 권장

**9\. Review 상태 세부 하위 상태**

기본 상태값은 Review 하나로 유지하되, 내부적으로는 아래 서브스테이터스를 두는 것이 좋다.

*   Review: Pending
*   Review: In Progress
*   Review: Changes Requested
*   Review: Approved

이 하위 상태는 UI에서만 보이고, 최상위 상태값은 여전히 Review로 유지해도 된다.

**장점**

*   검수 큐 관리가 쉬움
*   누가 멈춰 있는지 보임
*   반려와 단순 대기 상태를 구분 가능

**10\. Re-Publish 워크플로**

B-SSoT 운영 루프는 Publish 이후에도 Measure → Root Cause → Fix-It → Re-Publish를 요구합니다. 따라서 Public 이후 수정은 단순 저장이 아니라 경우에 따라 재검토 루프를 타야 합니다.

**10.1 Re-Publish가 필요한 경우**

아래 경우는 Public → Hidden → Review → Public 또는 Public 유지 + Review shadow flow를 권장한다.

*   핵심 정의 변경
*   근거 자료 대폭 수정
*   Reviewer 변경
*   Event 내용 중 중요한 사실 수정
*   Membership 조건 변경
*   K-문명, 문화강국 같은 핵심 개념 정의 수정

**10.2 단순 Update로 끝나는 경우**

아래는 Public 유지 상태에서 업데이트해도 된다.

*   오탈자 수정
*   링크 수정
*   이미지 교체
*   메타 보완
*   관련 링크 1~2개 추가

**10.3 운영 규칙**

*   중요한 수정이면 ChangeLog 남김
*   Feed 포함 객체면 updated\_at 재생성
*   sitemap lastmod 갱신
*   필요 시 reviewer 재확인

**11\. Hidden 사용 규칙**

Hidden은 “삭제 대기”가 아니라 **운영 안전장치**다.

**Hidden으로 보내는 대표 사례**

*   샘플/테스트 흔적 발견
*   범용 브리핑 / 관련성 낮은 Story
*   Event 자료 오류
*   멤버십 CTA 오류
*   중복 객체 발견
*   메타/카테고리 혼선이 큰 경우

hanjunho 운영 문서도 샘플 카드, 테스트 카드, 범용 브리핑은 Hidden 또는 Archived로 두라고 명확히 말합니다.

**Hidden에서 나오는 방법**

*   수정 완료 후 Review 재진입
*   필요 없으면 Archived로 종료

**12\. Archived 사용 규칙**

Archived는 **기록 보존용 종료 상태**다.

**대표 사례**

*   오래된 Event 기록
*   종료된 MembershipPlan
*   더 이상 노출하지 않는 Resource
*   구조 변경으로 폐기된 구형 객체
*   중복 정리 후 남긴 보존본

**Archived의 운영 원칙**

*   탐색에서 제외
*   내부 참조 가능
*   feed/sitemap 제외
*   Featured 불가
*   수정은 예외적으로만 허용

**13\. 객체별 특수 워크플로**

**13.1 Event Completion 워크플로**

Event는 일반 콘텐츠보다 후행 작업이 중요하므로 별도 completion 흐름을 둔다.

권장 내부 필드:

*   schedule\_ready
*   summary\_ready
*   speaker\_ready
*   document\_ready
*   photo\_ready
*   video\_ready
*   followup\_story\_ready

**Event 운영 흐름**

*   Draft: 행사 생성
*   Review: 일정/개요 검토
*   Public: 행사 공개
*   Public 유지: 행사 종료 후 자료/영상/사진 추가
*   Archived: 기록 보존 전환

즉 Event는 Public 이후 completion이 계속 진행되는 객체다. 문화강국네트워크 요구상 발제문과 사진 기록이 중요하므로 이 흐름이 필수다.

**13.2 Question Intake 워크플로**

질문/제안/정정 요청은 퍼블릭 상태값과 अलग 흐름을 가진다.

권장 상태:

*   New
*   Triaged
*   Mapped
*   Converted
*   Closed

의미:

*   New: 새 인입
*   Triaged: 유형 분류
*   Mapped: Answer/Story/Event/Correction으로 매핑
*   Converted: 실제 객체 생성 또는 보강 반영
*   Closed: 처리 종료

**13.3 CorrectionRequest 워크플로**

권장 상태:

*   Submitted
*   Under Review
*   Accepted
*   Rejected
*   Implemented
*   Closed

**14\. 참여 객체 상태 전이**

참여/회원 객체는 퍼블릭 콘텐츠와 다른 상태 체계를 쓴다.

**14.1 MemberApplication**

권장 상태:

*   Submitted
*   Screening
*   Approved
*   Rejected
*   On Hold
*   Archived

**14.2 NewsletterSubscriber**

권장 상태:

*   Subscribed
*   Unsubscribed
*   Suppressed

**14.3 EventRegistration**

권장 상태:

*   Submitted
*   Confirmed
*   Waitlisted
*   Cancelled
*   Attended
*   No Show

**14.4 PartnershipInquiry**

권장 상태:

*   New
*   In Review
*   Replied
*   Qualified
*   Closed

참여 객체는 개인정보와 운영 액션이 중요하므로, 공개/비공개가 아니라 **처리 진행 상태**를 중심으로 관리한다.

**15\. 역할별 상태 전이 권한 요약**

**콘텐츠 편집 담당**

가능:

*   Draft 생성
*   Draft 수정
*   Draft → Review 요청
*   Review 반려 후 수정

불가:

*   Review 승인
*   Public 전환
*   Hidden/Archived 최종 전환

**리서치/자료 담당**

가능:

*   Draft/Review 상태에서 Evidence, Archive, 링크 보강
*   Event completion 보강
*   Review 요청 보조

불가:

*   Public 전환

**검수자**

가능:

*   Review 코멘트
*   Review 승인
*   Review 반려

권장 불가:

*   직접 Publish  
    단, 소규모 운영에서는 예외 가능

**운영 총괄**

가능:

*   Review → Public
*   Public → Hidden
*   Hidden → Review
*   Hidden → Archived
*   Public → Archived
*   예외적 Archived → Review 승인

이 역할 구조는 앞서 정의한 RBAC 문서와 정합적으로 맞물린다.

**16\. 자동 lint / 경고 규칙**

상태 전이는 수동 실수 방지가 필요하다. 따라서 아래 자동 경고를 권장한다.

**Review 진입 시 경고**

*   Title 없음
*   Slug 없음
*   Reviewer 미지정
*   Last Updated 없음

**Public 진입 시 차단**

*   Direct Answer 없음
*   Evidence 0개
*   CTA 없음
*   Based On Answers 0개
*   Event Date 없음
*   File/URL 없음
*   샘플 태그 남아 있음

**Hidden 장기 방치 경고**

*   Hidden 14일 초과
*   Hidden인데 owner 없음
*   Hidden인데 reason 없음

**Public 품질 경고**

*   Public인데 UpdatedAt 180일 초과
*   Public Story인데 Related Answer 0개
*   Public Event인데 Archive/Video/Story 0개
*   Public MembershipPlan인데 CTA 오류

**17\. 운영 SLA 권장안**

**Draft → Review**

*   일반 콘텐츠: 작성 후 3영업일 이내
*   긴급 이슈: 1영업일 이내

**Review → Public**

*   일반 콘텐츠: 2영업일 이내
*   긴급 이슈: 당일 또는 1영업일 이내

**Event completion**

*   행사 종료 후 7일 이내 1차 summary/사진
*   14일 이내 자료/영상/후속 Story 권장

**Correction**

*   사실 오류: 1영업일 내 검토 시작
*   링크/오탈자: 3영업일 내 수정 권장

**18\. 이 워크플로가 해결하는 문제**

이 상태 전이 체계를 적용하면 다음 문제가 줄어든다.

*   Draft가 실수로 바로 공개되는 문제
*   Reviewer 없는 정답카드/Story 공개
*   샘플/테스트 콘텐츠 노출
*   Event가 공지 게시물로만 끝나는 문제
*   Hidden 상태 장기 방치
*   수정 후 재검토 없이 Public 유지
*   Membership/문의 처리 누락

hanjunho 레퍼런스가 경고한 샘플 카드, 범용 브리핑, Reviewer 혼선, 상태값 느슨함 문제를 구조적으로 막아주는 효과가 있다.

**19\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크의 Content Workflow는 단순한 게시 승인 흐름이 아니라, **질문 회수 → 정답·해설·기록 객체 생산 → 검수 → 공개 → 관측 → 수정 → 재배포**를 지원하는 상태 전이 체계여야 합니다. 이를 위해 모든 퍼블릭 콘텐츠 객체는 Draft / Review / Public / Hidden / Archived의 공통 상태 집합을 사용하되, AnswerCard·Story·Event·Archive·MembershipPlan별 Public 가드를 अलग 두고, Event/QuestionIntake/Correction/MemberApplication에는 별도 보조 워크플로를 둬야 합니다. 문화강국네트워크 요구안이 웹진, 행사, 발제문 아카이빙, 문화행사 기록, 회원가입을 함께 요구하고, B-SSoT가 운영 루프와 최소 정답 단위를 고정하며, hanjunho 운영 문서가 공개 상태와 Review 단계를 엄격히 관리하라고 요구한다는 점을 종합하면, 이 상태 전이 명세는 Admin Console의 핵심 운영 규격이 됩니다.