import { useState } from 'react'
import { motion } from 'framer-motion'
import ChatCard from './components/ChatCard'
import Header from './components/Header'
import Hero from './components/Hero'
import MatchesSection from './components/MatchesSection'
import Sidebar from './components/Sidebar'
import {
  createThread,
  getLaraReply,
  initialThreads,
  type ChatMessage,
  type ChatThread,
} from './data/mockData'

function App() {
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads)
  const [activeThreadId, setActiveThreadId] = useState(initialThreads[0].id)
  const [typingThreadId, setTypingThreadId] = useState<string | null>(null)

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? threads[0]

  function handleNewChat() {
    const thread = createThread()
    setThreads((prev) => [thread, ...prev])
    setActiveThreadId(thread.id)
  }

  function handleSend(text: string, quickActionId?: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const threadId = activeThreadId
    const userMessage: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: trimmed }

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [...t.messages, userMessage],
              title: t.title === 'New Chat' && t.messages.length === 0 ? trimmed.slice(0, 28) : t.title,
            }
          : t,
      ),
    )
    setTypingThreadId(threadId)

    window.setTimeout(() => {
      setTypingThreadId((current) => (current === threadId ? null : current))
      const replyText = getLaraReply(trimmed, quickActionId)
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? { ...t, messages: [...t.messages, { id: `l-${Date.now()}`, sender: 'lara', text: replyText }] }
            : t,
        ),
      )
    }, 1100)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onNewChat={handleNewChat}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="relative flex-1 overflow-y-auto bg-[#fdfaf6]">
          <Hero>
            <ChatCard
              key={activeThread.id}
              messages={activeThread.messages}
              isTyping={typingThreadId === activeThread.id}
              onSend={handleSend}
            />
          </Hero>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="mt-10"
          >
            <MatchesSection />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default App
