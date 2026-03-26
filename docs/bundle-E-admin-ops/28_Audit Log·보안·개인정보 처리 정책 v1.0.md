**28\_Audit Log·보안·개인정보 처리 정책 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 Admin Console과 퍼블릭 AI홈페이지 전반에 적용될 **감사 로그(Audit Log), 운영 보안(Security), 개인정보 처리(Privacy & PII)** 원칙을 고정하는 데 있다.

이 문서는 다음을 해결해야 한다.

*   어떤 행위를 감사 로그로 남겨야 하는가
*   어떤 데이터가 민감 정보인가
*   콘텐츠 편집 데이터와 회원/문의/행사 신청 데이터를 어떻게 분리할 것인가
*   어떤 권한은 최소화해야 하는가
*   어떤 수정은 ChangeLog와 Audit Log를 동시에 남겨야 하는가
*   export, 삭제, 비식별화, 로그 보존은 어떻게 처리할 것인가
*   Feed / Sitemap / Publish / Role 변경 같은 민감 운영 행위는 어떤 통제가 필요한가

즉, 이 문서는 문화강국네트워크의 **Trust Layer를 운영 시스템 차원으로 확장한 정책 문서**다.

**2\. 최상위 원칙**

**2.1 신뢰는 화면에만 보이면 끝이 아니다**

문화강국네트워크는 퍼블릭 화면에서 Reviewer, Evidence, UpdatedAt, ChangeLog를 보여주는 것만으로 충분하지 않다.  
운영 내부에서도

*   누가 바꿨는지
*   언제 바꿨는지
*   왜 바꿨는지
*   무엇이 바뀌었는지  
    가 남아 있어야 한다.  
    B-SSoT가 ChangeLog/TrustLog 기반 운영형 구조를 전제로 하기 때문에, Audit Log는 선택이 아니라 핵심이다.

**2.2 콘텐츠 운영 데이터와 개인정보는 다르게 다뤄야 한다**

AnswerCard, Story, Event 메타데이터는 운영 자산이지만,  
회원 신청, 행사 신청, 뉴스레터 구독, 협력 문의는 개인정보와 접촉 이력을 포함하는 민감 운영 데이터다.  
따라서 같은 DB 안에 있어도 권한, 열람 범위, export, 로그, 삭제 규칙은 분리되어야 한다.

**2.3 최소 권한 원칙을 기본값으로 한다**

RBAC 문서에서 정한 것처럼,

*   콘텐츠 편집자는 콘텐츠를 고칠 수 있어도 회원 상세를 보면 안 되고
*   기술 운영자는 시스템을 볼 수 있어도 회원 PII를 무제한 보면 안 되며
*   회원 운영자는 참여 데이터를 다룰 수 있어도 퍼블릭 구조를 임의로 바꾸면 안 된다.  
    즉 권한은 “편한 것”보다 “최소한 필요한 것” 기준으로 줘야 한다.

**2.4 공개와 수정은 모두 로그를 남긴다**

아래는 반드시 로그가 남아야 한다.

*   Review 승인
*   Public 전환
*   Hidden/Archived 전환
*   Featured 변경
*   Reviewer 변경
*   Member status 변경
*   Feed 재생성
*   sitemap 재생성
*   export 실행
*   Role 변경

**2.5 개인정보는 운영 목적 범위 안에서만 쓴다**

회원, 뉴스레터, 행사 신청, 협력 문의 데이터는

*   신청/응답/후속 운영
*   참여 전환 분석
*   정당한 운영 커뮤니케이션  
    범위를 넘어서 쓰면 안 된다.

**3\. 정책 적용 범위**

이 정책은 아래 시스템과 데이터에 적용한다.

**3.1 시스템 범위**

*   퍼블릭 AI홈페이지
*   Admin Console
*   Inbox
*   Review / Publishing Center
*   Dashboard / Observatory
*   Feed / Sitemap generation
*   Form / Newsletter / Registration flows

**3.2 데이터 범위**

*   Content objects
*   Archive objects
*   Participation objects
*   Audit logs
*   Change logs
*   Correction requests
*   User accounts / roles
*   System settings / integrations

**4\. 데이터 분류 체계**

문화강국네트워크 데이터는 아래 4등급으로 분류한다.

**4.1 Level A — 퍼블릭 콘텐츠 데이터**

예:

*   Title
*   Summary
*   Topic
*   Story Type
*   Public Status
*   UpdatedAt
*   Reviewer 이름
*   Event 정보
*   ArchiveDocument 메타

특징:

*   퍼블릭 공개 가능
*   편집 및 배포 대상
*   감사 로그 필요

**4.2 Level B — 운영 메타 데이터**

예:

*   Review comment
*   rejection reason
*   internal notes
*   featured priority
*   publish risk score
*   root cause bucket
*   fix-it status

특징:

*   내부 운영 전용
*   퍼블릭 비노출
*   권한 제한 필요

**4.3 Level C — 제한 운영 데이터**

예:

*   member application status
*   inquiry ownership
*   follow-up notes
*   segmentation tags
*   event attendance status

특징:

*   운영에 필요하지만 공개 금지
*   role-based 제한 필요
*   export 엄격 통제

**4.4 Level D — 개인정보/민감 데이터(PII)**

예:

*   이름
*   이메일
*   전화번호
*   소속
*   문의 본문
*   신청 사유
*   행사 참석 정보
*   연락 이력

특징:

*   최소 수집
*   최소 열람
*   export/삭제/보존 정책 필요
*   모든 접근에 로그 권장

**5\. Audit Log 정책**

**5.1 Audit Log의 정의**

Audit Log는 Admin Console에서 발생한 중요한 변경과 접근 행위를 기록하는 내부 신뢰 로그다.  
퍼블릭 ChangeLog가 사용자에게 보이는 수정 기록이라면, Audit Log는 **운영 내부의 행위 기록**이다.

**5.2 반드시 기록해야 하는 행위**

아래는 필수 로그 대상이다.

**콘텐츠/배포**

*   객체 생성
*   객체 삭제 시도
*   상태값 변경
*   Reviewer 변경
*   Evidence 변경
*   Featured 변경
*   Publish / Unpublish / Hide / Archive
*   canonical/meta/OG 수정
*   Feed regenerate
*   sitemap regenerate

**참여/회원**

*   Member status 변경
*   Event registration 상태 변경
*   Newsletter 상태 변경
*   Partnership inquiry owner 변경
*   PII export
*   대량 수정
*   내부 노트 추가/수정

**권한/설정**

*   사용자 생성/비활성화
*   Role 변경
*   permission 변경
*   integration 변경
*   workflow rule 변경
*   taxonomy 변경

AIO-PR가 정정 로그와 WORM 이벤트, 운영 거버넌스를 명시적으로 다루고, B-SSoT가 ChangeLog/TrustLog를 운영 핵심으로 보기 때문에 이 정도 수준의 내부 로그는 필수다.

**5.3 Audit Log 필드**

권장 필드:

*   audit\_log\_id
*   actor\_user\_id
*   actor\_role
*   action\_type
*   object\_type
*   object\_id
*   before\_snapshot
*   after\_snapshot
*   reason
*   ip\_address 또는 session\_ref (가능 시)
*   created\_at

**5.4 WORM 성격 권장**

중요 로그는 수정 불가 또는 append-only 구조를 권장한다.  
AIO-PR가 거버넌스 항목에서 WORM 로그를 명시하므로, 최소한 핵심 로그는 사후 변조가 어렵게 보존하는 편이 좋다.

**6\. ChangeLog와 Audit Log의 구분**

**ChangeLog**

*   사용자에게 보이는 공개 수정 이력
*   핵심 정의 수정, 일정 수정, 자료 추가, 정정 반영 등 기록
*   퍼블릭 페이지와 연결

**Audit Log**

*   운영자 내부 행위 기록
*   누가 무엇을 언제 왜 바꿨는지 기록
*   퍼블릭 비노출

**운영 원칙**

중요 수정은 두 로그가 모두 필요할 수 있다.

예:

*   Event 날짜 오류 수정
    *   ChangeLog: 사용자 공지용
    *   Audit Log: 내부 수정 행위 기록용

**7\. 보안 정책**

**7.1 인증(Authentication)**

권장 원칙:

*   모든 Admin Console 사용자는 로그인 필요
*   관리자 계정 공유 금지
*   가능하면 MFA 권장
*   장기 미사용 계정 자동 비활성화 권장

**7.2 권한(Authorization)**

RBAC 문서를 기준으로 권한을 적용한다.

핵심 원칙:

*   역할 기반 기본 권한
*   민감 데이터는 object scope 제한
*   시스템 설정 권한 최소화
*   export 권한 별도 승인 또는 별도 role 필요

**7.3 세션 보안**

*   일정 시간 비활동 시 세션 만료
*   민감 화면(회원/문의/export)은 재인증 또는 추가 확인 권장
*   관리자 세션 로그아웃을 쉽게 제공

**7.4 비밀값/토큰 관리**

외부 연동 키, 뉴스레터 API 키, 폼 연동 토큰, 배포 키는 코드나 로그에 남기지 않는다.  
업로드된 Antigravity 페어코딩 보고서도 외부 API 키/토큰 하드코딩 금지와 개인정보를 코드/로그에 남기지 말 것을 명시합니다. 이는 Admin Console 구현에서도 그대로 적용해야 하는 보안 기본 원칙입니다.

**7.5 파일 업로드 보안**

*   발제문, 자료집, 이미지, 문서 업로드 시 파일 형식 제한
*   실행 파일 업로드 금지
*   파일명 sanitization 권장
*   공개 링크와 내부 파일 저장 경로 분리 권장

**8\. 개인정보 처리 원칙**

**8.1 최소 수집 원칙**

필수 최소 수집:

*   이름
*   이메일
*   개인정보 처리 동의

선택 수집:

*   전화번호
*   소속
*   역할
*   관심 주제
*   문의 본문

즉, “언젠가 필요할 수 있으니 다 받는” 방식은 지양한다.

**8.2 목적 제한 원칙**

수집 목적은 아래 범위로 제한한다.

*   회원 신청 검토 및 응답
*   뉴스레터 발송 및 구독 관리
*   행사 신청 및 운영 연락
*   협력/일반 문의 응답
*   참여 전환 구조 분석

이 범위를 벗어난 2차 사용은 금지 또는 별도 동의 필요 원칙으로 둔다.

**8.3 분리 저장 원칙**

가능하면 아래를 논리적으로 분리한다.

*   PII 테이블
*   운영 메타 테이블
*   관계/분석 테이블

예:

*   이름/이메일/전화번호
*   상태값/owner/태그
*   linked\_story / linked\_event / source\_channel

이렇게 해야 RBAC, export, 비식별화가 쉬워진다.

**8.4 보존 기간 원칙**

권장:

*   newsletter unsubscribed / suppressed: 장기 최소 식별 정보만 유지
*   rejected member applications: 일정 기간 후 비식별화 검토
*   event registration: 행사 종료 후 운영상 필요한 기간만 유지
*   closed general inquiries: 장기 보관 필요성 없으면 비식별화/삭제 검토

구체 기간은 법률 검토 후 확정하면 되지만, 정책 문서 수준에서는 “무기한 전체 보관 금지” 원칙을 두는 것이 맞다.

**8.5 삭제·비식별화 원칙**

*   운영상 더 이상 필요하지 않으면 삭제 또는 비식별화
*   분석은 가능하면 비식별 데이터 우선
*   export된 파일도 보안 관리 범위에 포함

**9\. PII 접근 정책**

**9.1 기본 원칙**

PII는 “볼 수 있으면 편하다”가 아니라 “업무상 꼭 필요한 사람만 본다”가 원칙이다.

**9.2 역할별 접근 요약**

**콘텐츠 편집 담당**

*   원칙적으로 PII 비접근
*   필요 시 일부 문의 subject 수준만 제한 열람 가능

**회원·참여 운영 담당**

*   Member / Newsletter / Registration / Inquiry 상세 열람 가능
*   export는 제한적 승인 필요

**이벤트 운영 담당**

*   자기 이벤트의 등록자 정보만 접근
*   전체 멤버십 데이터 접근 불가

**기술 운영 담당**

*   시스템 상태는 보되 PII는 원칙적 비접근
*   예외적 디버깅 시 최소 범위 임시 접근

**운영 총괄**

*   필요한 범위에서 제한 접근 가능
*   전체 export는 정책상 최소화

**10\. export / download 정책**

**10.1 기본 원칙**

export는 매우 민감한 행위로 본다.

**허용 대상**

*   member list
*   event registration list
*   newsletter subscriber list
*   inquiry list

**보호 규칙**

*   export 권한 별도 role 또는 승인 필요
*   export 로그 필수
*   export 파일 만료 링크 또는 제한 저장 권장
*   대량 export는 사유 입력 필수

**10.2 로그 필수 항목**

*   누가
*   무엇을
*   몇 건
*   언제
*   왜
*   어디에 저장/전달했는지(가능 시)

**11\. 정정(Correction)과 보안의 관계**

정정 요청은 콘텐츠 품질 이슈이면서 동시에 신뢰·거버넌스 이슈다.

**정정 처리 시 보안 원칙**

*   제보자의 PII를 공개 ChangeLog에 노출하지 않는다
*   내부 Audit Log에는 처리 담당자와 조치 기록을 남긴다
*   Public ChangeLog에는 필요한 사실만 적는다
*   악의적/스팸성 correction은 분리 태그로 관리

즉 CorrectionRequest는 콘텐츠 운영 객체이면서 개인정보 처리 대상이기도 하다.

**12\. Feed / Sitemap / Publish 보안 원칙**

AIO-PR는 Feed, sitemap, JSON-LD를 운영 체계의 일부로 보고, Feed ETag, lastmod 일치, canonical/mainEntityOfPage 정합성을 린트 규칙으로 둡니다. 이건 보안과 품질 경계가 만나는 지점입니다.

**원칙**

*   Feed regenerate는 제한 권한만 허용
*   sitemap regenerate는 제한 권한만 허용
*   Publish/Hide/Archive는 audit log 필수
*   canonical 변경은 중요한 운영 행위로 간주
*   schema/meta quick edit도 로그 대상

**이유**

이들 값은 검색/AI 채택과 퍼블릭 신뢰에 직접 영향이 있으므로, 무분별한 수정이 위험하다.

**13\. incident 대응 원칙**

권장 incident 유형:

*   잘못된 퍼블릭 공개
*   reviewer 없는 콘텐츠 공개
*   event registration 폼 장애
*   newsletter 잘못 발송
*   PII 과다 노출
*   잘못된 export
*   broken feed/sitemap 대량 오류

**incident 공통 절차**

1.  식별
2.  임시 차단/Hidden
3.  owner 지정
4.  원인 파악
5.  수정
6.  재검토
7.  재배포
8.  incident log 남김

이 절차는 B-SSoT 운영 루프의 Root Cause → Fix-It → Re-Publish와 그대로 맞물린다.

**14\. 운영 화면별 보안 체크포인트**

**Inbox**

*   제보자 개인정보 최소 노출
*   내부 note 외부 비노출
*   correction와 general inquiry 분리

**Participation**

*   리스트 뷰에서 과도한 PII 기본 노출 금지
*   상세 접근 role 제한
*   export 로그 필수

**Review**

*   reviewer comment 외부 비노출
*   rejected reason 내부만 노출

**Publishing Center**

*   feed/sitemap 재생성 권한 제한
*   featured 변경 로그 필수

**Dashboard / Observatory**

*   개인 식별보다 집계 우선
*   member/inquiry 카드도 count 중심
*   상세 drill-down에서만 제한적 PII 노출

**15\. 구현 권장 전략**

**15.1 로그 계층 분리**

*   audit log
*   change log
*   incident log  
    를 구분하는 것이 좋다.

**15.2 데이터 계층 분리**

*   public content DB/모델
*   ops metadata
*   PII storage  
    를 논리적으로 분리

**15.3 민감 액션 보호**

아래는 confirm modal + reason 입력 + audit log를 권장

*   Publish
*   Hide
*   Archive
*   export
*   role change
*   delete/anonymize
*   feed regenerate

**15.4 마스킹 기본값**

리스트 뷰에서는

*   이메일 일부 마스킹
*   전화번호 일부 마스킹  
    기본 적용을 권장한다.

**16\. 1차 MVP에서 반드시 지켜야 할 최소 정책**

초기 구현이라도 아래는 꼭 지켜야 한다.

*   계정 공유 금지
*   역할별 접근 제어
*   Draft→Review→Public 장벽
*   Publish/Hide/Archive audit log
*   member/registration/inquiry 접근 제한
*   export 로그
*   reviewer/evidence 없는 public 차단
*   correction 처리 기록
*   API 키/토큰/PII 하드코딩 금지

마지막 항목은 업로드된 AI pair coding 보안 체크리스트와도 일치합니다.

**17\. 이 정책이 해결하는 문제**

이 정책을 적용하면 아래 문제가 줄어든다.

*   누가 무엇을 바꿨는지 모르는 문제
*   reviewer/evidence 없이 공개되는 문제
*   회원/행사 신청 데이터가 과다 노출되는 문제
*   export 남발 문제
*   정정 요청이 기록 없이 처리되는 문제
*   feed/sitemap/canonical이 무분별하게 수정되는 문제
*   퍼블릭 ChangeLog와 내부 Audit Log가 뒤섞이는 문제

**18\. 최종 결론**

이 문서의 결론은 분명합니다.  
문화강국네트워크의 Audit Log·보안·개인정보 정책은 일반 홈페이지 수준이 아니라, **운영형 Media SSoT 시스템** 수준으로 설계되어야 합니다. B-SSoT가 Trust Layer를 Evidence / Reviewer / Update / ChangeLog / Correction Path로 정의하고, 운영 루프를 Question Capture에서 Re-Publish까지 닫힌 구조로 보며, 문화강국네트워크가 웹진, 행사/토론회, 발제문 아카이빙, 문화행사 기록, 회원가입과 뉴스레터를 함께 운영해야 하고, AIO-PR가 WORM 로그, 정정 SLA, PII 마스킹, Feed/Schema 거버넌스를 핵심 운영 규칙으로 두고 있다는 점을 종합하면, 이 시스템은 **감사 로그, 최소 권한, PII 분리 저장, export 통제, correction 이력, publish/metadata/feed/sitemap 제어**를 모두 갖춘 정책 위에서 운영되어야 합니다. 그것이 문화강국네트워크 AI홈페이지의 Trust Layer를 퍼블릭 화면 너머까지 완성하는 방식입니다.