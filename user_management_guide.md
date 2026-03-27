# Admin Console 사용자 권한 및 Role-Based Access Control (RBAC) 가이드

문화강국네트워크 SSOT 어드민 콘솔은 다수의 작업자(에디터, 검수자, 시스템 관리자)가 동시 다발적으로 콘텐츠를 운영할 수 있도록 **RBAC(역할 기반 접근 제어)** 모델을 채택하고 있습니다.

## 1. Vercel Owner와 Superuser의 차이점

현재 질문 주신 **"Vercel 계정의 Owner가 곧 본 시스템의 Superuser인가?"**에 대한 답변은 **아니오**입니다.

*   **Vercel Owner**: 서비스의 인프라(호스팅, 소스코드 배포, 환경변수 설정, 결제)를 통제하는 권한입니다. 즉, "서버의 주인"입니다.
*   **System Superuser (Super Admin)**: 애플리케이션 내부(어드민 콘솔)에서 콘텐츠, 사용자, 전역 설정을 제어하는 권한입니다. 즉, "플랫폼의 총괄 관리자"입니다.

Vercel 계정 소유자라 하더라도, 어드민 플랫폼 내의 데이터베이스(Supabase)가 해당 유저를 'Super Admin'으로 인식하지 않으면 최고 관리자 기능을 사용할 수 없습니다.

## 2. Superuser (최고 관리자) 권한 부여 방법

애플리케이션의 사용자 권한은 Supabase 데이터베이스의 `public.admin_users` 테이블에 의해 독점적으로 관리됩니다. 
초기 세팅 시, 본인을 Super Admin으로 등록하는 방법은 아래와 같습니다.

### [방법 1] Supabase SQL Editor를 통한 최초 1인 등록
1. Supabase 대시보드 (https://supabase.com) 에 로그인 후 현재 프로젝트를 클릭합니다.
2. 좌측 메뉴에서 **SQL Editor**를 엽니다.
3. 아래의 쿼리에 본인이 로그인할 때 사용할 이메일 창과 이름을 넣고 **[RUN]** 버튼을 누릅니다.
   ```sql
   INSERT INTO public.admin_users (email, name, role, is_active) 
   VALUES ('실제_본인_이메일@gmail.com', '본인 이름', 'Super Admin', true);
   ```
4. 이후 해당 이메일로 어드민 플랫폼(`/admin`)에 로그인하면 시스템이 회원님을 **Super Admin**으로 인식합니다.

### [방법 2] Super Admin 로그인 후 UI에서 초대
*   최초 1인(본인)이 위 방법으로 Super Admin이 된 이후부터는, 어드민 콘솔의 **[Settings] -> [Users & Roles]** 메뉴(`/admin/settings/users`)에서 직접 다른 작업자들을 초대하고 드롭다운 메뉴로 권한을 부여할 수 있습니다.

---

## 3. 사용자 종류 (Roles) 및 권한 명세

현재 설계된 [0007_settings_schema.sql](file:///c:/Users/User/culturepower/supabase/migrations/0007_settings_schema.sql) 모델 기준, 시스템에는 **총 4가지의 Role**이 존재합니다.

| Role (역할) | 주 타겟 | 권한 범위 및 설명 | 접근 가능 메뉴 |
| :--- | :--- | :--- | :--- |
| **Super Admin** | 시스템 총괄 운영자 | 시스템의 모든 권한을 가집니다. 다른 사용자의 계정을 생성/삭제하고 권한(Role)을 변경할 수 있습니다. 카테고리(Taxonomy) 관리, 전체 감사 로그(Audit Log)람, 인프라 관측(Observatory) 메뉴에 유일하게 접근할 수 있는 권한입니다. | 모든 메뉴 (`/admin/*`) |
| **Editor** | 콘텐츠 에디터 | 주력 실무자입니다. 정답카드(Answers), 기사(Stories), 행사(Events) 등을 작성하고 '임시저장(Draft)' 하거나 '리뷰 대기(Review)' 상태로 상신할 수 있습니다. | `/admin/content/*`, `/admin/archive/*`, `/admin/participation/*` |
| **Reviewer** | 팩트체커 및 데스크 | 에디터가 올린 콘텐츠의 무결성과 SSoT 기반 증거를 확인하는 검수자입니다. 승인(Approve)하여 배포 가능한 상태로 넘기거나, 사유를 달아 반려(Return)할 수 있습니다. | [Editor](file:///c:/Users/User/culturepower/src/app/admin/content/answers/%5Bid%5D/page.tsx#7-122) 권한 + `/admin/review/*` |
| **View-Only** | 외부 감사, C레벨 임원 | 시스템 내에 어떤 자료가 올라오는지, 파트너십 문의가 어떻게 되는지 열람만 가능한 권한입니다. 어떠한 데이터도 생성/수정/삭제할 수 없습니다. | 읽기 전용으로만 화면 접근 |

## 4. 권한 적용 워크플로우 (인증 아키텍처)

현재 구축된 어드민 프레임워크는 아래와 같은 3단계 레이어(Layer)로 접근을 차단하고 있습니다.

1. **Authentication (인증 Layer)** 
   * [src/middleware.ts](file:///c:/Users/User/culturepower/src/middleware.ts)와 Supabase Auth 미들웨어를 통해 쿠키 기반 인증을 검사합니다.
   * "이 서버에 등록된 사람인가?" 만을 판별합니다.
2. **Authorization (인가/RBAC Layer)**
   * 인증된 사용자의 정보(Email 또는 UUID)를 기반으로 `public.admin_users` 테이블을 조회하여 Role을 도출합니다.
3. **Action Level Verification**
   * 서버 단 컴포넌트(`src/lib/actions/*.ts`)에서 DB 데이터를 `UPDATE` 하거나 `DELETE` 하기 전에 해당 유저의 Role이 유효한지 2차로 교차 검증합니다. (예: Editor 권한 소유자가 `/admin/settings/users` 로 강제 URL 접근 시 빈 배열을 반환받거나 접근 거부 됨)

이러한 **Vercel 호스팅 (인프라) - Supabase Auth (계정 암호) - Postgres admin_users (권한 계급)** 의 철저한 분리 원칙 덕분에, 조직의 인사가 수시로 변하더라도 코드 수정 및 재배포 없이 데이터베이스 레벨에서 즉각적인 권한 통제가 가능합니다.
