import z from "zod"

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(8)
})


export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id: z.number()
})



export const updateBloginput = z.object({
    title:z.string(),
    content:z.string(),
    id: z.number()
})

export type signinInput = z.infer<typeof signinInput>
export type signupInput = z.infer<typeof signupInput>
export type createBlogInput=z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBloginput>