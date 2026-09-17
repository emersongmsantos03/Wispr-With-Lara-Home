import { Minus, Plus } from 'lucide-react'
import { mapPins, properties, moreProperties } from '../data/mockData'

const allProperties = [...properties, ...moreProperties]

const LABELS = ['Irvine', 'Newport Beach', 'Laguna Beach', 'Mission Viejo', 'San Juan Capistrano', 'Dana Point', 'San Diego']

type Props = {
  highlightedPropertyId: string | null
  onHoverPin: (propertyId: string | null) => void
}

export default function MatchesMap({ highlightedPropertyId, onHoverPin }: Props) {
  return (
    <div
      className="relative h-64 w-full overflow-hidden rounded-2xl border border-white shadow-sm sm:h-full sm:min-h-[320px]"
      style={{ background: 'linear-gradient(135deg, #fdf1e2 0%, #eef1ee 55%, #ecf1fb 100%)' }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path d="M40 0 C 60 80, 20 140, 80 220 S 60 300, 100 300" stroke="#d7dcd6" strokeWidth="10" fill="none" />
        <path d="M0 60 C 120 40, 180 100, 260 90 S 380 40, 400 70" stroke="#dbe6e0" strokeWidth="6" fill="none" />
      </svg>

      {LABELS.map((label, i) => (
        <span
          key={label}
          className="absolute select-none text-[10px] font-medium text-gray-500"
          style={{
            top: `${12 + ((i * 11) % 70)}%`,
            left: `${8 + ((i * 17) % 75)}%`,
          }}
        >
          {label}
        </span>
      ))}

      {mapPins.map((pin) => {
        const property = allProperties.find((p) => p.id === pin.propertyId)
        if (!property) return null
        const isActive = pin.propertyId === highlightedPropertyId
        return (
          <button
            key={pin.id}
            type="button"
            onMouseEnter={() => onHoverPin(pin.propertyId)}
            onMouseLeave={() => onHoverPin(null)}
            onFocus={() => onHoverPin(pin.propertyId)}
            onBlur={() => onHoverPin(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: pin.top, left: pin.left }}
            aria-label={`${property.title}, ${property.price}`}
          >
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-md transition-colors ${
                isActive ? 'bg-brand-navy text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              {property.price}
            </span>
          </button>
        )
      })}

      <button
        type="button"
        className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50"
      >
        View on map
      </button>

      <div className="absolute bottom-3 right-3 flex flex-col gap-1 rounded-lg bg-white/90 p-1 shadow-sm backdrop-blur">
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Zoom in"
        >
          <Plus size={14} />
        </button>
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Zoom out"
        >
          <Minus size={14} />
        </button>
      </div>
    </div>
  )
}
