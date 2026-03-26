export default function ContentDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 capitalize tracking-tight">content Hub</h1>
        <p className="text-body text-neutral-600">Overview and metrics for the content module.</p>
      </div>
      <div className="bg-white p-12 rounded-2xl border border-line-default shadow-sm min-h-[400px] flex items-center justify-center">
        <p className="text-neutral-500 font-medium">No recent activity in content. UI is waiting implementation.</p>
      </div>
    </div>
  )
}
