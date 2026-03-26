/**
 * Release Gate Validation Script (18_릴리즈/런칭 게이트 검증 체크리스트 반영)
 * CI/CD 파이프라인(Vercel Build Command)에서 최우선으로 실행되어 프로덕션 장애를 차단합니다.
 */

function runReleaseChecks() {
  console.log("Running Media SSoT Release Gate Checks...");
  let hasErrors = false;

  // 1. 필수 환경 변수 주입 검증
  const requiredEnvs = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  for (const envVar of requiredEnvs) {
    if (!process.env[envVar]) {
      console.error(`[FATAL] Missing required environment variable: ${envVar}`);
      hasErrors = true;
    }
  }

  // 2. 만약 에러 속성이 있으면 빌드 프로세스를 Exit 1로 즉각 폭파하여 안전 보장
  if (hasErrors) {
    console.error("❌ Release Gate Failed. Blocking deployment to prevent production crash.");
    process.exit(1);
  } else {
    console.log("✅ All Release Gate environment checks passed. Continuing build...");
    process.exit(0);
  }
}

runReleaseChecks();
