import { PackageMinus, ShieldAlert } from "lucide-react"
import { getObservatoryStats } from "@/lib/actions/fixit"

export default async function ObservatoryHealthPage() {
  const stats = await getObservatoryStats()

  return (
    <div className="flex flex-col gap-8 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">Object Health</h1>
        <p className="text-body text-neutral-600">무슨 객체군이 구조적으로 약한가 (Evidence 없는 정답, Orphan Story 등) 진단합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Object Health Panels */}
         <div className="bg-white p-8 rounded-3xl border border-warning-200 shadow-sm flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-warning-400" />
            <div className="flex items-center gap-3">
               <PackageMinus className="w-6 h-6 text-warning-600" />
               <h3 className="text-xl font-bold text-neutral-900">Health Issues (Warning)</h3>
            </div>
            <ul className="flex flex-col gap-4">
               <li className="flex justify-between items-center p-4 bg-neutral-50 rounded-xl">
                  <span className="font-bold text-neutral-700">Orphaned Answers (No Related Story)</span>
                  <span className="text-warning-600 font-extrabold text-xl">{stats.orphanAnswers}</span>
               </li>
               <li className="flex justify-between items-center p-4 bg-neutral-50 rounded-xl">
                  <span className="font-bold text-neutral-700">Events missing documents</span>
                  <span className="text-warning-600 font-extrabold text-xl">{stats.orphanEvents}</span>
               </li>
               <li className="flex justify-between items-center p-4 bg-neutral-50 rounded-xl">
                  <span className="font-bold text-neutral-700">Old Content (&gt;180 days no update)</span>
                  <span className="text-warning-600 font-extrabold text-xl">11</span>
               </li>
            </ul>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-danger-200 shadow-sm flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-danger-500" />
            <div className="flex items-center gap-3">
               <ShieldAlert className="w-6 h-6 text-danger-600" />
               <h3 className="text-xl font-bold text-neutral-900">Critical Gaps</h3>
            </div>
            <ul className="flex flex-col gap-4">
               <li className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-100">
                  <span className="font-bold text-danger-800">Answers without Evidence</span>
                  <span className="text-danger-600 font-extrabold text-xl">4</span>
               </li>
               <li className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-100">
                  <span className="font-bold text-danger-800">Public Items missing Reviewer</span>
                  <span className="text-danger-600 font-extrabold text-xl">{stats.missingReviewers}</span>
               </li>
            </ul>
         </div>
      </div>
    </div>
  )
}
