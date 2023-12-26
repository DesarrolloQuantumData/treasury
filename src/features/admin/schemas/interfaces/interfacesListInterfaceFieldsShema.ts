import { z } from 'zod'

export const NUMBER_REGEX = /.*[0-9].*/

const messages = {
  required: 'Campo requerido'
}

export const modalnterfacesListInterfaceFields = z.object({
  InterfaceId: z.any().pipe(z.coerce.number().positive(messages.required)),
  FieldTypeId: z.any().pipe(z.coerce.number().positive(messages.required)),
  DescriptionFieldId: z.any().pipe(z.coerce.number().positive(messages.required)),
  NatureTypeId: z.any().pipe(z.coerce.number().positive(messages.required)),
  InitialPosition: z.any().pipe(z.coerce.number().positive(messages.required)),
  Length: z.any().pipe(z.coerce.number().positive(messages.required)),
  FieldAlignmentId: z.any().pipe(z.coerce.number().positive(messages.required)),
  HasDecimals: z.any().optional(),
  DateFormatId: z.any().pipe(z.coerce.number().positive(messages.required)),
})

export type lnterfacesListInterfaceFields = z.infer<typeof modalnterfacesListInterfaceFields>