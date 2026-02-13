import {useCallback, useState} from 'react'
import {Button} from '@/components/ui/button'
import {SendHorizontal} from 'lucide-react'
import {useConversation} from '@/utiles/utiles'
const OpenChat = () => {
  const [text, setText] = useState('')
  const {sendMessage,selectedConversation,} = useConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(selectedConversation.recipients.map(r => (r.id)))
    console.log(text)
    sendMessage(selectedConversation.recipients.map(r => (r.id)),text)
    setText('')
  }
  const setRef = useCallback((node) => {
    if(node) node.scrollIntoView({behavior: "smooth"})
  },[])

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <div className={`flex-1 flex-col mt-1 justify-end overflow-y-auto p-4 space-y-2`}>
        {selectedConversation?.messages?.map((message,index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
           return<div ref={lastMessage? setRef : null} className={`w-full flex flex-col ${message.fromMe? 'items-end' : "items-start"}`}>
                <div key={index} className={`${message.fromMe? "bg-white" : "bg-stone-200"} relative w-fit p-2 rounded after:absolute after:content-[''] after:w-0 after:h-0 after:border-t-[8px] after:rounded ${message.fromMe? "after:border-t-white" : "after:border-t-stone-200"} after:border-x-[8px] after:border-x-transparent after:top-0 ${message.fromMe? "after:-right-2" : "after:-left-2"}`}>
                    <div className='text-gray-400 text-xs'>{message.fromMe? "you" : message.sender}</div>
                    <div className="text-sm text-gray-700">{message.fromMe? message.text : message.text}</div>
                </div>
            </div>
        })}
      </div>

      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 resize-none h-10 max-h-32 overflow-y-auto p-2"
          />
          <Button
            type="submit"
            className="flex items-center justify-center p-2"
          >
            <SendHorizontal className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default OpenChat
