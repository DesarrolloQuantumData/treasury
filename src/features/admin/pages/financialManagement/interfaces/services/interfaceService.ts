import { treasuryApi } from '@/features/common/api/treasuryApi'
import type { ApiOption } from '@/features/common/utils/mappers'
import { ListOfApiOptionSchema } from '@/features/admin/schemas/account/ApiOptionSchema'
import { string } from 'zod'
import { Id } from 'react-toastify'

export interface Datum {
    id?: number
    description?: string
    fileTypeId?: number
    fileTypeName?: string
    separatorTypeId?: number
    separatorTypeName?: string
    numberLinesHeader?: number
    numberFinalLines?: number
    bankId?: number
    bankName?: string
    isActive?: boolean
  }
  
  export interface GetInterfaces {
    count: number
    pageIndex: number
    pageSize: number
    data: Datum[]
    pageCount: number
  }
  
  export interface Params {
    BankId?: number
    IsActive?: boolean
    Id?: number
    PageIndex?: number
    PageSize?: number
    Search?: string
  }

  export interface ResponseGetExcelCashFlowConcepts {
    value: string
    status: string
  }
  
  export interface ResponseUpdateAccounts {
    value: string
    status: string
  }

  export interface InterfacesFormValues {
    Description: string
    FileTypeId: number
    SeparatorTypeId: number
    NumberLinesHeader: string
    NumberFinalLines: string
    BankId: number

}

export interface ResponseCreateInterfaces {
  value: string
  status: string
}

  export const getInterfaces = async (params: Params): Promise<GetInterfaces> => {
    return await treasuryApi.get('/interfaces', { params })
  }

  export const createInterfaces = async (data: InterfacesFormValues):  Promise<ResponseCreateInterfaces> => {
    return await treasuryApi.post('/interfaces', data)
  }

  export const updaInterfaces = async (id: number, data: Datum): Promise<ResponseUpdateAccounts> => {
    return await treasuryApi.put(`/interfaces/${id}`, data)
  }

  export const getExcelInterfaces = async (): Promise<ResponseGetExcelCashFlowConcepts> => {
    return await treasuryApi.get('/interfaces/download/excel')
  }

  export const getTypeOfFile = async (): Promise<ApiOption[]> => {
  return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/fieldTypes'))
  }

  export const getTypeSeparator = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/separatorTypes'))
  }

  export const get_TypeOfFile = async (): Promise<ApiOption[]> => {
    const companies = await getTypeOfFile()
    return ListOfApiOptionSchema.parse(
      companies.map((company) => ({
        name: company.name,
        id: company.id
      }))
    )
    return []
  }

  export const get_TypeSeparator = async (): Promise<ApiOption[]> => {
    const companies = await getTypeSeparator()
    return ListOfApiOptionSchema.parse(
      companies.map((company) => ({
        name: company.name,
        id: company.id
      }))
    )
    return []
  }