import { motion } from 'framer-motion'
import { Flame, HelpCircle, Home, Lock, MapPinned, Sparkles, Users } from 'lucide-react'
import type { QuickAction } from '../data/mockData'

const ICONS = {
  lock: Lock,
  help: HelpCircle,
  users: Users,
  home: Home,
  flame: Flame,
  pin: MapPinned,
  sparkles: Sparkles,
} as const

const STYLES: Record<QuickAction['icon'], string> = {
  lock: 'bg-brand-navy/15 text-brand-navy',
  help: 'bg-brand-gold/15 text-brand-gold',
  users: 'bg-brand-purple/15 text-brand-purple',
  home: 'bg-brand-navy/15 text-brand-navy',
  flame: 'bg-brand-gold/15 text-brand-gold',
  pin: 'bg-brand-green/15 text-brand-green',
  sparkles: 'bg-cyan-100 text-cyan-500',
}

const CHIP_STYLES: Record<QuickAction['icon'], string> = {
  lock: 'bg-brand-navy/5 border-brand-navy/15 hover:border-brand-navy/40',
  help: 'bg-brand-gold/5 border-brand-gold/15 hover:border-brand-gold/40',
  users: 'bg-brand-purple/5 border-brand-purple/15 hover:border-brand-purple/40',
  home: 'bg-brand-navy/5 border-brand-navy/15 hover:border-brand-navy/40',
  flame: 'bg-brand-gold/5 border-brand-gold/15 hover:border-brand-gold/40',
  pin: 'bg-brand-green/5 border-brand-green/15 hover:border-brand-green/40',
  sparkles: 'bg-cyan-50 border-cyan-100 hover:border-cyan-300',
}

type Props = {
  actions: QuickAction[]
  onSelect: (action: QuickAction) => void
}

export default function QuickActions({ actions, onSelect }: Props) {
  return (
    <div className="no-scrollbar -mb-1 flex gap-2 overflow-x-auto pb-1">
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
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors ${CHIP_STYLES[action.icon]}`}
          >
            <motion.span
              variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -10, scale: 1.1 } }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${STYLES[action.icon]}`}
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
