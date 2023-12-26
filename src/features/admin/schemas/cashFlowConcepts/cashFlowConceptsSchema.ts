import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
  required: 'Campo requerido'
}

export const modalCashFlowConceptsSchema = z.object({
  name: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(50, 'Solo puede escribir un limite de 50 caracteres'),
  natureTypeId: z.string().pipe(z.coerce.number().positive(messages.required))
})

export type cashFlowConceptsFormValues = z.infer<typeof modalCashFlowConceptsSchema>
