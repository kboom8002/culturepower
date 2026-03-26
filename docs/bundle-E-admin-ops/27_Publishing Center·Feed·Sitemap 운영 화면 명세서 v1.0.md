**27\_Publishing Center·Feed·Sitemap 운영 화면 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console 안에서 사용될 **Publishing Center** 화면의 역할, 정보구조, 서브메뉴, 주요 카드, 검증 규칙, 배포 흐름을 정의하는 데 있다.

이 문서는 다음을 고정한다.

*   운영자는 어디서 공개 준비 상태를 확인하는가
*   어떤 객체가 Feed/Sitemap 대상인지 어떻게 보는가
*   Public 직전 어떤 메타·canonical·schema·링크 검증을 해야 하는가
*   Featured, Publish Queue, Scheduled, Feed Status, Sitemap Status를 어떤 화면에서 어떻게 다룰 것인가
*   재배포(Re-Publish)와 수정 반영은 어떤 방식으로 추적하는가

즉, 이 문서는 문화강국네트워크 Admin Console의 **배포 관제 화면 설계서**다.

**2\. Publishing Center의 한 줄 정의**

**Publishing Center는 문화강국네트워크의 정답·해설·행사·자료 객체가 퍼블릭 사이트, Answer Feed, Sitemap, 메타·OG·canonical 구조로 올바르게 배포되는지 제어·검증·추적하는 운영 허브다.**

퍼블릭 사이트에서 사용자는 완성된 페이지만 보지만, 운영자는

*   공개 가능한지
*   Feed에 들어가는지
*   sitemap에 들어가는지
*   canonical이 맞는지
*   Featured로 걸어도 되는지  
    를 한 화면에서 확인할 수 있어야 한다.

**3\. 최상위 설계 원칙**

**3.1 Publishing은 “상태값 변경”보다 넓은 개념이다**

문화강국네트워크에서 Publish는 단순히 Public으로 바꾸는 행위가 아니다.  
아래를 함께 뜻한다.

*   퍼블릭 상세 렌더 준비
*   메타/OG/canonical 정합성
*   Reviewer / UpdatedAt / Evidence 노출 확인
*   Answer Feed 포함 여부
*   sitemap 반영 여부
*   내부 링크·CTA 정상 작동
*   필요한 경우 Featured 지정

hanjunho 운영 문서가 웹플로우 운영 담당과 기술 지원 담당의 업무를 분리해 메타, 링크, 상태값, 발행 후 수정 반영까지 함께 관리하게 하는 이유도 여기에 있다.

**3.2 Publishing Center는 “배포 전 검증 + 배포 후 추적”을 함께 가져야 한다**

이 화면은 publish 직전 체크리스트 화면만 되어서는 안 된다.  
Publish 이후에도

*   feed 갱신됨?
*   sitemap lastmod 갱신됨?
*   broken link 없음?
*   UpdatedAt과 dateModified 일치?  
    를 추적해야 한다.

**3.3 AnswerCard는 1급 배포 객체다**

AIO-PR 구조상 Answer Feed와 answers 전용 sitemap은 핵심이다. 따라서 문화강국네트워크도 Publishing Center에서 **AnswerCard를 최우선 배포 객체**로 봐야 한다. Story, Event, Video, ArchiveDocument는 중요하지만 Feed보다는 발견/discovery와 기록 배포 측면이 더 강하다.

**3.4 Feed / Sitemap / Schema / Meta는 같은 화면군에서 본다**

운영자가 각 시스템을 따로따로 보게 하면 실수가 많아진다.  
특히 AIO-PR가 canonical/mainEntityOfPage, dateModified, Feed ETag, sitemap lastmod==dateModified 같은 정합성을 한 세트로 다루므로, Publishing Center도 한 세트로 봐야 한다.

**4\. Publishing Center 전체 IA**

문화강국네트워크 Admin Console의 Publishing Center는 아래 6개 하위 화면으로 구성하는 것을 권장한다.

1.  Publish Queue
2.  Scheduled
3.  Featured Control
4.  Feed Status
5.  Sitemap Status
6.  Link & Meta Check

이 6개는 앞서 확정한 Admin IA 구조와 정합적으로 맞물린다.

**5\. Publish Queue 화면 명세**

**5.1 화면 역할**

Publish Queue 는 지금 공개 직전이거나, 공개 승인 후 실제 반영 대기 중인 객체를 모아 보는 화면이다.

**5.2 포함 대상**

아래 상태 또는 조건을 만족하는 객체가 들어온다.

*   Review 상태
*   Approved but not published
*   Public 전환 예정이나 메타/링크 점검 미완료
*   Re-Publish required
*   Hidden → Review 재진입 후 공개 대기

**5.3 화면 기본 구조**

상단:

*   페이지 제목
*   설명문
*   필터 바
*   “새 객체 만들기”는 두지 않고, 작업 링크만 제공

본문:

*   큐 리스트 테이블
*   우측 상세 drawer 또는 modal

하단:

*   대량 작업 금지 또는 제한적 허용

**5.4 주요 컬럼**

*   Object Type
*   Title / Name
*   Current Status
*   Reviewer
*   Last Updated
*   Required Checks
*   Feed Eligible
*   Sitemap Eligible
*   Owner
*   Due Date
*   Action

**Required Checks 예시**

*   reviewer missing
*   evidence missing
*   meta missing
*   og missing
*   canonical empty
*   related object missing
*   cta broken

**5.5 Action 버튼**

*   Open Detail
*   Preview
*   Request Final Check
*   Publish
*   Return to Draft
*   Hide

**5.6 Publish Queue가 필요한 이유**

Review와 Publish 사이가 느슨하면, Reviewer/Evidence/UpdatedAt이 빠진 객체가 공개되기 쉽다. hanjunho 운영 문서가 공개 상태를 엄격히 관리하고, Review 단계를 필수로 둔 이유와 같다.

**6\. Scheduled 화면 명세**

**6.1 화면 역할**

예약 공개 또는 예약 Hidden/Archived 전환이 걸려 있는 객체를 관리하는 화면

**6.2 권장 대상**

*   AnswerCard 공개 예약
*   Story 공개 예약
*   Event 공개 시작 시간
*   Event 종료 후 Archived 예약
*   NewsletterIssue 발행 예약

**6.3 주요 컬럼**

*   Object Type
*   Title
*   Scheduled Action
*   Scheduled At
*   Timezone
*   Owner
*   Status
*   Cancel / Edit

**6.4 주요 규칙**

*   예약 publish 전에도 필수 가드가 맞지 않으면 자동 차단
*   예약 시점 직전 자동 lint 권장
*   expired schedule은 별도 오류 큐로 이동

**6.5 1차 MVP 판단**

초기에는 꼭 필요하지 않을 수 있지만,  
행사·뉴스레터·특집 발행이 많아질 문화강국네트워크 특성상 2차 이전에 들어가는 것이 좋다.

**7\. Featured Control 화면 명세**

**7.1 화면 역할**

Home과 주요 허브에 어떤 대표 객체를 노출할지 제어하는 화면

hanjunho 운영 문서는 Featured on Home을 핵심 운영 필드로 보고, 홈은 모든 것을 다 보여주는 곳이 아니라 대표 카드와 대표 브리핑을 적게, 안정적으로 보여주는 공간이라고 설명합니다. 문화강국네트워크도 홈이 웹진·정답·행사·참여의 복합 허브이므로, Featured 제어는 별도 화면이 필요합니다.

**7.2 제어 대상**

*   Home Hero 대표 카드/Story
*   Home 대표 AnswerCard
*   Home 대표 Story
*   Home 대표 Event/배너
*   문강 RIO Featured Story
*   정답카드 인기/대표 세트
*   행사·영상 대표 기록

**7.3 화면 기본 구조**

탭:

*   Home
*   문강 RIO
*   Answers
*   Events
*   기타 허브

각 탭 안에서:

*   현재 노출 슬롯
*   후보 추천 목록
*   드래그 정렬 또는 우선순위 입력
*   Replace / Remove / Preview

**7.4 표시 규칙**

각 객체 카드에 아래를 함께 보여준다.

*   Title
*   Object Type
*   Featured current status
*   Last Updated
*   Topic/Pillar
*   reviewer badge
*   performance hint (2차)

**7.5 운영 가드**

*   Hidden/Archived 객체 Featured 금지
*   reviewer/evidence 누락 객체 Featured 경고
*   Home 대표 카드 수 상한 설정
*   특정 슬롯별 허용 객체 타입 제한

**예시**

*   Home Hero Main: Story 또는 TopicSummary만 허용
*   Home Answers: AnswerCard만 허용
*   Home Events: Event만 허용

**8\. Feed Status 화면 명세**

**8.1 화면 역할**

Answer Feed 생성 상태와 포함 객체, 오류, 재생성 상태를 관리하는 화면

AIO-PR는 Answer Feed NDJSON, Feed ETag, updated\_at, citations, anchors, confidence를 운영 규격으로 제시하므로, Feed는 숨은 시스템 파일이 아니라 운영 화면에서 보여줘야 하는 1급 배포 대상입니다.

**8.2 화면 구성**

상단:

*   Feed URL
*   last generated time
*   ETag/버전
*   total items
*   error count

중단:

*   Feed eligibility summary
*   최근 추가/제거 객체
*   invalid objects count

하단:

*   객체별 feed inclusion table
*   regenerate 버튼
*   download / inspect 버튼

**8.3 주요 컬럼**

*   Answer ID
*   Title / Question
*   Status
*   Feed Included (Y/N)
*   Updated At
*   Citations Count
*   Confidence
*   Error Reason

**8.4 포함 규칙 표시**

Feed 포함 여부는 단순 상태가 아니라, 아래 검증 결과를 함께 보여줘야 한다.

*   public status ok
*   direct answer exists
*   reviewer exists
*   evidence exists
*   canonical exists
*   cta valid

**8.5 주요 액션**

*   regenerate feed
*   inspect json preview
*   filter invalid items
*   export missing items list
*   open object for fix

**8.6 Feed Status가 필요한 이유**

지금까지 문서에서 Answer Feed는 정답카드의 기계 가독 배포 레이어로 정의되었으므로, 운영자가 “왜 어떤 카드가 feed에 안 들어갔는지”를 볼 수 있어야 한다.

**9\. Sitemap Status 화면 명세**

**9.1 화면 역할**

answers / stories / events / videos / resources sitemap의 상태와 대상 객체를 관리하는 화면

**9.2 관리 대상**

*   sitemap index
*   sitemap-answers.xml
*   sitemap-stories.xml
*   sitemap-events.xml
*   sitemap-videos.xml
*   sitemap-resources.xml

**9.3 상단 카드**

*   total sitemaps
*   last generated
*   broken entries
*   noindex leakage
*   lastmod mismatch count

**9.4 상세 테이블**

컬럼:

*   sitemap name
*   object type
*   total urls
*   last generated
*   status
*   mismatch issues
*   action

**9.5 URL 단위 검증 컬럼**

*   URL
*   canonical
*   lastmod
*   dateModified
*   public status
*   noindex?
*   eligible?
*   error reason

**9.6 자동 경고**

*   lastmod != dateModified
*   noindex URL included
*   Hidden/Archived URL included
*   Draft/Review URL included
*   duplicate loc
*   broken URL

AIO-PR가 sitemap lastmod==dateModified를 린트 규칙으로 명시하기 때문에, 이 mismatch는 별도 경고 카드로 다루는 것이 맞습니다.

**10\. Link & Meta Check 화면 명세**

**10.1 화면 역할**

메타, OG, canonical, breadcrumb, broken link, CTA를 통합 점검하는 화면

hanjunho 운영 문서에서 웹플로우 운영 담당의 핵심 업무가 메타 보완, 링크 점검, 발행 후 수정 반영이고, 기술 지원 담당이 페이지 메타, canonical, OG, 필터, 검색, 폼을 관리한다는 점을 그대로 반영한 화면이다.

**10.2 검사 대상**

*   title
*   meta description
*   og title
*   og description
*   og image
*   canonical
*   breadcrumb consistency
*   CTA validity
*   broken outbound link
*   broken internal link
*   missing image
*   form endpoint

**10.3 화면 탭**

*   Meta
*   Canonical
*   OG
*   Links
*   CTA
*   Forms

**10.4 주요 경고 예시**

*   Meta Title missing
*   Description duplicated
*   OG image missing
*   Canonical mismatch
*   breadcrumb/url mismatch
*   broken internal link
*   CTA 404
*   form not responding

**10.5 액션**

*   open page
*   quick edit meta
*   mark false positive
*   assign Fix-It ticket
*   recheck

**11\. Publishing Center 공통 필터 구조**

모든 하위 화면은 아래 공통 필터를 공유하는 것이 좋다.

*   object type
*   status
*   topic/pillar
*   owner
*   reviewer
*   publish risk
*   feed eligible
*   sitemap eligible
*   featured
*   updated recently / stale

**이유**

운영자는 “정답카드만”, “K-문명 관련만”, “reviewer 없는 public만”, “행사 관련만”처럼 좁혀서 보고 싶어 하기 때문이다.

**12\. Publishing Risk Score 제안**

Publishing Center에는 간단한 Publishing Risk Score를 두는 것이 유용하다.

**예시 규칙**

*   reviewer 없음: +3
*   evidence 없음: +3
*   canonical 없음: +2
*   meta 없음: +1
*   og 없음: +1
*   related object 없음: +2
*   cta 오류: +3
*   updatedAt 없음: +3

**결과**

*   0~2: Low
*   3~5: Medium
*   6+: High

**활용**

*   Publish Queue 정렬
*   Dashboard 경고
*   Fix-It 자동 생성 조건

**13\. 권한 연계(RBAC)**

**운영 총괄**

*   모든 Publishing Center 읽기
*   publish/hide/archive 승인
*   featured 최종 수정

**콘텐츠 편집**

*   Publish Queue 읽기
*   메타 초안 수정
*   featured 제안
*   publish 직접 실행 불가 권장

**검수자**

*   Review 관점 읽기
*   publish readiness 확인
*   publish 실행은 불가 또는 제한

**이벤트 운영**

*   Event/Videos/Documents 관련 publishing 화면만 수정
*   featured 제안 가능
*   answers feed 제어 불가

**기술 운영**

*   Feed Status
*   Sitemap Status
*   Link & Meta Check
*   regenerate/recheck 실행 가능

이 구조는 앞서 잠근 RBAC 문서와 정합적으로 연결된다.

**14\. 상태 전이와의 연계**

Publishing Center는 워크플로 상태 전이와 직접 붙어야 한다.

**Review → Public**

Publish Queue에서 실행

**Public → Hidden**

Publish Queue 또는 object detail에서 실행

**Hidden → Review**

재검토 필요 시 실행

**Public → Archived**

운영 종료 또는 기록 보존 전환 시 실행

**Re-Publish**

Public 상태 유지 또는 Hidden → Review → Public 재진입 후 실행

즉 Publishing Center는 상태값 전이의 **운영 UI**다.

**15\. Dashboard / Observatory / Fix-It과의 연결**

**Dashboard**

*   Review Pending 카드
*   Publish Today 카드
*   Feed Error 카드
*   Sitemap Mismatch 카드  
    와 직접 연결

**Observatory**

*   Coverage
*   SSoT Citation
*   TTI  
    같은 KPI에서 특정 배포 문제가 보이면 Publishing Center drill-down으로 이동

**Fix-It**

Publishing Center에서 발견된 문제는 아래 Root Cause로 티켓화 가능

*   Schema / Feed
*   Meta / Canonical
*   Link Graph
*   CTA / Form
*   Archive Completion

즉 Publishing Center는 Dashboard와 Observatory의 “작업 실행층”이다.

**16\. 1차 MVP 범위 권장안**

초기에는 아래 네 화면만 강하게 만들어도 충분하다.

*   Publish Queue
*   Featured Control
*   Feed Status
*   Sitemap Status

Scheduled, Link & Meta Check는 2차에서 보강해도 된다.  
하지만 메타/링크 점검 기능은 최소한 Publish Queue 내부 보조 패널로라도 들어가는 것이 좋다.

**17\. 화면별 성공 기준**

**Publish Queue**

*   공개 직전 객체가 한곳에서 보인다
*   missing field를 바로 확인할 수 있다
*   Publish/Hide 동작이 명확하다

**Featured Control**

*   홈 대표 노출을 안정적으로 제어할 수 있다
*   잘못된 객체를 Featured로 올리지 않게 막는다

**Feed Status**

*   어떤 AnswerCard가 feed에 포함/제외되는지 한눈에 보인다
*   regenerate와 오류 확인이 가능하다

**Sitemap Status**

*   어떤 URL이 sitemap에 들어가는지 보인다
*   lastmod mismatch를 바로 찾을 수 있다

**Link & Meta Check**

*   메타/OG/canonical/링크 오류를 빠르게 찾는다
*   수정 후 재검사가 쉽다

**18\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크 Admin Console의 Publishing Center는 단순 “게시 관리” 화면이 아니라, **정답·해설·행사·자료 객체가 퍼블릭 사이트, Answer Feed, Sitemap, 메타·OG·canonical 구조로 정확하게 배포되는지 제어하는 운영 허브**여야 합니다. AIO-PR가 Answer Feed, answers sitemap, Feed ETag, lastmod==dateModified, canonical/mainEntityOfPage를 핵심 운영 규칙으로 제시하고, 문화강국네트워크 실제 요구가 웹진·행사·발제문·회원가입·문화예술정보를 함께 운영하라고 하며, hanjunho 운영 문서가 상태값 변경, Featured on Home, 메타 보완, 링크 점검, 발행 후 수정 반영을 운영 핵심으로 정의한다는 점을 종합하면, Publishing Center는 최소한 **Publish Queue / Featured Control / Feed Status / Sitemap Status**를 중심으로 설계하는 것이 가장 적합합니다.