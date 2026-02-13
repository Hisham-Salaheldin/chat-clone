'use client'
import {OpenChat, SideBar} from '@/components'
import {ContactsProvider} from '@/context/ContactProvider'
import {ConversationsProvider} from '@/context/ConversationsProvider'
import {SocketProvider} from "@/context/SocketProvider"
// import {useConversation} from "@/utiles/utiles"

const Home = ({userId}) => {
  const taps = [
    {
      id: 1,
      name: 'chats',
      title: 'Chats',
      btn: 'New Chat',
      addform: {email: 'Email', input: 'Name', title: 'Add New Chat'},
    },
    {
      id: 2,
      name: 'contacts',
      title: 'Contacts',
      btn: 'New Contact',
      addform: {email: 'Email', input: 'Name', title: 'Add New Contact'},
    },
  ]
    // const {selectedConversation} = useConversation()
  return (
    <SocketProvider id={userId}>
      <ContactsProvider>
        <ConversationsProvider id={userId}>
          <div className="flex flex-col h-screen">
            {/* {userId && <div className='shrink-0'>Logged as: {userId}</div>} */}
            <div className="flex w-full flex-1">
              <SideBar taps={taps} id={userId}/>
              <OpenChat />
            </div>
          </div>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )
}

export default Home
