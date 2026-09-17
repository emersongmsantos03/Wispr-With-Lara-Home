import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Flame, Heart, Lock, Sparkles } from 'lucide-react'
import type { Property } from '../data/mockData'

const BADGE_STYLES: Record<Property['badge'], string> = {
  Wispr: 'bg-brand-navy text-white',
  Rumr: 'bg-brand-gold text-white',
  'Matched for you': 'bg-brand-purple text-white',
}

const BADGE_ICON = {
  Wispr: Lock,
  Rumr: Flame,
  'Matched for you': Sparkles,
} as const

type Props = {
  property: Property
  isHighlighted?: boolean
  onRequest: (property: Property) => void
}

export default function PropertyCard({ property, isHighlighted, onRequest }: Props) {
  const [isSaved, setIsSaved] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [justRequested, setJustRequested] = useState(false)
  const BadgeIcon = BADGE_ICON[property.badge]

  function goTo(index: number) {
    setPhotoIndex((index + property.images.length) % property.images.length)
  }

  function handleRequest() {
    onRequest(property)
    setJustRequested(true)
    window.setTimeout(() => setJustRequested(false), 1400)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group flex flex-col"
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl ${
          isHighlighted ? 'ring-2 ring-offset-2 ring-brand-navy' : ''
        }`}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={photoIndex}
            src={property.images[photoIndex]}
            alt={property.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {property.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(photoIndex - 1)}
              className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/0 text-white opacity-0 shadow-sm transition-all hover:bg-white group-hover:bg-white/90 group-hover:text-gray-700 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => goTo(photoIndex + 1)}
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/0 text-white opacity-0 shadow-sm transition-all hover:bg-white group-hover:bg-white/90 group-hover:text-gray-700 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight size={15} />
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {property.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === photoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <span
          className={`absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${BADGE_STYLES[property.badge]}`}
        >
          <BadgeIcon size={11} />
          {property.badge}
        </span>

        <motion.button
          type="button"
          onClick={() => setIsSaved((v) => !v)}
          whileTap={{ scale: 0.8 }}
          className="absolute right-3 top-3 text-white drop-shadow-md transition-colors hover:scale-110"
          aria-label="Save property"
        >
          <motion.span
            animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart size={20} className={isSaved ? 'fill-rose-500 text-rose-500' : 'fill-black/20'} />
          </motion.span>
        </motion.button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-gray-900 transition-colors group-hover:text-brand-navy">
          {property.title}
        </h3>
      </div>
      <p className="text-sm text-gray-500">{property.locationLabel}</p>
      <p className="text-sm text-gray-500">
        {property.beds} bd · {property.baths} ba · {property.sqft.toLocaleString()} sqft
      </p>

      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-[15px] font-semibold text-gray-900">
          {property.price} <span className="font-normal text-gray-500">estimate</span>
        </p>
        <button
          type="button"
          onClick={handleRequest}
          className="text-sm font-semibold text-brand-navy underline-offset-2 hover:underline"
        >
          {justRequested ? 'Sent ✓' : property.ctaLabel}
        </button>
      </div>
    </motion.div>
  )
}
