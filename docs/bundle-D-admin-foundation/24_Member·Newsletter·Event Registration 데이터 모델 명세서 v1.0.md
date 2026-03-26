**24\_Member·Newsletter·Event Registration 데이터 모델 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console에서 관리할 **회원 신청(Member Application)**, **뉴스레터 구독(Newsletter Subscriber)**, **행사 신청(Event Registration)**, **협력 문의(Partnership Inquiry)** 데이터를 공통 원칙과 객체 모델로 정의하는 데 있다.

이 문서는 다음 질문에 답해야 한다.

*   회원 신청 데이터는 무엇을 저장해야 하는가
*   뉴스레터 구독 데이터는 어떤 동의와 소스 정보를 가져야 하는가
*   행사 신청은 단순 신청/취소가 아니라 어떤 상태 흐름을 가져야 하는가
*   협력 문의와 일반 문의는 어떤 객체로 분리해야 하는가
*   이 데이터들은 어떤 AnswerCard / Story / Event / MembershipPlan과 연결되어야 하는가
*   개인정보와 운영 메타데이터는 어떻게 분리해야 하는가

즉, 이 문서는 참여 CTA를 실제 운영 가능한 참여 데이터 구조로 바꾸는 문서다.

**2\. 데이터 모델 설계의 최상위 원칙**

**2.1 참여 데이터는 “전환 결과”가 아니라 “운영 객체”다**

회원 신청, 뉴스레터 구독, 행사 신청은 퍼블릭 사이트에서는 버튼 클릭 뒤에 보이는 폼이지만, 운영 측면에서는 각각 별도 상태와 담당자, 후속 조치를 가진 객체다. Media 패밀리의 전환이 구독/행사/협업 구조라는 점을 고려하면, 이 데이터는 단순 리드가 아니라 운영 자산이다.

**2.2 참여 데이터는 질문·정답·행사와 연결되어야 한다**

문화강국네트워크의 참여는 “그냥 회원가입”이 아니라,  
어떤 질문에 답을 본 뒤, 어떤 Story를 읽고, 어떤 Event를 보고, 어떤 CTA를 눌러 들어왔는지까지 연결되어야 가치가 생긴다. B-SSoT가 전환을 정답 구조 안에 포함하는 이유가 여기에 있다.

**2.3 개인정보와 운영 메타데이터를 분리한다**

이름, 이메일, 연락처 같은 PII와  
상태값, 소스, 관련 콘텐츠, 태그, 후속 조치 기록은 분리해 관리하는 것이 좋다.  
그래야 RBAC, export, 로그, 비식별화가 쉬워진다.

**2.4 상태는 단순하고 명확해야 한다**

참여 객체별로 너무 많은 상태를 만들면 운영이 어려워진다.  
초기에는 “접수 / 검토 / 승인·확정 / 보류 / 종료” 수준의 단순한 상태 체계가 적합하다.

**2.5 모든 참여 데이터는 후속 action을 가져야 한다**

*   회원 신청은 승인/보류/후속 연락
*   뉴스레터 구독은 구독/해지/보류
*   행사 신청은 확정/대기/취소/참석
*   협력 문의는 검토/응답/전환/종결  
    로 이어져야 한다.  
    즉 “저장”에서 끝나면 안 된다.

**3\. 참여 데이터 모델의 전체 구조**

문화강국네트워크 Admin Console의 참여 데이터는 아래 5개 핵심 객체로 정의한다.

1.  MemberApplication
2.  NewsletterSubscriber
3.  EventRegistration
4.  PartnershipInquiry
5.  GeneralInquiry

이 다섯 객체는 공통적으로 아래 메타 필드를 공유한다.

*   id
*   source\_channel
*   source\_cta
*   source\_page\_url
*   linked\_object\_type
*   linked\_object\_id
*   status
*   owner
*   created\_at
*   updated\_at
*   notes\_internal
*   tags

이 공통 메타는 B-SSoT의 질문→정답→전환 구조와, hanjunho 운영 문서의 문의/제보/후속 검토 흐름을 참여 데이터 모델로 옮긴 것이다.

**4\. 공통 필드 설계 원칙**

**4.1 식별 필드**

*   id
*   external\_ref (선택)
*   created\_at
*   updated\_at

**4.2 개인정보 필드**

*   name
*   email
*   phone (선택)
*   organization\_name (선택)
*   role\_title (선택)
*   region (선택)

**4.3 운영 메타 필드**

*   status
*   owner
*   priority
*   source\_channel
*   source\_cta
*   source\_page\_url
*   linked\_object\_type
*   linked\_object\_id
*   notes\_internal
*   last\_contacted\_at

**4.4 동의 필드**

*   consent\_privacy
*   consent\_marketing
*   consent\_newsletter
*   consent\_event\_updates

**4.5 분류/태그 필드**

*   tags
*   segment
*   interest\_topics
*   event\_interest\_type

**5\. MemberApplication 데이터 모델**

**5.1 객체 정의**

MemberApplication은 문화강국네트워크 회원 가입을 희망하는 사용자의 신청 객체다.  
홈페이지 구성안이 홈에서 회원가입 신청 안내를 별도 항목으로 두고 있으므로, 이 객체는 핵심 운영 객체다.

**5.2 핵심 역할**

*   회원 신청 접수
*   신청자 적합성/유형 분류
*   승인/보류/거절 처리
*   회원 커뮤니케이션 이력 관리
*   관련 콘텐츠/행사/문의와의 연결

**5.3 필수 필드**

*   member\_application\_id
*   name
*   email
*   consent\_privacy
*   application\_status
*   created\_at
*   source\_channel

**5.4 권장 필드**

*   phone
*   organization\_name
*   role\_title
*   interest\_topics
*   how\_did\_you\_hear\_about\_us
*   motivation\_text
*   linked\_membership\_plan\_id
*   linked\_event\_id
*   owner
*   notes\_internal
*   approved\_at
*   rejected\_reason

**5.5 상태값**

권장 상태:

*   Submitted
*   Screening
*   Approved
*   Rejected
*   On Hold
*   Archived

이 상태 구조는 앞선 워크플로 문서와 정합적으로 연결된다.

**5.6 운영 규칙**

*   Submitted: 사용자가 폼 제출 완료
*   Screening: 운영자가 검토 시작
*   Approved: 회원 승인
*   Rejected: 승인하지 않음
*   On Hold: 추가 정보 대기 또는 보류
*   Archived: 장기 보존 상태

**5.7 연결 관계**

*   linked\_membership\_plan\_id
*   source\_page\_url
*   source\_answer\_card\_id (선택)
*   source\_story\_id (선택)
*   source\_event\_id (선택)

즉 회원 신청도 어떤 질문·Story·행사에서 유입됐는지 추적할 수 있어야 한다.

**6\. NewsletterSubscriber 데이터 모델**

**6.1 객체 정의**

NewsletterSubscriber는 문강 RIO 핵심 글, 행사, 정답 업데이트를 이메일로 받기 위해 구독한 사용자 객체다. Media 패밀리의 전환 구조가 구독을 핵심으로 보기 때문에 필수 객체다.

**6.2 핵심 역할**

*   뉴스레터 구독 상태 관리
*   구독 소스 추적
*   구독/해지/보류 관리
*   관심 주제 세그먼트 관리
*   향후 이벤트/콘텐츠 추천 연결

**6.3 필수 필드**

*   subscriber\_id
*   email
*   consent\_privacy
*   consent\_newsletter
*   subscription\_status
*   created\_at
*   source\_channel

**6.4 권장 필드**

*   name
*   interest\_topics
*   segment
*   source\_cta
*   source\_page\_url
*   linked\_story\_id
*   linked\_answer\_card\_id
*   first\_subscribed\_at
*   last\_opened\_at (2차)
*   last\_clicked\_at (2차)

**6.5 상태값**

권장 상태:

*   Subscribed
*   Unsubscribed
*   Suppressed

**의미**

*   Subscribed: 정상 구독 중
*   Unsubscribed: 사용자가 수신 거부
*   Suppressed: 시스템상 발송 제외

**6.6 운영 규칙**

*   이메일만으로도 생성 가능
*   동의 없는 구독 생성 금지
*   동일 이메일 중복 생성 금지
*   재구독 시 기존 객체 갱신 우선

**7\. EventRegistration 데이터 모델**

**7.1 객체 정의**

EventRegistration은 행사/토론회/캠페인에 대한 참가 신청 객체다.  
문화강국네트워크는 행사·토론회·캠페인이 핵심 구조이고, 주요 문화행사/토론회 일정 안내도 홈페이지 핵심 항목이므로, 신청 데이터 모델이 필수다.

**7.2 핵심 역할**

*   행사 신청 접수
*   확정/대기/취소/참석 관리
*   행사별 참가자 목록 관리
*   후속 자료/뉴스레터/회원 전환 연결

**7.3 필수 필드**

*   event\_registration\_id
*   event\_id
*   name
*   email
*   registration\_status
*   consent\_privacy
*   created\_at

**7.4 권장 필드**

*   phone
*   organization\_name
*   role\_title
*   attendance\_type (오프라인/온라인)
*   interest\_topics
*   source\_page\_url
*   source\_cta
*   checked\_in\_at
*   followup\_sent\_at
*   linked\_member\_application\_id

**7.5 상태값**

권장 상태:

*   Submitted
*   Confirmed
*   Waitlisted
*   Cancelled
*   Attended
*   No Show

**7.6 운영 규칙**

*   행사 capacity가 있는 경우 Waitlisted 필요
*   행사 종료 후 Attended / No Show 정리
*   종료 후 자료 발송 시 followup\_sent\_at 기록
*   이후 회원 전환되면 linked\_member\_application\_id 또는 member relation 연결

**7.7 연결 관계**

*   event\_id 필수
*   필요 시 topic\_id, answer\_card\_id, story\_id를 소스 관계로 보관 가능

**8\. PartnershipInquiry 데이터 모델**

**8.1 객체 정의**

PartnershipInquiry는 협력/제휴/공동 기획/행사 협업 문의를 담는 객체다.  
문화강국네트워크는 행사, 협력기관, 네트워크, 브랜드 영향력 구조를 함께 가지므로 일반 문의와 분리하는 편이 좋다.

**8.2 핵심 역할**

*   협력 문의 접수
*   검토/응답/전환 관리
*   행사/회원/콘텐츠 협업 파이프라인 관리

**8.3 필수 필드**

*   partnership\_inquiry\_id
*   name
*   email
*   organization\_name
*   inquiry\_status
*   consent\_privacy
*   created\_at

**8.4 권장 필드**

*   phone
*   role\_title
*   inquiry\_type
*   proposal\_summary
*   related\_event\_id
*   related\_topic\_id
*   owner
*   last\_contacted\_at
*   qualified\_at
*   closed\_reason

**8.5 상태값**

권장 상태:

*   New
*   In Review
*   Replied
*   Qualified
*   Closed

**9\. GeneralInquiry 데이터 모델**

**9.1 객체 정의**

GeneralInquiry는 일반 문의, 질문, 제안, 정정 요청 등 퍼블릭 문의 채널을 통해 들어온 메시지 객체다.  
단, 운영상 더 적합하면 QuestionIntake와 통합하거나, CorrectionRequest는 별도 객체로 분리할 수 있다.

**9.2 권장 하위 유형**

*   Question
*   Suggestion
*   Correction
*   General

이 유형 분리는 hanjunho 운영 문서의 질문/정책 제안/사실관계 제보 분류 원칙을 문화강국네트워크형으로 확장한 것이다.

**9.3 필수 필드**

*   general\_inquiry\_id
*   name
*   email
*   inquiry\_type
*   body
*   status
*   consent\_privacy
*   created\_at

**9.4 권장 상태값**

*   New
*   Triaged
*   Mapped
*   Closed

**의미**

*   New: 접수됨
*   Triaged: 유형/우선순위 분류 완료
*   Mapped: AnswerCard/Story/Event/Correction 작업으로 연결됨
*   Closed: 처리 종료

**10\. 공통 관계 모델**

참여 데이터는 아래 객체들과 연결될 수 있어야 한다.

**10.1 퍼블릭 객체와의 관계**

*   linked\_membership\_plan\_id
*   linked\_event\_id
*   linked\_topic\_id
*   linked\_answer\_card\_id
*   linked\_story\_id

**10.2 운영 객체와의 관계**

*   owner\_user\_id
*   linked\_fixit\_ticket\_id
*   linked\_question\_intake\_id
*   linked\_correction\_request\_id

**10.3 사람/조직과의 관계**

*   organization\_name
*   linked\_partner\_org\_id (선택)
*   linked\_expert\_id (선택, 내부 초청/연결형 이벤트일 때)

이렇게 해야 참여 데이터가 “누가 무엇을 눌렀는지”에서 끝나지 않고, **질문-정답-행사-참여 그래프** 안에 들어간다.

**11\. source 추적 필드 설계**

문화강국네트워크는 정답카드, Story, Event, Join 페이지 등 진입점이 많으므로, source 추적이 중요하다.

필수 권장 필드:

*   source\_channel  
    예: home / story / answer / event / join / footer / direct
*   source\_cta  
    예: newsletter\_subscribe / join\_now / event\_apply / partnership\_contact
*   source\_page\_url
*   utm\_source
*   utm\_medium
*   utm\_campaign

**왜 필요한가**

이 필드가 있어야

*   어떤 Story가 구독 전환을 잘 만드는지
*   어떤 Event가 회원 신청으로 이어지는지
*   어떤 AnswerCard가 참여 행동을 유도하는지  
    볼 수 있다.

이는 B-SSoT의 전환 구조를 운영 데이터로 측정하게 해준다.

**12\. 태그와 세그먼트 설계**

초기에는 과도한 CRM 복잡도를 피하고, 아래 정도의 단순 태그 구조가 적절하다.

**12.1 interest topic tags**

*   문화강국
*   K-문명
*   지역문화
*   문화정책
*   행사/토론회
*   인터뷰/인물
*   자료/아카이브
*   회원/협력

**12.2 source segment**

*   home
*   story-led
*   answer-led
*   event-led
*   join-led

**12.3 participation maturity**

*   cold
*   interested
*   active
*   recurring
*   partner\_candidate

**13\. 개인정보·보안 모델 원칙**

**13.1 최소 수집**

초기에는 아래만 수집하면 충분하다.

*   이름
*   이메일
*   연락처(선택)
*   소속(선택)
*   문의/신청 본문
*   동의 항목

**13.2 분리 저장**

*   PII 영역
*   운영 메타 영역
*   관계/분석 영역  
    을 논리적으로 분리하는 것이 좋다.

**13.3 export 제한**

*   전체 export는 승인 권한 필요
*   Event 운영자는 자기 Event 등록 데이터만 열람
*   콘텐츠 편집자는 회원 상세 열람 불가 또는 최소화

**13.4 audit log 필수**

*   상태값 변경
*   note 추가
*   export 실행
*   owner 변경  
    은 반드시 로그를 남긴다.

**14\. 화면별 기본 뷰 제안**

**14.1 Member Applications List**

컬럼 예시:

*   이름
*   이메일
*   신청일
*   상태
*   관심 주제
*   source channel
*   owner
*   마지막 조치일

**14.2 Newsletter Subscribers List**

컬럼 예시:

*   이메일
*   이름
*   구독 상태
*   구독일
*   source CTA
*   관심 주제
*   segment

**14.3 Event Registrations List**

컬럼 예시:

*   행사명
*   신청자
*   이메일
*   상태
*   attendance type
*   신청일
*   체크인 여부
*   후속 발송 여부

**14.4 Partnership Inquiries List**

컬럼 예시:

*   단체명
*   담당자
*   문의 유형
*   상태
*   owner
*   최근 연락일

**15\. 상태 전이 규칙 요약**

**MemberApplication**

Submitted → Screening → Approved / Rejected / On Hold → Archived

**NewsletterSubscriber**

Subscribed ↔ Unsubscribed, 필요 시 Suppressed

**EventRegistration**

Submitted → Confirmed / Waitlisted / Cancelled → Attended / No Show

**PartnershipInquiry**

New → In Review → Replied → Qualified / Closed

**GeneralInquiry**

New → Triaged → Mapped → Closed

이 구조는 앞선 워크플로 문서와 RBAC 문서에 바로 연결된다.

**16\. 1차 MVP 범위 권장안**

1차 MVP에서 반드시 구현할 것은 아래다.

*   MemberApplication
*   NewsletterSubscriber
*   EventRegistration
*   PartnershipInquiry
*   공통 source/owner/status/note 필드
*   기본 list / detail / status update
*   CSV export 제한형
*   linked object relation
*   audit log

2차 확장으로 미뤄도 되는 것:

*   정교한 세그먼트 자동화
*   이메일 오픈/클릭 고도 추적
*   복잡한 멤버십 등급 체계
*   다단계 승인 CRM
*   외부 CRM 완전 동기화

**17\. 이 데이터 모델이 해결하는 문제**

이 모델을 적용하면 아래 문제가 줄어든다.

*   회원 신청이 메일함에 흩어지는 문제
*   뉴스레터 구독 소스가 불명확한 문제
*   행사 신청자와 행사 기록이 분리되는 문제
*   협력 문의가 일반 문의와 섞이는 문제
*   어떤 Story/Answer/Event가 참여를 만들었는지 모르는 문제
*   개인정보와 운영 메타가 뒤엉키는 문제

**18\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크의 회원·뉴스레터·행사 신청 데이터는 단순한 폼 제출 결과가 아니라, **질문-정답-행사-참여를 연결하는 운영 객체**로 설계해야 합니다. 홈페이지 구성안이 회원가입 신청 안내와 행사/토론회/문화행사 구조를 함께 요구하고, B-SSoT가 전환을 Question Capital과 정답 구조 안에서 운영해야 한다고 보며, Media 패밀리의 전환을 구독/행사/협업으로 정의하고, hanjunho 운영 문서가 문의와 제보를 유형별로 나누어 카드/브리핑/검증 구조로 흡수하라고 요구한다는 점을 종합하면, 문화강국네트워크 Admin Console은 최소한 MemberApplication / NewsletterSubscriber / EventRegistration / PartnershipInquiry / GeneralInquiry의 5개 참여 객체를 중심으로 설계하는 것이 가장 적합합니다.