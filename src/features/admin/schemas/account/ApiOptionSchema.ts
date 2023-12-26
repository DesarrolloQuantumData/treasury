import { z } from 'zod'

export const ApiOptionSchema = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean().optional()
  })
  export const ListOfApiOptionSchema = z.array(ApiOptionSchema)