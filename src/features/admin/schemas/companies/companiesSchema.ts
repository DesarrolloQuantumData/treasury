import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

export const modalCompaniesFormSchema = z.object({
  nit: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(20, 'Solo puede escribir un limite de 20 caracteres')
    .regex(NUMBER_REGEX, 'Solo puede ingresar números'),
  shortName: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(3, 'Solo puede escribir un limite de 3 caracteres'),
  fullName: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(50, 'Solo puede escribir un limite de 50 caracteres')
})

export type CompaniesFormValues = z.infer<typeof modalCompaniesFormSchema>
