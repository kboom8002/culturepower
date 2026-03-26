import { Clock } from "lucide-react"

export interface ProgramSession {
  time: string
  title: string
  speaker?: string
}

export interface ProgramBlockProps {
  sessions: ProgramSession[]
}

export function ProgramBlock({ sessions }: ProgramBlockProps) {
  if (!sessions || sessions.length === 0) return null

  return (
    <div className="mb-12 border-t border-line-default pt-10">
      <h3 className="text-h3 text-neutral-900 mb-6">프로그램 일정</h3>
      
      <div className="border border-line-default rounded-2xl overflow-hidden bg-white">
        <div className="divide-y divide-line-default">
          {sessions.map((session, index) => (
            <div key={index} className="flex flex-col sm:flex-row p-4 hover:bg-surface-soft transition-colors gap-2 sm:gap-6">
              <div className="sm:w-32 shrink-0 flex items-center gap-1.5 text-brand-700 font-semibold text-body-sm">
                <Clock className="w-4 h-4 hidden sm:block" />
                {session.time}
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-body font-medium text-neutral-900">{session.title}</span>
                {session.speaker && (
                  <span className="text-caption text-neutral-500 mt-1">{session.speaker}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
