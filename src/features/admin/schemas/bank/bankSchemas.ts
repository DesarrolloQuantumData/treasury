import { string, z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
  required: 'Campo requerido'
}

export const modalBankFormSchema = z.object({
  code: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(4, 'Solo puede escribir un limite de 4 caracteres')
    .regex(NUMBER_REGEX, 'Solo puede ingresar números'),
  name: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(50, 'Solo puede escribir un limite de 50 caracteres'),
  nit: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(15, 'Solo puede escribir un limite de 15 caracteres')
    .regex(NUMBER_REGEX, 'Solo puede ingresar números'),
  nameConventionFile: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(20, 'Solo puede escribir un limite de 50 caracteres')
})

export type BankFormValues = z.infer<typeof modalBankFormSchema>
