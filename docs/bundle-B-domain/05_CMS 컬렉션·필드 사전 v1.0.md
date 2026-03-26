**05\_CMS 컬렉션·필드 사전 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지의 CMS를 **혼동 없이 설계·구현·운영**하기 위한 기준을 고정하는 데 있다.  
이 문서는 단순 필드 목록이 아니다. 이 문서는 **정보구조, UX, 카피, AEO, 운영 workflow가 연결된 실전용 CMS 기준 문서**여야 한다는 hanjunho.ai CMS 사전의 원칙을 그대로 따른다.

이 문서가 답해야 하는 핵심은 다음이다.

*   어떤 객체를 CMS 컬렉션으로 둘 것인가
*   어떤 객체는 정적 페이지 + CMS 리스트 조합으로 처리할 것인가
*   각 컬렉션의 목적은 무엇인가
*   공통 필드는 무엇인가
*   관계 필드는 어떻게 연결하는가
*   공개 상태는 어떻게 제어하는가
*   1차 런치에서 반드시 입력해야 하는 항목은 무엇인가

즉, 이 문서는 **Media SSoT형 AI홈페이지의 데이터 뼈대**를 잠그는 문서다.  
이후 페이지별 구현 명세서, 카피 마스터, AEO·SEO·Schema, QA/UAT 문서는 이 CMS 사전을 기준으로 세부 동작을 맞춰야 한다. 이는 hanjunho.ai CMS 사전이 이후 구현/카피/AEO 문서의 기준 문서로 쓰인다는 구조와 동일하다.

**2\. CMS 설계의 기본 원칙**

**2-1. 실무 안정성이 최우선이다**

Webflow나 유사 CMS 환경에서는 다중 참조가 지나치게 많거나 객체 분해가 과도하면 디자이너·개발자·운영자 모두 헷갈리기 쉽다. 따라서 1차 구축에서는 “이론적으로 가장 아름다운 구조”보다 **운영이 쉬운 구조**를 우선한다. 이 원칙은 hanjunho.ai CMS 사전이 그대로 강조한 기준이다.

**2-2. 정본 페이지와 해설 페이지를 분리한다**

문화강국네트워크에서는 AnswerCard가 정본, Story가 기사형 해설, Event/Video/ArchiveDocument가 기록 자산, Expert가 신뢰 주체다.  
이는 hanjunho.ai에서 Answer Card를 정본, Issue Briefing을 기사형 해설, Profiles를 신뢰 주체로 둔 구조를 Media형으로 전이한 것이다.

**2-3. 컬렉션은 적게, 필드는 명확하게**

핵심 컬렉션을 분명히 정의하고, 각 필드의 목적과 노출 위치를 자세히 적는 편이 더 낫다.  
문화강국네트워크도 1차 런치에서 모든 것을 별도 컬렉션으로 쪼개기보다, **핵심 정본 객체만 CMS로 두고, 상위 허브는 정적 페이지 + CMS 리스트** 조합으로 운영하는 것이 가장 안정적이다.

**2-4. 공개 상태를 엄격하게 제어한다**

모든 핵심 컬렉션에는 Public Status 또는 동등한 상태 관리 필드가 반드시 있어야 한다.  
샘플 글, 미검수 자료, 임시 콘텐츠가 공개되면 사이트 엔티티가 흐려진다. hanjunho.ai 사전도 이 부분을 핵심 원칙으로 둔다.

**2-5. 신뢰 필드는 공통으로 가져간다**

Media 패밀리는 편집권·취재·전문성·출처 체인으로 신뢰를 만든다. 따라서 Reviewer, Evidence, Last Updated, Boundary, ChangeLog 같은 신뢰 신호는 핵심 컬렉션에 공통으로 반영한다. 이는 사용자의 공통 AI홈페이지 원칙과 일치한다.

**2-6. 정적 페이지와 CMS의 역할을 나눈다**

홈, GNB 허브, 가입 안내, 뉴스레터 안내, 네트워크 소개 허브처럼 **방향을 잡는 상위 허브**는 정적 페이지로 두고, 대표 카드/대표 글/대표 행사/대표 자료를 CMS 리스트로 불러오는 방식이 1차 구축에 가장 안정적이다. 이 원칙도 hanjunho.ai CMS 사전의 핵심이다.

**3\. 최종 CMS 구성 개요**

문화강국네트워크 AI홈페이지의 1차 운영 기준 핵심 동적 컬렉션은 아래 10개로 정의한다.

1.  AnswerCards
2.  Stories
3.  TopicSummaries
4.  Events
5.  Videos
6.  ArchiveDocuments
7.  Experts
8.  MembershipPlans
9.  NewsletterIssues
10.  Partners

권장 확장 컬렉션은 아래 4개다.

1.  ResourceItems
2.  DataNotes
3.  ChangeLogs
4.  GlossaryTerms

이 구조는 두 가지 균형을 맞춘다.  
하나는 Media 패밀리에 필요한 topic summary, story, expert, event, evidence chain 계열 객체를 살리는 것이고, 다른 하나는 hanjunho.ai 사전이 강조한 **과도하게 많은 컬렉션을 피하는 운영 안정성**이다.

**정적 페이지 중심으로 시작하는 영역**

다음은 1차에서 정적 페이지 + CMS 리스트 조합으로 시작하는 것이 적절하다.

*   Home
*   문강 RIO 소개
*   3 Pillars 허브
*   네트워크 소개 허브
*   참여·회원 메인
*   뉴스레터 소개
*   검색 결과 프레임

이는 hanjunho.ai에서 홈, 상위 허브, 안내 페이지를 정적 프레임 + CMS 리스트로 운영한 방식과 동일한 논리다.

**4\. 컬렉션 간 관계 구조**

전체 관계를 문장으로 정리하면 다음과 같다.

*   Experts는 AnswerCards, Stories, Events, Videos의 Author, Editor, Reviewer, Speaker로 연결된다.
*   TopicSummaries는 AnswerCards, Stories, Events, Videos, ArchiveDocuments의 상위 주제 허브 역할을 한다.
*   AnswerCards는 Stories의 Based On Answers와 연결되고, Events, Videos, MembershipPlans와도 연관될 수 있다.
*   Stories는 AnswerCards와 다대다 관계를 가지며, Events, Videos, ArchiveDocuments, Experts와 연결된다.
*   Events는 Videos, ArchiveDocuments, Stories, Experts와 연결된다.
*   MembershipPlans는 특정 AnswerCards, Stories, Events의 실행 CTA 목적지로 연결된다.
*   Partners는 Network 허브와 Events 또는 Stories에서 협력기관 संदर्भ으로 사용된다.

핵심은 다음이다.

*   Experts는 **신뢰 주체 컬렉션**
*   AnswerCards는 **공식 정답 컬렉션**
*   Stories는 **기사형 해설 컬렉션**
*   TopicSummaries는 **상위 아젠다 허브 컬렉션**
*   Events / Videos / ArchiveDocuments는 **기록 아카이브 컬렉션**
*   MembershipPlans / NewsletterIssues는 **전환 컬렉션**

이 구조는 hanjunho.ai의 Profiles ↔ Answer Cards ↔ Issue Briefings ↔ Fact Check 관계를 문화강국네트워크 Media SSoT 구조로 확장한 형태다.

**5\. 공통 필드 운영 규칙**

핵심 컬렉션에는 일부 공통 필드를 둬야 운영이 편하다. hanjunho.ai 사전도 Public Status, Featured on Home, Display Priority, Last Updated, Meta Title Override, Meta Description Override, OG Image 같은 공통 필드를 두라고 권장한다.

**5-1. Name / Title**

*   타입: Plain Text
*   필수 여부: 필수
*   설명: 객체의 공식 이름 또는 제목
*   노출 위치: 상세 H1, 리스트 제목, OG 일부

**5-2. Canonical Slug**

*   타입: Plain Text
*   필수 여부: 권장
*   설명: URL 통제용
*   운영 규칙: 1차 런치부터 slug 체계를 깨지 않도록 관리

**5-3. Public Status**

*   타입: Option
*   필수 여부: 필수
*   권장 값: Draft / Review / Public / Hidden / Archived
*   설명: 공개 상태 관리
*   운영 규칙: 필수 필드가 비어 있으면 Public 금지
*   참고: hanjunho.ai가 동일한 상태값 체계를 권장함.

**5-4. Featured on Home**

*   타입: Switch
*   필수 여부: 권장
*   설명: 홈 대표 노출 여부
*   운영 규칙: 홈 대표 카드/대표 Story/대표 Event 노출 제어

**5-5. Display Priority**

*   타입: Number
*   필수 여부: 권장
*   설명: 노출 우선순위
*   운영 규칙: 숫자가 낮을수록 먼저 노출

**5-6. Last Updated**

*   타입: Date/Time
*   필수 여부: 필수
*   설명: 최신성 표시
*   노출 위치: 상세 상단 메타, 카드 하단, 정렬 로직 보조
*   참고: hanjunho.ai도 주요 상세에 필수로 둠.

**5-7. Meta Title Override / Meta Description Override / OG Image**

*   타입: Plain Text / Image
*   필수 여부: 선택
*   설명: 메타와 공유 이미지 제어
*   운영 규칙: 초기에는 자동 규칙, 고도화 시 수동 보정

**5-8. Author / Editor / Reviewer**

*   타입: Reference → Experts
*   필수 여부: 핵심 콘텐츠 컬렉션에서 필수
*   설명: 작성 / 편집 / 검수 주체
*   운영 규칙: Media 패밀리의 핵심 trust field

**5-9. Related Topics / Related Answers / Related Stories**

*   타입: Multi-reference
*   필수 여부: 권장
*   설명: 그래프형 연결을 위한 핵심 필드
*   운영 규칙: No dead-end를 위해 상세 페이지마다 최소 1개 이상 연결

**5-10. Boundary Note**

*   타입: Plain Text 또는 Long Text
*   필수 여부: 선택, 단 담론형 글에서는 권장
*   설명: 글의 성격, 해설 범위, 한계, 공식 입장 여부
*   근거: 사용자의 공통 원칙이 Boundary를 핵심 신뢰 신호로 본다.

**6\. Experts 컬렉션 사전**

**6.1 컬렉션 목적**

Experts는 문화강국네트워크 안에서 **누가 답을 말하고, 누가 썼고, 누가 검토했고, 누가 행사에 참여했는가**를 설명하는 핵심 컬렉션이다.  
hanjunho.ai에서 Profiles가 신뢰 주체 컬렉션이었던 것과 같은 역할이다.

**6.2 이 컬렉션이 사용되는 위치**

*   Story 상세 하단 작성자·검수자 블록
*   AnswerCard 상세 하단 작성자·검수자 블록
*   Event 상세 연사 블록
*   Video 상세 출연자 블록
*   네트워크 > 사람 상세
*   행사/영상 리스트의 speaker badge
*   홈 신뢰 블록

**6.3 운영 핵심 아이템 예시**

*   이우종 이사장
*   편집장
*   주요 필자
*   외부 기고자
*   발제자/토론자
*   자문위원
*   검토 전문가

**6.4 필드 사전**

*   Name / Plain Text / 필수
*   Role / Plain Text / 필수  
    예: 이사장 / 편집장 / 필자 / 연사 / 검토자
*   Profile Type / Option / 필수  
    허용 값 예: 공식 발화자 / 편집 책임자 / 필자 / 리뷰어 / 연사 / 협력 전문가
*   Short Summary / Short Text / 필수  
    검색·AI 요약에 노출될 핵심 2~3문장
*   Bio / Rich Text / 필수
*   Profile Image / Image / 권장
*   Authority Highlight 1~4 / Plain Text / 권장  
    예: 이사장 / 문화정책 전문가 / 지역문화 연구 / 토론회 좌장
*   Core Principle 1~4 / Plain Text / 권장
*   Related Answers / Multi-reference → AnswerCards / 권장
*   Related Stories / Multi-reference → Stories / 권장
*   Related Events / Multi-reference → Events / 권장
*   Is Default Author / Switch / 선택
*   Is Default Reviewer / Switch / 선택
*   공통 필드 세트 포함

**6.5 운영 규칙**

*   Name에는 직함을 넣지 않는다.
*   Role은 15~30자 내외로 유지한다.
*   Short Summary는 “왜 이 인물이 중요한가”를 먼저 쓴다.
*   Is Default Reviewer는 편집장 또는 공식 검수 책임자에게만 설정한다.
*   작성자·검수자 없는 Story/AnswerCard/Event는 공개하지 않는다.

**7\. AnswerCards 컬렉션 사전**

**7.1 컬렉션 목적**

AnswerCards는 문화강국네트워크 AI홈페이지에서 가장 중요한 컬렉션이다.  
질문 하나에 대해 문화강국네트워크의 공식 답을 가장 압축적으로 담는 정본 컬렉션이다. 이는 B-SSoT 최소 정답 단위와 직접 연결된다.

**7.2 사용 위치**

*   홈 Featured AnswerCards
*   정답카드 인덱스
*   AnswerCard 상세
*   Story 상세 상단 관련 정답
*   TopicSummary 대표 정답
*   Event/Video 상세 관련 정답
*   Membership 연결 CTA

**7.3 필드 사전**

*   Name / Plain Text / 필수  
    카드의 공식 제목
*   Question / Plain Text / 필수  
    사용자의 자연어 질문
*   Category / Option / 필수  
    허용 값 예: 문화강국 / K-문명 / 지역문화 / 문화정책 / 행사기록 / 참여회원
*   Pillar / Option / 필수  
    Reform / Implementation / Outcomes
*   Direct Answer / Long Text / 필수  
    핵심 2~3문장 요약
*   Action Point 1 Title / Body / 필수
*   Action Point 2 Title / Body / 권장
*   Action Point 3 Title / Body / 권장
*   Context & Impact / Rich Text / 필수
*   Evidence 1 Title / URL / 권장
*   Evidence 2 Title / URL / 권장
*   Evidence 3 Title / URL / 권장
*   Author / Reference → Experts / 필수
*   Reviewer / Reference → Experts / 필수
*   Related Stories / Multi-reference → Stories / 권장
*   Related Events / Multi-reference → Events / 선택
*   Related Videos / Multi-reference → Videos / 선택
*   Related Cards / Multi-reference → AnswerCards / 선택
*   Membership CTA / Reference → MembershipPlans / 선택
*   Tags / Multi-text / 권장
*   공통 필드 세트 포함

**7.4 운영 규칙**

*   Question과 Name은 역할이 다르다.  
    Question은 사용자의 언어, Name은 정답의 공식 이름이다. 이 원칙은 hanjunho.ai의 카드 운영 규칙과 동일하다.
*   Category나 Pillar가 비어 있으면 공개 금지
*   Reviewer가 없으면 공개 금지
*   Direct Answer는 2~3문장으로 제한
*   Related Stories가 하나도 없으면 1차 런치 후 보완 대상
*   Membership CTA는 참여·회원 질문군 카드에 우선 연결

**8\. Stories 컬렉션 사전**

**8.1 컬렉션 목적**

Stories는 문강 RIO의 기사형 해설 컬렉션이다.  
이 컬렉션은 단순 블로그가 아니다. Stories는 문화강국 이슈에 대해 질문을 제기하고, 개념을 정리하고, 근거와 맥락을 제공하며, 관련 정답카드로 연결하는 **기사형 정본 해설 페이지**를 만드는 데 쓰인다. 이는 hanjunho.ai의 Issue Briefings 목적과 구조적으로 같다.

**8.2 사용 위치**

*   문강 RIO 인덱스
*   RIO 섹션별 리스트
*   Story 상세
*   홈 대표 기사
*   TopicSummary 대표 글
*   Event/Video 상세 관련 글
*   Expert 상세 관련 글

**8.3 필드 사전**

*   Title / Plain Text / 필수
*   Deck / Long Text / 필수  
    상단 2~3문장 요약
*   Story Body / Rich Text / 필수
*   Story Type / Option / 필수  
    Agenda Essay / Policy Brief / Interview / Event Review / Regional Story / Practical Info
*   Section / Option / 필수  
    Policy Insight / Culture Power Report / 지역이 문화가 되다 / Culture People / Global & Trend / 지원사업 캘린더
*   Pillar / Option / 권장
*   Why This Matters / Long Text / 필수
*   Based On Answers / Multi-reference → AnswerCards / 필수 권장
*   Primary Topic / Reference → TopicSummaries / 권장
*   Primary Source Title / URL / 선택
*   Additional Source 1~2 / 선택
*   Author / Reference → Experts / 필수
*   Editor / Reference → Experts / 필수 권장
*   Reviewer / Reference → Experts / 필수
*   Related Events / Multi-reference → Events / 선택
*   Related Videos / Multi-reference → Videos / 선택
*   Related Documents / Multi-reference → ArchiveDocuments / 선택
*   Related Stories / Multi-reference → Stories / 선택
*   Boundary Note / Short Text / 선택
*   Featured in RIO / Switch / 권장
*   공통 필드 세트 포함

**8.4 운영 규칙**

*   Based On Answers 없는 Story는 원칙적으로 공개하지 않는다.
*   Deck은 이슈, 쟁점, 해설 방향이 짧게 담겨야 한다. hanjunho.ai 브리핑 요약 원칙과 같다.
*   기사 복붙형 클리핑 금지
*   Story Type과 Section은 혼동하지 않는다.  
    Story Type은 글 형식, Section은 편집 섹션이다.
*   Why This Matters가 비어 있으면 공개 금지
*   리뷰어 없는 담론형 글은 공개 금지

**9\. TopicSummaries 컬렉션 사전**

**9.1 컬렉션 목적**

TopicSummaries는 문화강국, K-문명, 지역문화, 문화정책 같은 상위 아젠다를 정본화하는 허브 컬렉션이다. Media 패밀리의 핵심 객체인 topic summary를 그대로 반영한다.

**9.2 사용 위치**

*   3 Pillars > topic 상세
*   정답카드 카테고리 허브 보조
*   Story 상세 관련 주제
*   홈 아젠다 소개 블록

**9.3 필드 사전**

*   Name / Plain Text / 필수
*   One-line Definition / Short Text / 필수
*   Summary Body / Rich Text / 필수
*   Primary Questions / Multi-text / 필수 권장
*   Representative Answers / Multi-reference → AnswerCards / 필수 권장
*   Representative Stories / Multi-reference → Stories / 필수 권장
*   Representative Events / Multi-reference → Events / 선택
*   Representative Videos / Multi-reference → Videos / 선택
*   Pillar / Option / 필수
*   Topic Tags / Multi-text / 권장
*   Editor / Reference → Experts / 권장
*   공통 필드 세트 포함

**9.4 운영 규칙**

*   One-line Definition은 첫 화면 노출을 전제로 짧고 강하게 작성
*   최소 3개의 Primary Questions 권장
*   Representative Answers와 Representative Stories가 모두 비어 있으면 공개 금지
*   TopicSummary는 카테고리 설명문이 아니라 정본 허브다

**10\. Events 컬렉션 사전**

**10.1 컬렉션 목적**

Events는 토론회, 캠페인, 문화행사, 포럼을 기록하는 핵심 아카이브 컬렉션이다.  
문화강국네트워크 구성안이 “토론회 개요 및 발제문 아카이빙”, “문화행사 사진 위주의 개요 안내”를 명시하고 있으므로 1급 컬렉션이어야 한다.

**10.2 사용 위치**

*   행사 일정
*   지난 행사
*   Event 상세
*   홈 행사 배너
*   Story 상세 관련 행사
*   Video 상세 상위 행사
*   자료실의 발제문/사진 연결

**10.3 필드 사전**

*   Event Name / Plain Text / 필수
*   Event Type / Option / 필수  
    토론회 / 포럼 / 문화행사 / 캠페인 / 인터뷰 세션
*   Event Summary / Long Text / 필수
*   Event Description / Rich Text / 필수 권장
*   Event Date Start / Date/Time / 필수
*   Event Date End / Date/Time / 선택
*   Location / Plain Text / 권장
*   Program / Rich Text / 선택
*   Hosts / Organizers / Plain Text 또는 Multi-reference → Partners / 권장
*   Speakers / Multi-reference → Experts / 권장
*   Related Answers / Multi-reference → AnswerCards / 권장
*   Related Stories / Multi-reference → Stories / 권장
*   Related Videos / Multi-reference → Videos / 선택
*   Archive Documents / Multi-reference → ArchiveDocuments / 선택
*   Photo Gallery URL 또는 Image list / 선택
*   Registration CTA / Link 또는 Reference → MembershipPlans / 선택
*   Event Status / Option / 필수  
    Upcoming / Open / Closed / Archived
*   공통 필드 세트 포함

**10.4 운영 규칙**

*   Event Summary 없는 행사 공개 금지
*   Event Date Start 필수
*   과거 행사는 Archived 또는 Public+Archived 정책으로 관리
*   종료된 행사라도 발제문, 영상, 사진이 들어오면 업데이트
*   Story나 Video와 최소 1개 이상 연결 권장

**11\. Videos 컬렉션 사전**

**11.1 컬렉션 목적**

Videos는 명사 영상, 행사 다시보기, 인터뷰 영상, 하이라이트 클립을 관리하는 컬렉션이다.  
문화강국네트워크가 “행사/명사 영상”을 주요 자산으로 운영하려는 계획과 연결된다.

**11.2 사용 위치**

*   영상 인덱스
*   Video 상세
*   행사 상세의 다시보기 블록
*   Story 상세 관련 영상
*   홈 영상 하이라이트

**11.3 필드 사전**

*   Video Title / Plain Text / 필수
*   Video Summary / Long Text / 필수
*   Embed URL / Link / 필수
*   Thumbnail Image / Image / 권장
*   Video Type / Option / 필수  
    행사 다시보기 / 인터뷰 / 하이라이트 / 강연
*   Primary Event / Reference → Events / 선택
*   Speakers / Multi-reference → Experts / 선택
*   Related Answers / Multi-reference → AnswerCards / 권장
*   Related Stories / Multi-reference → Stories / 권장
*   Transcript / Rich Text / 선택
*   공통 필드 세트 포함

**11.4 운영 규칙**

*   Embed URL 없는 공개 금지
*   Video Summary는 상단 2~3문장으로 유지
*   가능하면 Primary Event 연결
*   인터뷰형 영상은 Speakers 필수 권장

**12\. ArchiveDocuments 컬렉션 사전**

**12.1 컬렉션 목적**

ArchiveDocuments는 발제문, 자료집, 보도자료, 사진 묶음, 행사 기록 PDF 등 문서형 아카이브를 관리하는 컬렉션이다.  
구성안이 토론회 발제문과 문화행사 기록을 명시하므로 필수다.

**12.2 사용 위치**

*   Event 상세
*   자료실
*   Story 상세 근거 자료
*   데이터·자료 허브

**12.3 필드 사전**

*   Document Title / Plain Text / 필수
*   Document Type / Option / 필수  
    발제문 / 자료집 / 보도자료 / 사진집 / 행사기록 / 외부자료
*   Document Summary / Long Text / 권장
*   File Upload 또는 External URL / 필수
*   Primary Event / Reference → Events / 선택
*   Primary Story / Reference → Stories / 선택
*   Primary Topic / Reference → TopicSummaries / 선택
*   Authors / Plain Text 또는 Multi-reference → Experts / 선택
*   Publication Date / Date / 권장
*   공통 필드 세트 포함

**12.4 운영 규칙**

*   파일 또는 URL 없는 공개 금지
*   발제문·자료집은 가능하면 Primary Event 연결
*   사진 자료는 대표 이미지와 설명문 필수 권장

**13\. MembershipPlans 컬렉션 사전**

**13.1 컬렉션 목적**

MembershipPlans는 회원가입, 뉴스레터, 협력/제휴, 행사 신청 등 **질문의 실행 답**을 담는 전환 컬렉션이다.  
사용자의 공통 원칙은 Media에서 제품/서비스가 “구독/콘텐츠 묶음/행사”로 번역된다고 설명한다.

**13.2 사용 위치**

*   참여·회원 허브
*   가입 상세
*   Story / AnswerCard / Event CTA
*   홈 참여 CTA

**13.3 필드 사전**

*   Plan Name / Plain Text / 필수
*   Plan Type / Option / 필수  
    회원가입 / 뉴스레터 / 행사신청 / 협력문의
*   Short Benefit Summary / Short Text / 필수
*   Detail Body / Rich Text / 필수
*   CTA Label / Plain Text / 필수
*   CTA URL / Link / 필수
*   Eligibility Note / Short Text / 선택
*   Related Answers / Multi-reference → AnswerCards / 선택
*   Related Stories / Multi-reference → Stories / 선택
*   Related Events / Multi-reference → Events / 선택
*   공통 필드 세트 포함

**13.4 운영 규칙**

*   CTA URL 없는 공개 금지
*   Short Benefit Summary는 한눈에 읽히게 유지
*   Story/Answer/Event에서 최소 하나의 MembershipPlan으로 연결 권장

**14\. NewsletterIssues 컬렉션 사전**

**14.1 컬렉션 목적**

NewsletterIssues는 발행된 뉴스레터 이슈를 기록하고, 웹상에서 대표 요약을 다시 노출하기 위한 컬렉션이다.

**14.2 필드 사전**

*   Issue Title
*   Issue Summary
*   Issue Date
*   Primary Stories
*   Primary Answers
*   Subscribe CTA
*   Archive URL
*   공통 필드 세트

**14.3 운영 규칙**

*   모든 뉴스레터를 사이트에서 장문 재현할 필요는 없고, 아카이브 링크 + 핵심 요약 중심으로 운영 가능
*   홈/참여 허브에서 최근 1~3개 이슈 노출 권장

**15\. Partners 컬렉션 사전**

**15.1 컬렉션 목적**

Partners는 협력기관, 후원기관, 네트워크 파트너를 구조적으로 관리하는 컬렉션이다.  
홈페이지 구성안이 협력기관을 단체 섹션 핵심으로 요구하므로 필요하다.

**15.2 필드 사전**

*   Partner Name
*   Partner Type  
    협력기관 / 후원기관 / 행사 파트너 / 미디어 파트너
*   Short Summary
*   Logo
*   Website URL
*   Related Events
*   Related Stories
*   공통 필드 세트

**16\. ResourceItems, DataNotes, ChangeLogs 확장 컬렉션**

**16.1 ResourceItems**

문화예술정보, 주요 문화행사, 공모사업, 정책 뉴스, 기관/단체 정보 같은 실무 정보 항목을 구조화할 때 사용한다.  
구성안이 이 정보 레이어를 별도로 요구하므로 2차 확장 우선순위가 높다.

**16.2 DataNotes**

간단한 데이터 스냅샷, One-Pager, 문화정책 수치 해설용 컬렉션이다.  
1차 런치에서는 정적 페이지 + Story로 대체 가능하지만, 고도화 시 유용하다.

**16.3 ChangeLogs**

주요 정정/업데이트 이력을 구조적으로 보여주기 위한 컬렉션이다.  
AI홈페이지/B-SSoT가 ChangeLog/TrustLog 기반 운영형 구조라는 점을 반영한다.

**17\. 정적 페이지와 CMS의 역할 분담**

CMS가 모든 것을 처리할 필요는 없다.  
1차 구축에서는 다음처럼 역할을 나누는 것이 안정적이다. 이 원칙은 hanjunho.ai CMS 사전이 직접 제시한다.

**정적 페이지로 시작하는 것**

*   Home
*   문강 RIO 소개
*   3 Pillars 허브 프레임
*   네트워크 소개 허브
*   참여·회원 허브
*   검색 결과 프레임

**CMS 리스트로 채우는 것**

*   홈 대표 AnswerCards / Stories / Events / Videos
*   RIO 인덱스의 Story 리스트
*   정답카드 인덱스
*   행사/영상 리스트
*   네트워크의 Experts / Partners 리스트
*   데이터·자료 허브의 ResourceItems / Documents 리스트

즉, **CMS는 정본 콘텐츠를 관리하고, 상위 허브는 정적 페이지가 방향을 잡는 구조**가 1차 구축에 가장 안전하다.

**18\. 초기 입력 우선순위**

1차 입력은 아래 순서가 가장 좋다. hanjunho.ai도 초기 입력 우선순위를 따로 두고, 핵심 컬렉션부터 정리하도록 권장한다.

**1순위**

*   Experts
*   AnswerCards
*   Stories

이유: 신뢰 주체, 정본 카드, 기사형 해설이 먼저 있어야 홈과 문강 RIO가 의미를 가진다.

**2순위**

*   TopicSummaries
*   Events
*   MembershipPlans

이유: 아젠다 허브, 기록 허브, 전환 허브를 붙인다.

**3순위**

*   Videos
*   ArchiveDocuments
*   Partners

이유: 아카이브 밀도를 높인다.

**4순위**

*   NewsletterIssues
*   ResourceItems
*   DataNotes
*   ChangeLogs

이유: 운영 고도화 단계에서 보강한다.

**19\. 공개 전 필수 검수 항목**

공개 전 반드시 확인해야 하는 항목은 다음이다. 이 형식도 hanjunho.ai 운영 주의사항 구조를 따랐다.

*   AnswerCard의 Category와 Pillar가 맞는가
*   AnswerCard에 Reviewer와 Last Updated가 있는가
*   Story에 Based On Answers와 Why This Matters가 있는가
*   Event에 일정·요약·관련 자료가 있는가
*   Expert의 Role과 Short Summary가 충분히 설명적인가
*   MembershipPlan의 CTA URL이 정상인가
*   Public Status가 정확한가
*   Featured on Home 설정이 과도하지 않은가
*   Related links가 없어 dead-end가 생기지 않는가

**20\. 최종 요약**

이 CMS 사전의 핵심은 다음이다.

*   Experts는 신뢰 주체 컬렉션이다.
*   AnswerCards는 공식 정답 컬렉션이다.
*   Stories는 기사형 해설 컬렉션이다.
*   TopicSummaries는 상위 아젠다 허브 컬렉션이다.
*   Events / Videos / ArchiveDocuments는 기록 아카이브 컬렉션이다.
*   MembershipPlans / NewsletterIssues는 전환 컬렉션이다.

그리고 이 컬렉션들이 문화강국네트워크 AI홈페이지의 **홈, 문강 RIO, 정답카드, 3 Pillars, 행사·영상, 데이터·자료, 네트워크, 참여·회원** 구조를 떠받치는 데이터 뼈대가 된다.  
이 문서는 이후 **페이지별 구현 명세서, 카피 마스터, AEO·SEO·Schema 기술 명세서, QA/UAT 체크리스트**의 기준 문서로 사용한다. 이는 hanjunho.ai CMS 사전의 역할 정의와 같은 방식이다.