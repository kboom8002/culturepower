**14\_Answer Feed·Sitemaps·Indexing 운영 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지에서 생성되는 핵심 정본 객체를 **AI와 검색엔진이 일관되게 발견·이해·재방문**할 수 있도록, Answer Feed, Sitemaps, Indexing 운영 규칙을 하나의 배포 계약으로 고정하는 데 있다.

이 문서는 다음을 해결해야 한다.

*   어떤 객체를 Answer Feed에 넣을 것인가
*   어떤 객체는 sitemap으로만 발견시키고, 어떤 객체는 feed까지 제공할 것인가
*   feed 포맷은 어떻게 고정할 것인가
*   answers 전용 sitemap, stories 전용 sitemap, events 전용 sitemap을 어떻게 나눌 것인가
*   lastmod, dateModified, updated\_at을 어떻게 일치시킬 것인가
*   색인 요청과 재배포는 어떤 주기로 운영할 것인가

AIO-PR 가이드가 Feed와 Sitemaps를 정답 운영 인프라의 핵심 레이어로 두는 이유도 바로 이것입니다.

**2\. 최상위 원칙**

**2.1 Feed는 “무엇을 가장 먼저 읽어야 하는가”를 정하는 레이어다**

문화강국네트워크의 모든 페이지를 동일한 무게로 배포하지 않는다.  
AI와 검색엔진이 가장 먼저 읽어야 하는 것은 **정답카드(AnswerCard)** 와 **주제 정본(TopicSummary)** 이다. Story, Event, Video, ArchiveDocument는 중요하지만, 1차 우선순위는 어디까지나 “질문에 대한 공식 답”이다. 이는 AIO-PR가 Answer Card를 정답 단위의 중심으로 두고, Feed를 AC와 직접 연결하는 이유와 일치한다.

**2.2 Sitemap은 “무엇을 발견하게 할 것인가”를 정하는 레이어다**

Feed가 AI용 정답 배포 레이어라면, sitemap은 검색엔진/크롤러용 발견 레이어다.  
문화강국네트워크처럼 문강 RIO, 행사, 영상, 자료, 단체 소개가 함께 있는 사이트에서는 모든 객체를 한 장의 sitemap에 섞기보다 **객체군별로 분리된 sitemap 세트**를 운영하는 편이 훨씬 낫다. AIO-PR 런칭 체크리스트도 answers 전용 sitemap을 명시적으로 요구합니다.

**2.3 색인 운영의 핵심은 “잦은 핑”이 아니라 “정본 우선 재배포”다**

중요한 것은 무작정 자주 색인 요청을 보내는 것이 아니라,

*   새 AnswerCard 발행
*   핵심 TopicSummary 수정
*   Story 대폭 개정
*   Event 종료 후 자료·영상 추가  
    같은 **정본 수준 변화**가 있을 때 우선순위를 두고 재배포하는 것이다.

**2.4 updated\_at, dateModified, lastmod는 하나의 사실이어야 한다**

Feed의 updated\_at, 페이지 JSON-LD의 dateModified, sitemap의 lastmod가 서로 다르면 운영 신뢰가 무너진다. AIO-PR 부록은 이를 린트 규칙으로까지 고정하며, sitemap lastmod==dateModified, Feed ETag를 명시합니다.

**2.5 Story와 Event는 Feed보다 “정답과 연결된 발견 구조”로 우선 배포한다**

문강 RIO Story와 행사 기록은 중요하지만, 1차에서 모든 Story/Event를 Answer Feed에 섞기보다는

*   Answer Feed는 정답 중심
*   Stories / Events는 별도 sitemap과 페이지 schema로 발견  
    시키는 편이 더 안정적이다. AIO-PR도 웹에서는 SSoT 원문을 우선하고, 뉴스/블로그는 NewsArticle/BlogPosting + isBasedOn(SSoT) 방식으로 두는 것을 권장합니다.

**3\. 배포 레이어의 전체 구조**

문화강국네트워크의 배포 구조는 아래 4층으로 고정한다.

**3.1 1층: HTML 정본 페이지**

*   /answers/{slug}
*   /pillars/topics/{slug}
*   /webzine/stories/{slug}
*   /events/{slug}
*   /videos/{slug}
*   /network/...

인간 독자와 검색엔진이 읽는 기본 페이지다.

**3.2 2층: JSON-LD / Brand KG**

각 상세 페이지 안에 page-type별 schema와 KG 연결 신호를 넣는다.  
이는 앞선 12\_AEO·SEO·Schema와 13\_Brand KG 문서에서 이미 잠근 부분이다.

**3.3 3층: Answer Feed**

정답 중심의 기계 가독 배포 레이어다.  
우선 대상은 AnswerCard이고, 이후 TopicSummary 확장을 고려한다.

**3.4 4층: Sitemaps / Indexing**

크롤러 발견과 재방문 주기를 제어하는 레이어다.

AIO-PR의 전체 아키텍처가 바로 **SSoT Structuring → Markup & Feeds → Observatory → Fix-It** 구조로 설명됩니다. 문화강국네트워크도 이 플라이휠을 그대로 가져가는 것이 맞습니다.

**4\. Answer Feed 정의**

**4.1 Answer Feed의 역할**

문화강국네트워크의 Answer Feed는 **정답카드 중심의 기계 가독 배포 파일**이다.  
목적은 AI와 검색 시스템이 “이 사이트에서 가장 우선적으로 소비해야 할 공식 정답 객체”를 일관된 규격으로 읽게 만드는 것이다.

**4.2 1차 범위**

1차 런칭에서는 아래만 Feed에 넣는 것을 권장한다.

*   AnswerCard 전부
*   TopicSummary는 2차 확장 고려
*   Story, Event, Video, ArchiveDocument는 feed 대상 아님, sitemap 대상으로만 운영

이렇게 나누는 이유는 단순하다. 문화강국네트워크는 Media 사이트이지만, AI홈페이지/B-SSoT 관점에서는 먼저 **질문-답 구조**가 가장 강해야 한다. Answer Feed에 Story까지 한꺼번에 넣기 시작하면 정답 계층과 기사형 해설 계층의 구분이 흐려질 수 있다. B-SSoT 원칙도 질문 허브 중심 구조를 먼저 요구합니다.

**4.3 경로**

권장 경로:

*   /ai/answers.ndjson

2차 확장 경로 예시:

*   /ai/topics.ndjson
*   /ai/stories.ndjson  
    단, 1차에서는 만들지 않는다.

AIO-PR 부록이 Answer Feed NDJSON 예시를 직접 제시하므로, 1차는 NDJSON 한 파일로 가는 것이 가장 실무적입니다.

**5\. Answer Feed 포맷 규격**

**5.1 권장 포맷**

**NDJSON(Newline Delimited JSON)** 를 기본값으로 한다.  
이유는 다음과 같다.

*   스트리밍/증분 처리에 유리
*   객체 단위 append/update가 쉽다
*   AnswerCard 수가 늘어나도 운영이 단순함
*   AIO-PR 부록이 같은 형태를 예시로 제시함

**5.2 필수 필드**

각 line의 최소 필드는 아래와 같다.

*   answer\_id
*   canonical\_url
*   jsonld\_url 또는 page\_url
*   updated\_at
*   question
*   direct\_answer
*   topic\_ids
*   reviewed\_by
*   citations
*   anchors
*   status
*   confidence
*   cta\_url

**5.3 권장 필드**

*   organization\_id
*   pillar
*   category
*   applicable\_location
*   language
*   change\_log\_url
*   related\_story\_urls
*   related\_event\_urls

**5.4 예시**

{"answer\_id":"ANS-KCIV-001","page\_url":"https://example.org/answers/k-civilisation","updated\_at":"2026-03-26T10:00:00Z","question":"K-문명이란 무엇인가","direct\_answer":"K-문명은 한국의 위대함을 선언하는 구호가 아니라, 감정·기술·제도의 통합이 지속 가능한 질서로 발전할 수 있는지를 묻는 분석 개념이다.","topic\_ids":\["topic:k-civilisation"\],"reviewed\_by":\["person:editor-01"\],"citations":\["doc:k-civilisation-essay","event:forum-001"\],"anchors":\["topic:k-civilisation","topic:culture-power"\],"status":"public","confidence":"medium","cta\_url":"https://example.org/join/newsletter"}

이 예시는 AIO-PR 부록의 feed 예시 형식을 문화강국네트워크용으로 매핑한 것이다. AIO-PR 예시도 answer\_id, jsonld\_url, updated\_at, citations, anchors, confidence를 포함합니다.

**6\. Feed 운영 규칙**

**6.1 포함 기준**

아래를 모두 만족해야 feed에 포함한다.

*   Public Status = Public
*   Reviewer 존재
*   Last Updated 존재
*   Direct Answer 존재
*   최소 1개 이상의 citation/evidence 존재
*   canonical URL 존재
*   CTA 유효

이는 B-SSoT 최소 단위와 AIO-PR의 AC 필수 규칙을 그대로 반영한 기준이다. AIO-PR는 AC에 acceptedAnswer.text(≤120자), dateModified, citation|isBasedOn, reviewedBy를 필수로 둡니다.

**6.2 제외 기준**

아래는 feed에서 제외한다.

*   Draft / Review 상태 카드
*   Reviewer 없는 카드
*   행사 안내용 임시 카드
*   중복 카드
*   질문이 모호하거나 Answer-first 구조가 약한 카드
*   Story 전용 해설 카드

**6.3 갱신 규칙**

*   신규 AnswerCard 발행 시: 즉시 feed 갱신
*   기존 AnswerCard 수정 시: updated\_at 갱신 후 feed line 갱신
*   Topic 변경/slug 변경 시: line 재생성 및 이전 URL redirect 확인
*   card 삭제 시: line 제거 + sitemap 제거 + redirect/410 정책 확인

**6.4 ETag / 캐시**

AIO-PR 린트 규칙에 Feed ETag가 포함되어 있으므로, feed는 가능하면 ETag 또는 Last-Modified 기반 캐시 전략을 갖는 것이 좋다. 1차에서는 서버/CDN 레벨 캐시로 대응해도 되지만, 명세 수준에서는 ETag 지원을 목표값으로 둔다.

**7\. Sitemap 운영 구조**

**7.1 전역 sitemap index**

권장:

*   /sitemap.xml

이 index는 하위 sitemap들을 묶는다.

**7.2 하위 sitemap 권장 구조**

*   /sitemap-answers.xml
*   /sitemap-stories.xml
*   /sitemap-events.xml
*   /sitemap-videos.xml
*   /sitemap-network.xml
*   /sitemap-resources.xml

이렇게 분리하는 이유는, 문화강국네트워크가 단순 블로그가 아니라 웹진, 정답카드, 행사, 영상, 자료, 단체 소개가 함께 있는 구조이기 때문이다. 한 장에 다 섞으면 어떤 객체군이 얼마나 자주 바뀌는지 관리하기 어렵다. 구성안의 복합 구조를 고려하면 객체군별 분리가 최적이다.

**7.3 1차 필수 sitemap**

런칭 최소 요건은 아래 두 개다.

*   sitemap-answers.xml
*   sitemap-stories.xml

그리고 권장 추가는 아래다.

*   sitemap-events.xml

AIO-PR 런칭 DoD가 answers 전용 sitemap을 명시하므로, answers sitemap은 필수다. Media 사이트 성격상 Story sitemap도 함께 가는 것이 실무적으로 필요하다.

**8\. sitemap-answers 규격**

**8.1 포함 대상**

*   Public 상태의 모든 AnswerCard 상세 URL

**8.2 필수 속성**

*   <loc>
*   <lastmod>

**8.3 권장 규칙**

*   <lastmod> = 해당 카드의 dateModified
*   canonical URL만 포함
*   필터, 검색, 정렬 URL 제외

AIO-PR 부록이 answers sitemap 예시를 제공하고, 린트 규칙으로 sitemap lastmod==dateModified를 명시합니다. 따라서 문화강국네트워크도 이 규칙을 강제하는 것이 맞습니다.

**8.4 예시**

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>

<loc>https://example.org/answers/k-civilisation</loc>

<lastmod>2026-03-26</lastmod>

</url>

</urlset>

**9\. sitemap-stories 규격**

**9.1 포함 대상**

*   Public 상태의 모든 문강 RIO Story 상세 URL

**9.2 규칙**

*   lastmod는 Story의 Last Updated와 동일
*   Story는 Article 계열 상세이므로 index 대상
*   단, Draft/Review/특집 준비중 페이지는 제외

**9.3 주의**

문강 RIO Story는 기사형 해설 정본이므로 sitemap에 포함하되, Answer Feed에는 포함하지 않는다.  
즉,

*   Feed = 정답 우선
*   Sitemap = 발견 우선  
    구조를 유지한다.

**10\. sitemap-events / videos / resources 규격**

**10.1 이벤트**

sitemap-events.xml에는

*   Upcoming
*   Archived  
    중 Public 상태인 Event 상세 URL만 넣는다.

주의:

*   행사 신청 랜딩과 행사 기록 상세가 분리되어 있다면, 기록 정본 URL을 우선한다.

**10.2 영상**

sitemap-videos.xml에는 Public 상태 Video 상세 URL만 넣는다.

**10.3 자료**

sitemap-resources.xml에는

*   자료실 인덱스
*   ArchiveDocument 상세(있을 때)  
    를 포함한다.

1차에서는 문서 파일 직접 URL까지 sitemap에 모두 넣기보다, **문서를 설명하는 HTML 상세 페이지**가 있을 때 그 HTML 페이지를 넣는 편이 낫다. 그래야 AI와 검색이 맥락을 읽을 수 있다.

**11\. 색인(Indexing) 운영 원칙**

**11.1 기본 원칙**

색인은 “사이트 전체를 자주 핑”하는 방식이 아니라, **정본 객체의 변화가 생길 때 우선순위 기반으로 재요청**하는 방식으로 운영한다.

**11.2 주요 색인 이벤트**

아래 경우에는 색인 재요청 우선순위를 높인다.

*   새 AnswerCard 발행
*   핵심 TopicSummary 개정
*   대표 Story 발행
*   Event 종료 후 자료/영상 대량 추가
*   구조적 ChangeLog 반영

**11.3 재요청 대상 우선순위**

1.  AnswerCard
2.  TopicSummary
3.  대표 Story
4.  Event
5.  Video
6.  Network/Expert

이는 AI홈페이지가 질문-정답 구조를 가장 우선적으로 배포해야 한다는 공통 원칙과 일치한다.

**11.4 Search Console / IndexNow**

AIO-PR 런칭 DoD는 IndexNow 핑을 체크리스트에 포함합니다. 따라서 운영 명세에는 아래를 권장값으로 둔다.

*   기본: Search Console 기반 색인 관리
*   권장: IndexNow 또는 유사 핑 채널 추가
*   재배포 시: answers sitemap 갱신 + 주요 URL 점검

**12\. Feed / Sitemap / Schema 일치 규칙**

이 문서에서 가장 중요한 운영 규칙 중 하나다.

**12.1 일치해야 하는 항목**

*   Feed updated\_at
*   JSON-LD dateModified
*   CMS Last Updated
*   Sitemap <lastmod>

**12.2 일치해야 하는 URL**

*   feed의 page\_url
*   페이지 canonical
*   sitemap <loc>
*   breadcrumb의 최종 item URL

**12.3 일치해야 하는 정답 값**

*   feed의 direct\_answer
*   화면의 Direct Answer
*   FAQPage acceptedAnswer.text

hanjunho.ai AEO 문서도 FAQPage Question.name과 Answer.text는 화면과 일치해야 한다고 강하게 규정합니다. 문화강국네트워크도 이 원칙을 그대로 적용해야 합니다.

**13\. hreflang / locale / applicableLocation**

1차 런칭에서 다국어를 바로 하지 않더라도, AIO-PR 런칭 체크리스트가 hreflang 대칭을 명시하므로 장기 확장성을 고려한 설계를 해두는 편이 좋다.

**13.1 1차 원칙**

*   1차는 ko-KR 단일 locale 운영
*   x-default는 생략 가능
*   feed 필드에 language: ko-KR 권장

**13.2 확장 원칙**

*   영어 확장 시 hreflang 대칭 유지
*   TopicSummary / AnswerCard 우선 번역
*   Story는 선택 번역

**13.3 applicableLocation**

문화강국네트워크가 지역문화와 행사, 정책을 다루므로 향후 AnswerCard나 Event에 applicableLocation 개념을 넣을 수 있다. AIO-PR 부록도 린트 규칙에 applicableLocation을 포함합니다. 1차에서는 권장 필드로만 둔다.

**14\. 운영 주기 권장안**

**14.1 런칭 전**

*   answers feed 200 OK
*   answers sitemap 생성
*   stories sitemap 생성
*   대표 Event sitemap 생성
*   robots/noindex/canonical 확인
*   URL inspection / validate 수행

AIO-PR DoD가 Feed 200 OK, answers sitemap, hreflang 대칭, KPI6 베이스라인을 런칭 기준으로 둡니다. 문화강국네트워크도 최소한 feed와 answers sitemap은 반드시 준비해야 합니다.

**14.2 주간 운영**

*   신규 AnswerCard 반영
*   수정 AnswerCard updated\_at 갱신
*   대표 Story 발행 시 story sitemap 갱신
*   종료 행사 자료/영상 반영
*   dead URL / broken link 점검

**14.3 분기 운영**

*   feed 샤딩 필요성 검토
*   stale answers 정리
*   sitemap 구조 확장 여부 검토
*   language/location 확장 검토

AIO-PR는 100+ AC 스케일 시 anchor×locale×quarter 단위 샤딩 전략을 제시합니다. 문화강국네트워크는 1차에 필요 없지만, 분기 점검 항목으로 넣어두는 것이 맞습니다.

**15\. QA / lint 규칙**

**15.1 Feed lint**

*   answers feed 200이 아님
*   NDJSON 문법 오류
*   answer\_id 중복
*   updated\_at 없음
*   citations 빈 배열
*   cta\_url 없음
*   page\_url canonical 불일치

**15.2 Sitemap lint**

*   lastmod 누락
*   lastmod != dateModified
*   noindex URL 포함
*   Draft/Review URL 포함
*   broken URL 포함

**15.3 연결 lint**

*   AnswerCard가 feed에 있으나 관련 Story 0개
*   Story는 공개되었는데 related Answer 0개
*   Event는 공개되었는데 자료/영상/후속 Story 0개
*   MembershipPlan으로 이어지는 CTA 0개

**15.4 기술 lint**

*   ETag 없음(권장)
*   gzip/cache 전략 부재
*   sitemap index에서 하위 sitemap 누락
*   robots 설정 충돌

AIO-PR 부록은 린트 규칙에 Feed ETag, sitemap lastmod==dateModified, CTA 유효성 등을 포함합니다. 문화강국네트워크도 같은 수준으로 QA하는 것이 적절합니다.

**16\. 문화강국네트워크 적용 예시**

**16.1 Answer Feed 예시 대상**

*   문화강국이란 무엇인가
*   K-문명이란 무엇인가
*   문화강국네트워크는 어떤 단체인가
*   회원이 되면 무엇을 할 수 있는가
*   지역문화는 왜 중요한가

이 질문들은 문화강국네트워크의 정체성, 대표 아젠다, 전환 구조를 함께 담는 핵심 질문군이다. 구성안의 단체 소개, 웹진, 회원가입, 문화예술정보 구조와도 맞닿는다.

**16.2 Story sitemap 예시 대상**

*   K-문명의 가능성
*   대표 인터뷰
*   대표 토론회 리뷰
*   지역문화 해설
*   문화정책 브리핑

특히 K-문명의 가능성은 질문형 장문 해설의 기준 사례로서 story sitemap 우선 포함 대상이다. 이 글이 K-문명을 우월성 선언이 아닌 분석적 개념으로 정의하고, 감정·기술·제도의 통합 가능성을 묻는 구조를 가지므로, 문화강국네트워크의 문강 RIO 정체성을 가장 잘 드러내는 discovery asset이다.

**16.3 Event sitemap 예시 대상**

*   국회 토론회 시리즈
*   지역문화 관련 행사
*   문화행사 기록 페이지

구성안이 토론회 개요와 발제문 아카이빙, 문화행사 사진 중심 안내를 요구하므로, Event 상세는 sitemap 핵심 대상이 되어야 한다.

**17\. 최종 결론**

이 운영 명세서의 핵심은 단순합니다.  
문화강국네트워크 AI홈페이지에서 **Answer Feed는 정답카드 중심의 기계 가독 배포 레이어**, **Sitemaps는 객체군별 발견 레이어**, **Indexing은 정본 우선 재배포 레이어**로 작동해야 합니다. AIO-PR가 Answer Feed, answers 전용 sitemap, hreflang, IndexNow, Feed ETag, lastmod==dateModified를 핵심 운영 규칙으로 제시하고, B-SSoT가 AI홈페이지를 질문-정답-근거-검수-전환 구조의 이중 대응 웹사이트로 규정하며, 문화강국네트워크 구성안이 웹진·행사·자료·회원가입을 함께 요구한다는 점을 종합하면, 이 사이트는 **모든 페이지를 같은 방식으로 배포하는 구조가 아니라, AnswerCard를 우선 feed로 내보내고 Story/Event/Video/Archive를 별도 sitemap으로 발견시키는 계층형 배포 체계**가 가장 적합합니다.