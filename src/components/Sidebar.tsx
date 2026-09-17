import { useState } from 'react'
import { ChevronDown, ChevronRight, PanelLeft, Plus, Sparkles } from 'lucide-react'
import type { ChatThread } from '../data/mockData'

type Props = {
  threads: ChatThread[]
  activeThreadId: string
  onSelectThread: (id: string) => void
  onNewChat: () => void
}

export default function Sidebar({ threads, activeThreadId, onSelectThread, onNewChat }: Props) {
  const [isLaraOpen, setIsLaraOpen] = useState(true)
  const [isCopyOpen, setIsCopyOpen] = useState(true)

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-100 bg-white px-3 py-4 lg:flex">
      <div className="mb-4 flex items-center justify-between px-1">
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={18} />
        </button>
      </div>

      <button
        type="button"
        onClick={onNewChat}
        className="group mb-4 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
      >
        <Plus size={16} className="transition-transform duration-300 group-hover:rotate-90" />
        New chat
      </button>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setIsLaraOpen((v) => !v)}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
        >
          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold text-white">
            <Sparkles size={14} />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-gray-800">
              Lara Gabriela
            </span>
            <span className="block truncate text-xs text-gray-400">
              Your Wispr &amp; Rumr specialist
            </span>
          </span>
          {isLaraOpen ? (
            <ChevronDown size={16} className="shrink-0 text-gray-400" />
          ) : (
            <ChevronRight size={16} className="shrink-0 text-gray-400" />
          )}
        </button>
      </div>

      <div className="mt-2 flex flex-col gap-1 border-t border-gray-100 pt-2">
        <button
          type="button"
          onClick={() => setIsCopyOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <span className="flex items-baseline gap-1">
            Chat with
            <span className="logo-gradient-text font-script text-lg leading-none">lara</span>
            (copy)
          </span>
          {isCopyOpen ? (
            <ChevronDown size={16} className="text-gray-400" />
          ) : (
            <ChevronRight size={16} className="text-gray-400" />
          )}
        </button>

        {isCopyOpen &&
          threads.map((thread) => {
            const isActive = thread.id === activeThreadId
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => onSelectThread(thread.id)}
                className={`flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition-colors ${
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium text-gray-700">{thread.title}</span>
                <span className="text-xs text-gray-400">{thread.date}</span>
              </button>
            )
          })}
      </div>
    </aside>
  )
}
