import {z, ZodType} from "zod"

export type FormData = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export const registerUserSchema: ZodType<FormData> = z.object({
    name: z.string().min(2, {message: "Must be 2 or more characters long"}).max(30),
    email: z.string().email(),
    password: z.string().min(8, {message: "Must be 8 or more characters long"}).max(20),
    confirmPassword: z.string().min(8, {message: "Password does not match"}),
/*     profile_photo: z.string().url().nonempty(), */
}).refine(data => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"],
})

export type logInFormData = {
  email: string,
  password: string,
}

export const loginUserSchema: ZodType<logInFormData> = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Enter a valid password"}).max(20),
})