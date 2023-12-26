import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

export const TEXT_REGEX = /^[aA-zZ\s]+$/

const messages = {
  required: 'Campo requerido'
}

export const modalAccountFormSchema = z.object({

  companyId: z.string().pipe(z.coerce.number().positive(messages.required)),

  bankId: z.string().pipe(z.coerce.number().positive(messages.required)),
  
  accountNumber: z.string().min(1, messages.required).max(20, 'Maximo 20 caracteres'),
  
  accountTypeId: z.string().pipe(z.coerce.number().positive(messages.required)),

  description: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(100, 'Solo puede escribir un limite de 100 caracteres'),

  interfaceId: z.string().pipe(z.coerce.number().positive(messages.required)),

  specialCondition: z.string().min(1, 'El campo es obligatorio')
})

export type AccountFormValues = z.infer<typeof modalAccountFormSchema>
