import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
    required: 'Campo requerido'
}

export const modalBankBalanceSchema = z.object({
    companyId:z.any().pipe(z.coerce.number().positive(messages.required)),
    bankId: z.any().pipe(z.coerce.number().positive(messages.required)),
    accountId: z.any().pipe(z.coerce.number().positive(messages.required)),
    userId: z.string().min(1, 'El campo es obligatorio'),
    description: z.string().min(1, 'El campo es obligatorio')
})

export type BankBalanceFormValues = z.infer<typeof modalBankBalanceSchema>