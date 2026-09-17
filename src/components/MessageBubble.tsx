import { CircleUserRound } from 'lucide-react'
import { LARA_AVATAR_URL, type ChatMessage } from '../data/mockData'

type Props = {
  message: ChatMessage
  showAvatar: boolean
}

export default function MessageBubble({ message, showAvatar }: Props) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {showAvatar ? (
        isUser ? (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <CircleUserRound size={18} />
          </span>
        ) : (
          <img src={LARA_AVATAR_URL} alt="Lara" className="h-7 w-7 shrink-0 rounded-full object-cover" />
        )
      ) : (
        <span className="w-7 shrink-0" aria-hidden />
      )}
      <div
        className={`max-w-[75%] rounded-[20px] px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-br-md bg-brand-navy text-white'
            : 'rounded-bl-md bg-[#f8f1e9] text-gray-700'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
