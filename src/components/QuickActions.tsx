import { motion } from 'framer-motion'
import { Home, Lock, MapPinned, Sparkles, Tag, Users } from 'lucide-react'
import type { QuickAction } from '../data/mockData'

const ICONS = {
  home: Home,
  users: Users,
  tag: Tag,
  lock: Lock,
  pin: MapPinned,
  sparkles: Sparkles,
} as const

const STYLES: Record<QuickAction['icon'], string> = {
  home: 'bg-sky-50 text-sky-500',
  users: 'bg-brand-purple/10 text-brand-purple',
  tag: 'bg-amber-50 text-amber-500',
  lock: 'bg-rose-50 text-rose-500',
  pin: 'bg-brand-green/10 text-brand-green',
  sparkles: 'bg-cyan-50 text-cyan-500',
}

type Props = {
  actions: QuickAction[]
  onSelect: (action: QuickAction) => void
}

export default function QuickActions({ actions, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, i) => {
        const Icon = ICONS[action.icon]
        return (
          <motion.button
            key={action.id}
            type="button"
            onClick={() => onSelect(action)}
            initial="rest"
            animate="visible"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            variants={{
              rest: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.05 } },
              hover: { scale: 1.04, y: -1 },
            }}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900"
          >
            <motion.span
              variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -10, scale: 1.1 } }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex h-5 w-5 items-center justify-center rounded-full ${STYLES[action.icon]}`}
            >
              <Icon size={12} />
            </motion.span>
            {action.label}
          </motion.button>
        )
      })}
    </div>
  )
}
