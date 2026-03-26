**20\_Admin Console 비전·범위 문서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지를 실제로 운영하기 위해 필요한 **Admin Console의 존재 이유, 목표, 범위, 원칙, 우선 구현 대상**을 고정하는 데 있다.

이 문서는 다음 질문에 답해야 한다.

*   왜 일반 CMS만으로는 부족한가
*   Admin Console은 무엇을 관리해야 하는가
*   어디까지를 1차 범위로 보고, 어디부터는 2차 확장으로 둘 것인가
*   퍼블릭 사이트와 Admin Console의 역할은 어떻게 나뉘어야 하는가
*   어떤 운영자들이 어떤 작업을 어디서 수행하게 할 것인가

즉, 이 문서는 “관리자 페이지도 만들자” 수준이 아니라,  
**문화강국네트워크를 운영형 Media SSoT 시스템으로 완성하기 위한 Control Plane 정의서**다. B-SSoT가 AI홈페이지를 단순 프론트엔드가 아니라 운영형 정답 인프라의 프런트엔드라고 설명하고 있으므로, Admin Console은 그 백오피스에 해당한다.

**2\. 왜 Admin Console이 필수인가**

**2.1 현재 퍼블릭 명세만으로는 운영이 닫히지 않는다**

지금까지의 문서 패키지는 퍼블릭 사이트 설계로는 매우 강하다.  
하지만 실제 운영 동작으로 바꾸면, 운영자는 다음을 해야 한다.

*   질문 수집
*   AnswerCard / Story / Event 초안 생성
*   Reviewer 지정과 Review 승인
*   Evidence와 Archive 연결
*   Featured 선별
*   회원가입/행사신청/뉴스레터/협력문의 처리
*   Feed / sitemap / 메타 / 상태값 관리
*   KPI 관측과 Fix-It 티켓 발행

이건 일반 웹사이트 CMS의 범위를 넘어선다. B-SSoT 운영 루프 자체가 Publish 이후에 Measure, Root Cause, Fix-It, Re-Publish까지 요구하므로, 별도 운영 콘솔이 없으면 구조가 끊긴다.

**2.2 문화강국네트워크는 “복합 운영형 미디어”다**

문화강국네트워크는 단순 웹진이 아니라 아래를 동시에 가진다.

*   문강 RIO 중심의 기사형 해설 운영
*   정답카드 중심의 질문-답 구조 운영
*   행사/토론회/캠페인 운영
*   발제문·자료집·사진·영상 아카이브 운영
*   회원가입/뉴스레터/행사참여/협력문의 운영

홈페이지 구성안이 이 다섯 축을 동시에 요구하고 있으므로, 운영 시스템도 콘텐츠 CMS 하나로 끝나면 안 된다.

**2.3 상태값과 검수 체계는 화면 밖에서 관리돼야 한다**

hanjunho 플레이북은 Draft, Review, Public, Hidden, Archived 상태를 엄격히 관리하고, 검수자, 메타, 링크, Featured, 공개 후 수정 반영을 운영자의 핵심 책임으로 둔다. 이건 곧 별도 운영 화면이 필요하다는 뜻이다. 퍼블릭 사이트만으로는 Review queue나 승인 로그, Hidden/Archived 관리가 불가능하다.

**3\. Admin Console의 한 줄 정의**

**문화강국네트워크 Admin Console은 질문 수집, 정답 생산, 기사형 해설, 행사·자료 아카이브, 검수·정정, 회원·참여 관리, 측정·Fix-It을 통합 관리하는 운영 콘솔이다.**

이 정의에서 중요한 점은 두 가지다.

첫째, 이 콘솔은 단순 CMS가 아니다.  
둘째, 이 콘솔은 퍼블릭 사이트의 복제판이 아니라 **운영용 제어면(Control Plane)** 이다.

**4\. Admin Console의 최상위 목표**

**4.1 질문을 운영 자산으로 바꾸는 것**

질문/제안/정정/행사 후속 문의를 그냥 메일함에 쌓아두지 않고,  
AnswerCard 후보, Story 보강 후보, Event 후속 작업, Membership 개선 작업으로 전환해야 한다.  
B-SSoT는 Question Capital을 핵심 자산으로 보므로, Admin Console의 첫 임무는 질문을 구조화하는 것이다.

**4.2 정답과 해설을 검수 가능한 객체로 관리하는 것**

퍼블릭 사이트는 결과물만 보여주지만, Admin Console은

*   누가 썼는지
*   누가 검수하는지
*   무엇이 비었는지
*   공개 가능한지  
    를 관리해야 한다.  
    hanjunho 플레이북의 Review 단계와 운영 역할 분담은 이 필요를 잘 보여준다.

**4.3 기록 자산을 흩어지지 않게 누적하는 것**

행사/토론회/발제문/사진/영상은 문화강국네트워크의 핵심 자산인데, 이들은 가장 쉽게 흩어진다.  
Admin Console은 Event 중심으로 자료, 영상, 사진, 후속 Story를 묶어 **기록 completion** 을 관리해야 한다. 문화강국네트워크 구성안이 발제문 아카이빙과 문화행사 사진 기록을 명시적으로 요구하므로, 이 축은 필수다.

**4.4 참여와 회원 흐름을 운영 가능한 데이터로 바꾸는 것**

퍼블릭 사이트에서 회원가입/뉴스레터/행사신청/협력문의가 일어나더라도,  
운영 콘솔에서 상태와 후속 액션을 관리하지 않으면 전환 구조가 끊긴다.  
Media 패밀리의 전환 구조가 구독/행사/협업 중심이라는 점을 감안하면, Admin Console은 최소한 간단한 참여 CRM 기능을 가져야 한다.

**4.5 KPI와 Fix-It을 실제 작업 큐로 연결하는 것**

Observatory 문서에서 정의한 KPI가 있어도, 그것이 티켓과 담당자, 마감일, 재배포 로그로 이어지지 않으면 운영 체계가 닫히지 않는다.  
따라서 Admin Console은 단순 대시보드가 아니라 **관측 → 진단 → 티켓 → 재배포**의 루프를 실행하는 공간이어야 한다.

**5\. Admin Console이 다뤄야 하는 운영 객체**

문화강국네트워크 Admin Console의 1차 핵심 운영 객체는 아래와 같다.

**5.1 콘텐츠 객체**

*   TopicSummary
*   AnswerCard
*   Story
*   Event
*   Video
*   ArchiveDocument
*   Expert
*   Partner
*   MembershipPlan
*   NewsletterIssue
*   ResourceItem

이 객체 구조는 B-SSoT의 객체 중심 사고와 Media 패밀리의 topic/story/expert/event/evidence 구조를 그대로 따른다.

**5.2 운영 객체**

*   ReviewTask
*   CorrectionRequest
*   ChangeLog
*   FeaturedSlot
*   QuestionIntake
*   FixItTicket
*   PublishJob

**5.3 참여 객체**

*   MemberApplication
*   NewsletterSubscriber
*   EventRegistration
*   PartnershipInquiry
*   GeneralInquiry

**6\. Admin Console의 기능 범위**

**6.1 Content Ops**

역할: 퍼블릭 객체를 생성·수정·연결·공개한다.

필수 기능:

*   객체별 생성/수정
*   상태값 전환
*   미리보기
*   필수 필드 누락 경고
*   Related object 연결
*   Featured 지정
*   변경 이력

**6.2 Review Ops**

역할: 검수와 승인 흐름을 관리한다.

필수 기능:

*   Review 요청
*   Reviewer 지정
*   코멘트
*   반려 / 재제출
*   승인 로그
*   공개 승인 기록

hanjunho 플레이북이 Review를 공개 직전 필수 단계로 두고 있으므로, 이 모듈은 선택이 아니다.

**6.3 Archive & Event Ops**

역할: 행사 기록을 실제 아카이브 자산으로 완성한다.

필수 기능:

*   Event 생성/상태 관리
*   발제문/자료집 업로드
*   사진/영상 연결
*   Event completion 체크
*   후속 Story 연결
*   일정 종료 후 Archived 전환

이 기능은 문화강국네트워크 요구안의 토론회 개요 및 발제문 아카이빙, 문화행사 사진 기록 요구에 직접 대응한다.

**6.4 Inquiry & Question Ops**

역할: 질문/제안/정정 요청을 triage한다.

필수 기능:

*   인입함
*   유형 분류
*   중요도/반복도 태그
*   AnswerCard 후보 전환
*   Story 보강 후보 전환
*   Correction 처리 전환
*   Event 후속 액션 전환

**6.5 Member & Participation Ops**

역할: 참여/회원 흐름을 운영 데이터로 관리한다.

필수 기능:

*   회원 신청 목록
*   회원 상태 관리
*   뉴스레터 구독 목록
*   행사 신청자 관리
*   협력문의 파이프라인
*   참여 이력 태깅

**6.6 Publishing Ops**

역할: 메타, feed, sitemap, publish 상태를 제어한다.

필수 기능:

*   meta/OG preview
*   canonical 확인
*   feed 포함 여부
*   sitemap 포함 여부
*   publish log
*   broken link 점검

**6.7 Observatory & Fix-It Ops**

역할: KPI를 보고 원인을 분류해 티켓으로 만든다.

필수 기능:

*   KPI strip
*   object health
*   root cause board
*   Fix-It queue
*   우선순위
*   담당자/기한
*   재배포 결과 로그

**7\. Admin Console 사용자 역할**

권장 역할은 아래와 같다.

**7.1 운영 총괄**

*   공개 승인
*   Featured 최종 결정
*   긴급 이슈 대응 판단
*   구조 변경 승인

**7.2 콘텐츠 기획·편집**

*   AnswerCard / Story / TopicSummary 초안
*   질문 구조화
*   관련 객체 연결 설계

**7.3 근거·리서치 담당**

*   Evidence 수집
*   Archive 보강
*   자료/링크 정리

**7.4 검수자**

*   Review 승인/반려
*   표현·개념·근거 검토

**7.5 이벤트 운영 담당**

*   Event 일정/상태
*   자료/영상/사진 completion
*   신청자 상태

**7.6 회원/참여 운영 담당**

*   회원 신청
*   뉴스레터
*   행사 신청
*   협력문의 처리

**7.7 기술 운영 담당**

*   메타/OG/schema
*   feed/sitemap
*   검색/폼
*   시스템 설정

이 역할 분리는 hanjunho 운영 플레이북의 운영 총괄, 콘텐츠 기획·편집, 근거·리서치, 검수, CMS 운영, 기술 지원 구조를 문화강국네트워크에 맞게 확장한 것이다.

**8\. 퍼블릭 사이트와 Admin Console의 역할 분리**

이 프로젝트에서 가장 중요한 원칙 중 하나다.

**퍼블릭 사이트가 하는 일**

*   질문을 보여준다
*   정답을 보여준다
*   해설을 보여준다
*   행사와 기록을 보여준다
*   참여 CTA를 제공한다

**Admin Console이 하는 일**

*   질문을 수집한다
*   객체를 생성하고 수정한다
*   Review와 공개를 관리한다
*   자료/영상/사진을 누적한다
*   참여 데이터를 관리한다
*   KPI를 보고 Fix-It을 실행한다

즉 퍼블릭 사이트는 **결과물**, Admin Console은 **운영 과정**이다.

**9\. 1차 범위와 2차 범위**

**9.1 1차 범위(MVP)**

1차에서는 아래를 우선 구현하는 것이 좋다.

*   Content Ops
*   Review Ops
*   Event/Archive Ops
*   기본 Inquiry Inbox
*   기본 Member/Registration 관리
*   기본 Publishing 상태 확인
*   기본 Observatory strip
*   기본 Fix-It queue

이 범위만 있어도 문화강국네트워크의 핵심 운영 루프는 닫힌다.

**9.2 2차 확장**

2차에서는 아래를 확장한다.

*   고급 권한 정책
*   자동 lint / 자동 경고
*   relation graph editor
*   bulk edit
*   newsletter segmentation
*   advanced event CRM
*   correction SLA dashboard
*   KPI alerting

**9.3 제외 범위(초기)**

초기에는 아래를 꼭 넣을 필요는 없다.

*   복잡한 마케팅 자동화
*   광고 운영 콘솔
*   커뮤니티 SNS형 기능
*   고급 BI 전체 재구축
*   다국어 운영 콘솔

**10\. 성공 기준**

Admin Console이 잘 설계되었다고 판단하는 기준은 아래다.

*   Draft → Review → Public 흐름이 실제로 관리된다
*   Reviewer / Evidence / UpdatedAt 누락 콘텐츠가 쉽게 드러난다
*   Event 종료 후 자료/영상/사진 completion을 관리할 수 있다
*   질문/제안/정정 요청이 구조적으로 분류된다
*   회원/뉴스레터/행사 신청 상태를 한곳에서 본다
*   Feed/sitemap/publish 상태를 운영자가 직접 확인할 수 있다
*   KPI와 Fix-It이 실제 작업 큐로 이어진다
*   퍼블릭 사이트의 정체성이 운영 과정에서 무너지지 않는다

**11\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크 AI홈페이지는 퍼블릭 사이트만 잘 설계한다고 끝나는 프로젝트가 아닙니다. 이 사이트는 웹진, 정답카드, 행사·영상·자료 아카이브, 회원가입과 뉴스레터, 질문 수집, 검수, 수정, Feed/Sitemap, KPI/Fix-It까지 함께 굴러야 하는 **운영형 Media SSoT 시스템**입니다. 문화강국네트워크 구성안이 웹진·행사·자료·회원 구조를 함께 요구하고, B-SSoT가 Question Capture부터 Fix-It까지의 운영 루프를 필수로 두며, hanjunho 플레이북이 상태값, Reviewer, Featured, 메타, 링크, 공개 승인, 발행 후 수정 반영까지 운영자의 핵심 책임으로 정의한다는 점을 종합하면, **Admin Console은 선택이 아니라 이 프로젝트를 완성하는 필수 운영 계층**입니다.