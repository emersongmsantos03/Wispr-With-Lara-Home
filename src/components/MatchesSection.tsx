import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { moreProperties, properties, type Property } from '../data/mockData'
import MatchesMap from './MatchesMap'
import PropertyCard from './PropertyCard'

export default function MatchesSection() {
  const [showAll, setShowAll] = useState(false)
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const visibleProperties: Property[] = showAll ? [...properties, ...moreProperties] : properties

  function handleRequest(property: Property) {
    setToast(`Request sent for "${property.title}" — Lara will follow up shortly.`)
    window.setTimeout(() => setToast(null), 3200)
  }

  return (
    <section className="border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Homes Lara found for you</h2>
            <p className="text-sm text-gray-500">Wispr and Rumr opportunities based on your search.</p>
          </div>
          {!showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="shrink-0 whitespace-nowrap text-sm font-semibold text-gray-900 underline-offset-2 hover:underline"
            >
              Show all 8
            </button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="order-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:order-1 lg:col-span-2 lg:grid-cols-2">
            <AnimatePresence initial={false}>
              {visibleProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isHighlighted={property.id === highlightedPropertyId}
                  onRequest={handleRequest}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-1">
            <div className="sticky top-4">
              <MatchesMap highlightedPropertyId={highlightedPropertyId} onHoverPin={setHighlightedPropertyId} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm text-white shadow-lg"
          >
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
