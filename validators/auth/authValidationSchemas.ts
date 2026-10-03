import z from "zod"


export const loginFormSchema = z.object({
    email: z.email("Enter a valid email").refine((email)=>email.toLocaleLowerCase().endsWith("baforcemultiplier.com"), "Only baforcemultiplier emails are accepted"),
    password: z.string().min(6,"Password must be at least 6 characters long"),
})
export type LoginFormData = z.infer<typeof loginFormSchema>

export const adminLoginFormSchema = z.object({
    
    email:z.email("Enter a valid email"),
    password: z.string().min(6,"Password must be at least 6 characters long"),
})
export type AdminLoginFormData = z.infer<typeof adminLoginFormSchema>


//alternate login form schema

//this regex will only allow emails from the baforcemultiplier.com domain
const  institutionalDomainOnlyRegex = /^[a-zA-Z0-9._%+-]+@baforcemultiplier\.com$/ 
export const loginFormSchema2 = z.object({
    email: z.email("Enter a valid email").regex(institutionalDomainOnlyRegex,{message:"Only baforcemultiplier emails are accepted"}),
    password: z.string().min(6,"Password must be at least 6 characters long"),
})



//"kehinde.khourie@baforcemultiplier.com"