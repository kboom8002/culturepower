**13\_Brand KG·Entity Relation 명세서 v1.0**

**1\. 문서 목적**

이 문서의 목적은 문화강국네트워크 AI홈페이지의 핵심 객체와 객체 간 관계를 **Brand KG(Brand Knowledge Graph)** 형태로 정의하는 데 있다.  
즉, 이 문서는 “어떤 페이지가 있나”를 설명하는 문서가 아니라, 문화강국네트워크가 다루는 단체, 주제, 정답, 해설, 행사, 영상, 자료, 전문가, 참여가 어떤 엔티티이고 서로 어떻게 연결되는지를 정하는 문서다. B-SSoT 공통 원칙이 AI홈페이지를 객체/그래프 단위로 사고하라고 요구하므로, 이 문서는 CMS 사전이나 페이지 구현 명세보다 더 상위의 의미 구조 문서다.

이 문서가 해결해야 하는 질문은 다음과 같다.

*   문화강국네트워크 AI홈페이지에서 1급 엔티티는 무엇인가
*   어떤 엔티티가 정본이고 어떤 엔티티가 신뢰와 기록을 담당하는가
*   AnswerCard, Story, Event, Video, ArchiveDocument, Expert, MembershipPlan은 어떻게 연결되는가
*   어떤 관계를 최소 필수 관계로 보고, 어떤 관계는 보조 관계로 보는가
*   KG를 통해 AEO·Schema·Answer Feed·Observatory까지 어떻게 이어지게 하는가

**2\. Brand KG의 한 줄 정의**

**문화강국네트워크 Brand KG는 문화강국 담론, 문강 RIO, 행사·영상·자료 아카이브, 전문가 네트워크, 회원 참여를 하나의 의미 그래프로 묶어, 인간과 AI가 동일한 정답·근거·책임 구조를 이해하도록 만드는 엔티티-관계-근거 시스템이다.**

이 정의에서 중요한 것은 두 가지다.

첫째, KG의 목적은 단순한 “구조화데이터 추가”가 아니다.  
이 KG는 문화강국네트워크의 공식 정답과 해설, 기록과 사람, 참여 구조가 **하나의 일관된 의미 체계**로 읽히도록 만드는 기반이다.

둘째, KG는 사이트 내부 UX만을 위한 것이 아니다.  
AIO-PR 관점에서 Brand KG는 AC/Feed/맵/Observatory와 함께 AI 인용과 이해를 위한 핵심 레이어다. 즉 검색엔진, LLM, 내부 운영자 모두가 같은 의미 구조를 공유하게 만든다.

**3\. Brand KG 설계의 최상위 원칙**

**3.1 객체가 먼저이고 페이지는 나중이다**

문화강국네트워크 AI홈페이지는 페이지 집합이 아니라 객체 시스템으로 본다. 상세 페이지는 객체의 표현일 뿐이며, 진짜 핵심은 객체와 관계다. 사용자의 공통 프레임도 이 점을 명확히 요구합니다.

**3.2 질문 자산이 KG의 출발점이다**

KG는 임의의 정보 모음이 아니라 Question Capital에서 출발해야 한다.  
즉 “문화강국이란 무엇인가”, “K-문명이란 무엇인가”, “어떤 토론회가 있었는가”, “회원이 되면 무엇을 할 수 있는가” 같은 질문이 먼저 있고, 그 질문을 AnswerCard, Story, Event, MembershipPlan 같은 객체로 풀어내는 구조여야 한다.

**3.3 Trust Layer를 별도 관계층으로 본다**

Evidence, Reviewer, Update, ChangeLog, Boundary는 단순 메타 정보가 아니라 KG 안의 핵심 관계다.  
즉 “이 카드의 검수자는 누구인가”, “이 Story는 어떤 자료를 바탕으로 하는가”, “이 Event 기록은 무엇을 근거로 업데이트되었는가”가 엔티티 관계로 표현되어야 한다.

**3.4 Graph, not tree**

문화강국네트워크 홈페이지는 트리형 메뉴 구조만으로 설명되지 않는다.  
AnswerCard ↔ Story ↔ Event ↔ Video ↔ ArchiveDocument ↔ Expert ↔ MembershipPlan이 횡단 연결되어야 한다. 사용자의 공통 원칙과 Media 패밀리 정의도 이를 요구한다.

**3.5 운영 가능한 단순성을 유지한다**

KG는 이론적으로 완벽할수록 좋은 것이 아니라, CMS, AEO, QA, 운영 플레이북과 연결될 수 있어야 한다.  
hanjunho.ai 문서 체계가 CMS, AEO, 페이지 구현, 운영 문서를 하나의 프레임으로 묶는 이유도 구현 가능한 단순성을 유지하기 위해서다.

**4\. 문화강국네트워크 Brand KG의 핵심 엔티티**

문화강국네트워크의 1차 Brand KG는 아래 12개 핵심 엔티티로 정의한다.

**4.1 Organization**

문화강국네트워크 자체를 나타내는 루트 엔티티다.  
이 엔티티는 사이트 전체의 공식 발화 주체이며, 비전·미션·연혁·협력기관과 연결된다. 구성안의 “문화강국네트워크 소개, 이사장 인사말, 비전&미션, 조직구성, 협력기관, 주요 연혁” 요구가 이 엔티티의 하위 표현이다.

**4.2 TopicSummary**

문화강국, K-문명, 지역문화, 문화정책, 행사·기록, 참여·회원 같은 상위 질문군을 요약하는 엔티티다.  
Media 패밀리의 핵심 객체인 topic summary와 동일하다.

**4.3 AnswerCard**

특정 질문에 대한 공식 압축 답변 엔티티다.  
B-SSoT 최소 정답 단위를 가장 직접적으로 구현하는 객체이며, Question, Official Answer, Evidence, Reviewer, Update, CTA를 갖는다.

**4.4 Story**

문강 RIO의 기사형 해설 엔티티다.  
질문을 길게 설명하고, 개념·맥락·근거·행사·사람을 연결하는 서사 객체다. Media 패밀리의 story card에 해당한다.

**4.5 Event**

토론회, 포럼, 대담, 문화행사, 캠페인 같은 기록 엔티티다.  
구성안의 “토론회 개요 및 발제문 아카이빙”, “문화행사 사진 위주의 개요 안내” 요구를 직접 담는다.

**4.6 Video**

명사 영상, 행사 다시보기, 인터뷰 영상, 하이라이트 클립을 담는 시청 객체다.

**4.7 ArchiveDocument**

발제문, 자료집, 보도자료, 행사 기록 PDF, 사진 묶음 같은 문서형 증거 엔티티다.

**4.8 Expert**

이사장, 편집장, 필자, 검수자, 연사, 협력 전문가를 담는 신뢰 주체 엔티티다.  
Media 패밀리의 expert card에 해당한다.

**4.9 Evidence**

근거 객체다.  
실무 구현에서는 ArchiveDocument나 외부 링크가 evidence 역할을 할 수 있지만, KG 차원에서는 “무엇이 무엇의 근거인가”를 명시하기 위한 개념 엔티티로 둔다.

**4.10 MembershipPlan**

회원가입, 뉴스레터, 행사 신청, 협력 문의처럼 질문의 실행 답을 담는 전환 엔티티다.  
Media 패밀리에서 제품/서비스는 구독/행사/협업/브랜드 영향력으로 번역된다고 정리되어 있다.

**4.11 PartnerOrg**

협력기관, 후원기관, 행사 파트너를 나타내는 엔티티다.  
구성안의 협력기관 요구를 구조화한다.

**4.12 ChangeLog**

핵심 수정·정정·업데이트 이력을 기록하는 운영 엔티티다.  
B-SSoT가 ChangeLog/TrustLog 기반 운영형 구조를 요구하므로 1급 엔티티로 둔다.

**5\. 엔티티 계층 구조**

문화강국네트워크 Brand KG는 아래 4층으로 이해한다.

**5.1 Identity Layer**

*   Organization
*   Expert
*   PartnerOrg

이 층은 “누가 말하는가”, “누가 함께하는가”를 설명한다.  
구성안의 단체 소개, 조직구성, 협력기관 요구가 이 층에 속한다.

**5.2 Meaning Layer**

*   TopicSummary
*   AnswerCard
*   Story

이 층은 “무슨 질문에 어떻게 답하는가”를 설명한다.  
B-SSoT 최소 정답 단위와 Media 패밀리의 topic/story 구조가 이 층의 핵심이다.

**5.3 Evidence & Record Layer**

*   Event
*   Video
*   ArchiveDocument
*   Evidence

이 층은 “무엇을 근거로 하는가”, “무슨 기록이 남아 있는가”를 설명한다.  
구성안의 토론회, 발제문, 행사 사진, 문화예술정보 요구가 이 층과 직접 연결된다.

**5.4 Action & Trust Layer**

*   MembershipPlan
*   ChangeLog

이 층은 “다음 행동은 무엇인가”, “수정과 책임은 어떻게 관리되는가”를 설명한다.  
B-SSoT가 CTA와 ChangeLog를 최소 단위에 넣는 이유가 여기에 있다.

**6\. 핵심 관계 타입**

문화강국네트워크 Brand KG에서 1차 필수 관계는 아래 14개로 정의한다.

**6.1 answersQuestion**

*   주체: AnswerCard, Story, TopicSummary
*   객체: Question 또는 질문군
*   의미: 이 객체가 어떤 질문에 답하는가

**6.2 belongsToTopic**

*   주체: AnswerCard, Story, Event, Video, ArchiveDocument
*   객체: TopicSummary
*   의미: 이 객체가 어떤 아젠다에 속하는가

**6.3 isBasedOn**

*   주체: Story, AnswerCard
*   객체: Evidence, ArchiveDocument, Event, 외부 공적 자료
*   의미: 이 객체가 무엇을 기반으로 작성되었는가

AIO-PR 가이드는 isBasedOn/citation을 핵심 관계로 다루고, KG를 엔티티-관계-근거 구조로 묶어야 한다고 설명합니다.

**6.4 reviewedBy**

*   주체: AnswerCard, Story, TopicSummary, Event, Video
*   객체: Expert
*   의미: 누가 검토했는가

**6.5 authoredBy**

*   주체: Story, AnswerCard, ArchiveDocument
*   객체: Expert 또는 Organization
*   의미: 누가 작성했는가

**6.6 organizedBy**

*   주체: Event
*   객체: Organization 또는 PartnerOrg
*   의미: 누가 주최/주관했는가

**6.7 featuresExpert**

*   주체: Event, Video, Story
*   객체: Expert
*   의미: 어떤 전문가/연사가 관련되는가

**6.8 hasArchive**

*   주체: Event
*   객체: ArchiveDocument
*   의미: 이 행사에 어떤 자료가 남아 있는가

**6.9 hasVideo**

*   주체: Event
*   객체: Video
*   의미: 이 행사에 어떤 영상이 연결되는가

**6.10 expandsAnswer**

*   주체: Story
*   객체: AnswerCard
*   의미: 이 Story가 어떤 정답을 서사적으로 확장하는가

**6.11 supportsAnswer**

*   주체: Evidence, ArchiveDocument, Event
*   객체: AnswerCard
*   의미: 무엇이 이 답을 근거로 뒷받침하는가

**6.12 leadsToAction**

*   주체: AnswerCard, Story, Event, TopicSummary
*   객체: MembershipPlan
*   의미: 이 객체가 어떤 전환 행동으로 이어지는가

**6.13 mentionsPartner**

*   주체: Event, Story, Network 허브
*   객체: PartnerOrg
*   의미: 어떤 협력기관/파트너와 연결되는가

**6.14 changedBy / hasChangeLog**

*   주체: 모든 핵심 엔티티
*   객체: ChangeLog
*   의미: 이 객체의 수정·정정 이력은 무엇인가

**7\. 핵심 관계 우선순위**

모든 관계를 한 번에 다 넣는 것보다, 아래 우선순위로 구현하는 것이 가장 좋습니다.

**1순위 관계**

*   TopicSummary ↔ AnswerCard
*   AnswerCard ↔ Story
*   Story ↔ Expert
*   AnswerCard / Story ↔ Reviewer
*   Event ↔ ArchiveDocument
*   Event ↔ Video

이 관계들이 먼저 있어야 사이트가 “정답 → 해설 → 기록” 구조로 읽힙니다.

**2순위 관계**

*   Event ↔ Story
*   Event ↔ AnswerCard
*   Story ↔ Event
*   Story ↔ ArchiveDocument
*   Network / Expert ↔ Story / Event

이 관계들이 붙어야 문화강국네트워크의 활동 자산이 정답 구조와 연결됩니다.

**3순위 관계**

*   TopicSummary ↔ MembershipPlan
*   Story / AnswerCard / Event ↔ MembershipPlan
*   PartnerOrg ↔ Event / Story
*   ChangeLog ↔ 모든 핵심 엔티티

이 관계들이 붙어야 참여 전환과 운영형 신뢰 구조가 완성됩니다.

**8\. 각 핵심 엔티티의 최소 관계 계약**

**8.1 Organization**

필수 관계:

*   hasPart → TopicSummary
*   hasPart → Story
*   hasPart → Event
*   worksWith → PartnerOrg
*   publishes → NewsletterIssue / Story / AnswerCard

**8.2 TopicSummary**

필수 관계:

*   hasAnswer → AnswerCard 최소 1개
*   hasStory → Story 최소 1개
*   ownedBy → Organization
*   reviewedBy → Expert 또는 편집 책임자

**8.3 AnswerCard**

필수 관계:

*   answersQuestion
*   belongsToTopic
*   reviewedBy
*   supportsAnswer → Evidence 또는 ArchiveDocument 최소 1개
*   expandsTo → Story 최소 1개 권장
*   leadsToAction → MembershipPlan 선택

**8.4 Story**

필수 관계:

*   belongsToTopic
*   expandsAnswer → AnswerCard 최소 1개
*   authoredBy
*   reviewedBy
*   isBasedOn → Evidence/Event/Archive 중 최소 1개
*   leadsToAction → MembershipPlan 또는 Newsletter

**8.5 Event**

필수 관계:

*   belongsToTopic 또는 relatedAnswer
*   organizedBy
*   hasArchive 또는 hasVideo 최소 1개 권장
*   featuresExpert 최소 1명 권장
*   leadsToAction → 행사 신청 또는 뉴스레터

**8.6 Video**

필수 관계:

*   relatedEvent 또는 relatedStory
*   featuresExpert 선택
*   belongsToTopic 권장

**8.7 ArchiveDocument**

필수 관계:

*   relatedEvent 또는 relatedStory 또는 relatedTopic
*   supportsAnswer 선택
*   authoredBy 또는 source

**8.8 Expert**

필수 관계:

*   reviews 또는 authors 또는 speaksAt 중 최소 1개
*   appearsInStory/Event/Video 최소 1개

**8.9 MembershipPlan**

필수 관계:

*   isActionFor → AnswerCard / Story / Event / TopicSummary 중 최소 1개

**8.10 ChangeLog**

필수 관계:

*   changes → AnswerCard / Story / Event / TopicSummary / Video / ArchiveDocument 중 최소 1개

**9\. 엔티티 식별자(@id) 규칙**

Brand KG는 장기 운영을 전제로 하므로 각 엔티티는 안정적인 식별자를 가져야 합니다.

**9.1 식별자 원칙**

*   사람이 읽을 수 있어야 한다
*   타입이 드러나야 한다
*   변경되지 않아야 한다
*   slug와 1:1이 아니어도 된다

**9.2 권장 규칙**

*   Organization: org:culturepower-network
*   TopicSummary: topic:culture-power
*   AnswerCard: ans:k-civilisation-001
*   Story: story:k-civilisation-possibility
*   Event: event:forum-001
*   Video: video:k-civilisation-talk-001
*   ArchiveDocument: doc:forum-001-paper-01
*   Expert: person:lee-woojong
*   MembershipPlan: action:membership-join
*   PartnerOrg: partner:xxx
*   ChangeLog: log:story-k-civilisation-2026-03-26-01

AIO-PR 가이드가 KG를 엔티티-관계-근거 데이터 계약으로 묶고, Feed와 Sitemap까지 연결한다고 설명하는 만큼, 식별자는 장기적으로 안정적이어야 합니다.

**10\. KG와 CMS의 관계**

Brand KG는 CMS를 대체하지 않습니다.  
CMS는 운영 인터페이스이고, KG는 의미 모델입니다. 실무적으로는 CMS 컬렉션이 KG 엔티티의 저장 형태가 되고, 페이지는 그 엔티티의 렌더링 결과가 됩니다. hanjunho.ai 문서 체계도 CMS 사전, 페이지 명세, AEO 명세가 한 프레임 안에서 연결되어야 한다고 설명합니다.

**10.1 1차 매핑**

*   Experts 컬렉션 → Expert 엔티티
*   AnswerCards 컬렉션 → AnswerCard 엔티티
*   Stories 컬렉션 → Story 엔티티
*   TopicSummaries 컬렉션 → TopicSummary 엔티티
*   Events 컬렉션 → Event 엔티티
*   Videos 컬렉션 → Video 엔티티
*   ArchiveDocuments 컬렉션 → ArchiveDocument 엔티티
*   MembershipPlans 컬렉션 → MembershipPlan 엔티티
*   Partners 컬렉션 → PartnerOrg 엔티티

**10.2 구현 원칙**

*   CMS 필드명은 관계를 암시해야 한다  
    예: Related Stories, Based On Answers, Primary Event, Reviewer
*   KG 관계를 화면 연결과 schema 연결 양쪽에서 재사용한다
*   화면에는 없는 관계를 KG에만 과도하게 넣지 않는다

**11\. KG와 AEO/Schema의 관계**

Brand KG는 AEO/Schema 전략과 분리될 수 없습니다.  
AIO-PR 가이드는 KG를 AC/Feed/맵/Observatory와 같은 계열의 데이터 계약으로 설명합니다.

**11.1 직접 연결되는 항목**

*   about → TopicSummary / Organization
*   isBasedOn / citation → Evidence / ArchiveDocument
*   reviewedBy → Expert
*   dateModified → Last Updated
*   mainEntityOfPage → 현재 상세 엔티티

**11.2 페이지 유형별 의미**

*   AnswerCard 상세: Question ↔ AnswerCard ↔ Evidence ↔ Reviewer
*   Story 상세: Story ↔ AnswerCard ↔ TopicSummary ↔ Expert
*   Event 상세: Event ↔ Expert ↔ ArchiveDocument ↔ Video
*   Expert 상세: Expert ↔ Story / Event / AnswerCard
*   TopicSummary 상세: TopicSummary ↔ AnswerCard / Story / Event

즉 KG가 먼저 잠겨야 FAQPage, Article, Event, VideoObject, ProfilePage 같은 schema도 일관되게 갈 수 있습니다. hanjunho.ai AEO 문서도 페이지 유형별 schema를 분리하되, 화면 구조와 구조화데이터가 일치해야 한다고 강조합니다.

**12\. KG와 Observatory / Fix-It의 관계**

Brand KG는 운영 이후 측정과 수정에도 직접 연결됩니다.

**12.1 측정 대상**

*   고립 엔티티가 있는가
*   TopicSummary에 AnswerCard가 부족한가
*   AnswerCard에 Story/Evidence 연결이 약한가
*   Event가 아카이브 없이 끝나는가
*   MembershipPlan으로 이어지는 전환 관계가 없는가

**12.2 Fix-It 우선순위 예시**

1.  AnswerCard인데 supportsAnswer가 없는 경우
2.  Story인데 expandsAnswer가 없는 경우
3.  Event인데 hasArchive와 hasVideo가 모두 비어 있는 경우
4.  Expert인데 연결 콘텐츠가 하나도 없는 경우
5.  TopicSummary인데 대표 Answer/Story가 없는 경우

B-SSoT는 질문 자산 → 정본 → 측정 → 원인 → 조치의 루프형 운영 구조를 요구하므로, KG도 고정 설계가 아니라 관측과 수정의 대상이 됩니다.

**13\. 1차 구축 최소 KG**

1차 런치에서는 완벽한 KG보다 **운영 가능한 최소 KG**가 중요합니다.

**13.1 필수 엔티티**

*   Organization
*   TopicSummary 4~6개
*   AnswerCard 12~18개
*   Story 12~18개
*   Event 5~10개
*   Video 5~10개
*   ArchiveDocument 10개 이상
*   Expert 5~10명
*   MembershipPlan 3~4개

**13.2 필수 관계**

*   모든 AnswerCard는 TopicSummary와 연결
*   모든 Story는 AnswerCard와 연결
*   모든 Event는 TopicSummary 또는 AnswerCard와 연결
*   모든 Event는 자료 또는 영상 중 최소 하나와 연결
*   모든 Expert는 Story/Event/AnswerCard 중 하나 이상과 연결
*   모든 MembershipPlan은 AnswerCard/Story/Event 중 하나 이상에서 호출

이 정도만 되어도 문화강국네트워크 홈페이지는 “콘텐츠 저장소”가 아니라 **의미 그래프를 가진 Media SSoT형 AI홈페이지**로 작동하기 시작합니다.

**14\. 최종 결론**

이 명세서의 핵심은 단순합니다.  
문화강국네트워크 AI홈페이지의 Brand KG는 Organization, TopicSummary, AnswerCard, Story, Event, Video, ArchiveDocument, Expert, MembershipPlan, PartnerOrg, ChangeLog를 핵심 엔티티로 삼고, 이들을 answersQuestion, belongsToTopic, isBasedOn, reviewedBy, expandsAnswer, hasArchive, hasVideo, leadsToAction, hasChangeLog 같은 관계로 묶어야 합니다. 이 구조가 있어야 홈페이지 구성안이 요구하는 문강 RIO, 정답카드, 행사·영상, 자료실, 네트워크, 참여·회원이 하나의 의미 시스템으로 연결되고, B-SSoT 원칙이 요구하는 Answer-first, Trust Layer, Graph linking, 운영형 정답 인프라도 실제로 구현됩니다. 또한 AIO-PR가 설명하듯 KG가 AC/Feed/맵/Observatory와 연결될 때 비로소 AI와 검색이 문화강국네트워크의 정답·근거·책임을 일관되게 이해하게 됩니다.