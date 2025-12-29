import z from "zod"

export const AuthSchema = z.object({
    _id: z.uuid(),
    permissions: z.array(z.string())
})

export type Auth = z.infer<typeof AuthSchema>