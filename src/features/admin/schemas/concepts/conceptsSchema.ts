import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
  required: 'Campo requerido'
}
export const modalConceptsFormSchema = z.object({
  name: z
    .string()
    .min(1, 'El campo es obligatorio')
    .max(50, 'Solo puede escribir un limite de 20 caracteres'),
  natureTypeId: z.string().pipe(z.coerce.number().positive(messages.required)),
  cashFlowConceptId: z.string().pipe(z.coerce.number().positive(messages.required))
})

export type ConceptsFormValues = z.infer<typeof modalConceptsFormSchema>
