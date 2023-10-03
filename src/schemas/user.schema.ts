import {object, string, TypeOf} from 'zod'


// Schema for All user related input

export const createUserSchema = object({
  // definitions for our payload
  body: object({
    name: string({
      required_error: "Name is required."
    }), 
    password: string({
      required_error: "Password is required."
    }).min(6, "Password too short, should be at least 6 chars."),
    passwordConfirmation:string({
      required_error: "Password Confirmation is required."
    }),
    email: string({
      required_error: "Email is required."
    }).email("Not a valid email.")
  }).refine((data)=> data.password === data.passwordConfirmation, {message:"Passwords do not match.", path: ["passwordConfirmation"] }) ,
  // params: ,
  // query: ,

})

export type CreateUserInput = TypeOf<typeof createUserSchema>