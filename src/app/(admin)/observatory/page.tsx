import { Activity, ShieldCheck, Zap, PieChart, TrendingUp, BarChart3, Clock } from "lucide-react"

export default function ObservatoryDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold text-neutral-900 capitalize tracking-tight flex items-center gap-3">
          Observatory Hub 
        </h1>
        <p className="text-body text-neutral-600">
          SSoT 시스템의 핵심 건강 지표(KPI)와 퍼블릭 탐색 경험의 완전성을 관측하는 분석 센터입니다.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-2">
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
             <div className="flex flex-col">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Trust Health</h3>
              <p className="text-xs text-neutral-400">근거가 연동된 정답카드 비율</p>
             </div>
             <ShieldCheck className="w-8 h-8 text-trust-text" />
          </div>
          <div className="text-[40px] font-extrabold text-neutral-900 tracking-tight">92<span className="text-[20px] text-neutral-400">%</span></div>
          <div className="w-full bg-neutral-100 rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-trust-500 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
          <p className="text-xs font-bold text-success-600 mt-3 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +2% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:shadow-md transition-shadow">
           <div className="flex items-center justify-between mb-4">
             <div className="flex flex-col">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Question Coverage</h3>
              <p className="text-xs text-neutral-400">Inbox 질문 대비 정답 생성률</p>
             </div>
             <PieChart className="w-8 h-8 text-brand-500" />
          </div>
          <div className="text-[40px] font-extrabold text-neutral-900 tracking-tight">64<span className="text-[20px] text-neutral-400">%</span></div>
           <div className="w-full bg-neutral-100 rounded-full h-2 mt-4 flex overflow-hidden">
            <div className="bg-brand-500 h-2" style={{ width: '64%' }}></div>
            <div className="bg-danger-400 h-2" style={{ width: '12%' }}></div>
          </div>
          <div className="flex items-center gap-3 mt-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-brand-700"><div className="w-2 h-2 rounded-full bg-brand-500"></div> Covered</span>
            <span className="flex items-center gap-1 text-danger-600"><div className="w-2 h-2 rounded-full bg-danger-400"></div> Dropped</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
             <div className="flex flex-col">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide">TTI (Time to Information)</h3>
              <p className="text-xs text-neutral-400">퍼블릭 검색 후 정답 도달 시간</p>
             </div>
             <Zap className="w-8 h-8 text-orange-500" />
          </div>
          <div className="text-[40px] font-extrabold text-neutral-900 tracking-tight">1.2<span className="text-[20px] text-neutral-400 font-medium">s</span></div>
          <div className="mt-4 flex gap-1">
             {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-sm ${i < 4 ? 'bg-orange-400' : 'bg-neutral-100'}`}></div>
             ))}
          </div>
          <p className="text-xs font-bold text-neutral-500 mt-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Faster than 80% of gov sites</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm min-h-[300px] flex flex-col">
          <h3 className="text-[18px] font-bold text-neutral-900 mb-1 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-neutral-400" /> Category Distribution
          </h3>
          <p className="text-xs text-neutral-500 mb-6">어떤 주제의 정답카드(AnswerCard)가 가장 많이 생산되고 있는지 보여줍니다.</p>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-line-strong rounded-xl bg-neutral-50">
            <p className="text-sm font-medium text-neutral-400">Chart rendering area (e.g. Recharts / Chart.js)</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line-default shadow-sm min-h-[300px] flex flex-col">
          <h3 className="text-[18px] font-bold text-neutral-900 mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-neutral-400" /> AI Feed Consumption Logs
          </h3>
          <p className="text-xs text-neutral-500 mb-6">외부 LLM 봇들이 NDJSON 피드를 얼마나 자주 긁어가는지 추적합니다.</p>
          <div className="flex-1 flex flex-col gap-3">
             <div className="p-3 bg-neutral-50 border border-line-soft rounded-lg flex items-center justify-between text-sm">
                <div className="font-bold text-neutral-700">Perplexity Bot</div>
                <div className="text-neutral-500 font-mono">10 mins ago</div>
             </div>
             <div className="p-3 bg-neutral-50 border border-line-soft rounded-lg flex items-center justify-between text-sm">
                <div className="font-bold text-neutral-700">ChatGPT-User</div>
                <div className="text-neutral-500 font-mono">1 hour ago</div>
             </div>
             <div className="p-3 bg-neutral-50 border border-line-soft rounded-lg flex items-center justify-between text-sm">
                <div className="font-bold text-neutral-700">GoogleOther</div>
                <div className="text-neutral-500 font-mono">Yesterday</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
