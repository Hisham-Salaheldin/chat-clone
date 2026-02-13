'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Field, FieldGroup} from '@/components/ui/field'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Button} from '@/components/ui/button'
import {useContacts,useConversation} from '@/utiles/utiles.js'
import {useState} from "react"

const ConversationDialog = ({tap}) => {
  const {contacts} = useContacts()
  const {creatConversations} = useConversation();
  const [selectedContacts, setSelectedContacts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    creatConversations(selectedContacts)
  }
  const handleCheckbox = (id) => {
    setSelectedContacts(prev => {
        if(prev.includes(id))
          return prev.filter(prevId => prevId !== id)
        else 
          return [...prev, id]
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full border-none rounded-none hover:bg-white hover:text-black">
          {tap.btn}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{tap.addform.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {
            contacts.map((contact,index) => (
                <Field className="flex flex-row gap-0 w-full">
                  <Input
                    id={index}
                    name="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    type="checkbox"
                    onChange={() => handleCheckbox(contact.id)}
                    className="size-4 w-fit"
                    />
                  <Label htmlFor="checkbox w-fit">{contact.name}</Label>
                </Field>
                ))
            }
          </FieldGroup>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ConversationDialog
