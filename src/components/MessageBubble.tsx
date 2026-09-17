import { CircleUserRound } from 'lucide-react'
import { LARA_AVATAR_URL, type ChatMessage } from '../data/mockData'

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <CircleUserRound size={18} />
        </span>
      ) : (
        <img src={LARA_AVATAR_URL} alt="Lara" className="h-7 w-7 shrink-0 rounded-full object-cover" />
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-brand-navy text-white'
            : 'rounded-bl-sm bg-gray-100 text-gray-700'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
