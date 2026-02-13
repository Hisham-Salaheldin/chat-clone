import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {RequiredMessage} from '@/components'
import {useState,} from "react"
import {NavLink, useOutletContext, useNavigate} from 'react-router-dom'
import { LoginSchema } from "@/lib/validations/auth.schema"
import axios from 'axios'
import {Eye, EyeOff} from 'lucide-react'
import {v4 as uuidv4} from 'uuid'
const Login = ({className,...props}) => {

  const{switchMode, onIdSubmit} = useOutletContext()
  const [values, setValues] = useState({email:'',password:''})
  const [errors,setErrors] = useState({})
  const [show, setToShow] = useState(false)

  const navigate = useNavigate()

  const handleInput = (e) => { 
    setValues(prev => ({...prev, 
      [e.target.name] : e.target.value
    }) )
   }
  const handleSubmit =
        async(e) => { 
              e.preventDefault()
              const resault = LoginSchema.safeParse(values)
              
              if(!resault.success){
                const fieldErrors = resault.error.flatten().fieldErrors
                console.log(fieldErrors)
                return setErrors(fieldErrors)
              }
        
              try{
                const response = await axios.post("http://localhost:8081/login", values)
                if(response.data.success)
                 {
                  navigate("/")
                  setErrors({})
                  onIdSubmit(uuidv4())
                 }else {setErrors({ general: [response.data.message] })}
              }catch(err){ 
                if(err.response)
                {
                  console.log(err.response.data.message)
                  setErrors({general: err.response.data.message})
                }
                else setErrors({ general : ["Server error, try again later"]})
              }
        }

  return (
    <div className={cn("flex flex-col gap-6 w-[400px]", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@user.com"
                  onChange={handleInput}
                  required
                />
                {errors.email && (<RequiredMessage>{errors.email}</RequiredMessage>)}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                    <Input id="password" name="password" type={show? "text" : "password"} onChange={handleInput} required />
                    <button className="absolute flex right-0 top-[50%] -translate-y-[50%] p-2 transition cursor-pointer" onClick={(e) => {e.preventDefault(); setToShow(!show)}}>{show? <Eye size={20} strokeWidth={1} /> : <EyeOff size={20} strokeWidth={1}/>}</button>
                </div>
                {errors.password && (<RequiredMessage>{errors.password[0]}</RequiredMessage>)}
              </Field>
              <div className="w-full">{errors.general && (<RequiredMessage>{errors.general}</RequiredMessage>)}</div>
              <Field>
                <Button type="submit" >Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <NavLink to='signup' onClick={() => {switchMode()}}>Sign up</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default Login