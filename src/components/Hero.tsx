import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { properties } from '../data/mockData'

const [photoBack, photoFront] = properties

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fdf1e2 0%, #f7e9f2 45%, #ecf1fb 100%)',
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10 lg:py-8">
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl"
          >
            What are you <span className="text-brand-gold">looking for?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-2 max-w-md text-sm text-gray-600 sm:text-base"
          >
            Chat with Lara to find homes, discover Wispr and Rumr opportunities, or find
            the right buyer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mt-4 w-full max-w-xl"
          >
            {children}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative hidden aspect-square w-full max-w-lg justify-self-center self-center lg:block lg:justify-self-end"
        >
          <div className="absolute right-0 top-0 h-[80%] w-[80%] overflow-hidden rounded-[28px] shadow-xl ring-4 ring-white">
            <img src={photoBack.images[0]} alt={photoBack.title} className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 h-[62%] w-[62%] overflow-hidden rounded-[24px] shadow-xl ring-4 ring-white">
            <img src={photoFront.images[1]} alt={photoFront.title} className="h-full w-full object-cover" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
            className="absolute -left-4 top-6 flex items-center gap-1.5 rounded-full bg-brand-purple px-3.5 py-2 text-xs font-semibold text-white shadow-lg"
          >
            <Sparkles size={13} />8 fresh matches today
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 0.5, delay: 0.65, type: 'spring' }}
            className="absolute bottom-6 right-2 rounded-full bg-brand-green px-3.5 py-2 text-xs font-semibold text-white shadow-lg"
          >
            {photoBack.price} · {photoBack.locationLabel.split(',')[0]}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
