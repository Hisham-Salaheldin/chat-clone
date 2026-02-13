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
import { NavLink,useOutletContext,useNavigate} from "react-router-dom"
import { signupSchema } from "../../lib/validations/auth.schema"
import { useState} from 'react'
import axios from 'axios'
import {Eye, EyeOff} from 'lucide-react'


const SignUp = ({ ...props }) => {
  const{switchMode} = useOutletContext()
  const [errors, setErrors] = useState({})
  const [values,setValues] = useState({email:'', password:'', confirmPassword:''})
  const navigate = useNavigate()
  const [show, setToShow] = useState(false)
  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]:e.target.value}))
  }

  const creatNewId = 
    async(e) => { 
      e.preventDefault()
      const resault = signupSchema.safeParse(values)
      
      if(!resault.success){
        const fieldErrors = resault.error.flatten().fieldErrors
        return setErrors(fieldErrors)
      }

      try{
        const {name,email,password} = values
        axios.post("http://localhost:8081/signup", {name,email,password})
          navigate("/auth")
          setErrors({})
      }catch(err){console.log(err)}
  }

const confirmPasswordError = values.confirmPassword && values.confirmPassword !== values.password
                              ? "Password not match"
                              : null
  return (
    <Card {...props} className={'w-[400px]'}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={creatNewId}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name='name'
                type="text"
                placeholder="John"
                required
                onChange={handleInput}
              />
              {errors.name && (<RequiredMessage>{errors.name[0]}</RequiredMessage>)}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name='email'
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleInput}
              />
              {errors.email && (<RequiredMessage>{errors.email[0]}</RequiredMessage>)}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input id="password" name="password" type={show? "text" :"password"} required onChange={handleInput} />
                <button className="absolute flex right-0 top-[50%] -translate-y-[50%] p-2 transition cursor-pointer" onClick={(e) => { e.preventDefault(); setToShow(!show)}}>{show? <Eye size={20} strokeWidth={1} /> : <EyeOff size={20} strokeWidth={1}/>}</button>
              </div>
              {errors.password && (<RequiredMessage>{errors.password[0]}</RequiredMessage>)}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirmPassword" name='confirmPassword' type="password" required onChange={handleInput} />
              {confirmPasswordError && (<RequiredMessage>{confirmPasswordError}</RequiredMessage>)}
              {/* <FieldDescription>Please confirm your password.</FieldDescription> */}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" onClick={() => switchMode()}>Create Account</Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <NavLink to='/auth' variant="link" onClick={() => {switchMode()}} >Sign in</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUp