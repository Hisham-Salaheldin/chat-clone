import {useConversation} from '@/utiles/utiles'
import {Trash} from 'lucide-react'
import {CardContent} from '@/components/ui/card'

const Chats = () => {
  const {conversations, removeConversation, selectConversationIndex} =
    useConversation()
  return (
    <CardContent className="w-full h-full px-5">
      {conversations.map((c, i) => {
        return (
          <div className="flex w-full" key={i}>
            <button
              className={`w-full h-fit flex justify-between mb-2 p-2 ${c.selected ? 'bg-stone-200' : 'bg-white'}`}
              onClick={(e) => {
                e.preventDefault()
                selectConversationIndex(i)
              }}
            >
              <span>{c.recipients.map((r) => r.name).join(', ')}</span>
              <span
                className="cursor-pointer relative z-50"
                onClick={(e) => {
                  e.preventDefault()
                   e.stopPropagation()
                  removeConversation(i)
                }}
              >
                <Trash className={`text-red-500`} size={15} strokeWidth={1} />
              </span>
            </button>
          </div>
        )
      })}
    </CardContent>
  )
}

export default Chats
