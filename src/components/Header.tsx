import { ChevronDown, Home, Menu, CircleUserRound } from 'lucide-react'

const navItems = ['Buy', 'Sell', 'Off-Market', 'Find an Agent', 'Market Insights']

export default function Header() {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-white">
          <Home size={16} />
        </span>
        <span className="text-lg font-semibold text-brand-navy">
          Wispr with{' '}
          <span className="logo-gradient-text font-script text-2xl leading-none">lara</span>
        </span>
      </div>

      <nav className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
        {navItems.map((item) => (
          <a key={item} href="#" className="hover:text-gray-900">
            {item}
          </a>
        ))}
        <button type="button" className="flex items-center gap-1 hover:text-gray-900">
          More
          <ChevronDown size={14} />
        </button>
      </nav>

      <button
        type="button"
        className="flex items-center gap-3 rounded-full border border-gray-200 py-1.5 pl-3 pr-1.5 shadow-sm transition-shadow hover:shadow-md"
        aria-label="Account menu"
      >
        <Menu size={16} className="text-gray-600" />
        <CircleUserRound size={28} className="text-gray-500" />
      </button>
    </header>
  )
}
