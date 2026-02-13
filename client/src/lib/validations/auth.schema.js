import {z} from 'zod'

const LoginSchema = z.object({
    email : z.string()
             .min(3,"Email is required")
             .email({message:"Inavalid Email address"}),
    password : z.string()
                .min(8,"password must be at least 8 character")
                .regex(/[A-Z]/, {message: "Must containen at least one Uppercase"})
                .regex(/[a-z]/, {message: "Must containen at least one Lowercase"})
                .regex(/[0-9]/, {message: "Must containen at least one number"}),
})

const signupSchema = z.object({
    name : z.string()
            .min(3,"name is too short"),
    email : z.string()
             .email({message:"Inavalid Email address"}),
    password : z.string()
                .min(8,"password must be at least 8 character")
                .regex(/[A-Z]/, {message: "Must containen at least one Uppercase"})
                .regex(/[a-z]/, {message: "Must containen at least one Lowercase"})
                .regex(/[0-9]/, {message: "Must containen at least one number"}),
    confirmPassword : z.string()
                        .min(1,"Please confirm your password")
                        .refine((data) => data.password === data.confirmPassword,
                            {message: "Passowrd dose not match", path:['confirmPassword']}
                        )



})
export {LoginSchema,signupSchema}