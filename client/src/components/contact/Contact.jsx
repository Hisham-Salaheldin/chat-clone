import { useContacts } from "@/utiles/utiles"
import { Trash } from "lucide-react"
import {CardContent} from "@/components/ui/card"

const Contact = () => {
    const {contacts,removeContact} = useContacts()
  return (
    <CardContent className="w-full h-full px-5">
        {
            contacts.map((contact)=> {
              return (
                <div key={contact.name} className="w-full h-fit flex justify-between mb-2">
                    {contact.name}
                    <button className="cursor-pointer" onClick={(e)=> {e.preventDefault(); removeContact(contact.id)} }><Trash className="text-red-500" size={15} strokeWidth={1}/></button>
                </div>
                )
          })
        }
    </CardContent>
  )
}

export default Contact