**10\_Event·Video·Archive 데이터 계약서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지에서 **행사(Event)**, **영상(Video)**, **자료/기록(ArchiveDocument)** 을 단순 게시물이 아니라 **운영 가능한 정본 객체**로 정의하는 데 있다.  
즉, “행사 공지”, “유튜브 링크”, “PDF 첨부” 수준이 아니라, 문화강국네트워크의 토론회·캠페인·문화행사·명사 영상·발제문·사진 기록을 **질문-정답-해설-기록-참여** 구조 안으로 편입시키는 계약서다. 구성안이 토론회 개요와 발제문 아카이빙, 문화행사 사진 위주 안내를 별도 요구하고 있으므로, 이 문서는 선택이 아니라 핵심이다.

이 문서가 해결해야 하는 것은 다음이다.

*   어떤 것을 Event로 보고, 어떤 것을 Video로 보고, 어떤 것을 ArchiveDocument로 보는가
*   각 객체의 필수 필드는 무엇인가
*   행사와 영상, 자료가 서로 어떻게 연결되는가
*   Story와 AnswerCard는 행사/영상/자료와 어떻게 결속되는가
*   어떤 상태값과 공개 규칙을 가져야 하는가
*   기록 자산이 “흩어진 게시물”이 아니라 “누적 아카이브”가 되려면 무엇이 필요한가

**2\. 최상위 원칙**

**2-1. Event·Video·Archive는 “기록층”이다**

문화강국네트워크의 행사와 영상, 발제문, 사진은 홍보용 소모 자산이 아니라 **단체의 활동이 실제로 존재했다는 증거이자, 담론이 어떻게 공론장에 배치되었는지 보여주는 기록층**이다.  
구성안이 주요 연혁 안에 토론회와 문화행사 기록을 별도로 넣고, 발제문 아카이빙까지 요구하는 이유가 바로 여기에 있다.

**2-2. Event는 공지 객체가 아니라 정본 객체다**

Event는 “일정 게시글”이 아니라 **행사의 취지, 프로그램, 연사, 결과물, 관련 자료, 후속 해설**을 모으는 정본 객체여야 한다.  
hanjunho.ai의 기사형 해설과 기록 페이지 설계도 상세 페이지를 정본으로 보고, 상단에서 무엇을 위한 페이지인지 바로 보이게 하라고 규정합니다. Event도 같은 수준의 정본이어야 합니다.

**2-3. Video는 단순 embed가 아니라 의미 연결 객체다**

Video는 플레이어만 박아두는 페이지가 아니라,

*   이 영상이 무엇인지
*   어떤 행사/인물/쟁점과 연결되는지
*   어떤 정답/Story/자료로 이어지는지  
    를 설명하는 객체여야 한다.  
    그래야 No dead-end 원칙이 유지된다.

**2-4. Archive는 파일 보관함이 아니라 evidence layer다**

ArchiveDocument는 단순 첨부파일 목록이 아니라, Evidence와 Trust Layer의 일부다.  
B-SSoT 공통 구조에서 Evidence, Reviewer, Update, ChangeLog가 trust layer 핵심이므로, 발제문·자료집·보도자료·사진 기록도 이 층위에 포함된다.

**2-5. 모든 기록 객체는 그래프로 연결되어야 한다**

*   Event ↔ Story
*   Event ↔ Video
*   Event ↔ ArchiveDocument
*   Event ↔ Expert
*   Event ↔ AnswerCard
*   Video ↔ Story
*   Archive ↔ TopicSummary  
    구조를 기본값으로 둔다.  
    사용자의 공통 원칙이 “Graph, not tree”와 “어떤 페이지에서도 다음 행동이 있어야 한다”고 명시하므로, 기록 객체도 반드시 연결 구조를 가져야 한다.

**3\. 객체 정의**

**3-1. Event**

Event는 토론회, 포럼, 대담, 문화행사, 캠페인, 특별 세션 등 **시간과 장소, 취지와 프로그램, 참여자와 결과물을 가지는 공식 기록 객체**다.  
문화강국네트워크에서는 특히 “토론회 개요 및 발제문 아카이빙”, “문화행사 사진 위주의 개요 안내” 요구와 직접 연결된다.

**3-2. Video**

Video는 행사 다시보기, 명사 인터뷰, 하이라이트 클립, 대담 영상 등 **재생 가능한 시청 객체**다.  
하지만 이 객체는 항상 Event, Story, Expert, AnswerCard와 의미 연결을 가진다.

**3-3. ArchiveDocument**

ArchiveDocument는 발제문, 자료집, 보도자료, 행사 요약 PDF, 사진 묶음, 외부 원문 링크 등 **문서형 증거 객체**다.  
이 객체는 Event의 결과물이면서, Story와 AnswerCard의 근거 자산이기도 하다.

**4\. Event 콘텐츠 계약**

**4-1. Event의 역할**

Event는 다음 네 역할을 동시에 가진다.

1.  **기록 역할**
    *   언제, 어디서, 왜, 누가 참여했는가를 남긴다.
2.  **맥락 역할**
    *   이 행사가 어떤 질문과 아젠다 위에서 열렸는지 보여준다.
3.  **근거 역할**
    *   발제문, 자료집, 영상, 사진, 후속 글을 연결한다.
4.  **전환 역할**
    *   다가오는 행사 신청, 뉴스레터, 회원가입, 관련 해설로 이어진다.

**4-2. 필수 필드**

*   Event Name
*   Event Type
*   Event Summary
*   Event Date Start
*   Location 또는 Venue
*   Event Status
*   Primary TopicSummary 또는 Related AnswerCard
*   Related Stories 최소 1개 권장
*   Last Updated
*   CTA

**4-3. 권장 필드**

*   Event Date End
*   Program
*   Hosts / Organizers
*   Speakers
*   Archive Documents
*   Related Videos
*   Photo Gallery
*   Registration Link
*   Boundary Note
*   ChangeLog Reference

**4-4. 상단 구조 계약**

Event 상세의 첫 화면에는 반드시 아래가 보여야 한다.

1.  Event Type
2.  Event Name
3.  Event Summary
4.  Date / Location
5.  Event Status
6.  핵심 관련 Topic 또는 AnswerCard 1개 이상

이는 hanjunho.ai의 상세 페이지 원칙인 “첫 화면에서 이 페이지가 무엇을 위한 페이지인지, 누가 말하는지, 무슨 행동을 할 수 있는지 보여야 한다”를 Event에 적용한 것이다.

**4-5. 본문 구조 계약**

권장 순서는 아래다.

*   행사 개요
*   왜 이 행사가 중요한가
*   프로그램 / 핵심 순서
*   연사 / 참여자
*   발제문·자료집
*   사진·영상
*   관련 Story / AnswerCard
*   다음 행동 CTA

**4-6. 공개 금지 조건**

아래 중 하나라도 없으면 Public 금지로 본다.

*   Event Name 없음
*   Event Summary 없음
*   Event Date Start 없음
*   Event Status 없음
*   관련 Topic/AnswerCard 없음
*   CTA 없음

**4-7. Event Status 규칙**

권장 값:

*   Upcoming
*   Open
*   Closed
*   Archived

운영 규칙:

*   예정 상태에서는 신청 CTA 우선
*   종료 직후에는 Closed
*   자료·영상·사진 반영 후 Archived 또는 Public + Archived 성격으로 전환

**5\. Video 콘텐츠 계약**

**5-1. Video의 역할**

Video는 다음 세 역할을 가진다.

1.  **시청 역할**
    *   실제 영상 콘텐츠를 본다.
2.  **해설 역할**
    *   영상의 의미와 맥락을 설명한다.
3.  **연결 역할**
    *   관련 행사, Story, AnswerCard, Expert로 이동시킨다.

**5-2. 필수 필드**

*   Video Title
*   Video Summary
*   Embed URL 또는 Platform URL
*   Video Type
*   Last Updated
*   CTA

**5-3. 권장 필드**

*   Primary Event
*   Speakers
*   Related Stories
*   Related AnswerCards
*   Transcript
*   Highlight Notes
*   Thumbnail
*   Duration

**5-4. 상단 구조 계약**

Video 상세 첫 화면에는 반드시 아래가 보여야 한다.

1.  Video Type
2.  Video Title
3.  Video Summary
4.  연관 Event 또는 Speaker
5.  재생 가능 상태
6.  관련 Story/AnswerCard 최소 1개 권장

**5-5. 본문 구조 계약**

권장 순서는 아래다.

*   영상 요약
*   출연자 / 연관 행사
*   영상 임베드
*   핵심 하이라이트
*   관련 Story / AnswerCard / ArchiveDocument
*   다음 행동 CTA

**5-6. 공개 금지 조건**

*   Embed URL 없음
*   Video Summary 없음
*   Last Updated 없음
*   CTA 없음

**5-7. 운영 원칙**

*   행사 영상은 가능하면 Primary Event와 연결한다.
*   인터뷰 영상은 Speakers 필수 권장
*   하이라이트 클립은 원본 행사 또는 원문 Story와의 연결 필수 권장

**6\. ArchiveDocument 콘텐츠 계약**

**6-1. ArchiveDocument의 역할**

ArchiveDocument는 다음 세 역할을 가진다.

1.  **증거 역할**
    *   실제 발제문·자료집·보도자료·사진 기록을 제공한다.
2.  **보존 역할**
    *   일회성 콘텐츠를 누적형 자산으로 남긴다.
3.  **연결 역할**
    *   Event / Story / TopicSummary / AnswerCard의 근거 레이어가 된다.

**6-2. 필수 필드**

*   Document Title
*   Document Type
*   File Upload 또는 External URL
*   Primary Event 또는 Primary Story 또는 Primary Topic
*   Last Updated

**6-3. 권장 필드**

*   Document Summary
*   Authors
*   Publication Date
*   Related AnswerCards
*   Related Stories
*   Photo Description
*   Copyright / Usage Note

**6-4. 상단 구조 계약**

ArchiveDocument 상세 또는 리스트 카드에는 최소 아래가 보여야 한다.

1.  Document Type
2.  Document Title
3.  1문장 Summary
4.  연결된 Event 또는 Story
5.  공개 가능 여부 / 다운로드 또는 외부 링크

**6-5. 공개 금지 조건**

*   File 또는 URL 없음
*   Title 없음
*   연결 객체 없음
*   Last Updated 없음

**6-6. 문서 유형 표준**

권장 값:

*   발제문
*   자료집
*   보도자료
*   행사기록
*   사진집
*   외부원문
*   정리노트

구성안이 “토론회 발제문 아카이빙”, “문화행사 사진 위주 개요 안내”를 분명히 요구하므로, 특히 발제문과 사진집/행사기록 유형은 1차부터 명확히 분리하는 것이 좋다.

**7\. 세 객체의 관계 계약**

**7-1. 기본 관계**

*   Event는 여러 ArchiveDocuments와 여러 Videos를 가질 수 있다.
*   Video는 하나 이상의 Event 또는 Story와 연결될 수 있다.
*   ArchiveDocument는 하나 이상의 Event, Story, TopicSummary와 연결될 수 있다.
*   Event는 하나 이상의 Story와 연결될 수 있다.
*   Event와 Video는 관련 Experts를 참조할 수 있다.
*   Event는 최소 1개 이상의 AnswerCard 또는 TopicSummary와 연결되는 것을 권장한다.

**7-2. 금지 관계**

*   Event가 어떤 질문 구조와도 연결되지 않은 상태
*   Video가 어떤 Event/Story와도 연결되지 않은 상태
*   ArchiveDocument가 어떤 Event/Story/Topic과도 연결되지 않은 상태

**7-3. 연결 우선순위**

1.  Event ↔ TopicSummary / AnswerCard
2.  Event ↔ Story
3.  Event ↔ ArchiveDocument
4.  Event ↔ Video
5.  Event/Video/Archive ↔ Membership CTA

이 우선순위는 “기록 객체도 결국 질문 자산과 정본 구조 안에 있어야 한다”는 뜻이다. B-SSoT가 단순 사이트가 아니라 운영형 정답 인프라라고 정의한 이유와도 일치한다.

**8\. 신뢰 계약**

Event, Video, ArchiveDocument는 모두 아래 trust layer를 가진다.

*   Last Updated
*   Author or Owner
*   Reviewer 또는 Editorial Owner
*   Evidence / Source
*   Boundary / Copyright
*   ChangeLog Reference

**Event**

*   행사 기록 담당자 또는 편집 책임자 표기 권장
*   일정 변경, 자료 추가, 영상 공개 시 Update 기록 남김

**Video**

*   원출처 표기 필수
*   발언 편집/요약이 있으면 boundary note 권장

**ArchiveDocument**

*   저자/출처/행사 맥락 표기 권장
*   다운로드 또는 열람 정책 표기 권장

이는 Media 패밀리의 신뢰 방식이 편집권·취재·전문성·출처 체인에 있다는 공통 원칙과 정확히 맞는다.

**9\. 상단 요약·메타 계약**

hanjunho.ai AEO 문서는 “상단 본문 구조가 메타보다 중요하다”고 정리하고, 카드 상세에는 Snippet, 기사형 해설에는 Summary가 메타 설명의 핵심이 된다고 설명합니다.  
문화강국네트워크의 Event·Video·Archive도 같은 원칙을 따른다.

**Event**

*   메타 설명은 Event Summary 재사용
*   상단 Summary는 일정/취지/핵심 의미가 모두 들어가야 함

**Video**

*   메타 설명은 Video Summary 재사용
*   상단 Summary는 시청 이유와 맥락을 설명해야 함

**ArchiveDocument**

*   메타 설명은 Document Summary 재사용
*   최소 한 문장으로 무엇 문서인지 보여야 함

**10\. 콘텐츠 lint 규칙**

**Event lint**

*   Event Name 없음
*   Event Summary 없음
*   Event Date Start 없음
*   Event Status 없음
*   Topic/Answer 연결 없음
*   CTA 없음
*   Last Updated 없음

**Video lint**

*   Title 없음
*   Summary 없음
*   Embed URL 없음
*   Last Updated 없음
*   CTA 없음

**ArchiveDocument lint**

*   Title 없음
*   Type 없음
*   File/URL 없음
*   연결 객체 없음
*   Last Updated 없음

**연결 lint**

*   Event에 Story/Archive/Video/Expert 연결이 전혀 없음
*   Video가 Event/Story 없이 고립
*   Archive가 어느 기록 체계에도 연결되지 않음

이 lint 규칙은 “게시물은 있지만 구조는 없는” 상태를 막기 위한 최소 보호장치다.

**11\. 예시 적용**

**11-1. Event 예시**

행사명: **제1회 문화강국네트워크 국회 토론회**  
요약: 문화강국 담론과 정책 과제를 공론장에 올리는 토론회  
필수 연결:

*   관련 TopicSummary: 문화강국
*   관련 AnswerCard: 문화강국이란 무엇인가
*   관련 ArchiveDocument: 발제문 PDF
*   관련 Story: 토론회 리뷰 또는 정책 해설
*   관련 CTA: 다음 행사 알림 / 뉴스레터 구독

구성안이 바로 “토론회 개요 및 발제문 아카이빙”을 요구하므로, 이런 Event 객체가 기본 단위가 된다.

**11-2. Video 예시**

영상명: **K-문명 대담 하이라이트**  
요약: K-문명 개념과 한국의 가능성에 대한 대담  
필수 연결:

*   관련 Story: 「K-문명의 가능성」
*   관련 AnswerCard: K-문명이란 무엇인가
*   관련 Speaker: 김재준
*   관련 Event: 해당 토론회 또는 인터뷰 세션

실제 원고가 질문에서 출발해 개념 정의와 제도·기술·문화의 통합 가능성을 설명하므로, 영상도 단순 시청 객체가 아니라 이 개념망 안에 위치해야 한다.

**11-3. ArchiveDocument 예시**

문서명: **토론회 발제문 – K-문명의 가능성**  
유형: 발제문  
필수 연결:

*   Primary Event
*   Primary Story
*   Primary TopicSummary
*   Related AnswerCard

**12\. 최종 결론**

이 데이터 계약서의 핵심은 단순합니다.  
문화강국네트워크 AI홈페이지에서 Event, Video, ArchiveDocument는 각각 **행사 기록 객체**, **시청-해설 객체**, **증거-보존 객체**로 운영되어야 하며, 이 셋은 언제나 AnswerCard, Story, TopicSummary, Expert, Membership CTA와 그래프로 연결되어야 합니다. 홈페이지 구성안이 토론회 개요, 발제문 아카이빙, 문화행사 사진 위주 기록을 명시하고 있고, B-SSoT가 최소 정답 단위를 질문+정답+근거+책임+행동으로 정의하며, hanjunho.ai가 기록형 페이지도 정본 역할과 상단 핵심 정보 구조를 가져야 한다고 강조한다는 점을 종합하면, 문화강국네트워크의 행사·영상·자료는 “게시물”이 아니라 **공식 담론과 활동을 증명하는 기록 인프라**로 설계하는 것이 최적입니다.