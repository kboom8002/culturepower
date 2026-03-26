**12\_AEO·SEO·Schema 기술 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지를 구축할 때, 검색엔진과 AI 답변엔진 관점에서 **어떤 메타 정보, 어떤 본문 상단 구조, 어떤 구조화데이터(schema), 어떤 내부 연결 규칙**을 적용해야 하는지 명확히 정하는 데 있다.  
이 문서는 단순 “SEO 체크리스트”가 아니다. 이 문서는 다음을 해결해야 한다.

*   홈과 허브 페이지는 어떤 title/meta를 가져야 하는가
*   정답카드 상세는 왜 질문-답 구조가 먼저 보여야 하는가
*   문강 RIO Story 상세는 왜 FAQ보다 Article 중심으로 가야 하는가
*   Event / Video / Network / Membership 페이지는 어떤 성격의 schema가 적절한가
*   breadcrumb와 URL, 화면의 위치 설명은 어떻게 일치시켜야 하는가
*   head 안에 무엇을 넣고, 무엇을 넣으면 안 되는가

hanjunho.ai AEO 문서도 정확히 이 문제를 해결하기 위한 기술 기준서로 정의되어 있습니다.

**2\. 이 문서에서 말하는 AEO의 의미**

이 문서에서 AEO는 “Answer Engine Optimization”의 실무적 의미로 사용한다.  
즉, 문화강국네트워크의 질문형 콘텐츠와 기록형 콘텐츠를 구조화해, 검색엔진과 AI 시스템이 페이지의 성격, 핵심 답변, 작성 주체, 검수 주체, 최신성, 페이지 간 관계를 더 잘 이해하게 만드는 작업이다. AIO-PR 가이드도 이를 **브랜드가 AI 답변과 인간 독자 모두에게 정확·근거·책임을 일관되게 제공하도록, 정답 중심 콘텐츠·데이터·거버넌스를 표준화한 운영 체계**로 설명합니다.

여기서 중요한 것은 과장된 기술 용어가 아니라, 실제로 검색엔진과 AI가 읽을 수 있는 신호를 정리하는 일이다. 그 신호는 다음 네 축으로 나뉜다.

1.  **본문 상단 구조 최적화**
2.  **title / meta / OG 정렬**
3.  **페이지 유형별 schema 분리**
4.  **내부 링크 구조와 작성·검수 주체 명시**

이는 hanjunho.ai AEO 문서의 핵심 축을 문화강국네트워크에 그대로 매핑한 것이다.

**3\. 문화강국네트워크 페이지 유형별 기술 분류**

문화강국네트워크 AI홈페이지의 페이지는 AEO/SEO 관점에서 아래 7가지 유형으로 구분한다.

**3-1. 홈 / 사이트 대표 허브**

예:

*   /

역할:

*   사이트 전체의 성격을 설명하는 집계 허브
*   문강 RIO, 정답카드, 행사, 참여의 상위 관문

이 페이지는 site-level description이 적절하다. hanjunho.ai도 홈과 집계 허브는 site-level/aggregation-level description이 맞다고 정리합니다.

**3-2. 허브 페이지**

예:

*   /webzine
*   /answers
*   /pillars
*   /events
*   /resources
*   /network
*   /join

역할:

*   특정 콘텐츠 묶음으로 들어가는 관문
*   범위와 탐색 질문을 요약하는 페이지

**3-3. 정답 정본 페이지**

예:

*   /answers/{slug}

역할:

*   질문 하나에 대한 공식 답을 압축적으로 제공
*   질문-답-근거-검수-업데이트를 직접 보여줌

이 페이지는 hanjunho.ai의 Answer Card 상세와 같은 위치다. 질문 하나에 답 하나를 가장 압축적으로 보여주는 구조이므로, FAQPage 조합이 유효하다.

**3-4. 기사형 해설 정본 페이지**

예:

*   /webzine/stories/{slug}

역할:

*   문강 RIO의 장문 해설, 인터뷰, 브리프, 리뷰
*   질문형 해설이지만 FAQ보다 Article 성격이 강함

문강 RIO의 실제 글은 질문으로 시작해 개념을 정리하고, 문화·기술·제도·정책 과제로 확장하는 구조이므로, Story 상세는 FAQ보다 Article 계열이 적합합니다.

**3-5. 주제 정본 허브 페이지**

예:

*   /pillars/topics/{slug}

역할:

*   상위 아젠다의 공식 정의와 대표 질문을 제공
*   TopicSummary 성격

**3-6. 기록형 정본 페이지**

예:

*   /events/{slug}
*   /videos/{slug}
*   /resources/documents/{slug}

역할:

*   행사, 영상, 자료를 “기록 객체”로 보여주는 정본 페이지
*   취지, 맥락, 연결, 신뢰를 함께 설명

**3-7. 프로필 / 조직 정본 페이지**

예:

*   /network/about
*   /experts/{slug}

역할:

*   단체 또는 인물의 역할, 공식성, 검수 권한, 연결된 콘텐츠를 설명

**4\. 전역 AEO/SEO 기본 원칙**

**4-1. 페이지마다 고유한 title과 description을 둔다**

동일하거나 유사한 meta description을 사이트 전체에 반복하지 않는다. 각 페이지의 성격과 범위를 정확히 설명하는 고유 description을 둔다. hanjunho.ai도 Answer Card의 Snippet, 기사형 해설의 Briefing Summary, 프로필의 Short Summary를 중심으로 description을 자동 생성하는 것이 적절하다고 정리합니다. 문화강국네트워크도 동일한 원칙을 따른다.

**4-2. meta keywords는 사용하지 않는다**

검색 랭킹에 실질적 기여가 없고 운영 비용만 높이므로 사용하지 않는다. hanjunho.ai 문서도 같은 결론을 명확히 제시합니다.

**4-3. <head>는 반드시 유효한 HTML로 유지한다**

<head> 안에는 title, meta, link, script, style, base, noscript, template 외 요소를 넣지 않는다. 특히 이미지, iframe, 일반 본문 요소를 넣지 않는다. hanjunho.ai는 head 안에 잘못된 요소가 먼저 오면 뒤 메타데이터 처리가 깨질 수 있다고 경고합니다.

**4-4. rich result를 KPI로 삼지 않는다**

특히 FAQPage는 “리치 결과를 보장하는 장치”가 아니다. Google은 FAQ rich result를 제한적으로 제공하므로, FAQPage는 **질문-답 구조를 더 명확히 알리는 보조 신호**로 사용한다. hanjunho.ai가 같은 원칙을 제시합니다.

**4-5. 본문 상단 구조가 메타보다 중요하다**

Google은 snippet이 주로 페이지 내용에서 자동 생성된다고 설명하며, meta description은 보조 수단일 뿐이라고 정리합니다. 따라서 문화강국네트워크의 모든 핵심 페이지는 **본문 상단에 질문·정답·요약·핵심 쟁점·역할 정의가 실제로 보여야** 한다. 이는 AI홈페이지의 Answer-first 원칙과도 일치한다.

**5\. 전역 메타 전략**

**5-1. Home**

권장 title:  
**문화강국네트워크 | 문화강국 담론의 공식 정답 본점**

권장 description:  
**문강 RIO의 질문형 해설, 문화강국·K-문명·지역문화·문화정책 정답카드, 행사·영상·자료, 회원 참여를 한곳에서 확인하세요.**

목적:

*   이 사이트가 일반 협회 사이트가 아니라 질문형 정답 허브임을 알린다.
*   구성안이 요구한 웹진·행사·회원·정보 구조를 한 문장에 압축한다.

**5-2. 허브 페이지**

허브는 범위를 잘 요약해야 한다.

예:

*   /webzine: **문강 RIO | 문화강국네트워크의 질문형 해설 웹진**
*   /answers: **정답카드 | 문화강국네트워크 공식 질문-답 허브**
*   /events: **행사·토론회·캠페인 | 문화강국네트워크 기록 아카이브**
*   /network: **네트워크 | 문화강국네트워크 소개와 협력 구조**

**5-3. AnswerCard 상세**

권장 title 패턴:  
{Name} | 문화강국네트워크 정답카드

권장 description 패턴:  
{Direct Answer}

이 구조가 좋은 이유는, hanjunho.ai와 마찬가지로 Direct Answer 또는 Snippet이 이미 질문에 대한 공식 요약이기 때문이다.

**5-4. Story 상세**

권장 title 패턴:  
{Story Title} | 문강 RIO

권장 description 패턴:  
{Deck}

Story는 기사형 해설 정본이므로, 제목과 2~3문장 요약이 핵심이다. hanjunho.ai도 기사형 해설 페이지는 브리핑 제목 + 요약 구조를 권장합니다.

**5-5. TopicSummary 상세**

권장 title 패턴:  
{Topic Name} | 문화강국네트워크 주제 허브

권장 description 패턴:  
{One-line Definition} {Summary 첫 문장}

**5-6. Event 상세**

권장 title 패턴:  
{Event Name} | 문화강국네트워크 행사 기록

권장 description 패턴:  
{Event Summary}

**5-7. Video 상세**

권장 title 패턴:  
{Video Title} | 문화강국네트워크 영상

권장 description 패턴:  
{Video Summary}

**5-8. Network / Expert 상세**

권장 title 패턴:  
{Name} | 문화강국네트워크 {Role}

권장 description 패턴:  
{Short Summary}

hanjunho.ai는 프로필 페이지 description이 반드시 “그 사람의 역할 중심”이어야 한다고 정리합니다. 문화강국네트워크도 인물/조직 소개는 역할 중심으로 작성한다.

**6\. Open Graph 운영 원칙**

OG는 Google 검색용 기술은 아니지만, 카카오톡·메신저·SNS 공유 품질을 위해 중요하다. hanjunho.ai도 카드 딥링크와 브리핑 딥링크 공유가 중요하므로 OG를 필수 운영 항목으로 둡니다. 문화강국네트워크도 문강 RIO 글, 정답카드, 토론회 페이지의 공유 품질이 중요하므로 같은 원칙을 따른다.

운영 원칙:

*   Home은 사이트 대표 이미지 1장을 쓴다.
*   AnswerCard는 카드별 대표 이미지가 있으면 쓰고, 없으면 공통 대표 이미지를 쓴다.
*   Story는 Story 대표 이미지가 있으면 쓰고, 없으면 문강 RIO 공통 이미지를 쓴다.
*   Event는 행사 포스터/현장 대표 이미지를 우선한다.
*   Video는 썸네일 또는 공통 영상 대표 이미지를 쓴다.
*   Network/Expert는 프로필 이미지를 우선한다.
*   title과 description은 검색용 title/meta와 같은 규칙을 따른다. 별도 OG 전용 문장을 새로 만들지 않는다.

**7\. breadcrumb 전략**

Google은 breadcrumb trail이 페이지의 사이트 계층상 위치를 보여주고, 검색 결과와 사용자 탐색 이해에 도움을 준다고 설명합니다. 따라서 문화강국네트워크의 상세 페이지에는 **화면상 breadcrumb와 structured data breadcrumb를 모두 넣는 것**이 좋다. hanjunho.ai도 동일하게 권장합니다.

운영 원칙:

*   breadcrumb 텍스트와 URL 구조, structured data 안의 name이 서로 일치해야 한다.
*   breadcrumb는 IA를 숨기지 않고 그대로 드러내야 한다.

권장 예시:

*   AnswerCard 상세:  
    홈 > 정답카드 > {Category} > {카드 제목}
*   Story 상세:  
    홈 > 문강 RIO > {Section} > {스토리 제목}
*   TopicSummary 상세:  
    홈 > 3 Pillars > {Pillar} > {Topic Name}
*   Event 상세:  
    홈 > 행사·영상 > {행사 구분} > {행사 제목}
*   Video 상세:  
    홈 > 행사·영상 > 영상 > {영상 제목}
*   Network 상세:  
    홈 > 네트워크 > {하위 구분} > {이름}

**8\. AnswerCard 상세의 schema 전략**

**8.1 권장 조합**

AnswerCard 상세에는 다음 조합을 권장한다.

**BreadcrumbList + WebPage + FAQPage**

핵심은 FAQ rich result가 아니라, **질문-답 구조의 명시**다. hanjunho.ai도 동일한 조합을 권장하며, FAQPage를 “질문과 답의 관계를 더 명확히 알려주는 구조화데이터”로 사용합니다.

**8.2 FAQPage를 쓸 때 지켜야 할 원칙**

*   Question.name은 반드시 화면의 Question과 같아야 한다.
*   Answer.text는 반드시 화면의 Direct Answer와 같아야 한다.
*   화면에 안 보이는 추가 문장을 schema에 몰래 넣지 않는다.
*   하나의 카드 페이지에 하나의 질문-답 페어만 넣는 것이 가장 안전하다.

**8.3 WebPage를 같이 쓰는 이유**

WebPage는 페이지 자체의 성격, URL, 설명, 수정일, 작성/검수 주체를 보완하는 역할을 한다. 특히 dateModified는 Last Updated와 연결해 최신성 신호를 강화할 수 있다. hanjunho.ai도 이 역할을 명확히 설명합니다.

**8.4 권장 JSON-LD 개념 예시**

*   BreadcrumbList
*   WebPage
*   FAQPage with one Question and one Answer
*   dateModified = Last Updated
*   about = related Topic or Organization
*   필요 시 reviewedBy에 해당하는 연결은 WebPage 보조 정보나 별도 graph에서 처리

**9\. Story 상세의 schema 전략**

**9.1 권장 조합**

Story 상세에는 다음 조합을 권장한다.

**BreadcrumbList + WebPage + Article**

이 페이지는 FAQ보다 **기사형 해설**에 가깝다. hanjunho.ai도 기사형 해설 상세에는 Article을 권장하고, NewsArticle보다 1차에서는 Article로 통일하는 것이 운영상 안전하다고 설명합니다.

**9.2 Article과 NewsArticle 중 무엇을 쓸 것인가**

실무적으로는 1차에서 전부 Article로 통일하는 것이 좋다.  
이유는 문강 RIO의 Story가 순수 속보형 뉴스가 아니라, 질문형 장문 해설·인터뷰·리뷰·브리프이기 때문이다. 실제 K-문명 글도 뉴스가 아니라 개념적 해설에 가깝다.

뉴스 속보성 공지 몇 개만 예외로 NewsArticle을 검토할 수 있지만, 초기에는 Article 하나로 고정하는 편이 안전하다.

**9.3 author / reviewer 원칙**

hanjunho.ai는 Article markup의 author는 Person 또는 Organization으로 두고, author.name에는 이름만 넣고 소개 문구를 섞지 말라고 정리합니다. 문화강국네트워크도 Story의 author는 필자 또는 편집 조직, reviewedBy에 해당하는 정보는 화면과 KG/graph에서 별도로 드러내는 편이 적절하다.

**9.4 datePublished / dateModified 원칙**

*   datePublished = Story 자체 게시일
*   dateModified = 최근 수정일
*   외부 기사나 행사 원문의 날짜가 있더라도, Story는 Story 자체 게시/수정일을 쓴다.

**9.5 본문 상단 계약**

Article markup이 붙는다고 끝나는 것이 아니다. 첫 화면에는 반드시 다음이 보여야 한다.

*   Title
*   Deck
*   Author / Reviewer / Last Updated
*   Why This Matters
*   Based On Answers

Google이 snippet의 1차 출처를 본문으로 본다는 점을 고려하면, 이 상단 구조가 실제 AEO의 핵심이다.

**10\. TopicSummary 상세의 schema 전략**

TopicSummary 상세에는 다음 조합을 권장한다.

**BreadcrumbList + WebPage**

1차에서는 별도의 복잡한 유형보다 WebPage 중심으로 가고, 본문 상단에

*   Topic Name
*   One-line Definition
*   Primary Questions
*   Representative Answers / Stories  
    를 강하게 노출하는 것이 좋다.

이유는 TopicSummary가 FAQ도 아니고 순수 Article도 아니며, 상위 허브형 정본이기 때문이다. 1차에서는 과도한 schema 다양화보다 화면 구조를 더 명확히 하는 편이 안전하다. hanjunho.ai도 허브 페이지는 aggregation-level description과 site/page-level 설명을 명확히 하라고 권장합니다.

**11\. Event 상세의 schema 전략**

**11.1 권장 조합**

Event 상세에는 다음 조합을 권장한다.

**BreadcrumbList + WebPage + Event**

이 페이지는 일정 공지보다 행사 기록 정본 페이지이지만, Event라는 성격은 명확하므로 Event structured data를 쓰는 것이 적절하다.

**11.2 필수 매핑**

*   name = Event Name
*   startDate = Event Date Start
*   endDate = Event Date End (있을 때)
*   location = 장소
*   eventStatus = 상태값 매핑
*   description = Event Summary
*   가능하면 organizer, performer 또는 관련 주체 연결

**11.3 상단 본문 계약**

schema와 별개로 첫 화면에

*   Event Type
*   Event Name
*   Event Summary
*   Date / Location
*   상태
*   관련 정답 또는 관련 Topic  
    가 반드시 보여야 한다.

**12\. Video 상세의 schema 전략**

**12.1 권장 조합**

Video 상세에는 다음 조합을 권장한다.

**BreadcrumbList + WebPage + VideoObject**

**12.2 필수 매핑**

*   name = Video Title
*   description = Video Summary
*   thumbnailUrl = Thumbnail
*   uploadDate 또는 게시일
*   embedUrl 또는 content URL
*   필요 시 actor/creator/about 보조 연결

**12.3 본문 상단 계약**

*   영상 요약
*   출연자
*   관련 행사
*   관련 Story / AnswerCard

영상은 플레이어만 보여주면 AEO가 약하다. 본문 상단에 맥락과 연결 구조가 있어야 한다.

**13\. Network / Expert 상세의 schema 전략**

**13.1 조직 허브**

조직 중심 페이지는 다음 조합을 권장한다.

**BreadcrumbList + WebPage + Organization**

이 페이지는 단체의 역할, 비전, 협력기관, 연혁을 보여주는 공식 발화 주체 허브다.

**13.2 인물 / 전문가 상세**

개별 인물 페이지가 있을 경우 다음 조합을 권장한다.

**BreadcrumbList + ProfilePage + Person**

hanjunho.ai도 프로필 정본 페이지에는 ProfilePage + Person 조합이 적절하다고 정리합니다. 문화강국네트워크의 편집장, 이사장, 검토자, 주요 연사 프로필도 같은 원리를 적용할 수 있다.

**13.3 본문 상단 계약**

*   이름
*   역할
*   한 줄 요약
*   이 사이트에서 왜 중요한 사람인지
*   연결된 Story / Event / AnswerCard

**14\. Join / Membership 페이지의 schema 전략**

Join / Membership 페이지는 1차에서 다음 조합을 권장한다.

**BreadcrumbList + WebPage**

이 페이지는 전환 허브지만, 전자상거래 상품 페이지가 아니므로 과도한 schema보다

*   참여 방식
*   혜택
*   절차
*   CTA  
    를 본문에서 명확히 보여주는 것이 더 중요하다.

Media 패밀리에서 제품/서비스는 질문의 실행 답이며, Media에서는 구독/행사/협업으로 번역된다고 정리되어 있으므로, 이 페이지는 **행동 구조가 잘 보이는 WebPage**로 설계하는 것이 1차 운영에 적합하다.

**15\. 전역 OG, canonical, indexing 운영 원칙**

**15.1 OG**

*   검색용 title/meta와 같은 규칙을 재사용한다.
*   별도 OG 전용 문장을 새로 만들지 않는다.
*   이미지 우선순위:
    *   Home: 사이트 대표 이미지
    *   AnswerCard: 카드 대표 이미지 또는 공통 대표
    *   Story: 글 대표 이미지 또는 문강 RIO 공통
    *   Event: 포스터/행사 대표
    *   Video: 썸네일
    *   Expert/Network: 대표 이미지

이 원칙은 hanjunho.ai OG 운영 원칙을 그대로 계승한 것이다.

**15.2 canonical**

*   모든 정본 상세는 자기 자신 canonical
*   필터/정렬/검색 파라미터가 붙은 URL은 canonical을 원문 상세 또는 원 인덱스로 정리
*   중복 카드/중복 Story를 만들지 않는다

**15.3 noindex**

초기에는 아래를 noindex 후보로 본다.

*   내부 검색 결과
*   필터 조합 결과
*   테스트용 프리뷰
*   빈 허브
*   임시 아카이브 landing

**16\. Webflow / 구현 운영 주의사항**

hanjunho.ai 문서가 Webflow collection template, page settings, custom code 영역의 혼선을 막는 것을 중요한 목적으로 두고 있으므로, 문화강국네트워크도 다음을 기본 원칙으로 둔다.

*   head custom code는 페이지 유형별로 통제한다.
*   collection template마다 schema 조합을 고정한다.
*   CMS 필드와 JSON-LD 필드명이 정확히 매핑되도록 한다.
*   breadcrumb 화면 텍스트와 JSON-LD name을 일치시킨다.
*   화면에 없는 내용을 schema에 넣지 않는다.
*   Last Updated와 dateModified가 항상 일치하게 운영한다.

**17\. 페이지 유형별 권장 title / schema 요약표**

**Home**

*   Title: 사이트 수준
*   Description: 사이트 범위 요약
*   Schema: WebPage 중심
*   역할: aggregation hub

**허브 페이지**

*   Title: 허브 범위 요약
*   Description: 주제/콘텐츠 묶음 설명
*   Schema: WebPage
*   역할: navigation hub

**AnswerCard 상세**

*   Title: {Name} | 문화강국네트워크 정답카드
*   Description: Direct Answer
*   Schema: BreadcrumbList + WebPage + FAQPage
*   역할: 질문-답 정본

**Story 상세**

*   Title: {Title} | 문강 RIO
*   Description: Deck
*   Schema: BreadcrumbList + WebPage + Article
*   역할: 기사형 해설 정본

**TopicSummary 상세**

*   Title: {Topic Name} | 문화강국네트워크 주제 허브
*   Description: One-line Definition + Summary
*   Schema: BreadcrumbList + WebPage
*   역할: 상위 허브

**Event 상세**

*   Title: {Event Name} | 문화강국네트워크 행사 기록
*   Description: Event Summary
*   Schema: BreadcrumbList + WebPage + Event
*   역할: 기록 정본

**Video 상세**

*   Title: {Video Title} | 문화강국네트워크 영상
*   Description: Video Summary
*   Schema: BreadcrumbList + WebPage + VideoObject
*   역할: 시청/해설 정본

**Expert 상세**

*   Title: {Name} | 문화강국네트워크 {Role}
*   Description: Short Summary
*   Schema: BreadcrumbList + ProfilePage + Person
*   역할: 신뢰 주체 정본

**18\. 최종 결론**

이 기술 명세서의 핵심은 단순합니다.  
문화강국네트워크 AI홈페이지의 AEO/SEO/Schema 전략은 메타 태그를 많이 넣는 것이 아니라, **페이지 유형을 정확히 분리하고, 본문 상단에 질문·정답·요약·맥락·작성/검수 주체·최신성을 실제로 노출하고, 그 페이지 성격에 맞는 최소한의 schema를 안정적으로 적용하는 것**입니다. 구성안이 웹진, 행사, 자료, 단체, 회원가입을 함께 요구하고, B-SSoT가 Answer-first와 Trust Layer를 공통 원칙으로 두며, hanjunho.ai가 Answer Card 상세는 FAQPage, 기사형 해설은 Article, 프로필은 ProfilePage, breadcrumb는 화면과 구조화데이터 일치 원칙을 강조한다는 점을 종합하면, 문화강국네트워크는 **Home/Hub, AnswerCard, Story, TopicSummary, Event, Video, Network/Expert, Join**을 명확히 분리해 운영하는 것이 최적입니다.