"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import { useContacts } from "@/utiles/utiles.js"
import {useRef} from 'react'


const ContactDialog = ({tap}) => {
    const {creatContacts} = useContacts()
    const emailRef = useRef()
    const nameRef = useRef()
    const idRef  = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        creatContacts(idRef.current.value,emailRef.current.value,nameRef.current.value)
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
                <Button className="w-full border-none rounded-none hover:bg-white hover:text-black">{tap.btn}</Button>
        </DialogTrigger>
        <DialogContent
            className="sm:max-w-sm"
        >
            <DialogHeader>
                <DialogTitle>{tap.addform.title}</DialogTitle>
            </DialogHeader>
        <form onSubmit={handleSubmit}>
            <FieldGroup>
            <Field>
                <Label htmlFor="id">Id</Label>
                <Input id="id" ref={idRef} name="id" type="text" requiured/>
            </Field>
            <Field>
                <Label htmlFor="name">{tap.addform.input}</Label>
                <Input id="name" ref={nameRef} name="name" type="text" palceholder="Pedro Duarte" />
            </Field>
            <Field>
                <Label htmlFor="email">{tap.addform.email}</Label>
                <Input id="email" ref={emailRef} name="email" type="email" palceholder="@peduarte" />
            </Field>
            </FieldGroup>
            <DialogFooter  className="mt-2">
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

export default ContactDialog