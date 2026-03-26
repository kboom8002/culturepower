**25\_Inbox·Question Capture·Correction 처리 규칙 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console의 Inbox에서 들어오는 **질문, 제안, 정정 요청, 행사/회원/협력 문의**를 어떤 규칙으로 분류하고, 어떤 객체로 전환하며, 어떤 경우에 Correction workflow로 처리할지를 명확히 정하는 데 있다.

이 문서는 다음을 해결해야 한다.

*   어떤 인입 유형을 기본 유형으로 볼 것인가
*   질문은 어떤 기준으로 AnswerCard / Story / Event / Membership 보강으로 전환되는가
*   제안은 누구에게 어떻게 escalated 되는가
*   정정 요청은 어떤 경우 CorrectionRequest가 되는가
*   모든 인입이 즉시 공개되지 않도록 어떤 선별 기준을 둘 것인가
*   처리 속도와 구조화 사이에서 어떤 원칙을 유지할 것인가

즉, 이 문서는 문화강국네트워크의 “문의함”을 **질문 자산과 정정 자산을 회수하는 운영 허브**로 바꾸는 문서다.

**2\. Inbox의 한 줄 정의**

**Inbox는 문화강국네트워크 AI홈페이지로 유입되는 질문·제안·정정·행사·회원·협력 관련 입력을 수집하고, 이를 정답·해설·기록·참여 운영 객체로 변환하는 운영 관문이다.**

퍼블릭 사이트에서는 하나의 폼처럼 보일 수 있어도, 운영 관점에서는 이 공간이 Question Capture의 시작점이다. B-SSoT가 질문 자산을 핵심 무형자산으로 보고, 운영 루프의 첫 단계로 Question Capture를 두는 이유가 바로 여기에 있다.

**3\. 최상위 처리 원칙**

**3.1 모든 인입을 곧바로 답변 페이지로 만들지 않는다**

질문이 들어왔다고 바로 새로운 정답카드나 Story를 발행하지 않는다.  
먼저 아래를 판단해야 한다.

*   기존 AnswerCard 보강으로 충분한가
*   기존 Story나 TopicSummary에 흡수 가능한가
*   새 AnswerCard가 필요한가
*   새 Story가 필요한가
*   Event/Archive 후속 보강이 필요한가
*   Correction으로 처리해야 하는가

hanjunho 레퍼런스도 “즉흥적으로 대답 페이지를 만들기보다 카드·브리핑·팩트체크 구조로 흡수할 수 있을지 먼저 판단하라”고 명시합니다. 문화강국네트워크도 같은 규칙이 적절합니다.

**3.2 속도보다 구조화가 중요하다**

Inbox 운영에서 중요한 것은 “얼마나 빨리 답했는가”보다,  
“어떤 유형인지 정확히 분류했고, 적절한 객체로 연결했는가”다.  
문화강국네트워크는 Media SSoT 구조이므로, 질문 하나가 정답카드가 될지, 해설형 Story가 될지, 행사 후속 기록이 될지, 회원/협력 전환이 될지 구분하는 것이 핵심이다.

**3.3 Correction은 일반 문의와 분리한다**

사실관계 오류, 잘못된 날짜, 사람 이름/직함 오류, 잘못된 행사 정보, 링크 오류, 핵심 개념 오해를 유발하는 표현은 일반 문의가 아니라 Correction 또는 Correction Candidate로 분리해야 한다. B-SSoT가 Correction Path와 ChangeLog를 Trust Layer의 일부로 보기 때문에, 문화강국네트워크도 정정은 별도 처리 흐름을 가져야 한다.

**3.4 반복 질문은 Question Capital로 승격한다**

한 번 들어온 질문은 문의 처리로 끝날 수 있지만,  
반복되는 질문은 Question Capital 후보가 된다.  
즉 Inbox는 단순 고객 응대 공간이 아니라, 정답카드 생산 후보군을 축적하는 공간이어야 한다. B-SSoT가 Question Capital을 핵심 자산으로 정의하는 이유가 여기에 있다.

**4\. Inbox 인입 유형 정의**

문화강국네트워크 Inbox의 기본 인입 유형은 아래 7개로 정의한다.

**4.1 Question**

의미:  
문화강국, K-문명, 지역문화, 문화정책, 행사, 회원, 자료에 대한 일반 질문

예:

*   문화강국이 정확히 무엇인가요?
*   회원이 되면 어떤 활동을 하나요?
*   지난 토론회 발제문은 어디서 보나요?

**4.2 Suggestion**

의미:  
콘텐츠 보강, 주제 제안, 섹션 개선, 인터뷰 제안, 행사 아이디어 제안

예:

*   지역문화 사례를 더 많이 다뤄주세요.
*   청년 문화정책 특집을 제안합니다.

**4.3 Correction**

의미:  
사실 오류, 날짜/장소/이름 오류, 링크 오류, 오해를 부르는 표현에 대한 정정 요청

예:

*   행사 날짜가 잘못 적혀 있습니다.
*   발제자 이름이 틀렸습니다.
*   K-문명 설명이 오해될 수 있습니다.

**4.4 Membership Inquiry**

의미:  
회원 가입, 회원 자격, 활동 범위, 신청 상태에 대한 문의

**4.5 Event Inquiry**

의미:  
행사 신청, 일정, 참여 방식, 자료 배포, 참석 확인 관련 문의

**4.6 Partnership Inquiry**

의미:  
협력/제휴/공동 기획/행사 협업 제안

**4.7 General / Other**

의미:  
위 유형에 분명히 속하지 않는 일반 문의

이렇게 분리하는 이유는, 문화강국네트워크가 웹진, 행사, 회원, 협력 구조를 함께 가진 복합 운영형 미디어이기 때문이다. 실제 구성안도 홈에서 회원가입, 행사/토론회/캠페인, 문화예술정보를 함께 운영하도록 요구한다.

**5\. Inbox 운영 상태값**

Inbox 객체는 퍼블릭 콘텐츠 상태값과 다른 상태 체계를 가진다.

권장 상태:

*   New
*   Triaged
*   Mapped
*   In Progress
*   Closed
*   Archived

**5.1 New**

새로 접수된 상태. 아직 분류되지 않았다.

**5.2 Triaged**

유형, 중요도, owner가 지정된 상태.

**5.3 Mapped**

어떤 후속 객체/작업으로 연결할지 결정된 상태.  
예:

*   AnswerCard 후보
*   Story 보강
*   Event correction
*   Membership follow-up

**5.4 In Progress**

실제 수정/작성/응답 작업이 진행 중인 상태.

**5.5 Closed**

처리 완료 상태.  
단, 반드시 “무엇으로 처리되었는지” 기록이 있어야 한다.

**5.6 Archived**

장기 보존 상태. 운영상 종료되었고 재처리하지 않는다.

**6\. 처리 우선순위 규칙**

Inbox는 아래 3단 우선순위로 분류한다.

**P0 — 즉시 확인 필요**

*   퍼블릭 오류 가능성
*   행사 일정/장소 오류
*   잘못된 링크
*   회원 신청/행사 신청 처리 장애
*   법적/평판 리스크 가능성
*   잘못된 인물명/기관명/직함

**P1 — 일반 운영 우선순위**

*   반복 질문
*   핵심 TopicSummary/AnswerCard 보강 제안
*   중요한 협력 제안
*   행사 자료 요청
*   구독/회원 흐름 개선 제안

**P2 — 축적형 제안**

*   장기 콘텐츠 아이디어
*   향후 특집 주제
*   개선 제안
*   단순 일반 문의

**7\. Question 처리 규칙**

**7.1 기본 원칙**

Question은 우선 아래 4가지를 본다.

1.  반복성
2.  중요도
3.  기존 객체로 해결 가능한지
4.  사이트 정체성과의 관련성

hanjunho 운영 문서도 질문은 Answer Card 후보로 검토하되, 반복 빈도와 중요도, relevance를 기준으로 선별 반영하라고 합니다.

**7.2 처리 흐름**

Question → Triaged → Mapped

Mapped 이후 가능한 목적지는 아래다.

*   기존 AnswerCard 보강
*   새 AnswerCard 생성
*   기존 Story 보강
*   새 Story 생성
*   FAQ/검색 힌트 보강
*   Membership/Join 안내 보강
*   Event 상세 보강
*   단순 응답 후 종료

**7.3 새 AnswerCard 후보 기준**

아래 중 2개 이상이면 새 AnswerCard 후보로 본다.

*   같은 질문이 반복적으로 들어옴
*   홈 퀵 질문 또는 검색어로 자주 등장
*   핵심 TopicSummary와 직접 연결됨
*   기존 AnswerCard로는 설명이 부족함
*   회원/행사/협력 전환과 직접 연결됨

**7.4 Story 후보 기준**

아래 중 2개 이상이면 Story 후보로 본다.

*   질문이 단순 정의가 아니라 맥락/쟁점/해설을 요구함
*   기존 카드만으로 설명이 부족함
*   문강 RIO 섹션과 잘 맞음
*   관련 Event / Archive / 외부 자료가 있음

**7.5 단순 응답 후 종료 가능 질문**

*   운영 시간
*   링크 위치
*   행사 신청 방법
*   발제문 접근 경로
*   구독/해지 방법

단, 단순 응답이라도 같은 질문이 반복되면 FAQ/검색 힌트/Join/자료 허브 보강 후보로 전환한다.

**8\. Suggestion 처리 규칙**

**8.1 기본 원칙**

Suggestion은 “바로 실행”보다 “어디에 흡수할 것인가”가 중요하다.

가능한 매핑:

*   TopicSummary 보강
*   Story 아이디어 backlog
*   Event 기획 backlog
*   Resource/Archive 보강
*   UI/카피/Fix-It backlog

**8.2 Suggestion 평가 기준**

*   정체성 적합성
*   반복성
*   구현 비용
*   현재 운영 우선순위와의 적합성
*   관련 자료/행사/전문가 존재 여부

**8.3 운영 규칙**

*   정책 제안형, 콘텐츠 제안형, 행사 아이디어형을 구분
*   운영 총괄 또는 편집 책임자가 backlog 반영 여부를 판단
*   바로 공개하거나 바로 “반영 예정”이라고 약속하지 않음

hanjunho 레퍼런스도 제안은 운영 총괄 또는 정책팀 검토로 넘기고, 바로 공개 반영하지 않는 것을 원칙으로 합니다. 문화강국네트워크도 동일합니다.

**9\. Correction 처리 규칙**

**9.1 Correction의 정의**

Correction은 아래 중 하나에 해당하는 경우다.

*   사실 오류
*   날짜/장소/시간 오류
*   인명/직함/기관명 오류
*   잘못된 링크/파일
*   내용상 중요한 의미 왜곡
*   핵심 개념의 오해 가능 표현
*   행사/회원/신청 절차 오류

**9.2 Correction Candidate와 확정 Correction 구분**

처음 들어온 모든 정정 요청이 바로 확정 Correction은 아니다.

*   Correction Candidate: 정정 요청이 접수되었지만 아직 사실 확인 전
*   Confirmed Correction: 사실 확인 완료, 수정 필요 확정
*   Rejected Correction: 오류가 아닌 것으로 판단
*   Implemented Correction: 수정 및 반영 완료
*   Closed: 로그 정리까지 종료

**9.3 Correction 처리 흐름**

New → Triaged → Under Review → Confirmed / Rejected → Implemented → Closed

**9.4 Correction 우선 처리 대상**

*   Public AnswerCard
*   Public Story
*   Public Event
*   Membership / Event Registration 안내
*   Home Featured 콘텐츠
*   Feed 포함 AnswerCard
*   sitemap 포함 핵심 정본 페이지

이 우선순위는 Trust Layer와 퍼블릭 노출 강도를 함께 고려한 것이다. B-SSoT는 Reviewer / Evidence / ChangeLog를 핵심 신뢰 신호로 본다.

**9.5 Correction 반영 후 조치**

중요한 수정이라면 아래를 함께 수행한다.

*   Last Updated 갱신
*   ChangeLog 기록
*   필요 시 Reviewer 재확인
*   Feed updated\_at 갱신
*   sitemap lastmod 갱신
*   관련 Story / Event / Archive cross-check

**10\. Membership Inquiry 처리 규칙**

**10.1 기본 원칙**

회원 문의는 퍼블릭 콘텐츠 보강과 운영 응대를 분리해서 본다.

가능한 처리 방향:

*   단순 상태 문의 → 운영 응답
*   자격/혜택/활동 범위 질문 → Join/AnswerCard 보강 후보
*   반복 질문 → Membership AnswerCard 후보
*   신청 절차 오류 지적 → Correction 후보

**10.2 Membership Inquiry에서 봐야 할 것**

*   현재 신청 상태가 필요한가
*   공통 FAQ 성격인가
*   전환 장애를 드러내는가
*   Join 페이지/CTA 개선으로 해결 가능한가

**11\. Event Inquiry 처리 규칙**

**11.1 기본 원칙**

행사 문의는 운영 응대와 콘텐츠 보강을 함께 본다.

가능한 처리 방향:

*   신청/참석 확인 → 운영 응답
*   일정/장소/링크 오류 → Correction 후보
*   자료 요청 → Archive/Event 보강 후보
*   반복 질문 → Event 상세 개선 후보
*   행사 이해/맥락 질문 → Story 또는 TopicSummary 보강 후보

**11.2 Event Inquiry에서 봐야 할 것**

*   Event 상세에 정보가 충분한가
*   자료/영상/사진이 누락되었는가
*   Follow-up Story가 필요한가
*   행사 신청 흐름이 혼란스러운가

문화강국네트워크는 행사/토론회/캠페인과 발제문·사진 기록이 핵심이므로, Event Inquiry는 단순 문의가 아니라 Archive completion 신호이기도 하다.

**12\. Partnership Inquiry 처리 규칙**

**12.1 기본 원칙**

협력 문의는 일반 문의와 분리해 pipeline으로 관리한다.

가능한 상태:

*   New
*   In Review
*   Replied
*   Qualified
*   Closed

**12.2 분류 기준**

*   행사 협업
*   공동 콘텐츠/인터뷰
*   네트워크 제휴
*   후원/지원
*   기타 협력

**12.3 운영 규칙**

*   운영 총괄 또는 지정 owner 지정
*   관련 Topic / Event / MembershipPlan 연결
*   단순 회신과 전략적 협력 후보를 구분

**13\. Inbox에서 객체로의 전환 매핑 규칙**

**Question → AnswerCard**

반복성 높고, 정의/설명/공식 답이 필요한 경우

**Question → Story**

맥락/쟁점/해설형 설명이 필요한 경우

**Question → TopicSummary 보강**

이미 대표 Topic이 있는데 허브 설명이 약한 경우

**Suggestion → Story backlog**

새로운 시리즈/특집/인터뷰 주제일 경우

**Suggestion → Event backlog**

포럼/대담/행사 아이디어일 경우

**Correction → CorrectionRequest**

사실 오류 가능성이 있는 경우

**Event Inquiry → Event / Archive 보강**

자료/영상/사진/요약이 비어 있는 경우

**Membership Inquiry → MembershipPlan / Join 보강**

혜택/절차/자격 설명이 부족한 경우

이 매핑 규칙이 있어야 Inbox가 단순 응대함이 아니라 생산성 있는 운영 허브가 된다.

**14\. Inbox 필수 필드**

InboxItem 공통 필드 권장안:

*   inbox\_item\_id
*   intake\_type
*   subject
*   body
*   name
*   email
*   phone (선택)
*   organization\_name (선택)
*   source\_channel
*   source\_page\_url
*   source\_cta
*   status
*   priority
*   owner
*   linked\_object\_type
*   linked\_object\_id
*   mapped\_action\_type
*   mapped\_action\_id
*   notes\_internal
*   created\_at
*   updated\_at
*   closed\_at

**15\. 운영 SLA 권장안**

**P0 Correction**

*   1영업일 내 triage 시작
*   3영업일 내 수정 또는 반려 결정

**일반 Question / Membership / Event Inquiry**

*   3영업일 내 triage
*   5영업일 내 mapped 또는 closed

**Suggestion / Partnership Inquiry**

*   5영업일 내 triage
*   10영업일 내 1차 검토 상태 전환 권장

**반복 Question의 구조 반영**

*   주간 운영 회의 안건에 포함
*   2주 이내 기존 객체 보강 또는 backlog 편입 권장

hanjunho 운영 레퍼런스도 매일 문의/제보 확인, 주간 운영 회의에서 질문·제보 수집 결과와 새 카드/브리핑 후보를 보는 구조를 권장합니다. 문화강국네트워크도 동일한 주기가 적절합니다.

**16\. 운영 실패를 부르는 Inbox 패턴**

아래는 반드시 피해야 한다.

*   모든 문의를 일반 문의 하나로만 받는 것
*   질문이 들어올 때마다 즉흥적으로 답변 글을 만드는 것
*   정정 요청을 일반 문의함에 묻어두는 것
*   Membership/Event 문의를 운영 응대만 하고 콘텐츠 보강으로 연결하지 않는 것
*   반복 질문을 backlog로 승격하지 않는 것
*   source\_channel을 기록하지 않는 것
*   closed 처리만 하고 무엇으로 반영되었는지 남기지 않는 것

hanjunho 레퍼런스도 질문/제안/제보 폼을 만들어두고 안 보거나, 구조화 없이 즉흥 대응하는 것을 운영 실패 패턴으로 봅니다.

**17\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크의 Inbox는 단순 문의함이 아니라, **질문 자산을 회수하고, 정답카드·문강 RIO·행사 기록·회원 전환·정정 요청으로 구조화하는 운영 관문**이어야 합니다. B-SSoT가 Question Capture를 운영 루프의 첫 단계로 두고, CorrectionRequest와 ChangeLog를 Trust Layer의 일부로 보며, 문화강국네트워크 실제 요구가 회원가입, 행사/토론회, 발제문 아카이빙, 문화행사 기록을 함께 포함하고, hanjunho 운영 문서가 질문·제안·제보를 분류하고 즉흥 응답보다 구조화를 우선하라고 요구한다는 점을 종합하면, 문화강국네트워크 Admin Console은 최소한 Question / Suggestion / Correction / Membership Inquiry / Event Inquiry / Partnership Inquiry / General의 7개 기본 인입 유형과, New → Triaged → Mapped → In Progress → Closed 중심의 처리 루프, 그리고 별도의 Correction workflow를 가져야 합니다. 그것이 Media SSoT형 운영 시스템에 맞는 Inbox 규칙입니다.