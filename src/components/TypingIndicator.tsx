import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LARA_AVATAR_URL, typingStatuses } from '../data/mockData'

export default function TypingIndicator() {
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % typingStatuses.length)
    }, 900)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="flex items-end gap-2">
      <img src={LARA_AVATAR_URL} alt="Lara" className="h-7 w-7 shrink-0 rounded-full object-cover" />
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-gray-400"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={statusIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gray-400"
          >
            {typingStatuses[statusIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
