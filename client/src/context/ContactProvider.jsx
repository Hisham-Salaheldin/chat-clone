import {createContext} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'

const ContactsContext = createContext()

const ContactsProvider = ({children}) => {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const creatContacts = (id, email, name) => {
    setContacts((prev) => {
      return [...prev, {id, email, name}]
    })
  }
  const removeContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
  }
  return (
    <ContactsContext.Provider value={{contacts, creatContacts, removeContact}}>
      {children}
    </ContactsContext.Provider>
  )
}
export {ContactsProvider, ContactsContext}
