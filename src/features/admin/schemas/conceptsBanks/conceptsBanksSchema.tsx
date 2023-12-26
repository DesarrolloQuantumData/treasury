import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
    required: 'Campo requerido'
}

export const modalConceptsBanksFormSchema = z.object({
    name: z.string().min(1, 'El campo es obligatorio'),
    internalConceptId: z.string().pipe(z.coerce.number().positive(messages.required)),
    natureTypeId: z.number().optional(),
    bankId: z.number().optional()
})


export type BankFormValues = z.infer<typeof modalConceptsBanksFormSchema>