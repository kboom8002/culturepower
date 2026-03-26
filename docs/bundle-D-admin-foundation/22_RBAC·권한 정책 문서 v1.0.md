**22\_RBAC·권한 정책 문서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console에서 적용할 **RBAC(Role-Based Access Control)** 정책을 정의하는 데 있다.  
즉, 이 문서는 다음을 고정한다.

*   어떤 역할(role)이 필요한가
*   각 역할은 어떤 객체를 읽고, 생성하고, 수정하고, 승인할 수 있는가
*   공개 상태 전환과 검수 승인 권한은 누구에게 있는가
*   회원/문의/행사 신청 같은 민감 데이터는 누가 볼 수 있는가
*   메타/Feed/Sitemap/설정 같은 시스템 권한은 누구에게 있는가
*   모든 변경은 어떤 감사 로그를 남겨야 하는가

이 문서는 단순한 계정 정책이 아니라, **운영형 Media SSoT 시스템의 안전장치**다.

**2\. 권한 설계의 최상위 원칙**

**2.1 역할은 조직도를 반영하되, 시스템 권한은 더 세밀해야 한다**

운영 총괄, 편집, 검수, 자료 담당, 이벤트 운영, 회원 운영, 기술 운영 같은 현실 역할을 반영하되,  
시스템에서는 읽기 / 작성 / 수정 / 검수 / 승인 / 공개 / 설정 권한을 더 잘게 나눠야 한다.  
hanjunho 운영 문서도 역할을 분리하고, 공개 승인·검수·메타·링크·상태값을 अलग으로 관리합니다.

**2.2 Draft와 Public 사이에는 반드시 권한 장벽이 있어야 한다**

문화강국네트워크는 Reviewer, Evidence, UpdatedAt, ChangeLog가 핵심 신뢰 구조이므로,  
초안 작성자가 곧바로 Public으로 올리는 구조는 허용하지 않는다.  
Draft → Review → Public 전환은 분리된 권한으로 관리한다.

**2.3 민감 데이터와 퍼블릭 콘텐츠 권한을 분리한다**

회원 신청, 행사 신청, 뉴스레터 구독, 협력 문의는 개인정보/민감 운영 데이터다.  
퍼블릭 콘텐츠를 편집하는 권한과 같은 계정으로 무제한 접근하면 안 된다.  
즉 콘텐츠 권한과 참여 데이터 권한은 분리한다.

**2.4 시스템 설정 권한은 최소화한다**

Taxonomy, Workflow Rules, Integrations, Feed/Sitemap, Role 관리 같은 설정 권한은 소수만 가진다.  
일반 운영자에게 Settings 전체 권한을 주지 않는다.

**2.5 모든 중요한 작업은 로그가 남아야 한다**

아래 작업은 반드시 Audit Log를 남긴다.

*   상태값 변경
*   Reviewer 변경
*   Featured 변경
*   메타/OG/canonical 변경
*   Publish / Unpublish
*   Member status 변경
*   Role 변경
*   Feed/Sitemap 재생성 실행

**3\. 권한 모델의 기본 구조**

문화강국네트워크는 **RBAC + Object Scope + Workflow Gate** 모델을 권장한다.

**3.1 RBAC**

기본은 역할 기반 권한이다.

**3.2 Object Scope**

같은 역할이어도 모든 객체를 다 수정할 필요는 없다.  
예:

*   Event 운영자는 Event/Archive 중심
*   Membership 운영자는 Member/Inquiry 중심
*   검수자는 Review queue 중심

**3.3 Workflow Gate**

특정 상태 전환은 별도 승인 권한이 있어야 한다.  
예:

*   Draft 생성 가능
*   Review 요청 가능
*   Review 승인 가능
*   Public 전환 가능
*   Hidden/Archived 전환 가능

**4\. 권장 역할(Role) 정의**

문화강국네트워크 Admin Console의 기본 역할은 아래 8개로 정의한다.

**4.1 Super Admin**

역할: 시스템 최고 관리자  
용도: 초기 세팅, 권한 구조 변경, 긴급 복구

권한:

*   모든 메뉴 읽기/쓰기
*   Roles & Permissions 수정
*   Integrations 수정
*   Audit Log 전체 열람
*   강제 상태값 복구
*   사용자 비활성화

주의:

*   실무 일상 운영에는 최소 사용
*   상시 사용 계정으로 두지 않는 것이 좋다

**4.2 운영 총괄**

역할: 공개 승인과 우선순위 최종 결정자  
hanjunho 레퍼런스의 운영 총괄 역할과 대응한다.

권한:

*   모든 콘텐츠 읽기
*   주요 객체 수정
*   Review 승인
*   Public / Hidden / Archived 전환
*   Featured Control
*   Fix-It 우선순위 지정
*   월간 구조 변경 승인
*   Membership 주요 상태 승인

제한:

*   시스템 통합 설정 수정은 불가
*   권한 체계 수정 불가

**4.3 콘텐츠 기획·편집 담당**

역할: AnswerCard / Story / TopicSummary 초안 작성과 연결 설계  
hanjunho 문서의 콘텐츠 기획·편집 담당과 대응한다.

권한:

*   Topics / Answers / Stories 생성·수정
*   Experts / Partners 읽기
*   Related object 연결
*   Review 요청
*   Draft / Review 상태에서 작업
*   메타 초안 작성
*   Featured 제안

제한:

*   Public 전환 불가
*   Reviewer 최종 확정 불가
*   Settings 수정 불가

**4.4 근거·리서치 담당**

역할: Evidence / Archive / Source completeness 담당  
hanjunho 문서의 근거·리서치 담당과 대응한다.

권한:

*   Documents / Galleries / Source fields 수정
*   Event 자료 보강
*   Story / AnswerCard의 Evidence 입력
*   링크 수정
*   completion status 갱신
*   Review 요청 보조

제한:

*   퍼블릭 카피 대량 수정 제한
*   Public 전환 불가
*   Featured 수정 불가

**4.5 검수자(Reviewer)**

역할: 공개 전 품질 승인자  
hanjunho 문서의 검수 담당과 대응한다.

권한:

*   Review queue 읽기
*   검수 코멘트 작성
*   반려 / 승인
*   Reviewer block 수정
*   Boundary / ChangeLog 요구
*   Public 추천

제한:

*   직접 Public 전환은 선택 사항  
    권장: “승인”까지만 가능, 실제 Public 전환은 운영 총괄 또는 퍼블리싱 담당이 실행

**4.6 아카이브·이벤트 운영 담당**

역할: Event / Video / ArchiveDocument 운영자

권한:

*   Events / Videos / Documents / Galleries 생성·수정
*   Event 일정/상태 관리
*   자료/영상/사진 연결
*   Event completion board 관리
*   Event registration 읽기
*   후속 Story 요청 생성

제한:

*   Topics / Answers 구조 수정 제한
*   Public 전환은 Review 통과 후만 가능

**4.7 회원·참여 운영 담당**

역할: Member / Newsletter / Registration / Inquiry 운영자

권한:

*   Member Applications 읽기/처리
*   Newsletter subscribers 관리
*   Event registrations 관리
*   Partnership inquiries 관리
*   태그/세그먼트 관리
*   후속 연락 상태 갱신

제한:

*   퍼블릭 콘텐츠 수정 불가
*   시스템 설정 수정 불가
*   민감 데이터 export는 제한적 승인 필요

**4.8 기술 운영 담당**

역할: Publishing / Feed / Sitemap / Meta / Settings 일부 담당  
hanjunho 문서의 기술 지원 담당과 대응한다.

권한:

*   meta/OG/canonical 수정
*   feed/sitemap 상태 관리
*   broken link check 실행
*   search / form / integration 점검
*   publishing diagnostics
*   settings 중 technical 영역 수정

제한:

*   Membership 개인정보 상세 열람 제한
*   콘텐츠 본문 대량 수정은 원칙적으로 제한

**5\. 객체별 권한 범위**

**5.1 Content Objects**

대상:

*   TopicSummary
*   AnswerCard
*   Story
*   Expert
*   Partner
*   ResourceItem

권장 권한:

**역할**

**Read**

**Create**

**Edit Draft**

**Send Review**

**Approve Review**

**Publish**

운영 총괄

O

O

O

O

O

O

콘텐츠 편집

O

O

O

O

X

X

리서치 담당

O

△

△

O

X

X

검수자

O

X

코멘트만

X

O

X

기술 운영

O

X

메타/기술만

X

X

△

△ = 제한된 범위만 가능

**5.2 Archive Objects**

대상:

*   Event
*   Video
*   ArchiveDocument
*   Gallery

**역할**

**Read**

**Create**

**Edit**

**Completion 관리**

**Publish**

운영 총괄

O

O

O

O

O

이벤트 운영

O

O

O

O

△

리서치 담당

O

O

O

O

X

검수자

O

X

코멘트만

X

X

기술 운영

O

X

embed/link만

X

X

**5.3 Participation Objects**

대상:

*   MemberApplication
*   NewsletterSubscriber
*   EventRegistration
*   PartnershipInquiry
*   GeneralInquiry

**역할**

**Read**

**Status 변경**

**Notes**

**Export**

**Delete**

운영 총괄

O

O

O

O

제한

회원 운영

O

O

O

승인 필요

X

이벤트 운영

관련 Event만

관련 Event만

O

X

X

콘텐츠 편집

일부 읽기만

X

X

X

X

기술 운영

최소 범위

X

X

X

X

**6\. 상태값 전이 권한**

현재 문서 체계상 핵심 상태값은 Draft / Review / Public / Hidden / Archived 다.

**허용 전이**

*   Draft → Review
*   Review → Draft
*   Review → Public
*   Public → Hidden
*   Hidden → Review
*   Hidden → Archived
*   Public → Archived  
    필요 시만 허용

**역할별 상태 전이 권한**

**콘텐츠 편집**

*   Draft 생성
*   Draft → Review 요청
*   Review 반려 시 Draft 수정

**검수자**

*   Review 승인 / 반려
*   Review → Draft 반환

**운영 총괄**

*   Review → Public
*   Public → Hidden
*   Hidden → Review
*   Hidden → Archived
*   Public → Archived

**이벤트 운영**

*   Event Draft → Review
*   Event Review 승인 요청
*   종료 후 Archived 요청

**금지 규칙**

*   Draft에서 바로 Public 금지
*   Reviewer 미지정 상태 Public 금지
*   UpdatedAt 비어 있는 Public 금지
*   Evidence 0개 상태의 핵심 AnswerCard Public 금지
*   신청 폼 연결 없는 Membership Public 금지

**7\. 승인 권한 정책**

**7.1 공개 승인**

최종 Public 전환 권한은 아래 둘 중 하나만 가진다.

*   운영 총괄
*   별도 지정된 퍼블리싱 승인자

**7.2 구조 변경 승인**

아래는 운영 총괄 이상만 승인 가능

*   GNB 구조 변경
*   Taxonomy 값 추가/삭제
*   Workflow 규칙 변경
*   권한 정책 변경
*   Feed 포함 규칙 변경

**7.3 Membership 민감 처리 승인**

아래는 운영 총괄 또는 지정 승인자만 가능

*   회원 상태 최종 승인/거절
*   개인정보 export
*   대량 메일 대상 추출
*   삭제/비식별화 처리

**7.4 Fix-It 우선순위 승인**

*   P0 지정: 운영 총괄 또는 기술 운영 + 총괄 확인
*   P1/P2 지정: 담당 운영자 가능

**8\. 메뉴별 접근 권한**

**Dashboard**

*   전 역할 접근 가능
*   단, 카드 구성은 역할별 다르게 노출

**Inbox**

*   운영 총괄, 콘텐츠 편집, 회원 운영, 이벤트 운영 접근
*   기술 운영은 읽기 제한 가능

**Content**

*   콘텐츠 편집 중심
*   회원 운영은 읽기만 또는 비접근

**Archive**

*   이벤트 운영, 리서치, 콘텐츠 편집, 운영 총괄 접근

**Participation**

*   회원 운영 중심
*   운영 총괄 접근
*   일반 편집자는 비접근 또는 제한 읽기

**Review**

*   검수자, 운영 총괄, 콘텐츠 편집 접근
*   회원 운영은 비접근

**Publishing**

*   운영 총괄, 기술 운영, 콘텐츠 편집 일부 접근

**Observatory / Fix-It**

*   운영 총괄, 콘텐츠 편집, 기술 운영, 검수자 접근
*   참여 운영은 필요한 부분만 읽기

**Settings**

*   Super Admin
*   운영 총괄 일부
*   기술 운영 일부

**9\. 데이터 민감도 등급**

권한 정책은 데이터 민감도를 나눠야 제대로 작동한다.

**Level A — 공개 콘텐츠 메타**

예:

*   제목
*   요약
*   태그
*   Featured
*   Category
*   Topic  
    대부분 편집/운영 가능

**Level B — 신뢰/배포 데이터**

예:

*   Reviewer
*   UpdatedAt
*   ChangeLog
*   Canonical
*   Feed 포함 여부
*   sitemap 상태  
    편집자 제한 수정, 승인 필요

**Level C — 운영 내부 데이터**

예:

*   Review comments
*   rejection reason
*   internal notes
*   fix-it severity  
    운영자 전용

**Level D — 개인정보/참여 데이터**

예:

*   이름
*   이메일
*   연락처
*   신청 상태
*   문의 내용  
    최소 권한 원칙 적용

**10\. Audit Log 정책**

다음 작업은 반드시 로그를 남긴다.

*   객체 생성
*   객체 삭제
*   상태값 변경
*   Reviewer 변경
*   Featured 변경
*   Public 전환
*   Hidden/Archived 전환
*   Membership status 변경
*   export 실행
*   Role 변경
*   workflow rule 변경

로그 필드:

*   actor
*   timestamp
*   object\_type
*   object\_id
*   action
*   before
*   after
*   reason(optional)

B-SSoT는 ChangeLog/TrustLog 기반 운영형 구조를 전제로 하므로, Admin Console도 내부 변경 로그를 강하게 남겨야 한다.

**11\. 최소 권한 원칙(MVP 권장)**

초기에는 너무 세밀한 커스텀 권한보다 아래 기본 원칙만 지켜도 충분하다.

*   콘텐츠 편집자는 만들고 수정하지만 공개는 못 한다
*   검수자는 승인하지만 publish는 자동 수행하지 않는다
*   운영 총괄만 Public 전환과 Featured 최종 조정 가능
*   회원 운영자는 개인정보는 보되 콘텐츠는 못 고친다
*   기술 운영자는 시스템은 보되 회원 상세는 못 본다
*   Super Admin은 평상시 쓰지 않는다

이 정도만 지켜도 초기 운영 사고를 크게 줄일 수 있다.

**12\. 권한 정책이 해결하는 문제**

이 RBAC 정책을 적용하면 다음 문제가 줄어든다.

*   샘플/테스트 콘텐츠의 실수 공개
*   Reviewer 없이 Public 전환
*   Featured 무분별 변경
*   Event 자료 누락 상태의 장기 방치
*   회원 데이터 과다 열람
*   메타/Feed/Sitemap 무질서 수정
*   누구 책임인지 모르는 변경

hanjunho 레퍼런스가 강조한 공개 상태 엄격 관리, Reviewer 통일, Featured 통제, 운영 규칙 없을 때 반복되는 혼란을 구조적으로 막아주는 역할이다.

**13\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크 Admin Console의 권한 정책은 단순한 관리자 등급 나누기가 아니라, **질문 수집 → 정답 생산 → 검수 → 공개 → 아카이브 → 참여 처리 → 측정 → Fix-It** 운영 루프를 안전하게 유지하기 위한 구조여야 합니다. 문화강국네트워크가 웹진, 정답카드, 행사/토론회, 발제문 아카이빙, 문화행사 기록, 회원가입과 뉴스레터를 함께 운영해야 하고, B-SSoT가 Reviewer/Evidence/UpdatedAt/ChangeLog를 핵심 신뢰 신호로 보며, hanjunho 운영 문서가 역할 분리와 Draft/Review/Public/Hidden/Archived 상태 관리를 강하게 요구한다는 점을 종합하면, **운영 총괄 / 콘텐츠 편집 / 리서치 / 검수 / 이벤트 운영 / 회원 운영 / 기술 운영 / Super Admin**의 8역할 기본 RBAC 체계가 가장 적합합니다.