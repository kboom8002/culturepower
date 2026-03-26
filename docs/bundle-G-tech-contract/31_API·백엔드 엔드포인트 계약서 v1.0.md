**31\_API·백엔드 엔드포인트 계약서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지와 Admin Console이 공통으로 사용할 **백엔드 API 계약**을 정의하는 데 있다.  
범위는 다음 5개 레이어를 포함한다.

*   Public Read API
*   Admin Write API
*   Workflow / Review API
*   Publishing / Feed / Sitemap API
*   Participation / Inbox / Fix-It API

이 계약은 B-SSoT의 객체 중심 설계와 운영 루프를 API 계층으로 변환한 것이다. 즉 API는 페이지용 API가 아니라 AnswerCard, Story, Event, ArchiveDocument, MemberApplication, InboxItem, FixItTicket 같은 객체를 기준으로 설계해야 한다.

**2\. API 설계 원칙**

*   REST 우선, 필요 시 일부 search/aggregation endpoint 추가
*   퍼블릭 읽기 API와 Admin 쓰기 API 분리
*   모든 핵심 객체는 stable id와 slug를 함께 가짐
*   상태값은 Draft / Review / Public / Hidden / Archived를 따름
*   Write API는 RBAC와 audit log를 강제
*   Publish 이후 Feed / Sitemap / UpdatedAt 파이프라인과 연결
*   퍼블릭 응답은 Answer-first 구조를 우선 반환

AIO-PR가 dateModified, reviewedBy, citation|isBasedOn, Answer Feed, sitemap-answers, Fix-It를 운영 계약으로 두고 있으므로, API도 이 값들을 1급 필드로 다뤄야 한다.

**3\. API 도메인 분류**

**3-1. Public Read API**

*   /api/public/topics
*   /api/public/topics/{slug}
*   /api/public/answers
*   /api/public/answers/{slug}
*   /api/public/stories
*   /api/public/stories/{slug}
*   /api/public/events
*   /api/public/events/{slug}
*   /api/public/videos/{slug}
*   /api/public/experts/{slug}
*   /api/public/resources/{slug}
*   /api/public/search

**3-2. Admin Content API**

*   /api/admin/topics
*   /api/admin/answers
*   /api/admin/stories
*   /api/admin/events
*   /api/admin/videos
*   /api/admin/documents
*   /api/admin/galleries
*   /api/admin/experts
*   /api/admin/partners
*   /api/admin/resources

**3-3. Workflow / Review API**

*   /api/admin/review-queue
*   /api/admin/reviews/{id}/approve
*   /api/admin/reviews/{id}/reject
*   /api/admin/workflow/{objectType}/{id}/transition

**3-4. Participation / Inbox API**

*   /api/public/member-applications
*   /api/public/newsletter/subscribe
*   /api/public/event-registrations
*   /api/public/partnership-inquiries
*   /api/public/general-inquiries
*   /api/admin/member-applications
*   /api/admin/newsletter-subscribers
*   /api/admin/event-registrations
*   /api/admin/inbox
*   /api/admin/corrections

**3-5. Publishing / Observatory API**

*   /api/admin/publish-queue
*   /api/admin/featured
*   /api/admin/feed/status
*   /api/admin/feed/regenerate
*   /api/admin/sitemaps/status
*   /api/admin/sitemaps/regenerate
*   /api/admin/observatory/kpis
*   /api/admin/observatory/object-health
*   /api/admin/fixit-tickets

**4\. 공통 응답 계약**

**4-1. 공통 envelope**

{

"data": {},

"meta": {

"requestId": "req\_...",

"timestamp": "2026-03-26T10:00:00Z",

"version": "v1"

},

"error": null

}

**4-2. 리스트 응답**

{

"data": \[ ... \],

"meta": {

"page": 1,

"pageSize": 20,

"total": 148,

"filters": {}

}

}

**4-3. 에러 응답**

{

"data": null,

"meta": {

"requestId": "req\_..."

},

"error": {

"code": "PUBLISH\_BLOCKED",

"message": "Reviewer or Evidence missing",

"details": \["reviewer\_missing", "evidence\_missing"\]

}

}

**5\. 핵심 객체별 대표 endpoint 계약**

**5-1. AnswerCard**

**GET /api/public/answers/{slug}**

반환 핵심:

*   id
*   slug
*   title
*   question
*   directAnswer
*   actionPoints
*   evidence\[\]
*   reviewer
*   updatedAt
*   relatedStories\[\]
*   relatedEvents\[\]
*   topic
*   cta
*   trust

**POST /api/admin/answers**

생성 입력:

*   title
*   question
*   directAnswer
*   category
*   pillar
*   topicId
*   reviewerId
*   evidenceIds\[\]
*   cta
*   status

**POST /api/admin/workflow/answers/{id}/transition**

입력:

{

"toStatus": "Review",

"reason": "초안 완료 및 검수 요청"

}

**5-2. Story**

퍼블릭 상세는 deck, whyThisMatters, body, basedOnAnswers, relatedEventIds, reviewer, updatedAt를 포함해야 한다. 기사형 해설은 FAQ보다 Article 성격이 강하므로, Story API는 정답 카드보다 body-rich 구조를 기본으로 한다.

**5-3. Event**

Event API는 일정 정보뿐 아니라 documents, videos, gallery, completionStatus, relatedStories, relatedAnswerCards를 포함해야 한다. 문화강국네트워크는 행사/토론회/발제문/사진 기록이 핵심이므로 Event는 단순 일정 엔티티가 아니라 기록 completion 객체다.

**5-4. MemberApplication**

퍼블릭 POST:

*   name
*   email
*   phone?
*   organizationName?
*   motivationText?
*   consentPrivacy
*   interestTopics\[\]
*   sourceChannel
*   sourcePageUrl
*   sourceCta

Admin 상세 GET:

*   applicationStatus
*   owner
*   notes
*   relatedObjects
*   auditSummary

**6\. Workflow API 계약**

/api/admin/workflow/{objectType}/{id}/transition 은 모든 퍼블릭 콘텐츠 객체의 상태 전이를 통합 처리한다.

입력 계약:

{

"fromStatus": "Review",

"toStatus": "Public",

"reason": "검수 승인 완료",

"reviewerId": "exp\_123"

}

서버 검증:

*   allowed transition 인지
*   role permission 있는지
*   publish blocker 없는지
*   audit log 생성
*   필요 시 feed/sitemap requeue

이 계약은 Draft→Review→Public 장벽과 Review 후 공개 원칙을 강제하기 위한 것이다.

**7\. Publishing API 계약**

**Feed**

*   GET /api/admin/feed/status
*   POST /api/admin/feed/regenerate
*   GET /api/public/ai/answers.ndjson

Feed 엔트리 최소 필드:

*   answer\_id
*   question
*   jsonld\_url or page\_url
*   updated\_at
*   reviewedBy
*   citations\[\]
*   confidence

AIO-PR 부록이 제시한 Answer Feed NDJSON 구조를 그대로 따른다.

**Sitemap**

*   GET /api/admin/sitemaps/status
*   POST /api/admin/sitemaps/regenerate
*   GET /sitemap-answers.xml
*   GET /sitemap-stories.xml
*   GET /sitemap-events.xml

검증 규칙:

*   lastmod == dateModified
*   noindex 제외
*   Hidden/Archived 제외
*   canonical 일치

**8\. Observatory / Fix-It API 계약**

**KPI**

*   GET /api/admin/observatory/kpis  
    응답:

{

"coverage": 0.52,

"ssotCitation": 0.31,

"claimCapture": 0.74,

"evidenceAlign": 0.67,

"contradiction": 0.05,

"ttiDays": 11

}

**Fix-It**

*   GET /api/admin/fixit-tickets
*   POST /api/admin/fixit-tickets
*   PATCH /api/admin/fixit-tickets/{id}

rootCause enum:

*   schema\_feed
*   content\_shape
*   evidence\_trust
*   link\_graph
*   tone\_framing
*   archive\_completion
*   conversion\_mapping

**9\. 인증/권한 계약**

*   Public API: anonymous read 가능
*   Admin API: auth required
*   Transition / regenerate / export: elevated permission required
*   PII 응답: role-scoped masking
*   destructive actions: reason required

**10\. 최종 결론**

31번 문서는 문화강국네트워크 AI홈페이지와 Admin Console을 연결하는 **실행 API 계약**이다. 핵심은 API를 페이지 기준이 아니라 AnswerCard, Story, Event, Archive, Participation, Workflow, Publishing, Observatory 객체 기준으로 설계하는 것이다. 이는 B-SSoT의 객체 중심, AIO-PR의 Feed/Map/Obs/Fix-It 계약, 그리고 문화강국네트워크의 웹진·행사·회원 운영 요구를 기술적으로 닫아준다.