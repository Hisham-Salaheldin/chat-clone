import { useContext } from "react"
import { ContactsContext } from "../context/ContactProvider"
import { ConversationsContext } from "../context/ConversationsProvider"
import {SocketContext} from '@/context/SocketProvider'

const useContacts = () => (useContext(ContactsContext))
const useConversation = () => (useContext(ConversationsContext) )
const useSocket = () => (useContext(SocketContext))

const arrayEq = (a,b) => {
    if(a.length !== b.length) return false 
    const aSorted = [...a].sort()
    const bSorted = [...b].sort()
    return aSorted.every((e,i) => e === bSorted[i])
}
export{useContacts,useConversation,useSocket, arrayEq}