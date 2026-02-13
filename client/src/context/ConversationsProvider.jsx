import {createContext,
   useEffect,
    useState,
     useCallback} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'
import {
  useContacts, 
  useSocket, 
  arrayEq} from '@/utiles/utiles'

const ConversationsContext = createContext()

const ConversationsProvider = ({children, id}) => {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const {contacts} = useContacts()
  const [selectedConversationIndex, setSelectConversationIndex] = useState(0)
  
  const socket = useSocket()

  const creatConversations = (recipients) => {
    setConversations((prev) => {
      return [...prev, {recipients, messages: []}]
    })
  }
  const addConversationMessage = useCallback(
    (recipients, text, sender) => {
      setConversations((prevConv) => {
        let madeChange = false
        const newMessage = {sender, text}

        const newConversation = prevConv.map((conv) => {
          if (arrayEq(conv.recipients, recipients)) {
            madeChange = true
            return {...conv, messages: [...conv.messages, newMessage]}
          }
          return conv
        })

        if (madeChange) {
          return newConversation
        } else {
          return [...prevConv, {recipients, messages: [newMessage]}]
        }
      })
    },
    [setConversations],
  )

  const sendMessage = (recipients, text) => {
  console.log('Emitting from socket id:', socket.id)
  
  socket.emit('send-message', { recipients, text })
  addConversationMessage(recipients, text, id)
}


  useEffect(() => {
    if (socket == null) return;
   socket.on('receive-message', ({ recipients, text, sender }) => {
    addConversationMessage(recipients, text, sender)
  })
  return () => socket.off('receive-message')
});



 const removeConversation = (indexToRemove) => {
  setConversations((prev) => {
    const newConversations = prev.filter(
      (_, index) => index !== indexToRemove
    )

    if (indexToRemove === selectedConversationIndex) {
      setSelectConversationIndex(0)
    }

    return newConversations
  })
}

  const formatedConversations = conversations.map((conversation,index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => contact.id === recipient)
      const name = (contact && contact.name) || recipient
      return {id: recipient, name}
    })
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => contact.id === message.sender)
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return {id: message.sender, sender: name, fromMe, text: message.text}
    })
    const selected = index === selectedConversationIndex
    return {...conversation, recipients, selected, messages}
  })

  const value = {
    conversations: formatedConversations,
    selectedConversation: formatedConversations[selectedConversationIndex],
    creatConversations,
    removeConversation,
    selectConversationIndex: setSelectConversationIndex,
    sendMessage,
  }
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
export {ConversationsProvider, ConversationsContext}
