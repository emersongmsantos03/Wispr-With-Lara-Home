import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Paperclip, Send } from 'lucide-react'
import {
  LARA_AVATAR_URL,
  getGreeting,
  quickActions,
  type ChatMessage,
  type QuickAction,
} from '../data/mockData'
import MessageBubble from './MessageBubble'
import QuickActions from './QuickActions'
import TypingIndicator from './TypingIndicator'

type Props = {
  messages: ChatMessage[]
  isTyping: boolean
  onSend: (text: string, quickActionId?: string) => void
}

export default function ChatCard({ messages, isTyping, onSend }: Props) {
  const [draft, setDraft] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  function handleQuickAction(action: QuickAction) {
    onSend(action.label, action.id)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!draft.trim()) return
    onSend(draft)
    setDraft('')
  }

  return (
    <div className="flex w-full flex-col rounded-3xl border border-white bg-white p-5 shadow-[0_24px_50px_-20px_rgba(34,50,82,0.25)] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="relative shrink-0">
          <img
            src={LARA_AVATAR_URL}
            alt="Lara"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-gold/40"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-brand-navy">
            {getGreeting()}, I'm Lara{' '}
            <motion.span
              className="inline-block origin-[70%_70%]"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
            >
              👋
            </motion.span>
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Tell me what you're looking for, and I'll help you find homes, Wispr listings,
            Rumrs, or buyers.
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="mt-5 flex max-h-80 flex-col overflow-y-auto pr-1">
        {messages.length === 0 && !isTyping && (
          <p className="py-6 text-center text-sm text-gray-400">
            Say hello, or tap a quick action below to get started ✨
          </p>
        )}
        <AnimatePresence initial={false}>
          {messages.map((message, i) => {
            const showAvatar = i === 0 || messages[i - 1].sender !== message.sender
            return (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={i === 0 ? '' : showAvatar ? 'mt-3' : 'mt-1'}
              >
                <MessageBubble message={message} showAvatar={showAvatar} />
              </motion.div>
            )
          })}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={messages.length === 0 ? '' : 'mt-3'}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 -mx-5 px-5 sm:-mx-6 sm:px-6">
        <QuickActions actions={quickActions} onSelect={handleQuickAction} />
      </div>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-4 pr-1.5 transition focus-within:border-brand-gold/40 focus-within:ring-4 focus-within:ring-brand-gold/10">
          <button
            type="button"
            className="shrink-0 text-gray-400 hover:text-gray-600"
            aria-label="Attach file"
          >
            <Paperclip size={18} />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            type="text"
            placeholder="Ask Lara anything..."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <motion.button
            type="submit"
            disabled={!draft.trim()}
            whileHover={draft.trim() ? { scale: 1.05 } : undefined}
            whileTap={draft.trim() ? { scale: 0.95 } : undefined}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            aria-label="Send message"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </form>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
        <Lock size={12} />
        Wispr listings may have limited details until requested.
      </p>
    </div>
  )
}
