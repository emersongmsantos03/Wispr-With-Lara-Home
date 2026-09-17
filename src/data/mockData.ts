export const LARA_AVATAR_URL =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2.5&w=200&h=200&q=80'

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export type ChatMessage = {
  id: string
  sender: 'lara' | 'user'
  text: string
}

export const initialMessages: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'user',
    text: "I'm looking for a 3-bedroom home near the coast — open to Wispr or Rumr options.",
  },
  {
    id: 'm2',
    sender: 'lara',
    text: 'Got it. Do you have a budget or a preferred area?',
  },
  {
    id: 'm3',
    sender: 'user',
    text: 'Orange County or San Diego. Budget around $1.5M.',
  },
  {
    id: 'm4',
    sender: 'lara',
    text: "Perfect — I'll check both Wispr listings and upcoming Rumrs that fit.",
  },
]

export type QuickAction = {
  id: string
  label: string
  icon: 'lock' | 'help' | 'users' | 'home' | 'flame' | 'pin' | 'sparkles'
}

export const quickActions: QuickAction[] = [
  { id: 'wispr-buyer', label: 'Wispr buyer', icon: 'lock' },
  { id: 'rumr-buyer', label: 'Rumr buyer', icon: 'help' },
  { id: 'find-buyer', label: 'Find a buyer', icon: 'users' },
  { id: 'sell-wispr', label: 'Sell via Wispr', icon: 'home' },
  { id: 'show-rumr', label: 'See Rumrs', icon: 'flame' },
  { id: 'explore-neighborhoods', label: 'Explore neighborhoods', icon: 'pin' },
  { id: 'surprise-me', label: 'Surprise me', icon: 'sparkles' },
]

const QUICK_ACTION_REPLIES: Record<string, string> = {
  'wispr-buyer':
    "Love that 🔑 As a Wispr buyer, you're actively searching right now — so I'll prioritize homes with a signed, active agreement in place, ready to move fast on. What's your budget and must-haves?",
  'rumr-buyer':
    "No pressure at all 👀 As a Rumr buyer, you're just exploring — nothing's signed, nothing's official, just possibilities. I'll quietly flag anything interesting before it becomes a real listing. What area has your eye?",
  'find-buyer':
    "On it! 🤝 Are you hoping to reach Wispr buyers — people actively searching and ready now — or is it fine to also surface Rumr buyers who might bite later? Share the address or neighborhood and your target price to get started.",
  'sell-wispr':
    "Smart move 🔒 A Wispr means we have a signed agreement in place — your home is shared advisor-to-advisor with a real, committed listing. Never posted publicly, no strangers wandering through open houses. Want a quiet, anonymous valuation first?",
  'show-rumr':
    "These are my favorite ones 😉 Rumrs are just possibilities — no contract signed yet, nothing official, they may or may not ever become a real listing. Want me to filter by city or price range?",
  'explore-neighborhoods':
    "Happy to be your guide 🗺️ Which area are you curious about — schools, walkability, or investment growth? I can break it down for you.",
  'surprise-me':
    "Ooh, I like this energy ✨ Here's a hidden gem: a quiet 3-bed craftsman two blocks from the coast — right now it's just a Rumr, but the owner's warming up to the idea. Want me to keep you posted?",
}

const KEYWORD_REPLIES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['what is wispr', "what's wispr", 'wispr mean'],
    reply:
      "A Wispr means there's already a signed agreement in place — a real, committed deal shared quietly advisor-to-advisor, never posted publicly. 🤝",
  },
  {
    keywords: ['what is rumr', "what's rumr", 'rumr mean'],
    reply:
      "A Rumr is just a possibility — a rumor with no contract signed yet. It might turn into a real Wispr later, or it might not. Think of it as hearing about a move before anyone's decided anything. 👀",
  },
  {
    keywords: ['budget', '$', 'price', 'afford'],
    reply:
      "Good to know! 💰 That budget opens up some great Wispr listings. Want me to prioritize move-in-ready homes, or are you open to a fixer-upper for a better price?",
  },
  {
    keywords: ['coast', 'beach', 'ocean', 'waterfront'],
    reply:
      "Coastal living, great taste 🌊 I have a few Wispr homes near the water that never made it to public listings, plus a couple of Rumrs about to drop. Want me to shortlist them?",
  },
  {
    keywords: ['bedroom', 'bed', 'bd'],
    reply:
      "Got the bedroom count noted 🛏️ Any preference on layout — single story, or fine with multiple levels?",
  },
  {
    keywords: ['sell', 'selling'],
    reply:
      "Selling can feel like a big step 🏠 I'll keep it on Wispr — private and pressure-free. Want a quick, no-obligation estimate of what buyers might offer?",
  },
  {
    keywords: ['buy', 'buyer', 'buying', 'purchase'],
    reply:
      "Exciting! 🔑 Quick question first — are you actively searching right now (that makes you a Wispr buyer), or just curious about what's out there (a Rumr buyer)? Either way, I'll tailor what I show you.",
  },
  {
    keywords: ['agent', 'realtor', 'broker'],
    reply:
      "I work alongside a small group of trusted local advisors 🤝 Once you're ready, I'll pass your search along so one of them can follow up directly.",
  },
  {
    keywords: ['neighborhood', 'area', 'orange county', 'san diego', 'school'],
    reply:
      "That area has some hidden pockets buyers usually miss 🗺️ Want me to send a quick breakdown of pricing trends there?",
  },
  {
    keywords: ['thank', 'thanks', 'awesome', 'great', 'perfect'],
    reply: "Anytime! 😊 I'm here whenever you're ready to dig deeper — just say the word.",
  },
]

const GENERIC_REPLIES: string[] = [
  "Got it, noted! 📝 Tell me a bit more so I can fine-tune your Wispr and Rumr matches.",
  "Love that 😊 I'll factor that into your search right away.",
  "Great to know! Want me to show you a couple of options that fit so far?",
  "Noted! The more details you share, the sharper my matches get 🎯",
]

export function getLaraReply(userText: string, quickActionId?: string): string {
  if (quickActionId && QUICK_ACTION_REPLIES[quickActionId]) {
    return QUICK_ACTION_REPLIES[quickActionId]
  }

  const lower = userText.toLowerCase()
  const matched = KEYWORD_REPLIES.find((entry) =>
    entry.keywords.some((keyword) => lower.includes(keyword)),
  )
  if (matched) return matched.reply

  return GENERIC_REPLIES[Math.floor(Math.random() * GENERIC_REPLIES.length)]
}

export const typingStatuses: string[] = [
  'Lara is typing...',
  'Searching Wispr listings...',
  'Checking fresh Rumrs...',
]

export type PropertyBadge = 'Wispr' | 'Rumr' | 'Matched for you'

export type Property = {
  id: string
  title: string
  badge: PropertyBadge
  locationLabel: string
  beds: number
  baths: number
  sqft: number
  price: string
  images: string[]
  ctaLabel: string
}

const PHOTO_POOL = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
]

function gallery(index: number): string[] {
  return [
    PHOTO_POOL[index % PHOTO_POOL.length],
    PHOTO_POOL[(index + 1) % PHOTO_POOL.length],
    PHOTO_POOL[(index + 3) % PHOTO_POOL.length],
  ]
}

export const properties: Property[] = [
  {
    id: 'p1',
    title: 'Modern Coastal Home',
    badge: 'Wispr',
    locationLabel: 'Newport Beach, CA',
    beds: 3,
    baths: 2,
    sqft: 2400,
    price: '$1.45M',
    images: gallery(0),
    ctaLabel: 'Request details',
  },
  {
    id: 'p2',
    title: 'Private Family Home',
    badge: 'Rumr',
    locationLabel: 'Laguna Beach, CA',
    beds: 3,
    baths: 2,
    sqft: 2100,
    price: '$1.28M',
    images: gallery(1),
    ctaLabel: 'Track this Rumr',
  },
  {
    id: 'p3',
    title: 'Ocean View Match',
    badge: 'Matched for you',
    locationLabel: 'San Diego, CA',
    beds: 3,
    baths: 3,
    sqft: 2500,
    price: '$1.62M',
    images: gallery(2),
    ctaLabel: 'View match',
  },
]

export const moreProperties: Property[] = [
  {
    id: 'p4',
    title: 'Hillside Retreat',
    badge: 'Wispr',
    locationLabel: 'Irvine, CA',
    beds: 4,
    baths: 3,
    sqft: 2800,
    price: '$1.9M',
    images: gallery(3),
    ctaLabel: 'Request details',
  },
  {
    id: 'p5',
    title: 'Craftsman Bungalow',
    badge: 'Rumr',
    locationLabel: 'Dana Point, CA',
    beds: 3,
    baths: 2,
    sqft: 1900,
    price: '$1.1M',
    images: gallery(4),
    ctaLabel: 'Track this Rumr',
  },
  {
    id: 'p6',
    title: 'Sunset Terrace Villa',
    badge: 'Matched for you',
    locationLabel: 'Mission Viejo, CA',
    beds: 4,
    baths: 3,
    sqft: 3100,
    price: '$2.3M',
    images: gallery(5),
    ctaLabel: 'View match',
  },
  {
    id: 'p7',
    title: 'Garden District Home',
    badge: 'Wispr',
    locationLabel: 'San Juan Capistrano, CA',
    beds: 3,
    baths: 2,
    sqft: 2200,
    price: '$1.35M',
    images: gallery(6),
    ctaLabel: 'Request details',
  },
  {
    id: 'p8',
    title: 'Quiet Cul-de-Sac Gem',
    badge: 'Rumr',
    locationLabel: 'Orange County, CA',
    beds: 3,
    baths: 2,
    sqft: 2050,
    price: '$1.05M',
    images: gallery(7),
    ctaLabel: 'Track this Rumr',
  },
]

export type MapPin = {
  id: string
  top: string
  left: string
  propertyId: string
}

export const mapPins: MapPin[] = [
  { id: 'pin1', top: '26%', left: '40%', propertyId: 'p1' },
  { id: 'pin2', top: '50%', left: '24%', propertyId: 'p2' },
  { id: 'pin3', top: '64%', left: '60%', propertyId: 'p3' },
  { id: 'pin4', top: '78%', left: '40%', propertyId: 'p2' },
]

export type ChatThread = {
  id: string
  title: string
  date: string
  messages: ChatMessage[]
}

export function todayLabel(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${d.getFullYear()}`
}

export function createThread(): ChatThread {
  return {
    id: `thread-${Date.now()}`,
    title: 'New Chat',
    date: todayLabel(),
    messages: [],
  }
}

export const initialThreads: ChatThread[] = [
  {
    id: 'thread-demo',
    title: 'New Chat',
    date: '07/24/2024',
    messages: initialMessages,
  },
]
