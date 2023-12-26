import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
  required: 'Campo requerido'
}

export const modalInterfacesFormSchema = z.object({
  Description: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(50, 'Solo puede escribir un limite de 50 caracteres'),
    FileTypeId: z.string().pipe(z.coerce.number().positive(messages.required)),
    SeparatorTypeId:z .string().pipe(z.coerce.number().positive(messages.required)),
    NumberLinesHeader: z.string(),
    NumberFinalLines:z.string(),
    BankId: z.string().pipe(z.coerce.number().positive(messages.required))
})

export type InterfacesFormValues = z.infer<typeof modalInterfacesFormSchema>