import { Button } from "@/components/ui/button"
import { login } from "./actions"

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const resolvedParams = await searchParams
  return (
    <div className="min-h-screen bg-surface-muted flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-h2 text-brand-900">M-SSoT Admin Login</h2>
        <p className="mt-2 text-center text-body-sm text-neutral-600">
          문화강국네트워크 에디터 및 관리자 전용
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-line-default">
          {resolvedParams?.error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              이메일 또는 비밀번호가 올바르지 않습니다.
            </div>
          )}
          <form className="space-y-6" action={login}>
            <div>
              <label htmlFor="email" className="block text-body-sm font-medium text-neutral-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-line-strong rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-body-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-line-strong rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button type="submit" variant="primary" className="w-full justify-center">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
