import { useState } from "react"
import {Container} from '@/components'
import {Loader2} from 'lucide-react'
import { Outlet } from "react-router-dom"
const Auth = ({onIdSubmit}) => {
    const [loading, setLoading] = useState(false)
    const switchMode = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        },100)
    }
  return (
    <>
        {loading && <div className="w-full h-screen absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-99 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/></div>}
        <Container className='w-full py-10 h-[100%] flex items-center justify-center'>
            <div>
                <Outlet context={{switchMode,onIdSubmit}} />
            </div>
        </Container>
    </>
  )
}

export default Auth