import { string, z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
    required: 'Campo requerido'
}

export const modalSpecialConditionsSchemas = z.object({
    managerRelationship: z.string().optional(),
    relationshipAssistant: z.string().optional(),
    officeAddress: z.string().optional(),
    preparator: z.string().pipe(z.coerce.number().positive(messages.required)),
    approver: z.string().pipe(z.coerce.number().positive(messages.required))
})

export type SpecialConditionsSchemasValues = z.infer<typeof modalSpecialConditionsSchemas>